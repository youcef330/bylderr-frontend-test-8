import React, { useState, useEffect } from "react";
import { deactivateAccount } from "../../api/settingsApi";
import DebouncedButton from "../../utils/DebounceButton";
import sanitizeInput from "../../utils/sanitizeInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const DeactivateAccount = () => {
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [confirmation, setConfirmation] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let timeout;
        if (confirmation) {
            timeout = setTimeout(() => setConfirmation(false), 10000);
        }
        return () => clearTimeout(timeout);
    }, [confirmation]);

    useEffect(() => {
        let timeout;
        if (showPassword) {
            timeout = setTimeout(() => setShowPassword(false), 5000);
        }
        return () => clearTimeout(timeout);
    }, [showPassword]);

    const handleInputChange = (e) => {
        const sanitizedPassword = sanitizeInput(e.target.value);
        setPassword(sanitizedPassword);
        if (error) setError("");
    };

    const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

    const clearState = () => {
        setPassword("");
        setError("");
        setConfirmation(false);
    };

    const handleDeactivate = async () => {
        if (!password) {
            setError("Password is required to deactivate the account.");
            return;
        }

        if (!confirmation) {
            setConfirmation(true);
            return;
        }

        setLoading(true);
        setError("");
        try {
            await deactivateAccount(password);
            alert("Your account has been successfully deactivated.");
            clearState();
        } catch (err) {
            setError("Failed to deactivate your account. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white border-2 rounded-lg shadow-lg p-6 space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Deactivate Account</h3>
            <p className="text-sm text-gray-600">
                This will make your account permanently unusable. This action is irreversible.
            </p>
            <p className="text-sm text-gray-600">
                To continue, please enter your password.
            </p>

            {/* Password Input */}
            <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={password}
                        onChange={handleInputChange}
                        placeholder="Enter your password"
                        autoComplete="off"
                        className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                    <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-midnight-blue hover:text-blue-800"
                    >
                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                    </button>
                </div>
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>

            {/* Confirmation */}
            {confirmation && (
                <div className="bg-yellow-50 border border-yellow-500 text-yellow-700 p-2 rounded">
                    <p>Are you sure you want to deactivate your account?</p>
                    <p>This action cannot be undone.</p>
                </div>
            )}

            {/* Confirm and Deactivate button Buttons */}
            <div className="flex space-x-4">
                <DebouncedButton onClick={handleDeactivate} disabled={loading}>
                    {loading ? "Processing..." : confirmation ? "Confirm Deactivation" : "Deactivate Account"}
                </DebouncedButton>
                {confirmation && (
                    <DebouncedButton
                        onClick={() => setConfirmation(false)}
                        disabled={loading}
                    >
                        Cancel
                    </DebouncedButton>
                )}
            </div>

            {/* Password Visibility Warning */}
            {showPassword && (
                <p className="text-sm text-yellow-500 mt-1">
                    Caution: Password is visible. Hide it when done.
                </p>
            )}
        </div>
    );
};

export default DeactivateAccount;