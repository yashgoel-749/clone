const { query, pool } = require('./db');
const fs = require('fs');
const path = require('path');

const products = [
  {
    title: "Apple iPhone 15 Pro, 256GB, Blue Titanium",
    price: 999.99,
    description: "Experience the ultimate iPhone with a titanium design, A17 Pro chip, and a powerful camera system.",
    category: "Electronics",
    image: "/image/81+GIkwqLIL._AC_SL1500_.jpg",
    images: ["/image/81+GIkwqLIL._AC_SL1500_.jpg", "/image/81C6N2Q8tXL._AC_SL1500_.jpg"],
    rating: 4.8,
    stock: 50,
    specs: { "Brand": "Apple", "Model": "iPhone 15 Pro", "Memory": "256 GB" }
  },
  {
    title: "Sony WH-1000XM5 Wireless Headphones",
    price: 348.00,
    description: "Industry-leading noise cancelling with dual processors and carbon fiber drivers.",
    category: "Electronics",
    image: "/image/61+7XpE3r0L._AC_SL1500_.jpg",
    images: ["/image/61+7XpE3r0L._AC_SL1500_.jpg"],
    rating: 4.7,
    stock: 35,
    specs: { "Brand": "Sony", "Battery": "30 Hours" }
  },
  {
    title: "Kindle Paperwhite (16 GB) - 6.8\" display",
    price: 139.99,
    description: "The best-selling Kindle with a larger display, waterproof body, and adjustable warm light.",
    category: "Gadgets",
    image: "/image/51538Z4OqPL._AC_SL1000_.jpg",
    images: ["/image/51538Z4OqPL._AC_SL1000_.jpg"],
    rating: 4.9,
    stock: 120,
    specs: { "Display": "6.8 inch", "Storage": "16 GB" }
  },
  {
    title: "Logitech MX Master 3S Wireless Mouse",
    price: 99.00,
    description: "The ultimate wireless mouse with speed, precision, and silent scrolling.",
    category: "Accessories",
    image: "/image/61ni3Ky39AL._AC_SL1500_.jpg",
    images: ["/image/61ni3Ky39AL._AC_SL1500_.jpg"],
    rating: 4.8,
    stock: 80,
    specs: { "Brand": "Logitech", "Type": "Wireless" }
  },
  {
    title: "MacBook Air M2, 13.6-inch, 8GB RAM, 256GB SSD",
    price: 1099.00,
    description: "Strikingly thin design, M2 chip, 13.6-inch Liquid Retina display and 18 hours of battery life.",
    category: "Laptops",
    image: "/image/71f5Eu5lJSL._AC_SL1500_.jpg",
    images: ["/image/71f5Eu5lJSL._AC_SL1500_.jpg"],
    rating: 4.8,
    stock: 25,
    specs: { "Chip": "M2", "Battery": "18 Hours" }
  },
  {
    title: "Ninja AF101 Air Fryer, 4 Qt, Black/Grey",
    price: 89.99,
    description: "Programmable Air Fryer that Crisps, Roasts, Reheats, and Dehydrates for Quick, Easy Meals.",
    category: "Home & Kitchen",
    image: "/image/71vTo628SBL._AC_SL1500_.jpg",
    images: ["/image/71vTo628SBL._AC_SL1500_.jpg"],
    rating: 4.8,
    stock: 150,
    specs: { "Capacity": "4 Quarts", "Color": "Black/Grey" }
  },
  {
    title: "Laneige Lip Sleeping Mask - Berry",
    price: 24.00,
    description: "A leave-on lip mask that soothes and moisturizes for smoother, more supple lips overnight.",
    category: "Beauty",
    image: "/image/51H7h1NqFLL._AC_SL1500_.jpg",
    images: ["/image/51H7h1NqFLL._AC_SL1500_.jpg"],
    rating: 4.7,
    stock: 300,
    specs: { "Type": "Lip Mask", "Flavor": "Berry" }
  },
  {
    title: "Atomic Habits by James Clear",
    price: 12.00,
    description: "An Easy & Proven Way to Build Good Habits & Break Bad Ones.",
    category: "Books",
    image: "/image/91bYsX41DVL._AC_SL1500_.jpg",
    images: ["/image/91bYsX41DVL._AC_SL1500_.jpg"],
    rating: 4.9,
    stock: 1000,
    specs: { "Author": "James Clear", "Format": "Hardcover" }
  },
  {
    title: "LEGO Icons Flower Bouquet 10280 Building Set",
    price: 47.99,
    description: "A unique building project for adults, creating a beautiful flower display model entirely from LEGO pieces.",
    category: "Toys & Games",
    image: "/image/81vAsiU7m+L._AC_SL1500_.jpg",
    images: ["/image/81vAsiU7m+L._AC_SL1500_.jpg"],
    rating: 4.9,
    stock: 200,
    specs: { "Pieces": "756", "Age": "18+" }
  },
  {
    title: "Iron Flask Sports Water Bottle, 40 oz, 3 Lids",
    price: 25.95,
    description: "Vacuum Insulated Stainless Steel Bottler with Straw Lid, 24 Hours Cold, 12 Hours Hot.",
    category: "Sports & Outdoors",
    image: "/image/71YF8MCHGkL._AC_SL1500_.jpg",
    images: ["/image/71YF8MCHGkL._AC_SL1500_.jpg"],
    rating: 4.8,
    stock: 450,
    specs: { "Volume": "40 oz", "Material": "Stainless Steel" }
  },
  {
    title: "Casio Men's G-Shock Quartz Watch",
    price: 48.00,
    description: "Shock-resistant sports watch featuring black dial with auto LED light, 1/1000-second stopwatch.",
    category: "Fashion",
    image: "/image/61Sj2H+p5iL._AC_UY1000_.jpg",
    images: ["/image/61Sj2H+p5iL._AC_UY1000_.jpg"],
    rating: 4.6,
    stock: 60,
    specs: { "Brand": "Casio", "Resistant": "Shock & Water" }
  }
];

async function seed() {
  try {
    console.log('--- Initializing Neon DB ---');
    
    // 1. Read and apply schema.sql
    console.log('Applying schema and initial categories...');
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schemaSql = fs.readFileSync(schemaPath, 'utf8');
    await query(schemaSql);
    console.log('✔ Schema applied successfully.');

    // 2. Fetch or confirm categories
    console.log('Seeding products...');
    const catRes = await query('SELECT id, name FROM categories');
    const categoryMap = {};
    catRes.rows.forEach(r => categoryMap[r.name] = r.id);

    // 3. Insert products
    for (const p of products) {
      const catId = categoryMap[p.category];
      if (!catId) {
        console.warn(`⚠ Category "${p.category}" not found for "${p.title}". Skipping.`);
        continue;
      }

      const productRes = await query(
        `INSERT INTO products (category_id, title, description, price, rating, stock, specs, main_image) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
         RETURNING id`,
        [catId, p.title, p.description, p.price, p.rating, p.stock, JSON.stringify(p.specs), p.image]
      );

      const productId = productRes.rows[0].id;

      for (const imgUrl of p.images) {
        await query(
          'INSERT INTO product_images (product_id, image_url) VALUES ($1, $2)',
          [productId, imgUrl]
        );
      }
    }

    console.log('✔ All data successfully migrated to Neon DB.');
    process.exit(0);
  } catch (err) {
    console.error('❌ Migration failed:', err);
    process.exit(1);
  }
}

seed();
