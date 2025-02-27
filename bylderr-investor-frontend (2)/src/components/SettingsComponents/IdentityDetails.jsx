import React, { useState, useEffect } from "react";
import { fetchUserIdentityDetails } from "../../api/settingsApi";

const IdentityDetails = () => {
    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fallbackData = {
        firstName: "John",
        lastName: "Doe",
        dob: "1990-01-01",
        ssn: "XXX-XX-XXXX",
        validIdNum: "123456789",
        entityName: "Real Estate Dev Corp.",
        ein: "00-0000000",
    };

    useEffect(() => {
        const loadUserDetails = async () => {
            try {
                const data = await fetchUserIdentityDetails();
                setUserDetails(data);
            } catch (err) {
                setError("Failed to load identity details. Using fallback data.");
                setUserDetails(fallbackData);
            } finally {
                setLoading(false);
            }
        };

        loadUserDetails();
    }, []);

    if (loading) {
        return (
            <div className="p-4 rounded-md shadow-md">
                <h3 className="text-lg font-semibold text-gray-700">Identity Details</h3>
                <p>Loading identity details...</p>
            </div>
        );
    }

    return (
        <div className="bg-white border-2 rounded-lg shadow-lg">
            <div className="p-5 space-y-2">
                <h3 className="text-lg font-semibold text-gray-700">Identity Details</h3>
                {error && (
                    <div className="bg-yellow-50 border border-yellow-500 text-yellow-700 p-2 rounded mb-4">
                        {error}
                    </div>
                )}

                {/* Conditionally render sections */}
                {userDetails?.firstName && userDetails?.lastName && (
                    <p>
                        <strong>Name:</strong> {userDetails.firstName} {userDetails.lastName}
                    </p>
                )}

                {userDetails?.dob && (
                    <p>
                        <strong>Date of Birth:</strong> {userDetails.dob}
                    </p>
                )}

                {userDetails?.ssn && (
                    <p>
                        <strong>SSN:</strong> {userDetails.ssn}
                    </p>
                )}

                {userDetails?.validIdNum && (
                    <p>
                        <strong>Valid ID Number:</strong> {userDetails.validIdNum}
                    </p>
                )}

                {userDetails?.entityName && (
                    <p>
                        <strong>Entity Name:</strong> {userDetails.entityName}
                    </p>
                )}

                {userDetails?.ein && (
                    <p>
                        <strong>Employer Identification Number (EIN):</strong> {userDetails.ein}
                    </p>
                )}
            </div>
        </div>
    );
};

export default IdentityDetails;