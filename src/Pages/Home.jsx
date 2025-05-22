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
    </div>
  )
}

export default Home;
