import React, { useState } from "react";
import { saveScheduledPreferences } from "../../api/paymentPayoutApi";
import DebouncedButton from "../../utils/DebounceButton";

const ScheduleSettings = ({
    frequencies,
    selectedFrequency,
    isOpen,
    toggleDropdown,
    handleSelect,
    distributionDates,
    nextDistribution,
    estimatedAmount,
    selectedBank,
    bankList,
    isBankOpen,
    toggleBankDropdown,
    handleBankSelect,
}) => {
    const [confirmation, setConfirmation] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState(null);

    const savePreferences = async () => {
        const preferences = {
            frequency: selectedFrequency,
            selectedBank,
        };

        try {
            setIsSaving(true);
            setError(null);

            const data = await saveScheduledPreferences(preferences);
            if (data.success) {
                alert("Preferences successfully saved.");
                setConfirmation(false);
            } else {
                setConfirmation(false);
                throw new Error(data.message || "Failed to save preferences.");

            }
        } catch (err) {
            console.error("Error saving preferences:", err.message);
            setConfirmation(false);
            setError(err.response?.data?.message || "An error occurred while saving preferences.");
        } finally {
            setConfirmation(false);
            setIsSaving(false);
        }
    };

    const handleSaveClick = () => {
        if (!confirmation) {
            setConfirmation(true);
        } else {
            savePreferences();
        }
    };

    return (
        <div>
            <h3 className="font-bold text-lg">Schedule</h3>

            {/* Frequency */}
            <div className="flex items-center space-x-4 mt-5">
                <p className="whitespace-nowrap">Frequency:</p>
                <div className="relative">
                    <button
                        className="text-md font-bold cursor-pointer bg-gray-300 text-black px-4 py-1 rounded-md hover:bg-gray-100"
                        onClick={toggleDropdown}
                    >
                        {selectedFrequency}
                    </button>
                    {isOpen && (
                        <div className="absolute left-0 top-full mt-1 w-60 bg-white border border-gray-300 rounded-md shadow-lg z-20">
                            {frequencies.map((freq) => (
                                <div
                                    key={freq}
                                    onClick={() => handleSelect(freq)}
                                    className="px-4 py-2 text-sm text-gray-800 hover:bg-gray-200 cursor-pointer"
                                >
                                    {freq}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Dates */}
            <div className="flex flex-row space-x-4 mt-5">
                <p className="whitespace-nowrap">Dates:</p>
                <strong>{distributionDates}</strong>
            </div>

            {/* Next Distribution */}
            <div className="flex flex-row space-x-4 mt-5">
                <p className="whitespace-nowrap">Next Distribution:</p>
                <strong>{nextDistribution}</strong>
            </div>

            {/* Estimated Amount */}
            <div className="flex flex-row space-x-4 mt-5">
                <p className="whitespace-nowrap">Estimated Amount:</p>
                <strong>{estimatedAmount}</strong>
            </div>

            {/* Distribution Method */}
            <h3 className="font-bold text-lg mt-5">Distribution Method:</h3>
            <div className="relative">
                <button
                    className="text-md font-bold cursor-pointer bg-gray-300 text-black mt-3 px-4 py-1 rounded-md hover:bg-gray-100"
                    onClick={toggleBankDropdown}
                >
                    {selectedBank}
                </button>
                {isBankOpen && (
                    <div className="absolute left-0 top-full mt-1 w-72 bg-white border border-gray-300 rounded-md shadow-lg z-20">
                        {bankList.map((bank) => (
                            <div
                                key={bank}
                                onClick={() => handleBankSelect(bank)}
                                className="px-4 py-2 text-sm text-gray-800 hover:bg-gray-200 cursor-pointer"
                            >
                                {bank}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Error */}
            {error && (
                <div className="bg-yellow-50 border border-yellow-500 text-yellow-700 p-2 rounded mt-5">
                    {error}
                </div>
            )}

            {/* Confirmation */}
            {confirmation && (
                <div className="bg-yellow-50 border border-yellow-500 text-yellow-700 p-2 rounded mt-5">
                    <p>Are you sure you want to save these changes?</p>
                    <p>You won't be able to modify your preferences again for 7 days.</p>
                </div>
            )}

            {/* Save Changes Button */}
            <div className="mt-10 flex space-x-4">
                <DebouncedButton onClick={handleSaveClick} disabled={isSaving}>
                    {isSaving ? "Saving..." : confirmation ? "Confirm Save" : "Save Changes"}
                </DebouncedButton>
                {confirmation && (
                    <DebouncedButton onClick={() => setConfirmation(false)} disabled={isSaving}>
                        Cancel
                    </DebouncedButton>
                )}
            </div>
        </div>
    );
};

export default ScheduleSettings;