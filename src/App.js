import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ResponsiveAppBar from './Components/Navbar/ResponsiveAppBar';
import Home from './Pages/Home';
import MovieList from './Components/MovieList/MovieList';
import Favorites from './Pages/Favorite';

function App() {
  return (
    <Router>
      <div className="App">
        <ResponsiveAppBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<MovieList type="popular" title="Popular Movies" />} />
          <Route path="/top-rated" element={<MovieList type="top_rated" title="Top Rated Movies" />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
