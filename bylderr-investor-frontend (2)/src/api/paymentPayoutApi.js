import axiosInstance from "./axiosInstance";

// Save user Scheduled Preferences
export const saveScheduledPreferences = async (preferences) => {
    const response = await axiosInstance.post("/payments/save-scheduled-preferences", preferences);
    return response.data;

};

// Save all advanced settings
export const saveAdvancedSettings = async (settings) => {
    const response = await axiosInstance.post("/payments/advanced-settings", settings);
    return response.data;
};

// Request withdrawal
export const requestWithdrawal = async ({ amount, bank }) => {
    const response = await axiosInstance.post("/payments/request-withdrawal", {
        amount,
        bank,
    });
    return response.data;
};


// Fetch distribution history
export const getDistributionHistory = async () => {
    const response = await axiosInstance.get("/payments/distribution-history");
    return response.data;

};



// Fetch On-Demand Banks
export const fetchUserPayoutSettings = async () => {
    const response = await axiosInstance.get("/payments/payoutSettings");
    return response.data;
};


// Fetch On-Demand Banks
export const fetchOnDemandBanks = async () => {
    const response = await axiosInstance.get("/payments/on-demand-banks");
    return response.data.banks;
};

// Fetch Distribution History
export const fetchDistributionHistory = async () => {
    const response = await axiosInstance.get("/payments/distribution-history");
    return response.data;
};


//  will need to change all these to work with srtipe

// Add a new bank
export const addBank = async (bank) => {
    const response = await axiosInstance.post("/payments/banks", bank);
    return response.data.bank;
};

// Edit a bank
export const editBank = async (id, bank) => {
    await axiosInstance.put(`/payments/banks/${id}`, bank);
};

// Delete a bank
export const deleteBank = async (id) => {
    await axiosInstance.delete(`/payments/banks/${id}`);
};

// Set a bank as primary
export const setPrimaryBank = async (id) => {
    await axiosInstance.post(`/payments/banks/${id}/set-primary`);
};

