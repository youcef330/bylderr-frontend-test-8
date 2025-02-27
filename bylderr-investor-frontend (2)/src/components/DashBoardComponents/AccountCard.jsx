import React, { useEffect, useState } from 'react';
import { fetchDashboardData, fetchPortfolioChartData } from '../../api/dashboardApi';
import PortfolioChart from './PortfolioChart';
import formatToUSD from '../../utils/formatToUSD';
import { portfolioChartData as portfolioChartMockData } from '../../mockData/portfolioChartData';
import { dashboardData as dashboardMockData } from '../../mockData/dashboardData';

const dashboardFallbackData = {
    totalValue: 'N/A',
    appreciation: 'N/A',
    dividends: 'N/A',
    contributions: 'N/A',
    totalChange: 'N/A',
    percentageChange: 'N/A',
};

const AccountCard = () => {
    const [dashboardData, setDashboardData] = useState(null);
    const [portfolioChartData, setPortfolioChartData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadDashboardData = async () => {
            setIsLoading(true);
            setError(null);

            if (import.meta.env.VITE_REACT_APP_AUTH_MODE == 'mock') {
                setDashboardData(dashboardMockData);
                setPortfolioChartData(portfolioChartMockData);
                setIsLoading(false);
            } else {
                try {
                    const [dashboard, portfolioChart] = await Promise.all([
                        fetchDashboardData(),
                        fetchPortfolioChartData(),
                    ]);
                    setDashboardData(dashboard);
                    setPortfolioChartData(portfolioChart);
                } catch (err) {
                    console.error("Error fetching data:", err.message);
                    setError("Failed to fetch data. Please refresh the page.");
                    setDashboardData(dashboardFallbackData);
                    setPortfolioChartData([]);
                } finally {
                    setIsLoading(false);
                }
            }

        };

        loadDashboardData();
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
            <div className="p-6">
                <h2 className="text-2xl font-semibold mb-4">Account</h2>
                {error && (
                    <div className="bg-yellow-50 border border-yellow-500 text-yellow-700 p-2 rounded mb-4">
                        {error}
                    </div>
                )}
                <div className="flex justify-between items-center mb-6 space-x-5">
                    <div>
                        <div className="text-sm text-gray-600 font-semibold">
                            Total Returns
                        </div>
                        <div className="flex items-center mb-4">
                            <div className="text-3xl font-bold">
                                {dashboardData?.totalValue && dashboardData.totalValue !== 'N/A'
                                    ? formatToUSD(dashboardData.totalValue)
                                    : 'N/A'}
                            </div>
                            <div className="text-green-600 text-sm ml-4">
                                {dashboardData?.totalChange && dashboardData.totalChange !== 'N/A' ? (
                                    <>
                                        <span className="font-semibold">
                                            +${Number(dashboardData.totalChange).toLocaleString()}
                                        </span>
                                        <span> ({dashboardData?.percentageChange || 'N/A'}%) All</span>
                                    </>
                                ) : (
                                    ' (N/A%) All'
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="flex space-x-5">
                        <div className="text-xs sm:text-sm text-gray-600">
                            <div className="font-semibold">Appreciation</div>
                            <div>
                                {dashboardData?.appreciation && dashboardData.appreciation !== 'N/A'
                                    ? formatToUSD(dashboardData.appreciation)
                                    : 'N/A'}
                            </div>
                        </div>
                        <div className="text-xs sm:text-sm text-gray-600">
                            <div className="font-semibold">Dividends</div>
                            <div>
                                {dashboardData?.dividends && dashboardData.dividends !== 'N/A'
                                    ? formatToUSD(dashboardData.dividends)
                                    : 'N/A'}
                            </div>
                        </div>
                        <div className="text-xs sm:text-sm text-gray-600">
                            <div className="font-semibold">Contribution</div>
                            <div>
                                {dashboardData?.contributions && dashboardData.contributions !== 'N/A'
                                    ? formatToUSD(dashboardData.contributions)
                                    : 'N/A'}
                            </div>
                        </div>
                    </div>
                </div>
                <PortfolioChart data={portfolioChartData} />
            </div>
        </div>
    );
};

export default AccountCard;