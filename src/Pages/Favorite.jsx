import React, { useEffect, useState } from 'react';
import MovieCard from '../Components/MovieCard/MovieCard';
import './Favorite.css';
import { useNavigate } from 'react-router-dom';

const FavoritesPage = ({ isLoggedIn }) => { // use prop instead of reading localStorage
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  // Load favorites from localStorage
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);
  }, []);

  const handleFavoriteClick = (movie) => {
    if (!isLoggedIn) {
      navigate("/login"); // redirect if not logged in
      return;
    }

    const updatedFavorites = favorites.filter(fav => fav.id !== movie.id);
    if (updatedFavorites.length === favorites.length) {
      updatedFavorites.push(movie); // Add if not present
    }

    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
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
              isFavorite={true}
              isLoggedIn={isLoggedIn}
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
