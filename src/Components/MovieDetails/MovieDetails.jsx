import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './MovieDetails.css';

const MovieDetails = () => {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const apiKey = process.env.REACT_APP_TMDB_API_KEY;

        const [detailsRes, videosRes] = await Promise.all([
          axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
            params: { api_key: apiKey, language: 'en-US' },
          }),
          axios.get(`https://api.themoviedb.org/3/movie/${id}/videos`, {
            params: { api_key: apiKey },
          }),
        ]);

        setMovieDetails(detailsRes.data);

        const trailer = videosRes.data.results.find(
          (vid) => vid.type === 'Trailer' && vid.site === 'YouTube'
        );
        if (trailer) {
          setTrailerKey(trailer.key);
        }
      } catch (error) {
        console.error('Failed to fetch movie details:', error);
      }
    };

    fetchDetails();
  }, [id]);

  if (!movieDetails) return <p>Loading...</p>;

  return (
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
  );
};

export default MovieDetails;
