import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Truck, CreditCard, CheckCircle } from 'lucide-react';

const Checkout = () => {
  const { t, i18n } = useTranslation();
  const { cart, cartTotal, clearCart, formatPrice } = useContext(CartContext);
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const shippingCost = cartTotal > 50 ? 0 : 10;

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      clearCart();
    }, 3000);
  };

  return (
    <div className="checkout-page" style={{ padding: '120px 0', background: '#fafafa', minHeight: '100vh' }}>
      <div className="container" style={{ maxWidth: '1100px' }}>
        <div className="checkout-grid" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '4rem', alignItems: 'start' }}>
          
          <form className="checkout-form" onSubmit={handlePlaceOrder} style={{ background: '#fff', padding: '3rem', border: '1px solid #eee' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', marginBottom: '2.5rem' }}>Checkout</h2>
            
            <div className="checkout-section" style={{ marginBottom: '3rem' }}>
              <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1.5rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>Contact Information</h3>
              <div style={{ display: 'grid', gap: '1rem' }}>
                <input type="email" placeholder="Email Address" required style={{ width: '100%', padding: '12px', border: '1px solid #ddd' }} />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <input type="text" placeholder="First Name" required style={{ width: '100%', padding: '12px', border: '1px solid #ddd' }} />
                  <input type="text" placeholder="Last Name" required style={{ width: '100%', padding: '12px', border: '1px solid #ddd' }} />
                </div>
                <input type="tel" placeholder="Phone Number (e.g. +420...)" required style={{ width: '100%', padding: '12px', border: '1px solid #ddd' }} />
              </div>
            </div>

            <div className="checkout-section" style={{ marginBottom: '3rem' }}>
              <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1.5rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>Shipping Address</h3>
              <div style={{ display: 'grid', gap: '1rem' }}>
                <input type="text" placeholder="Street and house number" required style={{ width: '100%', padding: '12px', border: '1px solid #ddd' }} />
                <input type="text" placeholder="Apartment, suite, etc. (optional)" style={{ width: '100%', padding: '12px', border: '1px solid #ddd' }} />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <input type="text" placeholder="City" required style={{ width: '100%', padding: '12px', border: '1px solid #ddd' }} />
                  <input type="text" placeholder="Postal Code" required style={{ width: '100%', padding: '12px', border: '1px solid #ddd' }} />
                </div>
                <select style={{ width: '100%', padding: '12px', border: '1px solid #ddd', background: '#fff' }}>
                   <option>Czech Republic</option>
                   <option>Slovakia</option>
                   <option>Germany</option>
                </select>
              </div>
            </div>

            <div className="checkout-section" style={{ marginBottom: '3rem' }}>
              <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1.5rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>Payment</h3>
              <div style={{ padding: '2rem', border: '1px solid #ddd', background: '#f9f9f9', borderRadius: '4px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem', color: '#666' }}>
                  <CreditCard size={18} />
                  <span style={{ fontSize: '0.9rem' }}>All transactions are secure and encrypted.</span>
                </div>
                <div style={{ display: 'grid', gap: '1rem', opacity: 0.5 }}>
                  <input type="text" placeholder="Card Number" disabled style={{ width: '100%', padding: '12px', border: '1px solid #ddd' }} />
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <input type="text" placeholder="MM / YY" disabled style={{ width: '100%', padding: '12px', border: '1px solid #ddd' }} />
                    <input type="text" placeholder="CVC" disabled style={{ width: '100%', padding: '12px', border: '1px solid #ddd' }} />
                  </div>
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isProcessing || cart.length === 0}
              style={{ 
                width: '100%', padding: '1.5rem', background: '#000', color: '#fff', border: 'none', 
                textTransform: 'uppercase', fontWeight: 600, letterSpacing: '2px', cursor: 'pointer',
                opacity: isProcessing ? 0.7 : 1
              }}>
              {isProcessing ? 'Processing Order...' : `Pay ${formatPrice(cartTotal + shippingCost)} Now`}
            </button>
            
            <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'center', gap: '2rem', opacity: 0.5, fontSize: '0.75rem' }}>
               <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><ShieldCheck size={14} /> PCI Compliant</span>
               <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><Truck size={14} /> Insured Delivery</span>
            </div>
          </form>

          {/* Right: Order Summary */}
          <div className="checkout-summary" style={{ position: 'sticky', top: '120px' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '2rem', fontFamily: 'var(--font-heading)' }}>Order Summary</h3>
            <div style={{ display: 'grid', gap: '1.5rem', marginBottom: '2rem' }}>
              {cart.map(item => (
                <div key={item.cartId} style={{ display: 'grid', gridTemplateColumns: '60px 1fr auto', gap: '1rem', alignItems: 'center' }}>
                  <div style={{ position: 'relative' }}>
                    <img src={item.image} alt={item.name} style={{ width: '60px', height: '60px', objectFit: 'cover', border: '1px solid #eee' }} />
                    <span style={{ position: 'absolute', top: '-10px', right: '-10px', background: '#888', color: '#fff', width: '20px', height: '20px', borderRadius: '50%', fontSize: '0.7rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{item.qty}</span>
                  </div>
                  <div style={{ fontSize: '0.9rem' }}>
                    <h4 style={{ fontWeight: 500 }}>{item.name}</h4>
                    <p style={{ fontSize: '0.75rem', color: '#888' }}>{item.sizeLabel} {item.deliveryDate ? `• ${item.deliveryDate}` : ''}</p>
                    {item.addons?.length > 0 && (
                      <p style={{ fontSize: '0.7rem', color: '#aaa', marginTop: '3px' }}>
                        + {item.addons.map(a => a.name).join(', ')}
                      </p>
                    )}
                  </div>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>
                    {formatPrice(item.price * item.qty)}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ borderTop: '1px solid #eee', paddingTop: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem', fontSize: '0.9rem' }}>
                <span style={{ color: '#666' }}>Subtotal</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                <span style={{ color: '#666' }}>Shipping</span>
                <span>{shippingCost === 0 ? 'Free' : formatPrice(shippingCost)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 600, borderTop: '1px solid #eee', paddingTop: '1.5rem' }}>
                <span>Total</span>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '0.7rem', color: '#888', fontWeight: 400, marginRight: '10px' }}>{i18n.language === 'en' ? 'VAT Included' : 'vč. DPH'}</span>
                  <span>{formatPrice(cartTotal + shippingCost)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isSuccess && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ position: 'fixed', inset: 0, background: '#fff', zIndex: 3000, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}
          >
            <CheckCircle size={80} color="#000" style={{ marginBottom: '2rem' }} />
            <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '3rem', marginBottom: '1rem' }}>Thank you for your order</h1>
            <p style={{ color: '#666', maxWidth: '500px', marginBottom: '3rem', lineHeight: 1.6 }}>
              Your order #210422 is being prepared. We've sent a confirmation email to your address.
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <Link to="/" className="btn btn-primary" style={{ padding: '1rem 2rem', background: '#000', color: '#fff', textDecoration: 'none', fontWeight: 600 }}>Continue Shopping</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Checkout;
