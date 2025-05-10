import React from 'react';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import './MovieCard.css';

const MovieCard = ({ movie, onFavoriteClick, isFavorite }) => {
  return (
    <div className="movie-card">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="movie-poster"
      />
      <span className="favorite" onClick={() => onFavoriteClick(movie)}>
        {isFavorite ? (
          <FavoriteIcon className="favorite-icon filled" />
        ) : (
          <FavoriteBorderIcon className="favorite-icon" />
        )}
      </span>
      <div className="movie-details">
        <h3 className="movie-details-heading">{movie.original_title}</h3>
        <div className="align-center movie-date-rate">
          <p>{movie.release_date}</p>
          <p>
            <span className="star-emoji">
              <StarBorderIcon />
            </span>{' '}
            {movie.vote_average}
          </p>
        </div>
        <p className="movie-description">
          {movie.overview.slice(0, 80) + '...'}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
