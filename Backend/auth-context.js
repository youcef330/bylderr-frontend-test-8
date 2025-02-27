// src/context/AuthContext.js - Authentication state and methods
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as authService from '../services/auth.service';
import { getUser, isAuthenticated, clearTokens } from '../utils/token';

// Create Auth Context
const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Load user on initial render
  useEffect(() => {
    const loadUser = async () => {
      if (isAuthenticated()) {
        try {
          const cachedUser = getUser();
          setUser(cachedUser);

          // Verify user with API call
          const response = await authService.getCurrentUser();
          if (response.success) {
            setUser(response.user);
          } else {
            // If API call fails, clear tokens and user
            clearTokens();
            setUser(null);
          }
        } catch (err) {
          console.error('Error loading user:', err);
          clearTokens();
          setUser(null);
        }
      }
      setLoading(false);
    };

    loadUser();
  }, []);

  // Register user
  const register = async (userData) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await authService.register(userData);
      
      if (response.success) {
        setUser(response.user);
        navigate('/dashboard');
      } else {
        setError(response.message);
      }
      
      setLoading(false);
      return response;
    } catch (err) {
      setError('An error occurred during registration');
      setLoading(false);
      return {
        success: false,
        message: 'An error occurred during registration'
      };
    }
  };

  // Login user
  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await authService.login(email, password);
      
      if (response.success) {
        setUser(response.user);
        navigate('/dashboard');
      } else {
        setError(response.message);
      }
      
      setLoading(false);
      return response;
    } catch (err) {
      setError('An error occurred during login');
      setLoading(false);
      return {
        success: false,
        message: 'An error occurred during login'
      };
    }
  };

  // Logout user
  const logout = async () => {
    setLoading(true);
    
    try {
      await authService.logout();
    } catch (err) {
      console.error('Error during logout:', err);
    }
    
    // Clear user state regardless of API response
    setUser(null);
    setLoading(false);
    navigate('/login');
  };

  // Update user profile
  const updateProfile = async (userData) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await authService.updateProfile(userData);
      
      if (response.success) {
        setUser(response.user);
      } else {
        setError(response.message);
      }
      
      setLoading(false);
      return response;
    } catch (err) {
      setError('An error occurred while updating profile');
      setLoading(false);
      return {
        success: false,
        message: 'An error occurred while updating profile'
      };
    }
  };

  // Update password
  const updatePassword = async (currentPassword, newPassword) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await authService.updatePassword(currentPassword, newPassword);
      
      if (!response.success) {
        setError(response.message);
      }
      
      setLoading(false);
      return response;
    } catch (err) {
      setError('An error occurred while updating password');
      setLoading(false);
      return {
        success: false,
        message: 'An error occurred while updating password'
      };
    }
  };

  // Forgot password request
  const forgotPassword = async (email) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await authService.forgotPassword(email);
      
      if (!response.success) {
        setError(response.message);
      }
      
      setLoading(false);
      return response;
    } catch (err) {
      setError('An error occurred while processing forgot password request');
      setLoading(false);
      return {
        success: false,
        message: 'An error occurred while processing forgot password request'
      };
    }
  };

  // Reset password
  const resetPassword = async (token, password) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await authService.resetPassword(token, password);
      
      if (!response.success) {
        setError(response.message);
      } else {
        navigate('/login');
      }
      
      setLoading(false);
      return response;
    } catch (err) {
      setError('An error occurred while resetting password');
      setLoading(false);
      return {
        success: false,
        message: 'An error occurred while resetting password'
      };
    }
  };

  // Verify email
  const verifyEmail = async (token) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await authService.verifyEmail(token);
      
      if (response.success && user) {
        // Update user state to reflect verified email
        setUser({ ...user, isEmailVerified: true });
      } else if (!response.success) {
        setError(response.message);
      }
      
      setLoading(false);
      return response;
    } catch (err) {
      setError('An error occurred while verifying email');
      setLoading(false);
      return {
        success: false,
        message: 'An error occurred while verifying email'
      };
    }
  };

  // Check if user has specific role
  const hasRole = (requiredRole) => {
    if (!user) return false;
    
    if (Array.isArray(requiredRole)) {
      return requiredRole.includes(user.role);
    }
    
    return user.role === requiredRole;
  };

  // Context value
  const value = {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    register,
    login,
    logout,
    updateProfile,
    updatePassword,
    forgotPassword,
    resetPassword,
    verifyEmail,
    hasRole
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
