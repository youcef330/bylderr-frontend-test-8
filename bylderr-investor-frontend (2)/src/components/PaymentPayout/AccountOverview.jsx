import React from 'react'
import formatToUSD from '../../utils/formatToUSD'
import InfoButtonModal from '../../utils/InfoButtonModal'

const AccountOverview = ({ availableFunds, totalFunds }) => {
    return (
        <div className='bg-white rounded-lg shadow-lg p-6 w-auto h-full mx-auto border-2 my-10'>
            <h2 className='font-bold text-xl mb-6'>Account Overview</h2>
            <div className='grid rid-cols-1 sm:grid-cols-2 gap-6'>
                <div className='flex flex-row'>
                    <strong>Account Balance:</strong>

                    <span className='ml-2 font-bold'>{formatToUSD(totalFunds)}</span>
                    <InfoButtonModal
                        title="Account Balance"
                        description="Total Balance, including pending transactions, deposits, and dividends."
                    />

                </div>
                <div className='flex flex-row'>
                    <strong>Available to Withdraw:</strong>

                    <span className='font-bold text-green-500 ml-2'>{formatToUSD(availableFunds)}</span>
                    <InfoButtonModal
                        title="Available to Withdraw"
                        description="Funds that you can withdraw from your account without any restrictions or delays. These funds are free from holds, locks, or pending transactions."
                    />

                </div>
            </div>
        </div>
    )
}

export default AccountOverview