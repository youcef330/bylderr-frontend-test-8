import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/**
 * UserAccountCard Component
 * A reusable card component that displays an icon, a title, and a description.
 * It is designed to be used for user account-related features or other contexts requiring a card.
 *
 * Props:
 * - icon: A FontAwesome icon identifier to render.
 * - title: The title displayed prominently at the top of the card.
 * - description: A brief description or supporting text below the title.
 */

const UserAccountCard = ({ icon, title, description }) => {
    return (
        <div
            className="border rounded-lg p-6 shadow-sm h-full md:h-40 lg:h-48 hover:shadow-md transition-shadow duration-200 cursor-pointer"
            role="button"
            tabIndex={0}
            aria-label={title}
        >
            {/* Icon and title container */}
            <div className="flex items-center mb-4">
                {/* FontAwesome icon */}
                <FontAwesomeIcon
                    icon={icon}
                    className="text-3xl text-midnight-blue mr-4"
                    aria-hidden="true"
                />
                {/* Card title */}
                <h2 className="text-xl font-semibold">{title}</h2>
            </div>
            {/* Card description */}
            <p className="text-lg text-gray-600">{description}</p>
        </div>
    );
};

export default UserAccountCard;