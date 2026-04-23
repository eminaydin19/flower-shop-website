import React from 'react';
import { useTranslation } from 'react-i18next';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const Dashboard = () => {
    const { t } = useTranslation();

    const stats = [
        { label: t('admin.revenue'), val: '€12,450', change: '+12%', icon: '💰' },
        { label: t('admin.orders'), val: '148', change: '+8%', icon: '📦' },
        { label: t('admin.customers'), val: '890', change: '+5%', icon: '👥' },
        { label: 'Avg. Order', val: '€84.12', change: '-2%', icon: '📈' }
    ];

    const data = [
        { name: 'Mon', revenue: 4000 },
        { name: 'Tue', revenue: 3000 },
        { name: 'Wed', revenue: 2000 },
        { name: 'Thu', revenue: 2780 },
        { name: 'Fri', revenue: 1890 },
        { name: 'Sat', revenue: 2390 },
        { name: 'Sun', revenue: 3490 },
    ];

    return (
        <div>
            <header style={{ marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{t('admin.dashboard')}</h1>
                <p style={{ color: 'var(--clr-text-light)' }}>Welcome back, Emin. Here's what's happening today.</p>
            </header>

            <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '3rem' }}>
                {stats.map(stat => (
                    <div key={stat.label} style={{ background: 'var(--clr-bg-surface)', padding: '1.5rem', borderRadius: '16px', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--clr-border)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                            <span style={{ fontSize: '1.5rem' }}>{stat.icon}</span>
                            <span style={{ color: stat.change.startsWith('+') ? '#10b981' : '#ef4444', fontSize: '0.8rem', fontWeight: 600 }}>{stat.change}</span>
                        </div>
                        <span style={{ color: 'var(--clr-text-light)', fontSize: '0.9rem' }}>{stat.label}</span>
                        <h3 style={{ fontSize: '1.5rem', marginTop: '0.3rem' }}>{stat.val}</h3>
                    </div>
                ))}
            </div>

            <div className="charts-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
                <div style={{ background: 'var(--clr-bg-surface)', padding: '2rem', borderRadius: '20px', border: '1px solid var(--clr-border)', minHeight: '400px' }}>
                    <h4 style={{ marginBottom: '2rem' }}>Revenue Overview</h4>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} dy={10} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} dx={-10} />
                            <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }} />
                            <Line type="monotone" dataKey="revenue" stroke="var(--clr-accent)" strokeWidth={3} dot={{ r: 4, fill: 'var(--clr-accent)' }} activeDot={{ r: 6 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <div style={{ background: 'var(--clr-bg-surface)', padding: '2rem', borderRadius: '20px', border: '1px solid var(--clr-border)' }}>
                    <h4 style={{ marginBottom: '2rem' }}>Recent Orders</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {[
                            { id: '#KM-1204', name: 'Laura Palmer', total: '€120.00', status: 'Pending' },
                            { id: '#KM-1203', name: 'Dale Cooper', total: '€45.50', status: 'Shipped' },
                            { id: '#KM-1202', name: 'Audrey Horne', total: '€89.00', status: 'Delivered' }
                        ].map(order => (
                            <div key={order.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <span style={{ fontWeight: 600, display: 'block' }}>{order.name}</span>
                                    <span style={{ fontSize: '0.8rem', color: 'var(--clr-text-light)' }}>{order.id}</span>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <span style={{ fontWeight: 600, display: 'block' }}>{order.total}</span>
                                    <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--clr-accent)' }}>{order.status}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
