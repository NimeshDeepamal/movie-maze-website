import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import MovieCard from '../Components/MovieCard/MovieCard';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MovieFilterIcon from '@mui/icons-material/MovieFilter';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import './Favorite.css';

const FavoritesPage = ({ isLoggedIn }) => {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  // Load favorites from localStorage
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);
  }, []);

  const handleFavoriteClick = useCallback((movie) => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    const updatedFavorites = favorites.filter(fav => fav.id !== movie.id);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  }, [favorites, isLoggedIn, navigate]);

  const clearAllFavorites = useCallback(() => {
    if (window.confirm('Are you sure you want to remove all favorites?')) {
      setFavorites([]);
      localStorage.setItem('favorites', JSON.stringify([]));
    }
  }, []);

  return (
    <section className="favorites-page">
      <header className="favorites-header">
        <div className="favorites-header-content">
          <div className="favorites-title-group">
            <FavoriteBorderIcon className="favorites-icon" />
            <h1 className="favorites-title">My Favorites</h1>
          </div>
          {favorites.length > 0 && (
            <div className="favorites-actions">
              <span className="favorites-count">
                {favorites.length} {favorites.length === 1 ? 'movie' : 'movies'}
              </span>
              <button 
                className="btn btn-ghost favorites-clear-btn"
                onClick={clearAllFavorites}
              >
                <DeleteOutlineIcon />
                Clear All
              </button>
            </div>
          )}
        </div>
      </header>

      <div className="favorites-content">
        {favorites.length > 0 ? (
          <div className="favorites-grid">
            {favorites.map(movie => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onFavoriteClick={handleFavoriteClick}
                isFavorite={true}
                isLoggedIn={isLoggedIn}
              />
            ))}
          </div>
        ) : (
          <div className="favorites-empty">
            <div className="favorites-empty-illustration">
              <div className="empty-heart-bg">
                <FavoriteBorderIcon className="empty-heart-icon" />
              </div>
            </div>
            <h2 className="favorites-empty-title">No favorites yet</h2>
            <p className="favorites-empty-description">
              Start exploring movies and add your favorites here. 
              They'll be saved for easy access anytime.
            </p>
            <div className="favorites-empty-actions">
              <button 
                className="btn btn-primary btn-lg"
                onClick={() => navigate('/movies')}
              >
                <MovieFilterIcon />
                Browse Movies
              </button>
              <button 
                className="btn btn-secondary btn-lg"
                onClick={() => navigate('/top-rated')}
              >
                Top Rated
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default FavoritesPage;
