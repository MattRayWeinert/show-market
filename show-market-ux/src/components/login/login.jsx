// src/components/LoginPage.jsx
import React, { useState } from 'react';
import './login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [touchedFields, setTouchedFields] = useState({
    email: false,
    password: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const isEmailEmpty = email.trim() === '';
    const isPasswordEmpty = password.trim() === '';

    setTouchedFields({
      email: isEmailEmpty,
      password: isPasswordEmpty,
    });

    if (isEmailEmpty || isPasswordEmpty) {
      setError('Please fill in all fields.');
      return;
    }

    setError('');
    console.log('Logging in with', { email, password });
    alert('Login successful (placeholder)');
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h2 className="login-title">Sign In</h2>
        <p className="login-subtitle">Enter your credentials to continue</p>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            className={touchedFields.email ? 'input-red' : ''}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            className={touchedFields.password ? 'input-red' : ''}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
        <div className="login-links">
          <p>
            Don’t have an account? <a href="/signup">Create one</a>
          </p>
          <p>
            <a href="/recover-account">Forgot your password?</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
