import React, { useState, useEffect, useCallback } from "react";
import {
    fetchNotificationPreferences,
    saveNotificationPreferences,
} from "../../api/settingsApi";
import ToggleSwitch from "./ToggleSwitch";
import DebouncedButton from "../../utils/DebounceButton";

// need to edit so i just request the is on for each notification options 

const generateFallbackNotifications = () => [
    {
        id: 1,
        title: "Email Notifications",
        description: "Receive notifications via email.",
        isOn: true,
    },
    {
        id: 2,
        title: "SMS Notifications",
        description: "Receive notifications via SMS.",
        isOn: true,
    },
];

const NotificationsChannel = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const fetchNotifications = useCallback(async () => {
        try {
            const data = await fetchNotificationPreferences();
            setNotifications(data);
        } catch (err) {
            setError("Failed to load notification preferences. Displaying fallback data.");
            setNotifications(generateFallbackNotifications());
        } finally {
            setLoading(false);
        }
    }, []);

    const saveNotifications = async () => {
        setError("");
        setSuccess("");
        try {
            await saveNotificationPreferences(notifications);
            setSuccess("Notification preferences saved successfully!");
        } catch (err) {
            setError("An error occurred while saving notifications. Please try again.");
        }
    };

    const toggleNotification = (id) => {
        setNotifications((prev) =>
            prev.map((notification) =>
                notification.id === id ? { ...notification, isOn: !notification.isOn } : notification
            )
        );
    };

    useEffect(() => {
        fetchNotifications();
    }, [fetchNotifications]);

    if (loading) {
        return (
            <div className="bg-white rounded-lg shadow-lg p-6 w-auto mx-auto border dark:border-dark-border mb-10">
                <h2 className="text-lg font-semibold text-gray-700 mb-5">Notification Channels</h2>
                <p>Loading notification preferences...</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-lg w-auto mx-auto border-2 mb-10">
            <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-700 mb-5">Notification Channels</h2>

                {/* Error */}
                {error && (
                    <div className="bg-yellow-50 border border-yellow-500 text-yellow-700 p-2 rounded mb-4">
                        {error}
                    </div>
                )}

                {/* Success */}
                {success && (
                    <div className="bg-green-50 border border-green-500 text-green-700 p-2 rounded mb-4">
                        {success}
                    </div>
                )}

                {/* Notification List */}
                <div className="divide-y">
                    {notifications.map((notification) => (
                        <div key={notification.id} className="flex justify-between items-center py-4">
                            <div>
                                <h3 className="text-lg font-semibold">{notification.title}</h3>
                                <p className="text-gray-500">{notification.description}</p>
                            </div>
                            <ToggleSwitch
                                isOn={notification.isOn}
                                onToggle={() => toggleNotification(notification.id)}
                            />
                        </div>
                    ))}
                </div>

                {/* Save Button */}
                <DebouncedButton
                    onClick={saveNotifications}
                    className="bg-midnight-blue text-white px-4 py-2 mt-5 rounded-lg hover:bg-blue-600"
                >
                    Save Notification Channels
                </DebouncedButton>
            </div>
        </div>
    );
};

export default NotificationsChannel