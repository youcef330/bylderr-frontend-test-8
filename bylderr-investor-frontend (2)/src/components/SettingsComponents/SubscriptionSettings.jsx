import React, { useState } from "react";
import PlanCard from "./PlanCard";
import { changePlan } from "../../api/settingsApi";



const SubscriptionSettings = () => {
    const [currentPlan, setCurrentPlan] = useState("Basic Plan");
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    const plans = [
        {
            name: "Basic Plan",
            price: "Free (or low monthly cost)",
            discount: "*Pay yearly and save up to 10%",
            features: [
                "Up to 3 property listings",
                "Basic analytics dashboard",
                "Community support",
            ],
            buttonStyle: { default: "bg-gray-600 hover:bg-gray-700" },
        },
        {
            name: "Pro Plan",
            price: "$19.99 / month",
            discount: "*Pay yearly and save 15%",
            features: [
                "No ads",
                "Up to 10 property listings",
                "Advanced analytics & reporting",
                "Priority email & chat support",
                "Dark mode interface",
            ],
            buttonStyle: { default: "bg-gray-600 hover:bg-gray-700" },
        },
        {
            name: "Premium Plan",
            price: "$29.99 / month",
            discount: "*Pay yearly and save 20%",
            features: [
                "No ads",
                "Unlimited property listings",
                "Premium analytics & in-depth reporting",
                "24/7 dedicated support (phone + chat)",
                "Priority feature requests",
                "Access to beta features",
            ],
            buttonStyle: { default: "bg-gray-600 hover:bg-gray-700" },
        },
    ];

    const handleChangePlan = async (planName) => {
        setIsLoading(true);
        setErrorMsg("");
        setSuccessMsg("");
        if (import.meta.env.VITE_REACT_APP_AUTH_MODE == 'mock') {
            setCurrentPlan(planName);
            setIsLoading(false);
        } else {
            try {
                await changePlan(planName);
                setCurrentPlan(planName);
                setSuccessMsg(`Subscription changed to ${planName}.`);
            } catch (error) {
                setErrorMsg(error.message);
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <section>
            <h2 className="text-2xl font-semibold mb-4">Subscription Settings</h2>
            <p className="mb-2">
                <strong>Current Plan:</strong> {currentPlan}
            </p>
            {errorMsg && <p className="text-red-500 mb-2">{errorMsg}</p>}
            {successMsg && <p className="text-green-500 mb-2">{successMsg}</p>}

            <div className="grid md:grid-cols-3 gap-6 mt-6">
                {plans.map((plan) => (
                    <PlanCard
                        key={plan.name}
                        plan={plan}
                        currentPlan={currentPlan}
                        isLoading={isLoading}
                        onChangePlan={handleChangePlan}
                    />
                ))}
            </div>

            <hr className="my-6" />
        </section>
    );
};

export default SubscriptionSettings;