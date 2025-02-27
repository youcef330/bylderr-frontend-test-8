import React from 'react'
import UpdateInvestmentPreferences from './UpdateInvestmentPreferences'

const InvestmentSettings = () => {
    return (
        <>
            <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-800">Investment Preferences</h2>
                <UpdateInvestmentPreferences />
            </div>
        </>
    )
}

export default InvestmentSettings