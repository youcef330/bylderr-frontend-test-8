import React, { useState, useEffect } from 'react';
import { fetchListings } from '../api/listingsApi';
import MapBox from '../components/ListingsComponents/MapBox';
import ListingsGrid from '../components/ListingsComponents/ListingsGrid';
import SearchFilter from '../components/ListingsComponents/SearchFilter';
import MapViewButton from '../components/ListingsComponents/MapViewButton';
import { listingsMockData } from '../mockData/listingsMockData';

/**
 * ListingsMap Component
 * Displays a map with listings and a grid of property listings with search filters.
 */
const ListingsMap = () => {
    // State for map coordinates
    const [coordinates, setCoordinates] = useState({ lng: -100, lat: 38.5, zoom: 3 });

    // State variables for filters and data
    const [location, setLocation] = useState('');
    const [priceRange, setPriceRange] = useState({ min: 0, max: Infinity });
    const [roiRange, setRoiRange] = useState({ min: 0, max: Infinity });
    const [propertyTypes, setPropertyTypes] = useState(0);
    const [listings, setListings] = useState([]);
    const [status, setStatus] = useState('idle');
    const [error, setError] = useState(null);

    /**
     * Fetch listings from the API or use mock data in case of an error.
     */
    const fetchListingsData = async () => {
        setStatus('loading');
        setError(null);

        try {
            const filters = {
                location,
                minPrice: priceRange.min,
                maxPrice: priceRange.max,
                minROI: roiRange.min,
                maxROI: roiRange.max,
                propertyTypes,
            };

            // Make API request
            const response = await fetchListings(filters);

            // Validate response
            if (response.data && Array.isArray(response.data.listings)) {
                setListings(response.data.listings);
                setStatus('succeeded');
            } else {
                throw new Error('Invalid data format received from the server.');
            }
        } catch (err) {
            console.error('Error fetching listings:', err);

            // Handle error by using mock data
            setError('Failed to fetch listings. Using mock data.');
            let filteredData = listingsMockData;

            // Apply filters to the mock data
            if (location) {
                filteredData = filteredData.filter((property) =>
                    property.location.toLowerCase().includes(location.toLowerCase())
                );
            }

            if (typeof priceRange.min === 'number' && typeof priceRange.max === 'number') {
                filteredData = filteredData.filter((property) => {
                    const investmentValue = parseFloat(
                        String(property.estimate).replace(/[\$,]/g, '')
                    );
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
    };

    // Trigger fetchListings when filters change
    useEffect(() => {
        fetchListingsData();
    }, [location, priceRange, propertyTypes, roiRange]);

    // Handlers for filter changes
    const handleLocationChange = (newLocation) => setLocation(newLocation);
    const handlePriceRangeChange = (min, max) => setPriceRange({ min, max });
    const handleROIPriceChange = (min, max) => setRoiRange({ min, max });
    const handlePropertyTypeChange = (selectedBitmask) => setPropertyTypes(selectedBitmask);

    return (
        <div className="flex flex-col h-screen bg-white">
            {/* Search Filter */}
            <SearchFilter
                onLocationChange={handleLocationChange}
                onPriceRangeChange={handlePriceRangeChange}
                onROIPriceChange={handleROIPriceChange}
                onPropertyTypeChange={handlePropertyTypeChange}
            />

            {/* Title and Map View Button */}
            <div className="flex justify-between px-10 pt-5">
                <h1 className="font-bold lg:text-2xl sm:text-sm">
                    Explore Opportunities
                </h1>
                <div className="hidden sm:block">
                    <MapViewButton />
                </div>
            </div>

            {/* Error */}
            {error && (
                <div className="px-10">
                    <div className="bg-yellow-50 border border-yellow-500 text-yellow-700 p-2 rounded mb-4">
                        {error}
                    </div>
                </div>
            )}

            {/* Main Content Area */}
            <div className="flex flex-1 overflow-hidden px-10">
                {/* MapBox Component */}
                <div className="w-1/2 h-full mx-4">
                    <MapBox
                        lng={coordinates.lng}
                        lat={coordinates.lat}
                        zoom={coordinates.zoom}
                        addresses={listings.map((listing) => ({
                            id: listing.propertyId,
                            title: listing.title,
                            location: listing.location,
                            roi: listing.roi,
                            estimate: listing.estimate,
                            investment: listing.investment,
                            imgSrc: listing.imgSrc,
                            lng: listing.longitude,
                            lat: listing.latitude,
                        }))}
                    />
                </div>

                {/* Scrollable Container for ListingsGrid */}
                <div className="w-1/2 overflow-y-auto p-2">
                    <ListingsGrid
                        listings={listings}
                        status={status}
                        error={error}
                        size="xs"
                        threeCol={false}
                    />
                </div>
            </div>
        </div>
    );
};

export default ListingsMap;
