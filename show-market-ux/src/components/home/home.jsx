import React from 'react';
import Hero from '../hero/hero';
import Categories from '../categories/categories';
import FeaturedListings from '../featured-listings/featured-listings';

const Home = () => {
  return (
    <>
      <Hero />
      <Categories />
      <FeaturedListings />
    </>
  );
};

export default Home;
