// src/context/ProjectContext.js - Project state management
import React, { createContext, useState, useContext, useCallback } from 'react';
import * as projectService from '../services/project.service';

// Create Project Context
const ProjectContext = createContext();

// Custom hook to use the project context
export const useProjects = () => {
  return useContext(ProjectContext);
};

// Project Provider Component
export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [currentProject, setCurrentProject] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  });
  
  // Fetch all projects with pagination and filters
  const fetchProjects = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await projectService.getProjects(params);
      
      if (response.success) {
        setProjects(response.data);
        setPagination({
          page: params.page || 1,
          limit: params.limit || 10,
          total: response.count,
          totalPages: Math.ceil(response.count / (params.limit || 10))
        });
      } else {
        setError(response.message);
      }
      
      setLoading(false);
      return response;
    } catch (err) {
      setError('Failed to fetch projects');
      setLoading(false);
      return {
        success: false,
        message: 'Failed to fetch projects'
      };
    }
  }, []);

  // Fetch a single project by ID
  const fetchProjectById = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await projectService.getProjectById(id);
      
      if (response.success) {
        setCurrentProject(response.project);
      } else {
        setError(response.message);
      }
      
      setLoading(false);
      return response;
    } catch (err) {
      setError('Failed to fetch project');
      setLoading(false);
      return {
        success: false,
        message: 'Failed to fetch project'
      };
    }
  }, []);

  // Create a new project
  const createProject = useCallback(async (projectData) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await projectService.createProject(projectData);
      
      if (response.success) {
        // Add the new project to the projects array
        setProjects(prevProjects => [response.project, ...prevProjects]);
        setCurrentProject(response.project);
      } else {
        setError(response.message);
      }
      
      setLoading(false);
      return response;
    } catch (err) {
      setError('Failed to create project');
      setLoading(false);
      return {
        success: false,
        message: 'Failed to create project'
      };
    }
  }, []);

  // Update an existing project
  const updateProject = useCallback(async (id, projectData) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await projectService.updateProject(id, projectData);
      
      if (response.success) {
        // Update the project in the projects array
        setProjects(prevProjects =>
          prevProjects.map(project =>
            project._id === id ? response.project : project
          )
        );
        
        // Update currentProject if it's the same project
        if (currentProject && currentProject._id === id) {
          setCurrentProject(response.project);
        }
      } else {
        setError(response.message);
      }
      
      setLoading(false);
      return response;
    } catch (err) {
      setError('Failed to update project');
      setLoading(false);
      return {
        success: false,
        message: 'Failed to update project'
      };
    }
  }, [currentProject]);

  // Delete a project
  const deleteProject = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await projectService.deleteProject(id);
      
      if (response.success) {
        // Remove the project from the projects array
        setProjects(prevProjects =>
          prevProjects.filter(project => project._id !== id)
        );
        
        // Clear currentProject if it's the deleted project
        if (currentProject && currentProject._id === id) {
          setCurrentProject(null);
        }
      } else {
        setError(response.message);
      }
      
      setLoading(false);
      return response;
    } catch (err) {
      setError('Failed to delete project');
      setLoading(false);
      return {
        success: false,
        message: 'Failed to delete project'
      };
    }
  }, [currentProject]);

  // Upload project images
  const uploadProjectImages = useCallback(async (id, formData) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await projectService.uploadProjectImages(id, formData);
      
      if (response.success) {
        // Update the project in the projects array
        setProjects(prevProjects =>
          prevProjects.map(project =>
            project._id === id ? response.project : project
          )
        );
        
        // Update currentProject if it's the same project
        if (currentProject && currentProject._id === id) {
          setCurrentProject(response.project);
        }
      } else {
        setError(response.message);
      }
      
      setLoading(false);
      return response;
    } catch (err) {
      setError('Failed to upload images');
      setLoading(false);
      return {
        success: false,
        message: 'Failed to upload images'
      };
    }
  }, [currentProject]);

  // Add project update
  const addProjectUpdate = useCallback(async (id, updateData) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await projectService.addProjectUpdate(id, updateData);
      
      if (response.success) {
        // Update the currentProject updates
        if (currentProject && currentProject._id === id) {
          setCurrentProject({
            ...currentProject,
            updates: response.updates
          });
        }
      } else {
        setError(response.message);
      }
      
      setLoading(false);
      return response;
    } catch (err) {
      setError('Failed to add update');
      setLoading(false);
      return {
        success: false,
        message: 'Failed to add update'
      };
    }
  }, [currentProject]);

  // Add project to favorites
  const addToFavorites = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await projectService.addToFavorites(id);
      
      if (response.success) {
        // Update the project in the projects array
        setProjects(prevProjects =>
          prevProjects.map(project =>
            project._id === id ? { ...project, metrics: { ...project.metrics, favorites: project.metrics.favorites + 1 } } : project
          )
        );
        
        // Update currentProject if it's the same project
        if (currentProject && currentProject._id === id) {
          setCurrentProject({
            ...currentProject,
            metrics: { ...currentProject.metrics, favorites: currentProject.metrics.favorites + 1 }
          });
        }
      } else {
        setError(response.message);
      }
      
      setLoading(false);
      return response;
    } catch (err) {
      setError('Failed to add to favorites');
      setLoading(false);
      return {
        success: false,
        message: 'Failed to add to favorites'
      };
    }
  }, [currentProject]);

  // Remove project from favorites
  const removeFromFavorites = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await projectService.removeFromFavorites(id);
      
      if (response.success) {
        // Update the project in the projects array
        setProjects(prevProjects =>
          prevProjects.map(project =>
            project._id === id ? { ...project, metrics: { ...project.metrics, favorites: project.metrics.favorites - 1 } } : project
          )
        );
        
        // Update currentProject if it's the same project
        if (currentProject && currentProject._id === id) {
          setCurrentProject({
            ...currentProject,
            metrics: { ...currentProject.metrics, favorites: currentProject.metrics.favorites - 1 }
          });
        }
      } else {
        setError(response.message);
      }
      
      setLoading(false);
      return response;
    } catch (err) {
      setError('Failed to remove from favorites');
      setLoading(false);
      return {
        success: false,
        message: 'Failed to remove from favorites'
      };
    }
  }, [currentProject]);

  // Get project investments (admin/manager only)
  const fetchProjectInvestments = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await projectService.getProjectInvestments(id);
      
      if (!response.success) {
        setError(response.message);
      }
      
      setLoading(false);
      return response;
    } catch (err) {
      setError('Failed to fetch project investments');
      setLoading(false);
      return {
        success: false,
        message: 'Failed to fetch project investments'
      };
    }
  }, []);

  // Context value
  const value = {
    projects,
    currentProject,
    loading,
    error,
    pagination,
    fetchProjects,
    fetchProjectById,
    createProject,
    updateProject,
    deleteProject,
    uploadProjectImages,
    addProjectUpdate,
    addToFavorites,
    removeFromFavorites,
    fetchProjectInvestments
  };

  return (
    <ProjectContext.Provider value={value}>
      {children}
    </ProjectContext.Provider>
  );
};

export default ProjectContext;
