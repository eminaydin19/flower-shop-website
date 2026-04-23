import React, { useRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const ProductCard = ({ id, name, category, price, image }) => {
  const { formatPrice } = useContext(CartContext);
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    cardRef.current.style.transition = 'transform 0.5s ease-out';
  };

  const handleMouseEnter = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transition = 'none';
  };

  return (
    <div 
      className="product-card"
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
    >
      <Link to={`/product/${id}`}>
        <div className="product-img-wrap" style={{ transform: 'translateZ(30px)' }}>
          <img src={image} alt={name} className="product-img" />
          <div className="product-overlay">
            <button className="btn btn-outline" onClick={(e) => { e.preventDefault(); window.location.href = `/product/${id}` }}>
              Options
            </button>
          </div>
        </div>
      </Link>
      <div className="product-info" style={{ transform: 'translateZ(20px)' }}>
        <span className="product-category">{category}</span>
        <h3 className="product-name"><Link to={`/product/${id}`}>{name}</Link></h3>
        <p className="product-price">{formatPrice(price)}</p>
      </div>
    </div>
  );
};
export default ProductCard;
