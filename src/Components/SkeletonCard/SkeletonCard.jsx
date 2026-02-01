import React from 'react';
import './SkeletonCard.css';

const SkeletonCard = () => {
  return (
    <div className="skeleton-card" aria-hidden="true">
      <div className="skeleton-poster skeleton"></div>
      <div className="skeleton-content">
        <div className="skeleton-title skeleton"></div>
        <div className="skeleton-meta">
          <div className="skeleton-date skeleton"></div>
          <div className="skeleton-rating skeleton"></div>
        </div>
        <div className="skeleton-description skeleton"></div>
        <div className="skeleton-description-short skeleton"></div>
      </div>
      <div className="skeleton-favorite skeleton"></div>
    </div>
  );
};

// Grid of skeleton cards for loading state
export const SkeletonGrid = ({ count = 10 }) => {
  return (
    <div className="skeleton-grid" role="status" aria-label="Loading movies...">
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
      <span className="sr-only">Loading movies...</span>
    </div>
  );
};

// Skeleton for movie details page
export const SkeletonDetails = () => {
  return (
    <div className="skeleton-details" role="status" aria-label="Loading movie details...">
      <div className="skeleton-details-hero">
        <div className="skeleton-details-overlay">
          <div className="skeleton-details-content">
            <div className="skeleton-details-poster skeleton"></div>
            <div className="skeleton-details-info">
              <div className="skeleton-details-title skeleton"></div>
              <div className="skeleton-details-meta skeleton"></div>
              <div className="skeleton-details-genres skeleton"></div>
              <div className="skeleton-details-overview skeleton"></div>
              <div className="skeleton-details-overview-2 skeleton"></div>
              <div className="skeleton-details-actions skeleton"></div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="skeleton-section">
        <div className="skeleton-section-title skeleton"></div>
        <div className="skeleton-cast-grid">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="skeleton-cast-card">
              <div className="skeleton-cast-image skeleton"></div>
              <div className="skeleton-cast-name skeleton"></div>
              <div className="skeleton-cast-role skeleton"></div>
            </div>
          ))}
        </div>
      </div>
      <span className="sr-only">Loading movie details...</span>
    </div>
  );
};

export default SkeletonCard;
