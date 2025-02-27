// src/services/auth.service.js - Authentication methods
import api from './api';
import { setToken, setRefreshToken, setUser, clearTokens, getUser } from '../utils/token';

/**
 * Register a new user
 * @param {Object} userData - User registration data
 * @returns {Promise} Promise object with registration result
 */
export const register = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData);
    
    const { token, refreshToken, user } = response.data;
    
    // Store authentication data
    setToken(token);
    setRefreshToken(refreshToken);
    setUser(user);
    
    return {
      success: true,
      user,
      message: 'Registration successful! Please check your email to verify your account.'
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.error || 'Registration failed. Please try again.'
    };
  }
};

/**
 * Login a user
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise} Promise object with login result
 */
export const login = async (email, password) => {
  try {
    const response = await api.post('/auth/login', { email, password });
    
    const { token, refreshToken, user } = response.data;
    
    // Store authentication data
    setToken(token);
    setRefreshToken(refreshToken);
    setUser(user);
    
    return {
      success: true,
      user,
      message: 'Login successful!'
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.error || 'Invalid credentials. Please try again.'
    };
  }
};

/**
 * Logout the current user
 * @returns {Promise} Promise object with logout result
 */
export const logout = async () => {
  try {
    // Call logout endpoint to invalidate tokens on server
    await api.get('/auth/logout');
    
    // Clear local tokens regardless of server response
    clearTokens();
    
    return {
      success: true,
      message: 'Logout successful'
    };
  } catch (error) {
    // Still clear tokens even if API call fails
    clearTokens();
    
    return {
      success: true, // Still return success since user is logged out locally
      message: 'Logged out'
    };
  }
};

/**
 * Get current user profile
 * @returns {Promise} Promise object with user profile
 */
export const getCurrentUser = async () => {
  try {
    // First check if we have the user in localStorage
    const cachedUser = getUser();
    
    // If we have a cached user, verify it's still valid by fetching from API
    const response = await api.get('/auth/me');
    const currentUser = response.data.data;
    
    // Update cached user data with fresh data
    setUser(currentUser);
    
    return {
      success: true,
      user: currentUser
    };
  } catch (error) {
    // If we get an error, user might be logged out or token expired
    if (error.response?.status === 401) {
      clearTokens();
    }
    
    return {
      success: false,
      message: error.response?.data?.error || 'Failed to get user profile'
    };
  }
};

/**
 * Update user profile
 * @param {Object} userData - User data to update
 * @returns {Promise} Promise object with update result
 */
export const updateProfile = async (userData) => {
  try {
    const response = await api.put('/auth/updatedetails', userData);
    const updatedUser = response.data.data;
    
    // Update cached user data
    setUser(updatedUser);
    
    return {
      success: true,
      user: updatedUser,
      message: 'Profile updated successfully'
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.error || 'Failed to update profile'
    };
  }
};

/**
 * Update user password
 * @param {string} currentPassword - Current password
 * @param {string} newPassword - New password
 * @returns {Promise} Promise object with update result
 */
export const updatePassword = async (currentPassword, newPassword) => {
  try {
    const response = await api.put('/auth/updatepassword', {
      currentPassword,
      newPassword
    });
    
    const { token, refreshToken } = response.data;
    
    // Update tokens
    setToken(token);
    setRefreshToken(refreshToken);
    
    return {
      success: true,
      message: 'Password updated successfully'
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.error || 'Failed to update password'
    };
  }
};

/**
 * Request password reset
 * @param {string} email - User email
 * @returns {Promise} Promise object with request result
 */
export const forgotPassword = async (email) => {
  try {
    await api.post('/auth/forgotpassword', { email });
    
    return {
      success: true,
      message: 'Password reset email sent. Please check your inbox.'
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.error || 'Failed to send password reset email'
    };
  }
};

/**
 * Reset password with token
 * @param {string} token - Reset token
 * @param {string} password - New password
 * @returns {Promise} Promise object with reset result
 */
export const resetPassword = async (token, password) => {
  try {
    const response = await api.put(`/auth/resetpassword/${token}`, {
      password
    });
    
    return {
      success: true,
      message: 'Password has been reset successfully. You can now login.'
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.error || 'Invalid or expired token. Please try again.'
    };
  }
};

/**
 * Verify email with token
 * @param {string} token - Verification token
 * @returns {Promise} Promise object with verification result
 */
export const verifyEmail = async (token) => {
  try {
    await api.get(`/auth/verifyemail/${token}`);
    
    // Update user data to reflect verified status
    const currentUser = getUser();
    if (currentUser) {
      currentUser.isEmailVerified = true;
      setUser(currentUser);
    }
    
    return {
      success: true,
      message: 'Email verified successfully! Thank you for confirming your email.'
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.error || 'Invalid or expired token. Please try again.'
    };
  }
};
