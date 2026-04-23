import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulate Auth
    localStorage.setItem('majakUser', JSON.stringify({ email, memberSince: new Date().getFullYear(), points: 850 }));
    navigate('/profile');
  };

  return (
    <section className="login-section" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '120px 2rem 4rem' }}>
      <div className="login-card" style={{ background: 'var(--clr-bg-surface)', padding: '3rem', borderRadius: '12px', boxShadow: 'var(--shadow-md)', width: '100%', maxWidth: '400px', textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', marginBottom: '1rem' }}>Maják Club</h1>
        <p style={{ color: 'var(--clr-text-light)', marginBottom: '2rem' }}>Sign in to manage your subscriptions and view your VIP points.</p>
        
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <input 
            type="email" 
            placeholder="Email Address" 
            required 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="premium-input" 
            style={{ width: '100%', minHeight: '50px' }}
          />
          <input 
            type="password" 
            placeholder="Password" 
            required 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="premium-input" 
            style={{ width: '100%', minHeight: '50px' }}
          />
          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '15px' }}>
            Enter The Club
          </button>
        </form>
      </div>
    </section>
  );
};
export default Login;
