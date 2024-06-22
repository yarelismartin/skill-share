import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAuth } from '../utils/context/authContext'; // TODO: COMMENT IN FOR AUTH
import { useProfile } from '../utils/context/ProfileProvider';
import { getSingleProfile } from '../api/profileData';
// import useProfileCheck from '../utils/hooks/useProfileCheck';

function Home() {
  const { user } = useAuth(); // TODO: COMMENT IN FOR AUTH
  const router = useRouter();
  // const userHasProfile = useProfileCheck();
  const { userHasProfile } = useProfile();
  const [userInfo, setUserInfo] = useState();

  // const getName = () => {
  //   getSingleProfile(user.uid).then(setUserInfo);
  // };

  useEffect(() => {
    let isComponentUnmounted = false;

    const getUserInfo = async () => {
      const data = await getSingleProfile(user.uid);
      if (!isComponentUnmounted) { // Check if component is still mounted
        setUserInfo(data);
      }
    };

    getUserInfo();

    return () => {
      isComponentUnmounted = true; // Set flag to true when component unmounts
    };
  }, [user.uid]);
  // useEffect(() => {
  // }, [userHasProfile]);

  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center jost"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '700px',
        margin: '0 auto',
      }}
    >
      { userHasProfile ? (
        <>
          <h1 style={{ fontSize: '50px' }}>Welcome back {userInfo?.name}! </h1>
          <p style={{ fontSize: '20px' }}> We are thrilled to have you return to our community of knowledge sharers. Ready to pick up where you left off and explore even more skill-swapping opportunities?</p>
        </>
      ) : (
        <>
          <p style={{ fontSize: '50px' }}> Ready to swap skills and knowledge?</p>
          <p style={{ fontSize: '20px' }}>Complete your profile to connect with like-minded learners and start exchanging skills.</p>
          <Button onClick={() => router.push('/profile/new')}>Create Profile</Button>
        </>
      )}
    </div>
  );
}

export default Home;
