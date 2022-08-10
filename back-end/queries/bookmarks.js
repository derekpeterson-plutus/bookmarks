//const { as } = require('pg-promise');
const db = require('../db/dbConfig.js');

// INDEX SHOW ALL BOOKMARKS
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
    return error.message;
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

// UPDATE
const updateBookmark = async (id, bookmark) => {
  try {
    const updatedBookmark = await db.one(
      'UPDATE bookmarks SET name=$1, url=$2, category=$3, is_favorite=$4 WHERE id=$5 RETURNING *',
      [bookmark.name, bookmark.url, bookmark.category, bookmark.is_favorite, id]
    );
    return updatedBookmark;
  } catch (error) {
    return error.message;
  }
};

// DELETE
const deleteBookmark = async (id) => {
  try {
    const deletedBookmark = await db.one(
      'DELETE FROM bookmarks WHERE id=$1 RETURNING *',
      id
    );
    return deletedBookmark;
  } catch (error) {
    return error.message;
  }
};

module.exports = {
  getAllBookmarks,
  getBookmark,
  createBookmark,
  updateBookmark,
  deleteBookmark,
};
