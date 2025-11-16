import React from 'react';
import './featured-listings.css';

const listings = [
  { title: 'iPhone 14 - Like New', price: '$699', location: 'New York, NY' },
  { title: '2BR Apartment for Rent', price: '$1,850/mo', location: 'Los Angeles, CA' },
  { title: 'Freelance Web Developer', price: '$40/hr', location: 'Remote' },
];

const FeaturedListings = () => {
  return (
    <section className="featured">
      <h3>Featured Listings</h3>
      <div className="listing-grid">
        {listings.map((item, index) => (
          <div key={index} className="listing-card">
            <h4>{item.title}</h4>
            <p className="price">{item.price}</p>
            <p className="location">{item.location}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedListings;
