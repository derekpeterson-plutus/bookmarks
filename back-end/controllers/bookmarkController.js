//DEPENDENCIES SETUP
const express = require('express');
const bookmarks = express.Router();
const { checkBoolean, checkName } = require('../validations/checkBookmarks');
const {
  getAllBookmarks,
  getBookmark,
  createBookmark,
} = require('../queries/bookmarks');

// INDEX
// bookmarks.get('/', (req, res) => {
//   res.json({ status: 'Everything is OK!' });
// });

// INDEX
bookmarks.get('/', async (req, res) => {
  const allBookmarks = await getAllBookmarks();
  if (allBookmarks[0]) {
    res.status(200).json(allBookmarks);
  } else {
    res.status(500).json({ error: 'Server Error!' });
  }
});

// SHOW
bookmarks.get('/:id', async (req, res) => {
  const { id } = req.params;
  const bookmark = await getBookmark(id);
  if (bookmark) {
    res.json(bookmark);
  } else {
    res.status(404).json({ error: 'Not found!' });
  }
});

// CREATE SHOW ROUTE
bookmarks.post('/', checkBoolean, checkName, async (req, res) => {
  try {
    const bookmark = await createBookmark(req.body);
    res.json(bookmark);
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

module.exports = bookmarks;
