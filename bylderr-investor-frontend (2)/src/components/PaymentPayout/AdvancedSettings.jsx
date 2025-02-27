import React, { useState } from "react";
import InputBox from "../../utils/inputBox";
import PrincipalRepaymentOptions from "./PrincipalRepaymentOptions";
import { saveAdvancedSettings } from "../../api/paymentPayoutApi";
import DebouncedButton from "../../utils/DebounceButton";

const AdvancedSettings = ({
    cap,
    setCap,
    min,
    setMin,
    errors,
    handleSubmit,
    notifications,
    handleToggle,
    principalRepaymentOption,
    setPrincipalRepaymentOption,
}) => {
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState(null);
    const [confirmation, setConfirmation] = useState(false);
    const savePreferences = async () => {
        const settings = {
            cap,
            min,
            notifications,
            principalRepaymentOption,
        };

        try {
            setIsSaving(true);
            setError(null);

            const response = await saveAdvancedSettings(settings);
            if (response.success) {
                alert("Advanced settings saved successfully.");
                setConfirmation(false);
            } else {
                throw new Error(response.message || "Failed to save settings.");
            }
        } catch (err) {
            console.error("Error saving settings:", err.message);
            setError(err.response?.data?.message || "An error occurred while saving settings.");
        } finally {
            setIsSaving(false);
            setConfirmation(false);
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
        <div className="w-full sm:mx-auto">
            <form onSubmit={handleSubmit}>
                <h3 className="font-bold text-lg">Advanced Settings</h3>

                {/* Distribution Cap */}
                <div className="mt-5">
                    <InputBox
                        id="distribution-cap"
                        type="number"
                        label="Distribution Cap:"
                        value={cap}
                        onChange={(val) => setCap(val)}
                        error={errors.cap}
                        min="0"
                        suffix="USD"
                        placeholder="Enter amount"
                        className={`${errors.cap ? "border-red-500" : "border-gray-300"} w-full`}
                    />
                </div>

                {/* Distribution Minimum */}
                <div className="mt-5">
                    <InputBox
                        id="distribution-minimum"
                        type="number"
                        label="Distribution Minimum:"
                        value={min}
                        onChange={(val) => setMin(val)}
                        error={errors.min}
                        min="0"
                        suffix="USD"
                        placeholder="Enter amount"
                        className={`${errors.min ? "border-red-500" : "border-gray-300"} w-full`}
                    />
                </div>
            </form>

            {/* Notifications */}
            <div className="flex flex-col sm:space-x-4 mt-5">
                <p className="whitespace-nowrap font-medium">Notifications:</p>
                <div className="space-x-2">
                    <button
                        className={`px-4 py-2 rounded-md border ${notifications.text
                                ? "bg-gray-300 font-bold text-black border-gray-300 hover:bg-gray-200"
                                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                            } focus:outline-none transition`}
                        onClick={() => handleToggle("text")}
                    >
                        Text
                    </button>
                    <button
                        className={`px-4 py-2 rounded-md border ${notifications.email
                                ? "bg-gray-300 font-bold text-black border-gray-300 hover:bg-gray-200"
                                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                            } focus:outline-none transition`}
                        onClick={() => handleToggle("email")}
                    >
                        Email
                    </button>
                    <button
                        className={`px-4 py-2 rounded-md border ${notifications.calendar
                                ? "bg-gray-300 font-bold text-black border-gray-300 hover:bg-gray-200"
                                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                            } focus:outline-none transition`}
                        onClick={() => handleToggle("calendar")}
                    >
                        Calendar
                    </button>
                </div>
            </div>

            {/* Principal Repayment Options */}
            <PrincipalRepaymentOptions
                principalRepaymentOption={principalRepaymentOption}
                setPrincipalRepaymentOption={setPrincipalRepaymentOption}
            />

            {/* Error Message */}
            {error && (
                <div className="bg-yellow-50 border border-yellow-500 text-yellow-700 p-2 rounded mt-5">
                    {error}
                </div>
            )}

            {/* Confirmation Message */}
            {confirmation && (
                <div className="bg-yellow-50 border border-yellow-500 text-yellow-700 p-2 rounded mt-5">
                    <p>Are you sure you want to save these settings?</p>
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

export default AdvancedSettings;