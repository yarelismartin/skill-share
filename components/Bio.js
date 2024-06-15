import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ProfileDetailCard from './ProfileDetailCard';
import { getSingleProfile } from '../api/profileData';

export default function Bio() {
  const [userProfile, setUserProfile] = useState({});
  const router = useRouter();
  const { uid } = router.query;

  useEffect(() => {
    getSingleProfile(uid).then(setUserProfile);
  }, [uid]);

  return (
    <div>
      <ProfileDetailCard profileObj={userProfile} />

    </div>
  );
}
