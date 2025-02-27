import axiosInstance from "./axiosInstance";

// Fetch Dashboard
export const fetchDashboardData = async () => {
    const response = await axiosInstance.get("/dashboard");
    return response.data;
};

// Fetch Portfolio Chart
export const fetchPortfolioChartData = async () => {
    const response = await axiosInstance.get("/portfolio-chart");
    return response.data;
};

// Fetch Activity Data
export const fetchActivityData = async () => {
    const response = await axiosInstance.get("/activity");
    return response.data;
};

// Add Developers
export const addDeveloper = async (devId) => {
    const response = await axiosInstance.post("/developers/add", { devId });
    return response.data;
};

// Remove Developers
export const removeDeveloper = async (devId) => {
    const response = await axiosInstance.delete("/developers/remove", { data: { devId } });
    return response.data;
};

// Fetch Developers
export const fetchDevelopers = async () => {
    const response = await axiosInstance.get("/developers");
    return response.data;
};

// Fetch Holdings
export const fetchHoldings = async () => {
    const response = await axiosInstance.get("/holdings");
    return response.data;
};

// Fetch Investment Mix
export const fetchInvestmentMix = async () => {
    const response = await axiosInstance.get("/investment-mix");
    return response.data;
};

// Fetch Watchlist
export const fetchWatchlist = async () => {
    const response = await axiosInstance.get("/watchlist");
    return response.data;
};

// Add Property to Watchlist
export const addWatchlistProperty = async (propertyId) => {
    const response = await axiosInstance.post("/watchlist/add", { propertyId });
    return response.data;
};

// Remove Property from Watchlist
export const removeWatchlistProperty = async (propertyId) => {
    const response = await axiosInstance.delete("/watchlist/remove", { data: { propertyId } });
    return response.data;
};