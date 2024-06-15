/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useAuth } from '../../utils/context/authContext';
import { createReview, updateReview } from '../../api/reviewData';

const initialValue = {
  review_post: '',
};

export default function ReviewForm() {
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
      updateReview(patchPayload).then(() => setFormInput(initialValue));
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
    <div style={{ width: '80%' }}>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="input-form">
          <Form.Control
            as="textarea"
            rows={5}
            placeholder="Create Review"
            name="review_post"
            value={formInput.review_post}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button type="submit">Review</Button>
      </Form>
    </div>
  );
}
