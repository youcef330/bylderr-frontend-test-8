import React, { useState, useEffect } from 'react';
import ScheduledDistributions from './ScheduledDistributions';
import OnDemandSchedule from './OnDemandSchedule';
import DistributionHistory from './DistributionHistory';
import { fetchUserPayoutSettings } from '../../api/paymentPayoutApi';

const mockData = [{
    frequency: "Quarterly",
    banks: [
        "Chase Bank - **** **** **** 1234",
        "Bank of America - **** **** **** 5678",
        "Wells Fargo - **** **** **** 9012",
    ],
    ammountToWithdrawl: 10000000,
    estimatedAmount: 1000,
    defaultCap: 10000,
    defaultMin: 1000,
    istext: true,
    isEmail: false,
    isCalender: true,
    defaultPrincipalRepaymentOption: 'manual_request'
}];

const DistributionOptions = () => {
    const [activeTab, setActiveTab] = useState("Scheduled Distributions");
    const [distributionData, setDistribution] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadDistributionData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const data = await fetchUserPayoutSettings();
                setDistribution(data);
            } catch (err) {
                console.error("Error fetching distribution data:", err.message);
                setError("Failed to fetch distribution data. Using mock data.");
                setDistribution(mockData);
            } finally {
                setIsLoading(false);
            }
        };

        loadDistributionData();
    }, []);

    const renderContent = () => {
        if (!distributionData.length) {
            return <div>No distribution data available.</div>;
        }

        const data = distributionData[0];

        switch (activeTab) {
            case "Scheduled Distributions":
                return (
                    <ScheduledDistributions
                        frequency={data.frequency}
                        banks={data.banks}
                        estimatedAmount={data.estimatedAmount}
                        defaultCap={data.defaultCap}
                        defaultMin={data.defaultMin}
                        istext={data.istext}
                        isEmail={data.isEmail}
                        isCalender={data.isCalender}
                        defaultPrincipalRepaymentOption={data.defaultPrincipalRepaymentOption}
                    />
                );
            case "On-Demand Distributions":
                return (
                    <OnDemandSchedule
                        ammountToWithdrawl={data.ammountToWithdrawl}
                        banks={data.banks}
                    />
                );
            case "Distribution History":
                return (
                    <DistributionHistory />
                );
            default:
                return null;
        }
    };

    if (isLoading) {
        return (
            <div className="bg-white rounded-lg shadow-lg p-6 w-auto h-full mx-auto border-2">
                <div>Loading data...</div>
            </div>
        );
    }

    return (
        <div className='bg-white rounded-lg shadow-lg p-6 w-auto h-full mx-auto border-2 mb-10'>
            <h2 className='font-bold text-xl'>Distribution Options</h2>
            {error && (
                <div className="bg-yellow-50 border border-yellow-500 text-yellow-700 p-2 rounded my-4">
                    {error}
                </div>
            )}
            {/* Tabs */}
            <div className="bg-white border-t my-5">
                <div className="flex justify-around space-x-6 border-b overflow-x-auto flex-wrap md:flex-nowrap px-2">
                    {["Scheduled Distributions", "On-Demand Distributions", "Distribution History"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`py-2 px-6 text-md whitespace-nowrap ${activeTab === tab
                                ? "text-midnight-blue font-bold bg-glitter rounded-md"
                                : "text-gray-600 font-medium hover:text-midnight-blue"
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>
            {/* Content */}
            <main className="container mx-auto px-4 py-6">{renderContent()}</main>
        </div>
    );
};

export default DistributionOptions;