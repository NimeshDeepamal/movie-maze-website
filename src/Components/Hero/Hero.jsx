import React from 'react'
import './Hero.css'
import Background from '../Assets/Hero_background.jpg'

const Hero = () => {
  return (
    <div className='hero'>
      <div className="blur-bg"></div>
      <div className='left-hero-container'>
        <h2>Discover Movies Like Never Before</h2>
        <h3>Explore trending titles, top-rated classics, and hidden gems. Find your next favorite film effortlessly.</h3>
        <button>Watch More</button>
      </div>
      <div className="right-hero-container">
           
      </div>
    </div>
  )
}

export default Hero
