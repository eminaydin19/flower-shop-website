import React, { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { productsData } from '../data/products';
import { useTranslation } from 'react-i18next';
import { soundManager } from '../utils/soundManager';
import { CartContext } from '../context/CartContext';

const GiftQuiz = () => {
    const { t } = useTranslation();
    const { formatPrice } = useContext(CartContext);
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState({});
    const [results, setResults] = useState(null);

    const questions = [
        {
            id: 'recipient',
            question: "Who is this gift for?",
            options: [
                { label: 'Partner / Spouse', value: 'partner', icon: '❤️' },
                { label: 'Mother / Family', value: 'family', icon: '🏠' },
                { label: 'Friend / Colleague', value: 'friend', icon: '🤝' },
                { label: 'Myself', value: 'self', icon: '✨' }
            ]
        },
        {
            id: 'occasion',
            question: "What is the occasion?",
            options: [
                { label: 'Birthday', value: 'birthday', icon: '🎂' },
                { label: 'Anniversary', value: 'anniversary', icon: '💍' },
                { label: 'Thank You / Apology', value: 'gratitude', icon: '🙏' },
                { label: 'Just Because', value: 'just_because', icon: '🌸' }
            ]
        },
        {
            id: 'style',
            question: "What's their preferred style?",
            options: [
                { label: 'Classic & Timeless', value: 'classic', icon: '🏛️' },
                { label: 'Modern & Bold', value: 'modern', icon: '💥' },
                { label: 'Wild & Bohemian', value: 'boho', icon: '🌿' },
                { label: 'Soft & Romantic', value: 'romantic', icon: '☁️' }
            ]
        }
    ];

    const handleAnswer = (value) => {
        soundManager.playClick();
        const newAnswers = { ...answers, [questions[step].id]: value };
        setAnswers(newAnswers);
        
        if (step < questions.length - 1) {
            setStep(step + 1);
        } else {
            calculateResults(newAnswers);
        }
    };

    const calculateResults = (finalAnswers) => {
        // Simple logic: pick 3 products based on category mapping
        let filtered = productsData;
        
        if (finalAnswers.style === 'classic') {
            filtered = productsData.filter(p => p.category === 'Bouquet');
        } else if (finalAnswers.style === 'modern') {
            filtered = productsData.filter(p => p.category === 'Flower Box');
        } else if (finalAnswers.style === 'boho') {
            filtered = productsData.filter(p => p.category === 'Wildflower' || p.category === 'Bouquet');
        }

        setResults(filtered.slice(0, 3));
    };

    return (
        <div className="quiz-page" style={{ minHeight: '100vh', padding: '100px 0', background: 'var(--clr-bg-alt)' }}>
            <div className="container" style={{ maxWidth: '800px' }}>
                <AnimatePresence mode="wait">
                    {!results ? (
                        <motion.div 
                            key={step}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="quiz-card"
                            style={{ background: 'var(--clr-bg-surface)', padding: '4rem', borderRadius: '24px', boxShadow: 'var(--shadow-lg)', textAlign: 'center' }}
                        >
                            <span style={{ fontSize: '0.9rem', color: 'var(--clr-accent)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '2px' }}>Step {step + 1} of {questions.length}</span>
                            <h2 style={{ fontSize: '2.5rem', margin: '1.5rem 0 3rem', fontFamily: 'var(--font-heading)' }}>{questions[step].question}</h2>
                            
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                {questions[step].options.map((opt) => (
                                    <button 
                                        key={opt.value}
                                        onClick={() => handleAnswer(opt.value)}
                                        className="quiz-option-btn"
                                        style={{ 
                                            padding: '2rem', 
                                            border: '1px solid var(--clr-border)', 
                                            borderRadius: '16px', 
                                            background: 'transparent', 
                                            cursor: 'pointer',
                                            transition: 'all 0.3s ease',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            gap: '1rem'
                                        }}
                                    >
                                        <span style={{ fontSize: '2.5rem' }}>{opt.icon}</span>
                                        <span style={{ fontWeight: 500, fontSize: '1.1rem' }}>{opt.label}</span>
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div 
                            key="results"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            style={{ textAlign: 'center' }}
                        >
                            <h2 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Your Perfect Matches</h2>
                            <p style={{ color: 'var(--clr-text-light)', marginBottom: '4rem' }}>Based on your answers, these are the arrangements they'll love the most.</p>
                            
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                                {results.map((product) => (
                                    <motion.div 
                                        key={product.id}
                                        whileHover={{ y: -10 }}
                                        style={{ background: 'var(--clr-bg-surface)', borderRadius: '20px', overflow: 'hidden', boxShadow: 'var(--shadow-md)' }}
                                    >
                                        <img src={product.image} alt={product.name} style={{ width: '100%', height: '250px', objectFit: 'cover' }} />
                                        <div style={{ padding: '1.5rem' }}>
                                            <h4 style={{ margin: '0.5rem 0' }}>{product.name}</h4>
                                            <p style={{ color: 'var(--clr-accent)', fontWeight: 600, marginBottom: '1.5rem' }}>{formatPrice(product.basePrice)}</p>
                                            <Link to={`/product/${product.id}`} className="btn btn-primary" style={{ width: '100%', display: 'block' }}>View Details</Link>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                            
                            <button 
                                onClick={() => { setStep(0); setResults(null); setAnswers({}); }}
                                style={{ marginTop: '4rem', background: 'none', border: 'none', color: 'var(--clr-text-light)', cursor: 'pointer', textDecoration: 'underline' }}
                            >
                                Restart Quiz
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                .quiz-option-btn:hover {
                    border-color: var(--clr-accent) !important;
                    background: rgba(200, 160, 120, 0.05) !important;
                    transform: translateY(-5px);
                }
            `}} />
        </div>
    );
};

export default GiftQuiz;
