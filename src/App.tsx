import React from 'react';
import { useAuth } from './store/useGameStore';
import { SplashScreen } from './pages/SplashScreen';
import { LoginPage } from './pages/LoginPage';
import { MainApp } from './MainApp';

function App() {
  const { authStatus } = useAuth();

  if (authStatus === 'checking') {
    return <SplashScreen />;
  }

  if (authStatus === 'unauthenticated') {
    return <LoginPage />;
  }
  
  return <MainApp />;
}

export default App;
