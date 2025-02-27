import React from 'react';

const ModalHeader = ({ title, onClose }) => (
    <div className="flex items-center justify-between px-4 py-2 border-b border-gray-300">
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
        <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 focus:outline-none"
        >
            &times;
        </button>
    </div>
);

export default ModalHeader;