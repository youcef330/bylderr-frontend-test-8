import React, { useState, useRef, useEffect } from "react";

const Dropdown = ({ options, selectedOption, onSelect, displayValue, renderDisplay }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-left cursor-pointer hover:bg-gray-50 focus:outline-none"
            >
                <div>
                    {renderDisplay ? (
                        renderDisplay(selectedOption)
                    ) : (
                        <>
                            <span className="block text-sm font-medium text-gray-700">
                                {selectedOption.name || selectedOption.bankName || displayValue}
                            </span>
                            {selectedOption.accountInfo && (
                                <span className="block text-xs text-gray-500">
                                    {selectedOption.accountInfo}
                                </span>
                            )}
                        </>
                    )}
                </div>
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
                <div className="absolute left-0 top-full mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-20">
                    {options.map((option) => (
                        <div
                            key={option.id}
                            onClick={() => {
                                onSelect(option);
                                setIsOpen(false);
                            }}
                            className="px-4 py-2 text-sm text-gray-800 hover:bg-gray-200 cursor-pointer flex items-center"
                        >
                            <div>
                                <span>{option.name || option.bankName}</span>
                                {option.accountInfo && (
                                    <span className="block text-xs text-gray-500">
                                        {option.accountInfo}
                                    </span>
                                )}
                                {option.routingNumber && (
                                    <span className="block text-xs text-gray-500">
                                        Routing Number: {option.routingNumber}
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dropdown;