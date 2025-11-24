import React, { useState } from 'react';
import './App.css';
import UserRegistration from './UserRegistration';
import Login from './Login';
import Notes from './Notes';

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  const toggleForm = () => {
    setShowLogin(!showLogin);
  };

  const handleLoginSuccess = (name) => {
    setUserName(name);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName('');
    setShowLogin(true);
  };

  if (isLoggedIn) {
    return <Notes onLogout={handleLogout} />;
  }

  return (
    <div className="App">
      {showLogin ? 
        <Login onToggleForm={toggleForm} onLoginSuccess={handleLoginSuccess} /> : 
        <UserRegistration onToggleForm={toggleForm} />
      }
    </div>
  );
}

export default App;
