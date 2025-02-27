import React, { useState } from 'react';
import PropTypes from 'prop-types';
import sanitizeInput from './sanitizeInput';

const InputBox = ({
    id,
    type = 'text',
    placeholder = '',
    value,
    onChange,
    label,
    error,
    min,
    step,
    className = '',
    suffix,
    ...rest
}) => {
    const [internalValue, setInternalValue] = useState('');
    const isControlled = value !== undefined;

    const handleChange = (e) => {
        const rawInput = e.target.value;
        const sanitizedValue = sanitizeInput(rawInput);

        if (isControlled) {
            onChange(sanitizedValue);
        } else {
            setInternalValue(sanitizedValue);
        }
    };

    const inputValue = isControlled ? value : internalValue;

    return (
        <div>
            {label && (
                <label
                    htmlFor={id}
                    className="block text-sm font-medium text-gray-700"
                >
                    {label}
                </label>
            )}
            <div className="mt-1 flex items-center border rounded-md shadow-sm bg-white">
                <input
                    id={id}
                    type={type}
                    min={min}
                    step={step}
                    className={`flex-1 px-3 py-2 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${className}`}
                    placeholder={placeholder}
                    value={inputValue}
                    onChange={handleChange}
                    aria-invalid={!!error}
                    aria-describedby={error ? `${id}-error` : undefined}
                    {...rest}
                />
                {suffix && <span className="px-3 text-sm text-gray-500">{suffix}</span>}
            </div>
            {error && (
                <p id={`${id}-error`} className="mt-2 text-sm text-red-500">
                    {error}
                </p>
            )}
        </div>
    );
};

InputBox.propTypes = {
    id: PropTypes.string.isRequired,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string,
    error: PropTypes.string,
    min: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    step: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    className: PropTypes.string,
    suffix: PropTypes.string,
};

export default InputBox;