import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

const ActivityFeed = ({ activities }) => {
    const navigate = useNavigate();

    const handleActivityClick = (path) => {
        if (path) {
            navigate(path);
        }
    };

    return (
        <div className="bg-white shadow-lg rounded-lg border p-6 mb-10">
            {activities.length > 0 ? (
                <ul className="space-y-4">
                    {activities.map((activity, index) => (
                        <li
                            key={index}
                            className="flex justify-between items-center bg-gray-50 p-4 rounded-md hover:bg-gray-100 transition cursor-pointer"
                            onClick={() => handleActivityClick(activity.link)}
                        >
                            <div className="flex items-center space-x-4">
                                <FontAwesomeIcon
                                    icon={faInfoCircle}
                                    className="text-midnight-blue text-xl"
                                />
                                <div>
                                    <p className="font-medium text-gray-800">
                                        {activity.description}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {activity.date}
                                    </p>
                                </div>
                            </div>
                            <FontAwesomeIcon
                                icon={faClock}
                                className="text-gray-400 text-lg"
                                title="Recent activity"
                            />
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-500 text-center py-4">
                    No recent activity to display.
                </p>
            )}
        </div>
    );
};

export default ActivityFeed;