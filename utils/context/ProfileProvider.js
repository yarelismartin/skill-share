import React, {
  createContext, useContext, useState, useEffect,
} from 'react';
import PropTypes from 'prop-types';
import { useAuth } from './authContext';
import { allProfiles } from '../../api/profileData';

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const { user } = useAuth();
  const [userHasProfile, setUserHasProfile] = useState(false);

  useEffect(() => {
    if (user) {
      allProfiles().then((data) => {
        const hasProfile = data.some((profile) => profile.uid === user.uid);
        setUserHasProfile(hasProfile);
      });
    }
  }, [user]);

  return (
    <ProfileContext.Provider value={{ userHasProfile, setUserHasProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

ProfileProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context; // This should return the object { userHasProfile, setUserHasProfile }
};
