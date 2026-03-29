const { query } = require('./db');

async function fixDB() {
  console.log("Only creating wishlist table...");
  try {
    await query(`
      CREATE TABLE IF NOT EXISTS wishlist (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(user_id, product_id)
      );
    `);
    
    // Verify
    const res = await query("SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname = 'public'");
    console.log("Tables confirmed:", res.rows.map(r => r.tablename));
    if (res.rows.some(r => r.tablename === 'wishlist')) {
      console.log("SUCCESS: Wishlist table exists.");
    } else {
      console.log("FAILURE: Wishlist table missing.");
    }
  } catch (err) {
    console.error("FIX DB ERROR:", err);
  } finally {
    process.exit();
  }
}

fixDB();
