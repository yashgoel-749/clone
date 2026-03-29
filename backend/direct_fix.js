const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function directFix() {
  console.log("Running directFix...");
  try {
    const resBefore = await pool.query("SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname = 'public'");
    console.log("Before:", resBefore.rows.map(r => r.tablename));
    
    await pool.query(`
      CREATE TABLE IF NOT EXISTS wishlist (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        product_id VARCHAR(100) REFERENCES products(id) ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(user_id, product_id)
      );
    `);
    
    const resAfter = await pool.query("SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname = 'public'");
    console.log("After:", resAfter.rows.map(r => r.tablename));
    
    if (resAfter.rows.some(r => r.tablename === 'wishlist')) {
      console.log("WISHLIST CREATED!");
    } else {
      console.log("WISHLIST MISSING!");
    }
  } catch (err) {
    console.error("DIRECT ERROR:", err);
  } finally {
    await pool.end();
  }
}

directFix();
