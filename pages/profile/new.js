import React from 'react';
import { useRouter } from 'next/router';
import ProfileForm from '../../components/forms/ProfileForm';
import { useProfile } from '../../utils/context/ProfileProvider';

export default function NewProfile() {
  const router = useRouter();
  const { setUserHasProfile } = useProfile();

  const handleUpdate = () => {
    // Navigate to the discover page first
    setUserHasProfile(true);
    router.push('/discover');
  };

  return (
    <div style={{ padding: '30px' }}>
      <ProfileForm onUpdate={handleUpdate} />
    </div>
  );
}
