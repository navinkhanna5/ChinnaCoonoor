import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './signup.css';

export default function SignupPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [village, setVillage] = useState('');
  const [message, setMessage] = useState('');
   const navigate = useNavigate();

    

  const handleSignup = async (e) => {
  e.preventDefault();

  if (password !== confirmPassword) {
    setMessage('Passwords do not match');
    return;
  }

  try {
    await axios.post('http://localhost:5000/signup', {
      username,
      password
    });
    navigate('/login');
  } catch (error) {
    setMessage('Signup failed: ' + (error.response?.data?.message || error.message));
  }
};

  

  return (
    <form onSubmit={handleSignup}>
      <h1>Sign up</h1>
  <div className="form-grid">
    <div className="form-column">
      <label>Username</label>
      <input type="text" value={username} onChange={e => setUsername(e.target.value)} required />

      <label>Password</label>
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />

      <label>Confirm Password</label>
      <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />

      <label>Mobile Number</label>
      <input
        type="tel"
        value={mobile}
        onChange={e => {
          const val = e.target.value;
          if (/^\d{0,10}$/.test(val)) {
            setMobile(val);
          }
        }}
        maxLength="10"
        pattern="\d{10}"
        inputMode="numeric"
        required
      />
    </div>

    <div className="form-column">
      <label>Email</label>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />

      <label>Date of Birth</label>
      <input type="date" value={dob} onChange={e => setDob(e.target.value)} required />

      <label>Village</label>
      <input type="text" value={village} onChange={e => setVillage(e.target.value)} required />

      <button type="submit">Sign Up</button>
    </div>
  </div>

  {message && <p>{message}</p>}
</form>

  );
}
