import React from 'react'


const PlanCard = ({ plan, currentPlan, isLoading, onChangePlan }) => {
    const isCurrent = currentPlan === plan.name;

    return (
        <div
            className={`border rounded-lg p-6 transition-shadow ${isCurrent ? "border-midnight-blue" : "border-gray-200"
                }`}
        >
            <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
            <p className="text-gray-700 mb-2">{plan.price}</p>
            <p className="text-sm text-gray-500 mb-4">{plan.discount}</p>
            <ul className="list-disc ml-4 space-y-1 mb-4 text-gray-700">
                {plan.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                ))}
            </ul>
            <button
                onClick={() => onChangePlan(plan.name)}
                className={`px-4 py-2 rounded text-white hover:bd-gray-500 ${isCurrent
                        ? "bg-midnight-blue cursor-default"
                        : plan.buttonStyle.default
                    }`}
                disabled={isLoading || isCurrent}
            >
                {isLoading && !isCurrent
                    ? "Switching..."
                    : isCurrent
                        ? "Current Plan"
                        : `Choose ${plan.name}`}
            </button>
        </div>
    );
};

export default PlanCard