require('dotenv').config(); // Tool used to load env variables, must be at the top

const express = require('express');
const cors = require('cors');
const app = express();
const pool = require('./database'); // Import the database connection pool
const statisticsQueries = require('./queries');

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

const formatData = (type, value) => {
  const num = Number(value) // Avoid error with JS about retrieved type from PostgreSQL
  if (type === 'int') {
    return parseInt(num);
  } else {
    return parseFloat(num.toFixed(2));
  }
}

// ! FIX: the actual value is 'loss' and should be 'Loss', correct it in REACT
app.get('/api/statistics', async (req, res) => {
  // Handle the case when no trades are stored yet
  const totalResult = await pool.query(`SELECT COUNT(*) as total FROM trades`);
  const totalTrades = formatData('int', totalResult.rows[0].total);

  if (totalTrades === 0) {
    return res.json({
      totalTrades: 0
    });
  }

  try {
    // Enabled to run multiple asynchronous query in parallel
    const [baseResult, weeklyResult, mostTradedResult, orderedTradeListResult] = await Promise.all([
      pool.query(statisticsQueries.base),
      pool.query(statisticsQueries.weekly),
      pool.query(statisticsQueries.mostTraded),
      pool.query(statisticsQueries.orderedTradeList)
    ]);

    // aggregate function only return one row
    const baseRow = baseResult.rows[0];
    const weeklyRow = weeklyResult.rows[0]
    const mostTradedRow = mostTradedResult.rows[0];
    const orderedTradeListRow = orderedTradeListResult.rows;

    // format the JSON to be sent for easier access later
    res.json({
      totalTrades: formatData('int', baseRow.total_trades),
      totalPnl: formatData('float', baseRow.total_pnl),
      avgWin: formatData('float', baseRow.avg_win),
      avgLoss: formatData('float', baseRow.avg_loss),
      biggestWin: formatData('float', baseRow.biggest_win),
      biggestLoss: formatData('float',baseRow.biggest_loss),
      nbrWins: formatData('int', baseRow.nbr_wins),
      nbr_losses: formatData('int',baseRow.nbr_losses),
      totalWinningPnl: formatData('float', baseRow.total_winning_pnl),
      totalLosingPnl: formatData('float', baseRow.total_losing_pnl),
      winRate: formatData('float', (baseRow.nbr_wins / baseRow.total_trades) * 100),
      profitFactor: formatData('float', baseRow.total_winning_pnl / baseRow.total_losing_pnl),

      weeklyPnl: formatData('float', weeklyRow.weekly_pnl),

      mostTradedAsset: mostTradedRow.asset, // string
      mostTradedAssetCount: formatData('int', mostTradedRow.trade_count),

      tradeList: orderedTradeListRow
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
