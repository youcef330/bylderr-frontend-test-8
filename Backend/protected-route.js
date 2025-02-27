// src/components/routing/ProtectedRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

/**
 * Protected Route component that redirects to login if not authenticated
 * @param {Object} props - Component props
 * @param {Array|String} props.roles - Allowed roles for this route
 * @returns {React.Component} Protected route component
 */
const ProtectedRoute = ({ roles }) => {
  const { user, loading, hasRole } = useAuth();

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // If not authenticated, redirect to login page
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If roles are specified and user doesn't have required role, redirect to dashboard
  if (roles && !hasRole(roles)) {
    return <Navigate to="/dashboard" replace />;
  }

  // Render the child route
  return <Outlet />;
};

export default ProtectedRoute;
