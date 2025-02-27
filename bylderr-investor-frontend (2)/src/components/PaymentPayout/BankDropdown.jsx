import React, { useState, useRef, useEffect } from "react";

const BankDropdown = ({ banks, selectedBank, onSelect }) => {
    const [isBankOpen, setIsBankOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleBankDropdown = () => {
        setIsBankOpen(!isBankOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsBankOpen(false);
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
                className="text-md font-bold cursor-pointer bg-gray-300 text-black mt-3 px-4 py-1 rounded-md hover:bg-gray-100"
                onClick={toggleBankDropdown}
            >
                {selectedBank}
            </button>

            {/* Dropdown Menu Bank */}
            {isBankOpen && (
                <div className="absolute left-0 top-full mt-1 w-72 bg-white border border-gray-300 rounded-md shadow-lg z-20">
                    {banks.map((bank) => (
                        <div
                            key={bank}
                            onClick={() => {
                                onSelect(bank);
                                setIsBankOpen(false);
                            }}
                            className="px-4 py-2 text-sm text-gray-800 hover:bg-gray-200 cursor-pointer"
                        >
                            {bank}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default BankDropdown;