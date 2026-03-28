const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { query } = require('./db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const JWT_SECRET = process.env.JWT_SECRET || 'secret_fallback';

// --- AUTH ROUTES ---

app.post('/api/auth/register', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ message: "Fields missing" });

  try {
    const existingUser = await query('SELECT * FROM users WHERE email = $1', [email]);
    if (existingUser.rows.length > 0) return res.status(400).json({ message: "User exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const result = await query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
      [name, email, hashedPassword]
    );

    const newUser = result.rows[0];
    const token = jwt.sign({ id: newUser.id }, JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ token, user: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const result = await query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// --- PRODUCT ROUTES ---

app.get('/api/products', async (req, res) => {
  const { category, search } = req.query;
  
  try {
    let sql = `
      SELECT p.*, c.name as category_name 
      FROM products p 
      JOIN categories c ON p.category_id = c.id 
      WHERE 1=1
    `;
    const params = [];

    if (category && category !== "all") {
      params.push(category);
      sql += ` AND LOWER(c.name) = LOWER($${params.length})`;
    }

    if (search) {
      params.push(`%${search.toLowerCase()}%`);
      sql += ` AND LOWER(p.title) LIKE $${params.length}`;
    }

    const result = await query(sql, params);
    
    // Format to match frontend expectations
    const products = result.rows.map(p => ({
      ...p,
      price: parseFloat(p.price),
      rating: parseFloat(p.rating),
      category: p.category_name,
      image: p.main_image
    }));

    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

app.get('/api/products/:id', async (req, res) => {
  const productId = parseInt(req.params.id);
  
  try {
    const productRes = await query(`
      SELECT p.*, c.name as category_name 
      FROM products p 
      JOIN categories c ON p.category_id = c.id 
      WHERE p.id = $1
    `, [productId]);

    if (productRes.rows.length === 0) return res.status(404).json({ message: "Not found" });

    const product = productRes.rows[0];

    // Fetch multiple images
    const imagesRes = await query('SELECT image_url FROM product_images WHERE product_id = $1', [productId]);
    const images = imagesRes.rows.map(img => img.image_url);

    res.json({
      ...product,
      price: parseFloat(product.price),
      rating: parseFloat(product.rating),
      category: product.category_name,
      image: product.main_image,
      images: images.length > 0 ? images : [product.main_image]
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// --- ORDER ROUTES ---

app.post('/api/orders', async (req, res) => {
  const { cart, total, userId } = req.body; // userId should ideally come from JWT token in a real app
  if (!cart?.length) return res.status(400).json({ message: "Empty cart" });

  try {
    // Start a transaction would be better, but simple insert for now
    const orderRes = await query(
      'INSERT INTO orders (user_id, total_amount, status) VALUES ($1, $2, $3) RETURNING id',
      [userId || null, total, 'paid']
    );
    const orderId = orderRes.rows[0].id;

    for (const item of cart) {
      await query(
        'INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase) VALUES ($1, $2, $3, $4)',
        [orderId, item.id, item.quantity, item.price]
      );
    }

    res.status(201).json({ 
      message: "Order placed", 
      orderId: `ORD-${orderId}`, 
      total 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// --- CATEGORY ROUTES ---
app.get('/api/categories', async (req, res) => {
  try {
    const result = await query('SELECT * FROM categories');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
