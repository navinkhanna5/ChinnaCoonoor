import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignupPage from './components/signup/signup';
import LoginPage from './components/userlogin/LoginPage';
import Primary from './components/primary/primary';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/primary" element={<Primary />} />
      </Routes>
    </Router>
  );
}

export default App;
