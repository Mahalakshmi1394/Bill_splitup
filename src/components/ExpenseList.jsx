import React from 'react';
import { Trash2 } from 'lucide-react';

export default function ExpenseList({ expenses, onDelete }) {
  if (expenses.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
        No expenses yet! Go spend some money! 🛍️
      </div>
    );
  }

  return (
    <div style={{ marginBottom: '2rem' }}>
      <h3 style={{ marginBottom: '1rem', fontSize: '1.2rem', color: 'var(--text-main)' }}>History</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
        {expenses.map((expense) => (
          <div key={expense.id} style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'white',
            padding: '1rem',
            borderRadius: 'var(--radius-md)',
            boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
          }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: '1rem' }}>{expense.description}</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                <span style={{ color: 'var(--primary)', fontWeight: 600 }}>{expense.payer}</span> paid
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>
                ₹{Number(expense.amount).toFixed(2)}
              </span>
              <button 
                onClick={() => onDelete(expense.id)}
                style={{ color: '#ffb7b2', opacity: 0.6 }}
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
