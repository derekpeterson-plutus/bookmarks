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

// Bookmarks ROUTES
const bookmarksController = require('./controllers/bookmarkController.js');
app.use('/bookmarks', bookmarksController);

// 404 PAGE
app.get('*', (req, res) => {
  res.status(404).send('Page not found');
});

// EXPORT
module.exports = app;
