import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('majakUser');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('majakUser');
    navigate('/login');
  };

  if (!user) return null;

  return (
    <section className="profile-section" style={{ padding: '120px 2rem 4rem', minHeight: '80vh' }}>
      <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', borderBottom: '1px solid var(--clr-border)', paddingBottom: '2rem' }}>
          <div>
            <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', marginBottom: '0.5rem' }}>Welcome Back.</h1>
            <p style={{ color: 'var(--clr-text-light)' }}>{user.email} • Club Member Since {user.memberSince}</p>
          </div>
          <button onClick={handleLogout} className="btn btn-outline">Sign Out</button>
        </div>

        <div className="profile-dashboard" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
          
          <div className="dashboard-card" style={{ background: 'var(--clr-bg-surface)', padding: '2rem', borderRadius: '12px', boxShadow: 'var(--shadow-sm)', textAlign: 'center' }}>
            <h3 style={{ fontSize: '3rem', fontFamily: 'var(--font-heading)', color: 'var(--clr-accent)', marginBottom: '0.5rem' }}>{user.points}</h3>
            <p style={{ color: 'var(--clr-text-light)', fontWeight: 500, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Available Points</p>
          </div>

          <div className="dashboard-card" style={{ background: 'var(--clr-bg-surface)', padding: '2rem', borderRadius: '12px', boxShadow: 'var(--shadow-sm)', textAlign: 'center' }}>
            <h3 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-heading)', marginBottom: '0.5rem', color: 'var(--clr-text-main)' }}>Platinum</h3>
            <p style={{ color: 'var(--clr-text-light)', fontWeight: 500, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Current VIP Tier</p>
          </div>

        </div>

        <div className="subscription-management" style={{ background: 'var(--clr-bg-surface)', padding: '3rem', borderRadius: '12px', boxShadow: 'var(--shadow-sm)' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', marginBottom: '1.5rem' }}>Active Subscriptions</h2>
          <div style={{ padding: '1.5rem', border: '1px solid var(--clr-border)', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h4 style={{ fontSize: '1.2rem', marginBottom: '0.3rem' }}>Weekly Elegance (Mixed Bouquets)</h4>
              <p style={{ color: 'var(--clr-text-light)', fontSize: '0.9rem' }}>Next Delivery: Upcoming Friday</p>
            </div>
            <span style={{ background: '#4CAF50', color: 'white', padding: '5px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold' }}>Active</span>
          </div>
          
          <div style={{ marginTop: '2rem', textAlign: 'center' }}>
            <Link to="/category" className="btn btn-primary">Browse New Bouquets</Link>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Profile;
