import React, { useState, useEffect } from "react";
import formatToUSD from "../../../utils/formatToUSD";
import ListingModalHeader from "./ListingModalHeader";
import InputBox from "../../../utils/inputBox";
import { sellInvestments } from "../../../api/investmentApi";
import LoadingSpinner from "../../../utils/LoadingSpinner";

const SellSharesModal = ({ onClose, ownershipData }) => {
    const {
        blocksOwn = 0,
        currentPrice = 0,
        accountBalance = 0,
        title = "",
        location = "",
        realType = "",
        imgSrc = "",
    } = ownershipData || {};

    const [sharesToSell, setSharesToSell] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const [proceeds, setProceeds] = useState(0);
    const [fees, setFees] = useState(0);
    const [proceedsAfterFees, setProceedsAfterFees] = useState(0);
    const [newBalance, setNewBalance] = useState(accountBalance);

    const feeRate = 0.02;

    useEffect(() => {
        const shares = parseFloat(sharesToSell);
        if (isNaN(shares) || shares <= 0) {
            setProceeds(0);
            setFees(0);
            setProceedsAfterFees(0);
            setError("");
            setNewBalance(accountBalance);
            return;
        }

        if (shares > blocksOwn) {
            setError("You do not have enough shares to sell.");
            setProceeds(0);
            setFees(0);
            setProceedsAfterFees(0);
            setNewBalance(accountBalance);
        } else {
            setError("");
            const calcProceeds = shares * currentPrice;
            const calcFees = calcProceeds * feeRate;
            const calcProceedsAfterFees = calcProceeds - calcFees;

            setProceeds(calcProceeds);
            setFees(calcFees);
            setProceedsAfterFees(calcProceedsAfterFees);
            setNewBalance(accountBalance + calcProceedsAfterFees);
        }
    }, [sharesToSell, blocksOwn, currentPrice, accountBalance]);

    const handleConfirmSale = async () => {
        if (!sharesToSell) {
            setError("Please enter the number of shares to sell.");
            return;
        }

        if (error || isLoading) return;

        setIsLoading(true);
        setError("");
        setSuccess("");

        try {
            const saleData = {
                shares: parseFloat(sharesToSell),
            };

            await sellInvestments(saleData);

            setSuccess("Your shares have been successfully Listed. Updating account...");
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


    if (!ownershipData) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full">
                {/* Modal Header */}
                <ListingModalHeader title="Sell Shares" onClose={onClose} />

                {/* Modal Body */}
                <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold">Your Shares</h2>
                        <p className="text-md">
                            Account Balance:{" "}
                            <span className="text-green-500">{formatToUSD(accountBalance)}</span>
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <img src={imgSrc} alt="Property" className="rounded-lg w-full" />
                        </div>
                        <div>
                            <p className="text-gray-700 font-semibold">{title}</p>
                            <p className="text-gray-500">{location}</p>
                            <p className="bg-gray-200 text-gray-600 px-2 py-1 rounded-md inline-block text-sm mt-2">
                                {realType}
                            </p>
                            <div className="text-sm mt-4">
                                <p className="text-gray-600">
                                    You Own: <span className="font-semibold">{blocksOwn} shares</span>
                                </p>
                                <p className="text-gray-600">
                                    Current Price per Share:{" "}
                                    <span className="font-semibold">{formatToUSD(currentPrice)}</span>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6">
                        <InputBox
                            id="sharesToSell"
                            type="number"
                            label="Shares to Sell"
                            placeholder="Enter number of shares"
                            value={sharesToSell}
                            onChange={(value) => setSharesToSell(value)}
                            suffix="Shares"
                            min="0"
                        />
                        {error && (
                            <div className="bg-yellow-50 border border-yellow-500 text-yellow-700 p-2 mt-2 rounded mb-4">
                                {error}
                            </div>
                        )}
                        {success && (
                            <div className="bg-green-50 border border-green-500 text-green-700 p-2 mt-2 rounded mb-4">
                                {success}
                            </div>
                        )}
                        {proceeds > 0 && (
                            <p className="text-gray-600 mt-2">
                                Proceeds: <span className="font-bold">{formatToUSD(proceeds)}</span>
                            </p>
                        )}
                        {fees > 0 && (
                            <p className="text-gray-600 mt-2">
                                Fees (2%): <span className="font-bold">{formatToUSD(fees)}</span>
                            </p>
                        )}
                        {proceedsAfterFees > 0 && (
                            <p className="text-gray-600 mt-2">
                                Proceeds After Fees:{" "}
                                <span className="font-bold">{formatToUSD(proceedsAfterFees)}</span>
                            </p>
                        )}
                        {error === "" && proceedsAfterFees > 0 && (
                            <p className="text-gray-600 mt-2">
                                Account Balance After Sale:{" "}
                                <span className="font-bold text-green-500">
                                    {formatToUSD(newBalance)}
                                </span>
                            </p>
                        )}
                    </div>
                </div>

                <div className="flex justify-between items-center px-6 py-4 border-t border-gray-300">
                    <button
                        onClick={onClose}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md"
                        disabled={isLoading}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleConfirmSale}
                        disabled={error !== "" || isLoading || !sharesToSell}
                        className={`px-4 py-2 rounded-md ${error
                            ? "bg-red-500 cursor-not-allowed"
                            : isLoading
                                ? "bg-indigo-500 cursor-not-allowed"
                                : "bg-midnight-blue hover:bg-blue-500"
                            } text-white flex items-center justify-center`}
                    >
                        {isLoading ? (
                            <div className="mr-2">
                                <LoadingSpinner />
                            </div>
                        ) : null}
                        {isLoading ? "Processing..." : "Sell Shares"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SellSharesModal;