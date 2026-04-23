import React from 'react';

const mockReviews = [
  {
    id: 1,
    name: 'Jan K.',
    date: '2 Days Ago',
    rating: 5,
    title: 'Exceeded all expectations',
    text: 'I ordered the Red Elegance box for my wife\'s 10th anniversary. Seeing her reaction when the courier arrived was priceless. The roses are incredibly fresh and the velvet box is a true hallmark of luxury. Will order again.'
  },
  {
    id: 2,
    name: 'Sarah M.',
    date: '1 Week Ago',
    rating: 5,
    title: 'Flawless aesthetic',
    text: 'The easiest 5 stars I\'ve ever given. As an interior designer, I\'m incredibly picky about aesthetics. Květiny Maják totally nailed the presentation. The packaging, the personalized note, everything felt highly premium.'
  },
  {
    id: 3,
    name: 'Petr D.',
    date: '2 Weeks Ago',
    rating: 5,
    title: 'Lifesaving fast delivery',
    text: 'Forgot a birthday and placed an order at 11 AM. It was delivered perfectly by 2 PM the same day. Extremely professional service and the flowers were stunning.'
  }
];

const Reviews = () => {
  return (
    <section className="reviews-section" style={{ marginTop: '4rem', paddingTop: '4rem', borderTop: '1px solid var(--clr-border)' }}>
      <div className="section-header" style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-heading)', marginBottom: '0.5rem' }}>The Maják Experience</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '5px', color: '#D4A3A3', marginBottom: '0.5rem' }}>
          {'★★★★★'.split('').map((star, i) => <span key={i} style={{ fontSize: '1.2rem' }}>{star}</span>)}
        </div>
        <p style={{ color: 'var(--clr-text-light)' }}>Based on 1,450+ verified reviews</p>
      </div>

      <div className="reviews-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        {mockReviews.map((review) => (
          <div className="review-card" key={review.id} style={{ background: 'var(--clr-bg-alt)', padding: '2rem', borderRadius: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <div style={{ color: '#D4A3A3', letterSpacing: '2px', fontSize: '1.1rem' }}>★★★★★</div>
              <span style={{ fontSize: '0.8rem', color: 'var(--clr-text-light)' }}>{review.date}</span>
            </div>
            <h4 style={{ marginBottom: '0.5rem', fontSize: '1.1rem', fontFamily: 'var(--font-heading)' }}>"{review.title}"</h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--clr-text-light)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              {review.text}
            </p>
            <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>— {review.name} <span style={{ color: '#4CAF50', fontWeight: 'normal', fontSize: '0.8rem', marginLeft: '5px' }}>✓ Verified Buyer</span></div>
          </div>
        ))}
      </div>
    </section>
  );
};
export default Reviews;
