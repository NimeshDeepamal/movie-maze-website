import React, { useEffect, useState } from 'react';
import './Hero.css';
import ImageSlider from '../ImageSlider/ImageSlider';
import axios from 'axios';

const Hero = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const apiKey = '50c083697496217a8ad3e4c3ee234c27';
        const response = await axios.get(`https://api.themoviedb.org/3/movie/popular`, {
          params: {
            api_key: apiKey,
            language: 'en-US',
            page: 1,
          },
        });
        console.log('Hero API response:', response.data.results); // Debug API data
        setMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching movies in Hero:', error);
        setMovies([]);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className='hero'>
      <div className="blur-bg"></div>
      <div className='left-hero-container'>
        <h2>Discover Movies Like Never Before</h2>
        <h3>Explore trending titles, top-rated classics, and hidden gems. Find your next favorite film effortlessly.</h3>
        <button>Watch More</button>
      </div>
      <div className="right-hero-container">
        <ImageSlider movies={movies.slice(0, 6)} /> 
      </div>
    </div>
  );
};

export default Hero;