import React, { useEffect, useState } from 'react';
import { getSingleProfile } from '../../../api/profileData';
import { useAuth } from '../../../utils/context/authContext';
import ProfileForm from '../../../components/forms/ProfileForm';

export default function EitProfile() {
  const [profile, setProfile] = useState({});
  const { user } = useAuth();

  const getProfile = () => {
    getSingleProfile(user.uid).then(setProfile);
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div>
      <ProfileForm profileObj={profile} />
    </div>
  );
}
