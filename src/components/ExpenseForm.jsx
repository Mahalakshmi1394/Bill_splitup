import React, { useState } from 'react';
import { Plus } from 'lucide-react';

export default function ExpenseForm({ participants, onAdd }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [payer, setPayer] = useState(participants[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description || !amount) return;

    onAdd({
      id: Date.now(),
      description,
      amount: parseFloat(amount),
      payer,
      date: new Date().toISOString()
    });

    setDescription("");
    setAmount("");
    setPayer(participants[0]);
  };

  return (
    <form onSubmit={handleSubmit} style={{
      background: 'white',
      padding: '1.5rem',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-soft)',
      marginBottom: '2rem'
    }}>
      <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem', color: 'var(--primary)' }}>Add Expense 💸</h3>
      
      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="What for? (e.g. Brunch)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          style={{
            width: '100%',
            padding: '0.8rem',
            borderRadius: 'var(--radius-md)',
            background: 'var(--bg-soft)',
            marginBottom: '0.8rem'
          }}
        />
        
        <div style={{ display: 'flex', gap: '0.8rem' }}>
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            min="0"
            step="0.01"
            style={{
              flex: 1,
              padding: '0.8rem',
              borderRadius: 'var(--radius-md)',
              background: 'var(--bg-soft)',
            }}
          />
          
          <select 
            value={payer} 
            onChange={(e) => setPayer(e.target.value)}
            style={{
              flex: 1,
              padding: '0.8rem',
              borderRadius: 'var(--radius-md)',
              background: 'var(--bg-soft)',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            {participants.map(p => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>
      </div>

      <button type="submit" style={{
        width: '100%',
        padding: '0.8rem',
        background: 'var(--secondary)',
        color: 'white',
        fontWeight: 600,
        borderRadius: 'var(--radius-btn)'
      }}>
        Add to List via {payer}
      </button>
    </form>
  );
}
