import React from "react";

const EditableSelect = ({ label, name, value, options, onChange }) => (
    <div className="p-4 bg-gray-50 border rounded-lg">
        <label className="text-gray-700 text-lg font-semibold block mb-2">
            {label}
        </label>
        <select
            name={name}
            value={value}
            onChange={onChange}
            className="w-full border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
        >
            {options.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
    </div>
);

export default EditableSelect;
