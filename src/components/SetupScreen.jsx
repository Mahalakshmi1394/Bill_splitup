import React, { useState } from 'react';
import { Plus, X, Users } from 'lucide-react';

export default function SetupScreen({ onComplete }) {
  const [outingName, setOutingName] = useState("");
  const [participants, setParticipants] = useState(["", ""]);
  const [memberCount, setMemberCount] = useState(2);

  const handleCountChange = (e) => {
    const count = parseInt(e.target.value) || 0;
    setMemberCount(count);
    // Resize participants array
    const newP = [...participants];
    if (count > newP.length) {
        for(let i = newP.length; i < count; i++) {
            newP.push("");
        }
    } else {
        newP.length = count;
    }
    setParticipants(newP);
  };

  const updateParticipant = (index, value) => {
    const newP = [...participants];
    newP[index] = value;
    setParticipants(newP);
  };

  const handleStart = () => {
    // Map empty names to defaults, keep user entered names as is
    let activeParticipants = participants.map((p, i) => {
        const name = p.trim();
        return name.length > 0 ? name : `Member ${i + 1}`;
    });
    
    // Ensure unique names
    const seen = new Set();
    activeParticipants = activeParticipants.map(name => {
        let uniqueName = name;
        let counter = 2;
        while(seen.has(uniqueName)) {
            uniqueName = `${name} ${counter}`;
            counter++;
        }
        seen.add(uniqueName);
        return uniqueName;
    });

    if (!outingName.trim()) {
       setOutingName("Outing"); // Default name if empty
    }

    if (activeParticipants.length < 2) {
      alert("Need at least 2 members!");
      return;
    }
    
    onComplete(outingName || "Outing", activeParticipants);
  };

  return (
    <div style={{
      background: 'white',
      padding: '2.5rem',
      borderRadius: 'var(--radius-xl)',
      boxShadow: 'var(--shadow-soft)'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <div style={{ 
            width: '60px', height: '60px', 
            background: 'var(--secondary)', 
            borderRadius: '50%', 
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 1rem auto',
            color: 'var(--primary)'
        }}>
            <Users size={28} />
        </div>
        <h2 style={{ fontSize: '1.8rem', marginBottom: '0.5rem', color: 'var(--primary-dark)' }}>
          Split Bill
        </h2>
        <p style={{ color: 'var(--text-muted)' }}>
          Enter details to split equally.
        </p>
      </div>
      
      <div style={{ marginBottom: '2rem' }}>
        <label style={{ display: 'block', marginBottom: '0.8rem', fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          TITLE (OPTIONAL)
        </label>
        <input
          type="text"
          placeholder="e.g. Lunch, Trip, etc."
          value={outingName}
          onChange={(e) => setOutingName(e.target.value)}
          style={{
            width: '100%',
            padding: '1rem',
            borderRadius: 'var(--radius-lg)',
            background: 'var(--bg-soft)',
            fontSize: '1rem',
            border: '2px solid transparent'
          }}
        />
      </div>

      <div style={{ marginBottom: '2rem' }}>
         <label style={{ display: 'block', marginBottom: '0.8rem', fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          HOW MANY PEOPLE?
        </label>
        <input 
            type="number"
            min="2"
            max="50"
            value={memberCount}
            onChange={handleCountChange}
            style={{
                width: '100%',
                padding: '1rem',
                borderRadius: 'var(--radius-lg)',
                background: 'var(--bg-soft)',
                fontSize: '1.2rem',
                fontWeight: 700,
                color: 'var(--primary)'
            }}
        />
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <label style={{ display: 'block', marginBottom: '0.8rem', fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          MEMBER NAMES
        </label>
        <div className="member-grid">
            {participants.map((p, i) => (
            <input
                key={i}
                type="text"
                placeholder={`Member ${i + 1}`}
                value={p}
                onChange={(e) => updateParticipant(i, e.target.value)}
                style={{
                    padding: '0.8rem',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--bg-soft)',
                    fontSize: '0.9rem',
                    width: '100%' // Ensure full width in grid cell
                }}
            />
            ))}
        </div>
      </div>

      <button
        onClick={handleStart}
        style={{
          width: '100%',
          padding: '1.2rem',
          background: 'var(--primary)',
          color: 'white',
          fontWeight: 700,
          borderRadius: 'var(--radius-lg)',
          fontSize: '1.1rem',
          boxShadow: 'var(--shadow-hover)',
        }}
      >
        Continue
      </button>
    </div>
  );
}
