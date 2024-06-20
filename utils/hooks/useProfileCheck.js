import { useEffect, useState } from 'react';
import { useAuth } from '../context/authContext';
import { allProfiles } from '../../api/profileData';

export default function useProfileCheck() {
  const { user } = useAuth(); // TODO: COMMENT IN FOR AUTH
  const [userHasProfile, setUserHasProfile] = useState(user);

  useEffect(() => {
    allProfiles().then((data) => {
      const hasProfile = data.some((profile) => profile.uid === user.uid);
      setUserHasProfile(hasProfile);
    });
  }, [user.uid]);

  return userHasProfile;
}
