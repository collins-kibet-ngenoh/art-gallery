// src/components/Profile.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Profile() {
  const [profile, setProfile] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setProfile(response.data);
      } catch (error) {
        setMessage('Error fetching profile information');
      }
    };
    fetchProfile();
  }, []);

  return (
    <div>
      <h2>User Profile</h2>
      {profile ? (
        <div>
          <p><strong>Username:</strong> {profile.username}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Is Artist:</strong> {profile.is_artist ? 'Yes' : 'No'}</p>
        </div>
      ) : (
        <p>{message || 'Loading...'}</p>
      )}
    </div>
  );
}

export default Profile;
