import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import FlowerCareModal from '../components/FlowerCareModal';
import Reviews from '../components/Reviews';
import { productsData } from '../data/products';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { soundManager } from '../utils/soundManager';
import { Calendar, Truck, Store, ShieldCheck, Flower2, Gift } from 'lucide-react';

const ProductDetail = () => {
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const product = productsData.find(p => p.id == id) || productsData[0];
  const { addToCart, formatPrice } = useContext(CartContext);

  const [qty, setQty] = useState(1);
  const [multiplier, setMultiplier] = useState(1);
  const isBox = product.category === 'Flower Box';
  
  // Refined size options to match competitor aesthetic
  const sizeOptions = isBox 
    ? [ { label: 'Standard', val: 1 }, { label: 'Premium', val: 1.4 }, { label: 'Deluxe', val: 1.8 } ]
    : [ { label: '9 ks', val: 1 }, { label: '15 ks', val: 1.5 }, { label: '25 ks', val: 2.2 }, { label: '49 ks', val: 3.5 } ];
    
  const [sizeLabel, setSizeLabel] = useState(sizeOptions[0].label);
  const [deliveryType, setDeliveryType] = useState('rozvoz'); // rozvoz or vyzvednuti
  const [date, setDate] = useState('');
  const [message, setMessage] = useState('');
  
  // Specific Add-ons like Fleur 21
  const [addons, setAddons] = useState({
    paperBag: false,
    lindt: false,
    merci: false,
    prosecco: false
  });

  const addonPrices = {
    paperBag: 2,
    lindt: 12,
    merci: 8,
    prosecco: 15
  };

  const productImages = [
    product.image,
    product.category === 'Flower Box' ? '/assets/product_box.png' : '/assets/product_red_roses.png',
    '/assets/product_peonies.png'
  ];
  const [activeImage, setActiveImage] = useState(productImages[0]);

  const baseVariantPrice = product.basePrice * multiplier;
  let extraCost = 0;
  if (addons.paperBag) extraCost += addonPrices.paperBag;
  if (addons.lindt) extraCost += addonPrices.lindt;
  if (addons.merci) extraCost += addonPrices.merci;
  if (addons.prosecco) extraCost += addonPrices.prosecco;

  const unitPrice = baseVariantPrice + extraCost;
  const totalPrice = (unitPrice * qty).toFixed(2);

  const handleAddToCart = () => {
    const activeAddons = [];
    if (addons.paperBag) activeAddons.push({ name: 'Premium Paper Bag', price: addonPrices.paperBag });
    if (addons.lindt) activeAddons.push({ name: 'Lindt Lindor 200g', price: addonPrices.lindt });
    if (addons.merci) activeAddons.push({ name: 'Storck Merci 250g', price: addonPrices.merci });
    if (addons.prosecco) activeAddons.push({ name: 'Mionetto Prosecco 0.75L', price: addonPrices.prosecco });

    const cartItem = {
      cartId: `${product.name}-${sizeLabel}-${Date.now()}`,
      name: product.name,
      image: product.image,
      sizeLabel,
      qty,
      price: unitPrice,
      addons: activeAddons,
      giftsMessage: message,
      deliveryDate: date,
      deliveryType
    };
    
    addToCart(cartItem);
    soundManager.playClick();
    // Maybe show a success toast or open drawer
  };

  return (
    <>
    <section className="product-detail-section" style={{ padding: 'calc(100px + var(--spacing-lg)) 0 var(--spacing-lg)', background: '#fff' }}>
        <div className="container product-detail-grid" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '5rem', alignItems: 'start' }}>
            
            {/* Left: Gallery */}
            <div className="product-gallery-view">
              <div style={{ position: 'sticky', top: '120px' }}>
                <div className="product-media" style={{ borderRadius: '0', overflow: 'hidden', marginBottom: '1.5rem' }}>
                    <img src={activeImage} alt={product.name} style={{ width: '100%', aspectRatio: '4/5', objectFit: 'cover' }} />
                </div>
                <div className="product-thumbnails" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                    {productImages.map((img, i) => (
                      <div 
                        key={i} 
                        onClick={() => setActiveImage(img)}
                        style={{ cursor: 'pointer', border: activeImage === img ? '1px solid #000' : '1px solid transparent', padding: '2px' }}
                      >
                        <img src={img} alt={`Thumbnail ${i}`} style={{ width: '100%', height: '120px', objectFit: 'cover' }} />
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* Right: Info & Config */}
            <div className="product-info-detail">
                <nav style={{ fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '2rem', color: '#888', display: 'flex', gap: '10px' }}>
                  <span>Home</span> / <span>{product.category}</span> / <span style={{ color: '#000' }}>{product.name}</span>
                </nav>

                <h1 style={{ fontSize: '3.5rem', fontWeight: 400, fontFamily: 'var(--font-heading)', marginBottom: '1rem' }}>{product.name}</h1>
                
                <div className="price-display" style={{ fontSize: '1.8rem', color: '#000', marginBottom: '2rem' }}>
                    {formatPrice(parseFloat(totalPrice))}
                </div>

                <div style={{ padding: '2rem 0', borderTop: '1px solid #eee' }}>
                  <p style={{ color: '#555', lineHeight: 1.8, marginBottom: '2rem', fontSize: '1rem' }}>
                    {product.description}
                  </p>

                  {/* Size Selection */}
                  <div className="option-group" style={{ marginBottom: '2.5rem' }}>
                      <label style={{ display: 'block', fontSize: '0.8rem', textTransform: 'uppercase', fontWeight: 600, marginBottom: '1rem', letterSpacing: '1px' }}>
                        {i18n.language === 'en' ? 'Select Size' : 'Velikost'}
                      </label>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem' }}>
                          {sizeOptions.map(size => (
                              <button
                                key={size.label}
                                onClick={() => { setMultiplier(size.val); setSizeLabel(size.label); }}
                                style={{ 
                                  padding: '12px', 
                                  border: '1px solid #000', 
                                  background: multiplier === size.val ? '#000' : '#fff', 
                                  color: multiplier === size.val ? '#fff' : '#000',
                                  fontSize: '0.9rem',
                                  cursor: 'pointer',
                                  transition: '0.2s'
                                }}
                              >
                                  {size.label}
                              </button>
                          ))}
                      </div>
                  </div>

                  {/* Delivery Type Toggle */}
                  <div className="option-group" style={{ marginBottom: '2.5rem' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <button 
                          onClick={() => setDeliveryType('rozvoz')}
                          style={{ 
                            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', padding: '1.5rem', 
                            border: '1px solid #eee', background: deliveryType === 'rozvoz' ? '#f9f9f9' : '#fff',
                            cursor: 'pointer', borderBottom: deliveryType === 'rozvoz' ? '2px solid #000' : '1px solid #eee'
                          }}>
                          <Truck size={20} />
                          <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>{i18n.language === 'en' ? 'Delivery' : 'Rozvoz'}</span>
                        </button>
                        <button 
                          onClick={() => setDeliveryType('vyzvednuti')}
                          style={{ 
                            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', padding: '1.5rem', 
                            border: '1px solid #eee', background: deliveryType === 'vyzvednuti' ? '#f9f9f9' : '#fff',
                            cursor: 'pointer', borderBottom: deliveryType === 'vyzvednuti' ? '2px solid #000' : '1px solid #eee'
                          }}>
                          <Store size={20} />
                          <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>{i18n.language === 'en' ? 'Store Pickup' : 'Vyzvednutí'}</span>
                        </button>
                      </div>
                  </div>

                  {/* Date Picker */}
                  <div className="option-group" style={{ marginBottom: '2.5rem' }}>
                      <label style={{ display: 'block', fontSize: '0.8rem', textTransform: 'uppercase', fontWeight: 600, marginBottom: '1rem', letterSpacing: '1px' }}>
                        {i18n.language === 'en' ? 'Select Date' : 'Vyberte den'}
                      </label>
                      <div style={{ position: 'relative' }}>
                        <Calendar style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }} size={18} />
                        <input 
                          type="date" 
                          value={date} 
                          onChange={e => setDate(e.target.value)}
                          style={{ width: '100%', padding: '15px 15px 15px 45px', border: '1px solid #eee', outline: 'none' }} 
                        />
                      </div>
                  </div>

                  {/* Add-ons (Accessories) */}
                  <div className="option-group" style={{ marginBottom: '2.5rem', background: '#fcfcfc', padding: '2rem', border: '1px solid #f5f5f5' }}>
                      <label style={{ display: 'block', fontSize: '0.8rem', textTransform: 'uppercase', fontWeight: 600, marginBottom: '1.5rem', letterSpacing: '1px' }}>
                        {i18n.language === 'en' ? 'Complete your gift' : 'Doplňkové zboží'}
                      </label>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {[
                          { key: 'paperBag', label: i18n.language === 'en' ? 'Premium Paper Bag' : 'Papírová taška na květiny', price: addonPrices.paperBag },
                          { key: 'lindt', label: 'Lindt Lindor 200g', price: addonPrices.lindt },
                          { key: 'merci', label: 'Storck Merci 250g', price: addonPrices.merci },
                          { key: 'prosecco', label: 'Mionetto Prosecco 0.75L', price: addonPrices.prosecco },
                        ].map(item => (
                          <div key={item.key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '1rem', borderBottom: '1px solid #eee' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                              <input 
                                type="checkbox" 
                                checked={addons[item.key]} 
                                onChange={e => setAddons({...addons, [item.key]: e.target.checked})}
                                style={{ width: '20px', height: '20px', accentColor: '#000' }} 
                              />
                              <span style={{ fontSize: '0.95rem' }}>{item.label}</span>
                            </label>
                            <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{formatPrice(item.price)}</span>
                          </div>
                        ))}
                      </div>
                  </div>

                  {/* Gift Message */}
                  <div className="option-group" style={{ marginBottom: '3rem' }}>
                      <label style={{ display: 'block', fontSize: '0.8rem', textTransform: 'uppercase', fontWeight: 600, marginBottom: '1rem', letterSpacing: '1px' }}>
                        {i18n.language === 'en' ? 'Gift Message' : 'Vzkaz ke květinám'}
                      </label>
                      <textarea 
                        placeholder={i18n.language === 'en' ? 'Type your message here...' : 'Zde napište svůj vzkaz...'}
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                        style={{ width: '100%', padding: '1.5rem', border: '1px solid #eee', minHeight: '120px', outline: 'none', resize: 'none' }}
                      />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #000' }}>
                        <button onClick={() => setQty(Math.max(1, qty - 1))} style={{ flex: 1, height: '100%', background: 'none', border: 'none', cursor: 'pointer' }}>-</button>
                        <span style={{ flex: 1, textAlign: 'center' }}>{qty}</span>
                        <button onClick={() => setQty(qty + 1)} style={{ flex: 1, height: '100%', background: 'none', border: 'none', cursor: 'pointer' }}>+</button>
                    </div>
                    <button 
                      className="btn-atc" 
                      onClick={handleAddToCart}
                      style={{ 
                        background: '#000', color: '#fff', border: 'none', padding: '1.5rem', 
                        textTransform: 'uppercase', fontWeight: 600, letterSpacing: '2px', cursor: 'pointer' 
                      }}>
                      {i18n.language === 'en' ? 'Add to Cart' : 'Přidat do košíku'}
                    </button>
                  </div>

                  <div style={{ display: 'flex', gap: '2rem', marginTop: '3rem', opacity: 0.7, fontSize: '0.8rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <ShieldCheck size={16} /> Secure Payment
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Flower2 size={16} /> Fresh Daily
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Gift size={16} /> Gift Wrapping
                    </div>
                  </div>

                </div>
            </div>
        </div>

        <div className="container" style={{ marginTop: '8rem' }}>
          <Reviews />
        </div>
    </section>
    </>
  );
};
export default ProductDetail;
