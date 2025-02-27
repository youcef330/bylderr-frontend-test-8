import axiosInstance from "./axiosInstance";

/**
 * Fetches property listings based on provided filters.
 *
 */

export const fetchListings = async (filters) => {
    const response = await axiosInstance.get("/listings", {
        params: {
            location: filters.location,
            minPrice: filters.minPrice,
            maxPrice: filters.maxPrice,
            minROI: filters.minROI,
            maxROI: filters.maxROI,
            propertyTypes: filters.propertyTypes,
        },
    });
    return response.data;
};

/**
 * Fetches a single property listing by its ID.
 *
 */
export const fetchListingById = async (propertyId) => {
    const response = await axiosInstance.get(`/listings/${propertyId}`);
    return response.data;
};


// Save a property
export const saveListing = async (propertyId) => {
    const response = await axiosInstance.post(`/listings/${propertyId}/save`);
    return response.data;
};

// Unsave a property
export const unsaveListing = async (propertyId) => {
    const response = await axiosInstance.delete(`/listings/${propertyId}/unsave`);
    return response.data;
};

// Download Document
export const downloadDocument = async (fileName) => {
    const response = await axiosInstance.get(`/documents/download/${fileName}`, {
        responseType: 'blob',
    });
    return response.data;
};

/**
 * Fetches a single property owned listing by its ID.
 *
 */
export const fetchOwnedListingById = async (propertyId) => {
    const response = await axiosInstance.get(`/listings/${propertyId}`);
    return response.data;
};