const { query } = require('./db');

async function runMigration() {
  console.log("Checking tables...");
  try {
    const res = await query("SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname = 'public'");
    console.log("Current tables:", res.rows.map(r => r.tablename));
    
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
    
    const finalRes = await query("SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname = 'public'");
    console.log("Final tables:", finalRes.rows.map(r => r.tablename));
    
    if (finalRes.rows.some(r => r.tablename === 'wishlist')) {
      console.log("SUCCESS: Wishlist table is confirmed to exist.");
    } else {
      console.log("FAILURE: Wishlist table was NOT created.");
    }
  } catch (err) {
    console.error("MIGRATION ERROR:", err);
  } finally {
    process.exit();
  }
}

runMigration();
