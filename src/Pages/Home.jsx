import React from 'react'
import Hero from '../Components/Hero/Hero'
import MovieList from '../Components/MovieList/MovieList';
import './Home.css'

const Home = () => {
  return (
    <div className='home'>
      <Hero />
      <h1>Movies</h1>
      <MovieList type={"popular"} title={"Popular"}/>
      <MovieList type={"now_playing"} title={"Now Playing"}/>
      <MovieList type={"upcoming"} title={"Upcoming"}/>
      <MovieList type={"top_rated"} title={"Top Rated"}/>
    </div>
  )
}

export default Home;
