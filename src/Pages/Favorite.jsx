import React, { useEffect, useState } from 'react';
import MovieCard from '../Components/MovieCard/MovieCard';
import './Favorite.css'

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);
  }, []);

  const handleFavoriteClick = (movie) => {
    const updatedFavorites = favorites.filter(fav => fav.id !== movie.id);
    if (updatedFavorites.length === favorites.length) {
      updatedFavorites.push(movie); // Add to favorites if not already present
    }
    
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites)); // Update localStorage
  };

  return (
    <section className="movie-list">
      <header className="align-center movie-list-header">
        <h2 className="align-center movie-list-heading">Favorites</h2>
      </header>
      <div className="movie-cards">
        {favorites.length > 0 ? (
          favorites.map(movie => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onFavoriteClick={handleFavoriteClick}
              isFavorite={true} // Since we are on the favorites page, it's already a favorite
            />
          ))
        ) : (
          <p>No favorites added yet!</p>
        )}
      </div>
    </section>
  );
};

export default FavoritesPage;
