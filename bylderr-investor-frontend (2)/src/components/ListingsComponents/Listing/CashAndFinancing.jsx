import React from 'react';
import formatToUSD from '../../../utils/formatToUSD';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

const CashAndFinancing = ({ cashAndFinancing }) => {
    if (!cashAndFinancing) return null;

    const items = cashAndFinancing;

    return (
        <>
            <div className="border-t border-b border-gray-500">
                <h2 className="pt-5 pl-4 font-bold text-gray-500 text-xl">
                    Cash and Financing
                </h2>
                <div className="grid sm:grid-cols-3 gap-4">
                    {Object.entries(items).map(([key, value]) => (
                        <div key={key} className="text-black p-4">
                            <div className="text-gray-600 font-bold capitalize">
                                {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                            </div>
                            <div className="text-gray-600">{formatToUSD(value)}</div>
                        </div>
                    ))}
                </div>
                <button className="py-5 pl-4 underline text-gray-600 hover:text-glitter">
                    <span>
                        See all Loans <FontAwesomeIcon className="pl-5" icon={faChevronRight} />
                    </span>
                </button>
            </div>
        </>
    );
};

export default CashAndFinancing;