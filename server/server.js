require('dotenv').config(); // Tool used to load env variables, must be at the top

const express = require('express');
const cors = require('cors');
const app = express();
const pool = require('./database'); // Import the database connection pool

// Fetch from env file or provide default port
const PORT = process.env.PORT || 3000;

// Set up middleware, act as a bridge for communication between Frontend and Backend
app.use(cors()); // Enable React to communicate with the server
app.use(express.json());  // Enable the server to parse(read) JSON data from React

// Set up test route
  // api/health is a common used route to check if server is running
app.get('/api/health', (req, res) => {
  // Adding the formatted timestamp is a good practice for debugging
  res.json({ 
    status: 'Server is running',
    timestamp: new Date().toLocaleString() // ie: 4/19/2026, 3:09:40 PM
  });
});

// Set up GET route to get all trades
  // Use asyncronous function to handle the database query
app.get('/api/trades', async (req, res) => {
  try {
    const allTrades = await pool.query('SELECT * FROM trades'); // PostgreSQL query statement 
    res.json(allTrades.rows); // Express method to send a JSON response to the client
  } catch (err) {
    console.error('Error reading all trades from database', err.message); // Log error for debugging
    res.status(500).json({ error: 'Error reading all trades from database' }); // Send error to the client (500: server error)
  }
});

// Set up POST route
app.post('/api/trades', async (req, res) => {
  try {
    const {trade_date, asset, direction, outcome, net_pnl} = req.body; // Destructure trade data from the client request 

    // Check if data is valid
    if (!trade_date || !asset || !direction || !outcome || net_pnl === null) { // net_pnl can have the 0 value, so check instead for undefined and null values
      // 400: client sent an invalid request
      return res.status(400).json({ error: 'Error with required inputs' });
    }

    // Prevent from SQL injection with parameterized query
      // Parmeterized separate the SQL from the user data, so input can be treated as only data
    const query = `
      INSERT INTO trades (trade_date, asset, direction, outcome, net_pnl)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `; // return the new trade back to client

    const tradeValues = [trade_date, asset, direction, outcome, net_pnl];
    const newTrade = await pool.query(query, tradeValues); // Execute the query with the values provided

    // 201: successfully created
    res.status(201).json(newTrade.rows[0]); // Send the first row to client that represents the new trade

  } catch (err) {
    console.error('Error inserting a new trade into database', err.message);
    res.status(500).json({ error: 'Error inserting a new trade into database' });
  }
});

// Start the server with the port from env
  // Must be always at the end of the file
app.listen(PORT, () => {
  console.log(`Server is UP on http://localhost:${PORT}/api/trades`);
  console.log(`Test route is UP on http://localhost:${PORT}/api/health`);
});

// Create connection with database from env URL
// Set up routes
