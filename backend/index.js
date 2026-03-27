const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Mock database for initial setup (replace with actual PG queries later)
let products = [
  {
    id: 1,
    title: "Apple iPhone 15 Pro, 256GB, Blue Titanium",
    price: 999.99,
    description: "Experience the ultimate iPhone with a titanium design, A17 Pro chip, and a powerful camera system.",
    category: "Electronics",
    image: "https://m.media-amazon.com/images/I/81+GIkwqLIL._AC_SL1500_.jpg",
    rating: 4.8,
    stock: 50
  },
  {
    id: 2,
    title: "Sony WH-1000XM5 Wireless Noise Cancelling Headphones",
    price: 348.00,
    description: "Industry-leading noise cancelling with dual processors and carbon fiber drivers.",
    category: "Electronics",
    image: "https://m.media-amazon.com/images/I/61+7XpE3r0L._AC_SL1500_.jpg",
    rating: 4.7,
    stock: 35
  },
  {
    id: 3,
    title: "Kindle Paperwhite (16 GB) - 6.8\" display and adjustable warm light",
    price: 139.99,
    description: "The best-selling Kindle with a larger display, waterproof body, and adjustable warm light.",
    category: "Gadgets",
    image: "https://m.media-amazon.com/images/I/51538Z4OqPL._AC_SL1000_.jpg",
    rating: 4.9,
    stock: 120
  },
  {
    id: 4,
    title: "Logitech MX Master 3S Wireless Performance Mouse",
    price: 99.00,
    description: "The ultimate wireless mouse with speed, precision, and silent scrolling.",
    category: "Accessories",
    image: "https://m.media-amazon.com/images/I/61ni3Ky39AL._AC_SL1500_.jpg",
    rating: 4.8,
    stock: 80
  }
];

// Product API routes
app.get('/api/products', (req, res) => {
  const { category, search } = req.query;
  let filtered = products;

  if (category) {
    filtered = filtered.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }

  if (search) {
    filtered = filtered.filter(p => p.title.toLowerCase().includes(search.toLowerCase()));
  }

  res.json(filtered);
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

// Checkout API route
app.post('/api/orders', (req, res) => {
  const { cart, shippingInfo, total } = req.body;
  
  if (!cart || cart.length === 0) {
    return res.status(400).json({ message: "Cart is empty" });
  }

  const orderId = 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase();
  
  // Here you would typically save to DB
  console.log(`Order placed: ${orderId}`, { shippingInfo, total });

  res.status(201).json({ 
    message: "Order placed successfully", 
    orderId,
    total 
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
