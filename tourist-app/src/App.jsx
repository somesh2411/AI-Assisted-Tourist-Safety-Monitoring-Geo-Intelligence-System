import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import TouristDashboard from './components/TouristDashboard';
import AdminDashboard from './pages/AdminDashboard';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

function AppContent() {
  const { user } = useAuth();
  const [showLogin, setShowLogin] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  // If user is not authenticated, show login/register
  if (!user) {
    return (
      <div>
        {showLogin ? (
          <Login onSwitchToRegister={() => setShowLogin(false)} />
        ) : (
          <Register onSwitchToLogin={() => setShowLogin(true)} />
        )}
      </div>
    );
  }

  // If user is authenticated, show dashboard
  return (
    <div>
      <nav style={navStyle}>
        <div style={navContentStyle}>
          <h3>🚨 Tourist Safety</h3>
          <div>
            <button
              onClick={() => setIsAdmin(false)}
              style={{
                ...navButtonStyle,
                ...(isAdmin ? {} : activeNavButtonStyle)
              }}
            >
              Tourist Dashboard
            </button>
            <button
              onClick={() => setIsAdmin(true)}
              style={{
                ...navButtonStyle,
                ...(isAdmin ? activeNavButtonStyle : {})
              }}
            >
              Admin View
            </button>
          </div>
        </div>
      </nav>
      
      {isAdmin ? <AdminDashboard /> : <TouristDashboard />}
    </div>
  );
}

// Navigation styles
const navStyle = {
  background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
  padding: '0',
  boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  position: 'sticky',
  top: 0,
  zIndex: 1000
};

const navContentStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '15px 20px',
  color: 'white'
};

const navButtonStyle = {
  background: 'rgba(255,255,255,0.1)',
  color: 'white',
  border: '1px solid rgba(255,255,255,0.2)',
  padding: '8px 16px',
  borderRadius: '6px',
  cursor: 'pointer',
  marginLeft: '10px',
  transition: 'all 0.3s ease'
};

const activeNavButtonStyle = {
  background: 'rgba(255,255,255,0.3)',
  borderColor: 'rgba(255,255,255,0.5)'
};

export default App;
