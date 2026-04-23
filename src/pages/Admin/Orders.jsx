import React from 'react';
import { useTranslation } from 'react-i18next';

const Orders = () => {
    const { t } = useTranslation();
    
    const orders = [
        { id: '#KM-1204', customer: 'Laura Palmer', date: '2026-04-22', total: '120.00 €', status: 'Pending', items: 3 },
        { id: '#KM-1203', customer: 'Dale Cooper', date: '2026-04-21', total: '45.50 €', status: 'Shipped', items: 1 },
        { id: '#KM-1202', customer: 'Audrey Horne', date: '2026-04-21', total: '89.00 €', status: 'Delivered', items: 2 },
        { id: '#KM-1201', customer: 'Harry Truman', date: '2026-04-20', total: '210.00 €', status: 'Delivered', items: 5 }
    ];

    const getStatusColor = (status) => {
        switch(status) {
            case 'Pending': return '#f59e0b';
            case 'Shipped': return '#3b82f6';
            case 'Delivered': return '#10b981';
            default: return 'var(--clr-text-light)';
        }
    };

    return (
        <div>
            <header style={{ marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{t('admin.orders')}</h1>
                <p style={{ color: 'var(--clr-text-light)' }}>Track and manage your customer orders.</p>
            </header>

            <div style={{ background: 'var(--clr-bg-surface)', borderRadius: '20px', border: '1px solid var(--clr-border)', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ background: 'rgba(0,0,0,0.02)', borderBottom: '1px solid var(--clr-border)' }}>
                            <th style={{ padding: '1.5rem' }}>Order ID</th>
                            <th style={{ padding: '1.5rem' }}>Customer</th>
                            <th style={{ padding: '1.5rem' }}>Date</th>
                            <th style={{ padding: '1.5rem' }}>Items</th>
                            <th style={{ padding: '1.5rem' }}>Total</th>
                            <th style={{ padding: '1.5rem' }}>Status</th>
                            <th style={{ padding: '1.5rem' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order.id} style={{ borderBottom: '1px solid var(--clr-border)' }}>
                                <td style={{ padding: '1.5rem', fontWeight: 600 }}>{order.id}</td>
                                <td style={{ padding: '1.5rem' }}>{order.customer}</td>
                                <td style={{ padding: '1.5rem', color: 'var(--clr-text-light)', fontSize: '0.9rem' }}>{order.date}</td>
                                <td style={{ padding: '1.5rem' }}>{order.items}</td>
                                <td style={{ padding: '1.5rem', fontWeight: 600 }}>{order.total}</td>
                                <td style={{ padding: '1.5rem' }}>
                                    <span style={{ 
                                        padding: '4px 12px', 
                                        borderRadius: '20px', 
                                        background: `${getStatusColor(order.status)}20`, 
                                        color: getStatusColor(order.status), 
                                        fontSize: '0.8rem',
                                        fontWeight: 600
                                    }}>
                                        {order.status}
                                    </span>
                                </td>
                                <td style={{ padding: '1.5rem' }}>
                                    <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--clr-accent)', fontWeight: 500 }}>Details</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Orders;
