const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const itemRoutes = require('./routes/routes');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configure routes
app.use('/', itemRoutes);

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
