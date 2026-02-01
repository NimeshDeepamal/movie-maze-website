import React, { useEffect, useState, useCallback, useMemo } from 'react';
import './MovieList.css';
import MovieCard from '../MovieCard/MovieCard';
import { SkeletonGrid } from '../SkeletonCard/SkeletonCard';
import axios from 'axios';
import SearchBar from '../SearchBar/SearchBar';
import _ from 'lodash';
import { useLocation } from 'react-router-dom';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import MovieFilterIcon from '@mui/icons-material/MovieFilter';
import RefreshIcon from '@mui/icons-material/Refresh';

const MovieList = ({ type, title }) => {
  const [movies, setMovies] = useState([]);
  const [filterMovies, setfilterMovies] = useState([]);
  const [minRating, setminRating] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [sort, setsort] = useState({ by: 'default', order: 'asc' });
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState(() => {
    const storedFavorites = localStorage.getItem('favorites');
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  const location = useLocation();
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  // Fetch movies on type or page change
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        if (page === 1) {
          setLoading(true);
          setError(null);
        } else {
          setLoadingMore(true);
        }

        const apiKey = process.env.REACT_APP_TMDB_API_KEY;
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${type}`, {
          params: {
            api_key: apiKey,
            language: 'en-US',
            page: page,
          },
        });

        const newMovies = response.data.results;
        setMovies(prevMovies => (page === 1 ? newMovies : [...prevMovies, ...newMovies]));
        setHasMore(response.data.page < 500);
      } catch (err) {
        console.error('Error fetching movies:', err);
        setError('Failed to load movies. Please try again.');
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    };

    fetchMovies();
  }, [type, page, location]);

  // Filter, sort, and search movies
  useEffect(() => {
    let filtered = movies;

    if (minRating > 0) {
      filtered = filtered.filter(movie => movie.vote_average >= minRating);
    }

    if (searchTerm.trim()) {
      filtered = filtered.filter(movie =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sort.by !== 'default') {
      filtered = _.orderBy(filtered, [sort.by], [sort.order]);
    }

    setfilterMovies(filtered);
  }, [movies, minRating, searchTerm, sort]);

  const handleFilter = useCallback((rate) => {
    if (rate === minRating) {
      setminRating(0);
    } else {
      setminRating(rate);
    }
  }, [minRating]);

  // Debounced search handler
  const debouncedSearch = useMemo(
    () => _.debounce((term) => setSearchTerm(term), 300),
    []
  );

  const handleSearchChange = useCallback((term) => {
    debouncedSearch(term);
  }, [debouncedSearch]);

  const handleSort = useCallback((e) => {
    const { name, value } = e.target;
    setsort((prev) => ({ ...prev, [name]: value }));
  }, []);

  const loadMoreMovies = useCallback(() => {
    if (!loadingMore && hasMore) {
      setPage(prev => prev + 1);
    }
  }, [loadingMore, hasMore]);

  const handleFavoriteClick = useCallback((movie) => {
    const isAlreadyFavorite = favorites.some(fav => fav.id === movie.id);
    const updatedFavorites = isAlreadyFavorite
      ? favorites.filter(fav => fav.id !== movie.id)
      : [...favorites, movie];

    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  }, [favorites]);

  const handleRetry = useCallback(() => {
    setPage(1);
    setError(null);
    setLoading(true);
  }, []);

  const clearFilters = useCallback(() => {
    setminRating(0);
    setSearchTerm('');
    setsort({ by: 'default', order: 'asc' });
  }, []);

  // Error state
  if (error && movies.length === 0) {
    return (
      <section className="movie-list">
        <header className="movie-list-header">
          <h2 className="movie-list-heading">{title}</h2>
        </header>
        <div className="error-state">
          <ErrorOutlineIcon className="error-state-icon" style={{ fontSize: 64 }} />
          <h3 className="error-state-title">Oops! Something went wrong</h3>
          <p className="error-state-description">{error}</p>
          <button className="btn btn-primary" onClick={handleRetry}>
            <RefreshIcon /> Try Again
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="movie-list">
      <header className="movie-list-header">
        <h2 className="movie-list-heading">{title}</h2>
        <div className="movie-list-controls">
          <SearchBar
            minRating={minRating}
            onRatingClick={handleFilter}
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
          />
          <div className="movie-list-sort">
            <select 
              name="by" 
              onChange={handleSort} 
              value={sort.by} 
              className="input select"
              aria-label="Sort by"
            >
              <option value="default">Sort By</option>
              <option value="release_date">Date</option>
              <option value="vote_average">Rating</option>
            </select>
            <select 
              name="order" 
              onChange={handleSort} 
              value={sort.order} 
              className="input select"
              aria-label="Sort order"
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>
      </header>

      {/* Loading state */}
      {loading ? (
        <SkeletonGrid count={12} />
      ) : filterMovies.length === 0 ? (
        /* Empty state */
        <div className="empty-state">
          <MovieFilterIcon className="empty-state-icon" style={{ fontSize: 120 }} />
          <h3 className="empty-state-title">No movies found</h3>
          <p className="empty-state-description">
            {searchTerm || minRating > 0 
              ? "Try adjusting your search or filters to find what you're looking for."
              : "There are no movies to display at the moment."}
          </p>
          {(searchTerm || minRating > 0) && (
            <button className="btn btn-secondary" onClick={clearFilters}>
              Clear Filters
            </button>
          )}
        </div>
      ) : (
        <>
          {/* Movie grid */}
          <div className="movie-grid">
            {filterMovies.map(movie => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onFavoriteClick={handleFavoriteClick}
                isFavorite={favorites.some(fav => fav.id === movie.id)}
                isLoggedIn={isLoggedIn}
              />
            ))}
          </div>

          {/* Load more */}
          {hasMore && !loading && (
            <div className="load-more-container">
              <button 
                className="btn btn-secondary btn-lg load-more-button" 
                onClick={loadMoreMovies}
                disabled={loadingMore}
              >
                {loadingMore ? (
                  <>
                    <span className="loading-spinner"></span>
                    Loading...
                  </>
                ) : (
                  'Load More Movies'
                )}
              </button>
            </div>
          )}

          {/* Loading more skeleton */}
          {loadingMore && (
            <SkeletonGrid count={6} />
          )}
        </>
      )}
    </section>
  );
};

export default MovieList;
