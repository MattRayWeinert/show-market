import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';

const Header = () => {
  return (
    <header className="header">
      <h1 className="logo"><Link to="/">Show Market</Link></h1>
      <nav className="nav">
        <a href="/browse">Browse</a>
        <a href="/post">Post</a>
        <a href="/login">Login</a>
      </nav>
    </header>
  );
};

export default Header;
