import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css'; // reuse the same CSS

export default function SignupPage({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [mode, setMode] = useState('system');

  // Handle theme mode (light/dark/system)
  useEffect(() => {
    const root = document.documentElement;
    if (mode === 'system') {
      const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
      root.setAttribute('data-theme', prefersLight ? 'light' : 'dark');
    } else {
      root.setAttribute('data-theme', mode);
    }
  }, [mode]);

  const handleSignup = (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    // For now, simulate successful signup
    setIsLoggedIn(true);
    setError('');
    navigate('/'); // redirect to home after signup
  };

  return (
    <main className="login-main">
      <div className="login-card">
        <div className="mode-toggle">
          <select value={mode} onChange={(e) => setMode(e.target.value)}>
            <option value="system">System</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
        <h1>Sign Up</h1>
        <p className="subtitle">Create an account to continue.</p>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSignup}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="johndoe@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button type="submit">Sign Up</button>
        </form>
        <p className="signup">
          Already have an account? <a href="/login">Log in</a>
        </p>
      </div>
    </main>
  );
}
