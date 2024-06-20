import React from 'react';
import Tab from '../components/Tab';
import Bio from '../components/Bio';
import Review from '../components/Review';

export default function Profile() {
  return (
    <div>
      <Tab>
        <Bio label="Bio" />
        <Review label="Review" />
      </Tab>
    </div>
  );
}
