const { Pool } = require('pg');
require('dotenv').config();

// Create a database connection pool with the databaseURL from Neon
const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

module.exports = pool;