require('dotenv').config(); // Tool used to load env variables, must be at the top

const app = require('./app');

// Fetch from env file or provide default port
const PORT = process.env.PORT || 3000;

// Start the server with the port from env
  // Must be always at the end of the file
app.listen(PORT, () => {
  console.log(`Server is UP on http://localhost:${PORT}/api/trades`);
  console.log(`Test route is UP on http://localhost:${PORT}/api/health`);
});
