import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { fetchProfileData } from '../api/profileApi';
import InfoCard from '../components/ProfileComponents/InfoCard';
import OwnedListings from '../components/ProfileComponents/OwnedListings';
import ActivityFeed from '../components/ProfileComponents/ActivityFeed';
import formatToUSD from '../utils/formatToUSD';

import { faDollarSign, faBriefcase, faSackDollar, faMoneyBillTrendUp } from '@fortawesome/free-solid-svg-icons';

const FALLBACK_PROFILE_DATA = {
    userName: 'User',
    dividend: 0,
    totalFunds: 0,
    investedPropertiesCount: 0,
    payout: 0,
    payDate: "11/11/11",
    properties: [
        {
            propertyId: 1,
            title: 'Owned',
            location: 'N/A',
            realType: 'N/A',
            imgSrc: 'https://placehold.co/500?text=NA',
            logoDev: 'https://placehold.co/200x50?text=NA',
            ownership: 'N/A',
        },
    ],
    activities: [

        {
            description: 'Invested in Luxury Beach House',
            date: '12/01/24',
            link: '/owned-listing/2',
        },
        {
            description: 'Dividend payout received',
            date: '11/28/24',
            link: '/account/payments',
        },
        {
            description: 'Updated profile settings',
            date: '11/15/24',
            link: '/Settings',
        },
    ],
};


const Mock_PROFILE_DATA = {
    userName: 'Messi',
    dividend: 3000,
    totalFunds: 300000,
    investedPropertiesCount: 4,
    payout: 3000,
    payDate: "11/11/11",
    properties: [
        {
            propertyId: 1,
            title: '3 Bed / 3 Bath Short Term Rental',
            location: '4324 E Stanford Dr',
            realType: 'Residential',
            imgSrc: 'https://placehold.co/500?text=Short Term Rental',
            logoDev: 'https://placehold.co/200x50?text=Developer',
            ownership: '200',
        },
    ],
    activities: [

        {
            description: 'Invested in Luxury Beach House',
            date: '12/01/24',
            link: '/owned-listing/2',
        },
        {
            description: 'Dividend payout received',
            date: '11/28/24',
            link: '/account/payments',
        },
        {
            description: 'Updated profile settings',
            date: '11/15/24',
            link: '/Settings',
        },
    ],
};


const Profile = () => {
    const [profileData, setProfileData] = useState(FALLBACK_PROFILE_DATA);
    const [status, setStatus] = useState('idle');
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const loadProfileData = async () => {
            setStatus('loading');
            setError(null);
            if (import.meta.env.VITE_REACT_APP_AUTH_MODE == 'mock') {
                setProfileData(Mock_PROFILE_DATA);
                setStatus('mock');
            } else {
                try {
                    const data = await fetchProfileData();

                    if (data && data.user && Array.isArray(data.properties)) {
                        setProfileData({
                            userName: data.user.name,
                            dividend: data.user.dividend,
                            totalFunds: data.user.totalFunds,
                            investedPropertiesCount: data.user.investedPropertiesCount,
                            properties: data.properties,
                            activities: data.activities || [],
                            payout: data.payout || 0,
                            payDate: data.payDate || "N/A",
                        });
                        setStatus('succeeded');
                    } else {
                        throw new Error('Invalid data format received from the server.');
                    }
                } catch (err) {
                    console.error('Error fetching profile data:', err.message);
                    setError('Failed to load profile data. Using fallback data.');
                    setProfileData(FALLBACK_PROFILE_DATA);
                    setStatus('failed');
                }
            }
        };

        loadProfileData();
    }, []);

    const handleActivityClick = (path) => {
        if (path) navigate(path);
    };

    const { userName, dividend, totalFunds, investedPropertiesCount, properties, activities, payDate, payout } = profileData;

    return (
        <>
            <div className="px-10 pt-5 pb-5 min-h-screen">
                <h1 className="font-bold text-3xl pb-2">Welcome, {userName}</h1>

                {error && (
                    <div className="bg-yellow-50 border border-yellow-500 text-yellow-700 p-2 rounded mb-4">
                        {error}
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-10 py-5">
                    <InfoCard
                        icon={faDollarSign}
                        topLabel="You’ve Earned"
                        mainValue={formatToUSD(dividend)}
                        bottomLabel="In Dividends"
                        showChevron={false}
                    />
                    <InfoCard
                        icon={faSackDollar}
                        topLabel="You have"
                        mainValue={formatToUSD(totalFunds)}
                        bottomLabel="in Your Account"
                        showChevron={false}
                    />
                    <InfoCard
                        icon={faBriefcase}
                        topLabel="You’ve Invested in"
                        mainValue={investedPropertiesCount}
                        bottomLabel="Properties"
                        showChevron={false}
                    />
                    <InfoCard
                        icon={faMoneyBillTrendUp}
                        topLabel="Next Payout"
                        mainValue={formatToUSD(payout)}
                        bottomLabel={`on ${payDate}`}
                        showChevron={false}
                    />
                </div>

                <h2 className="font-bold text-xl pb-2">Your Investments</h2>
                {properties.length > 0 ? (
                    <OwnedListings properties={properties} />
                ) : (
                    <div className="text-gray-500 italic py-2 mb-10">
                        You currently have no investments. Start investing to see your properties here.
                    </div>
                )}

                <h2 className="font-bold text-xl py-4">Recent Activity</h2>
                {activities.length > 0 ? (
                    <ActivityFeed
                        activities={activities.map((activity) => ({
                            ...activity,
                            onClick: () => handleActivityClick(activity.link),
                        }))}
                    />
                ) : (
                    <div className="text-gray-500 italic py-2">
                        No recent activity to display. Engage with your investments to see updates here.
                    </div>
                )}
            </div>
        </>
    );
};

export default Profile;