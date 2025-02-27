import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const FindNewInvestments = () => {
    return (
        <div className='flex flex-row  justify-between items-center bg-white p-6 rounded-lg border border-gray-300 shadow-md w-full'>
            <div className='items-center'>
                <FontAwesomeIcon
                    icon={faHouse}
                    className='text-white bg-midnight-blue rounded-full p-3 w-10 h-10 text-3xl'
                />
            </div>
            <div className='flex flex-col'>
                <span className='text-midnight-blue text-lg'>Find New</span>
                <span className='text-black font-bold text-3xl'>Investments</span>
            </div>
            <div className='items-center'>
            <FontAwesomeIcon className='text-3xl text-midnight-blue' icon={faChevronRight} />
            </div>

        </div>
    )
}

export default FindNewInvestments