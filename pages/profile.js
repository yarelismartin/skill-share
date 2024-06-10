import { Button } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { signOut } from '../utils/auth';
import { getSingleProfile } from '../api/profileData';
import { useAuth } from '../utils/context/authContext';
import ProfileCard from '../components/ProfileCard';

export default function Profile() {
  const [userProfile, setUserProfile] = useState({});
  const { user } = useAuth();

  const getUserProfile = () => {
    getSingleProfile(user.uid).then(setUserProfile);
  };

  console.warn('profiles', userProfile);

  useEffect(() => {
    getUserProfile();
  }, [user.uid]);

  return (
    <div>
      <ProfileCard key={userProfile.firebaseKey} profileObj={userProfile} />

      <Button variant="danger" onClick={signOut}>Sign Out</Button>
    </div>
  );
}
