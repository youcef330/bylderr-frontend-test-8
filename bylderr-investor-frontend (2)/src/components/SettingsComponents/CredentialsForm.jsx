import React, { useState, useEffect } from "react";
import { updatePassword } from "../../api/settingsApi";
import DebouncedButton from "../../utils/DebounceButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const CredentialsForm = () => {
    const [credentials, setCredentials] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [confirmation, setConfirmation] = useState(false);
    const [success, setSuccess] = useState(false)
    const [loading, setLoading] = useState(false);


    // Automatically hide 5 seconds
    useEffect(() => {
        let timeout;
        if (showPassword) {
            timeout = setTimeout(() => setShowPassword(false), 5000);
        }
        return () => clearTimeout(timeout);
    }, [showPassword]);

    // Password policy: 8+ characters, 1 uppercase, 1 number, 1 special character
    const passwordPolicy = (password) =>
        password.length >= 8 &&
        /[A-Z]/.test(password) &&
        /\d/.test(password) &&
        /[@$!%*?&]/.test(password);


    const sanitizeInput = (value) => value.trim();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCredentials((prev) => ({
            ...prev,
            [name]: sanitizeInput(value),
        }));
        if (error) setError("");
    };

    const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

    const handleUpdatePassword = async () => {
        const { oldPassword, newPassword, confirmPassword } = credentials;

        // Input validations
        if (!oldPassword || !newPassword || !confirmPassword) {
            setError("All fields are required.");
            return;
        }
        if (!passwordPolicy(newPassword)) {
            setError(
                "Password must be at least 8 characters, include 1 uppercase letter, 1 number, and 1 special character."
            );
            return;
        }
        if (newPassword !== confirmPassword) {
            setError("New password and confirm password do not match.");
            return;
        }
        if (!confirmation) {
            setConfirmation(true);
            return;
        }

        setLoading(true);
        try {
            await updatePassword(oldPassword, newPassword);
            setCredentials({ oldPassword: "", newPassword: "", confirmPassword: "" });
            setError("");
            setConfirmation(false);
            setSuccess(true)
        } catch (err) {
            setError("Failed to update password. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white border-2 rounded-lg shadow-lg p-6 space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Update Credentials</h3>
            <p className="text-sm text-gray-600">
                Ensure your new password meets security requirements for a secure update.
            </p>

            {/* Old Password */}
            <div>
                <label className="block text-sm font-medium text-gray-700">Old Password</label>
                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        name="oldPassword"
                        value={credentials.oldPassword}
                        onChange={handleInputChange}
                        placeholder="Enter your old password"
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
            </div>

            {/* New Password */}
            <div>
                <label className="block text-sm font-medium text-gray-700">New Password</label>
                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        name="newPassword"
                        value={credentials.newPassword}
                        onChange={handleInputChange}
                        placeholder="Enter your new password"
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
            </div>

            {/* Confirm Password */}
            <div>
                <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={credentials.confirmPassword}
                        onChange={handleInputChange}
                        placeholder="Confirm your new password"
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
            </div>

            {/* Error and Confirmation */}
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            {confirmation && (
                <div className="bg-yellow-50 border border-yellow-500 text-yellow-700 p-2 rounded">
                    <p>Are you sure you want to update your password?</p>
                    <p>This action will overwrite your existing password.</p>
                </div>
            )}
            {success && (
                <div className="bg-green-50 border border-green-500 text-green-700 p-2 rounded">
                    <p>Password Successfully changed.</p>
                </div>
            )}

            {/* Confirm and update Buttons */}
            <div className="flex space-x-4">
                <DebouncedButton onClick={handleUpdatePassword} disabled={loading}>
                    {loading ? "Processing..." : confirmation ? "Confirm Update" : "Update Password"}
                </DebouncedButton>
                {confirmation && (
                    <DebouncedButton onClick={() => setConfirmation(false)} disabled={loading}>
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

export default CredentialsForm;