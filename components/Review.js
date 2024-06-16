import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ReviewForm from './forms/ReviewForm';
import ReviewCard from './ReviewCard';
import { getReviewsForUser } from '../api/reviewData';

export default function Review() {
  const [reviews, setReviews] = useState([]);
  const router = useRouter();

  const reviewedUser = router.query;
  const getReviews = async () => {
    const fetchedReviews = await getReviewsForUser(reviewedUser.uid);
    const sortedReviews = fetchedReviews.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    setReviews(sortedReviews);
  };

  useEffect(() => {
    getReviews();
  }, []);

  return (
    <div>
      <ReviewForm getReviews={getReviews} />
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {reviews.map((review) => (
          <ReviewCard key={review.firebaseKey} reviewObj={review} onUpdate={getReviews} />
        ))}
      </div>

    </div>
  );
}
