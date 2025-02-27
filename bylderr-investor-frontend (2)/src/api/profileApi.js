import axiosInstance from "./axiosInstance";

// Fetch Profile Data
export const fetchProfileData = async () => {
    const response = await axiosInstance.get("/user/profile");
    return response.data;
};