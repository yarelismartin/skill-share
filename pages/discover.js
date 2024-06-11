import React, { useEffect, useState } from 'react';
import ProfileCard from '../components/ProfileCard';
import { getAllOtherProfiles } from '../api/profileData';
import { useAuth } from '../utils/context/authContext';

export default function Discover() {
  const [profiles, setProfiles] = useState([]);
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
        {profiles.map((profile) => (
          <ProfileCard key={profile.firebaseKey} profileObj={profile} />
        ))}
      </div>
    </>
  );
}
