import React, { useState, useEffect } from "react";
import { fetchNotificationsHistory } from "../../api/settingsApi";

const fallbackNotificationData = [
    {
        id: 1,
        date: "12/24/24",
        time: "2:30 pm",
        notification: "Investment Update: Your portfolio increased by 5%.",
    },
    {
        id: 2,
        date: "12/24/24",
        time: "9:00 am",
        notification: "New Opportunity: New Property available for investment.",
    },
    {
        id: 3,
        date: "12/24/24",
        time: "12:00 pm",
        notification: "Account Activity: $1,000 deposited into your account.",
    },
    {
        id: 4,
        date: "12/24/24",
        time: "3:45 pm",
        notification: "Investment Update: Property B met the fund goal.",
    },
];

const NotificationsHistory = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadNotifications = async () => {
            try {
                const data = await fetchNotificationsHistory();
                setNotifications(data);
            } catch (err) {
                setError("Failed to load notifications history. Displaying fallback data.");
                setNotifications(fallbackNotificationData);
            } finally {
                setLoading(false);
            }
        };

        loadNotifications();
    }, []);

    if (loading) {
        return (
            <div className="bg-white rounded-lg shadow-lg p-6 w-auto h-full mx-auto border-2 mb-10">
                <h2 className="text-xl font-bold mb-10">Notifications History</h2>
                <p>Loading notifications...</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-lg w-auto h-full mx-auto border-2 mb-10">
            <div className="p-6">
                <h2 className="text-xl font-bold mb-10">Notifications History</h2>
                {error && (
                    <div className="bg-yellow-50 border border-yellow-500 text-yellow-700 p-2 rounded mb-4">
                        {error}
                    </div>
                )}
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr className="text-gray-600 font-semibold">
                                <th className="px-4 py-2 border-b text-left">Date</th>
                                <th className="px-4 py-2 border-b text-left">Time</th>
                                <th className="px-4 py-2 border-b text-left">Notification</th>
                            </tr>
                        </thead>
                        <tbody>
                            {notifications.map((item) => (
                                <tr key={item.id} className="text-gray-700">
                                    <td className="px-4 py-2 border-b">{item.date}</td>
                                    <td className="px-4 py-2 border-b">{item.time}</td>
                                    <td className="px-4 py-2 border-b">{item.notification}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default NotificationsHistory;