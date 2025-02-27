import React from "react";

const UpdateTagList = ({ locations, onRemoveLocation }) => {
    return (
        <div className="flex flex-wrap gap-2 w-full overflow-auto">
            {locations.map((location) => {
                const locationParts = location.name.split(",");
                const displayName = locationParts
                    .slice(0, locationParts.length - 1)
                    .join(",");

                return (
                    <div
                        key={location.id}
                        className="bg-glitter text-midnight-blue px-4 py-2 rounded-md my-2 cursor-pointer"
                        onClick={() => onRemoveLocation(location.id)}
                    >
                        {displayName} <span className="ml-2">x</span>
                    </div>
                );
            })}
        </div>
    );
};

export default UpdateTagList;