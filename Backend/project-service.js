// src/services/project.service.js - Project API calls
import api from './api';

/**
 * Get all projects with pagination and filters
 * @param {Object} params - Query parameters
 * @param {number} params.page - Page number
 * @param {number} params.limit - Items per page
 * @param {string} params.sort - Sort field
 * @param {string} params.sector - Filter by sector
 * @param {string} params.status - Filter by status
 * @param {string} params.risk - Filter by risk level
 * @returns {Promise} Promise object with projects data
 */
export const getProjects = async (params = {}) => {
  try {
    const response = await api.get('/projects', { params });
    return {
      success: true,
      ...response.data
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.error || 'Failed to fetch projects'
    };
  }
};

/**
 * Get a single project by ID
 * @param {string} id - Project ID
 * @returns {Promise} Promise object with project data
 */
export const getProjectById = async (id) => {
  try {
    const response = await api.get(`/projects/${id}`);
    return {
      success: true,
      project: response.data.data
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.error || 'Failed to fetch project'
    };
  }
};

/**
 * Create a new project
 * @param {Object} projectData - Project data
 * @returns {Promise} Promise object with created project
 */
export const createProject = async (projectData) => {
  try {
    const response = await api.post('/projects', projectData);
    return {
      success: true,
      project: response.data.data,
      message: 'Project created successfully'
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.error || 'Failed to create project'
    };
  }
};

/**
 * Update an existing project
 * @param {string} id - Project ID
 * @param {Object} projectData - Updated project data
 * @returns {Promise} Promise object with updated project
 */
export const updateProject = async (id, projectData) => {
  try {
    const response = await api.put(`/projects/${id}`, projectData);
    return {
      success: true,
      project: response.data.data,
      message: 'Project updated successfully'
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.error || 'Failed to update project'
    };
  }
};

/**
 * Delete a project
 * @param {string} id - Project ID
 * @returns {Promise} Promise object with deletion result
 */
export const deleteProject = async (id) => {
  try {
    await api.delete(`/projects/${id}`);
    return {
      success: true,
      message: 'Project deleted successfully'
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.error || 'Failed to delete project'
    };
  }
};

/**
 * Upload project images
 * @param {string} id - Project ID
 * @param {FormData} formData - Form data with images
 * @returns {Promise} Promise object with upload result
 */
export const uploadProjectImages = async (id, formData) => {
  try {
    const response = await api.put(`/projects/${id}/images`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return {
      success: true,
      project: response.data.data,
      message: 'Images uploaded successfully'
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.error || 'Failed to upload images'
    };
  }
};

/**
 * Add project update
 * @param {string} id - Project ID
 * @param {Object} updateData - Update data (title, content)
 * @returns {Promise} Promise object with update result
 */
export const addProjectUpdate = async (id, updateData) => {
  try {
    const response = await api.post(`/projects/${id}/updates`, updateData);
    return {
      success: true,
      updates: response.data.data,
      message: 'Update added successfully'
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.error || 'Failed to add update'
    };
  }
};

/**
 * Add project to favorites
 * @param {string} id - Project ID
 * @returns {Promise} Promise object with result
 */
export const addToFavorites = async (id) => {
  try {
    await api.post(`/projects/${id}/favorite`);
    return {
      success: true,
      message: 'Project added to favorites'
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.error || 'Failed to add to favorites'
    };
  }
};

/**
 * Remove project from favorites
 * @param {string} id - Project ID
 * @returns {Promise} Promise object with result
 */
export const removeFromFavorites = async (id) => {
  try {
    await api.delete(`/projects/${id}/favorite`);
    return {
      success: true,
      message: 'Project removed from favorites'
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.error || 'Failed to remove from favorites'
    };
  }
};

/**
 * Get project investments (admin/manager only)
 * @param {string} id - Project ID
 * @returns {Promise} Promise object with investments data
 */
export const getProjectInvestments = async (id) => {
  try {
    const response = await api.get(`/projects/${id}/investments`);
    return {
      success: true,
      investments: response.data.data,
      count: response.data.count
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.error || 'Failed to fetch project investments'
    };
  }
};

/**
 * Get project performance analytics (admin/manager only)
 * @param {string} id - Project ID
 * @returns {Promise} Promise object with performance data
 */
export const getProjectPerformance = async (id) => {
  try {
    const response = await api.get(`/analytics/projects/${id}/performance`);
    return {
      success: true,
      performance: response.data.data
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.error || 'Failed to fetch project performance'
    };
  }
};
