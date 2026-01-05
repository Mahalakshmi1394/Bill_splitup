import { useState } from 'react';
import useLocalStorage from './hooks/useLocalStorage';
import Layout from './components/Layout';
import SetupScreen from './components/SetupScreen';
import Dashboard from './components/Dashboard';

function App() {
  const [outingName, setOutingName] = useLocalStorage("outingName", "");
  // Simplified State: members = [{ id, name, paid: 0 }]
  const [members, setMembers] = useLocalStorage("members", []);

  const handleSetupComplete = (name, namesList) => {
    setOutingName(name);
    // Convert array of strings to array of objects
    const initialMembers = namesList.map((n, i) => ({
        id: Date.now() + i,
        name: n,
        paid: 0
    }));
    setMembers(initialMembers);
  };

  const handleReset = () => {
    if (confirm("Are you sure? This will delete all data.")) {
        setOutingName("");
        setMembers([]);
    }
  };

  return (
    <Layout title={outingName}>
      {!outingName ? (
        <SetupScreen onComplete={handleSetupComplete} />
      ) : (
        <>
            <Dashboard 
              members={members}
              onUpdateMember={(updatedMembers) => setMembers(updatedMembers)}
            />
          
            <div style={{ textAlign: 'center' }}>
              <button 
                  onClick={handleReset} 
                  style={{ 
                      marginTop: '3rem',
                      color: '#e74c3c', 
                      fontSize: '0.85rem',
                      textDecoration: 'underline',
                      opacity: 0.7
                  }}
              >
                  Start New Calculation
              </button>
            </div>
        </>
      )}
    </Layout>
  );
}

export default App;
