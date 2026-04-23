import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="hero">
        <div className="hero-image-wrapper">
            <img src="/assets/hero.png" alt="Floating flower bouquet" className="hero-image" />
        </div>
        <div className="hero-content">
            <h1 className="hero-title">Elegance in Every Bloom</h1>
            <p className="hero-subtitle">Breathtaking floral arrangements crafted for unforgettable moments. Delivered to your doorstep with care.</p>
            <Link to="/category" className="btn btn-primary">Shop Collection</Link>
        </div>
    </section>
  );
};
export default Hero;
