import { Button } from 'react-bootstrap';
import React from 'react';
import { signOut } from '../utils/auth';

export default function profile() {
  return (
    <div>
      <Button variant="danger" onClick={signOut}>Sign Out</Button>
    </div>
  );
}
