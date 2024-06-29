import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { createPost, updatePost } from '../../api/postData';
import { useAuth } from '../../utils/context/authContext';
import getCategories from '../../api/categoryDate';

const initialValue = {
  title: '',
  image: '',
  content: '',
};

function PostForm({ postObj }) {
  const [formInput, setFormInput] = useState(initialValue);
  const [selectCategory, setSelectCategory] = useState([]);
  const { user } = useAuth();
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (postObj.firebaseKey) {
      updatePost(formInput).then(() => router.push('/community'));
    } else {
      const payload = { ...formInput, uid: user.uid, timestamp: new Date() };
      createPost(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updatePost(patchPayload).then(() => router.push('/community'));
      });
    }
  };

  const getAllCategories = () => {
    getCategories().then(setSelectCategory);
  };

  useEffect(() => {
    getAllCategories();
    if (postObj?.firebaseKey) setFormInput(postObj);
  }, [postObj]);

  return (
    <div>
      <Form onSubmit={handleSubmit} className="pop-font">
        <h2 style={{ marginTop: '20px' }}>{postObj.firebaseKey ? 'Update' : 'Create'} Post</h2>

        {/* <Select Category/> */}
        <Form.Group className="input-form">
          <Form.Select
            name="category_id"
            value={formInput.category_id}
            onChange={handleChange}
            required
          >
            <option value="" hidden>Choose a categpry</option>
            {selectCategory?.map((category) => (
              <option
                key={category.firebaseKey}
                value={category.firebaseKey}
              >{category.category_name}
              </option>
            ))}

          </Form.Select>
        </Form.Group>

        {/* TITLE INPUT  */}
        <Form.Group className="mb-3 input-form">
          <Form.Control
            type="text"
            placeholder="Post Title..."
            name="title"
            value={formInput.title}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/* IMAGE INPUT  */}
        <Form.Group className="mb-3 input-form">
          <Form.Control
            type="text"
            placeholder="Attach an image URL address"
            name="image"
            value={formInput.image}
            onChange={handleChange}
          />
        </Form.Group>

        {/* CONTENT INPUT  */}
        <Form.Group className="mb-3 input-form" controlId="exampleForm.ControlTextarea1">
          <Form.Control
            as="textarea"
            rows={7}
            placeholder="What would you like to share?"
            name="content"
            value={formInput.content}
            onChange={handleChange}
          />
        </Form.Group>

        <Button style={{ marginTop: '15px' }} type="submit">
          <svg style={{ marginRight: '8px' }} width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.9167 1.58334L5.95834 7.54168" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M11.9167 1.58334L8.125 12.4167L5.95834 7.54168L1.08334 5.37501L11.9167 1.58334Z" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {postObj.firebaseKey ? 'Update' : ''} Post
        </Button>
      </Form>
    </div>
  );
}
/* reached mvp */
PostForm.propTypes = {
  postObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    title: PropTypes.string,
    image: PropTypes.string,
    content: PropTypes.string,
  }),
};

PostForm.defaultProps = {
  postObj: initialValue,
};

export default PostForm;
