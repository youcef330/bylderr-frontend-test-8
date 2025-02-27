import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { addDeveloper, removeDeveloper } from '../../api/dashboardApi';

const DeveloperItem = ({ devName, units, totalRaised, devId, onError }) => {
    const [isFilled, setIsFilled] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleHeartClick = async () => {
        const action = isFilled ? 'remove' : 'add';
        setIsLoading(true);
        setError(null);


        if (import.meta.env.VITE_REACT_APP_AUTH_MODE == 'mock') {
            setIsFilled(!isFilled);
            setIsLoading(false);
        } else {
            try {
                if (isFilled) {
                    await removeDeveloper(devId);
                } else {
                    await addDeveloper(devId);
                }
                setIsFilled(!isFilled);
            } catch (err) {
                console.error(`Failed to ${action} developer:`, err.message);
                const errorMessage = `Failed to ${action} the developer: ${devName}.`;
                setError(errorMessage);
                onError && onError(errorMessage);
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <td>
            <div className="flex items-center justify-between p-4 border-b">
                <div>
                    <p className="font-bold">{devName}</p>
                    <div className="text-sm text-gray-600">
                        <span>{units} units</span> • <span className="text-green-500">{totalRaised}</span>
                    </div>
                </div>
                <div className="relative">
                    <button
                        onClick={handleHeartClick}
                        className="text-red-500 text-2xl cursor-pointer"
                    >
                        <FontAwesomeIcon icon={isFilled ? solidHeart : regularHeart} />
                    </button>
                    {isLoading && (
                        <div className="absolute right-0 mt-1 text-xs text-gray-500">
                            {isFilled ? 'Removing...' : 'Adding...'}
                        </div>
                    )}
                </div>
            </div>
        </td>
    );
};

export default DeveloperItem;