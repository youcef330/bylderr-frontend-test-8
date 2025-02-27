import React, { useState, useEffect } from "react";
import { getDistributionHistory } from "../../api/paymentPayoutApi";

const fallbackDistributionData = [
    {
        date: "12/24/24",
        type: "Scheduled",
        amount: "$2,500",
        status: "Pending",
        bank: "Chase Bank",
        last4: 1234,
    },
    {
        date: "12/24/24",
        type: "On-Demand",
        amount: "$2,500",
        status: "Completed",
        bank: "Chase Bank",
        last4: 1234,
    },
    {
        date: "12/24/24",
        type: "Scheduled",
        amount: "$2,500",
        status: "Pending",
        bank: "Chase Bank",
        last4: 1234,
    },
];

const DistributionHistory = () => {
    const [distributionData, setDistributionData] = useState(fallbackDistributionData);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const getStatusColor = (status) => {
        switch (status) {
            case "Pending":
                return "text-yellow-500";
            case "Completed":
                return "text-green-500";
            case "Failed":
                return "text-red-500";
            default:
                return "text-gray-500";
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getDistributionHistory();
                if (Array.isArray(data)) {
                    setDistributionData(data);
                } else {
                    throw new Error("Invalid data format");
                }
            } catch (err) {
                setError("Failed to load distribution history. Displaying fallback data.");
                setDistributionData(fallbackDistributionData);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="bg-white rounded-lg shadow-lg p-6 w-auto h-full mx-auto border-2 mb-10">
                <h2 className="text-xl font-bold mb-10">Distribution History</h2>
                <p>Loading distribution history...</p>
            </div>
        );
    }

    return (
        <div className="bg-white">
            <div className="p-6">
                <h2 className="text-xl font-bold mb-10">Distribution History</h2>
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
                                <th className="px-4 py-2 border-b text-center">Distribution Type</th>
                                <th className="px-4 py-2 border-b text-center">Amount</th>
                                <th className="px-4 py-2 border-b text-center">Status</th>
                                <th className="px-4 py-2 border-b text-center">Account</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(distributionData) &&
                                distributionData.map((item, index) => (
                                    <tr key={index}>
                                        <td className="px-4 py-2 text-left">{item.date}</td>
                                        <td className="px-4 py-2 text-center">{item.type}</td>
                                        <td className="px-4 py-2 text-center">{item.amount}</td>
                                        <td className={`px-4 py-2 text-center font-semibold ${getStatusColor(item.status)}`}>
                                            {item.status}
                                        </td>
                                        <td className="px-4 py-2 text-center">
                                            {item.bank} - **** {item.last4}
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default DistributionHistory;