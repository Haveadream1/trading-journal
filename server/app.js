const express = require('express');
const cors = require('cors');
const app = express();

// Set up middleware, act as a bridge for communication between Frontend and Backend

// Enable React to communicate with the server
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://trading-journal-2jli.vercel.app',
    /\.vercel\.app$/
  ],
  credentials: true
}));

app.use(express.json());  // Enable the server to parse(read) JSON data from React

// Set up test route
  // api/health is a common used route to check if server is running
app.get('/api/health', (req, res) => {
  // Adding the formatted timestamp is a good practice for debugging
  res.json({ 
    message: 'Server is running correctly',
    timestamp: new Date().toLocaleString() // ie: 4/19/2026, 3:09:40 PM
  });
});

// Import routes
  // Allow us to assign a middleware to a specified route
app.use('/api/articles', require('./routes/articles'));
app.use('/api/trades', require('./routes/trades'));
app.use('/api/statistics', require('./routes/statistics'));

module.exports = app;