import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';
import { getSingleProfile } from '../api/profileData';

export default function ReviewCard({ reviewObj }) {
  const [reviewerName, setReviewerName] = useState({});

  // const getReviewer = () => {
  //   getSingleProfile(reviewObj.uid).then(setReviewerName);
  // };

  useEffect(() => {
    getSingleProfile(reviewObj.uid).then(setReviewerName);
  }, [reviewObj.uid]);

  return (
    <div>
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>{reviewerName.name}</Card.Title>
          <hr />
          <Card.Text>{reviewObj.review_post}</Card.Text>
          <footer> {formatDistanceToNow(new Date(reviewObj.timestamp), { addSuffix: true })} </footer>
        </Card.Body>
      </Card>
    </div>
  );
}

ReviewCard.propTypes = {
  reviewObj: PropTypes.shape({
    uid: PropTypes.string,
    review_post: PropTypes.string,
    timestamp: PropTypes.string,
  }).isRequired,
};
