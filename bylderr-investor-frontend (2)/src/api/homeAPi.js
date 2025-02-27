import axiosInstance from "./axiosInstance";

export const fetchUserProfileData = async () => {
    const response = await axiosInstance.get("/user/profile");
    return response.data;
};

export const fetchListingsData = async (payload) => {
    const response = await axiosInstance.get("/listings");
    return response.data;
};