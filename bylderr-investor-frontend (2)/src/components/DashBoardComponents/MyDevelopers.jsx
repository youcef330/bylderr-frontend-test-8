import React, { useState, useEffect } from 'react';
import { fetchDevelopers } from '../../api/dashboardApi';
import DeveloperItem from './DeveloperItem';
import { developerMockData } from '../../mockData/developerMockData';


/**
 * The MyDevelopers component displays a list of developers that the user has liked
 * in a table format. It also allows the user to toggle each developer as one of 
 * their "Liked Developers".
 */

const mockData = [
    {
        devId: 1,
        devName: 'N/A',
        units: 'N/A',
        totalRaised: 'N/A',
    },
];

const MyDevelopers = () => {
    const [developerData, setDeveloperData] = useState([]);
    const [status, setStatus] = useState('idle');
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDeveloperData = async () => {
            setStatus('loading');

            if (import.meta.env.VITE_REACT_APP_AUTH_MODE == 'mock') {
                setDeveloperData(developerMockData);
                setStatus('mock');
            } else {
                try {
                    const response = await fetchDevelopers();
                    setDeveloperData(response.data);
                    setStatus('succeeded');
                } catch (err) {
                    console.error('Error fetching data:', err.message);
                    setDeveloperData(mockData);
                    setError('Failed to fetch developers. Please refresh the page or try again shortly.');
                    setStatus('failed');
                }
            }
        };

        fetchDeveloperData();
    }, []);

    if (status === 'loading') {
        return (
            <div className="flex items-center justify-center h-full">
                <p className="text-gray-600">Loading data...</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-lg w-full border">
            <div className="p-6">
                <h2 className="text-2xl font-semibold mb-4">My Developers</h2>
                {error && (
                    <div className="bg-yellow-50 border border-yellow-500 text-yellow-700 p-2 rounded mb-4">
                        {error}
                    </div>
                )}
                <div className='overflow-x-auto rounded-lg shadow border border-gray-300 dark:border-dark-border'>
                    <table className="min-w-full bg-white border-collapse border-spacing-0">
                        <tbody>
                            {(status === 'failed' ? mockData : developerData).map((item, index) => (
                                <tr key={index} className={
                                    index % 2 === 0
                                        ? "bg-gray-100 hover:bg-neutral-200"
                                        : "bg-white  hover:bg-neutral-200"
                                }>
                                    <DeveloperItem
                                        devName={item.devName}
                                        properties={item.properties}
                                        units={item.units}
                                        totalRaised={item.totalRaised}
                                        devId={item.devId}
                                        onError={setError}
                                    />
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
};

export default MyDevelopers;