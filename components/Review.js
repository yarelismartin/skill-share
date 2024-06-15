import React from 'react';
import ReviewForm from './forms/ReviewForm';
import ReviewCard from './ReviewCard';

export default function Review() {
  // const [ reviews, setReviews ] = useState();
  return (
    <div>
      <ReviewForm />
      <ReviewCard />
    </div>
  );
}
