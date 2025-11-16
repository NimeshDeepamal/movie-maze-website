import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import ResponsiveAppBar from './Components/Navbar/ResponsiveAppBar';
import Home from './Pages/Home';
import MovieList from './Components/MovieList/MovieList';
import MovieDetails from './Components/MovieDetails/MovieDetails';
import Favorites from './Pages/Favorite';
import LoginPage from './Pages/LoginPage';
import SignupPage from './Pages/SignupPage'; 

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if the user is logged in on initial load
  useEffect(() => {
    const storedLoginStatus = localStorage.getItem('isLoggedIn');
    if (storedLoginStatus === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  // Handle login state change
  const handleLogin = (status) => {
    setIsLoggedIn(status);
    localStorage.setItem('isLoggedIn', status);
  };

  return (
    <Router>
      <MainRoutes isLoggedIn={isLoggedIn} handleLogin={handleLogin} />
    </Router>
  );
}

// Separate component to handle location-based navbar rendering
function MainRoutes({ isLoggedIn, handleLogin }) {
  const location = useLocation();
  const hideNavbar = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <>
      {!hideNavbar && <ResponsiveAppBar isLoggedIn={isLoggedIn} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage setIsLoggedIn={handleLogin} />} />
        <Route path="/signup" element={<SignupPage setIsLoggedIn={handleLogin} />} />
        <Route path="/movies" element={<MovieList type="popular" title="Popular Movies" />} />
        <Route path="/top-rated" element={<MovieList type="top_rated" title="Top Rated Movies" />} />
        <Route path="/favorites" element={<Favorites isLoggedIn={isLoggedIn} />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
    </>
  );
}

export default App;
