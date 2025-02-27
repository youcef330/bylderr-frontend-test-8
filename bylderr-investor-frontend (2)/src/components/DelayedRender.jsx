import React, { useState, useEffect } from 'react';

const DelayedRender = ({ children, delay = 1000 }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, delay);

        return () => clearTimeout(timer);
    }, [delay]);

    return (
        <div className={`transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            {isVisible ? children : null}
        </div>
    );
};

export default DelayedRender;