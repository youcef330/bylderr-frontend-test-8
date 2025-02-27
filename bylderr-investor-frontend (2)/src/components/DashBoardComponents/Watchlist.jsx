import React, { useState, useEffect } from 'react';
import { fetchWatchlist } from '../../api/dashboardApi';
import WatchlistItems from './WatchlistItems';
import { watchlistMockData } from '../../mockData/watchlistMockData';

const mockData = [
    {
        propertyId: 1,
        propertyName: 'N/A',
        fundsRaised: 'N/A',
    },
];

const Watchlist = () => {
    const [watchlistData, setWatchlistData] = useState([]);
    const [status, setStatus] = useState('idle');
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWatchlistData = async () => {
            setStatus('loading');

            if (import.meta.env.VITE_REACT_APP_AUTH_MODE == 'mock') {
                setWatchlistData(watchlistMockData);
                setStatus('mock');
            } else {
                try {
                    const response = await fetchWatchlist();
                    setWatchlistData(response.data);
                    setStatus('succeeded');
                } catch (err) {
                    console.error('Error fetching data:', err.message);
                    setWatchlistData(mockData);
                    setError('Failed to fetch watchlist data. Please refresh the page or try again shortly.');
                    setStatus('failed');
                }
            }
        };

        fetchWatchlistData();
    }, []);

    const handleItemError = (itemError) => {
        setError(itemError);
    };

    if (status === 'loading') {
        return <div>Loading your watchlist...</div>;
    }

    return (
        <div className="bg-white rounded-lg shadow-lg w-auto h-full border-2">
            <div className="p-6">
                <h2 className="text-2xl font-semibold mb-4">Watchlist</h2>
                {error && (
                    <div className='bg-yellow-50 border border-yellow-500 text-yellow-700 p-2 rounded mb-4'>
                        {error}
                    </div>
                )}
                <div className='overflow-x-auto rounded-lg shadow border border-gray-300 dark:border-dark-border'>
                    <table className="min-w-full bg-white">
                        <tbody>
                            {(status === 'failed' ? mockData : watchlistData).map((item, index) => (
                                <tr key={index} className={
                                    index % 2 === 0
                                        ? "bg-gray-100 hover:bg-neutral-200"
                                        : "bg-white  hover:bg-neutral-200"
                                }>
                                    <WatchlistItems
                                        propertyName={item.propertyName}
                                        fundsRaised={item.fundsRaised}
                                        propertyId={item.propertyId}
                                        onError={handleItemError}
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

export default Watchlist;