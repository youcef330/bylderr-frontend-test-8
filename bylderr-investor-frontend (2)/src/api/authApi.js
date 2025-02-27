import axiosInstance from './axiosInstance';

// Login API
export const loginUser = async (username, password) => {
    const response = await axiosInstance.post('/login', { username, password });
    return response.data;
};

// Get User Data API
export const fetchUserData = async () => {
    const response = await axiosInstance.get('/user');
    return response.data;
};