import React, { useEffect, useState } from 'react';
import './MovieList.css';
import MovieCard from '../MovieCard/MovieCard';
import axios from 'axios';
import SearchBar from '../SearchBar/SearchBar';
import _ from 'lodash';

const MovieList = ({ type, title }) => {
  const [movies, setMovies] = useState([]);
  const [filterMovies, setfilterMovies] = useState([]);
  const [minRating, setminRating] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [sort, setsort] = useState({ by: 'default', order: 'asc' });
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [favorites, setFavorites] = useState([]);

  const fetchMovies = async (currentPage = 1) => {
    try {
      const apiKey = '50c083697496217a8ad3e4c3ee234c27';
      const response = await axios.get(`https://api.themoviedb.org/3/movie/${type}`, {
        params: {
          api_key: apiKey,
          language: 'en-US',
          page: currentPage,
        },
      });

      const newMovies = response.data.results;
      const updatedMovies = currentPage === 1 ? newMovies : [...movies, ...newMovies];

      setMovies(updatedMovies);
      setHasMore(currentPage < 500);
    } catch (error) {
      console.error('Error fetching movies:', error);
      setfilterMovies([]);
    }
  };

  useEffect(() => {
    fetchMovies(page);
  }, [page]);

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

  const handleFiter = (rate) => {
    if (rate === minRating) {
      setminRating(0);
    } else {
      setminRating(rate);
    }
  };

  const handleSearchChange = (term) => {
    setSearchTerm(term);
  };

  const handleSort = (e) => {
    const { name, value } = e.target;
    setsort((prev) => ({ ...prev, [name]: value }));
  };

  const loadMoreMovies = () => {
    setPage(prev => prev + 1);
  };

  const handleFavoriteClick = (movie) => {
    const isAlreadyFavorite = favorites.some(fav => fav.id === movie.id);
    let updatedFavorites;
  
    if (isAlreadyFavorite) {
      updatedFavorites = favorites.filter(fav => fav.id !== movie.id);
    } else {
      updatedFavorites = [...favorites, movie];
    }
  
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <section className="movie-list">
      <header className="align-center movie-list-header">
        <h2 className="align-center movie-list-heading">{title}</h2>
        <div className="align-center movie-list-fs">
          <SearchBar
            minRating={minRating}
            onRatingClick={handleFiter}
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
          />
          <select name="by" onChange={handleSort} value={sort.by} className="movie-sorting">
            <option value="default">Sort By</option>
            <option value="release_date">Date</option>
            <option value="vote_average">Rating</option>
          </select>
          <select name="order" onChange={handleSort} value={sort.order} className="movie-sorting">
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </header>
      <div className="movie-cards">
        {filterMovies.map(movie => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onFavoriteClick={handleFavoriteClick} // Pass function here
            isFavorite={favorites.some(fav => fav.id === movie.id)}
          />
        ))}
      </div>
      {hasMore && (
        <div className="load-more-container">
          <button className="load-more-button" onClick={loadMoreMovies}>
            Load More
          </button>
        </div>
      )}
    </section>
  );
};

export default MovieList;
