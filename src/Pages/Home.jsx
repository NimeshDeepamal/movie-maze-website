import React from 'react';
import Hero from '../Components/Hero/Hero';
import MovieList from '../Components/MovieList/MovieList';
import './Home.css';

const Home = () => {
  return (
    <main className="home-page">
      <Hero />
      <section className="home-movies-section">
        <MovieList type="popular" title="Popular Movies" />
      </section>
    </main>
  );
};

export default Home;
