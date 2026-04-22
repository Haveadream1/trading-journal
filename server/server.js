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

// Set up route to get all trades
  // Use asyncronous function to handle the database query
app.get('/api/trades', async (req, res) => {
  try {
    const allTrades = await pool.query('SELECT * FROM trades'); // PostgreSQL query statement 
    res.json(allTrades.rows); // Express method to send a JSON response to the client
  } catch (err) {
    console.error('Error fetching all trades from database', err.message); // Log error for debugging
    res.status(500).json({ error: 'Error fetching all trades from database' }); // Send error to the client (500: server error)
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
