import React from 'react';
import LocationDropdown from './LocationDropdown';
import PriceRangeDropdown from './PriceRangeDropdown';
import PropertyTypeDropdown from './PropertyTypeDropdown';
import ROIRangeDropdown from './ROIRangeDropdown';

const SearchFilter = ({ onLocationChange, onPriceRangeChange, onPropertyTypeChange, onROIPriceChange }) => {
    return (
        <div className="flex items-center border border-gray-300 rounded-md p-1 my-5 bg-white mx-4">
            <LocationDropdown onChange={onLocationChange} />
            <PriceRangeDropdown onChange={onPriceRangeChange} />
            <PropertyTypeDropdown onChange={onPropertyTypeChange} />
            <ROIRangeDropdown onChange={onROIPriceChange} />
        </div>
    );
};

export default SearchFilter;