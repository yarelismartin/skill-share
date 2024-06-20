import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useAuth } from '../utils/context/authContext'; // TODO: COMMENT IN FOR AUTH
import useProfileCheck from '../utils/hooks/useProfileCheck';

function Home() {
  const { user } = useAuth(); // TODO: COMMENT IN FOR AUTH
  const router = useRouter();
  const userHasProfile = useProfileCheck(null);

  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      { userHasProfile ? (
        <>
          <h1>Welcome {user.displayName}! </h1>
          <p> We are thrilled to have you return to our community of knowledge sharers. Ready to pick up where you left off and explore even more skill-swapping opportunities?</p>
        </>
      ) : (
        <>
          <p style={{ fontSize: '50px' }}> Ready to swap skills and knowledge?</p>
          <p>Complete your profile to connect with like-minded learners and start exchanging skills.</p>
          <Button onClick={() => router.push('/profile/new')}>Create Profile</Button>
        </>
      )}
    </div>
  );
}

export default Home;
