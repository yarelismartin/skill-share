import React from 'react';
import ProfileTab from '../../components/ProfileTab';
import Bio from '../../components/Bio';
import Review from '../../components/Review';

export default function ProfileDeatil() {
  return (
    <div>
      <ProfileTab>
        <Bio label="Bio" />
        <Review label="Review" />
      </ProfileTab>
    </div>
  );
}
