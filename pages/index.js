import { useAuth } from '../utils/context/authContext'; // TODO: COMMENT IN FOR AUTH

function Home() {
  const { user } = useAuth(); // TODO: COMMENT IN FOR AUTH

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
      <h1>Welcome {user.displayName}! </h1>
      <h4> We are thrilled to have you return to our community of knowledge sharers. Ready to pick up where you left off and explore even more skill-swapping opportunities?</h4>
    </div>
  );
}

export default Home;
