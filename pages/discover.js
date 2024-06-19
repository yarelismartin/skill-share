import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import ProfileCard from '../components/ProfileCard';
import { getAllOtherProfiles } from '../api/profileData';
import { useAuth } from '../utils/context/authContext';

export default function Discover() {
  const [profiles, setProfiles] = useState([]);
  const [search, setSearch] = useState('');

  const { user } = useAuth();

  const getAllProfiles = () => {
    getAllOtherProfiles(user.uid).then(setProfiles);
  };

  useEffect(() => {
    getAllProfiles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div style={{
        display: 'flex', flexWrap: 'wrap', justifyContent: 'center', margin: '25px',
      }}
      >
        <div style={{ margin: '0 auto', maxWidth: '400px' }}>
          <Form className="d-flex" style={{ marginTop: '30px', marginBottom: '20px' }}>
            <Form.Control
              type="search"
              placeholder="Search"
              onChange={(e) => setSearch(e.target.value)}
              className="me-2"
              aria-label="Search"
              style={{ width: '100%' }}
            />
          </Form>
        </div>

        {profiles.filter((item) => (search.toLowerCase() === ''
          ? item
          : item.name.toLowerCase().includes(search)
        || item.location.toLowerCase().includes(search)
        || item.learning_preference.toLowerCase().includes(search)
        || item.skill.toLowerCase().includes(search))).map((item) => (
          <ProfileCard key={item.firebaseKey} profileObj={item} />
        ))}
      </div>
    </>
  );
}
