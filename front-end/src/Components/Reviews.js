import axios from 'axios';
import Review from './Review';
import ReviewForm from './ReviewForm';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Reviews() {
  const API = process.env.REACT_APP_API_URL;
  const [reviews, setReviews] = useState([]);

  let { id } = useParams();

  useEffect(() => {
    axios.get(`${API}/bookmarks/${id}/reviews`).then((response) => {
      setReviews(response.data);
    });
  }, [id, API]);

  const handleAdd = (newReview) => {
    axios
      .post(`${API}/bookmarks/${id}/reviews`, newReview)
      .then(
        (response) => {
          setReviews([response.data, ...reviews]);
        },
        (error) => console.error(error)
      )
      .catch((c) => console.warn('catch', c));
  };

  const handleDelete = (id) => {
    axios
      .delete(`${API}/bookmarks/${id}/reviews/${id}`)
      .then(
        () => {
          const copyReviewArray = [...reviews];
          const indexDeletedReview = copyReviewArray.findIndex((review) => {
            return review.id === id;
          });
          copyReviewArray.splice(indexDeletedReview, 1);
          setReviews(copyReviewArray);
        },
        (error) => console.error(error)
      )
      .catch((c) => console.warn('catch', c));
  };

  const handleEdit = (updatedReview) => {
    axios
      .put(`${API}/bookmarks/${id}/reviews/${updatedReview.id}`, updatedReview)
      .then((response) => {
        const copyReviewArray = [...reviews];
        const indexUpdatedReview = copyReviewArray.findIndex((review) => {
          return review.id === updatedReview.id;
        });
        copyReviewArray[indexUpdatedReview] = response.data;
        setReviews(copyReviewArray);
      })
      .catch((error) => console.warn('catch', error));
  };

  return (
    <section className='Reviews'>
      <h2>Reviews</h2>
      <ReviewForm handleSubmit={handleAdd}>
        <h3>Add a New Review</h3>
      </ReviewForm>
      {reviews.map((review) => (
        <Review
          key={review.id}
          review={review}
          handleSubmit={handleEdit}
          handleDelete={handleDelete}
        />
      ))}
    </section>
  );
}

export default Reviews;
