import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="absolute bottom-10 left-0 right-0 text-center">
            <button
                onClick={handleLogout}
                className="text-midnight-blue underline hover:underline"
            >
                Log Out
            </button>
        </div>
    );
};

export default LogoutButton;