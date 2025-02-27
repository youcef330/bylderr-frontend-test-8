import React from 'react';
import { useSelector } from 'react-redux';
import BackButton from '../components/BackButton';
import logo from '../assets/BYLDERR_img.png';
import EmailPassword from '../components/SignupInvestor/EmailPassword';
import InvestorType from '../components/SignupInvestor/InvestorType';
import InvestorDetails from '../components/SignupInvestor/InvestorDetails';
import NextSteps from '../components/SignupInvestor/NextSteps';
import ReviewSubmit from '../components/SignupInvestor/ReviewSubmit';
import InvestorPreferences from '../components/SignupInvestor/InvestorPreferences';
import StripePayment from '../components/SignupInvestor/StripePayment';
import InvestorStatus from '../components/SignupInvestor/InvestorStatus';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdBadge, faBuildingColumns, faDollarSign } from '@fortawesome/free-solid-svg-icons';

const getWidthClass = (step) => {
    switch (step) {
        case 2:
            return 'w-full sm:w-2/5';
        case 3:
            return 'w-full sm:w-2/5';
        default:
            return 'w-full sm:w-auto';
    }
};

const SignupInvestors = () => {
    const { currentStep, progress, investorType } = useSelector((state) => state.signup);

    return (
        <div className="relative min-h-screen w-full overflow-hidden">
            <img src={logo} alt="Logo" className="absolute top-1 left-4 w-40 h-auto" />
            <div className="absolute inset-0 bg-NySkyline bg-cover bg-center opacity-20" />

            <div className="relative grid place-items-center min-h-screen">
                <div className="absolute top-1 right-4">
                    <BackButton />
                </div>

                <form className={`p-8 my-10 bg-white rounded-lg shadow-lg ${getWidthClass(currentStep)}`}>

                    {currentStep === 1 && (
                        <div>
                            <h2 className="text-midnight-blue text-3xl font-bold text-center mb-1">
                                Begin your Investment Journey
                            </h2>
                            <h2 className="text-midnight-blue text-3xl font-bold text-center mb-10">
                                with BYLDERR
                            </h2>
                        </div>
                    )}
                    {currentStep === 4 && (
                        <div>
                            <h2 className="text-midnight-blue text-3xl font-bold text-center mb-10">
                                Start Investing in three easy steps
                            </h2>
                        </div>
                    )}

                    {currentStep >= 5 && currentStep <= 7 && (
                        <>
                            <div className="flex justify-center items-center sm:hidden">
                                {currentStep === 5 && (
                                    <FontAwesomeIcon
                                        icon={faIdBadge}
                                        className="text-white bg-midnight-blue rounded-full p-3 w-10 h-10 text-2xl"
                                    />
                                )}
                                {currentStep === 6 && (
                                    <FontAwesomeIcon
                                        icon={faBuildingColumns}
                                        className="text-white bg-midnight-blue rounded-full p-3 w-10 h-10 text-2xl"
                                    />
                                )}
                                {currentStep === 7 && (
                                    <FontAwesomeIcon
                                        icon={faDollarSign}
                                        className="text-white bg-midnight-blue rounded-full p-3 w-10 h-10 text-3xl"
                                    />
                                )}
                            </div>

                            <div className="hidden sm:flex justify-between items-center mb-10">
                                <div className="flex flex-col items-center">
                                    <FontAwesomeIcon
                                        icon={faIdBadge}
                                        className={`${currentStep === 5
                                            ? 'text-white bg-midnight-blue'
                                            : 'text-midnight-blue bg-midnight-white'
                                            } rounded-full p-3 w-10 h-10 text-2xl`}
                                    />
                                    <span className="text-md mt-1">
                                        {investorType === 'Individual' ? 'Individual Information' : 'Entity Information'}
                                    </span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <FontAwesomeIcon
                                        icon={faBuildingColumns}
                                        className={`${currentStep === 6
                                            ? 'text-white bg-midnight-blue'
                                            : 'text-midnight-blue bg-midnight-white'
                                            } rounded-full p-3 w-10 h-10 text-2xl`}
                                    />
                                    <span className="text-md mt-1">Connect your Bank account</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <FontAwesomeIcon
                                        icon={faDollarSign}
                                        className={`${currentStep === 7
                                            ? 'text-white bg-midnight-blue'
                                            : 'text-midnight-blue bg-midnight-white'
                                            } rounded-full p-3 w-10 h-10 text-2xl`}
                                    />
                                    <span className="text-md mt-1">Investment Preferences</span>
                                </div>
                            </div>
                        </>
                    )}

                    {currentStep === 7 && (
                        <h2 className="text-midnight-blue text-3xl font-bold text-center pt-10 mb-10 sm:mx-56">
                            Investment Preferences
                        </h2>
                    )}

                    {currentStep === 8 && (
                        <h2 className="text-midnight-blue text-3xl font-bold text-center mb-10 mx-10">
                            Review and Submit
                        </h2>
                    )}

                    {currentStep === 1 && <EmailPassword />}
                    {currentStep === 2 && <InvestorType />}
                    {currentStep === 3 && <InvestorStatus />}
                    {currentStep === 4 && <NextSteps />}
                    {currentStep === 5 && <InvestorDetails />}
                    {currentStep === 6 && <StripePayment />}
                    {currentStep === 7 && <InvestorPreferences />}
                    {currentStep === 8 && <ReviewSubmit />}

                    <div className="w-full bg-gray-200 rounded-full mt-10">
                        <div
                            className="bg-midnight-blue text-xs leading-none py-1 text-center text-white rounded-full"
                            style={{ width: `${progress}%` }}
                        >
                            {Math.round(progress)}%
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignupInvestors;