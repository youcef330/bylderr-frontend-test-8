import React from 'react'
import OwnedListingsCard from './OwnedListingsCard';

const OwnedListings = ({ properties, size = 'sm', threeCol = true }) => {
    return (
        <div className="flex overflow-x-auto space-x-5 py-4 ml-5">
            {properties.map((property, index) => (
                <div key={index} className="flex-shrink-0 w-full sm:w-full md:w-auto">
                    <OwnedListingsCard
                        size={size}
                        title={property.title}
                        ownership={property.ownership}
                        realType={property.realType}
                        location={property.location}
                        imgSrc={property.imgSrc}
                        logoDev={property.logoDev}
                        propertyId={property.propertyId}
                    />
                </div>
            ))}
        </div>
    )
}

export default OwnedListings