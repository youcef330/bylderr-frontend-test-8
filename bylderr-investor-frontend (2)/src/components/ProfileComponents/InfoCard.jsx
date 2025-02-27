import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

const InfoCard = ({
    title,
    icon,
    iconBgColor = 'bg-midnight-blue',
    topLabel,
    mainValue,
    bottomLabel,
    showChevron = true
}) => {
    return (
        <div className='flex flex-col bg-white border-gray-300 shadow-md w-full border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200 '>
            <div className='flex flex-row justify-between items-center'>
                <div>
                    {title && <span className='text-left text-xl font-bold pb-1'>{title}</span>}
                    <div className='flex flex-row items-center justify-between'>
                        <div className='flex flex-row items-center'>
                            {/* Icon */}
                            <FontAwesomeIcon
                                icon={icon}
                                className={`text-white ${iconBgColor} rounded-full w-10 h-10 p-3 text-3xl`}
                            />

                            {/* Text Content */}
                            <div className='flex flex-col ml-4'>
                                {topLabel && <span className='text-midnight-blue text-lg'>{topLabel}</span>}
                                {mainValue !== undefined && (
                                    <span className='text-black font-bold text-3xl'>{mainValue}</span>
                                )}
                                {bottomLabel && <span className='text-midnight-blue text-lg'>{bottomLabel}</span>}
                            </div>
                        </div>
                    </div>
                </div>
                {/* Right Chevron Icon */}
                {showChevron && (
                    <div className="flex items-center justify-center">
                        <FontAwesomeIcon className="text-3xl text-midnight-blue" icon={faChevronRight} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default InfoCard;