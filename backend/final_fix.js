const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function finalFix() {
  console.log("Running finalFix (Drop and Recreate)...");
  try {
    await pool.query("DROP TABLE IF EXISTS wishlist CASCADE");
    console.log("Wishlist table dropped.");
    
    await pool.query(`
      CREATE TABLE IF NOT EXISTS wishlist (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        product_id VARCHAR(100) REFERENCES products(id) ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(user_id, product_id)
      );
    `);
    console.log("Wishlist table recreated safely with VARCHAR(100) product_id.");
    
    const res = await pool.query("SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'wishlist'");
    console.log("Wishlist columns:", res.rows);
  } catch (err) {
    console.error("FINAL FIX ERROR:", err);
  } finally {
    await pool.end();
  }
}

finalFix();
