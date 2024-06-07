import React, { useEffect, useState } from 'react';
import ProfileCard from '../components/ProfileCard';
import getAllOtherProfiles from '../api/profileData';
import { useAuth } from '../utils/context/authContext';

export default function Discover() {
  const [profiles, setProfiles] = useState([]);
  const { user } = useAuth();

  const getAllProfiles = () => {
    getAllOtherProfiles(user.uid).then(setProfiles);
  };

  useEffect(() => {
    getAllProfiles();
  }, []);

  return (
    <div>
      <h1>Discover</h1>
      <div>
        {profiles.map((profile) => (
          <ProfileCard key={profile.firebaseKey} profileObj={profile} />
        ))}
      </div>

    </div>
  );
}
