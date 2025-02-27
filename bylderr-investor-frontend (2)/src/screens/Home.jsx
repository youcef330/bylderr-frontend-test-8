import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    fetchUserProfileData as apiFetchUserProfileData,
    fetchListingsData as apiFetchListingsData,
} from "../api/homeApi";

const mockListingsData = [
    { id: 1, to:"/profile", name: "Investment Update:", update: "Your portfolio increased by 5%." },
    { id: 2, to:"/Listings/2", name: "New Opportunity:", update: "New Property available for investment." },
    { id: 3, to:"/account/payments", name: "Account Activity:", update: "$1,000 deposited into your account." },
    { id: 4, to:"/Listings/1", name: "Investment Update:", update: "Property B met the fund goal." },
];

const mockProfileData = {
    name: "Lionel Messi",
    email: "lionel.messi@example.com",
    role: "Developer",
    avatar: "https://placehold.co/500.png?text=UserImage",
};

const mockFetchUserProfileData = () =>
    new Promise((resolve) => {
        setTimeout(() => {
            resolve({ ...mockProfileData });
        }, 500);
    });

const mockFetchListingsData = () =>
    new Promise((resolve) => {
        setTimeout(() => {
            resolve([...mockListingsData]);
        }, 500);
    });

const Home = () => {
    const [user, setUser] = useState(null);
    const [listings, setListings] = useState([]);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [loadingProfile, setLoadingProfile] = useState(true);
    const [loadingListings, setLoadingListings] = useState(true);
    const [errorProfile, setErrorProfile] = useState(null);
    const [errorListings, setErrorListings] = useState(null);

    const backgrounds = {
        hero: "https://media.gettyimages.com/id/1412803631/photo/guangzhou-cityscape-in-the-morning.jpg?s=2048x2048&w=gi&k=20&c=5mobv2lDeITCzYDBtUJ2l_hZZsK-aMGEhVgp9HGUXpg=",
        heroDark:
            "https://media.gettyimages.com/id/1053948844/photo/new-york-downtown-skyline-aerial-view-after-sunset.jpg?s=2048x2048&w=gi&k=20&c=PXEqJqtr9bVJsgE6pwgDZPlk3QBXBEf4wvCXf-HBcXs=",
    };

    const useMock = import.meta.env.VITE_REACT_APP_AUTH_MODE === 'mock';

    const fetchUserProfile = useMock ? mockFetchUserProfileData : apiFetchUserProfileData;
    const fetchListings = useMock ? mockFetchListingsData : apiFetchListingsData;

    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

        const handleThemeChange = () => {
            setIsDarkMode(mediaQuery.matches);
        };

        handleThemeChange();

        mediaQuery.addEventListener("change", handleThemeChange);

        return () => {
            mediaQuery.removeEventListener("change", handleThemeChange);
        };
    }, []);

    useEffect(() => {
        const getProfileData = async () => {
            try {
                const profileData = await fetchUserProfile();
                setUser(profileData);
            } catch (error) {
                console.error("Error fetching profile data:", error);
                setErrorProfile("Failed to load profile data.");
            } finally {
                setLoadingProfile(false);
            }
        };

        const getListingsData = async () => {
            try {
                const listingsData = await fetchListings();
                setListings(listingsData);
            } catch (error) {
                console.error("Error fetching listings data:", error);
                setErrorListings("Failed to load listings data.");
            } finally {
                setLoadingListings(false);
            }
        };

        getProfileData();
        getListingsData();
    }, [fetchUserProfile, fetchListings]);

    const isScrollable = listings.length > 4;

    return (
        <div
            className="min-h-screen flex flex-col md:flex-row bg-center bg-no-repeat bg-cover"
            style={{
                backgroundImage: `url(${isDarkMode ? backgrounds.heroDark : backgrounds.hero})`,
                backgroundAttachment: "fixed",
            }}
        >
            <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8 bg-white bg-opacity-70 dark:bg-dark-cardBg dark:bg-opacity-70 backdrop-filter backdrop-blur-sm">
                {loadingProfile ? (
                    <>
                        <h2 className="text-4xl font-bold mb-4 text-center">
                            Welcome Back{user?.name ? `, ${user.name}` : ""}!
                        </h2>
                        <p className="text-gray-500 dark:text-dark-text">Loading profile...</p>
                    </>
                ) : errorProfile ? (
                    <p className="text-red-500 dark:text-red-400">{errorProfile}</p>
                ) : (
                    <>
                        <h2 className="text-4xl font-bold mb-4 text-center">
                            Welcome Back{user?.name ? `, ${user.name}` : ""}!
                        </h2>
                        <p className="text-lg mb-6 text-center">
                            Unlock exclusive investment opportunities and connect with a diverse portfolio of properties tailored for success.
                            Our streamlined platform simplifies decision-making, enabling you to identify standout investments and grow your wealth with confidence.
                        </p>

                        <div className="flex flex-wrap gap-4 justify-center">
                            <Link
                                to="/listings"
                                className="inline-flex items-center justify-center px-6 py-3 text-white font-semibold rounded-lg shadow-md
                                 bg-gradient-to-r from-midnight-blue to-blue-800
                                 hover:from-blue-800 hover:to-midnight-blue
                                 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600
                                 transition-transform transform hover:scale-105 active:scale-95"
                            >
                                Find New Investments
                            </Link>

                            <Link
                                to="/dashboard"
                                className="inline-flex items-center justify-center px-6 py-3 text-white font-semibold rounded-lg shadow-md
                                 bg-gradient-to-r from-midnight-blue to-blue-800
                                 hover:from-blue-800 hover:to-midnight-blue
                                 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600
                                 transition-transform transform hover:scale-105 active:scale-95"
                            >
                                Go to your Dashboard
                            </Link>
                        </div>
                    </>
                )}
            </div>

            <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8 bg-white bg-opacity-70 dark:bg-dark-cardBg dark:bg-opacity-70 backdrop-filter backdrop-blur-lg">
                <h3 className="text-3xl font-bold mb-6 text-center">Key Updates</h3>
                {loadingListings ? (
                    <p className="text-gray-500 dark:text-dark-text">Loading listings...</p>
                ) : errorListings ? (
                    <p className="text-red-500 dark:text-red-400">{errorListings}</p>
                ) : listings.length === 0 ? (
                    <p className="text-gray-700 dark:text-gray-300 text-center">
                        You have no listings yet.
                    </p>
                ) : (
                    <div
                        className={`w-full max-w-md mx-auto ${isScrollable ? "max-h-80 overflow-y-auto" : ""}`}
                    >
                        <ul className="space-y-4">
                            {listings.map((listing) => (
                                <li
                                    key={listing.id}
                                    className="bg-white dark:bg-dark-cardBg bg-opacity-50 dark:bg-opacity-30 p-4 rounded-lg shadow hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors duration-200"
                                >
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h4 className="text-lg font-semibold">{listing.name}</h4>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Update: <span className="font-medium">{listing.update}</span>
                                            </p>
                                        </div>
                                        <Link
                                            to={listing.to}
                                            className="text-midnight-blue font-medium hover:underline"
                                        >
                                            View Details
                                        </Link>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );

};

export default Home;
