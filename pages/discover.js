/* eslint-disable max-len */
import React, { useEffect, useRef, useState } from 'react';
import { Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import ProfileCard from '../components/ProfileCard';
import { getAllOtherProfiles } from '../api/profileData';
import { useAuth } from '../utils/context/authContext';

export default function Discover() {
  const [profiles, setProfiles] = useState([]);
  const [search, setSearch] = useState('');
  const sendDiscoverRef = useRef(null);

  const { user } = useAuth();

  const getAllProfiles = () => {
    getAllOtherProfiles(user.uid).then(setProfiles);
  };

  useEffect(() => {
    getAllProfiles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleScroll = () => {
    if (typeof window !== 'undefined') {
      sendDiscoverRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', margin: '25px' }}>
        <div style={{ width: '30%', maxWidth: '600px' }}>
          <br ref={sendDiscoverRef} />
          <Form className="search-bar" style={{ marginTop: '20px', marginBottom: '20px', position: 'relative' }}>
            <OverlayTrigger
              placement="bottom"
              overlay={<Tooltip id="tooltip">Search by name, skill, location, or learning preference...</Tooltip>}
            >
              <Form.Control
                type="search"
                placeholder="Search by criteria..."
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Search"
                style={{ width: '100%', paddingLeft: '40px', borderRadius: '20px' }}
              />
            </OverlayTrigger>
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)',
              }}
            >
              <g clipPath="url(#clip0_2_27)">
                <path d="M12.5322 19.0332C13.9297 19.0332 15.2393 18.6113 16.3291 17.8906L20.1787 21.749C20.4336 21.9951 20.7588 22.1182 21.1104 22.1182C21.8398 22.1182 22.376 21.5469 22.376 20.8262C22.376 20.4922 22.2617 20.167 22.0156 19.9209L18.1924 16.0801C18.9834 14.9551 19.4492 13.5928 19.4492 12.1162C19.4492 8.31055 16.3379 5.19922 12.5322 5.19922C8.73535 5.19922 5.61523 8.31055 5.61523 12.1162C5.61523 15.9219 8.72656 19.0332 12.5322 19.0332ZM12.5322 17.1875C9.74609 17.1875 7.46094 14.9023 7.46094 12.1162C7.46094 9.33008 9.74609 7.04492 12.5322 7.04492C15.3184 7.04492 17.6035 9.33008 17.6035 12.1162C17.6035 14.9023 15.3184 17.1875 12.5322 17.1875Z" fill="#3C3C43" fillOpacity="0.6" />
              </g>
              <defs>
                <clipPath id="clip0_2_27">
                  <rect width="28" height="28" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </Form>
        </div>
      </div>

      <div style={{
        display: 'flex', flexWrap: 'wrap', justifyContent: 'center', margin: '25px',
      }}
      >
        {profiles.filter((item) => (search.toLowerCase() === ''
          ? item
          : item.name.toLowerCase().includes(search)
      || item.location.toLowerCase().includes(search)
      || item.learning_preference.toLowerCase().includes(search)
      || item.skill.toLowerCase().includes(search))).map((item) => (
        <ProfileCard key={item.firebaseKey} profileObj={item} />
        ))}
      </div>
      <div style={{
        display: 'flex', justifyContent: 'flex-end', marginTop: '30px', paddingBottom: '30px', marginRight: '40px',
      }}
      >
        <button aria-label="scroll-to-send" type="button" onClick={handleScroll} style={{ border: 'none', backgroundColor: 'inherit' }}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="scroll-down">
            <circle cx="12" cy="12" r="8" transform="rotate(-90 12 12)" stroke="black" strokeWidth="1.00088" strokeLinejoin="round" />
            <path d="M8.25 13.75C9.8121 12.1879 10.6879 11.3121 12.25 9.75L16.25 13.75" stroke="black" strokeWidth="1.00088" strokeLinejoin="round" />
          </svg>

        </button>
      </div>
    </>
  );
}
