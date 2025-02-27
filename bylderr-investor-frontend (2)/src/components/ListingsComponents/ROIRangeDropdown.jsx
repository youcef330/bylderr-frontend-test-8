import React, { useState, useRef, useEffect } from 'react';

const predefinedROIs = [0, 5, 10, 15, 20, 25, 30, 50, 75, 100];

const formatROI = (roi) => `${roi}%`;

const ROIRangeDropdown = ({ onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [minROI, setMinROI] = useState('');
    const [maxROI, setMaxROI] = useState('');
    const [roiRange, setROIRange] = useState('Select ROI Range');
    const [errorMessage, setErrorMessage] = useState('');
    const [showMinOptions, setShowMinOptions] = useState(false);
    const [showMaxOptions, setShowMaxOptions] = useState(false);
    const dropdownRef = useRef(null);

    // Toggle the dropdown
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
        setErrorMessage('');
    };

    // Handle ROI input changes
    const handleMinROIChange = (e) => setMinROI(e.target.value);
    const handleMaxROIChange = (e) => setMaxROI(e.target.value);

    // Set predefined ROI value
    const selectMinROI = (roi) => {
        setMinROI(roi);
        setShowMinOptions(false);
    };
    const selectMaxROI = (roi) => {
        setMaxROI(roi);
        setShowMaxOptions(false);
    };

    // Validate ROI and set the range
    const applyROIRange = () => {
        const minNum = parseFloat(minROI);
        const maxNum = parseFloat(maxROI);

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

        setROIRange(`${formatROI(minNum)} - ${formatROI(maxNum)}`);
        setIsOpen(false);
        setErrorMessage('');
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
                ROI Range
            </label>
            <button
                onClick={toggleDropdown}
                className="flex items-center justify-between w-full text-gray-700 focus:outline-none"
            >
                {roiRange}
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
                    <div className="mb-4">
                        <label
                            htmlFor="minROI"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Min ROI
                        </label>
                        <input
                            type="number"
                            id="minROI"
                            value={minROI}
                            onChange={handleMinROIChange}
                            onFocus={() => setShowMinOptions(true)}
                            onBlur={() =>
                                setTimeout(() => setShowMinOptions(false), 200)
                            }
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                            placeholder="Enter minimum ROI"
                        />
                        {showMinOptions && (
                            <div className="max-h-40 overflow-y-auto border border-gray-300 rounded-md absolute z-20 bg-white mt-1">
                                {predefinedROIs.map((roi) => (
                                    <button
                                        key={roi}
                                        onClick={() => selectMinROI(roi)}
                                        className="block w-full text-left px-2 py-1 hover:bg-indigo-100"
                                    >
                                        {formatROI(roi)}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="maxROI"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Max ROI
                        </label>
                        <input
                            type="number"
                            id="maxROI"
                            value={maxROI}
                            onChange={handleMaxROIChange}
                            onFocus={() => setShowMaxOptions(true)}
                            onBlur={() =>
                                setTimeout(() => setShowMaxOptions(false), 200)
                            }
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                            placeholder="Enter maximum ROI"
                        />
                        {showMaxOptions && (
                            <div className="max-h-40 overflow-y-auto border border-gray-300 rounded-md absolute z-20 bg-white mt-1">
                                {predefinedROIs.map((roi) => (
                                    <button
                                        key={roi}
                                        onClick={() => selectMaxROI(roi)}
                                        className="block w-full text-left px-2 py-1 hover:bg-indigo-100"
                                    >
                                        {formatROI(roi)}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                    {errorMessage && (
                        <p className="text-red-600">{errorMessage}</p>
                    )}
                    <button
                        onClick={applyROIRange}
                        className="w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                    >
                        Apply
                    </button>
                </div>
            )}
        </div>
    );
};

export default ROIRangeDropdown;