import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { soundManager } from '../utils/soundManager';
import { CartContext } from '../context/CartContext';
import { useTranslation } from 'react-i18next';

const workshops = [
  { id: 1, date: 'May 12, 2026', time: '18:00', title: 'Spring Spirit Arrangement', price: 85, left: 4, img: '/assets/workshop_1.png' },
  { id: 2, date: 'May 19, 2026', time: '17:30', title: 'The Art of Paper Wrapping', price: 65, left: 2, img: '/assets/workshop_3.png' },
  { id: 3, date: 'June 05, 2026', time: '19:00', title: 'Midnight Roses & Champagne', price: 120, left: 8, img: '/assets/workshop_2.png' }
];

const Workshops = () => {
  const { i18n } = useTranslation();
  const { formatPrice } = useContext(CartContext);
  const [bookedId, setBookedId] = useState(null);

  const handleBook = (id) => {
    soundManager.playClick();
    setBookedId(id);
    setTimeout(() => alert(i18n.language === 'en' ? "Your seat at the atelier has been reserved!" : "Vaše místo v ateliéru bylo rezervováno!"), 300);
  };

  return (
    <div className="workshops-page" style={{ padding: '150px 2rem 4rem', minHeight: '100vh', background: '#fff' }}>
      <div className="container" style={{ maxWidth: '1100px', margin: '0 auto' }}>
        
        <header style={{ textAlign: 'center', marginBottom: '6rem' }}>
          <h1 style={{ fontSize: '4.5rem', fontFamily: 'var(--font-heading)', marginBottom: '1.5rem', fontWeight: 400 }}>Floral Ateliers</h1>
          <p style={{ fontSize: '1.1rem', color: '#666', maxWidth: '700px', margin: '0 auto', lineHeight: 1.8 }}>
            Experience the meditative art of floral design in our Prague studio. Guided by master florists, you'll create your own arrangement while enjoying fine wine and inspiration.
          </p>
        </header>

        <div className="workshops-list" style={{ display: 'grid', gap: '4rem' }}>
          {workshops.map((ws) => (
            <motion.div 
               key={ws.id}
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               style={{ 
                 display: 'grid', 
                 gridTemplateColumns: '1fr 1fr', 
                 background: '#fff', 
                 overflow: 'hidden', 
                 border: '1px solid #eee'
               }}
            >
              <div style={{ height: '400px', overflow: 'hidden' }}>
                <img src={ws.img} alt={ws.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: '0.5s' }} />
              </div>
              <div style={{ padding: '4rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <span style={{ fontSize: '0.75rem', color: '#999', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase' }}>{ws.date} @ {ws.time}</span>
                <h3 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-heading)', margin: '1rem 0 1.5rem', fontWeight: 400 }}>{ws.title}</h3>
                
                <div style={{ marginBottom: '2.5rem' }}>
                    <span style={{ fontSize: '1.8rem', fontWeight: 500, display: 'block' }}>{formatPrice(ws.price)}</span>
                    <p style={{ fontSize: '0.8rem', color: ws.left < 3 ? '#d4a3a3' : '#888', marginTop: '5px' }}>Only {ws.left} seats left!</p>
                </div>

                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                    <button 
                      onClick={() => handleBook(ws.id)}
                      style={{ 
                        padding: '1.2rem 3rem', background: '#000', color: '#fff', border: 'none', 
                        textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 600, cursor: 'pointer' 
                      }}
                    >
                      {bookedId === ws.id ? 'Reserved ✓' : 'Book a Seat'}
                    </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Workshops;
