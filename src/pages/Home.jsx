import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import InteractiveMap from '../components/InteractiveMap';
import { productsData } from '../data/products';
import { useScrollReveal } from '../hooks/useScrollReveal';

import { useTranslation } from 'react-i18next';

const Home = () => {
  const { t } = useTranslation();
  useScrollReveal();

  const heroImages = [
    '/assets/hero_1.png',
    '/assets/hero_2.png',
    '/assets/hero_3.png',
    '/assets/hero_4.png'
  ];
  const [currentHero, setCurrentHero] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHero(prev => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-narrative">
      {/* 1. Cinematic Hero Slider */}
      <section className="narrative-hero reveal-on-scroll fade-in" style={{ background: 'none' }}>
        {heroImages.map((img, idx) => (
          <div 
            key={img} 
            style={{
              position: 'absolute', inset: 0, 
              backgroundImage: `url('${img}')`,
              backgroundSize: 'cover', backgroundPosition: 'center',
              opacity: currentHero === idx ? 1 : 0,
              transition: 'opacity 2s ease-in-out',
              zIndex: 1
            }} 
          />
        ))}
        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.3)', zIndex: 2 }}></div>
        
        <div className="hero-content" style={{ zIndex: 3, transform: `translateY(${scrollY * 0.4}px)` }}>
          <h1 style={{ textShadow: '0 4px 15px rgba(0,0,0,0.5)' }}>{t('home.hero_title')}</h1>
          <p style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>{t('home.hero_subtitle')}</p>
        </div>
      </section>

      {/* 1.5 Premium Search Section */}
      <section className="home-search-section reveal-on-scroll fade-up" style={{ padding: '6rem 0', background: 'var(--clr-bg-surface)', borderBottom: '1px solid var(--clr-border)' }}>
        <div className="container" style={{ maxWidth: '800px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '3px', color: 'var(--clr-accent)', marginBottom: '2.5rem' }}>Find Your Perfect Bouquet</h2>
          <div className="search-wrapper" style={{ position: 'relative' }}>
            <input 
              type="text" 
              placeholder={t('header.search_placeholder')} 
              style={{ 
                width: '100%', 
                padding: '1.5rem 2rem', 
                fontSize: '2rem', 
                border: 'none', 
                borderBottom: '2px solid var(--clr-border)', 
                background: 'transparent',
                fontFamily: 'var(--font-heading)',
                outline: 'none',
                textAlign: 'center',
                transition: 'border-color 0.3s'
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--clr-accent)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--clr-border)'}
            />
            <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'center', gap: '2rem' }}>
              <span style={{ fontSize: '0.9rem', color: 'var(--clr-text-light)', cursor: 'pointer', borderBottom: '1px solid transparent' }} onMouseEnter={(e) => e.target.style.borderBottomColor = 'var(--clr-accent)'} onMouseLeave={(e) => e.target.style.borderBottomColor = 'transparent'}>#Roses</span>
              <span style={{ fontSize: '0.9rem', color: 'var(--clr-text-light)', cursor: 'pointer', borderBottom: '1px solid transparent' }} onMouseEnter={(e) => e.target.style.borderBottomColor = 'var(--clr-accent)'} onMouseLeave={(e) => e.target.style.borderBottomColor = 'transparent'}>#Birthday</span>
              <span style={{ fontSize: '0.9rem', color: 'var(--clr-text-light)', cursor: 'pointer', borderBottom: '1px solid transparent' }} onMouseEnter={(e) => e.target.style.borderBottomColor = 'var(--clr-accent)'} onMouseLeave={(e) => e.target.style.borderBottomColor = 'transparent'}>#Anniversary</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. The Art of Wrapping */}
      <section className="narrative-section art-wrapping">
        <div className="container split-layout">
          <div className="split-img reveal-on-scroll fade-right">
            <img src="/assets/lifestyle_delivery.png" alt="Premium Delivery" />
          </div>
          <div className="split-text reveal-on-scroll fade-left">
            <span>Signature Wrapping</span>
            <h2>{t('home.presentation_title')}</h2>
            <p>{t('home.presentation_text')}</p>
            <Link to="/category" className="btn btn-primary" style={{ display: 'inline-block' }}>Explore Packaging</Link>
          </div>
        </div>
      </section>

      {/* 3. Scrolling Collection */}
      <section className="narrative-section collection-showcase reveal-on-scroll fade-up">
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2>{t('home.collections_title')}</h2>
            <p style={{ color: 'var(--clr-text-light)' }}>{t('home.collections_subtitle')}</p>
          </div>
          <div className="horizontal-scroll">
            {productsData.slice(0, 5).map(product => (
                <div className="scroll-item" key={product.id}>
                  <ProductCard id={product.id} name={product.name} category={product.category} price={product.basePrice} image={product.image} />
                </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link to="/category" className="btn btn-outline" style={{ display: 'inline-block' }}>View All Collections</Link>
          </div>
        </div>
      </section>

      {/* 4. Gift Recommendation Quiz CTA */}
      <section className="narrative-section quiz-cta reveal-on-scroll fade-up" style={{ background: 'var(--clr-accent)', color: '#fff', padding: '6rem 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span style={{ fontSize: '3rem', marginBottom: '1.5rem', display: 'block' }}>🎁</span>
          <h2 style={{ fontSize: '3rem', marginBottom: '1rem', color: '#fff' }}>{t('quiz.title')}</h2>
          <p style={{ maxWidth: '600px', margin: '0 auto 3rem', opacity: 0.9 }}>Not sure which bouquet to choose? Take our 30-second quiz and find the perfect match for your recipient.</p>
          <Link to="/quiz" className="btn btn-outline" style={{ borderColor: '#fff', color: '#fff' }}>{t('quiz.cta')}</Link>
        </div>
      </section>

      {/* 5. Farm to Vase Explorer (New Interactive Map) */}
      <InteractiveMap />

      {/* 5. Workshops */}
      <section className="narrative-section workshops">
        <div className="container split-layout reverse">
          <div className="split-img reveal-on-scroll fade-left">
            <img src="/assets/hero_4.png" alt="Floral Workshops" style={{ filter: 'grayscale(0%)' }} />
          </div>
          <div className="split-text reveal-on-scroll fade-right">
            <span>{t('header.workshops')}</span>
            <h2>{t('home.workshop_title')}</h2>
            <p>{t('home.workshop_text')}</p>
            <Link to="/workshops" className="btn btn-primary" style={{ display: 'inline-block' }}>Explore Workshops</Link>
          </div>
        </div>
      </section>

      {/* 6. Instagram Grid */}
      <section className="narrative-section instagram-wall reveal-on-scroll fade-up" style={{ paddingBottom: '0' }}>
        <div className="section-header" style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)' }}>@kvetiny_majak</h2>
          <p style={{ color: 'var(--clr-text-light)' }}>Inspirace a krása z našeho ateliéru</p>
        </div>
        <div className="ig-grid">
           <img src="/assets/product_red_roses.png" alt="Instagram post 1" />
           <img src="/assets/product_box.png" alt="Instagram post 2" />
           <img src="/assets/product_peonies.png" alt="Instagram post 3" />
           <img src="/assets/product_box.png" alt="Instagram post 4" />
           <img src="/assets/product_red_roses.png" alt="Instagram post 5" />
        </div>
      </section>
    </div>
  );
};

export default Home;
