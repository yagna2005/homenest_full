import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import emailjs from 'emailjs-com';
import './BrokerSignup.css';

const BrokerSignup = () => {
  const [username, setUsername] = useState('');
  const [aadhaar, setAadhaar] = useState('');
  const [dob, setDob] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');  // New state for email
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const age = calculateAge(dob);
    if (age < 18) {
      alert('You must be at least 18 years old to sign up.');
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/broker/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, aadhaar, dob, mobile, email, password, role: 'broker' }), // Added email here
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        sendConfirmationEmail(email);  // Pass email instead of username
        navigate('/brokerlogin');
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert('Registration failed: Network error or server not responding.');
    }
  };

  const sendConfirmationEmail = (email) => {
    const templateParams = {
      to_email: email,  // Use email as the recipient
      message: 'Thank you for registering with BrokerNest! Your account has been created successfully.',
    };

    emailjs.send('service_k8djvgh', 'template_9vrdcl7', templateParams, 'LDFvKvIKMwonVdrnU')
      .then((response) => {
        console.log('Confirmation email sent successfully!', response.status, response.text);
      })
      .catch((error) => {
        console.error('Failed to send confirmation email:', error);
      });
  };

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <div className="broker-signup-container">
      <div className="broker-signup-form">
        <div className="form-header">
          <h2>Create a Broker Account</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">User Name</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="UserName"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="aadhaar">Aadhaar Number</label>
            <input
              type="text"
              id="aadhaar"
              name="aadhaar"
              placeholder="Aadhaar Number"
              value={aadhaar}
              onChange={(e) => setAadhaar(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="dob">Date of Birth</label>
            <input
              type="date"
              id="dob"
              name="dob"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="mobile">Mobile Number</label>
            <input
              type="text"
              id="mobile"
              name="mobile"
              placeholder="Mobile Number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-buttons">
            <button type="submit" className="signup-button">Sign Up</button>
          </div>
        </form>
        <div className="existing-user">
          <p>Already a broker?</p>
          <Link to="/brokerlogin" className="login-link">
            <button className="login-button">Login</button>
          </Link>
        </div>
      </div>
      <div className="signup-image"></div>
    </div>
  );
};

export default BrokerSignup;
