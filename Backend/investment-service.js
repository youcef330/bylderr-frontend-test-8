// src/services/investment.service.js - Investment API calls
import api from './api';

/**
 * Get user's investments
 * @returns {Promise} Promise object with investments data
 */
export const getMyInvestments = async () => {
  try {
    const response = await api.get('/investments/me');
    return {
      success: true,
      investments: response.data.data,
      count: response.data.count
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.error || 'Failed to fetch investments'
    };
  }
};

/**
 * Get a single investment by ID
 * @param {string} id - Investment ID
 * @returns {Promise} Promise object with investment data
 */
export const getInvestmentById = async (id) => {
  try {
    const response = await api.get(`/investments/${id}`);
    return {
      success: true,
      investment: response.data.data
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.error || 'Failed to fetch investment'
    };
  }
};

/**
 * Create a new investment
 * @param {string} projectId - Project ID
 * @param {Object} investmentData - Investment data
 * @returns {Promise} Promise object with created investment
 */
export const createInvestment = async (projectId, investmentData) => {
  try {
    const response = await api.post(`/projects/${projectId}/investments`, investmentData);
    return {
      success: true,
      investment: response.data.data,
      message: 'Investment created successfully'
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.error || 'Failed to create investment'
    };
  }
};

/**
 * Cancel an investment
 * @param {string} id - Investment ID
 * @returns {Promise} Promise object with cancellation result
 */
export const cancelInvestment = async (id) => {
  try {
    const response = await api.put(`/investments/${id}/cancel`);
    return {
      success: true,
      investment: response.data.data,
      message: 'Investment cancelled successfully'
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.error || 'Failed to cancel investment'
    };
  }
};

/**
 * Get all investments (admin only)
 * @param {Object} params - Query parameters
 * @param {number} params.page - Page number
 * @param {number} params.limit - Items per page
 * @param {string} params.sort - Sort field
 * @param {string} params.status - Filter by status
 * @returns {Promise} Promise object with investments data
 */
export const getAllInvestments = async (params = {}) => {
  try {
    const response = await api.get('/investments', { params });
    return {
      success: true,
      ...response.data
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.error || 'Failed to fetch investments'
    };
  }
};

/**
 * Update investment (admin only)
 * @param {string} id - Investment ID
 * @param {Object} investmentData - Updated investment data
 * @returns {Promise} Promise object with updated investment
 */
export const updateInvestment = async (id, investmentData) => {
  try {
    const response = await api.put(`/investments/${id}`, investmentData);
    return {
      success: true,
      investment: response.data.data,
      message: 'Investment updated successfully'
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.error || 'Failed to update investment'
    };
  }
};

/**
 * Upload investment documents
 * @param {string} id - Investment ID
 * @param {FormData} formData - Form data with documents
 * @returns {Promise} Promise object with upload result
 */
export const uploadInvestmentDocuments = async (id, formData) => {
  try {
    const response = await api.post(`/documents`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return {
      success: true,
      document: response.data.data,
      message: 'Document uploaded successfully'
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.error || 'Failed to upload document'
    };
  }
};

/**
 * Get investment stats (admin only)
 * @returns {Promise} Promise object with stats data
 */
export const getInvestmentStats = async () => {
  try {
    const response = await api.get('/analytics/investments/stats');
    return {
      success: true,
      stats: response.data.data
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.error || 'Failed to fetch investment stats'
    };
  }
};

/**
 * Calculate potential investment returns
 * @param {Object} data - Investment data
 * @param {number} data.amount - Investment amount
 * @param {number} data.returnRate - Expected return rate
 * @param {number} data.duration - Investment duration in months
 * @returns {Object} Investment calculation result
 */
export const calculateInvestmentReturns = (data) => {
  const { amount, returnRate, duration } = data;
  
  // Convert annual rate to monthly
  const monthlyRate = returnRate / 100 / 12;
  
  // Calculate total return for entire duration
  const totalReturn = amount * (1 + monthlyRate * duration);
  
  // Calculate profit
  const profit = totalReturn - amount;
  
  // Calculate ROI
  const roi = (profit / amount) * 100;
  
  return {
    initialInvestment: amount,
    totalReturn: totalReturn,
    profit: profit,
    roi: roi,
    monthlyRate: monthlyRate * 100, // Convert back to percentage
    duration: duration
  };
};
