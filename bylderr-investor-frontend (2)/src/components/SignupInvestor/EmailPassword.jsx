import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setEmail, setPassword, nextStep } from '../../slices/signupSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const EmailPassword = () => {
    const dispatch = useDispatch();
    const { email, password } = useSelector((state) => state.signup);

    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [passwordError, setPasswordError] = useState('');
    const [emailError, setEmailError] = useState('');

    const validateEmail = (emailInput) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(emailInput);
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const handleNext = () => {
        if (!validateEmail(email)) {
            setEmailError('Please enter a valid email address');
        } else if (password !== confirmPassword) {
            setPasswordError('Passwords do not match');
            setEmailError('');
        } else if (password.length < 6) {
            setPasswordError('Password should be at least 6 characters long');
            setEmailError('');
        } else {
            setPasswordError('');
            setEmailError('');
            dispatch(nextStep());
        }
    };

    let confirmPasswordClasses = 'w-full px-3 py-2 border rounded-lg focus:outline-none ';
    if (confirmPassword.length > 0) {
        if (password === confirmPassword) {
            confirmPasswordClasses += 'border-green-500 focus:ring-2 focus:ring-green-500';
        } else {
            confirmPasswordClasses += 'border-red-500 focus:ring-2 focus:ring-red-500';
        }
    } else {
        confirmPasswordClasses += 'focus:ring-2 focus:ring-blue-500';
    }

    return (
        <div>
            <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-semibold mb-2"
            >
                Email
            </label>
            <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => {
                    const newEmail = e.target.value;
                    dispatch(setEmail(newEmail));
                    setEmailError(validateEmail(newEmail) ? '' : 'Please enter a valid email address');
                }}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${emailError ? 'focus:ring-red-500 border-red-500' : 'focus:ring-blue-500'
                    }`}
                required
            />
            {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}

            <label
                htmlFor="password"
                className="block text-gray-700 text-sm font-semibold mt-4"
            >
                Password
            </label>
            <div className="relative">
                <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={password}
                    onChange={(e) => dispatch(setPassword(e.target.value))}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
                <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-blue-600 hover:text-blue-800"
                >
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </button>
            </div>

            <label
                htmlFor="confirm-password"
                className="block text-gray-700 text-sm font-semibold mt-4"
            >
                Confirm Password
            </label>
            <input
                type={showPassword ? 'text' : 'password'}
                id="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={confirmPasswordClasses}
                required
            />

            {passwordError && <p className="text-red-500 text-sm mt-2">{passwordError}</p>}

            <button
                type="button"
                onClick={handleNext}
                className="w-full bg-midnight-blue text-white py-2 px-4 rounded-lg mt-5 hover:bg-blue-600"
            >
                Next
            </button>
        </div>
    );
};

export default EmailPassword;