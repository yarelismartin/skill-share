import { useEffect, useState } from 'react';
import { useAuth } from '../context/authContext';
import { allProfiles } from '../../api/profileData';

export default function useProfileCheck() {
  const { user } = useAuth(); // TODO: COMMENT IN FOR AUTH
  const [userHasProfile, setUserHasProfile] = useState(false);
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    allProfiles().then((data) => {
      setProfiles(data);
      const hasProfile = profiles.some((profile) => profile.uid === user.uid);
      setUserHasProfile(hasProfile);
    });
  }, [profiles, user.uid]);

  return userHasProfile;
}
