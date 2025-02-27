import React from 'react';

const ProgressBar = ({ percent, type = "Fund" }) => {
    return (
        <>
            {type === 'Fund' && (
                <div className="w-full bg-gray-200 rounded-full h-6">
                    <div
                        className="whitespace-nowrap bg-green-600 h-6 rounded-full text-black text-center"
                        style={{ width: `${percent}%` }}
                    >
                        {percent}%
                    </div>
                </div>
            )}
            {type === 'Pending' && (
                <div className="w-full bg-blue-600 rounded-full h-6 text-white">
                    Pending
                </div>
            )}
            {type === 'Denied' && (
                <div className="w-full bg-red-600 rounded-full h-6 text-white">
                    Denied
                </div>
            )}
        </>
    );
};

export default ProgressBar;