import React from 'react';
import ProductCard from '../components/ProductCard';
import { productsData } from '../data/products';

import { useTranslation } from 'react-i18next';

const Category = () => {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = React.useState('All');
  const filters = ['All', 'Anniversary', 'Birthday', 'Sympathy', 'Just Because'];

  return (
    <>
      <div className="category-hero" style={{ padding: 'calc(80px + var(--spacing-md)) 0 var(--spacing-md)', textAlign: 'center', backgroundColor: 'var(--clr-bg-alt)', marginBottom: 'var(--spacing-md)' }}>
          <div className="container">
              <h1 className="category-title" style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>{t('header.collections')}</h1>
              <p className="category-desc" style={{ color: 'var(--clr-text-light)' }}>{t('home.collections_subtitle')}</p>
          </div>
      </div>

      <div className="container" style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <div style={{ display: 'inline-flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center' }}>
          {filters.map(f => (
            <button 
              key={f}
              onClick={() => setActiveFilter(f)}
              style={{
                background: activeFilter === f ? 'var(--clr-text-main)' : 'transparent',
                color: activeFilter === f ? '#fff' : 'var(--clr-text-main)',
                border: '1px solid var(--clr-text-main)',
                padding: '8px 20px',
                borderRadius: '30px',
                cursor: 'pointer',
                fontFamily: 'var(--font-body)',
                transition: '0.2s',
                fontSize: '0.9rem'
              }}>
              {f}
            </button>
          ))}
        </div>
      </div>

      <section className="products" style={{ paddingTop: 0 }}>
          <div className="container">
              <div className="product-grid">
                  {productsData
                     .filter(p => activeFilter === 'All' || p.occasions.includes(activeFilter))
                     .map(product => (
                      <ProductCard key={product.id} id={product.id} name={product.name} category={product.category} price={product.basePrice} image={product.image} />
                  ))}
              </div>
          </div>
      </section>
    </>
  );
};
export default Category;
