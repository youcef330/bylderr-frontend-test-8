import React from 'react'
import { Link } from 'react-router-dom';

const OwnedListingsCard = ({ propertyId = 1, size = 'lg', title, realType, location, ownership = 20, imgSrc, logoDev }) => {
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


    return (
        <div className={`${getSizeClass()} bg-white rounded-lg shadow-lg border overflow-hidden p-3 hover:border-midnight-blue`}>
            <Link to={`/listings/${propertyId}`} className="">
                <div className="relative inline-block">
                    <div className="w-full h-ful">
                        <img src={imgSrc} alt={title} className="object-cover w-full h-full rounded-t-lg aspect-[7/4]" />
                    </div>
                    <div className="p-4">
                        <div className="absolute bottom-1 left-1/8 mb-2">
                            <img
                                src={logoDev}
                                alt="Real Estate Logo"
                                className="w-auto h-12 bg-white	p-2 rounded-md shadow-lg"
                            />
                        </div>
                    </div>
                    <div className="absolute top-3 left-3">
                        <div className="flex items-center inline-block bg-white rounded-lg px-3 py-1 font-bold text-gray-600 text-s mb-4">
                            You own {ownership} shares
                        </div>
                    </div>
                </div>

                <h2 className="text-lg text-gray-600 font-bold mb-1">{title}</h2>
                <p className="text-sm text-gray-600 mb-3">{location}</p>
                <div className="inline-block bg-gray-200 text-gray-800 rounded-sm px-3 py-1 text-xs mb-4">
                    {realType}
                </div>
            </Link>
        </div>
    )
}

export default OwnedListingsCard