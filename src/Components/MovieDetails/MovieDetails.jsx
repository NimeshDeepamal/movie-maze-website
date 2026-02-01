import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import RefreshIcon from '@mui/icons-material/Refresh';
import { SkeletonDetails } from '../SkeletonCard/SkeletonCard';
import './MovieDetails.css';

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movieDetails, setMovieDetails] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [cast, setCast] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  useEffect(() => {
    // Check if movie is in favorites
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setIsFavorite(favorites.some(fav => fav.id === parseInt(id)));
  }, [id]);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      setError(null);
      setImageLoaded(false);

      try {
        const apiKey = process.env.REACT_APP_TMDB_API_KEY;

        const [detailsRes, videosRes, creditsRes, recsRes] = await Promise.all([
          axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
            params: { api_key: apiKey, language: 'en-US' },
          }),
          axios.get(`https://api.themoviedb.org/3/movie/${id}/videos`, {
            params: { api_key: apiKey },
          }),
          axios.get(`https://api.themoviedb.org/3/movie/${id}/credits`, {
            params: { api_key: apiKey },
          }),
          axios.get(`https://api.themoviedb.org/3/movie/${id}/recommendations`, {
            params: { api_key: apiKey },
          }),
        ]);

        setMovieDetails(detailsRes.data);

        const trailer = videosRes.data.results.find(
          (vid) => vid.type === 'Trailer' && vid.site === 'YouTube'
        );
        if (trailer) setTrailerKey(trailer.key);

        setCast(creditsRes.data.cast.slice(0, 10));
        setRecommendations(recsRes.data.results.slice(0, 10));
      } catch (err) {
        console.error('Failed to fetch movie details:', err);
        setError('Failed to load movie details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
    window.scrollTo(0, 0);
  }, [id]);

  const handleFavoriteToggle = useCallback(() => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    let updatedFavorites;

    if (isFavorite) {
      updatedFavorites = favorites.filter(fav => fav.id !== parseInt(id));
    } else {
      updatedFavorites = [...favorites, {
        id: movieDetails.id,
        title: movieDetails.title,
        poster_path: movieDetails.poster_path,
        vote_average: movieDetails.vote_average,
        release_date: movieDetails.release_date,
        overview: movieDetails.overview,
      }];
    }

    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setIsFavorite(!isFavorite);
  }, [id, isFavorite, isLoggedIn, movieDetails, navigate]);

  const formatRuntime = (minutes) => {
    if (!minutes) return 'N/A';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'TBA';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleRetry = () => {
    setLoading(true);
    setError(null);
  };

  if (loading) return <SkeletonDetails />;

  if (error) {
    return (
      <div className="details-error">
        <ErrorOutlineIcon style={{ fontSize: 64 }} />
        <h2>Oops! Something went wrong</h2>
        <p>{error}</p>
        <div className="details-error-actions">
          <button className="btn btn-secondary" onClick={() => navigate(-1)}>
            <ArrowBackIcon /> Go Back
          </button>
          <button className="btn btn-primary" onClick={handleRetry}>
            <RefreshIcon /> Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!movieDetails) return null;

  return (
    <div className="movie-details-page">
      {/* Hero Section with Backdrop */}
      <section className="details-hero">
        <div 
          className="details-backdrop"
          style={{
            backgroundImage: movieDetails.backdrop_path 
              ? `url(https://image.tmdb.org/t/p/original${movieDetails.backdrop_path})`
              : 'none',
          }}
        />
        <div className="details-overlay" />
        
        <div className="details-hero-content">
          {/* Back button */}
          <button 
            className="details-back-btn" 
            onClick={() => navigate(-1)}
            aria-label="Go back"
          >
            <ArrowBackIcon />
          </button>

          <div className="details-main">
            {/* Poster */}
            <div className="details-poster-wrapper">
              {!imageLoaded && (
                <div className="details-poster-skeleton skeleton" />
              )}
              <img
                src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
                alt={`${movieDetails.title} poster`}
                className={`details-poster ${imageLoaded ? 'loaded' : ''}`}
                onLoad={() => setImageLoaded(true)}
              />
            </div>

            {/* Movie Info */}
            <div className="details-info">
              <h1 className="details-title">{movieDetails.title}</h1>
              
              {movieDetails.tagline && (
                <p className="details-tagline">"{movieDetails.tagline}"</p>
              )}

              {/* Stats Row */}
              <div className="details-stats">
                <div className="details-stat">
                  <StarRoundedIcon className="stat-icon star" />
                  <span className="stat-value">{movieDetails.vote_average?.toFixed(1)}</span>
                  <span className="stat-label">/ 10</span>
                </div>
                <div className="details-stat">
                  <CalendarTodayIcon className="stat-icon" />
                  <span className="stat-value">{new Date(movieDetails.release_date).getFullYear()}</span>
                </div>
                <div className="details-stat">
                  <AccessTimeIcon className="stat-icon" />
                  <span className="stat-value">{formatRuntime(movieDetails.runtime)}</span>
                </div>
              </div>

              {/* Genres */}
              <div className="details-genres">
                {movieDetails.genres?.map((genre) => (
                  <span key={genre.id} className="genre-chip">
                    {genre.name}
                  </span>
                ))}
              </div>

              {/* Overview */}
              <div className="details-overview">
                <h3>Overview</h3>
                <p>{movieDetails.overview}</p>
              </div>

              {/* Action Buttons */}
              <div className="details-actions">
                {trailerKey && (
                  <a
                    href={`https://www.youtube.com/watch?v=${trailerKey}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-lg"
                  >
                    <PlayArrowRoundedIcon /> Watch Trailer
                  </a>
                )}
                <button 
                  className={`btn btn-lg ${isFavorite ? 'btn-favorite-active' : 'btn-secondary'}`}
                  onClick={handleFavoriteToggle}
                  disabled={!isLoggedIn}
                  title={!isLoggedIn ? 'Login to add favorites' : ''}
                >
                  {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                  {isFavorite ? 'In Favorites' : 'Add to Favorites'}
                </button>
              </div>

              {/* Additional Info */}
              <div className="details-meta">
                <div className="meta-item">
                  <span className="meta-label">Release Date</span>
                  <span className="meta-value">{formatDate(movieDetails.release_date)}</span>
                </div>
                {movieDetails.budget > 0 && (
                  <div className="meta-item">
                    <span className="meta-label">Budget</span>
                    <span className="meta-value">${movieDetails.budget?.toLocaleString()}</span>
                  </div>
                )}
                {movieDetails.revenue > 0 && (
                  <div className="meta-item">
                    <span className="meta-label">Revenue</span>
                    <span className="meta-value">${movieDetails.revenue?.toLocaleString()}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trailer Section */}
      {trailerKey && (
        <section className="details-section">
          <div className="section-container">
            <h2 className="section-title">Official Trailer</h2>
            <div className="trailer-wrapper">
              <iframe
                src={`https://www.youtube.com/embed/${trailerKey}`}
                title={`${movieDetails.title} - Official Trailer`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </section>
      )}

      {/* Cast Section */}
      {cast.length > 0 && (
        <section className="details-section">
          <div className="section-container">
            <h2 className="section-title">Top Cast</h2>
            <div className="cast-carousel">
              {cast.map((actor) => (
                <div key={actor.cast_id} className="cast-card">
                  <div className="cast-image-wrapper">
                    <img
                      src={
                        actor.profile_path
                          ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                          : `https://ui-avatars.com/api/?name=${encodeURIComponent(actor.name)}&size=185&background=1a1a24&color=fff`
                      }
                      alt={actor.name}
                      loading="lazy"
                    />
                  </div>
                  <div className="cast-details">
                    <h4 className="cast-name">{actor.name}</h4>
                    <p className="cast-character">{actor.character}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Recommendations Section */}
      {recommendations.length > 0 && (
        <section className="details-section">
          <div className="section-container">
            <h2 className="section-title">You Might Also Like</h2>
            <div className="recommendations-grid">
              {recommendations.map((movie) => (
                <div
                  key={movie.id}
                  className="recommend-card"
                  onClick={() => navigate(`/movie/${movie.id}`)}
                  role="button"
                  tabIndex={0}
                  onKeyPress={(e) => e.key === 'Enter' && navigate(`/movie/${movie.id}`)}
                >
                  <div className="recommend-poster-wrapper">
                    <img
                      src={
                        movie.poster_path
                          ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                          : `https://ui-avatars.com/api/?name=${encodeURIComponent(movie.title)}&size=300&background=1a1a24&color=fff`
                      }
                      alt={movie.title}
                      loading="lazy"
                    />
                    <div className="recommend-overlay">
                      <PlayArrowRoundedIcon />
                    </div>
                  </div>
                  <div className="recommend-info">
                    <h4 className="recommend-title">{movie.title}</h4>
                    <div className="recommend-meta">
                      <span className="recommend-rating">
                        <StarRoundedIcon /> {movie.vote_average?.toFixed(1)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default MovieDetails;
