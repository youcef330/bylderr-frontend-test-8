import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const ProtectedRoute = ({ children, role }) => {
    const { isAuthenticated, userType } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }
    if (role && userType !== role) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;