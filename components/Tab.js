import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function Tab({ children }) {
  const [activeTab, setActiveTab] = useState('Bio');

  const handleClick = (tab) => {
    setActiveTab(tab);
  };

  const handleKeyDown = (event, tab) => {
    if (event.key === 'Enter' || event.key === ' ') {
      setActiveTab(tab);
    }
  };

  return (
    <div className="tab pop-font">
      <div className="tab-headers">
        <div
          className={`tab-header ${activeTab === 'Bio' ? 'active' : 'hover-header'}`}
          onClick={() => handleClick('Bio')}
          onKeyDown={(e) => handleKeyDown(e, 'Bio')}
          tabIndex={0}
          role="tab"
          aria-selected={activeTab === 'Bio'}
        >
          Bio
        </div>
        <div
          className={`tab-header ${activeTab === 'Review' ? 'active' : 'hover-header'}`}
          onClick={() => handleClick('Review')}
          onKeyDown={(e) => handleKeyDown(e, 'Bio')}
          tabIndex={0}
          role="tab"
          aria-selected={activeTab === 'Bio'}
        >
          Review
        </div>
      </div>
      <div className="tab-body">
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

Tab.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};
