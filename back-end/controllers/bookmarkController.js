//DEPENDENCIES SETUP
const express = require('express');
const bookmarks = express.Router();

const {
  checkBoolean,
  checkName,
  validateURL,
} = require('../validations/checkBookmarks');

const {
  getAllBookmarks,
  getBookmark,
  createBookmark,
  updateBookmark,
  deleteBookmark,
} = require('../queries/bookmarks');

const reviewsController = require('./reviewsController');
bookmarks.use('/:bookmarkId/reviews', reviewsController);

// INDEX
// bookmarks.get('/', (req, res) => {
//   res.json({ status: 'Everything is OK!' });
// });

// INDEX (SHOW ALL BOOKMARKS)
bookmarks.get('/', async (req, res) => {
  const allBookmarks = await getAllBookmarks();
  if (allBookmarks) {
    res.status(200).json(allBookmarks);
  } else {
    res.status(500).json({ error: 'Server Error!' });
  }
});

// SHOW INDIVIDUAL BOOKMARK BY ID
bookmarks.get('/:id', async (req, res) => {
  const { id } = req.params;
  const bookmark = await getBookmark(id);
  if (bookmark) {
    res.json(bookmark);
  } else {
    res
      .status(404)
      .json({ error: `Bookmark with id number ${id} is not found!` });
  }
});

// CREATE SHOW ROUTE
bookmarks.post('/', checkBoolean, checkName, validateURL, async (req, res) => {
  try {
    const bookmark = await createBookmark(req.body);
    res.json(bookmark);
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

// UPDATE ROUTE
bookmarks.put(
  '/:id',
  checkBoolean,
  checkName,
  validateURL,
  async (req, res) => {
    const { id } = req.params;
    const updatedBookmark = await updateBookmark(id, req.body);
    res.status(200).json(updatedBookmark);
  }
);

// DELETE
bookmarks.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const deletedBookmark = await deleteBookmark(id);
  if (deletedBookmark.id) {
    res.status(200).json(deleteBookmark);
  } else {
    res
      .status(404)
      .json({ error: `Bookmark with id number ${id} is not found!` });
  }
});

module.exports = bookmarks;
