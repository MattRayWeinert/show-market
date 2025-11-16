import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header/header.jsx';
import Footer from './components/footer/footer.jsx';
import Home from './components/home/home';
import Browse from './components/browse/browse';
import Post from './components/post/post';
import Login from './components/login/login';
import SignupPage from './components/sign-up/sign-up';
import RecoverAccount from './components/recover-account/recover-account';

const App = () => {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/post" element={<Post />} />
          <Route path="/login" element={<Login />} />
          <Route path="/recover-account" element={<RecoverAccount />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
