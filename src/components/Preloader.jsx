import React, { useState, useEffect } from 'react';

const Preloader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1.5 saniye sonra kapat
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`cinematic-preloader ${!loading ? 'fade-out' : ''}`}>
      <div className="preloader-content">
        <h1 className="preloader-logo">Květiny Maják</h1>
        <div className="preloader-bar-container">
            <div className="preloader-bar"></div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
