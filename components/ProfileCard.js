/* eslint-disable @next/next/no-img-element */
import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useAuth } from '../utils/context/authContext';

export default function ProfileCard({ profileObj }) {
  const { user } = useAuth();
  const router = useRouter();
  return (
    <div style={{
      width: '256px', height: '327px', backgroundColor: '#D9D9D9', borderRadius: '10%', display: 'flex', alignItems: 'center', flexDirection: 'column', margin: '20px',
    }}
    >
      <div><img
        style={{
          width: '100px', height: '100px', borderRadius: '80%', marginTop: '20px',
        }}
        src={profileObj.image}
        alt="profile-pic"
      />
      </div>
      <header style={{ fontSize: '20px' }}>{profileObj.name}</header>
      <p style={{ fontSize: '13px' }}>{profileObj.skill}</p>
      <p style={{ fontSize: '13px' }}>Location: {profileObj.location}</p>
      <p style={{ fontSize: '13px' }}>Learning Preference: {profileObj.learning_preference}</p>
      <div>
        {profileObj.uid === user.uid ? (
          <button
            type="button"
            onClick={() => router.push(`/profile/edit/${profileObj.uid}`)}
            style={{
              color: 'white', fontSize: '10px', width: '130px', height: '30px', backgroundColor: '#3F525B', border: 'none', borderRadius: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '15px', padding: '10px',
            }}
          >
            Edit Profile
            <span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M11.7029 1.87868L10.1171 0.292893C9.72658 -0.0976311 9.09342 -0.0976311 8.70289 0.292893L7.499 1.495L10.499 4.495L11.7029 3.29289C12.0934 2.90237 12.0934 2.2692 11.7029 1.87868ZM9.085 5.909L6.085 2.909L0 8.995V12H2.994L9.085 5.909Z" fill="white" />
              </svg>
            </span>
          </button>
        )
          : (
            <button
              type="button"
              onClick={() => router.push(`profile/${profileObj.uid}`)}
              style={{
                color: 'white', fontSize: '10px', width: '130px', height: '30px', backgroundColor: '#3F525B', border: 'none', borderRadius: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '15px', padding: '10px',
              }}
            >View Profile
              <span>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_308_65)">
                    <path d="M6.02596 7.41423L6.73307 8.12134L8.85439 6.00002L6.73307 3.8787L6.02596 4.58581L6.94018 5.50002H3.17161V6.50002H6.94017L6.02596 7.41423Z" fill="white" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M9.88909 9.88909C12.037 7.7412 12.037 4.2588 9.88909 2.11091C7.7412 -0.0369709 4.2588 -0.0369709 2.11091 2.11091C-0.0369709 4.2588 -0.0369709 7.7412 2.11091 9.88909C4.2588 12.037 7.7412 12.037 9.88909 9.88909ZM9.18198 9.18198C10.9393 7.42462 10.9393 4.57538 9.18198 2.81802C7.42462 1.06066 4.57538 1.06066 2.81802 2.81802C1.06066 4.57538 1.06066 7.42462 2.81802 9.18198C4.57538 10.9393 7.42462 10.9393 9.18198 9.18198Z" fill="white" />
                  </g>
                  <defs>
                    <clipPath id="clip0_308_65">
                      <rect width="12" height="12" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </span>
            </button>
          )}

      </div>

    </div>
  );
}

ProfileCard.propTypes = {
  profileObj: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    learning_preference: PropTypes.string,
    location: PropTypes.string,
    skill: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
};
