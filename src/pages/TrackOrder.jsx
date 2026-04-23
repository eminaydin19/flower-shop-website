import React, { useState } from 'react';

const TrackOrder = () => {
  const [orderId, setOrderId] = useState('');
  const [email, setEmail] = useState('');
  const [trackingData, setTrackingData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleTrack = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setTrackingData({
        status: 2, // 0: Placed, 1: Arranging, 2: Out for Delivery, 3: Delivered
        estimatedDelivery: 'Today by 17:00',
      });
      setIsLoading(false);
    }, 1200);
  };

  return (
    <div className="tracking-page" style={{ padding: 'calc(80px + var(--spacing-lg)) 0 var(--spacing-lg)', minHeight: '80vh', backgroundColor: 'var(--clr-bg-alt)' }}>
      <div className="container" style={{ maxWidth: '600px' }}>
        <div className="tracking-card" style={{ background: 'var(--clr-bg)', padding: '3rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', marginBottom: '0.5rem' }}>Track Your Order</h1>
            <p style={{ color: 'var(--clr-text-light)' }}>Enter your order details below to see the current status of your blooms.</p>
          </div>

          {!trackingData ? (
            <form onSubmit={handleTrack} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Order Number</label>
                <input type="text" className="premium-input-line" placeholder="e.g. #KM-1204" required value={orderId} onChange={(e) => setOrderId(e.target.value)} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Email Address</label>
                <input type="email" className="premium-input-line" placeholder="Email used for the order" required value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem', padding: '1.2rem', fontSize: '1.1rem' }}>
                {isLoading ? 'Locating Order...' : 'Track Order'}
              </button>
            </form>
          ) : (
            <div className="tracking-results" style={{ marginTop: '1rem' }}>
              <div style={{ textAlign: 'center', marginBottom: '2.5rem', padding: '1rem', backgroundColor: 'rgba(57, 63, 60, 0.05)', borderRadius: '8px' }}>
                <p style={{ fontSize: '0.9rem', color: 'var(--clr-text-light)', marginBottom: '0.3rem' }}>Estimated Delivery</p>
                <h3 style={{ fontSize: '1.4rem' }}>{trackingData.estimatedDelivery}</h3>
              </div>

              <div className="timeline">
                <div className={`timeline-item ${trackingData.status >= 0 ? 'active' : ''}`}>
                  <div className="timeline-icon">✓</div>
                  <div className="timeline-content">
                    <h4>Order Placed</h4>
                    <p>We have received your order details.</p>
                  </div>
                </div>
                <div className={`timeline-item ${trackingData.status >= 1 ? 'active' : ''}`}>
                  <div className="timeline-icon">✂️</div>
                  <div className="timeline-content">
                    <h4>Arranging</h4>
                    <p>Our master florists are preparing your blooms.</p>
                  </div>
                </div>
                <div className={`timeline-item ${trackingData.status >= 2 ? 'active' : ''}`}>
                  <div className="timeline-icon">🚚</div>
                  <div className="timeline-content">
                    <h4>Out for Delivery</h4>
                    <p>Your order is on the way with our luxury courier.</p>
                  </div>
                </div>
                <div className={`timeline-item ${trackingData.status >= 3 ? 'active' : ''}`}>
                  <div className="timeline-icon">💐</div>
                  <div className="timeline-content">
                    <h4>Delivered</h4>
                    <p>The smiles have been successfully delivered.</p>
                  </div>
                </div>
              </div>
              
              <button onClick={() => setTrackingData(null)} style={{ background: 'none', border: 'none', width: '100%', textAlign: 'center', marginTop: '2rem', cursor: 'pointer', color: 'var(--clr-text-light)', textDecoration: 'underline' }}>Track another order</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default TrackOrder;
