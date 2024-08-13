import React from 'react';
import { Button, Image } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { signIn } from '../utils/auth';

function Signin() {
  const router = useRouter();

  const handleSignIn = async () => {
    await signIn();
    router.push('/'); // Navigate to the dashboard page after signing in
  };

  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-items-center login-container"
      style={{
        height: '100vh',
        padding: '30px',
        width: '100%',
        margin: '0 auto',
      }}
    >
      <Image src="/skill-logo.png" classname="login-skill-logo" alt="Skill Logo" width="500px" height="150" />
      <p
        className="style-font login-text"
        style={{
          fontSize: '18px', textAlign: 'center', maxWidth: '420px', marginTop: '20px',
        }}
      >
        Let’s swap skills and grow together! Join Skill Swap today and connect with a community of passionate learners like yourself!
      </p>
      <Button style={{ backgroundColor: 'black', border: 'none', width: '20%' }} type="button" size="lg" className="mt-4 login-btn btn" onClick={handleSignIn}>
        Login
      </Button>
    </div>
  );
}

export default Signin;
