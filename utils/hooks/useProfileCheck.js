// import { useEffect, useState } from 'react';
// import { useAuth } from '../context/authContext';
// import { allProfiles } from '../../api/profileData';

// export default function useProfileCheck() {
//   const { user } = useAuth(); // TODO: COMMENT IN FOR AUTH
//   const [userHasProfile, setUserHasProfile] = useState(null);

//   useEffect(() => {
//     allProfiles().then((data) => {
//       const hasProfile = data.some((profile) => profile.uid === user.uid);
//       setUserHasProfile(hasProfile);
//     });
//   }, [user.uid]);

//   return userHasProfile;
// }

import { useEffect, useState } from 'react';
import { useAuth } from '../context/authContext';
import { allProfiles } from '../../api/profileData';

export default function useProfileCheck() {
  const { user } = useAuth();
  const [userHasProfile, setUserHasProfile] = useState(null);

  useEffect(() => {
    if (user) { // Ensure user is not null
      allProfiles().then((data) => {
        const hasProfile = data.some((profile) => profile.uid === user.uid);
        setUserHasProfile(hasProfile);
      });
    }
  }, [user]); // Depend on user object to re-run when user changes

  return userHasProfile;
}

// import { useEffect, useState } from 'react';
// import { useAuth } from '../context/authContext';
// import { allProfiles } from '../../api/profileData';

// export default function useProfileCheck() {
//   const { user } = useAuth(); // TODO: COMMENT IN FOR AUTH
//   const [userHasProfile, setUserHasProfile] = useState(false);
//   const [profiles, setProfiles] = useState([]);

//   useEffect(() => {
//     allProfiles().then((data) => {
//       setProfiles(data);
//       const hasProfile = profiles.some((profile) => profile.uid === user.uid);
//       setUserHasProfile(hasProfile);
//     });
//   }, [profiles, user.uid]);

//   return userHasProfile;
// }
