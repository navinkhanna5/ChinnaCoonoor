import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './userlogin.css';
import axios from 'axios';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post('http://localhost:5000/login', { username, password });

    alert(res.data);
    navigate('/primary');
  } catch (err) {
    alert('Login failed: ' + (err.response?.data || err.message));
  }
};

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>
        <label>Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? <div className="loader"></div> : 'Login'}
        </button>
      </form>
    </div>
  );
}
