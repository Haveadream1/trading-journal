const express = require('express');
const app = express();

// start the web server with the port 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is UP !`);
});
