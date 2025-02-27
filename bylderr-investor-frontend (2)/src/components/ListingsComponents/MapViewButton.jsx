import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const MapViewButton = () => {
    return (
        <Link to="/ListingsMap" className="flex max-h-xs items-center m-3 px-6 py-3 border-2 border-gray-300 rounded-full hover:border-gray-400">
            {/* Icon */}
            <FontAwesomeIcon icon={faMapMarkedAlt} className="text-2xl text-indigo-900 mr-3" />
            {/* Text */}
            <span className="text-xs font-bold text-gray-900">Map View</span>
        </Link>
    );
};

export default MapViewButton;