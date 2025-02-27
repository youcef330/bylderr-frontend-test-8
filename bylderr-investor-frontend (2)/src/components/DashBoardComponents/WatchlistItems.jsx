import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { addWatchlistProperty, removeWatchlistProperty } from '../../api/dashboardApi';

const WatchlistItems = ({ propertyName, fundsRaised, propertyId, onError }) => {
    const [isFilled, setIsFilled] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const handleHeartClick = async (event) => {
        event.preventDefault();
        event.stopPropagation();
        const action = isFilled ? 'remove' : 'add';
        setIsLoading(true);


        if (import.meta.env.VITE_REACT_APP_AUTH_MODE == 'mock') {
            setIsFilled(!isFilled);
            setIsLoading(false);
        } else {
            try {
                if (action === 'add') {
                    await addWatchlistProperty(propertyId);
                } else {
                    await removeWatchlistProperty(propertyId);
                }

                setIsFilled(!isFilled);
            } catch (err) {
                console.error(err.message);
                onError(`Failed to ${action} the property: ${propertyName}.`);
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <td>
            <Link to={`/Listings/${propertyId}`} className="">
                <div className="flex items-center justify-between p-4 border-b">
                    <div>
                        <p className="font-bold">{propertyName}</p>
                        <p className="text-sm text-gray-600">{fundsRaised}</p>
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
            </Link>
        </td>
    );
};

export default WatchlistItems;