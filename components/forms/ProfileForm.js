import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { createProfile, updateProfile } from '../../api/profileData';
import { useAuth } from '../../utils/context/authContext';

const initialValue = {
  name: '',
  location: '',
  skill: '',
  learning_preference: '',
  bio: '',
  image: '',
};

export default function ProfileForm({ profileObj, onUpdate }) {
  const [formInput, setFormInput] = useState(initialValue);
  const { user } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (profileObj.firebaseKey) {
      updateProfile(formInput).then(() => {
        onUpdate();
      });
    } else {
      const payload = { ...formInput, uid: user.uid };
      createProfile(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateProfile(patchPayload).then(() => {
          onUpdate();
        });
      });
    }
  };

  useEffect(() => {
    if (profileObj.firebaseKey) setFormInput(profileObj);
  }, [profileObj]);

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <h2 style={{ textAlign: 'center' }}>{profileObj.firebaseKey ? 'Update Profile' : ''}</h2>

        {/* NAME INPUT  */}
        <Form.Group className="mb-3 input-form">
          <Form.Control
            type="text"
            placeholder="Name"
            name="name"
            value={formInput.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/* IMAGE INPUT  */}
        <Form.Group className="mb-3 input-form">
          <Form.Control
            type="text"
            placeholder="Attach an image URL of yourself"
            name="image"
            value={formInput.image}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/* LOCATION INPUT  */}
        <Form.Group className="mb-3 input-form">
          <Form.Control
            type="text"
            placeholder="City, State"
            name="location"
            value={formInput.location}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/* SKILL INPUT  */}
        <Form.Group className="input-form">
          <Form.Control
            type="text"
            placeholder="Skill"
            name="skill"
            value={formInput.skill}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/* LEARNING PREFERENCE INPUT  */}
        <Form.Group className="input-form">
          <Form.Select
            name="learning_preference"
            value={formInput.learning_preference}
            onChange={handleChange}
            required
          >
            <option value="" hidden> Learning Preference</option>
            <option value="Online">Online</option>
            <option value="In Person">In Person</option>
          </Form.Select>
        </Form.Group>

        {/* BIO INPUT  */}
        <Form.Group className="input-form">
          <Form.Control
            as="textarea"
            rows={10}
            placeholder="Tell us about yourself..."
            name="bio"
            value={formInput.bio}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <div className="text-center"> {/* Centering the button */}
          <Button type="submit">{profileObj.firebaseKey ? 'Update' : 'Create'} Profile</Button>
        </div>
      </Form>
    </div>
  );
}

ProfileForm.propTypes = {
  profileObj: PropTypes.shape({
    name: PropTypes.string,
    location: PropTypes.string,
    learning_preference: PropTypes.string,
    skill: PropTypes.string,
    bio: PropTypes.string,
    firebaseKey: PropTypes.string,
    image: PropTypes.string,
  }),
  onUpdate: PropTypes.func.isRequired,
};

ProfileForm.defaultProps = {
  profileObj: initialValue,
};
