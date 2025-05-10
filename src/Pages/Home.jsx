import React from 'react'
import Hero from '../Components/Hero/Hero'
import Popular from '../Components/Popular/Popular';
import MovieList from '../Components/MovieList/MovieList';

const Home = () => {
  return (
    <div className='home'>
      <Hero />
      <Popular />
      <MovieList />
    </div>
  )
}

export default Home;
