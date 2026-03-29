const { query } = require('./db');

async function fixDB() {
  console.log("Fixing DB schema...");
  try {
    // 1. Add missing columns to users
    console.log("Checking/Adding is_verified to users...");
    await query(`ALTER TABLE users ADD COLUMN IF NOT EXISTS is_verified BOOLEAN DEFAULT FALSE;`);
    await query(`ALTER TABLE users ADD COLUMN IF NOT EXISTS google_id VARCHAR(255);`);
    await query(`ALTER TABLE users ADD COLUMN IF NOT EXISTS otp VARCHAR(6);`);
    await query(`ALTER TABLE users ADD COLUMN IF NOT EXISTS otp_expiry TIMESTAMP;`);
    
    // 2. Create wishlist table
    console.log("Creating wishlist table...");
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
      console.log("SUCCESS: DB Schema is fixed.");
    } else {
      console.log("FAILURE: Table still missing.");
    }
  } catch (err) {
    console.error("FIX DB ERROR:", err);
  } finally {
    process.exit();
  }
}

fixDB();
