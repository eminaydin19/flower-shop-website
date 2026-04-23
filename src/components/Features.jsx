import React from 'react';

const Features = () => {
  return (
    <section className="features">
        <div className="container features-grid">
            <div className="feature-card">
                <div className="feature-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                </div>
                <h3>Express Delivery</h3>
                <p>We deliver your flowers across the city within 90 minutes.</p>
            </div>
            <div className="feature-card">
                <div className="feature-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                </div>
                <h3>100% Freshness Guarantee</h3>
                <p>Sourced daily to ensure the highest quality and longest vase life.</p>
            </div>
            <div className="feature-card">
                <div className="feature-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                </div>
                <h3>Artisan Craftsmanship</h3>
                <p>Each bouquet is an original masterpiece bound by professional florists.</p>
            </div>
        </div>
    </section>
  );
};
export default Features;
