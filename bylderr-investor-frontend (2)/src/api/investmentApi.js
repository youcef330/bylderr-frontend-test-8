import axiosInstance from "./axiosInstance";

/**
 * Submits an investment transaction to the server.
 *
 */

export const submitInvestment = async (investmentData) => {
    const response = await axiosInstance.post("/buyInvestments", investmentData);
    return response.data;
};

/**
 * Submits a request to sell Investment Shares.
 *
 */
export const sellInvestments = async (saleData) => {
    const response = await axiosInstance.post("/sellInvestments", saleData);
    return response.data;
};