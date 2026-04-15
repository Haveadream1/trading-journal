const express = require('express');
const cors = require('cors');
const app = express();

// Fetch from env file or provide default port
const PORT = process.env.PORT || 3000;

// start the web server with the port from env
app.listen(PORT, () => {
  console.log(`Server is UP !`);
});

// Set up middleware, act as a bridge for communication between Frontend and Backend
app.use(cors()); // Enable React to communicate with the server
app.use(express.json());  // Enable the server to parse(read) JSON data from React

// Create connection with database from env URL
// Set up routes
