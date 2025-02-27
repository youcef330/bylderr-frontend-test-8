import React from 'react';

const ModalTabs = ({ activeTab, setActiveTab, disabled }) => (
    <div className="flex border-b border-gray-300">
        <button
            onClick={() => !disabled && setActiveTab('onlineDeposit')}
            className={`flex-1 px-4 py-2 text-center font-semibold ${activeTab === 'onlineDeposit'
                    ? 'text-indigo-800 border-b-2 border-indigo-800'
                    : 'text-gray-500 hover:text-indigo-800'
                } ${disabled ? 'cursor-not-allowed' : ''}`}
            disabled={disabled}
        >
            Online Deposit
        </button>
        <button
            onClick={() => !disabled && setActiveTab('wireTransfer')}
            className={`flex-1 px-4 py-2 text-center font-semibold ${activeTab === 'wireTransfer'
                    ? 'text-indigo-800 border-b-2 border-indigo-800'
                    : 'text-gray-500 hover:text-indigo-800'
                } ${disabled ? 'cursor-not-allowed' : ''}`}
            disabled={disabled}
        >
            Wire Transfer
        </button>
    </div>
);

export default ModalTabs;