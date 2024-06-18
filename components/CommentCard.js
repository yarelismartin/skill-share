/* eslint-disable @next/next/no-img-element */
import { formatDistanceToNow } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { getSingleProfile } from '../api/profileData';

export default function CommentCard({ commentObj }) {
  const [commenterName, setCommenterName] = useState({});

  const getAProfile = () => {
    getSingleProfile(commentObj.uid).then(setCommenterName);
  };

  useEffect(() => {
    getAProfile();
  }, []);

  return (
    <div>
      <Card style={{ width: '18rem', margin: '15px auto', boxShadow: ' 0 2px 4px rgba(0, 0, 0, 0.1)' }}>
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
            {/* {commentObj.uid === user.uid && (
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
            )} */}
          </div>
          <Card.Text>{commentObj.content}</Card.Text>
          <footer style={{ fontSize: 'smaller' }}>
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
  }).isRequired,
};
