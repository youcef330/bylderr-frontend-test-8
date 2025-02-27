import React, { useState, useRef, useEffect } from 'react';

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

const PropertyTypeDropdown = ({ onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedTypes, setSelectedTypes] = useState(0);
    const dropdownRef = useRef(null);
    const propertyTypes = Object.keys(propertyTypeMap);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleCheckboxChange = (type) => {
        const typeBit = propertyTypeMap[type];
        const newSelectedTypes =
            (selectedTypes & typeBit) === typeBit
                ? selectedTypes & ~typeBit
                : selectedTypes | typeBit;
        setSelectedTypes(newSelectedTypes);
        onChange(newSelectedTypes);
    };

    const displaySelectedTypes = () => {
        const selectedKeys = propertyTypes.filter(
            (type) =>
                (selectedTypes & propertyTypeMap[type]) === propertyTypeMap[type]
        );
        if (selectedKeys.length === 0) return 'Select Options';
        if (selectedKeys.length <= 2) return selectedKeys.join(', ');
        return `${selectedKeys.slice(0, 2).join(', ')}, ... (${selectedKeys.length})`;
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsOpen(false);
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
                Property Type
            </label>
            <button
                onClick={toggleDropdown}
                className="flex items-center justify-between w-full text-gray-700 focus:outline-none"
            >
                {displaySelectedTypes()}
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
                <div className="absolute left-0 w-full bg-white border border-gray-300 rounded shadow-md mt-1 z-10">
                    {propertyTypes.map((type) => (
                        <div key={type} className="px-4 py-2">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    className="form-checkbox h-4 w-4 text-indigo-600"
                                    checked={
                                        (selectedTypes & propertyTypeMap[type]) ===
                                        propertyTypeMap[type]
                                    }
                                    onChange={() => handleCheckboxChange(type)}
                                />
                                <span className="ml-2 text-gray-700">{type}</span>
                            </label>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PropertyTypeDropdown;