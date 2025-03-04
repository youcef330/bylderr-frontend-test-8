import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../assets/BYLDERR_img.png';

const LoginPage = () => {
    const { login, role } = useAuth();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [userType, setUserType] = useState('investor');

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        const success = await login(username, password);
        if (success) {
            if (role === 'developer') {
                navigate('/developer');
            } else if (role === 'investor') {
                navigate('/');
            }
        } else {
            setError('Invalid username or password');
        }
    };

    return (
        <div className="relative w-full min-h-screen">
            <img src={logo} alt="Logo" className="absolute top-1 left-4 w-40 h-auto" />
            {/* Apply different background based on userType */}
            <div
                className={`absolute inset-0 bg-cover bg-center opacity-20 ${userType === 'developer' ? 'bg-DevNySkyline' : 'bg-NySkyline'
                    }`}
            />
            <div className="relative z-10 flex items-center justify-center h-full">
                <div className="flex flex-col items-center justify-center h-screen bg-no-repeat">
                    <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold text-center mb-6">
                            {userType === 'developer' ? 'Developer Login' : 'Investor Login'}
                        </h2>
                        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                        <form onSubmit={handleLogin}>
                            <input
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="border border-gray-300 p-2 rounded mb-4 w-full"
                                required
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="border border-gray-300 p-2 rounded mb-4 w-full"
                                required
                            />
                            <button
                                type="submit"
                                className="w-full py-2 text-white bg-indigo-900 rounded-full hover:bg-indigo-700"
                            >
                                Log In
                            </button>
                        </form>
                        <div className="text-center mt-4">
                            <p className="text-sm text-gray-600">
                                {userType === 'investor' ? (
                                    <>
                                        Not an investor yet?{' '}
                                        <Link to="/signup" className="text-indigo-600 hover:underline">
                                            Click here
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        Interested in our developer program?{' '}
                                        <Link to="/developer-program" className="text-indigo-600 hover:underline">
                                            Learn more
                                        </Link>
                                    </>
                                )}
                            </p>
                        </div>
                        <div className="text-center mt-4">
                            <button
                                onClick={() => setUserType(userType === 'developer' ? 'investor' : 'developer')}
                                className="text-sm text-indigo-600 hover:underline"
                            >
                                {userType === 'investor'
                                    ? 'Interested in Listing your properties? Click here'
                                    : 'Login as Investor'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage