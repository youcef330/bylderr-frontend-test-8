import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import formatToUSD from '../../utils/formatToUSD';

const PropertyCard = ({ size = 'lg', raised, raiseTarget, propertyId, title, realType, location, investment, estimate, roi, imgSrc }) => {
    const [isFilled, setIsFilled] = useState(false);
    const [raisedPercent] = useState(Math.round(raised / raiseTarget * 100));

    // Generate the max-width class based on the size 
    const getSizeClass = () => {
        switch (size) {
            case 'xs':
                return 'max-w-xs';
            case 'sm':
                return 'max-w-sm';
            case 'md':
                return 'max-w-md';
            case 'lg':
                return 'max-w-lg';
            case 'xl':
                return 'max-w-xl';
            default:
                return 'max-w-sm';
        }
    };

    const handleHeartClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsFilled(!isFilled);
    };

    return (
        <div className={`${getSizeClass()} bg-white rounded-lg shadow-lg overflow-hidden p-3`}>
            <Link to={`/Listings/${propertyId}`}>
                <div className="relative">
                    <div className="absolute top-3 right-3 text-2xl text-gray-600 cursor-pointer" onClick={handleHeartClick}>
                        <FontAwesomeIcon icon={isFilled ? solidHeart : regularHeart} />
                    </div>
                </div>
                <div className="w-full h-ful">
                    <img src={imgSrc} alt={title} className="object-cover w-full h-full rounded-t-lg aspect-[7/4]" />
                </div>
                <h2 className="text-lg text-gray-600 font-bold mb-1">{title}</h2>
                <p className="text-sm text-gray-600 mb-3">{location}</p>
                <div className="inline-block bg-gray-200 text-gray-800 rounded-sm px-3 py-1 text-xs mb-4">
                    {realType}
                </div>
                <hr className="bg-gray-200 mb-3 h-0.5 border-t-0 opacity-100" />
                <div className="text-sm text-gray-700">
                    <p>Remaining Opportunity: <strong>{raisedPercent}%</strong> of <strong>{formatToUSD(raiseTarget)}</strong></p>
                    <p>Minimum Investment: <strong>{formatToUSD(Number(investment))}</strong></p>
                    <p>Bestimate: <strong>{formatToUSD(estimate)}</strong></p>
                    <p>Expected ROI: <strong>{roi}%</strong></p>
                </div>
            </Link>
        </div>
    );
};

export default PropertyCard;