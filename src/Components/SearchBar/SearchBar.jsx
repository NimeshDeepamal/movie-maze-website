import React from 'react';
import './SearchBar.css'

const SearchBar = ({ minRating, onRatingClick, searchTerm, onSearchChange }) => {
  return (
    <div className="search-bar-container">
      <input
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="movie-search-input"
      />
      <ul className="align-center movie-filter">
        <li
          className={minRating === 8 ? "movie-filter-item active" : "movie-filter-item"}
          onClick={() => onRatingClick(8)}
        >
          8+ Star
        </li>
        <li
          className={minRating === 7 ? "movie-filter-item active" : "movie-filter-item"}
          onClick={() => onRatingClick(7)}
        >
          7+ Star
        </li>
        <li
          className={minRating === 6 ? "movie-filter-item active" : "movie-filter-item"}
          onClick={() => onRatingClick(6)}
        >
          6+ Star
        </li>
      </ul>
    </div>
  );
};

export default SearchBar;
