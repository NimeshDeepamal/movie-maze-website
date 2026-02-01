import React, { useState, useEffect, useRef } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import './SearchBar.css';

const SearchBar = ({ minRating, onRatingClick, searchTerm: externalSearchTerm, onSearchChange }) => {
  const [localSearchTerm, setLocalSearchTerm] = useState(externalSearchTerm || '');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  // Sync with external search term
  useEffect(() => {
    setLocalSearchTerm(externalSearchTerm || '');
  }, [externalSearchTerm]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setLocalSearchTerm(value);
    onSearchChange(value);
  };

  const clearSearch = () => {
    setLocalSearchTerm('');
    onSearchChange('');
    inputRef.current?.focus();
  };

  const ratingFilters = [
    { value: 8, label: '8+' },
    { value: 7, label: '7+' },
    { value: 6, label: '6+' },
  ];

  return (
    <div className="search-bar">
      {/* Search Input */}
      <div className={`search-input-wrapper ${isFocused ? 'focused' : ''}`}>
        <SearchIcon className="search-icon" />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search movies..."
          value={localSearchTerm}
          onChange={handleInputChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="search-input"
          aria-label="Search movies"
        />
        {localSearchTerm && (
          <button 
            className="search-clear" 
            onClick={clearSearch}
            aria-label="Clear search"
            type="button"
          >
            <CloseIcon />
          </button>
        )}
      </div>

      {/* Rating Filter Chips */}
      <div className="filter-chips" role="group" aria-label="Filter by minimum rating">
        {ratingFilters.map((filter) => (
          <button
            key={filter.value}
            className={`filter-chip ${minRating === filter.value ? 'active' : ''}`}
            onClick={() => onRatingClick(filter.value)}
            aria-pressed={minRating === filter.value}
          >
            <StarRoundedIcon className="chip-star" />
            <span>{filter.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
