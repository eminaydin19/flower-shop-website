import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { X, Trash2, Calendar, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const CartDrawer = () => {
  const { t, i18n } = useTranslation();
  const { cart, removeFromCart, isCartOpen, setIsCartOpen, cartTotal, formatPrice } = useContext(CartContext);
  const navigate = useNavigate();

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  const FREE_SHIPPING_THRESHOLD = 50; // Updated to match premium feel
  const progress = Math.min((cartTotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const remaining = FREE_SHIPPING_THRESHOLD - cartTotal;

  return (
    <>
      <div className={`cart-overlay ${isCartOpen ? 'open' : ''}`} onClick={() => setIsCartOpen(false)}></div>
      <div className={`cart-drawer ${isCartOpen ? 'open' : ''}`}>
        <div className="cart-header" style={{ padding: '2rem', borderBottom: '1px solid #eee' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: 400 }}>{t('header.cart_title')}</h2>
          <button className="close-cart-btn" onClick={() => setIsCartOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X /></button>
        </div>

        <div className="cart-body" style={{ padding: '0' }}>
          {cart.length > 0 && (
            <div className="shipping-progress-container" style={{ padding: '1.5rem 2rem', background: '#fcfcfc', borderBottom: '1px solid #eee' }}>
              <p style={{ fontSize: '0.75rem', marginBottom: '0.8rem', textAlign: 'center', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>
                {remaining > 0 
                  ? (i18n.language === 'en' ? `You're ${formatPrice(remaining)} away from free shipping` : `Chybí vám ${formatPrice(remaining)} do dopravy zdarma`)
                  : <span style={{ color: '#000' }}>You've unlocked free delivery! 🎉</span>}
              </p>
              <div className="progress-bar-bg" style={{ width: '100%', height: '4px', background: '#eee', overflow: 'hidden' }}>
                <div className="progress-bar-fill" style={{ width: `${progress}%`, height: '100%', background: '#000', transition: 'width 0.6s cubic-bezier(0.65, 0, 0.35, 1)' }}></div>
              </div>
            </div>
          )}

          {cart.length === 0 ? (
            <div className="empty-cart" style={{ padding: '4rem 2rem', textAlign: 'center' }}>
              <p style={{ color: '#888', marginBottom: '2rem' }}>Your cart is currently empty.</p>
              <button className="btn btn-outline" onClick={() => setIsCartOpen(false)}>Start Shopping</button>
            </div>
          ) : (
            <div className="cart-items" style={{ padding: '1rem 2rem' }}>
              {cart.map((item) => (
                <div className="cart-item" key={item.cartId} style={{ display: 'grid', gridTemplateColumns: '80px 1fr 30px', gap: '1.5rem', padding: '1.5rem 0', borderBottom: '1px solid #f5f5f5' }}>
                  <img src={item.image} alt={item.name} style={{ width: '80px', height: '100px', objectFit: 'cover' }} />
                  <div className="cart-item-info">
                    <h4 style={{ fontSize: '1rem', marginBottom: '0.3rem', fontWeight: 500 }}>{item.name}</h4>
                    <p style={{ fontSize: '0.8rem', color: '#888', marginBottom: '0.5rem' }}>Size: {item.sizeLabel}</p>
                    
                    {item.addons?.length > 0 && (
                      <div style={{ marginBottom: '0.5rem' }}>
                        {item.addons.map((a, i) => (
                          <p key={i} style={{ fontSize: '0.75rem', color: '#666' }}>+ {a.name}</p>
                        ))}
                      </div>
                    )}

                    <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                      {item.deliveryDate && (
                        <span style={{ fontSize: '0.7rem', display: 'flex', alignItems: 'center', gap: '4px', color: '#888' }}>
                          <Calendar size={12} /> {item.deliveryDate}
                        </span>
                      )}
                      {item.deliveryType && (
                        <span style={{ fontSize: '0.7rem', display: 'flex', alignItems: 'center', gap: '4px', color: '#888' }}>
                          <MapPin size={12} /> {item.deliveryType === 'rozvoz' ? 'Delivery' : 'Pickup'}
                        </span>
                      )}
                    </div>
                    
                    <div className="cart-item-bottom" style={{ marginTop: '0.8rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.8rem' }}>Qty: {item.qty}</span>
                      <span style={{ fontWeight: 600 }}>{formatPrice(item.price * item.qty)}</span>
                    </div>
                  </div>
                  <button onClick={() => removeFromCart(item.cartId)} style={{ background: 'none', border: 'none', cursor: 'pointer', alignSelf: 'start', opacity: 0.3 }}>
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="cart-footer" style={{ padding: '2rem', borderTop: '1px solid #eee' }}>
            <div className="cart-subtotal" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', fontSize: '1.1rem' }}>
              <span>Subtotal</span>
              <span style={{ fontWeight: 600 }}>{formatPrice(cartTotal)}</span>
            </div>
            <button className="btn btn-primary" onClick={handleCheckout} style={{ width: '100%', padding: '1.2rem', background: '#000', color: '#fff', border: 'none', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 600, cursor: 'pointer' }}>
              Secure Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
};
export default CartDrawer;
