import React from 'react';

const PriceActions = ({ pricePerShare }) => {
    return (
        <div className="flex items-center justify-center space-x-4 h-12 w-full sm:w-2/5 px-4 bg-gray-100 rounded-md">
            {/* Price Info */}
            <div className="text-right">
                <p className="block text-md text-midnight-blue font-bold">${pricePerShare} / block</p>
            </div>
        </div>
    );
};

export default PriceActions;