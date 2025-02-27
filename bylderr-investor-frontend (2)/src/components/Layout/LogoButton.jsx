import React from 'react';
import PropTypes from 'prop-types';

/**
 * A button component that toggles the sidebar and displays logos with text and logo without
 * based on the sidebar's collapsed state.
 *
 * @param {boolean} isCollapsed - Controls which logo is displayed.
 * @param {function} toggleSidebar - Function to toggle the sidebar state.
 * @param {string} expandedLogo - Path to the logo image when sidebar is expanded.
 * @param {string} collapsedLogo - Path to the logo image when sidebar is collapsed.
 */

const LogoButton = ({ isCollapsed, toggleSidebar, expandedLogo, collapsedLogo }) => {
    return (
        <button
            onClick={toggleSidebar}
            className="flex items-center justify-center h-16 focus:outline-none"
        >
            <div className="text-2xl items-center font-bold text-gray-700">
                {isCollapsed ? (
                    <img
                        src={collapsedLogo}
                        alt="Collapsed Logo"
                        className="w-14 h-14 object-contain"
                    />
                ) : (
                    <img
                        src={expandedLogo}
                        alt="Expanded Logo"
                        className="w-auto h-14 object-contain float-left"
                    />
                )}
            </div>
        </button>
    );
};

LogoButton.propTypes = {
    isCollapsed: PropTypes.bool.isRequired,
    toggleSidebar: PropTypes.func.isRequired,
    expandedLogo: PropTypes.string.isRequired,
    collapsedLogo: PropTypes.string.isRequired,
};

export default LogoButton;