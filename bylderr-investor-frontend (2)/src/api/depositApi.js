import axiosInstance from "./axiosInstance";

export const fetchDepositOptions = async () => {
    // Have stripe provide these options based on the user 
    const response = await axiosInstance.get("/deposit-options");
    return response.data;
};

export const addFunds = async (payload) => {
    // Add funds using stripe 
    const response = await axiosInstance.post("/add-funds", payload);
    return response.data;
};