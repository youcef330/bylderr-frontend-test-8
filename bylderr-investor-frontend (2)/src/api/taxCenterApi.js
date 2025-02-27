import axiosInstance from "./axiosInstance";

// Fetch tax data
export const fetchTaxData = async () => {
    const response = await axiosInstance.get('/tax-data');
    return response.data;
};

// Save user information
export const saveUserInfo = async (userInfo) => {
    const response = await axiosInstance.post('/tax-data/user-info', userInfo);
    return response.data;
};

// Upload verification documents
export const uploadDocuments = async (type, files) => {
    const formData = new FormData();
    files.forEach((file) => {
        formData.append('documents', file);
    });
    const response = await axiosInstance.post(`/tax-data/upload/${type}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

// Remove a document
export const removeDocument = async (type, documentId) => {
    const response = await axiosInstance.delete(`/tax-data/delete/${type}/${documentId}`);
    return response.data;
};