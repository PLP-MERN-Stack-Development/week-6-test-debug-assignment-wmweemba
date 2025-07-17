import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import ShoppingList from './components/ShoppingList';
import Login from './components/Login';
import Register from './components/Register';
import ErrorBoundary from './components/ErrorBoundary';
import './App.css';

function AppContent() {
  const { token, logout } = useAuth();
  const [showLogin, setShowLogin] = useState(true);

  if (!token) {
    return (
      <div className="auth-container">
        <div className="auth-toggle">
          <button
            className={showLogin ? 'active' : ''}
            onClick={() => setShowLogin(true)}
          >
            Login
          </button>
          <button
            className={!showLogin ? 'active' : ''}
            onClick={() => setShowLogin(false)}
          >
            Register
          </button>
        </div>
        {showLogin ? <Login /> : <Register />}
      </div>
    );
  }

  return (
    <div className="app-container">
      <button className="logout-btn" onClick={logout} style={{ alignSelf: 'flex-end', marginBottom: 16 }}>
        Logout
      </button>
      <ShoppingList />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ErrorBoundary>
        <AppContent />
      </ErrorBoundary>
    </AuthProvider>
  );
}
