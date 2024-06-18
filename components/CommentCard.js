/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { formatDistanceToNow } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { getSingleProfile } from '../api/profileData';
import { deleteComment } from '../api/commentData';
import { useAuth } from '../utils/context/authContext';

export default function CommentCard({ commentObj, onUpdate }) {
  const [commenterName, setCommenterName] = useState({});
  const { user } = useAuth();

  const handleClick = () => {
    if (window.confirm('Are you sure you want to delete your comment? ')) {
      deleteComment(commentObj.firebaseKey).then(onUpdate);
    }
  };

  const getAProfile = () => {
    getSingleProfile(commentObj.uid).then(setCommenterName);
  };

  useEffect(() => {
    getAProfile();
  }, []);

  return (
    <div>
      <Card style={{ margin: '15px auto', border: 'none' }}>
        <Card.Body>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                }}
                src={commenterName.image}
                alt="profile-pic"
              />
              <Card.Title style={{ marginLeft: '8px' }}>{commenterName.name?.split(' ')[0]}</Card.Title>
            </div>
            {commentObj.uid === user.uid && (
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={handleClick}
              style={{ cursor: 'pointer' }}
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11 1.33333V0H5V1.33333H0.5V4H15.5V1.33333H11ZM13 16L14 5.33333H2L3 16H13Z"
                fill="#9C2929"
              />
            </svg>
            )}
          </div>
          <Card.Text style={{ fontSize: '14px', marginTop: '10px' }}>{commentObj.content}</Card.Text>
          <footer style={{ fontSize: '12px', marginTop: '-5px' }}>
            {formatDistanceToNow(new Date(commentObj.timestamp), { addSuffix: true })}
          </footer>
        </Card.Body>
      </Card>
    </div>
  );
}

CommentCard.propTypes = {
  commentObj: PropTypes.shape({
    uid: PropTypes.string,
    content: PropTypes.string,
    timestamp: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
