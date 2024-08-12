/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
// eslint-disable-next-line jsx-a11y/click-events-have-key-events

export default function Menu({ categories, onSelectCategory }) {
  const router = useRouter();

  const handleCategoryClick = (categoryKey) => {
    onSelectCategory(categoryKey);
  };
  return (
    <div className="community-filter-menu">
      <Button className="quick-font create-post-button" type="button" id="dropdown-item-button" onClick={() => { router.push('/post/new'); }}>Create A Post</Button>
      <DropdownButton
        align="end"
        id="dropdown-item-button"
        title="Filter By"
        className="drop-down-filter"
      >
        {categories.map((category) => (
          <div key={category.firebaseKey}>
            <Dropdown.Item as="button" onClick={() => handleCategoryClick(category.firebaseKey)}>{category.category_name}</Dropdown.Item>
          </div>
        ))}
      </DropdownButton>
    </div>
  );
}

Menu.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      firebaseKey: PropTypes.string,
      category_name: PropTypes.string,
    }),
  ).isRequired,
  onSelectCategory: PropTypes.func.isRequired,
};
