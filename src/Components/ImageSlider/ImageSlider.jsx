import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import './ImageSlider.css';

const ImageSlider = ({ movies }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const slideInterval = 4000; // 4 seconds

  // Auto-slide effect
  useEffect(() => {
    if (!Array.isArray(movies) || movies.length < 3) return;

    const autoSlide = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === movies.length - 1 ? 0 : prevIndex + 1
      );
    }, slideInterval);

    return () => clearInterval(autoSlide);
  }, [movies]);

  const handleCardClick = useCallback((movieId) => {
    navigate(`/movie/${movieId}`);
  }, [navigate]);

  // Render fallback if not enough movies
  if (!Array.isArray(movies) || movies.length < 3) {
    return (
      <div className="slider-loading" aria-label="Loading movies">
        <div className="slider-skeleton-wrapper">
          <div className="slider-skeleton-item skeleton" />
          <div className="slider-skeleton-item main skeleton" />
          <div className="slider-skeleton-item skeleton" />
        </div>
      </div>
    );
  }

  // Calculate indices for main and side cards
  const mainIndex = currentIndex;
  const prevIndex = currentIndex === 0 ? movies.length - 1 : currentIndex - 1;
  const nextIndex = currentIndex === movies.length - 1 ? 0 : currentIndex + 1;

  const renderSliderCard = (movie, position) => {
    const isMain = position === 'main';
    
    return (
      <div 
        className={`slider-card ${position}`}
        onClick={() => handleCardClick(movie.id)}
        role="button"
        tabIndex={isMain ? 0 : -1}
        aria-label={`${movie.title}${isMain ? ' - Click to view details' : ''}`}
        onKeyPress={(e) => e.key === 'Enter' && handleCardClick(movie.id)}
      >
        <div className="slider-card-image">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            loading={isMain ? 'eager' : 'lazy'}
          />
          {isMain && (
            <div className="slider-card-overlay">
              <div className="slider-play-icon">
                <PlayArrowRoundedIcon />
              </div>
            </div>
          )}
        </div>
        
        {isMain && (
          <div className="slider-card-info">
            <h3 className="slider-card-title">{movie.title}</h3>
            <div className="slider-card-meta">
              <span className="slider-card-rating">
                <StarRoundedIcon />
                {movie.vote_average?.toFixed(1)}
              </span>
              <span className="slider-card-year">
                {new Date(movie.release_date).getFullYear()}
              </span>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="image-slider" aria-label="Featured movies carousel">
      <div className="slider-track">
        {renderSliderCard(movies[prevIndex], 'prev')}
        {renderSliderCard(movies[mainIndex], 'main')}
        {renderSliderCard(movies[nextIndex], 'next')}
      </div>
      
      {/* Indicators */}
      <div className="slider-indicators" role="tablist">
        {movies.map((_, index) => (
          <button
            key={index}
            className={`slider-indicator ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
            aria-selected={index === currentIndex}
            role="tab"
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
