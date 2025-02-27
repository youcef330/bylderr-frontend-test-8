import React, { useState } from 'react';
import ModalHeader from './ModalHeader';
import ModalTabs from './ModalTabs';
import DepositForm from './DepositForm';
import Stage2 from './Stage2';
import {
    onlineDepositOptions,
    wireTransferOptions,
} from './depositOptions';

/**
 * Add Funds Modal Component
 * A modal component that enables the user to add funds to their account
 * It lets the user deposite funds online theough stripe or using a wire deposite into our platform
 *
 * Props:
 * - isOpen: Controls the visibility of the modal. `true` to open, `false` to close.
 * - onClose:  Function to close the modal.
 */

const AddFundsModal = ({ isOpen, onClose }) => {
    const [activeTab, setActiveTab] = useState('onlineDeposit');
    const [stepIndex, setStepIndex] = useState(1);
    const [selectedOnlineDeposit, setSelectedOnlineDeposit] = useState(
        onlineDepositOptions[0]
    );
    const [selectedWireTransfer, setSelectedWireTransfer] = useState(
        wireTransferOptions[0]
    );
    const [amount, setAmount] = useState('');
    const [error, setError] = useState('');

    if (!isOpen) return null;

    const handleContinue = () => {
        if (!amount || Number(amount) <= 0) {
            setError('Please enter a valid amount.');
            return;
        }
        setStepIndex(stepIndex + 1);
    };

    const handleBack = () => {
        setStepIndex(stepIndex - 1);
    };

    const renderWireTransferDisplay = (option) => (
        <div>
            <span className="block text-sm font-medium text-gray-700">
                {option.bankName}
            </span>
            <span className="block text-xs text-gray-500">
                Account Number: {option.accountNumber}
            </span>
            <span className="block text-xs text-gray-500">
                Routing Number: {option.routingNumber}
            </span>
        </div>
    );

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg w-96 lg:w-1/3">
                {/* Header */}
                <ModalHeader title="Add Funds to your Account" onClose={onClose} />
                {/* Tabs */}
                <ModalTabs
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    disabled={stepIndex !== 1}
                />

                {stepIndex === 1 && (
                    <>


                        {/* Deposit Form */}
                        <DepositForm
                            activeTab={activeTab}
                            selectedOnlineDeposit={selectedOnlineDeposit}
                            setSelectedOnlineDeposit={setSelectedOnlineDeposit}
                            selectedWireTransfer={selectedWireTransfer}
                            setSelectedWireTransfer={setSelectedWireTransfer}
                            amount={amount}
                            setAmount={setAmount}
                            error={error}
                            setError={setError}
                            renderWireTransferDisplay={renderWireTransferDisplay}
                        />

                        {/* Next Options */}
                        <div className="px-4 py-3 border-t border-gray-300">
                            <button
                                className={`w-full bg-midnight-blue text-white px-4 py-2 rounded-lg hover:bg-blue-500 focus:outline-none ${!amount || Number(amount) <= 0
                                    ? 'opacity-50 cursor-not-allowed'
                                    : ''
                                    }`}
                                onClick={handleContinue}
                                disabled={!amount || Number(amount) <= 0}
                            >
                                Continue
                            </button>
                        </div>
                    </>
                )}
                {stepIndex === 2 && (
                    <>
                        {/* Confirmation */}
                        <Stage2
                            activeTab={activeTab}
                            onBack={handleBack}
                            selectedOnlineDeposit={selectedOnlineDeposit}
                            selectedWireTransfer={selectedWireTransfer}
                            amount={amount}
                            onClose={onClose}
                        />
                    </>
                )}
            </div>
        </div>
    );
};

export default AddFundsModal;