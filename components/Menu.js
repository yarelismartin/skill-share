import React from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line jsx-a11y/click-events-have-key-events

export default function Menu({ categories, onSelectCategory }) {
  return (
    <>
      <section className="filter-wrapper" style={{ backgroundColor: '#f5f5f5', border: '1px solid #ddd', padding: '10px' }}>
        <p className="filter-title" style={{ fontSize: '13px', marginBottom: '5px' }}> MENU</p>
        <div className="filter-data">
          {categories.map((category) => (
            <span key={category.firebaseKey} className="filter-item" style={{ padding: '5px 10px', display: 'inline-block' }}>
              <button type="button" onClick={() => onSelectCategory(category.firebaseKey)}>{category.category_name}</button>
            </span>
          ))}

        </div>
      </section>
    </>
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
