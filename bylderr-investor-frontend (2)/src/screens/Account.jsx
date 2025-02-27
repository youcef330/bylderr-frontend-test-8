import React from 'react';
import { Link } from 'react-router-dom';
import UserAccountCard from '../components/AccountComponents/UserAccountCard';
import {
    faUser,
    faLock,
    faDollarSign,
    faFileAlt,
    faBell,
} from '@fortawesome/free-solid-svg-icons';

const Account = () => {
    const cardData = [
        {
            icon: faUser,
            title: 'Your Information',
            description: 'Provide personal details and how we can reach you',
            link: '/Settings/account',
        },
        {
            icon: faLock,
            title: 'Login & Security',
            description: 'Update your password and secure your account',
            link: '/account/security',
        },
        {
            icon: faDollarSign,
            title: 'Payments & Payouts',
            description: 'Review payment method, bank connection, and payouts',
            link: '/account/payments',
        },
        {
            icon: faFileAlt,
            title: 'Taxes',
            description: 'Manage taxpayer information and tax documents',
            link: '/account/taxes',
        },
        {
            icon: faBell,
            title: 'Notifications',
            description: 'Choose notification preferences and how you want to be contacted',
            link: '/account/notifications',
        },
    ];

    return (
        <>
            <div className="p-6 min-h-screen">
                <h1 className="text-3xl font-bold">Account</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10">
                    {cardData.map((card, index) => (
                        <Link to={card.link} key={index} className="block">
                            <UserAccountCard
                                icon={card.icon}
                                title={card.title}
                                description={card.description}
                            />
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Account;