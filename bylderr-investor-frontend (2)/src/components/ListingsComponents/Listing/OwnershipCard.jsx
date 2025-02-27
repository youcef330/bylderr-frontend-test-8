import React, { useState } from 'react';
import formatToUSD from '../../../utils/formatToUSD';
import SellSharesModal from './SellSharesModal';

const OwnershipCard = ({ ownershipData }) => {
    if (!ownershipData) return null;

    const { blocksOwn, paidPrice, currentPrice, accountBalance, title, location, realType, imgSrc } = ownershipData;

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="relative">
            <div className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto mt-8 text-center">
                <h2 className="font-bold text-gray-700 text-lg text-center">
                    You Own {blocksOwn} Blocks
                </h2>
                <div className="text-gray-500 text-sm mb-4">
                    You paid an average of {formatToUSD(paidPrice)} / block
                </div>

                <div className="bg-gray-100 text-blue-900 font-bold py-3 px-4 rounded-md text-center mb-4">
                    {formatToUSD(currentPrice)} / block
                    <div className="text-gray-500 text-sm">Current Market Rate</div>
                </div>

                <button
                    className="bg-midnight-blue text-white w-full py-3 rounded-md font-bold  hover:bg-blue-800"
                    onClick={handleOpenModal}
                >
                    Sell
                </button>
            </div>

            {isModalOpen && (
                <SellSharesModal
                    onClose={handleCloseModal}
                    ownershipData={{
                        blocksOwn,
                        currentPrice,
                        accountBalance,
                        title,
                        location,
                        realType,
                        imgSrc
                    }}
                />
            )}
        </div>
    );
};

export default OwnershipCard;