const { Pool } = require('pg');
require('dotenv').config();

// Create a new pool instance using the connection string from environment variables
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Add some defaults in case they're not in the connection string
  // User can also provide individual fields like user, host, database, etc.
});

// Test connection
pool.on('connect', () => {
  console.log('Connected to PostgreSQL database');
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool,
};
