import React from 'react';

export default function Layout({ children, title }) {
  return (
    <div className="layout-container" style={{ width: '100%' }}>
      <header style={{ 
        textAlign: 'center', 
        marginBottom: '2rem',
        padding: '1rem 0' 
      }}>
        <h1 style={{ 
          fontSize: '2.5rem', 
          color: 'var(--primary)',
          fontFamily: '"Outfit", sans-serif', /* Assuming font loaded or fallback */
          fontWeight: 800,
          letterSpacing: '-1px'
        }}>
          {title || "SplitUp"}
        </h1>
      </header>
      <main style={{
        maxWidth: '100%',
        width: '100%'
      }}>
        {children}
      </main>
    </div>
  );
}
