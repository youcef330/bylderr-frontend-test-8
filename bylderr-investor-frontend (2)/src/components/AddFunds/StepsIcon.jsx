import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const StepsIcon = ({ icon }) => {
    return (
        <div>
            <div className='items-center'>
                <FontAwesomeIcon
                    icon={icon}
                    className='text-white bg-midnight-blue rounded-full w-7 h-7 p-3'
                />
            </div>
        </div>
    )
}

export default StepsIcon