import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import sanitizeInput from '../../utils/sanitizeInput';

const LocationSearch = ({ onLocationChange }) => {
    const [location, setLocation] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    // USA box
    const USA_BBOX = [-125.00165, 24.9493, -66.9326, 49.5904];

    // Function to handle search with sanitized input and restricted to the USA
    const handleSearch = async (query) => {
        const sanitizedQuery = sanitizeInput(query);
        try {
            const response = await axios.get(
                `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(sanitizedQuery)}.json`,
                {
                    params: {
                        access_token: import.meta.env.VITE_REACT_APP_TOKEN,
                        autocomplete: true,
                        types: 'place,postcode,address',
                        bbox: USA_BBOX.join(','),
                    },
                }
            );

            if (response.data.features.length) {
                const coordinates = response.data.features[0].geometry.coordinates;
                onLocationChange({ lng: coordinates[0], lat: coordinates[1], zoom: 10 });
            } else {
                alert('Location not found within the USA');
            }
        } catch (error) {
            console.error('Error fetching location:', error);
        }
    };

    // Handle input changes, sanitize input before making API requests, and limit suggestions to USA
    const handleInputChange = async (e) => {
        const query = e.target.value;
        setLocation(query);

        if (query.length > 2) {
            const sanitizedQuery = sanitizeInput(query);

            try {
                const response = await axios.get(
                    `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(sanitizedQuery)}.json`,
                    {
                        params: {
                            access_token: import.meta.env.VITE_REACT_APP_TOKEN,
                            autocomplete: true,
                            types: 'place,postcode,address',
                            limit: 5,
                            bbox: USA_BBOX.join(','),
                        },
                    }
                );

                setSuggestions(response.data.features);
                setIsDropdownVisible(true);
            } catch (error) {
                console.error('Error fetching suggestions:', error);
            }
        } else {
            setSuggestions([]);
            setIsDropdownVisible(false);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setLocation(suggestion.place_name);
        handleSearch(suggestion.place_name);
        setSuggestions([]);
        setIsDropdownVisible(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch(location);
        }
    };

    return (
        <div className="relative flex items-center w-1/3">
            <input
                type="text"
                placeholder="city, zip, address"
                value={location}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                className="w-full px-3 py-2 text-gray-500 placeholder-gray-400 border-none outline-none"
            />
            <button
                onClick={() => handleSearch(location)}
                className="w-20 h-10 bg-indigo-900 flex justify-center items-center text-white rounded-full"
            >
                <FontAwesomeIcon icon={faSearch} />
            </button>

            {isDropdownVisible && suggestions.length > 0 && (
                <ul className="absolute w-full bg-white border border-gray-300 mt-2 z-10 max-h-48 overflow-auto rounded shadow-lg" style={{ top: '100%' }}>
                    {suggestions.map((suggestion) => (
                        <li
                            key={suggestion.id}
                            className="px-4 py-2 hover:bg-indigo-100 cursor-pointer"
                            onClick={() => handleSuggestionClick(suggestion)}
                        >
                            {suggestion.place_name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default LocationSearch;