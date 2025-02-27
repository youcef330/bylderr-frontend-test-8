import React from 'react';

const GoalsTracker = ({ goals }) => {
    return (
        <div className="bg-white shadow p-5 rounded-lg">
            <h3 className="font-bold text-xl mb-4">Your Goals</h3>
            <ul className="space-y-3">
                {goals.map((goal, index) => (
                    <li key={index} className="flex justify-between">
                        <span>{goal.description}</span>
                        <span>{goal.progress}%</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GoalsTracker;