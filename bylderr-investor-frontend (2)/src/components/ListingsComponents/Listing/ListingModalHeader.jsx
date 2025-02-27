import React, { useState } from 'react';
import AddFundsModal from '../../AddFunds/AddFundsModal';

const ListingModalHeader = ({ title, onClose }) => {
    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);
    return (
        <div className="flex items-center justify-between px-4 py-2 border-b border-gray-300">
            <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
            <div className='flex flex-row space-x-10'>
                <button
                    className="items-center text-sm cursor-pointer mx-5 bg-midnight-blue text-white px-3 py-1 rounded-full hover:bg-blue-100"
                    onClick={openModal}
                >
                    Add Funds
                </button>

                <AddFundsModal isOpen={isModalOpen} onClose={closeModal} />
                <button
                    onClick={onClose}
                    className="text-gray-500 hover:text-gray-800 focus:outline-none"
                >
                    &times;
                </button>
            </div>
        </div>
    );
};

export default ListingModalHeader;