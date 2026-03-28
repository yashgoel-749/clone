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
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID
        });
        const { sub, email, name, picture } = ticket.getPayload();

        let userRes = await query('SELECT * FROM users WHERE email = $1', [email]);
        let user = userRes.rows[0];

        if (!user) {
            // Auto register
            const resNew = await query(
                'INSERT INTO users (name, email, password, google_id, is_verified) VALUES ($1, $2, $3, $4, $5) RETURNING id, name, email',
                [name, email, 'GOOGLE_AUTH', sub, true]
            );
            user = resNew.rows[0];
        } else if (!user.google_id) {
            // Link existing account
            await query('UPDATE users SET google_id = $1, is_verified = TRUE WHERE email = $2', [sub, email]);
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
    const productId = parseInt(req.params.id);
    try {
        const productRes = await query(`SELECT p.*, c.name as category_name FROM products p JOIN categories c ON p.category_id = c.id WHERE p.id = $1`, [productId]);
        if (productRes.rows.length === 0) return res.status(404).json({ message: "Not found" });

        const product = productRes.rows[0];
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
    const { cart, total, userId } = req.body;
    if (!cart?.length) return res.status(400).json({ message: "Empty cart" });

    try {
        const orderRes = await query('INSERT INTO orders (user_id, total_amount, status) VALUES ($1, $2, $3) RETURNING id', [userId || null, total, 'paid']);
        const orderId = orderRes.rows[0].id;

        for (const item of cart) {
            await query('INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase) VALUES ($1, $2, $3, $4)', [orderId, item.id, item.quantity, item.price]);
        }
        res.status(201).json({ message: "Order placed", orderId: `ORD-${orderId}`, total });
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
