const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { OAuth2Client } = require('google-auth-library');
const { query } = require('./db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const JWT_SECRET = process.env.JWT_SECRET || 'secret_fallback';
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// --- DB AUTO-MIGRATION (SIMPLE) ---
const migrate = async () => {
  try {
    await query(`ALTER TABLE users ADD COLUMN IF NOT EXISTS google_id VARCHAR(255);`);
    await query(`ALTER TABLE users ADD COLUMN IF NOT EXISTS otp VARCHAR(6);`);
    await query(`ALTER TABLE users ADD COLUMN IF NOT EXISTS otp_expiry TIMESTAMP;`);
    await query(`ALTER TABLE users ADD COLUMN IF NOT EXISTS is_verified BOOLEAN DEFAULT FALSE;`);
    console.log("DB Migrations completed.");
  } catch (err) {
    console.log("Migration check skipped or table already updated.");
  }
};
migrate();

// --- NODEMAILER SETUP ---
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS
  }
});

// --- AUTH ROUTES ---

// 1. SEND OTP
app.post('/api/auth/send-otp', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email required" });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiry = new Date(Date.now() + 10 * 60000); // 10 mins

  try {
    // Upsert user / update OTP
    const existing = await query('SELECT id FROM users WHERE email = $1', [email]);
    if (existing.rows.length === 0) {
      // Pre-create unverified user (placeholders for name/pass)
      await query(
        'INSERT INTO users (name, email, password, otp, otp_expiry, is_verified) VALUES ($1, $2, $3, $4, $5, $6)',
        ['Unverified User', email, 'NOPASS', otp, expiry, false]
      );
    } else {
      await query(
        'UPDATE users SET otp = $1, otp_expiry = $2 WHERE email = $3',
        [otp, expiry, email]
      );
    }

    // Send Email
    await transporter.sendMail({
      from: `"Amazon Clone Auth" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: "Your Verification Code",
      text: `Your Amazon Clone OTP is: ${otp}. Valid for 10 minutes.`
    });

    res.json({ message: "OTP sent successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Email service failed" });
  }
});

// 2. REGISTER / VERIFY
app.post('/api/auth/register-verify', async (req, res) => {
  const { name, email, password, otp } = req.body;
  if (!email || !otp) return res.status(400).json({ message: "Missing fields" });

  try {
    const result = await query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];

    if (!user || user.otp !== otp || new Date() > new Date(user.otp_expiry)) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await query(
      'UPDATE users SET name = $1, password = $2, is_verified = TRUE, otp = NULL, otp_expiry = NULL WHERE email = $3',
      [name, hashedPassword, email]
    );

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user.id, name, email }, message: "Verified successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Verification failed" });
  }
});

// 3. GOOGLE OAUTH
app.post('/api/auth/google-auth', async (req, res) => {
  const { token } = req.body;
  try {
    // Fetch user info using access_token
    const googleRes = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token}`);
    const { sub, email, name, picture } = await googleRes.json();

    if (!email) return res.status(401).json({ message: "Google Auth Failed" });

    let userRes = await query('SELECT * FROM users WHERE email = $1', [email]);
    let user = userRes.rows[0];

    if (!user) {
      // Auto register
      const resNew = await query(
        'INSERT INTO users (name, email, password, google_id, is_verified) VALUES ($1, $2, $3, $4, $5) RETURNING id',
        [name || 'Google User', email, 'GOOGLE_AUTH', sub, true]
      );
      user = { id: resNew.rows[0].id, name, email };
    } else {
      // Link if not linked
      if (!user.google_id) {
        await query('UPDATE users SET google_id = $1, is_verified = TRUE WHERE email = $2', [sub, email]);
      }
    }

    const jwtToken = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token: jwtToken, user: { id: user.id, name: user.name, email: user.email } });
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: "Google Auth Failed" });
  }
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];

    if (!user || user.password === 'GOOGLE_AUTH' || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '7d' });
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
    let sql = `SELECT p.*, c.name as category_name FROM products p JOIN categories c ON p.category_id = c.id WHERE 1=1`;
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
  const productId = req.params.id;
  try {
    const productRes = await query(`SELECT p.*, c.name as category_name FROM products p JOIN categories c ON p.category_id = c.id WHERE p.id = $1`, [productId]);
    if (productRes.rows.length === 0) return res.status(404).json({ message: "Not found" });

    const product = productRes.rows[0];
    const imagesRes = await query('SELECT image_url FROM product_images WHERE product_id = $1', [productId]);
    const images = imagesRes.rows.map(img => img.image_url);

    res.json({
      ...product,
      price: parseFloat(product.price),
      mrp: parseFloat(product.mrp || product.price * 1.5),
      rating: parseFloat(product.rating),
      ratingCount: product.rating_count || "0",
      category: product.category_name,
      sub_category: product.sub_category || "Essentials",
      image: product.main_image,
      images: images.length > 0 ? images : [product.main_image]
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// --- ADDRESS ROUTES ---

// Get User Addresses
app.get('/api/addresses/:userId', async (req, res) => {
  const userId = parseInt(req.params.userId);
  if (!userId || isNaN(userId)) return res.status(400).json({ message: "Invalid User" });

  try {
    const result = await query('SELECT * FROM addresses WHERE user_id = $1 ORDER BY is_default DESC, created_at DESC', [userId]);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching addresses" });
  }
});

// Add New Address
app.post('/api/addresses', async (req, res) => {
  const { user_id, full_name, mobile_number, pincode, flat_house_no, area_street, landmark, city, state, is_default } = req.body;
  
  if (!user_id || !full_name || !mobile_number || !pincode) {
    return res.status(400).json({ message: "Required fields missing" });
  }

  try {
    // If setting as default, clear other default addresses for the user
    if (is_default) {
      await query('UPDATE addresses SET is_default = FALSE WHERE user_id = $1', [user_id]);
    }

    const result = await query(
      `INSERT INTO addresses (user_id, full_name, mobile_number, pincode, flat_house_no, area_street, landmark, city, state, is_default)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
      [user_id, full_name, mobile_number, pincode, flat_house_no, area_street, landmark, city, state, is_default || false]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error saving address" });
  }
});

// Set default address
app.put('/api/addresses/default/:addressId', async (req, res) => {
  const { userId } = req.body;
  const addressId = req.params.addressId;
  try {
    await query('UPDATE addresses SET is_default = FALSE WHERE user_id = $1', [userId]);
    await query('UPDATE addresses SET is_default = TRUE WHERE id = $1', [addressId]);
    res.json({ message: "Default address updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update default address" });
  }
});

// --- ORDER ROUTES ---

app.post('/api/orders', async (req, res) => {
  const { cart, total, userId, shippingAddress, paymentMethod } = req.body;
  if (!cart?.length) return res.status(400).json({ message: "Empty cart" });

  const uId = parseInt(userId);
  if (!uId || isNaN(uId)) return res.status(400).json({ message: "Valid Login Required to Order" });

  try {
    // 1. Create order with shipping info snapshot
    const orderRes = await query(
      `INSERT INTO orders (user_id, total_amount, status, full_name, mobile_number, pincode, flat_house_no, area_street, landmark, city, state, payment_method)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING id`,
      [
        uId, total, 'paid',
        shippingAddress?.full_name || '',
        shippingAddress?.mobile_number || '',
        shippingAddress?.pincode || '',
        shippingAddress?.flat_house_no || '',
        shippingAddress?.area_street || '',
        shippingAddress?.landmark || '',
        shippingAddress?.city || '',
        shippingAddress?.state || '',
        paymentMethod || 'card'
      ]
    );
    const orderId = orderRes.rows[0].id;

    // 2. Insert order items
    for (const item of cart) {
      if (item.id) {
        await query('INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase) VALUES ($1, $2, $3, $4)', [orderId, item.id, item.quantity, item.price]);
      }
    }

    // 3. Clear user's cart automatically after order
    const cartRes = await query('SELECT id FROM carts WHERE user_id = $1', [uId]);
    if (cartRes.rows.length > 0) {
      await query('DELETE FROM cart_items WHERE cart_id = $1', [cartRes.rows[0].id]);
    }

    res.status(201).json({ message: "Order placed", orderId: `ORD-${orderId}`, total });
  } catch (err) {
    console.error("Order error:", err);
    res.status(500).json({ message: "Server error placing order" });
  }
});

// Get User Orders
app.get('/api/orders/:userId', async (req, res) => {
  const userId = req.params.userId;
  try {
    const ordersRes = await query(
      `SELECT o.id as order_id, o.total_amount, o.status, o.created_at, 
              oi.product_id, oi.quantity, oi.price_at_purchase,
              p.title, p.main_image
       FROM orders o
       JOIN order_items oi ON o.id = oi.order_id
       JOIN products p ON oi.product_id = p.id
       WHERE o.user_id = $1
       ORDER BY o.created_at DESC`,
      [userId]
    );

    // Group items by order ID
    const orders = ordersRes.rows.reduce((acc, row) => {
      const orderId = row.order_id;
      if (!acc[orderId]) {
        acc[orderId] = {
          id: orderId,
          total: row.total_amount,
          status: row.status,
          date: row.created_at,
          items: []
        };
      }
      acc[orderId].items.push({
        id: row.product_id,
        title: row.title,
        quantity: row.quantity,
        price: row.price_at_purchase,
        image: row.main_image
      });
      return acc;
    }, {});

    res.json(Object.values(orders));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching orders" });
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

// --- CART PERSISTENCE ---

// Get User Cart
app.get('/api/cart/:userId', async (req, res) => {
  const userId = req.params.userId;
  if (!userId || userId === 'null' || userId === 'undefined') {
    return res.json([]);
  }
  try {
    const result = await query(
      `SELECT p.*, ci.quantity 
             FROM cart_items ci 
             JOIN products p ON ci.product_id = p.id 
             JOIN carts c ON ci.cart_id = c.id 
             WHERE c.user_id = $1`,
      [userId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching cart" });
  }
});

// Sync User Cart
app.post('/api/cart', async (req, res) => {
  const { userId, cart } = req.body;
  if (!userId || userId === 'null' || userId === 'undefined') {
    return res.status(400).json({ message: "Valid User ID required" });
  }

  try {
    // 1. Get or create cart ID
    let cartRes = await query('SELECT id FROM carts WHERE user_id = $1', [userId]);
    let cartId;
    if (cartRes.rows.length === 0) {
      const newCart = await query('INSERT INTO carts (user_id) VALUES ($1) RETURNING id', [userId]);
      cartId = newCart.rows[0].id;
    } else {
      cartId = cartRes.rows[0].id;
    }

    // 2. Clear current items and re-insert
    await query('DELETE FROM cart_items WHERE cart_id = $1', [cartId]);

    if (Array.isArray(cart)) {
      for (const item of cart) {
        await query(
          'INSERT INTO cart_items (cart_id, product_id, quantity) VALUES ($1, $2, $3)',
          [cartId, item.id, item.quantity]
        );
      }
    }

    res.json({ message: "Cart synced" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error syncing cart" });
  }
});

// JSON 404 handler
app.use((req, res) => {
  res.status(404).json({ message: `Route ${req.method} ${req.url} not found.` });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
