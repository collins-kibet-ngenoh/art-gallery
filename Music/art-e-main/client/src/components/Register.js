import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isArtist, setIsArtist] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    // Basic form validation
    if (!username || !email || !password) {
      setMessage('Username, email, and password are required');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      console.log('Sending request to /register');
      const response = await axios.post('http://localhost:5000/register', {
        username,
        email,
        password,
        is_artist: isArtist,
      });
      console.log('Response:', response);

      if (response.status === 201) {
        setMessage('User registered successfully!');
      } else {
        setMessage('Registration failed: Unexpected response status');
      }
    } catch (error) {
      console.error('Error details:', error);
      if (error.response) {
        console.error('Response error data:', error.response.data);
        setMessage(`Registration failed: ${error.response.data.message || error.message}`);
      } else if (error.request) {
        console.error('Request error data:', error.request);
        setMessage('Registration failed: No response from server');
      } else {
        setMessage(`Registration failed: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
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
        <div>
          <label>Are you an artist?</label>
          <input
            type="checkbox"
            checked={isArtist}
            onChange={(e) => setIsArtist(e.target.checked)}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Register;
