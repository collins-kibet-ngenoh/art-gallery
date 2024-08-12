// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
// import { Navigate, useNavigate } from 'react-router-dom';
// import { useHistory } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', {
        email,
        password
      });
      setMessage('Login successful!');
      // Save the JWT token in localStorage or state for future requests
      localStorage.setItem('token', response.data.access_token);
      // Navigate('/profile');
    } catch (error) {
      // Log error details for debugging
      console.error('Login error:', error.response ? error.response.data : error.message);
      setMessage('Invalid credentials');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Password:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Login;
