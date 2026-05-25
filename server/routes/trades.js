const express = require('express');
const router = express.Router();
const pool = require('../database');

// Set up GET route to get all trades
  // Use asyncronous function to handle the database query
router.get('/', async (req, res) => {
  try {
    const allTrades = await pool.query('SELECT * FROM trades ORDER BY trade_date'); // PostgreSQL query statement 
    res.json(allTrades.rows); // Express method to send a JSON response to the client
  } catch (err) {
    console.error('Error reading all trades from database', err.message); // Log error for debugging
    res.status(500).json({ error: 'Error reading all trades from database' }); // Send error to the client (500: server error)
  }
});

// Set up DELETE route to remove trade by id
router.delete('/:id', async (req, res) => {
  // Pass the key/if fetched from the click handler to target the specified row
  
  try {
    const { id } = req.params; // Get the id from the route request parameters

    const tradeId = parseInt(id);
    // Check if tradeId is an integer to be able to continue
    if (isNaN(tradeId)) {
      return res.status(400).json({ error: 'Invalid id for deleting trade'});
    }

    // Use again parameterized query
      // Return the trade deleted
    const result = await pool.query(
      `DELETE FROM trades WHERE id = $1 RETURNING *;`,
      [tradeId]
    );

    // Check if the result is empty
    if (!result.rows[0]) {
      // 404 -> Not found HTTP status code
      return res.status(404).json({ error: 'Trade not found in database'});
    }
    
    // 200 -> OK HTTP status code
    res.status(200).json({ message: 'Trade deleted successfully by id'});
  } catch (err) {
    console.error('Error deleting trade with id', err.message);
    res.status(500).json({ error: 'Error deleting trade with id' });
  }
})

// Set up PUT route to edit trades by id
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { trade_date, asset, direction, outcome, net_pnl } = req.body;
    
    // Validation id and columns values
    const tradeId = parseInt(id);
    if (isNaN(tradeId)) {
      return res.status(400).json({ error: 'Invalid id for editing the trade'});
    }

    if (!trade_date || !asset || !direction || !outcome || net_pnl === null) {
      return res.status(400).json({ error: 'Error with required inputs' });
    }

    const query = `
      UPDATE trades SET trade_date = $1, asset = $2, direction = $3, outcome = $4, net_pnl = $5 
      WHERE id = $6 
      RETURNING *;
    `;
    const tradeValues = [trade_date, asset, direction, outcome, net_pnl, tradeId];

    const result = await pool.query(query, tradeValues);

    if (!result.rows[0]) {
      return res.status(404).json({ error: 'Trade not found in database'});
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error editing the trade", error.message);
    res.status(500).json({ error: 'Error editing the trade' });
  }
})

// Set up POST route
router.post('/', async (req, res) => {
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

module.exports = router;