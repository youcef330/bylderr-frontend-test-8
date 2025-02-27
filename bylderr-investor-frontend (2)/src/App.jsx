import { Route, Routes, BrowserRouter } from 'react-router-dom';
import React, { Suspense, lazy } from 'react';
import Dashboard from './screens/Dashboard';
import Sidebar from './components/Layout/SideBar';
import ListingsScreen from './screens/ListingsScreen';
import Listing from './screens/Listing';
import ListingsMap from './screens/ListingsMap';
import Profile from './screens/Profile';
import LoginPage from './screens/Login';
import { AuthProvider } from '../contexts/AuthContext';
import ProtectedRoute from './routes/ProtectedRoute';
import PublicRoute from './routes/PublicRoute';
import SignupInvestors from './screens/SignupInvestors';
import HelpInvestors from './screens/HelpInvestors';
import Settings from './screens/Settings';
import Account from './screens/Account';
import PaymentPayoutScreen from './screens/PaymentPayoutScreen';
import OwnedListing from './screens/OwnedListing';
import TaxeScreen from './screens/TaxeScreen';
import Home from './screens/Home';


const App = () => {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Suspense fallback={<div className="text-center mt-20 text-2xl">Loading...</div>}>
                    <Routes>
                        <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
                        <Route path="/signup" element={<PublicRoute><SignupInvestors /></PublicRoute>} />

                        {/* Investor Routes */}
                        <Route
                            path="/"
                            element={
                                <ProtectedRoute requiredRole="investor">
                                    <Sidebar />
                                </ProtectedRoute>
                            }
                        >
                            <Route index element={<Home/>} />
                            <Route path="dashboard" element={<Dashboard />} />
                            <Route path="profile" element={<Profile />} />
                            <Route path="Listings" element={<ListingsScreen />} />
                            <Route path="/Listings/:propertyId" element={<Listing />} />
                            <Route path="/owned-listing/:propertyId" element={<OwnedListing />}/>
                            <Route path="ListingsMap" element={<ListingsMap />} />
                            <Route path='HelpInvestors' element={<HelpInvestors />} />
                            <Route path='Settings' element={<Settings startTab={"account"} />} />
                            <Route path='/account/taxes' element={<TaxeScreen />} />
                            <Route path='account' element={<Account />} />
                            <Route path="/account/payments" element={<PaymentPayoutScreen />} />
                            <Route path='account/notifications' element={<Settings startTab={"notifications"} />} />
                            <Route path='Settings/account' element={<Settings startTab={"account"} />} />
                            <Route path='/account/security' element={<Settings startTab={"security"} />} />
                        </Route>
                        <Route path="*" element={<NotFound />} />

                    </Routes>
                </Suspense>
            </BrowserRouter>
        </AuthProvider>
    );
};



const NotFound = () => (
    <div className="p-8 text-center">
        <h2 className="text-2xl font-bold">404 - Page Not Found</h2>
        <p className="text-gray-600">The page you're looking for doesn't exist.</p>
    </div>
);

export default App;