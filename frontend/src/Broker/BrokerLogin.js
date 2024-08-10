import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './BrokerLogin.css';

const BrokerLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/broker/check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          alert('Login failed: Invalid username or password.');
        } else {
          alert(`Login failed: Server responded with status ${response.status}.`);
        }
        return;
      }

      const result = await response.json();
      if (result.success) {
        localStorage.setItem('username', username);
        navigate('/brokerdash');
      } else {
        alert('Login failed: ' + result.message);
      }
    } catch (error) {
      console.error('Error during fetch:', error);
      alert('Login failed: Network error or server not responding.');
    }
  };

  return (
    <div className="broker-login-container">
      <div className="broker-login-form">
        <div className="form-header">
          <i><b><h2>BrokerNest</h2></b></i>
          <p><i>Your Real Estate Partner</i></p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-buttons">
            <center><button type="submit" className="login-button">Login</button></center>
          </div>
        </form>
        <div className="form-footer">
          <Link to="/brokersignup" className="signup-link">Sign Up</Link>
        </div>
      </div>
      <div className="image">
        <img src="blogin.jpg" alt="Login" />
      </div>
    </div>
  );
};

export default BrokerLogin;
