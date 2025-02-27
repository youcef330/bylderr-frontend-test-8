import React from 'react';

const DeveloperInfo = ({ developerInfo }) => {
    if (!developerInfo) return null;

    const { name, listingCount, joinedYear } = developerInfo;

    return (
        <div className="py-5 border-t border-b border-gray-500 mt-10 flex space-x-5 text-gray-500">
            {/* Property Name */}
            <span className="flex flex-col text-left text-lg">
                <span className="font-bold">Listed by {name}</span>
                <div className="space-x-5">
                    <span>{listingCount} Listings</span>
                    <span>Member Since {joinedYear}</span>
                </div>
            </span>
        </div>
    );
};

export default DeveloperInfo;