import React, { createContext, useContext, useState } from 'react';
import { loginUser, fetchUserData } from '../src/api/authApi';
import CryptoJS from 'crypto-js';
import Cookies from 'js-cookie';

const AuthContext = createContext();

const ENCRYPTION_KEY = import.meta.env.VITE_ENCRYPTION_KEY;

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        const encryptedAuth = Cookies.get('isAuthenticated');
        if (encryptedAuth) {
            const decryptedAuth = CryptoJS.AES.decrypt(encryptedAuth, ENCRYPTION_KEY).toString(CryptoJS.enc.Utf8);
            return decryptedAuth === 'true';
        }
        return false;
    });

    const [role, setRole] = useState(() => {
        const encryptedRole = Cookies.get('role');
        if (encryptedRole) {
            return CryptoJS.AES.decrypt(encryptedRole, ENCRYPTION_KEY).toString(CryptoJS.enc.Utf8);
        }
        return '';
    });

    const [userData, setUserData] = useState(() => {
        const encryptedUserData = Cookies.get('userData');
        if (encryptedUserData) {
            const decryptedUserData = CryptoJS.AES.decrypt(encryptedUserData, ENCRYPTION_KEY).toString(CryptoJS.enc.Utf8);
            return JSON.parse(decryptedUserData);
        }
        return null;
    });

    const encryptData = (data) => CryptoJS.AES.encrypt(data, ENCRYPTION_KEY).toString();

    const decryptData = (data) => CryptoJS.AES.decrypt(data, ENCRYPTION_KEY).toString(CryptoJS.enc.Utf8);

    const login = async (username, password) => {
        const isDevMode = import.meta.env.VITE_REACT_APP_AUTH_MODE === 'redux';

        try {
            if (!isDevMode) {
                if (username === 'noah@gmail.com' && password === 'password123') {
                    const hardcodedUserData = {
                        id: '1',
                        name: 'Noah',
                        role: 'investor',
                        permissions: ['read', 'write',],
                        preferences: {
                            theme: 'dark',
                            language: 'en',
                        },
                    };

                    setIsAuthenticated(true);
                    setRole(hardcodedUserData.role);
                    setUserData(hardcodedUserData);

                    Cookies.set('isAuthenticated', encryptData('true'), { secure: true });
                    Cookies.set('role', encryptData(hardcodedUserData.role), { secure: true });
                    Cookies.set('userData', encryptData(JSON.stringify(hardcodedUserData)), { secure: true });

                    return true;
                } else {
                    return false;
                }
            } else {
                const loginResponse = await loginUser(username, password);
                setIsAuthenticated(true);
                setRole(loginResponse.role);

                const userDataResponse = await fetchUserData();
                setUserData(userDataResponse);

                Cookies.set('isAuthenticated', encryptData('true'), { secure: true });
                Cookies.set('role', encryptData(loginResponse.role), { secure: true });
                Cookies.set('userData', encryptData(JSON.stringify(userDataResponse)), { secure: true });

                return true;
            }
        } catch (error) {
            console.error('Login failed:', error);
            return false;
        }
    };

    const logout = () => {
        setIsAuthenticated(false);
        setRole('');
        setUserData(null);

        Cookies.remove('isAuthenticated');
        Cookies.remove('role');
        Cookies.remove('userData');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, role, userData }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);