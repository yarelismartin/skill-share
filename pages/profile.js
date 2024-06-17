import { Button } from 'react-bootstrap';
import React from 'react';
import { signOut } from '../utils/auth';
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

      <Button variant="danger" onClick={signOut}>Sign Out</Button>
    </div>
  );
}
