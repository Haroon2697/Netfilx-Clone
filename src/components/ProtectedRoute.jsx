import React from 'react';
import { Navigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => { // Use destructuring for children prop

    const { user } = UserAuth();

    if (!user) {
        return <Navigate to='/' />; // Corrected syntax here
    } else {
        return children; // Return children if the user is authenticated
    }
};

export default ProtectedRoute;
