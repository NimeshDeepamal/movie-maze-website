import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './MovieDetails.css';

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movieDetails, setMovieDetails] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [cast, setCast] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const fetchDetails = async () => {
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
      } catch (error) {
        console.error('Failed to fetch movie details:', error);
      }
    };

    fetchDetails();
  }, [id]);

  if (!movieDetails) return <p>Loading...</p>;

  return (
    <>
      <div
        className="movie-bg"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movieDetails.backdrop_path})`,
        }}
      >
        <div className="movie-overlay">
          <div className="movie-box">
            <h1>{movieDetails.title}</h1>
            <div className="sub-info">
              <span>⭐ {movieDetails.vote_average}</span>
              <span>📅 {movieDetails.release_date}</span>
            </div>
            <p className="genre">
              <strong>Genres:</strong>{' '}
              {movieDetails.genres.map((genre) => genre.name).join(', ')}
            </p>
            <p className="overview">{movieDetails.overview}</p>

            {trailerKey && (
              <div className="trailer">
                <h2>Watch Trailer</h2>
                <iframe
                  width="100%"
                  height="315"
                  src={`https://www.youtube.com/embed/${trailerKey}`}
                  title="YouTube trailer"
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Cast Section */}
      <div className="cast-section">
        <h2>Cast</h2>
        <div className="cast-grid">
          {cast.map((actor) => (
            <div key={actor.cast_id} className="cast-card">
              <img
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                    : 'https://via.placeholder.com/185x278?text=No+Image'
                }
                alt={actor.name}
              />
              <div className="cast-info">
                <strong>{actor.name}</strong>
                <p>as {actor.character}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations Section */}
      <div className="recommend-section">
        <h2>Recommended Movies</h2>
        <div className="recommend-grid">
          {recommendations.map((movie) => (
            <div
              key={movie.id}
              className="recommend-card"
              onClick={() => navigate(`/movie/${movie.id}`)}
            >
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                    : 'https://via.placeholder.com/200x300?text=No+Image'
                }
                alt={movie.title}
              />
              <p>{movie.title}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MovieDetails;
