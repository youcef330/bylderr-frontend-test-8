import React, { useState, useEffect } from 'react';
import { fetchListings } from '../api/listingsApi';
import SearchFilter from '../components/ListingsComponents/SearchFilter';
import ListingsGrid from '../components/ListingsComponents/ListingsGrid';
import { listingsMockData } from '../mockData/listingsMockData';
import MapViewButton from '../components/ListingsComponents/MapViewButton';


/**
 * ListingsScreen Component
 * Displays a screen for searching and viewing property listings.
 */

const ListingsScreen = () => {
    // State variables for filters and data
    const [location, setLocation] = useState(''); // Location filter
    const [priceRange, setPriceRange] = useState({ min: 0, max: Infinity }); // Price range filter
    const [roiRange, setRoiRange] = useState({ min: 0, max: Infinity }); // ROI range filter
    const [propertyTypes, setPropertyTypes] = useState(0); // Bitmask for property types
    const [listings, setListings] = useState([]); // Fetched or filtered listings
    const [status, setStatus] = useState('idle'); // Loading state: 'idle', 'loading', 'succeeded', 'failed', 'mock'
    const [error, setError] = useState(null); // Error state

    /**
     * Fetch listings from the API or use mock data in case of an error.
     */
    const fetchListingsData = async () => {
        setStatus('loading');
        setError(null);
        if (import.meta.env.VITE_REACT_APP_AUTH_MODE == 'mock') {
            let filteredData = listingsMockData;

            // Apply filters
            if (location) {
                filteredData = filteredData.filter((property) =>
                    property.location.toLowerCase().includes(location.toLowerCase())
                );
            }

            if (typeof priceRange.min === 'number' && typeof priceRange.max === 'number') {
                filteredData = filteredData.filter((property) => {
                    const investmentValue = parseFloat(property.estimate);
                    return (
                        !isNaN(investmentValue) &&
                        investmentValue >= priceRange.min &&
                        investmentValue <= priceRange.max
                    );
                });
            }

            if (typeof roiRange.min === 'number' && typeof roiRange.max === 'number') {
                filteredData = filteredData.filter((property) => {
                    const roiValue = parseFloat(property.roi);
                    return (
                        !isNaN(roiValue) &&
                        roiValue >= roiRange.min &&
                        roiValue <= roiRange.max
                    );
                });
            }

            if (propertyTypes && propertyTypes !== 0) {
                const propertyTypeMap = {
                    Industrial: 1,
                    Medical: 2,
                    Hospitality: 4,
                    Office: 8,
                    Retail: 16,
                    SingleFamily: 32,
                    Multifamily: 64,
                    Construction: 128,
                    Land: 256,
                };

                filteredData = filteredData.filter((property) => {
                    const propertyTypeBit = propertyTypeMap[property.realType];
                    return (
                        propertyTypeBit !== undefined &&
                        (propertyTypes & propertyTypeBit) === propertyTypeBit
                    );
                });
            }

            setListings(filteredData);
            setStatus('succeeded');
        } else {
            try {
                const filters = {
                    location,
                    minPrice: priceRange.min,
                    maxPrice: priceRange.max,
                    minROI: roiRange.min,
                    maxROI: roiRange.max,
                    propertyTypes,
                };
                const response = await fetchListings(filters);

                if (response.data && Array.isArray(response.data.listings)) {
                    setListings(response.data.listings);
                    setStatus('succeeded');
                } else {
                    throw new Error('Invalid data format received from the server.');
                }
            } catch (error) {
                console.error('Error fetching listings:', error.message);
                setError('Failed to fetch listings. Using mock data.');
                let filteredData = listingsMockData;

                // Apply filters
                if (location) {
                    filteredData = filteredData.filter((property) =>
                        property.location.toLowerCase().includes(location.toLowerCase())
                    );
                }

                if (typeof priceRange.min === 'number' && typeof priceRange.max === 'number') {
                    filteredData = filteredData.filter((property) => {
                        const investmentValue = parseFloat(property.estimate);
                        return (
                            !isNaN(investmentValue) &&
                            investmentValue >= priceRange.min &&
                            investmentValue <= priceRange.max
                        );
                    });
                }

                if (typeof roiRange.min === 'number' && typeof roiRange.max === 'number') {
                    filteredData = filteredData.filter((property) => {
                        const roiValue = parseFloat(property.roi);
                        return (
                            !isNaN(roiValue) &&
                            roiValue >= roiRange.min &&
                            roiValue <= roiRange.max
                        );
                    });
                }

                if (propertyTypes && propertyTypes !== 0) {
                    const propertyTypeMap = {
                        Industrial: 1,
                        Medical: 2,
                        Hospitality: 4,
                        Office: 8,
                        Retail: 16,
                        SingleFamily: 32,
                        Multifamily: 64,
                        Construction: 128,
                        Land: 256,
                    };

                    filteredData = filteredData.filter((property) => {
                        const propertyTypeBit = propertyTypeMap[property.realType];
                        return (
                            propertyTypeBit !== undefined &&
                            (propertyTypes & propertyTypeBit) === propertyTypeBit
                        );
                    });
                }

                setListings(filteredData);
                setStatus('succeeded');
            }
        }
    };

    useEffect(() => {
        fetchListingsData();
    }, [location, priceRange, propertyTypes, roiRange]);

    const handleLocationChange = (newLocation) => setLocation(newLocation);
    const handlePriceRangeChange = (min, max) => setPriceRange({ min, max });
    const handleROIPriceChange = (min, max) => setRoiRange({ min, max });
    const handlePropertyTypeChange = (selectedBitmask) => setPropertyTypes(selectedBitmask);

    return (
        <div className="h-screen overflow-auto">
            {/* Search Filter */}
            <SearchFilter
                onLocationChange={handleLocationChange}
                onPriceRangeChange={handlePriceRangeChange}
                onPropertyTypeChange={handlePropertyTypeChange}
                onROIPriceChange={handleROIPriceChange}
            />

            {/* Title and Map View Button */}
            <div className="flex justify-between px-5 pt-5">
                <h1 className="font-bold lg:text-2xl sm:text-sm">Explore Opportunities</h1>
                <div className="hidden sm:block">
                    <MapViewButton />
                </div>
            </div>
            <div className='px-5'>
                {error && (
                    <div className="bg-yellow-50 border border-yellow-500 text-yellow-700 p-2 rounded mb-4">
                        {error}
                    </div>
                )}
            </div>

            {/* Listings Grid */}
            <div className="flex-1 overflow-y-auto">
                <ListingsGrid listings={listings} status={status} error={error} />
            </div>
        </div>
    );
};

export default ListingsScreen;

