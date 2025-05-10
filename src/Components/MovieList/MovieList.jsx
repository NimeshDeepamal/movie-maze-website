import React,{useEffect,useState} from 'react'
import './MovieList.css'
import MovieCard from '../MovieCard/MovieCard';
import axios from 'axios';

const MovieList = () => {

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
              setMovies(response.data.results);
            } catch (error) {
              console.error('Error fetching movies:', error);
            }
          };
      
        fetchMovies();
    }, []);

  return (
    <div className='movie-list'>
        <h1>Movies</h1>
      <div className="movie-cards">
        {
            movies.map(movie => <MovieCard key={movie.id} movie={movie} />)
        }
      </div>
    </div>
  )
}

export default MovieList;
