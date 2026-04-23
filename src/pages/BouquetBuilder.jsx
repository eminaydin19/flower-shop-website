import React, { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CartContext } from '../context/CartContext';
import { soundManager } from '../utils/soundManager';

const steps = [
  { id: 'base', title: 'Pick Your Base', options: [ { name: 'Signature Bouquet', price: 45, icon: '💐' }, { name: 'Premium Box', price: 60, icon: '🎁' } ] },
  { id: 'flowers', title: 'Main Flowers', options: [ { name: 'Red Roses', price: 20, icon: '🌹' }, { name: 'White Lilies', price: 25, icon: '🌺' }, { name: 'Pink Peonies', price: 30, icon: '🌸' } ] },
  { id: 'accent', title: 'Accents', options: [ { name: 'Eucalyptus', price: 10, icon: '🌿' }, { name: 'Gypsophila', price: 8, icon: '☁️' }, { name: 'None', price: 0, icon: '✖️' } ] },
  { id: 'card', title: 'Gift Card', options: [ { name: 'Handwritten Card', price: 5, icon: '✉️' }, { name: 'No Card', price: 0, icon: '✖️' } ] }
];

const BouquetBuilder = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState({});
  const { addToCart } = useContext(CartContext);

  const handleSelect = (stepId, option) => {
    soundManager.playClick();
    setSelections({ ...selections, [stepId]: option });
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const calculateTotal = () => {
    return Object.values(selections).reduce((acc, opt) => acc + opt.price, 0);
  };

  const handleFinish = () => {
    soundManager.playClick();
    const cartItem = {
      cartId: `custom-bouquet-${Date.now()}`,
      name: 'Custom Designed Bouquet',
      image: '/assets/product_peonies.png',
      price: calculateTotal(),
      qty: 1,
      details: Object.entries(selections).map(([key, opt]) => `${key}: ${opt.name}`).join(', ')
    };
    addToCart(cartItem);
    alert("Your masterpiece has been added to the cart!");
  };

  return (
    <div className="builder-page" style={{ padding: '120px 2rem 4rem', minHeight: '100vh', background: 'var(--clr-bg)' }}>
      <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--clr-accent)', letterSpacing: '2px' }}>The Atelier</span>
          <h1 style={{ fontSize: '3.5rem', fontFamily: 'var(--font-heading)', marginTop: '0.5rem' }}>Design Your Masterpiece</h1>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '1.5rem' }}>
            {steps.map((_, idx) => (
              <div key={idx} style={{ width: '40px', height: '4px', background: idx <= currentStep ? 'var(--clr-accent)' : 'var(--clr-border)', borderRadius: '2px', transition: '0.3s' }}></div>
            ))}
          </div>
        </div>

        <div className="builder-grid" style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '3rem', alignItems: 'start' }}>
          
          <div className="step-content">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 style={{ fontSize: '2rem', marginBottom: '2rem', fontFamily: 'var(--font-heading)' }}>{steps[currentStep].title}</h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                  {steps[currentStep].options.map((opt) => (
                    <button
                      key={opt.name}
                      onClick={() => handleSelect(steps[currentStep].id, opt)}
                      style={{ 
                        padding: '2rem', 
                        border: selections[steps[currentStep].id]?.name === opt.name ? '2px solid var(--clr-accent)' : '1px solid var(--clr-border)',
                        background: 'var(--clr-bg-surface)',
                        borderRadius: '16px',
                        cursor: 'pointer',
                        textAlign: 'center',
                        transition: 'var(--transition-mid)'
                      }}
                    >
                      <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{opt.icon}</div>
                      <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>{opt.name}</h4>
                      <p style={{ color: 'var(--clr-accent)', fontWeight: 600 }}>+ {opt.price} €</p>
                    </button>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
            
            {currentStep > 0 && (
               <button onClick={() => setCurrentStep(prev => prev - 1)} style={{ marginTop: '2rem', background: 'none', border: 'none', color: 'var(--clr-text-light)', cursor: 'pointer', textDecoration: 'underline' }}>
                 Back to previous step
               </button>
            )}
          </div>

          <div className="summary-sidebar" style={{ background: 'var(--clr-bg-surface)', padding: '2.5rem', borderRadius: '20px', boxShadow: 'var(--shadow-md)', position: 'sticky', top: '120px' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--clr-border)', paddingBottom: '1rem' }}>Your Selection</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {steps.map((step) => (
                <li key={step.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', opacity: selections[step.id] ? 1 : 0.3 }}>
                  <span style={{ fontSize: '0.9rem' }}>{step.title}</span>
                  <span style={{ fontWeight: 600 }}>{selections[step.id]?.name || '...'}</span>
                </li>
              ))}
            </ul>
            <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '2px solid var(--clr-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '1.2rem', fontWeight: 600 }}>Total</span>
              <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--clr-accent)' }}>{calculateTotal()} €</span>
            </div>
            
            <button 
              className="btn btn-primary" 
              disabled={Object.keys(selections).length < steps.length}
              onClick={handleFinish}
              style={{ width: '100%', marginTop: '2rem', padding: '1.5rem', opacity: Object.keys(selections).length < steps.length ? 0.5 : 1 }}
            >
              Add My Creation to Cart
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default BouquetBuilder;
