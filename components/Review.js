import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ReviewForm from './forms/ReviewForm';
import ReviewCard from './ReviewCard';
import { getReviewsForUser } from '../api/reviewData';

export default function Review() {
  const [reviews, setReviews] = useState([]);
  const router = useRouter();

  const reviewedUser = router.query;
  const getReviews = () => {
    getReviewsForUser(reviewedUser.uid).then(setReviews);
  };

  useEffect(() => {
    getReviews();
  }, []);

  return (
    <div>
      <ReviewForm />
      {reviews.map((review) => (
        <ReviewCard key={review.firebaseKey} reviewObj={review} />
      ))}

    </div>
  );
}
