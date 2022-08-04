// DEPENDENCIES SETUP
const app = require('./app.js');

// CONFIGURATION SETUP
require('dotenv').config();
const PORT = process.env.PORT || 3003;

// LISTENING TO PORT 3003
app.listen(PORT, () => {
  console.log(`Listening to traffic on port: ${PORT}`);
});
