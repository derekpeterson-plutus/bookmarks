const db = require('../db/dbConfig.js');

// SHOW ALL BOOKMARKS
const getAllBookmarks = async () => {
  try {
    const allBookmarks = await db.any('SELECT * FROM bookmarks');
    return allBookmarks;
  } catch (error) {
    return error.massage;
  }
};

// SHOW ONE BOOKMARK
const getBookmark = async (id) => {
  try {
    const oneBookmark = await db.one('SELECT * FROM bookmarks WHERE id=$1', id);
    return oneBookmark;
  } catch (error) {
    return error.massage;
  }
};

// CREATE
const createBookmark = async (bookmark) => {
  try {
    const newBookmark = await db.one(
      'INSERT INTO bookmarks (name, url, category, is_favorite) VALUES($1, $2, $3, $4) RETURNING *',
      [bookmark.name, bookmark.url, bookmark.category, bookmark.is_favorite]
    );
    return newBookmark;
  } catch (error) {
    return error.message;
  }
};

module.exports = { getAllBookmarks, getBookmark, createBookmark };
