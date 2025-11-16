import React from 'react';
import './footer.css';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-6 text-center mt-10">
      <p>&copy; {new Date().getFullYear()} Show Market. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
