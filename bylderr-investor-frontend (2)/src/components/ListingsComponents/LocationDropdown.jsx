import React, { useState, useRef, useEffect } from 'react';

const cities = {
    Phoenix: 'AZ',
    'Pompano Beach': 'FL',
    Evergreen: 'CO',
    'Los Angeles': 'CA',
    'San Francisco': 'CA',
    'Las Vegas': 'NV',
    'New York': 'NY',
    Miami: 'FL',
    Dallas: 'TX',
    Chicago: 'IL',
    Seattle: 'WA',
    Denver: 'CO',
};

const LocationDropdown = ({ onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCity, setSelectedCity] = useState('All Locations');
    const [searchTerm, setSearchTerm] = useState('');
    const dropdownRef = useRef(null);

    const toggleDropdown = () => setIsOpen((prev) => !prev);

    const handleCitySelect = (city) => {
        setSelectedCity(city);
        setIsOpen(false);
        setSearchTerm('');
        if (onChange) {
            onChange(city === 'All Locations' ? '' : city);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const filteredCities = Object.entries(cities).filter(
        ([city, state]) =>
            city.toLowerCase().includes(searchTerm.toLowerCase()) ||
            state.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div
            className="relative flex-1 px-4 py-2 border-r border-gray-300"
            ref={dropdownRef}
        >
            <label className="block text-sm font-bold text-black">Location</label>
            <button
                onClick={toggleDropdown}
                className="flex items-center justify-between w-full text-gray-700 focus:outline-none"
            >
                {selectedCity}
                <svg
                    className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${isOpen ? "transform rotate-180" : ""
                        }`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                    />
                </svg>
            </button>
            {isOpen && (
                <div className="absolute left-0 w-full bg-white border border-gray-300 rounded-lg shadow-md z-10 mt-1">
                    <div className="p-2">
                        <input
                            type="text"
                            placeholder="Search city or state..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div className="max-h-40 overflow-y-auto">
                        <button
                            onClick={() => handleCitySelect('All Locations')}
                            className="block w-full text-left px-2 py-1 hover:bg-indigo-100 font-bold"
                        >
                            All Locations
                        </button>
                        {filteredCities.length > 0 ? (
                            filteredCities.map(([city, state]) => (
                                <button
                                    key={city}
                                    onClick={() => handleCitySelect(`${city}, ${state}`)}
                                    className="block w-full text-left px-2 py-1 hover:bg-indigo-100"
                                >
                                    {city}, {state}
                                </button>
                            ))
                        ) : (
                            <p className="text-center text-gray-500 p-2">No matches found</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default LocationDropdown;