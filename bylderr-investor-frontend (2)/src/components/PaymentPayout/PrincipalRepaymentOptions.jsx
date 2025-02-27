import React, { useState, useRef, useEffect } from "react";
import InfoButtonModal from "../../utils/InfoButtonModal";

const PrincipalRepaymentOptions = ({ principalRepaymentOption = "reinvest", setPrincipalRepaymentOption }) => {
    const [selectedOption, setSelectedOption] = useState(principalRepaymentOption);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const options = [
        {
            value: "auto_distribute",
            label: "Automatically Distribute",
            description: "Principal repayments are automatically transferred to your bank account as funds become available.",
        },
        {
            value: "reinvest",
            label: "Reinvest",
            description: "Principal repayments are automatically reinvested into similar investments.",
        },
        {
            value: "accumulate",
            label: "Accumulate Until Maturity",
            description: "Principal repayments are held and paid out as a lump sum when the investment ends.",
        },
        {
            value: "manual_request",
            label: "Manual Disbursement",
            description: "Principal remains in your account until you manually request a payout.",
        },
    ];

    const currentOption = options.find((o) => o.value === selectedOption);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        setPrincipalRepaymentOption(selectedOption);
    }, [selectedOption, setPrincipalRepaymentOption]);

    const handleToggleDropdown = () => {
        setIsOpen((prev) => !prev);
    };

    const handleSelectOption = (value) => {
        setSelectedOption(value);
        setIsOpen(false);
    };

    const otherOptions = options.filter((option) => option.value !== selectedOption);

    return (
        <div className="relative mt-5 w-full" ref={dropdownRef}>
            <div className="flex flex-row justify-between">
                <p className="font-medium mb-2">Principal Repayment Options:</p>
                <InfoButtonModal
                    title="Principal Repayment"
                    description="Principal repayment is the return of your original investment over time. Choose how to manage these funds: transfer to your bank, reinvest for growth, or save them until the investment ends. Tailor the option to match your financial strategy."
                />
            </div>

            <button
                onClick={handleToggleDropdown}
                className="w-full text-left px-4 py-2 border rounded-md focus:outline-none transition bg-gray-200 border-gray-300 font-bold"
            >
                <div className="flex items-center justify-between">
                    <span>{currentOption?.label}</span>
                    <span className="ml-2 transform transition-transform">
                        <svg
                            className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${isOpen ? "transform rotate-180" : ""
                                }`}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{currentOption?.description}</p>
            </button>

            {isOpen && (
                <div className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg">
                    {otherOptions.map((option) => (
                        <button
                            key={option.value}
                            className="w-full text-left px-4 py-2 hover:bg-gray-100 focus:outline-none"
                            onClick={() => handleSelectOption(option.value)}
                        >
                            <div className="font-medium">{option.label}</div>
                            <p className="text-sm text-gray-600 mt-1">{option.description}</p>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PrincipalRepaymentOptions;