/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useAuth } from '../../utils/context/authContext';
import { createReview, updateReview } from '../../api/reviewData';

const initialValue = {
  review_post: '',
};

export default function ReviewForm({ getReviews }) {
  const [formInput, setFormInput] = useState(initialValue);
  const { user } = useAuth();
  const router = useRouter();

  const reviewedUserId = router.query;

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formInput, uid: user.uid, timestamp: new Date(), reviewed_user_id: (reviewedUserId.uid),
    };
    createReview(payload).then(({ name }) => {
      const patchPayload = { firebaseKey: name };
      updateReview(patchPayload).then(() => {
        setFormInput(initialValue);
        getReviews();
      });
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div style={{
      border: '1px solid', margin: '20px auto', padding: '15px', borderRadius: '10px', borderColor: '#0089FF',
    }}
    >
      <Form onSubmit={handleSubmit} className="pop-font">
        <Form.Group className="input-form" style={{ marginTop: '0px' }}>
          <Form.Control
            style={{
              border: '1.6px solid', borderColor: '#CBC9C9', fontSize: '14px',
            }}
            as="textarea"
            rows={5}
            placeholder="Create Review..."
            name="review_post"
            value={formInput.review_post}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <hr style={{ backgroundColor: '#CBC9C9', margin: '10px' }} />
        <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '10px' }}>
          <Button style={{ fontSize: '14px' }} type="submit">Review</Button>
        </div>
      </Form>
    </div>
  );
}

ReviewForm.propTypes = {
  getReviews: PropTypes.func.isRequired,
};
