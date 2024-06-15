/* eslint-disable @next/next/no-img-element */
import React from 'react';
import PropTypes from 'prop-types';

export default function ProfileDetailCard({ profileObj }) {
  return (
    <div className="profile-detail-body">
      <div className="profile-card">
        <img src={profileObj.image} alt="profile pic" className="profile-card__image" />
        <div className="profile-card__text-container">
          <h2 className="profile-card__name">{profileObj.name}</h2>
          <p className="profile-card__skill">{profileObj.skill}</p>
          <p className="profile-card__location">{profileObj.location}</p>
        </div>
      </div>
      <div className="profile-card__bio">
        <div className="profile-card__bio-content">
          <p>{profileObj.bio}</p>
        </div>
      </div>
    </div>
  );
}

ProfileDetailCard.propTypes = {
  profileObj: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    skill: PropTypes.string,
    bio: PropTypes.string,
    location: PropTypes.string,
  }).isRequired,
};
