import React, { useState, useEffect } from "react";

const DebouncedButton = ({ onClick, children, delay = 300, ...props }) => {
    const [isDebounced, setIsDebounced] = useState(false);

    const handleClick = () => {
        if (!isDebounced) {
            onClick();
            setIsDebounced(true);
        }
    };

    useEffect(() => {
        if (isDebounced) {
            const timer = setTimeout(() => setIsDebounced(false), delay);
            return () => clearTimeout(timer);
        }
    }, [isDebounced, delay]);

    return (
        <button
            onClick={handleClick}
            className="px-4 py-2 rounded-lg bg-midnight-blue text-white hover:bg-blue-600 disabled:opacity-50"
            disabled={isDebounced}
            {...props}
        >
            {children}
        </button>
    );
};

export default DebouncedButton;