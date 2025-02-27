import axiosInstance from "./axiosInstance";

// Fetch Contact Details
export const fetchContactDetails = async () => {
    const response = await axiosInstance.get("/contactDetails");
    return response.data;
};

// Update Contact Details
export const updateContactDetails = async (details) => {
    const response = await axiosInstance.put("/contactDetails", details);
    return response.data;
};

// Update Password
export const updatePassword = async (oldPassword, newPassword) => {
    const response = await axiosInstance.post("/update-password", {
        oldPassword,
        newPassword,
    });
    return response.data;
};

// Deactivate Account
export const deactivateAccount = async (password) => {
    const response = await axiosInstance.post("/deactivate-account", { password });
    return response.data;
};

// fetch user id details
export const fetchUserIdentityDetails = async () => {
    const response = await axiosInstance.get("/userDetails");
    return response.data;

};

// Fetch Notifications History
export const fetchNotificationsHistory = async () => {
    const response = await axiosInstance.get("/notifications-history");
    if (Array.isArray(response.data)) {
        return response.data;
    } else {
        throw new Error("Invalid data format");
    }

};

// Fetch Notification Preferences
export const fetchNotificationPreferences = async () => {
    const response = await axiosInstance.get("/notifications");
    if (!Array.isArray(response.data)) {
        throw new Error("Invalid data format received.");
    }
    return response.data;

};

// Save Notification Preferences
export const saveNotificationPreferences = async (notifications) => {
    const response = await axiosInstance.post("/save-notifications", notifications);
    if (response.status !== 200 || !response.data.success) {
        throw new Error(response.data.message || "Failed to save notifications.");
    }
    return response.data;

};



// Change Plan
export const changePlan = async (plan) => {
    const response = await axiosInstance.post("/change-plan", plan);
    if (response.status !== 200 || !response.data.success) {
        throw new Error(response.data.message || "Failed to Change Plan");
    }
    return response.data;

};


// Fetch Standard Notification Preferences
export const fetchStandardNotifications = async () => {
    const response = await axiosInstance.get("/standard-notifications");
    if (!Array.isArray(response.data)) {
        throw new Error("Invalid data format");
    }
    return response.data;
};

// Save Standard Notification Preferences
export const saveStandardNotifications = async (notifications) => {
    const response = await axiosInstance.post("/save-standard-notifications", notifications);
    if (response.status !== 200 || !response.data.success) {
        throw new Error(response.data.message || "Failed to save standard notifications.");
    }
    return response.data;
};

// Fetch Investment Preferences
export const fetchInvestmentPreferences = async () => {
    const response = await axiosInstance.get("/investment-preferences");
    return response.data;

};

// Save Investment Preferences
export const saveInvestmentPreferences = async (preferences) => {
    const response = await axiosInstance.post("/save-investment-preferences", preferences);
    if (response.status !== 200 || !response.data.success) {
        throw new Error(response.data.message || "Failed to save investment preferences.");
    }
    return response.data;

};

// Fetch Login Activity
export const fetchLoginActivity = async () => {
    const response = await axiosInstance.get("/login-activity");
    if (!Array.isArray(response.data)) {
        throw new Error("Invalid data format");
    }
    return response.data;

};