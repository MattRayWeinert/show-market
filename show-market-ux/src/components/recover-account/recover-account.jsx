// src/components/RecoverAccount.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../login/login.css'; // Reuse styles

const RecoverAccount = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setError('Please enter your email address.');
      return;
    }

    // Simulate sending recovery email
    setError('');
    setSubmitted(true);
    console.log(`Recovery link sent to: ${email}`);
  };

  return (
    <div className="login-page">
      <div className="login-box">
        {!submitted ? (
          <>
            <h2 className="login-title">Recover Your Account</h2>
            <p className="login-subtitle">Enter your email to reset your password</p>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit} className="login-form">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit">Send Recovery Link</button>
            </form>
          </>
        ) : (
          <>
            <h2 className="login-title">Check Your Email</h2>
            <p className="login-subtitle">
              A recovery link has been sent to <strong>{email}</strong>.
            </p>
            <div style={{ marginTop: '20px' }}>
              <a href="/login" className="back-link">Return to Login</a>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default RecoverAccount;
