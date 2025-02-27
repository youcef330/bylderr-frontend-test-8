import React, { useState } from "react";
import AccountSettings from "../components/SettingsComponents/AccountSettings";
import InvestmentSettings from "../components/SettingsComponents/InvestmentSettings";
import NotificationSettings from "../components/SettingsComponents/NotificationSettings";
import SecuritySettings from "../components/SettingsComponents/SecuritySettings";
import SubscriptionSettings from "../components/SettingsComponents/SubscriptionSettings";

const Settings = ({ startTab }) => {
    const [activeTab, setActiveTab] = useState(startTab);

    const renderContent = () => {
        switch (activeTab) {
            case "account":
                return <AccountSettings />;
            case "investment":
                return <InvestmentSettings />;
            case "notifications":
                return <NotificationSettings />;
            case "security":
                return <SecuritySettings />;
            case "subscription":
                return <SubscriptionSettings />;
            default:
                return null;
        }
    };

    return (
        <div className="bg-white min-h-screen">
            {/* Header */}
            <header className="bg-white shadow-sm py-4 px-6">
                <h1 className="text-3xl font-semibold text-gray-800">Settings</h1>
                <p className="text-gray-500">
                    Manage your account, preferences, security, and subscription.
                </p>
            </header>

            {/* Tabs */}
            <div className="bg-white border-t">
                <div className="flex justify-center space-x-6 border-b overflow-x-auto flex-wrap md:flex-nowrap px-4">
                    {["account", "investment", "notifications", "security", "subscription"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`py-4 px-6 text-sm whitespace-nowrap ${activeTab === tab
                                    ? "text-midnight-blue font-bold bg-glitter rounded-md"
                                    : "text-gray-600 font-medium hover:text-midnight-blue"
                                }`}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content */}
            <main className="container mx-auto px-4 py-6">{renderContent()}</main>
        </div>
    );
};

export default Settings;