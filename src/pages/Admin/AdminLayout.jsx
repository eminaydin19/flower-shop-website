import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const AdminLayout = () => {
    const { t } = useTranslation();
    const location = useLocation();

    const menuItems = [
        { name: t('admin.dashboard'), path: '/admin', icon: '📊' },
        { name: t('admin.products'), path: '/admin/products', icon: '🌸' },
        { name: t('admin.orders'), path: '/admin/orders', icon: '📦' },
        { name: t('admin.customers'), path: '/admin/customers', icon: '👥' }
    ];

    return (
        <div className="admin-layout" style={{ display: 'flex', minHeight: '100vh', background: 'var(--clr-bg-alt)' }}>
            <aside className="admin-sidebar" style={{ width: '280px', background: 'var(--clr-bg-surface)', borderRight: '1px solid var(--clr-border)', padding: '2rem', display: 'flex', flexDirection: 'column' }}>
                <div className="admin-logo" style={{ marginBottom: '3rem', fontWeight: 700, fontSize: '1.2rem' }}>
                    <Link to="/" style={{ color: 'var(--clr-text-main)' }}>Maják Admin</Link>
                </div>
                <nav style={{ flex: 1 }}>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        {menuItems.map(item => (
                            <li key={item.path} style={{ marginBottom: '0.5rem' }}>
                                <Link 
                                    to={item.path} 
                                    style={{ 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        gap: '12px', 
                                        padding: '12px 16px', 
                                        borderRadius: '12px', 
                                        textDecoration: 'none',
                                        color: location.pathname === item.path ? 'var(--clr-accent)' : 'var(--clr-text-light)',
                                        background: location.pathname === item.path ? 'rgba(200, 160, 120, 0.1)' : 'transparent',
                                        fontWeight: location.pathname === item.path ? 600 : 400,
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    <span>{item.icon}</span>
                                    <span>{item.name}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className="admin-footer" style={{ marginTop: 'auto', borderTop: '1px solid var(--clr-border)', paddingTop: '1.5rem' }}>
                    <Link to="/" style={{ color: 'var(--clr-text-light)', fontSize: '0.9rem' }}>← Exit Admin</Link>
                </div>
            </aside>
            <main className="admin-main" style={{ flex: 1, padding: '3rem', overflowY: 'auto' }}>
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
