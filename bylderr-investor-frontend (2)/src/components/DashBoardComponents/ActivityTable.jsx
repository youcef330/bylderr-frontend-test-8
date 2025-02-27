import React, { useState, useEffect } from 'react';
import { fetchActivityData } from '../../api/dashboardApi';
import formatToUSD from '../../utils/formatToUSD';
import { activityMockData } from '../../mockData/activityMockData';

const mockData = [
    {
        property: 'N/A',
        total: 'N/A',
        shares: 'N/A',
        date: 'N/A',
        activityType: 'N/A'
    }
];

const ActivityTable = () => {
    const [activityData, setActivityData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadActivityData = async () => {
            setIsLoading(true);
            setError(null);
            if (import.meta.env.VITE_REACT_APP_AUTH_MODE == 'mock') {
                setActivityData(activityMockData);
                setIsLoading(false);
            } else {
                try {
                    const data = await fetchActivityData();
                    setActivityData(data);
                } catch (err) {
                    console.error("Error fetching activity data:", err.message);
                    setError("Failed to fetch Activity data. Please refresh the page or try again shortly.");
                    setActivityData(mockData);
                } finally {
                    setIsLoading(false);
                }
            }
        };

        loadActivityData();
    }, []);

    if (isLoading) {
        return (
            <div className="bg-white rounded-lg shadow-lg p-6 w-auto h-full mx-auto border-2">
                <div>Loading data...</div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-lg w-auto h-full mx-auto border-2">
            <div className='p-6'>
                <h2 className="text-2xl font-semibold mb-4">Activity</h2>
                {error && (
                    <div className='bg-yellow-50 border border-yellow-500 text-yellow-700 p-2 rounded mb-4'>
                        {error}
                    </div>
                )}
                <div className='overflow-x-auto rounded-lg shadow border border-gray-300 dark:border-dark-border'>
                    <table className="min-w-full bg-white g">
                        <thead>
                            <tr className='text-gray-600 font-semibold'>
                                <th className="px-4 py-2 border-b text-left">Property</th>
                                <th className="px-4 py-2 border-b text-center">Amount</th>
                                <th className="px-4 py-2 border-b text-center">Shares</th>
                                <th className="px-4 py-2 border-b text-center">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {activityData.map((item, index) => (
                                <tr key={index} className={
                                    index % 2 === 0
                                        ? "bg-gray-100 hover:bg-neutral-200"
                                        : "bg-white  hover:bg-neutral-200"
                                }>
                                    <td className="px-4 py-2 text-left">{item.property}</td>
                                    <td className={`px-4 py-2 text-center ${item.activityType === 'Buy' || item.activityType === 'Maintenance' ? 'text-red-500' : 'text-green-600'}`}>
                                        {item.total !== 'N/A' ? formatToUSD(item.total) : 'N/A'}
                                    </td>
                                    <td className="px-4 py-2 text-center">{item.shares}</td>
                                    <td className="px-4 py-2 text-center">{item.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ActivityTable;