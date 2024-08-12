// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
// import Profile from './components/Profile';

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Art Gallery</h1>
        <nav>
          <a href="/login">Login</a> | 
          <a href="/register">Register</a> |
          <a href="/">Home</a>
        </nav>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route path="/" element={
            <div>
              <h2>Welcome to the Art Gallery</h2>
              <p>Please login or register to continue.</p>
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
