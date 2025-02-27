import React from 'react';

const ManagementButton = ({ type, onClick }) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className="items-center text-md cursor-pointer bg-midnight-blue text-white px-4 py-1 rounded-md hover:bg-blue-500"
        >
            {type}
        </button>
    );
};

export default ManagementButton;