import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ResponsiveAppBar from './Components/Navbar/ResponsiveAppBar';
import Home from './Pages/Home';
import MovieList from './Components/MovieList/MovieList';
import MovieDetails from '../src/Components/MovieDetails/MovieDetails';
import Favorites from './Pages/Favorite';
import LoginPage from './Pages/LoginPage';

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
      <div className="App">
        {isLoggedIn && <ResponsiveAppBar />}
        <Routes>
          <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage setIsLoggedIn={handleLogin} />} />
          <Route path="/movies" element={<MovieList type="popular" title="Popular Movies" />} />
          <Route path="/top-rated" element={<MovieList type="top_rated" title="Top Rated Movies" />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/movie/:id" element={<MovieDetails />} />  {/* Added route for MovieDetails */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
