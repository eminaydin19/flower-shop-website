import React, { useState, useContext } from 'react';
import { productsData } from '../../data/products';
import { useTranslation } from 'react-i18next';
import { CartContext } from '../../context/CartContext';
import { X } from 'lucide-react';

const Products = () => {
    const { t } = useTranslation();
    const { formatPrice } = useContext(CartContext);
    const [products, setProducts] = useState(productsData);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const [newProduct, setNewProduct] = useState({
        name: '',
        category: 'Bouquet',
        basePrice: '',
        image: '/assets/product_lilies.png',
        description: ''
    });

    const deleteProduct = (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            setProducts(products.filter(p => p.id !== id));
        }
    };

    const handleAddProduct = (e) => {
        e.preventDefault();
        const productToAdd = {
            ...newProduct,
            id: Date.now(),
            basePrice: parseFloat(newProduct.basePrice),
            occasions: ['Birthday', 'Just Because']
        };
        setProducts([productToAdd, ...products]);
        setIsModalOpen(false);
        setNewProduct({ name: '', category: 'Bouquet', basePrice: '', image: '/assets/product_lilies.png', description: '' });
    };

    return (
        <div>
            <header style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{t('admin.products')}</h1>
                    <p style={{ color: 'var(--clr-text-light)' }}>Manage your luxury flower catalog.</p>
                </div>
                <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>+ Add New Product</button>
            </header>

            <div style={{ background: 'var(--clr-bg-surface)', borderRadius: '20px', border: '1px solid var(--clr-border)', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ background: 'rgba(0,0,0,0.02)', borderBottom: '1px solid var(--clr-border)' }}>
                            <th style={{ padding: '1.5rem' }}>Product</th>
                            <th style={{ padding: '1.5rem' }}>Category</th>
                            <th style={{ padding: '1.5rem' }}>Price</th>
                            <th style={{ padding: '1.5rem' }}>Stock</th>
                            <th style={{ padding: '1.5rem' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product.id} style={{ borderBottom: '1px solid var(--clr-border)' }}>
                                <td style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <img src={product.image} alt="" style={{ width: '50px', height: '50px', borderRadius: '8px', objectFit: 'cover' }} />
                                    <span style={{ fontWeight: 500 }}>{product.name}</span>
                                </td>
                                <td style={{ padding: '1.5rem', color: 'var(--clr-text-light)' }}>{product.category}</td>
                                <td style={{ padding: '1.5rem', fontWeight: 600 }}>{formatPrice(product.basePrice)}</td>
                                <td style={{ padding: '1.5rem' }}>
                                    <span style={{ padding: '4px 10px', borderRadius: '20px', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', fontSize: '0.8rem' }}>In Stock</span>
                                </td>
                                <td style={{ padding: '1.5rem' }}>
                                    <button style={{ background: 'none', border: 'none', marginRight: '1rem', cursor: 'pointer', color: 'var(--clr-accent)' }}>Edit</button>
                                    <button onClick={() => deleteProduct(product.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444' }}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Add Product Modal */}
            {isModalOpen && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000, padding: '2rem' }}>
                    <div style={{ background: '#fff', width: '100%', maxWidth: '500px', borderRadius: '24px', padding: '2.5rem', position: 'relative', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)' }}>
                        <button onClick={() => setIsModalOpen(false)} style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', cursor: 'pointer' }}><X /></button>
                        <h2 style={{ marginBottom: '2rem', fontFamily: 'var(--font-heading)' }}>Add New Product</h2>
                        <form onSubmit={handleAddProduct}>
                            <div style={{ marginBottom: '1.2rem' }}>
                                <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.5rem', fontWeight: 600 }}>Product Name</label>
                                <input type="text" required value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--clr-border)' }} />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.2rem' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.5rem', fontWeight: 600 }}>Category</label>
                                    <select value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value})} style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--clr-border)' }}>
                                        <option>Bouquet</option>
                                        <option>Flower Box</option>
                                        <option>Premium</option>
                                    </select>
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.5rem', fontWeight: 600 }}>Base Price (€)</label>
                                    <input type="number" required value={newProduct.basePrice} onChange={e => setNewProduct({...newProduct, basePrice: e.target.value})} style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--clr-border)' }} />
                                </div>
                            </div>
                            <div style={{ marginBottom: '1.2rem' }}>
                                <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.5rem', fontWeight: 600 }}>Description</label>
                                <textarea required value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})} style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--clr-border)', minHeight: '80px' }}></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>Create Product</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Products;
