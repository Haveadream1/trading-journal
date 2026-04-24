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

// total_trades: count all trades
// total_pnl: sum all net_pnl
// avg_win: average net_pnl when winning
// avg_loss: average net_pnl when losing
// biggest_win: max of net_pnl when winning
// biggest_loss: min of net_pnl when losing
// nbr_wins: count the number of winning trades
// nbr_losses: count the number of losing trades
// total_winning_pnl: sum of winning pnl
// total_losing_pnl: sum of losing pnl

// win_rate: (number of wins / numbers of trades) * 100
// profit_factor: total winning net_pnl / total losing net_pnl
// most_traded_asset: asset that appears the most
// most_traded_asset_count: number of trades for most traded asset

app.get('/api/analytics', async (req, res) => {
  try {
    const analyticsData = await pool.query(`
      SELECT  
        COUNT(*) as total_trades,
        SUM(net_pnl) as total_pnl,
        AVG(CASE WHEN outcome = 'Win' THEN net_pnl END) as avg_win,
        AVG(CASE WHEN outcome = 'Loss' THEN net_pnl END) as avg_loss,
        MAX(CASE WHEN outcome = 'Win' THEN net_pnl END) as biggest_win,
        MIN(CASE WHEN outcome = 'Loss' THEN net_pnl END) as biggest_loss,
        COUNT(CASE WHEN outcome = 'Win' THEN 1 END) as nbr_wins,
        COUNT(CASE WHEN outcome = 'Loss' THEN 1 END) as nbr_losses,
        SUM(CASE WHEN outcome = 'Win' THEN net_pnl END) as total_winning_pnl,
        SUM(CASE WHEN outcome = 'Loss' THEN net_pnl END) as total_losing_pnl
      FROM trades
      WHERE COUNT(*) > 0;
    `);

    // aggregate function only return one row
    const firstRow = analyticsData.rows[0];

    // format the JSON to be sent for easier access later
    res.json({
      totalTrades: firstRow.total_trades,
      totalPnl: parseFloat(firstRow.total_pnl),
      winRate: (firstRow.nbr_wins / firstRow.total_trades) * 100,
      profitFactor: firstRow.total_winning_pnl / firstRow.total_losing_pnl,
    });

  } catch (err) {
    console.error('Failed to fetch aggregate data', err.message);
    res.status(500).json({ error: 'Error with aggregate functions in database'});
  }
})

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
