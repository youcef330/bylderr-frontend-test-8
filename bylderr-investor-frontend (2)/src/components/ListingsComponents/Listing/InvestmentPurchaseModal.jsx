import React, { useState, useEffect } from "react";
import formatToUSD from "../../../utils/formatToUSD";
import ListingModalHeader from "./ListingModalHeader";
import InputBox from "../../../utils/inputBox";
import { submitInvestment } from "../../../api/investmentApi";
import LoadingSpinner from "../../../utils/LoadingSpinner";

const InvestmentPurchaseModal = ({ onClose, investData, amountInvest }) => {
    const {
        propertyID,
        accountB,
        pricePerBlock,
        raised,
        raiseTarget,
        investment: minInvestment,
        estimate,
        roi,
        imgSrc,
        title,
        location,
        realType,
    } = investData;

    const [amount, setAmount] = useState(amountInvest);
    const [accountBalance] = useState(accountB);
    const [shares, setShares] = useState(0);
    const [remainingBalance, setRemainingBalance] = useState(accountBalance);
    const [error, setError] = useState("");
    const [raisedPercent] = useState(Math.round((raised / raiseTarget) * 100));
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState('');


    useEffect(() => {
        const amt = parseFloat(amount);
        if (isNaN(amt) || amt === 0) {
            setShares(0);
            setRemainingBalance(accountBalance);
            setError("");
            return;
        }

        if (amt < 0) {
            setError("Amount cannot be negative");
        } else if (amt < minInvestment) {
            setError(`Minimum investment is ${formatToUSD(minInvestment)}`);
        } else if (amt > accountBalance) {
            setError("Insufficient Funds");
        } else {
            setError("");
        }

        if (pricePerBlock) {
            setShares(amt / pricePerBlock);
            setRemainingBalance(accountBalance - amt);
        }
    }, [amount, accountBalance, pricePerBlock, minInvestment]);

    const handleConfirmPayment = async () => {
        if (error || isLoading) return;

        setIsLoading(true);
        setError("");

        try {
            const investmentData = {
                propertyID: parseInt(propertyID),
                amount: parseFloat(amount),
                sharePrice: pricePerBlock,
                shares: parseFloat((amount / pricePerBlock).toFixed(2)),
            };

            await submitInvestment(investmentData);


            setSuccess('Your investment has been successfully completed. Redirecting to the Property page...');
            setIsLoading(false);
            // Close modal after 2 seconds
            setTimeout(() => {
                onClose();
            }, 2000);
        } catch (err) {
            console.error("Transaction Error:", err.message);
            setError("Failed to process the transaction. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full">
                <div>
                    {/* Modal Header */}
                    <ListingModalHeader title="Investment Summary" onClose={onClose} />
                </div>

                {/* Modal Body */}
                <div className="p-6">
                    {/* Title and Account Balance */}
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold">Property Details</h2>
                        <p className="text-md">
                            Account Balance:{" "}
                            <span className="text-green-500">{formatToUSD(accountBalance)}</span>
                        </p>
                    </div>

                    {/* Property Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <img
                                src={imgSrc}
                                alt="Property"
                                className="rounded-lg w-full"
                            />
                        </div>
                        <div>
                            <p className="text-gray-700 font-semibold">{title}</p>
                            <p className="text-gray-500">{location}</p>
                            <p className="bg-gray-200 text-gray-600 px-2 py-1 rounded-md inline-block text-sm mt-2">
                                {realType}
                            </p>
                            <div className="text-sm mt-4">
                                <p className="text-gray-600">
                                    Remaining Opportunity:{" "}
                                    <span className="font-semibold">
                                        {raisedPercent}% of {formatToUSD(raiseTarget)}
                                    </span>
                                </p>
                                <p className="text-gray-600">
                                    Minimum Investment:{" "}
                                    <span className="font-semibold">
                                        {formatToUSD(minInvestment)}
                                    </span>
                                </p>
                                <p className="text-gray-600">
                                    Estimate:{" "}
                                    <span className="font-semibold">{formatToUSD(estimate)}</span>
                                </p>
                                <p className="text-gray-600">
                                    ROI: <span className="font-semibold">{roi}%</span>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Investment Details */}
                    <div className="mt-6">
                        <InputBox
                            id="amount"
                            type="number"
                            label="Amount"
                            placeholder="Enter amount"
                            value={amount}
                            onChange={(value) => setAmount(value)}
                            suffix="USD"
                            min="0"
                        />
                        {error && (
                            <div className="bg-yellow-50 border border-yellow-500 text-yellow-700 p-2 mt-2 rounded mb-4">
                                {error}
                            </div>
                        )}
                        {/* Success Message */}
                        {success && (
                            <div className="bg-green-50 border border-green-500 text-green-700 p-2 mt-2 rounded mb-4">
                                {success}
                            </div>
                        )}
                        <p className="text-gray-600 mt-2">
                            Shares: <span className="font-bold">{shares.toFixed(2)}</span>
                        </p>
                        <p className="text-gray-600 mt-2">
                            Account Balance After Investment:{" "}
                            {error === "" && (
                                <span className="font-bold text-green-500">
                                    {formatToUSD(remainingBalance)}
                                </span>
                            )}
                            {error && error === "Insufficient Funds" && (
                                <span className="font-bold text-red-500">
                                    {formatToUSD(remainingBalance)}
                                </span>
                            )}
                        </p>
                    </div>
                </div>

                {/* Modal Footer */}
                <div className="flex justify-between items-center px-6 py-4 border-t border-gray-300">
                    <button
                        onClick={onClose}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md"
                        disabled={isLoading}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleConfirmPayment}
                        disabled={error !== "" || isLoading}
                        className={`px-4 py-2 rounded-md ${error === "Insufficient Funds"
                            ? "bg-red-500 cursor-not-allowed"
                            : isLoading
                                ? "bg-indigo-500 cursor-not-allowed"
                                : "bg-midnight-blue hover:bg-blue-500"
                            } text-white flex items-center justify-center`}
                    >
                        {isLoading ? (
                            <div className=" mr-2">
                                <LoadingSpinner />
                            </div>
                        ) : null}
                        {error === "Insufficient Funds"
                            ? "Insufficient Funds"
                            : isLoading
                                ? "Processing..."
                                : "Confirm Payment"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InvestmentPurchaseModal;