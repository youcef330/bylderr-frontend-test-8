import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { saveListing, unsaveListing } from '../../../api/listingsApi';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';

const SavePropertyButton = ({ initialSave = false, propertyId }) => {
    const [isSaved, setIsSaved] = useState(initialSave);
    const [error, setError] = useState(null);

    const handleClick = async () => {
        setError(null);
        if (import.meta.env.VITE_REACT_APP_AUTH_MODE == 'mock') {
            setIsSaved((prev) => !prev);
        } else {
            try {
                if (isSaved) {
                    await unsaveListing(propertyId);
                } else {
                    await saveListing(propertyId);
                }
                setIsSaved((prev) => !prev);
            } catch (err) {
                console.error("Error saving property:", err.message);
                setError("Failed to update saved status. Please try again.");
            }
        }
    };

    return (
        <div>
            <button
                onClick={handleClick}
                className="flex items-center  space-x-3 text-midnight-blue hover:text-blue-800"
            >
                {/* Error Message */}
                {error && (
                    <div className="bg-yellow-50 border border-yellow-500 text-yellow-700 p-2 rounded mt-2">
                        {error}
                    </div>
                )}
                {/* Icon */}
                <FontAwesomeIcon
                    icon={isSaved ? solidHeart : regularHeart}
                    className={`transition-colors duration-300 ${isSaved ? 'text-midnight-blue' : 'text-gray-500'
                        } text-3xl`}
                />
            </button>
        </div>
    );
};

export default SavePropertyButton;