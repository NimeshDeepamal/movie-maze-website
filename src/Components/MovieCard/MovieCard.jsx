import React, { useState, memo } from 'react';
import { Link } from 'react-router-dom';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import './MovieCard.css';

const MovieCard = memo(({ movie, onFavoriteClick, isFavorite, isLoggedIn }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isLoggedIn && onFavoriteClick) {
      onFavoriteClick(movie);
    }
  };

  const formatRating = (rating) => {
    return rating ? rating.toFixed(1) : 'N/A';
  };

  const formatYear = (dateString) => {
    if (!dateString) return 'TBA';
    return new Date(dateString).getFullYear();
  };

  const posterUrl = movie?.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : null;

  return (
    <article className="movie-card">
      <Link 
        to={`/movie/${movie.id}`} 
        className="movie-card-link"
        aria-label={`View details for ${movie.title || movie.original_title}`}
      >
        <div className="movie-card-poster-wrapper">
          {/* Image placeholder while loading */}
          {!imageLoaded && !imageError && (
            <div className="movie-card-placeholder skeleton" aria-hidden="true" />
          )}
          
          {/* Error state */}
          {imageError && (
            <div className="movie-card-no-image">
              <span>No Image</span>
            </div>
          )}
          
          {/* Actual poster */}
          {posterUrl && (
            <img
              src={posterUrl}
              alt={`${movie.title || movie.original_title} poster`}
              className={`movie-card-poster ${imageLoaded ? 'loaded' : ''}`}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
              loading="lazy"
            />
          )}

          {/* Hover overlay */}
          <div className="movie-card-overlay">
            <div className="movie-card-play">
              <PlayArrowRoundedIcon />
            </div>
          </div>

          {/* Rating badge */}
          <div className="movie-card-rating">
            <StarRoundedIcon />
            <span>{formatRating(movie.vote_average)}</span>
          </div>
        </div>

        {/* Card content */}
        <div className="movie-card-content">
          <h3 className="movie-card-title">
            {movie.title || movie.original_title}
          </h3>
          <div className="movie-card-meta">
            <span className="movie-card-year">{formatYear(movie.release_date)}</span>
          </div>
        </div>
      </Link>

      {/* Favorite button */}
      <button
        className={`movie-card-favorite ${!isLoggedIn ? 'disabled' : ''} ${isFavorite ? 'active' : ''}`}
        onClick={handleFavoriteClick}
        disabled={!isLoggedIn}
        aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        title={!isLoggedIn ? 'Login to add favorites' : isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        {isFavorite ? (
          <FavoriteIcon className="favorite-icon filled" />
        ) : (
          <FavoriteBorderIcon className="favorite-icon" />
        )}
      </button>
    </article>
  );
});

MovieCard.displayName = 'MovieCard';

export default MovieCard;
