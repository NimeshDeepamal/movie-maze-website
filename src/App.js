import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ResponsiveAppBar from './Components/Navbar/ResponsiveAppBar';
import Home from './Pages/Home';
import MovieList from './Components/MovieList/MovieList';
import Favorites from './Pages/Favorite';
import LoginPage from './Pages/LoginPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <div className="App">
        {isLoggedIn && <ResponsiveAppBar />}
        <Routes>
          <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/movies" element={<MovieList type="popular" title="Popular Movies" />} />
          <Route path="/top-rated" element={<MovieList type="top_rated" title="Top Rated Movies" />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;