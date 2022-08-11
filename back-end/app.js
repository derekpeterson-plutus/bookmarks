// DEPENDENCIES SETUP
const cors = require('cors');
const express = require('express');

// CONFIGURATION SETUP
const app = express();

// MIDDLEWARE SETUP
app.use(cors());
app.use(express.json());

// HOME ROUTE SETUP
app.get('/', (req, res) => {
  res.send(' 👋 Welcome to Bookmarks App! Nice to meet you!');
});

// IMPORT Bookmarks ROUTES
const bookmarksController = require('./controllers/bookmarkController.js');
app.use('/bookmarks', bookmarksController);

// IMPORT Reviews ROUTES
// After updating the route in reviewController.js and bookmarkController.js, we can comment out the codes below
//const reviewsController = require('./controllers/reviewsController.js');
//app.use('/reviews', reviewsController);

// 404 PAGE
app.get('*', (req, res) => {
  res.status(404).send('Page not found');
});

// EXPORT
module.exports = app;
