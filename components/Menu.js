import React from 'react';

export default function Menu() {
  return (
    <>
      <section className="filter-wrapper" style={{ backgroundColor: '#f5f5f5', border: '1px solid #ddd', padding: '10px' }}>
        <p className="filter-title" style={{ fontSize: '13px', marginBottom: '5px' }}> MENU</p>
        <div className="filter-data">
          <span className="filter-item" style={{ padding: '5px 10px', display: 'inline-block' }}>
            <p>General</p>
          </span>
          <span className="filter-item" style={{ padding: '5px 10px', display: 'inline-block' }}>
            <p>Events & Workshops</p>
          </span>
          <span className="filter-item" style={{ padding: '5px 10px', display: 'inline-block' }}>
            <p>Questions</p>
          </span>
        </div>
      </section>
    </>
  );
}
