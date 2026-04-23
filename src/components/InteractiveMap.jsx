import React from 'react';
import { motion } from 'framer-motion';

const InteractiveMap = () => {
    const locations = [
        { id: 1, name: 'Holland Tulip Fields', country: 'Netherlands', x: '45%', y: '40%', details: 'Our primary source for vibrant, prize-winning tulips.' },
        { id: 2, name: 'Tuscany Flower Farms', country: 'Italy', x: '52%', y: '75%', details: 'Where our rustic sunflowers and lilies soak in the Mediterranean sun.' },
        { id: 3, name: 'Bohemian Rose Gardens', country: 'Czech Rep.', x: '60%', y: '50%', details: 'Local, hand-picked roses from our very own backyard.' }
    ];

    return (
        <section className="map-section" style={{ padding: '8rem 0', background: 'var(--clr-bg-alt)', overflow: 'hidden' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '3rem', fontFamily: 'var(--font-heading)' }}>Farm-to-Vase Explorer</h2>
                    <p style={{ color: 'var(--clr-text-light)', maxWidth: '600px', margin: '1rem auto' }}>
                        Trace the origins of your bouquet. We source from only the most sustainable and prestigious flower farms across Europe.
                    </p>
                </div>

                <div className="map-container" style={{ position: 'relative', width: '100%', maxWidth: '900px', margin: '0 auto', aspectRatio: '16/9', background: 'rgba(0,0,0,0.05)', borderRadius: '24px', border: '1px solid var(--clr-border)' }}>
                    {/* Abstract SVG Map of Europe Placeholder */}
                    <svg viewBox="0 0 1000 600" style={{ width: '100%', height: '100%', opacity: 0.3 }}>
                         <path d="M200,100 Q300,50 400,100 T600,150 T800,100 T900,300 T700,500 T400,550 T100,400 Z" fill="none" stroke="var(--clr-text-main)" strokeWidth="1" />
                    </svg>

                    {locations.map((loc) => (
                        <motion.div 
                            key={loc.id}
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            whileHover={{ scale: 1.2 }}
                            style={{ 
                                position: 'absolute', 
                                left: loc.x, 
                                top: loc.y, 
                                width: '20px', 
                                height: '20px', 
                                background: 'var(--clr-accent)', 
                                borderRadius: '50%', 
                                cursor: 'pointer',
                                boxShadow: '0 0 15px var(--clr-accent)'
                            }}
                        >
                            <div className="map-tooltip" style={{ 
                                position: 'absolute', 
                                bottom: '150%', 
                                left: '50%', 
                                transform: 'translateX(-50%)', 
                                background: 'var(--clr-bg-surface)', 
                                padding: '1.5rem', 
                                borderRadius: '12px', 
                                width: '220px',
                                pointerEvents: 'none',
                                boxShadow: 'var(--shadow-md)',
                                border: '1px solid var(--clr-border)',
                                zIndex: 10
                            }}>
                                <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--clr-accent)', fontWeight: 600 }}>{loc.country}</span>
                                <h4 style={{ margin: '0.3rem 0', fontFamily: 'var(--font-heading)' }}>{loc.name}</h4>
                                <p style={{ fontSize: '0.8rem', color: 'var(--clr-text-light)', lineHeight: 1.4 }}>{loc.details}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                .map-tooltip { opacity: 0; transition: opacity 0.3s; pointer-events: none; }
                .map-container div:hover .map-tooltip { opacity: 1; }
            `}} />
        </section>
    );
};

export default InteractiveMap;
