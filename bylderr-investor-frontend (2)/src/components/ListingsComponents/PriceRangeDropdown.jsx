import React, { useState, useRef, useEffect } from 'react';
import formatPrice from '../../utils/formatPrice';

const predefinedPrices = [
    0,
    50000,
    100000,
    250000,
    500000,
    750000,
    1000000,
    2000000,
    5000000,
    10000000,
    15000000,
    18000000,
];

const PriceRangeDropdown = ({ onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [priceRange, setPriceRange] = useState('Select Price Range');
    const [errorMessage, setErrorMessage] = useState('');
    const [showMinOptions, setShowMinOptions] = useState(false);
    const [showMaxOptions, setShowMaxOptions] = useState(false);
    const dropdownRef = useRef(null);

    // Toggle the dropdown
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
        setErrorMessage('');
    };

    // Handle price input changes
    const handleMinPriceChange = (e) => setMinPrice(e.target.value);
    const handleMaxPriceChange = (e) => setMaxPrice(e.target.value);

    // Set predefined price value
    const selectMinPrice = (price) => {
        setMinPrice(price);
        setShowMinOptions(false);
    };
    const selectMaxPrice = (price) => {
        setMaxPrice(price);
        setShowMaxOptions(false);
    };

    // Validate prices and set the price range
    const applyPriceRange = () => {
        const minNum = parseFloat(minPrice);
        const maxNum = parseFloat(maxPrice);

        // Validate the inputs
        if (
            isNaN(minNum) ||
            isNaN(maxNum) ||
            minNum < 0 ||
            maxNum < 0 ||
            minNum >= maxNum
        ) {
            setErrorMessage(
                'Please enter valid positive numbers for both fields, and Max must be greater than Min.'
            );
            return;
        }

        if (!isNaN(minNum) && !isNaN(maxNum)) {
            onChange(minNum, maxNum);
        }

        // Set price range if valid
        setPriceRange(`${formatPrice(minNum)} - ${formatPrice(maxNum)}`);
        setIsOpen(false);
        setErrorMessage('');
    };

    // Reset the price range to initial state
    const resetPriceRange = () => {
        setMinPrice('');
        setMaxPrice('');
        setPriceRange('Select Price Range');
        setErrorMessage('');
        onChange(0, Infinity);
        setIsOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsOpen(false);
                setShowMinOptions(false);
                setShowMaxOptions(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div
            className="relative flex-1 px-4 py-2 border-r border-gray-300"
            ref={dropdownRef}
        >
            <label className="block text-sm font-bold text-black">
                Property Price Range
            </label>
            <button
                onClick={toggleDropdown}
                className="flex items-center justify-between w-full text-gray-700 focus:outline-none"
            >
                {priceRange}
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
                <div className="absolute left-0 w-full p-4 bg-white border border-gray-300 rounded-lg shadow-md z-10 mt-1">
                    <div className="mb-4 relative">
                        <label
                            htmlFor="minPrice"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Min Price
                        </label>
                        <input
                            type="number"
                            id="minPrice"
                            value={minPrice}
                            onChange={handleMinPriceChange}
                            onFocus={() => setShowMinOptions(true)}
                            onBlur={() =>
                                setTimeout(() => setShowMinOptions(false), 200)
                            }
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                            placeholder="Enter minimum price"
                        />
                        {showMinOptions && (
                            <div className="max-h-40 overflow-y-auto border border-gray-300 rounded-md absolute z-20 bg-white mt-1 w-full">
                                {predefinedPrices.map((price) => (
                                    <button
                                        key={price}
                                        onClick={() => selectMinPrice(price)}
                                        className="block w-full text-left px-2 py-1 hover:bg-indigo-100"
                                    >
                                        {formatPrice(price)}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="mb-4 relative">
                        <label
                            htmlFor="maxPrice"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Max Price
                        </label>
                        <input
                            type="number"
                            id="maxPrice"
                            value={maxPrice}
                            onChange={handleMaxPriceChange}
                            onFocus={() => setShowMaxOptions(true)}
                            onBlur={() =>
                                setTimeout(() => setShowMaxOptions(false), 200)
                            }
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                            placeholder="Enter maximum price"
                        />
                        {showMaxOptions && (
                            <div className="max-h-40 overflow-y-auto border border-gray-300 rounded-md absolute z-20 bg-white mt-1 w-full">
                                {predefinedPrices.map((price) => (
                                    <button
                                        key={price}
                                        onClick={() => selectMaxPrice(price)}
                                        className="block w-full text-left px-2 py-1 hover:bg-indigo-100"
                                    >
                                        {formatPrice(price)}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                    {errorMessage && (
                        <p className="text-red-600 mb-2">{errorMessage}</p>
                    )}
                    <div className="flex space-x-2">
                        <button
                            onClick={applyPriceRange}
                            className="flex-1 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                        >
                            Apply
                        </button>
                        <button
                            onClick={resetPriceRange}
                            className="flex-1 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                        >
                            Reset
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PriceRangeDropdown;