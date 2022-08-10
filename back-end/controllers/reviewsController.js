const express = require('express');
//const db = require('../db/dbConfig');

const { getBookmark } = require('../queries/bookmarks');

const reviews = express.Router({ mergeParams: true });

const {
  getAllReviews,
  getAReview,
  newReview,
  updateReview,
  deleteReview,
} = require('../queries/reviews');

// INDEX
reviews.get('/', async (req, res) => {
  const { bookmarkId } = req.params;
  const allReviews = await getAllReviews(bookmarkId);
  if (allReviews) {
    res.status(200).json(allReviews);
  } else {
    res.status(500).json({ error: 'Server error!' });
  }
});

// GET ONE REVIEW (SHOW PAGE)
reviews.get('/:id', async (req, res) => {
  const { id } = req.params;
  const review = await getAReview(id);
  if (review) {
    res.status(200).json(review);
  } else {
    res.status(500).json({ error: 'Sorry! Server error!' });
  }
});

// UPDATE A REVIEW
reviews.put('/:id', async (req, res) => {
  const { id } = req.params;
  const updatedReview = await updateReview(id, req.body);
  if (updatedReview.id) {
    res.status(200).json(updatedReview);
  } else {
    res.status(404).json({ error: 'Sorry! Review not found!' });
  }
});

// CREATE A NEW REVIEW
reviews.post('/', async (req, res) => {
  const review = await newReview(req.body);
  res.status(200).json(review);
});

// DELETE A REVIEW
reviews.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const deletedReview = await deleteReview(id);
  if (deletedReview.id) {
    res.status(200).json(deletedReview);
  } else {
    res.status(404).json({ error: 'Sorry! Review not found!' });
  }
});

module.exports = reviews;
