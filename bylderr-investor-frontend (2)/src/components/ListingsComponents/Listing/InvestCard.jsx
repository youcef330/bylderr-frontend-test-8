import React, { useState } from 'react';
import formatToUSD from '../../../utils/formatToUSD';
import InvestmentPurchaseModal from './InvestmentPurchaseModal';
import InputBox from '../../../utils/inputBox';

const InvestCard = ({ investData }) => {
    const [amount, setAmount] = useState('');
    const [isModalOpen, setModalOpen] = useState(false);

    if (!investData) return null;

    const { address, pricePerBlock } = investData;

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
            <h2 className="font-bold text-gray-700 text-center text-lg">
                Invest in {address}
            </h2>
            <div className="text-gray-500 text-xl text-center mb-4">
                {formatToUSD(pricePerBlock)} / block
            </div>

            <div>
                <InputBox
                    id="amount"
                    type="number"
                    label="Amount"
                    placeholder="Enter Amount"
                    value={amount}
                    onChange={(value) => setAmount(value)}
                    suffix="USD"
                    min="0"
                />
            </div>

            <div className="text-center text-gray-500 mb-2">Or Select</div>

            <div className="grid grid-cols-3 gap-4 mb-4">
                {[100, 500, 1000].map((value) => (
                    <button
                        key={value}
                        onClick={() => setAmount(value)}
                        className="border border-gray-300 rounded-lg py-2 px-4 text-gray-700"
                    >
                        {formatToUSD(value)}
                    </button>
                ))}
            </div>

            <button
                onClick={handleOpenModal}
                className="bg-midnight-blue text-white w-full py-3 rounded-md hover:bg-blue-800"
            >
                Continue
            </button>

            {isModalOpen && (
                <InvestmentPurchaseModal
                    investData={investData}
                    amountInvest={amount}
                    sharePrice={pricePerBlock}
                    onClose={handleCloseModal}

                />
            )}

            <div className="text-center text-gray-500 mt-2">
                You won’t be charged yet
            </div>
        </div>
    );
};

export default InvestCard;
