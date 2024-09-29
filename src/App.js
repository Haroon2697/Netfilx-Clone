import React from 'react';
import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';  // Make sure to create and import the Home component
import { AuthContextProvider } from './context/AuthContext';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Account from './pages/Account';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <>
      <AuthContextProvider>
        
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='signup' element={<Signup />} />
        <Route path='login' element={<Login />} />
        <Route path='account' element={
          <ProtectedRoute>
          <Account />
        </ProtectedRoute>} />

       
      </Routes>
      </AuthContextProvider>
    </>
  );
}

export default App;
