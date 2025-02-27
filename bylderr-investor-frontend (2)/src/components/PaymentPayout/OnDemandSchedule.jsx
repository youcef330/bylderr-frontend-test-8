import React, { useState } from "react";
import { requestWithdrawal } from "../../api/paymentPayoutApi";
import DebouncedButton from "../../utils/DebounceButton";
import formatToUSD from "../../utils/formatToUSD";
import BankDropdown from "./BankDropdown";
import InputBox from "../../utils/inputBox";

const OnDemandSchedule = ({ ammountToWithdrawl, banks }) => {
    const [withdrawalAmount, setWithdrawalAmount] = useState("");
    const [selectedBank, setSelectedBank] = useState("Chase Bank - **** **** **** 1234");
    const [error, setError] = useState("");
    const [confirmation, setConfirmation] = useState(false);
    const [loading, setLoading] = useState(false);

    const validateWithdrawal = () => {
        if (!withdrawalAmount) {
            setError("Withdrawal amount is required.");
            return false;
        }
        if (isNaN(withdrawalAmount)) {
            setError("Withdrawal amount must be a number.");
            return false;
        }
        const amountNum = Number(withdrawalAmount);
        if (amountNum <= 0) {
            setError("Withdrawal amount must be greater than zero.");
            return false;
        }
        if (amountNum > ammountToWithdrawl) {
            setError("Insufficient funds available.");
            return false;
        }
        return true;
    };

    const handleRequestWithdrawal = async () => {
        if (!validateWithdrawal()) return;

        if (!confirmation) {
            setConfirmation(true);
            return;
        }

        setLoading(true);
        try {
            const response = await requestWithdrawal({
                amount: withdrawalAmount,
                bank: selectedBank,
            });

            if (response.success) {
                alert("Funds have been sent to your account successfully.");
                setWithdrawalAmount("");
                setError("");
                setConfirmation(false);
            } else {
                throw new Error(response.message || "Failed to request withdrawal.");
            }
        } catch (err) {
            console.error("Error requesting withdrawal:", err.message);
            setError(err.response?.data?.message || "An unexpected error occurred. Please try again.");
        } finally {
            setLoading(false);
            setConfirmation(false);
        }
    };

    return (
        <div className="bg-white space-y-4 p-6 rounded-md shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800">Request On-Demand Withdrawal</h3>
            <div className="flex flex-row space-x-5 items-center">
                <h4 className="font-medium">Available Balance:</h4>
                <span className="text-green-500">{formatToUSD(ammountToWithdrawl)}</span>
            </div>
            <p className="text-sm text-gray-600">
                Use this form to request a withdrawal from your available balance. Please note that this action will transfer funds to the selected bank account.
            </p>

            <InputBox
                id="withdrawal-amount"
                type="number"
                label="Amount to Withdraw (USD)"
                placeholder="Enter amount"
                value={withdrawalAmount}
                onChange={(val) => {
                    setWithdrawalAmount(val);
                    if (error) setError("");
                }}
                min="0"
                suffix={"USD"}
            />

            <div className="mt-4">
                <h4 className="font-medium text-gray-700">Select Bank Account:</h4>
                <BankDropdown banks={banks} selectedBank={selectedBank} onSelect={setSelectedBank} />
            </div>
            {/* Error Message */}
            {error && (
                <div className="bg-yellow-50 border border-yellow-500 text-yellow-700 p-2 rounded mt-5">
                    {error}
                </div>
            )}

            {/* Confirmation Message */}
            {confirmation && (
                <div className="bg-yellow-50 border border-yellow-500 text-yellow-700 p-2 rounded mt-4">
                    <p>
                        Are you sure you want to request a withdrawal of {formatToUSD(Number(withdrawalAmount))} to the following account?
                    </p>
                    <p className="font-semibold">{selectedBank}</p>
                    <p>This action cannot be undone.</p>
                </div>
            )}

            {/* Buttons */}
            <div className="flex space-x-4 mt-4">
                <DebouncedButton onClick={handleRequestWithdrawal} disabled={loading}>
                    {loading ? "Processing..." : confirmation ? "Confirm Withdrawal" : "Request Withdrawal"}
                </DebouncedButton>
                {confirmation && (
                    <DebouncedButton onClick={() => setConfirmation(false)} disabled={loading}>
                        Cancel
                    </DebouncedButton>
                )}
            </div>
        </div>
    );
};

export default OnDemandSchedule;