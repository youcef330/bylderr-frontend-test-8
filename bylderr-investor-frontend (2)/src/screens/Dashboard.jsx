import React from 'react'
import InvestmentMix from '../components/DashBoardComponents/InvestmentMix';
import AccountCard from '../components/DashBoardComponents/AccountCard';
import HoldingTable from '../components/DashBoardComponents/HoldingTable';
import MyDevelopers from '../components/DashBoardComponents/MyDevelopers';
import ActivityTable from '../components/DashBoardComponents/ActivityTable';
import Watchlist from '../components/DashBoardComponents/Watchlist';

const Dashboard = () => {
    return (
        <>
            <div className='pt-5 pb-10 px-10 min-h-screen'>
                <h1 className='lg:p-4 font-bold text-3xl pb-2'>My Portfolio</h1>

                {/* Grid Splits the screen into 3 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:p-4">
                    {/* The first column - takes up 2 columns on md and lg screens */}
                    <div className="md:col-span-2">
                        <AccountCard />
                    </div>

                    {/* The second column - takes up 1 column in md and lg screeens */}
                    <div className="md:col-span-1">
                        <InvestmentMix />
                    </div>

                    {/* The first column - takes up 2 columns on md and lg screens */}
                    <div className="md:col-span-2">
                        <HoldingTable />
                    </div>

                    {/* The second column - takes up 1 column in md and lg screeens */}
                    <div className="md:col-span-1">
                        <MyDevelopers />
                    </div>

                    {/* The first column - takes up 2 columns on md and lg screens */}
                    <div className="md:col-span-2">
                        <ActivityTable />
                    </div>

                    {/* The second column - takes up 1 column in md and lg screeens */}
                    <div className="md:col-span-1">
                        <Watchlist />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard