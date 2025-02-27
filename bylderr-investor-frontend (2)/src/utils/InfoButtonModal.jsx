import React, { useState } from "react";
import { FaCircleInfo } from "react-icons/fa6";

const InfoButtonModal = ({ title, description, options }) => {
    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => setShowModal(!showModal);

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            setShowModal(false);
        }
    };

    return (
        <>
            <FaCircleInfo
                className="text-gray-400 ml-2 cursor-pointer hover:text-gray-700 text-md"
                onClick={toggleModal}
            />
            {/* Modal */}
            {showModal && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                    onClick={handleBackdropClick}
                >
                    <div
                        className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="text-lg font-bold text-gray-800  mb-4">
                            {title}
                        </h2>
                        <p className="text-gray-600  mb-4">{description}</p>

                        {options && options.length > 0 && (
                            <table className="min-w-full bg-white overflow-x-auto rounded-lg">
                                <tbody>
                                    {options.map((option, index) => (
                                        <tr
                                            key={index}
                                            className={
                                                index % 2 === 0
                                                    ? "bg-gray-100"
                                                    : "bg-white"
                                            }
                                        >
                                            <td className="px-4 py-2 text-gray-700">
                                                {option.name}
                                            </td>
                                            <td className="px-4 py-2 text-gray-700">
                                                {option.definition}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}

                        <button
                            onClick={toggleModal}
                            className="mt-6 px-4 py-2 bg-midnight-blue text-white rounded-lg hover:bg-gray-500"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default InfoButtonModal;