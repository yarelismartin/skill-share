/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ReviewForm from './forms/ReviewForm';
import ReviewCard from './ReviewCard';
import { getReviewsForUser } from '../api/reviewData';
import { useAuth } from '../utils/context/authContext';

export default function Review() {
  const [reviews, setReviews] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  const reviewedUser = router.query;

  const getReviews = async () => {
    let userId;
    if (router.pathname.startsWith('/discover/') && reviewedUser.uid) {
      userId = reviewedUser.uid;
    } else {
      userId = user.uid;
    }

    const fetchedReviews = await getReviewsForUser(userId);
    const sortedReviews = fetchedReviews.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    setReviews(sortedReviews);
  };

  console.warn(reviews, user.uid);

  useEffect(() => {
    getReviews();
  }, [router.pathname, user.uid, reviewedUser.uid]);

  return (
    <div>
      { router.pathname.startsWith('/discover/') && (<ReviewForm getReviews={getReviews} />)}

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {reviews.map((review) => (
          <ReviewCard key={review.firebaseKey} reviewObj={review} onUpdate={getReviews} />
        ))}
      </div>

    </div>
  );
}
