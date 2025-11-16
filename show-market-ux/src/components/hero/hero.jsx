import React from 'react';
import './hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <h2>Find Anything You Need</h2>
      <p>Jobs, housing, electronics, services and more – all in one place.</p>
      <div className="search-bar">
        <input type="text" placeholder="Search listings..." />
        <button>Search</button>
      </div>
    </section>
  );
};

export default Hero;
