import React from 'react';
import { Link } from 'react-router-dom';


/**
 * A single navigation link for the sidebar.
 * Renders an icon and label, and applies active styling when selected.
 */

const SideBarButtons = ({ to, icon, label, isActive, onClick, isCollapsed }) => {
    return (
        <Link
            to={to}
            onClick={onClick}
            className={`flex items-center space-x-3 px-6 py-2 w-full ${isActive ? 'bg-gray-100 text-midnight-blue font-medium rounded-lg' : 'hover:text-glitter'
                }`}
        >
            
            {<span className="text-2xl">{icon}</span>}
            {!isCollapsed && <span>{label}</span>}
        </Link>
    );
};

export default SideBarButtons