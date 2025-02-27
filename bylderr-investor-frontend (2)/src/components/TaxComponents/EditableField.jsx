import React from "react";

const EditableField = ({
    label,
    name,
    value,
    onChange,
    type = "text",
    currency = false,
    disabled = false,
}) => (
    <div className="p-4 bg-gray-50 border rounded-lg">
        <label className="text-gray-700 text-lg font-semibold block mb-2">
            {label}
        </label>
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            className={`w-full border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300 ${disabled ? "bg-gray-200 cursor-not-allowed" : ""
                }`}
            placeholder={currency ? "Enter amount" : ""}
            min={0}
            step="0.01"
            disabled={disabled}
        />
    </div>
);

export default EditableField;
