/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useAuth } from '../../utils/context/authContext';
import { createComment, updateComment } from '../../api/commentData';

const initialValue = {
  content: '',
};

export default function CommetnForm({ getComments }) {
  const [formInput, setFormInput] = useState(initialValue);
  const { user } = useAuth();
  const router = useRouter();

  const postID = router.query;

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formInput, uid: user.uid, timestamp: new Date(), post_id: (postID.firebaseKey),
    };
    createComment(payload).then(({ name }) => {
      const patchPayload = { firebaseKey: name };
      updateComment(patchPayload).then(() => {
        setFormInput(initialValue);
        getComments();
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
      border: '1px solid', margin: '20px auto', padding: '15px 0px', borderRadius: '10px', borderColor: '#0089FF',
    }}
    >
      <Form onSubmit={handleSubmit}>
        <Form.Group className="input-form" style={{ marginTop: '0px' }}>
          <Form.Control
            style={{
              border: '1.6px solid', borderColor: '#CBC9C9', fontSize: '14px',
            }}
            as="textarea"
            rows={5}
            placeholder="Make a comment..."
            name="content"
            value={formInput.content}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <hr style={{ backgroundColor: '#CBC9C9', margin: '10px' }} />
        <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '10px' }}>
          <Button style={{ fontSize: '14px' }} type="submit">Comment</Button>
        </div>
      </Form>
    </div>
  );
}

CommetnForm.propTypes = {
  getComments: PropTypes.func.isRequired,
};
