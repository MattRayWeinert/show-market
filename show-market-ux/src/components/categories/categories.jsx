import React from 'react';
import './categories.css';

const categories = [
  { name: 'Jobs', icon: '💼' },
  { name: 'Housing', icon: '🏠' },
  { name: 'For Sale', icon: '🛍️' },
  { name: 'Services', icon: '🛠️' },
  { name: 'Community', icon: '🤝' },
  { name: 'Gigs', icon: '🎯' },
];

const Categories = () => {
  return (
    <section className="categories">
      <h3>Categories</h3>
      <div className="category-grid">
        {categories.map((cat) => (
          <div key={cat.name} className="category-card">
            <div className="icon">{cat.icon}</div>
            <p>{cat.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
