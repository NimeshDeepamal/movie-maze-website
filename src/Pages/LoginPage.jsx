import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
import { Link } from 'react-router-dom';

export default function LoginPage({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    setIsLoggedIn(true);
    setError('');
    navigate('/');
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
        <h1>Welcome!</h1>
        <p className="subtitle">Sign in to continue.</p>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
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
              name="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Log in</button>
        </form>
        <p className="signup">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </main>
  );
}