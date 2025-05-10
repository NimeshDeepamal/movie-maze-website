import React from 'react'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import './MovieCard.css'

const MovieCard = ({movie}) => {
  return (
    <a href="" className='movie-card'>
      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="" className="movie-poster" />
        <div className="movie-details">
            <h3 className="movie-details-heading">{movie.original_title}</h3>
            <div className="align_center movie-date-rate">
              <p>{movie.release_date}</p>
              <p><span className="star-emoji"><StarBorderIcon /></span>{" "} {movie.rate_average}</p>
            </div>
            <p className='movie-description'>{movie.overview.slice(0,80)+"..."}</p>
        </div>
    </a>
    
  )
}

export default MovieCard
