import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const ViewButton = () => {
    return (
        <Link to="/Listings" className="flex max-h-xs items-center m-3 px-6 py-3 border-2 border-gray-300 rounded-full hover:border-gray-400">
            {/* Icon */}
            <FontAwesomeIcon icon={faList} className="text-2xl text-indigo-900 mr-3" />
            {/* Text */}
            <span className="text-xs font-bold text-gray-900">List View</span>
        </Link>
    );
};

export default ViewButton;