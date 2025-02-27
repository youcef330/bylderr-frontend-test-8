import React from 'react';

const ConfirmationModal = ({ isOpen, onClose, onConfirm, withdrawalAmount, selectedBank }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-md shadow-lg p-6 max-w-md w-full">
                <h3 className="text-lg font-bold mb-4">Confirm Withdrawal</h3>
                <p>
                    You are about to withdraw <strong>{withdrawalAmount} USD</strong> to the following bank account:
                </p>
                <p className="font-medium mt-2">{selectedBank}</p>
                <div className="flex justify-between mt-6 space-x-4">
                    <button
                        onClick={onClose}
                        className="bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 focus:outline-none flex-grow-[2] flex-basis-[20%]"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="bg-midnight-blue text-white py-2 rounded-lg hover:bg-blue-500 focus:outline-none flex-grow-[7] flex-basis-[70%]"
                    >
                        Confirm Withdrawal
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;