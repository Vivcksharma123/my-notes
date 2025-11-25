import React, { useState } from 'react';
import './App.css';
import UserRegistration from './UserRegistration';
import Login from './Login';
import Notes from './Notes';

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
  const [userName, setUserName] = useState(localStorage.getItem('userName') || '');

  const toggleForm = () => {
    setShowLogin(!showLogin);
  };

  const handleLoginSuccess = (name) => {
    setUserName(name);
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userName', name);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName('');
    setShowLogin(true);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userName');
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
