import React, { useEffect, useState } from 'react';
import MovieCard from '../MovieCard/MovieCard';
import './ImageSlider.css';

const ImageSlider = ({ movies }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideInterval = 3000; // 3 seconds

  // Debug movies prop
  useEffect(() => {
    console.log('ImageSlider received movies:', movies, 'Length:', movies ? movies.length : 'undefined');
  }, [movies]);

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

  // Render fallback if not enough movies
  if (!Array.isArray(movies) || movies.length < 3) {
    return <div>Loading movies...</div>;
  }

  // Calculate indices for main and side cards
  const mainIndex = currentIndex;
  const prevIndex = currentIndex === 0 ? movies.length - 1 : currentIndex - 1;
  const nextIndex = currentIndex === movies.length - 1 ? 0 : currentIndex + 1;

  return (
    <div className="slider-container">
      <div className="slider-wrapper">
        <div className="slider-item side-card">
          <MovieCard movie={movies[prevIndex]} />
        </div>
        <div className="slider-item main-card">
          <MovieCard movie={movies[mainIndex]} />
        </div>
        <div className="slider-item side-card">
          <MovieCard movie={movies[nextIndex]} />
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;