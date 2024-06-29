/* eslint-disable max-len */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
// eslint-disable-next-line jsx-a11y/click-events-have-key-events

const iconMapping = {
  General: <svg width="16" height="16" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M2 9V16C2 17.8856 2 18.8284 2.58579 19.4142C3.17157 20 4.11438 20 6 20H14C15.8856 20 16.8284 20 17.4142 19.4142C18 18.8284 18 17.8856 18 16V9" stroke="black" strokeWidth="2" /> <path d="M1 10L7.17158 3.82842C8.50491 2.49509 9.17157 1.82843 10 1.82843C10.8284 1.82843 11.4951 2.49509 12.8284 3.82843L19 10" stroke="black" strokeWidth="2" strokeLinecap="round" /> <path d="M7 16C7 15.0681 7 14.6022 7.15224 14.2346C7.35523 13.7446 7.74458 13.3552 8.23463 13.1522C8.60218 13 9.06812 13 10 13C10.9319 13 11.3978 13 11.7654 13.1522C12.2554 13.3552 12.6448 13.7446 12.8478 14.2346C13 14.6022 13 15.0681 13 16V20H7V16Z" fill="black" /> <path d="M14 3.5C14 3.03406 14 2.80109 14.0761 2.61732C14.1776 2.37229 14.3723 2.17761 14.6173 2.07612C14.8011 2 15.0341 2 15.5 2C15.9659 2 16.1989 2 16.3827 2.07612C16.6277 2.17761 16.8224 2.37229 16.9239 2.61732C17 2.80109 17 3.03406 17 3.5V9L14 5.5V3.5Z" fill="black" /> </svg>,

  'Events & Workshops': <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /> <path d="M16 2V6" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /> <path d="M8 2V6" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /> <path d="M3 10H21" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /> <path d="M8 14H8.01" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /> <path d="M12 14H12.01" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /> <path d="M16 14H16.01" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /> <path d="M8 18H8.01" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /> <path d="M12 18H12.01" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /> <path d="M16 18H16.01" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /> </svg>,

  Questions: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" className="bi bi-patch-question" viewBox="0 0 16 16">   <path d="M8.05 9.6c.336 0 .504-.24.554-.627.04-.534.198-.815.847-1.26.673-.475 1.049-1.09 1.049-1.986 0-1.325-.92-2.227-2.262-2.227-1.02 0-1.792.492-2.1 1.29A1.7 1.7 0 0 0 6 5.48c0 .393.203.64.545.64.272 0 .455-.147.564-.51.158-.592.525-.915 1.074-.915.61 0 1.03.446 1.03 1.084 0 .563-.208.885-.822 1.325-.619.433-.926.914-.926 1.64v.111c0 .428.208.745.585.745" />   <path d="m10.273 2.513-.921-.944.715-.698.622.637.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01.622-.636a2.89 2.89 0 0 1 4.134 0l-.715.698a1.89 1.89 0 0 0-2.704 0l-.92.944-1.32-.016a1.89 1.89 0 0 0-1.911 1.912l.016 1.318-.944.921a1.89 1.89 0 0 0 0 2.704l.944.92-.016 1.32a1.89 1.89 0 0 0 1.912 1.911l1.318-.016.921.944a1.89 1.89 0 0 0 2.704 0l.92-.944 1.32.016a1.89 1.89 0 0 0 1.911-1.912l-.016-1.318.944-.921a1.89 1.89 0 0 0 0-2.704l-.944-.92.016-1.32a1.89 1.89 0 0 0-1.912-1.911z" />   <path d="M7.001 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0" /> </svg>,
};

export default function Menu({ categories, onSelectCategory }) {
  const router = useRouter();
  const [classNameActive, setClassNameActive] = useState(null);

  const handleCategoryClick = (categoryKey) => {
    setClassNameActive(categoryKey);
    onSelectCategory(categoryKey);
  };

  return (
    <>
      <section
        className="filter-wrapper"
        style={{
          backgroundColor: '#f5f5f5', border: '1px solid #ddd', padding: '10px', borderRadius: '6px', marginBottom: 'auto',
        }}
      >
        <p className="filter-title quick-font" style={{ fontSize: '13px', marginBottom: '5px' }}> Filter by: </p>
        <div className="filter-data">
          {categories.map((category) => (
            <div
              key={category.firebaseKey}
              className={`filter-item quick-font ${classNameActive === category.firebaseKey ? 'filter-active' : ''}`}
              style={{
                padding: '5px 10px', display: 'inline-block', width: '100%', position: 'relative',
              }}
            >
              <span>{iconMapping[category.category_name]}</span>
              <button
                type="button"
                style={{
                  position: 'absolute',
                  width: '80%',
                  background: 'transparent',
                  textAlign: 'left',
                }}
                className="filter-item"
                onClick={() => handleCategoryClick(category.firebaseKey)}
              >{category.category_name}
              </button>
            </div>
          ))}
          <Button className="quick-font" style={{ marginTop: '40px' }} type="button" onClick={() => { router.push('/post/new'); }}>Create A Post</Button>
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
