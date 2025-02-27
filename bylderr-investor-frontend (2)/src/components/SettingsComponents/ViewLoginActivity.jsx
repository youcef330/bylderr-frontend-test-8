import React, { useState, useEffect } from "react";
import { fetchLoginActivity } from "../../api/settingsApi";

const fallbackLoginActivityData = [
    {
        id: 1,
        dateTime: "2024-11-25 14:32:00",
        device: "Chrome - Windows 10",
        location: "New York, USA",
        ipAddress: "192.168.1.1",
        status: "Successful",
        logoutTime: "2024-11-25 16:00:00",
    },
    {
        id: 2,
        dateTime: "2024-11-25 10:15:00",
        device: "Safari - iPhone 13",
        location: "Los Angeles, USA",
        ipAddress: "192.168.1.2",
        status: "Failed",
        logoutTime: null,
    },
];

const ViewLoginActivity = () => {
    const [loginActivity, setLoginActivity] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadLoginActivity = async () => {
            try {
                const data = await fetchLoginActivity();
                setLoginActivity(data);
            } catch (err) {
                setError("Failed to load login activity. Displaying fallback data.");
                setLoginActivity(fallbackLoginActivityData);
            } finally {
                setLoading(false);
            }
        };

        loadLoginActivity();
    }, []);

    if (loading) {
        return (
            <div className="bg-white rounded-lg shadow-lg p-6 w-auto h-full mx-auto border-2 mb-10">
                <h2 className="text-xl font-bold mb-10">Login Activity</h2>
                <p>Loading login activity...</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-lg w-auto h-full mx-auto border-2 mb-10">
            <div className="p-6">
                <h2 className="text-xl font-bold mb-10">Login Activity</h2>
                {error && (
                    <div className="bg-yellow-50 border border-yellow-500 text-yellow-700 p-2 rounded mb-4">
                        {error}
                    </div>
                )}
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr className="text-gray-600 font-semibold">
                                <th className="px-4 py-2 border-b text-left">Date & Time</th>
                                <th className="px-4 py-2 border-b text-left">Device</th>
                                <th className="px-4 py-2 border-b text-left">Location</th>
                                <th className="px-4 py-2 border-b text-left">IP Address</th>
                                <th className="px-4 py-2 border-b text-left">Status</th>
                                <th className="px-4 py-2 border-b text-left">Logout Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(loginActivity) &&
                                loginActivity.map((item) => (
                                    <tr key={item.id} className="text-gray-700">
                                        <td className="px-4 py-2 border-b">{item.dateTime}</td>
                                        <td className="px-4 py-2 border-b">{item.device}</td>
                                        <td className="px-4 py-2 border-b">{item.location}</td>
                                        <td className="px-4 py-2 border-b">{item.ipAddress}</td>
                                        <td
                                            className={`px-4 py-2 border-b ${item.status === "Successful" ? "text-green-600" : "text-red-600"
                                                }`}
                                        >
                                            {item.status}
                                        </td>
                                        <td className="px-4 py-2 border-b">{item.logoutTime || "N/A"}</td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ViewLoginActivity;