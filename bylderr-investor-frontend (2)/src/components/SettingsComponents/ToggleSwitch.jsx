import React from "react";

const ToggleSwitch = ({ isOn, onToggle }) => {
    return (
        <span
            onClick={onToggle}
            className={`w-14 h-8 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer transition-colors ${isOn ? "bg-midnight-blue" : "bg-gray-300"
                }`}
        >
            <span
                className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform ${isOn ? "translate-x-6" : ""
                    }`}
            ></span>
        </span>
    );
};

export default ToggleSwitch;