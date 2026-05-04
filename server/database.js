const { Pool } = require('pg');

// Create a database connection pool
const pool = new Pool({
    // Neon connection URL from env file
    connectionString: process.env.DATABASE_URL,

    // Security protocol that encrypts the connection between the server and the database
    ssl: {
        // SSL is normally required, but for this university project we can avoid complex setup
        rejectUnauthorized: false
    }
});

// Connection test
pool.connect((err, client, release) => {
    if (err) {
        console.error('Connection to database failed', err.message);
    } else {
        console.log('Connection to database successful');
        release(); // Important function to go back to the pool 
    }
});

module.exports = pool;