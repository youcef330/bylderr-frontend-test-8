import React, { useState, useEffect } from "react";
import { fetchContactDetails, updateContactDetails } from "../../api/settingsApi";
import DebouncedButton from "../../utils/DebounceButton";
import sanitizeInput from "../../utils/sanitizeInput";

const ContactDetails = () => {
    const [editableDetails, setEditableDetails] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fallbackData = {
        phone: "123-456-7890",
        streetAddress: "123 Main St",
        unitNumber: "Apt 1",
        city: "Fallback City",
        state: "Fallback State",
        zipCode: "12345",
    };

    useEffect(() => {
        const loadContactDetails = async () => {
            try {
                const data = await fetchContactDetails();
                setEditableDetails(data);
            } catch (err) {
                console.error("Error fetching contact details:", err.message);
                setError("Failed to load contact details. Using fallback data.");
                setEditableDetails(fallbackData);
            } finally {
                setLoading(false);
            }
        };

        loadContactDetails();
    }, []);

    const toggleEdit = () => setIsEditing((prev) => !prev);

    const saveChanges = async () => {
        try {
            await updateContactDetails(editableDetails);
            setIsEditing(false);
        } catch (err) {
            console.error("Error saving contact details:", err.message);
            setError("Failed to save changes.");
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditableDetails((prev) => ({
            ...prev,
            [name]: sanitizeInput(value),
        }));
    };

    if (loading) {
        return (
            <div className="p-4 rounded-md shadow-md">
                <h3 className="text-lg font-semibold text-gray-700">Contact Details</h3>
                <p>Loading contact details...</p>
            </div>
        );
    }

    return (
        <div className="bg-white border-2 rounded-lg shadow-lg">
            <div className="p-5 space-y-4">
                <h3 className="text-lg font-semibold text-gray-700">Contact Details</h3>
                {error && (
                    <div className="bg-yellow-50 border border-yellow-500 text-yellow-700 p-2 rounded mb-4">
                        {error}
                    </div>
                )}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    <input
                        type="text"
                        name="phone"
                        value={editableDetails.phone}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        placeholder="Enter your phone number"
                        className={`mt-1 p-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${!isEditing ? "bg-gray-100" : ""
                            }`}
                    />
                </div>
                <h3 className="font-semibold text-gray-700">Address</h3>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Street Address</label>
                    <input
                        type="text"
                        name="streetAddress"
                        value={editableDetails.streetAddress}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        placeholder="Enter your street address"
                        className={`mt-1 p-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${!isEditing ? "bg-gray-100" : ""
                            }`}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Unit Number</label>
                    <input
                        type="text"
                        name="unitNumber"
                        value={editableDetails.unitNumber}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        placeholder="Enter your unit number"
                        className={`mt-1 p-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${!isEditing ? "bg-gray-100" : ""
                            }`}
                    />
                </div>
                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">City</label>
                        <input
                            type="text"
                            name="city"
                            value={editableDetails.city}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            placeholder="Enter your city"
                            className={`mt-1 p-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${!isEditing ? "bg-gray-100" : ""
                                }`}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">State</label>
                        <input
                            type="text"
                            name="state"
                            value={editableDetails.state}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            placeholder="Enter your state"
                            className={`mt-1 p-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${!isEditing ? "bg-gray-100" : ""
                                }`}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Zip Code</label>
                        <input
                            type="text"
                            name="zipCode"
                            value={editableDetails.zipCode}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            placeholder="Enter your zip code"
                            className={`mt-1 p-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${!isEditing ? "bg-gray-100" : ""
                                }`}
                        />
                    </div>
                </div>
                <div className="flex space-x-4">
                    <DebouncedButton onClick={toggleEdit}>
                        {isEditing ? "Cancel Edit" : "Edit Details"}
                    </DebouncedButton>
                    {isEditing && (
                        <DebouncedButton onClick={saveChanges}>Save Changes</DebouncedButton>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ContactDetails;