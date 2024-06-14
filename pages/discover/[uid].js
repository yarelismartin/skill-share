import React from 'react';
import Bio from '../../components/Bio';
import Review from '../../components/Review';
import Tab from '../../components/Tab';

export default function ProfileDeatil() {
  return (
    <div>
      <Tab>
        <Bio label="Bio" />
        <Review label="Review" />
      </Tab>
    </div>
  );
}
