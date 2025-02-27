import InfoButtonModal from "../../../utils/InfoButtonModal";
import locationDetailsInfo from "../../../utils/locationDetailsInfo";
import joinWithCommaAnd from "../../../utils/joinWithCommaAnd";


/**
 * LocationDetails Component
 *
 * A React component that displays detailed location-related information in a structured grid format.
 * Each detail is accompanied by an optional information modal for additional clarity.
 *
 */
const LocationDetails = ({ locationDetails }) => {
    if (!locationDetails) return null;

    return (
        <div className="border-b border-gray-500 my-10 border-t border-gray-500">
            <h2 className="p-5 pl-4 font-bold text-gray-500 text-xl">
                Location Details
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
                {Object.entries(locationDetails).map(([key, value]) => {
                    const info = locationDetailsInfo[key];

                    if (!info) {
                        console.warn(`No info found for key: ${key}`);
                        return null;
                    }

                    let displayValue = Array.isArray(value) ? joinWithCommaAnd(value) : value;

                    return (
                        <div
                            key={key}
                            className="text-gray-600 dark:text-gray-100 p-4 hover:bg-gray-50 hover:dark:bg-dark-cardBg rounded flex flex-col"
                        >
                            <div className="flex items-center font-bold capitalize">
                                {info.title}
                                <InfoButtonModal title={info.title} description={info.description} />
                            </div>
                            <div className="mt-2">{displayValue}</div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default LocationDetails;