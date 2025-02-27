import axiosInstance from './axiosInstance';

// Submit Signup Data
export const submitSignup = async (payload) => {
    const response = await axiosInstance.post('/signup', payload);
    return response.data;
};