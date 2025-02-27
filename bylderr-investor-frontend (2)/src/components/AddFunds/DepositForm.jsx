import React, { useEffect, useState } from 'react';
import { fetchDepositOptions } from '../../api/depositApi';
import Dropdown from './Dropdown';
import InputBox from '../../utils/inputBox';
import { onlineDepositOptions as fallbackOnlineDepositOptions, wireTransferOptions as fallbackWireTransferOptions } from './depositOptions';

/**
 * Deposite from Component
 * A component that enables the user to add funds to their account
 * It lets the user deposite funds online theough stripe or using a wire deposite into our platform
 *
 * Props:
 * - isOpen: Controls the visibility of the modal. `true` to open, `false` to close.
 * - onClose:  Function to close the modal.
 */

const DepositForm = ({
    activeTab,
    selectedOnlineDeposit,
    setSelectedOnlineDeposit,
    selectedWireTransfer,
    setSelectedWireTransfer,
    amount,
    setAmount,
    error,
    setError,
    renderWireTransferDisplay,
}) => {
    const [onlineDepositOptions, setOnlineDepositOptions] = useState(fallbackOnlineDepositOptions);
    const [wireTransferOptions, setWireTransferOptions] = useState(fallbackWireTransferOptions);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchDepositOptionsData = async () => {
            setIsLoading(true);
            try {
                const data = await fetchDepositOptions();
                setOnlineDepositOptions(data.onlineDepositOptions || fallbackOnlineDepositOptions);
                setWireTransferOptions(data.wireTransferOptions || fallbackWireTransferOptions);
            } catch (err) {
                setError('Error loading deposit options. Showing Mock Options.');
                setOnlineDepositOptions(fallbackOnlineDepositOptions);
                setWireTransferOptions(fallbackWireTransferOptions);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDepositOptionsData();
    }, [setError]);

    return (
        <div className="p-4 space-y-4">
            {isLoading && <p className="text-sm text-gray-500">Loading options...</p>}
            {error && (
                <div className="bg-yellow-50 border border-yellow-500 text-yellow-700 p-2 rounded mb-4">
                    {error}
                </div>
            )}
            {activeTab === 'onlineDeposit' && (
                <div>
                    <label
                        htmlFor="onlineDepositDropdown"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Deposit from
                    </label>
                    <Dropdown
                        options={onlineDepositOptions}
                        selectedOption={selectedOnlineDeposit}
                        onSelect={setSelectedOnlineDeposit}
                        displayValue="Select Deposit Method"
                    />
                </div>
            )}

            {activeTab === 'wireTransfer' && (
                <div>
                    <label
                        htmlFor="wireTransferDropdown"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Deposit from
                    </label>
                    <Dropdown
                        options={wireTransferOptions}
                        selectedOption={selectedWireTransfer}
                        onSelect={setSelectedWireTransfer}
                        displayValue="Select Bank"
                        renderDisplay={renderWireTransferDisplay}
                    />
                </div>
            )}

            <InputBox
                id="amount"
                type="number"
                label="Amount"
                placeholder="Enter amount"
                value={amount}
                onChange={(sanitizedValue) => {
                    setAmount(sanitizedValue);
                    if (error) setError('');
                }}
                suffix="USD"
                min="0"
            />
        </div>
    );
};

export default DepositForm;