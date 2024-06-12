import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function ProfileTab({ children }) {
  const [activeTab, setActiveTab] = useState('Bio');

  const handleClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <div style={{
        borderBottom: 'solid black', width: '40%', borderWidth: '1.8px', alignContent: 'center', display: 'block', marginLeft: 'auto', marginRight: 'auto', marginTop: '50px',
      }}
      >
        <button
          type="button"
          className="tab-button"
          onClick={() => handleClick('Bio')}
          style={{
            backgroundColor: 'inherit', color: 'black', padding: '10px 15px', borderWidth: '0px',
          }}
        > Bio
        </button>
        <button
          type="button"
          className="tab-button"
          onClick={() => handleClick('Review')}
          style={{
            backgroundColor: 'inherit', color: 'black', padding: '10px 15px', borderWidth: '0px',
          }}
        > Review
        </button>
      </div>
      <div>
        {children.map((child) => {
          if (child.props.label === activeTab) {
            return child;
          }
          return null;
        })}
      </div>
    </div>
  );
}

ProfileTab.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};
