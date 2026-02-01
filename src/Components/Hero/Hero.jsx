import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Hero.css';
import ImageSlider from '../ImageSlider/ImageSlider';
import axios from 'axios';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const Hero = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const apiKey = process.env.REACT_APP_TMDB_API_KEY;
        const response = await axios.get(`https://api.themoviedb.org/3/movie/popular`, {
          params: {
            api_key: apiKey,
            language: 'en-US',
            page: 1,
          },
        });
        setMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching movies in Hero:', error);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <section className="hero" aria-label="Featured movies">
      {/* Background with existing asset */}
      <div className="hero-backdrop" aria-hidden="true" />
      <div className="hero-gradient" aria-hidden="true" />
      
      <div className="hero-container">
        {/* Left Content */}
        <div className="hero-content">
          <div className="hero-badge">
            <TrendingUpIcon />
            <span>Trending Now</span>
          </div>
          
          <h1 className="hero-title">
            Discover Movies
            <span className="hero-title-accent"> Like Never Before</span>
          </h1>
          
          <p className="hero-description">
            Explore trending titles, top-rated classics, and hidden gems. 
            Find your next favorite film effortlessly.
          </p>
          
          <div className="hero-actions">
            <button 
              className="btn btn-primary btn-lg hero-btn-primary"
              onClick={() => navigate('/movies')}
            >
              <PlayArrowRoundedIcon />
              Browse Movies
            </button>
            <button 
              className="btn btn-secondary btn-lg hero-btn-secondary"
              onClick={() => navigate('/top-rated')}
            >
              Top Rated
            </button>
          </div>
          
          {/* Stats */}
          <div className="hero-stats">
            <div className="hero-stat">
              <span className="stat-number">10K+</span>
              <span className="stat-text">Movies</span>
            </div>
            <div className="hero-stat-divider" />
            <div className="hero-stat">
              <span className="stat-number">4.8</span>
              <span className="stat-text">Rating</span>
            </div>
            <div className="hero-stat-divider" />
            <div className="hero-stat">
              <span className="stat-number">Free</span>
              <span className="stat-text">Forever</span>
            </div>
          </div>
        </div>
        
        {/* Right Content - Movie Slider */}
        <div className="hero-slider">
          {loading ? (
            <div className="hero-slider-loading">
              <div className="slider-skeleton">
                <div className="slider-skeleton-card skeleton" />
                <div className="slider-skeleton-card main skeleton" />
                <div className="slider-skeleton-card skeleton" />
              </div>
            </div>
          ) : (
            <ImageSlider movies={movies.slice(0, 6)} />
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
