import React from 'react';
import { useTranslation } from 'react-i18next';

const Customers = () => {
    const { t } = useTranslation();
    
    const customers = [
        { id: 1, name: 'Laura Palmer', email: 'laura@twinpeaks.com', orders: 5, spent: '420.00 €', lastOrder: '2026-04-22' },
        { id: 2, name: 'Dale Cooper', email: 'coop@fbi.gov', orders: 12, spent: '1,250.50 €', lastOrder: '2026-04-21' },
        { id: 3, name: 'Audrey Horne', email: 'audrey@greatnorthern.com', orders: 3, spent: '289.00 €', lastOrder: '2026-04-21' },
        { id: 4, name: 'Harry Truman', email: 'harry@tpsheriff.com', orders: 8, spent: '710.00 €', lastOrder: '2026-04-20' }
    ];

    return (
        <div>
            <header style={{ marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{t('admin.customers')}</h1>
                <p style={{ color: 'var(--clr-text-light)' }}>View and manage your loyal clientele.</p>
            </header>

            <div style={{ background: 'var(--clr-bg-surface)', borderRadius: '20px', border: '1px solid var(--clr-border)', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ background: 'rgba(0,0,0,0.02)', borderBottom: '1px solid var(--clr-border)' }}>
                            <th style={{ padding: '1.5rem' }}>Customer</th>
                            <th style={{ padding: '1.5rem' }}>Email</th>
                            <th style={{ padding: '1.5rem' }}>Orders</th>
                            <th style={{ padding: '1.5rem' }}>Total Spent</th>
                            <th style={{ padding: '1.5rem' }}>Last Order</th>
                            <th style={{ padding: '1.5rem' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map(customer => (
                            <tr key={customer.id} style={{ borderBottom: '1px solid var(--clr-border)' }}>
                                <td style={{ padding: '1.5rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--clr-accent)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 600 }}>
                                            {customer.name.charAt(0)}
                                        </div>
                                        <span style={{ fontWeight: 500 }}>{customer.name}</span>
                                    </div>
                                </td>
                                <td style={{ padding: '1.5rem', color: 'var(--clr-text-light)', fontSize: '0.9rem' }}>{customer.email}</td>
                                <td style={{ padding: '1.5rem' }}>{customer.orders}</td>
                                <td style={{ padding: '1.5rem', fontWeight: 600 }}>{customer.spent}</td>
                                <td style={{ padding: '1.5rem', color: 'var(--clr-text-light)', fontSize: '0.9rem' }}>{customer.lastOrder}</td>
                                <td style={{ padding: '1.5rem' }}>
                                    <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--clr-accent)', fontWeight: 500 }}>View Profile</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Customers;
