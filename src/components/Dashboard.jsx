import React, { useMemo } from 'react';
import SplitTable from './SplitTable';
import { calculateBalances, generateSettlements } from '../utils/splitLogic';
import { Users, Save } from 'lucide-react';

export default function Dashboard({ members, onUpdateMember }) {

  const { total, perPerson, balances } = useMemo(() => 
    calculateBalances(members), 
  [members]);

  const settlements = useMemo(() => 
    generateSettlements(balances), 
  [balances]);

  const handlePaidChange = (index, newValue) => {
      const updated = [...members];
      updated[index] = { ...updated[index], paid: newValue };
      onUpdateMember(updated);
  };

  return (
    <div>
      {/* Summary Cards */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr', 
        gap: '1rem', 
        marginBottom: '2rem' 
      }}>
        <div style={{ 
          background: 'white', 
          borderLeft: '5px solid var(--primary)',
          padding: '1.5rem', 
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-soft)'
        }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>Total Paid</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-main)' }}>₹{total.toFixed(0)}</div>
        </div>
        <div style={{ 
          background: 'white', 
          borderLeft: '5px solid var(--text-muted)',
          padding: '1.5rem', 
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-soft)'
        }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>Per Person</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-main)' }}>₹{perPerson.toFixed(2)}</div>
        </div>
      </div>

      {/* Input Section */}
      <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Users size={20} />
              Who paid what?
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {members.map((m, i) => (
                  <div key={m.id} className="member-row">
                      <div className="member-name">
                          {m.name}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
                          <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 500 }}>Paid:</span>
                          <input 
                              type="number" 
                              min="0"
                              placeholder="0"
                              value={m.paid == 0 ? '' : m.paid}
                              onChange={(e) => handlePaidChange(i, e.target.value)}
                              style={{
                                  width: '90px', // Slightly smaller for mobile safety
                                  padding: '0.6rem',
                                  borderRadius: 'var(--radius-md)',
                                  background: 'var(--bg-soft)',
                                  textAlign: 'right',
                                  fontWeight: 700,
                                  fontSize: '1.1rem',
                                  border: '2px solid var(--border-color)'
                              }}
                          />
                      </div>
                  </div>
              ))}
          </div>
      </div>

      {/* Results Section */}
      <h3 style={{ marginBottom: '1rem', color: 'var(--text-main)' }}>Results</h3>
      
      <SplitTable 
        members={members} 
        perPerson={perPerson} 
        balances={balances} 
      />

      {/* Settlement Plan */}
      {settlements.length > 0 ? (
          <div style={{ marginBottom: '3rem' }}>
            <h3 style={{ marginBottom: '1rem', paddingLeft: '0.5rem' }}>Settlement Plan</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                {settlements.map((s, i) => (
                    <div key={i} style={{ 
                        background: 'white',
                        padding: '1rem 1.5rem',
                        borderRadius: 'var(--radius-lg)',
                        borderLeft: '4px solid var(--accent)',
                        boxShadow: 'var(--shadow-soft)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1rem' }}>
                            <span style={{ fontWeight: 700 }}>{s.from}</span>
                            <span style={{ color: 'var(--text-muted)' }}>pays</span>
                            <span style={{ fontWeight: 700 }}>{s.to}</span>
                        </div>
                        <div style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--text-main)' }}>
                            ₹{s.amount.toFixed(2)}
                        </div>
                    </div>
                ))}
            </div>
          </div>
      ) : (
          <div style={{ textAlign: 'center', margin: '2rem 0', color: 'var(--text-muted)' }}>
              Enter amounts above to see settlements.
          </div>
      )}
    </div>
  );
}
