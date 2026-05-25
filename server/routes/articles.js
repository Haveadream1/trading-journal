const express = require('express');
const router = express.Router();
const pool = require('../database'); // Import the database connection pool

// Set up a route to securely fetch articles from API
    // router is a built-in feature that allows to create modular code
        // Helps splitting our app.js into smaller files
router.get('/', async (req, res) => {
  const API_KEY = process.env.FMP_API_KEY;
  const API_URL = `https://financialmodelingprep.com/stable/fmp-articles?page=0&limit=2&apikey=${API_KEY}`;

  const response = await fetch(API_URL);
  const articles = await response.json();

  res.json(articles);
})

module.exports = router;