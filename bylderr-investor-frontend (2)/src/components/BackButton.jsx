import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);  // Take the User to the previous page
    };

    return (
        <button
            onClick={handleGoBack}
            className="py-2 text-midnight-blue underline focus:outline-none"
        >
            Back
        </button>
    );
};

export default BackButton;