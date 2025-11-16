// src/components/SignupPage.jsx
import React, { useState } from 'react';
import '../login/login.css'; // Reuse the login CSS

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    dob: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');
  const [emailActive, setEmailActive] = useState(false); // New: track email field focus/typing

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // if (e.target.name === 'email') {
    //   setEmailActive(true); // Mark email as "active"
    // }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, firstName, lastName, dob, password, confirmPassword } = formData;

    if (!email || !firstName || !lastName || !dob || !password || !confirmPassword) {
      setError('All fields are required.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    // Optionally validate age (e.g., must be 13+)
    const age = calculateAge(dob);
    if (age < 13) {
      setError('You must be at least 13 years old to register.');
      return;
    }

    setError('');

    const userData = {
      username: formData.email,
      email: formData.email,
      password: formData.password
    }

    try {
      const response = await fetch("http://localhost:8080/api-user/create-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {

    }

    console.log('Registering user:', formData);
    alert('Account created successfully (placeholder)');
  };

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    return m < 0 || (m === 0 && today.getDate() < birthDate.getDate()) ? age - 1 : age;
  };

  const getMaxDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0]; // Format: YYYY-MM-DD
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h2 className="login-title">Create an Account</h2>
        <p className="login-subtitle">Fill in the details below to get started</p>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className={emailActive ? 'input-red' : ''}
            value={formData.email}
            onChange={handleChange}
            onFocus={() => setEmailActive(false)}
          />
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
          />
          <input
            type="date"
            name="dob"
            placeholder="Date of Birth"
            value={formData.dob}
            max={getMaxDate()}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <button type="submit">Create Account</button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
