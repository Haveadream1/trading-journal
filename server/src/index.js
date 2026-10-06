/* global process */

import { app } from "./app.js";

// Fetch from env file or provide default port
const PORT = process.env.PORT || 3000;

// Start the server with the port from env
  // Must be always at the end of the file
app.listen(PORT, () => {
  console.log(`Server is running: http://localhost:${PORT}/health`);
});

