import React, { useState } from "react";
import formatToUSD from "../../../utils/formatToUSD";
import InfoButtonModal from "../../../utils/InfoButtonModal";
import propertyDetailsInfo from "../../../utils/propertyDetailsInfo";
import joinWithCommaAnd from "../../../utils/joinWithCommaAnd";
import formatValue from "../../../utils/formatValue";
import { FaChevronRight, FaChevronDown } from "react-icons/fa";

const AdditionalPropertyDetails = React.memo(({ additionalDetails }) => {
    if (!additionalDetails || Object.keys(additionalDetails).length === 0) return null;

    const [isExpanded, setIsExpanded] = useState(false);
    const detailsEntries = Object.entries(additionalDetails);
    const visibleDetails = isExpanded ? detailsEntries : detailsEntries.slice(0, 6);

    const toggleDetails = () => setIsExpanded((prev) => !prev);

    return (
        <>
            <div className="flex flex-row justify-between items-center border-t border-gray-500">
                <h2 className="p-5 pl-4 font-bold text-gray-500 text-xl">
                    Additional Property Details
                </h2>
                {detailsEntries.length > 6 && (
                    <button
                        onClick={toggleDetails}
                        className="py-2 pl-4 text-right underline text-gray-600 hover:text-glitter flex items-center"
                    >
                        {isExpanded ? "Show Less" : "Show More"}
                        {isExpanded ? (
                            <FaChevronDown className="pl-2" size={16} />
                        ) : (
                            <FaChevronRight className="pl-2" size={16} />
                        )}
                    </button>
                )}
            </div>
            <div className="grid sm:grid-cols-2 gap-4 p-4">
                {visibleDetails.map(([key, value]) => {
                    if (value == null || (Array.isArray(value) && value.length === 0)) return null;

                    return (
                        <div
                            key={key}
                            className="text-gray-600 p-4 hover:bg-gray-50 rounded flex flex-col"
                        >
                            <div className="flex flex-row items-center font-bold capitalize">
                                {key.replace(/([A-Z])/g, " $1").toLowerCase()}
                                <InfoButtonModal
                                    title={propertyDetailsInfo[key]?.title}
                                    description={propertyDetailsInfo[key]?.description}
                                    options={propertyDetailsInfo[key]?.options}
                                />
                            </div>
                            <div className="mt-2">
                                {["grossRentalIncome", "noi", "pricePerUnit", "propertyValue"].includes(key)
                                    ? formatToUSD(value)
                                    : key === "squareFootage"
                                    ? `${value} sqft`
                                    : key === "occupancyRate" || key === "capRate"
                                    ? `${value}%`
                                    : typeof value === "boolean"
                                    ? value
                                        ? "yes"
                                        : "no"
                                    : Array.isArray(value)
                                    ? joinWithCommaAnd(
                                          value.map((item) =>
                                              typeof item === "string" ? formatValue(item) : item
                                          )
                                      )
                                    : typeof value === "string"
                                    ? formatValue(value)
                                    : value}
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
});

export default AdditionalPropertyDetails;