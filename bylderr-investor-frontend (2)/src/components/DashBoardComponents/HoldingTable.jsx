import React, { useState, useEffect } from 'react';
import { fetchHoldings } from '../../api/dashboardApi';
import { Link } from 'react-router-dom';
import { holdingMockData } from '../../mockData/holdingMockData';

/**
 * The HoldingTable component shows what properties the user has invested in
 * and displays relevant data about their investments.
 * 
 * Data structure:
 * - propertyId: Unique property id for each property
 * - property: Name of the property invested in
 * - total: Total amount invested in the property
 * - shares: Total number of shares or fractions the user invested
 * - allocation: Percentage of total investments represented by the property
 */

const mockData = [
    {
        propertyId: 1,
        property: 'N/A',
        total: 'N/A',
        shares: 'N/A',
        allocation: 'N/A',
    },
];

const HoldingTable = () => {
    const [holdingData, setHoldingData] = useState([]);
    const [status, setStatus] = useState('idle');
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHoldingData = async () => {
            setStatus('loading');

            if (import.meta.env.VITE_REACT_APP_AUTH_MODE == 'mock') {
                setHoldingData(holdingMockData);
                setStatus('Mock');
            } else {
                try {
                    const response = await fetchHoldings();
                    setHoldingData(response.data);
                    setStatus('succeeded');
                } catch (err) {
                    console.error('Error fetching data:', err.message);
                    setHoldingData(mockData);
                    setError('Failed to fetch holdings. Please refresh the page or try again shortly.');
                    setStatus('failed');
                }
            }
        };

        fetchHoldingData();
    }, []);

    if (status === 'loading') {
        return <div>Loading data...</div>;
    }

    return (
        <div className="bg-white rounded-lg shadow-lg w-auto h-full border-2">
            <div className="p-6">
                <h2 className="text-2xl font-semibold mb-4">Holdings</h2>
                {error && (
                    <div className='bg-yellow-50 border border-yellow-500 text-yellow-700 p-2 rounded mb-4'>
                        {error}
                    </div>
                )}
                <div className="overflow-x-auto rounded-lg shadow border border-gray-300 dark:border-dark-border">
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr className="text-gray-600 font-semibold">
                                <th className="px-4 py-2 border-b text-left">Property</th>
                                <th className="px-4 py-2 border-b text-center">Total</th>
                                <th className="px-4 py-2 border-b text-center">Shares</th>
                                <th className="px-4 py-2 border-b text-center">Allocation</th>
                            </tr>
                        </thead>
                        <tbody>
                            {holdingData.map((item, index) => (
                                <tr key={index} className={
                                    index % 2 === 0
                                        ? "bg-gray-100 hover:bg-neutral-200"
                                        : "bg-white  hover:bg-neutral-200"
                                }>
                                    <Link to={`/listings/${item.propertyId}`} className="px-4 py-2 flex items-center m-1 text-gray-700 hover:text-white hover:rounded-md  cursor-pointer hover:bg-midnight-blue">
                                        <td className="px-4 py-2 text-left">{item.property}</td>
                                    </Link>
                                    <td className="px-4 py-2 text-center text-green-600">{item.total}</td>
                                    <td className="px-4 py-2 text-center">{item.shares}</td>
                                    <td className="px-4 py-2 text-center">{item.allocation}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default HoldingTable;