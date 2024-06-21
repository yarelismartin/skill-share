/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleProfile } from '../../../api/profileData';
import { useAuth } from '../../../utils/context/authContext';
import ProfileForm from '../../../components/forms/ProfileForm';

export default function EitProfile() {
  const [profile, setProfile] = useState({});
  const { user } = useAuth();
  const router = useRouter();

  const getProfile = () => {
    getSingleProfile(user.uid).then(setProfile);
  };

  const handleUpdate = () => {
    router.push('/profile');
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div>
      <ProfileForm profileObj={profile} onUpdate={handleUpdate} />
    </div>
  );
}
