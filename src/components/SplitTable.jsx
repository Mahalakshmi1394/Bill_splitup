import React from 'react';
import { TrendingUp, TrendingDown, CheckCircle } from 'lucide-react';

export default function SplitTable({ members, perPerson, balances }) {
  return (
    <div style={{ 
      background: 'white', 
      borderRadius: 'var(--radius-xl)', 
      boxShadow: 'var(--shadow-soft)',
      overflow: 'hidden',
      marginBottom: '2rem'
    }}>
       <div style={{ 
           padding: '1rem 1.5rem', 
           borderBottom: '1px solid var(--bg-soft)',
           display: 'flex', justifyContent: 'space-between', alignItems: 'center'
       }}>
           <h3 style={{ fontSize: '1.1rem' }}>Split Details</h3>
           <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Each pays ₹{perPerson.toFixed(2)}</span>
       </div>
       
       <div style={{ overflowX: 'auto' }}>
          <table className="split-table">
              <thead>
                  <tr>
                      <th style={{ paddingLeft: '1.5rem' }}>Member</th>
                      <th>Paid</th>
                      <th style={{ paddingRight: '1.5rem', textAlign: 'right' }}>Result</th>
                  </tr>
              </thead>
              <tbody>
                  {members.map(m => {
                      const balance = balances[m.name] || 0;
                      const isPositive = balance > 0.01;
                      const isNegative = balance < -0.01;
                      
                      return (
                          <tr key={m.id}>
                              <td style={{ paddingLeft: '1.5rem', fontWeight: 600, color: 'var(--text-main)' }}>{m.name}</td>
                              <td style={{ fontWeight: 500 }}>₹{Number(m.paid).toFixed(2)}</td>
                              <td style={{ paddingRight: '1.5rem', textAlign: 'right' }}>
                                  {isPositive && (
                                      <span style={{ color: 'var(--accent)', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                          Get ₹{balance.toFixed(2)} <TrendingUp size={16} />
                                      </span>
                                  )}
                                  {isNegative && (
                                      <span style={{ color: 'var(--danger)', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                          Pay ₹{Math.abs(balance).toFixed(2)} <TrendingDown size={16} />
                                      </span>
                                  )}
                                  {!isPositive && !isNegative && (
                                      <span style={{ color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                          Settled <CheckCircle size={14} />
                                      </span>
                                  )}
                              </td>
                          </tr>
                      );
                  })}
              </tbody>
          </table>
       </div>
    </div>
  );
}
