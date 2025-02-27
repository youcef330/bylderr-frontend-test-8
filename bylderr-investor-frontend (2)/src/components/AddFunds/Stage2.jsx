import React, { useState } from 'react';
import { addFunds } from '../../api/depositApi';
import StepsIcon from './StepsIcon';
import formatToUSD from '../../utils/formatToUSD';
import { faBank, faCreditCard, faBolt, faClock } from '@fortawesome/free-solid-svg-icons';

const Stage2 = ({
    activeTab,
    selectedOnlineDeposit,
    selectedWireTransfer,
    amount,
    onBack,
    onClose,
}) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleAddFunds = async () => {
        setLoading(true);
        setError('');
        setSuccess('');

        const payload =
            activeTab === 'onlineDeposit'
                ? {
                    method: 'onlineDeposit',
                    details: selectedOnlineDeposit,
                    amount: Number(amount),
                }
                : {
                    method: 'wireTransfer',
                    details: selectedWireTransfer,
                    amount: Number(amount),
                };

        try {
            const response = await addFunds(payload);
            console.log('Funds added successfully', response.data);
            setSuccess('Funds added successfully! Closing modal...');
            setLoading(false);

            // Close modal after 2 seconds
            setTimeout(() => {
                onClose();
            }, 2000);
        } catch (err) {
            console.error('Error adding funds', err);
            setError('There was an error adding funds. Please try again.');
            setLoading(false);
        }
    };

    const steps = [
        {
            icon: faBank,
            title:
                activeTab === 'onlineDeposit'
                    ? `${selectedOnlineDeposit?.name || 'Bank Name'} - ${selectedOnlineDeposit?.accountInfo || 'Account Info'}`
                    : `From ${selectedWireTransfer?.bankName || 'Wire Transfer Name'} - Account Number ${selectedWireTransfer?.accountNumber || 'Account Info'}`,
            description: `${formatToUSD(Number(amount))}`,
        },
        {
            icon: faCreditCard,
            title: 'Add Funds To Account',
            description: `${formatToUSD(Number(amount))}`,
        },
        {
            icon: faBolt,
            title: 'Start Investing',
            description: activeTab === 'onlineDeposit' ? 'Instantly' : 'In 24hrs',
        },
        {
            icon: faClock,
            title: 'Available to Cash Out',
            description: '7 days',
        },
    ];

    return (
        <div className="p-5">
            <div className="flex flex-col items-start">
                {steps.map((step, index) => (
                    <div key={index} className="flex flex-col items-start m-1">
                        {/* Icon and Line */}
                        <div className="flex items-start">
                            <div className="mx-4">
                                <StepsIcon icon={step.icon} />
                            </div>
                            {/* Text content */}
                            <div>
                                <div className="text-gray-800 font-medium">{step.title}</div>
                                <div className="text-blue-600 font-semibold">{step.description}</div>
                            </div>
                        </div>
                        {/* Vertical line (skip for the last step) */}
                        {index !== steps.length - 1 && <div className="w-px h-9 bg-black ml-10"></div>}
                    </div>
                ))}
            </div>
            {/* Error Message */}
            {error && (
                <div className="bg-yellow-50 border border-yellow-500 text-yellow-700 p-2 rounded mb-4">
                    {error}
                </div>
            )}
            {/* Success Message */}
            {success && (
                <div className="bg-green-50 border border-green-500 text-green-700 p-2 rounded mb-4">
                    {success}
                </div>
            )}
            {/* Action Buttons */}
            <div className="flex justify-between gap-5 mt-5">
                <button
                    className="bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 focus:outline-none flex-grow-[2] flex-basis-[20%]"
                    onClick={onBack}
                    disabled={loading}
                >
                    Back
                </button>
                <button
                    className="bg-midnight-blue text-white py-2 rounded-lg hover:bg-blue-500 focus:outline-none flex-grow-[7] flex-basis-[70%]"
                    onClick={handleAddFunds}
                    disabled={loading}
                >
                    {loading ? 'Processing...' : 'Add Funds Now'}
                </button>
            </div>
        </div>
    );
};

export default Stage2;