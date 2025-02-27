import React, { useState, useEffect } from "react";
import {
    fetchInvestmentPreferences,
    saveInvestmentPreferences,
} from "../../api/settingsApi";
import DebouncedButton from "../../utils/DebounceButton";
import InputBox from "../../utils/inputBox";
import LocationUpdate from "./LocationUpdate";
import UpdateTagList from "./UpdateTagList";
import UpdateSelectionComponent from "./UpdateSelectionComponent";

const UpdateInvestmentPreferences = () => {
    const [preferences, setPreferences] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [confirmation, setConfirmation] = useState(false);

    const fallbackData = {
        sliderValue: 3,
        investmentAmount: "100000",
        locations: [],
        selectionData: {
            commercial: ["Office", "Retail"],
            residential: ["Single-Family", "Multi-Family"],
            timeHorizon: ["Short-Term Investors"],
        },
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchInvestmentPreferences();
                setPreferences(data);
            } catch (err) {
                setPreferences(fallbackData);
                setError("Failed to load preferences. Using fallback data.");
            }
        };

        fetchData();
    }, []);

    const handleSliderChange = (value) => {
        setPreferences((prev) => ({ ...prev, sliderValue: value }));
    };

    const handleInvestmentAmountChange = (value) => {
        setPreferences((prev) => ({ ...prev, investmentAmount: value }));
    };

    const addLocation = (newLocation) => {
        setPreferences((prev) => ({
            ...prev,
            locations: [...prev.locations, { id: Date.now(), name: newLocation }],
        }));
    };

    const removeLocation = (id) => {
        setPreferences((prev) => ({
            ...prev,
            locations: prev.locations.filter((location) => location.id !== id),
        }));
    };

    const handleSavePreferences = async () => {
        if (!confirmation) {
            setConfirmation(true);
            return;
        }

        setLoading(true);
        setError("");
        setSuccess("");

        try {
            await saveInvestmentPreferences(preferences);
            setSuccess("Preferences successfully saved.");
            setConfirmation(false);
        } catch (err) {
            setError("An error occurred while saving standard notifications. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (!preferences) {
        return <div>Loading preferences...</div>;
    }

    return (
        <div className="bg-white border-2 rounded-lg shadow-lg w-auto mx-auto mb-10">
            <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-700 mb-5">Update Preferences</h2>

                {/* Error */}
                {error && (
                    <div className="bg-yellow-50 border border-yellow-500 text-yellow-700 p-2 rounded mb-4">
                        {error}
                    </div>
                )}

                {/* Success */}
                {success && (
                    <div className="bg-green-50 border border-green-500 text-green-700 p-2 rounded mb-4">
                        {success}
                    </div>
                )}

                {/* Risk Assessment */}
                <div className="mb-8">
                    <h3 className="text-lg font-semibold mb-4 text-gray-600">Risk Assessment</h3>
                    <div className="mx-10">
                        <input
                            type="range"
                            min="1"
                            max="9"
                            step="1"
                            value={preferences.sliderValue}
                            onChange={(e) => handleSliderChange(Number(e.target.value))}
                            className="w-full h-2 bg-midnight-blue rounded-lg appearance-none cursor-pointer mb-4"
                            style={{
                                backgroundImage: `linear-gradient(to right, #141b4d 0%, #141b4d ${((preferences.sliderValue - 1) * 12.5)}%, #f3f4f6 ${((preferences.sliderValue - 1) * 12.5)}%, #f3f4f6 100%)`,
                            }}
                        />
                    </div>
                </div>

                {/* Investment Amount */}
                <div className="mb-8">
                    <h3 className="text-lg font-semibold mb-4 text-gray-600">
                        Estimated Investment Annually
                    </h3>
                    <InputBox
                        id="investmentAmount"
                        type="number"
                        min="0"
                        placeholder="Enter investment amount"
                        value={preferences.investmentAmount}
                        onChange={handleInvestmentAmountChange}
                        suffix="USD"
                    />
                </div>

                {/* Types of Investments */}
                <UpdateSelectionComponent selectionData={preferences.selectionData} />

                {/* Interested Locations */}
                <LocationUpdate onAddLocation={addLocation} />
                <UpdateTagList locations={preferences.locations} onRemoveLocation={removeLocation} />

                {/* Confirmation */}
                {confirmation && (
                    <div className="bg-yellow-50 border border-yellow-500 text-yellow-700 p-2 my-5 rounded">
                        <p>Are you sure you want to save these changes?</p>
                        <p>You won't be able to modify your preferences again for 7 days.</p>
                    </div>
                )}

                {/* Confirm and Save Buttons */}
                <div className="flex space-x-4 mt-2">
                    <DebouncedButton onClick={handleSavePreferences} disabled={loading}>
                        {loading ? "Saving..." : confirmation ? "Confirm Save" : "Save Preferences"}
                    </DebouncedButton>
                    {confirmation && (
                        <DebouncedButton onClick={() => setConfirmation(false)} disabled={loading}>
                            Cancel
                        </DebouncedButton>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UpdateInvestmentPreferences;