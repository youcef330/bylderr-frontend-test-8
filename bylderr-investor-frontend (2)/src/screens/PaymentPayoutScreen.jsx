import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AccountOverview from '../components/PaymentPayout/AccountOverview';
import BankManagement from '../components/PaymentPayout/BankManagement';
import DistributionOptions from '../components/PaymentPayout/DistributionOptions';

/**
 * PaymentPayoutScreen Component
 * Displays a screen for managing payments, banks, and distributions.
 */

const apiBaseUrl = import.meta.env.VITE_REACT_APP_BASE_URL;


const PaymentPayoutScreen = () => {
    const [accountData, setAccountData] = useState({
        availableFunds: 0,
        totalFunds: 0,
    });
    const [bankingData, setBankingData] = useState([]);
    const [status, setStatus] = useState('idle');
    const [error, setError] = useState(null);

    const fallbackAccountData = {
        availableFunds: 75000,
        totalFunds: 100000,
    };

    const fallbackBankingData = [
        {
            id: 3,
            status: 'Primary',
            bank: 'Chase Bank',
            last4: 1234,
            shares: 50,
            allocation: '50%',
        },
        {
            id: 2,
            status: 'Secondary',
            bank: 'Bank of America',
            last4: 5678,
            shares: 100,
            allocation: '50%',
        },
    ];

    const fetchPaymentData = async () => {
        setStatus('loading');
        setError(null);

        if (import.meta.env.VITE_REACT_APP_AUTH_MODE == 'mock') {
            setAccountData(response.data.account || fallbackAccountData);
            setBankingData(response.data.bankings || fallbackBankingData);
            setStatus('succeeded');
        } else {
            try {
                const response = await axios.get(`${apiBaseUrl}payment-data`);
                if (response.data) {
                    setAccountData(response.data.account || fallbackAccountData);
                    setBankingData(response.data.bankings || fallbackBankingData);
                    setStatus('succeeded');
                } else {
                    throw new Error('Invalid data format received from the server.');
                }
            } catch (err) {
                console.error('Error fetching payment data:', err);
                setError('Failed to load payment data. Using fallback data.');
                setAccountData(fallbackAccountData);
                setBankingData(fallbackBankingData);
                setStatus('failed');
            }
        }
    };

    useEffect(() => {
        fetchPaymentData();
    }, []);


    return (
        <>
            <div className="px-10 pt-5">
                {/* Title */}
                <h1 className="font-bold text-3xl pb-2">Payments and Distributions</h1>
                {error && (
                    <div className="bg-yellow-50 border border-yellow-500 text-yellow-700 p-2 rounded mb-4">
                        {error}
                    </div>
                )}

                {/* Conditional Rendering to Prevent Errors */}
                {accountData && (
                    <AccountOverview
                        availableFunds={accountData.availableFunds}
                        totalFunds={accountData.totalFunds}
                    />
                )}

                {/* Bank Management */}
                {bankingData.length > 0 && <BankManagement data={bankingData} />}

                {/* Distribution Options */}
                <DistributionOptions />
            </div>
        </>
    );
};

export default PaymentPayoutScreen