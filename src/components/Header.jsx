import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { soundManager } from '../utils/soundManager';
import { useTranslation } from 'react-i18next';
import { Search, ShoppingBag, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const { cartCount, setIsCartOpen, currency, setCurrency } = useContext(CartContext);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchOpen(false);
      navigate(`/category?search=${searchQuery}`);
    }
  };

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`} style={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 1000, transition: '0.3s' }}>
      <div className="announcement-bar" style={{ background: '#000', color: '#fff', fontSize: '0.7rem', padding: '8px 0', textAlign: 'center', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: 500 }}>
        {i18n.language === 'en' ? 'Free Delivery on Orders Over 50€ • Fresh Flowers Daily' : 'Doprava zdarma nad 1250 Kč • Čerstvé květiny každý den'}
      </div>
      
      <div className="nav-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: scrolled ? '1rem 4rem' : '2rem 4rem', background: scrolled ? 'rgba(255,255,255,0.95)' : 'transparent', backdropFilter: scrolled ? 'blur(10px)' : 'none', borderBottom: scrolled ? '1px solid #eee' : 'none' }}>
        
        <div className="nav-left" style={{ display: 'flex', alignItems: 'center', gap: '3rem' }}>
          <div className="logo" style={{ fontSize: '1.8rem', fontFamily: 'var(--font-heading)', fontWeight: 400 }}>
            <Link to="/" style={{ color: '#000', textDecoration: 'none' }}>Květiny Maják</Link>
          </div>
          
          <nav className="nav-desktop hide-mobile">
            <ul style={{ display: 'flex', gap: '2rem', listStyle: 'none', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>
              <li><Link to="/category" style={{ color: '#000', textDecoration: 'none' }}>{t('header.collections')}</Link></li>
              <li><Link to="/builder" style={{ color: 'var(--clr-accent)', textDecoration: 'none' }}>Design Your Own</Link></li>
              <li><Link to="/workshops" style={{ color: '#000', textDecoration: 'none' }}>{t('header.workshops')}</Link></li>
              <li><Link to="/quiz" style={{ color: '#000', textDecoration: 'none' }}>Gift Finder</Link></li>
              <li><Link to="/track-order" style={{ color: '#000', textDecoration: 'none' }}>{t('header.track_order')}</Link></li>
            </ul>
          </nav>
        </div>

        <div className="nav-right" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div className="locale-selectors hide-mobile" style={{ display: 'flex', gap: '10px' }}>
             <select 
              value={i18n.language} 
              onChange={(e) => i18n.changeLanguage(e.target.value)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.7rem', fontWeight: 700, outline: 'none' }}
             >
               <option value="en">EN</option>
               <option value="cs">CS</option>
             </select>
             <select 
              value={currency} 
              onChange={(e) => setCurrency(e.target.value)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.7rem', fontWeight: 700, outline: 'none' }}
             >
               <option value="EUR">EUR</option>
               <option value="CZK">CZK</option>
             </select>
          </div>

          <button onClick={() => setSearchOpen(!searchOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
            <Search size={20} />
          </button>

          <button onClick={() => setIsCartOpen(true)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', position: 'relative' }}>
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span style={{ position: 'absolute', top: '-8px', right: '-8px', background: '#000', color: '#fff', fontSize: '0.6rem', width: '16px', height: '16px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {cartCount}
              </span>
            )}
          </button>

          <button className="mobile-menu-btn hide-desktop" onClick={() => setMenuOpen(!menuOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Search Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{ position: 'absolute', top: '100%', left: 0, width: '100%', background: '#fff', padding: '3rem', borderBottom: '1px solid #eee', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}
          >
            <div className="container" style={{ maxWidth: '800px', position: 'relative' }}>
              <form onSubmit={handleSearchSubmit}>
                <input 
                  autoFocus
                  type="text" 
                  placeholder={t('header.search_placeholder')} 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ width: '100%', border: 'none', borderBottom: '2px solid #000', padding: '1rem 0', fontSize: '2rem', fontFamily: 'var(--font-heading)', outline: 'none' }} 
                />
              </form>
              <button onClick={() => setSearchOpen(false)} style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={24} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div style={{ position: 'fixed', inset: 0, background: '#fff', zIndex: 2000, padding: '2rem' }}>
           <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '3rem' }}>
              <button onClick={() => setMenuOpen(false)} style={{ background: 'none', border: 'none' }}><X size={32} /></button>
           </div>
           <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '2rem', fontSize: '2rem', fontFamily: 'var(--font-heading)' }}>
              <li><Link to="/category" onClick={() => setMenuOpen(false)}>Collections</Link></li>
              <li><Link to="/builder" onClick={() => setMenuOpen(false)}>Design Bouquet</Link></li>
              <li><Link to="/workshops" onClick={() => setMenuOpen(false)}>Workshops</Link></li>
              <li><Link to="/quiz" onClick={() => setMenuOpen(false)}>Gift Finder</Link></li>
              <li><Link to="/track-order" onClick={() => setMenuOpen(false)}>Track Order</Link></li>
           </ul>
        </div>
      )}
    </header>
  );
};
export default Header;
