import React from "react";
import DeactivateAccount from "./DeactivateAccount";
import IdentityDetails from "./IdentityDetails";
import ContactDetails from "./ContactDetails";

const AccountSettings = () => {
    return (
        <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-800">Account Settings</h2>
            <IdentityDetails />
            <ContactDetails />
            <DeactivateAccount />
        </div>
    );
};

export default AccountSettings;