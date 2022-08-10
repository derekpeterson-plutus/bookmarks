const db = require('../db/dbConfig');

const getAllReviews = async () => {
  try {
    const allReviews = await db.any('SELECT * FROM reviews');
    return allReviews;
  } catch (error) {
    return error;
  }
};

const getAReview = async (id) => {
  try {
    const review = await db.one('SELECT * FROM reviews WHERE id=$1', id);
    return review;
  } catch (error) {
    return error;
  }
};

const newReview = async () => {
  try {
    const newReview = await db.one(
      'INSERT INTO reviews (reviewer, title, content, rating, bookmark_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [
        review.id,
        review.reviewer,
        review.title,
        review.rating,
        review.bookmark_id,
      ]
    );
    return newReview;
  } catch (error) {
    return error;
  }
};

const updateReview = async (id, review) => {
  try {
    const updatedReview = await db.one(
      'UPDATE reviews SET reviewer=$1, title=$2, content=$3, rating=$4, bookmark_id=$5 WHERE id=$6 RETURNING *',
      [
        review.id,
        review.reviewer,
        review.title,
        review.rating,
        review.bookmark_id,
      ]
    );
    return updatedReview;
  } catch (error) {
    return error;
  }
};

const deleteReview = async (id) => {
  try {
    const deletedReview = await db.one(
      'DELETE FROM reviews WHERE id=$1 RETURNING *',
      id
    );
    return deletedReview;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getAllReviews,
  getAReview,
  newReview,
  updateReview,
  deleteReview,
};
