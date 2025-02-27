import React from 'react';
import PropertyCard from './PropertyCard';

const ListingsGrid = ({ listings, status, error, size = 'lg', threeCol = true }) => {
    if (status === 'loading') {
        return <p>Loading listings...</p>;
    }
    if (status === 'failed') {
        return <p className="text-red-600">{error}</p>;
    }
    if (!Array.isArray(listings)) {
        return <p className="text-red-600">Unexpected data format received.</p>;
    }
    if (listings.length === 0) {
        return <p>No listings found matching your criteria.</p>;
    }

    return (
        <>
            <div
                className={`mb-10 mx-1 mt-2 ${threeCol
                        ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'
                        : 'grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-5'
                    }`}
            >
                {listings.map((property, index) => (
                    <PropertyCard key={index} {...property} size={size} />
                ))}
            </div>
        </>
    );
};

export default ListingsGrid;