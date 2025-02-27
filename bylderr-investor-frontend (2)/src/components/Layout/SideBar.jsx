import React, { useState, useEffect } from 'react';
import Header from './Header';
import { Outlet, useLocation } from 'react-router-dom';
import SideBarButtons from './SideBarButtons';
import LogoButton from './LogoButton';
import LogoutButton from '../LogoutButton';
import BottomBar from './BottomBar';
import BYLDERR_img from '../../assets/BYLDERR_img.png';
import Blyderr_logo from '../../assets/Bylderr_logo.png';
import { MdInsights } from 'react-icons/md';
import { FaUser, FaHome } from 'react-icons/fa';
import { BsFillBuildingsFill } from "react-icons/bs";
import Footer from './Footer';

const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [active, setActive] = useState('dashboard');

    const location = useLocation();

    // Update active tab based on current pathname
    useEffect(() => {
        const currentPath = location.pathname.toLowerCase();

        if (currentPath === '/dashboard') {
            setActive('dashboard');
        } else if (currentPath.startsWith('/listings')) {
            setActive('listings');
        } else if (currentPath.startsWith('/profile')) {
            setActive('profile');
        } else {
            setActive('');
        }
    }, [location]);

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div className="flex h-screen flex-col lg:flex-row">
            {/* Sidebar */}
            <div className='hidden sm:block'>
                <div onClick={toggleSidebar}
                    className={`fixed top-0 left-0 flex flex-col ${isCollapsed ? 'w-20' : 'w-64'
                        } h-full bg-white items-center text-gray-600 transition-all duration-100 ease-in-out shadow-lg border-r z-20`}
                >
                    <LogoButton
                        isCollapsed={isCollapsed}
                        toggleSidebar={toggleSidebar}
                        expandedLogo={BYLDERR_img}
                        collapsedLogo={Blyderr_logo}
                    />

                    <nav className="mt-10 space-y-5 items-center" onClick={(e) => e.stopPropagation()}>
                        <SideBarButtons
                            to="/dashboard"
                            icon={<MdInsights/>}
                            label="Dashboard"
                            isActive={active === 'dashboard'}
                            isCollapsed={isCollapsed}
                        />
                        <SideBarButtons
                            to="/listings"
                            icon={<BsFillBuildingsFill/>}
                            label="Listings"
                            isActive={active === 'listings'}
                            isCollapsed={isCollapsed}
                        />
                        <SideBarButtons
                            to="/profile"
                            icon={<FaUser/>}
                            label="Profile"
                            isActive={active === 'profile'}
                            isCollapsed={isCollapsed}
                        />
                    </nav>
                    <LogoutButton />
                </div>
            </div>

            {/* Main Content */}
            <div className={`flex-1 flex flex-col transition-all duration-300 ${isCollapsed ? 'sm:ml-20' : 'sm:ml-64'}`}>
                <div className="flex-1 overflow-y-auto pt-4 mt-16">
                    <div className={`fixed top-0 left-0 right-0 bg-white z-10 shadow`}>
                        <Header />
                    </div>
                    <Outlet />
                    <Footer />
                    <div className={`fixed bottom-0 left-0 right-0 bg-white z-10 shadow`}>
                        <BottomBar>
                            <SideBarButtons
                                to="/dashboard"
                                icon={<MdInsights/>}
                                label="Dashboard"
                                isActive={active === 'dashboard'}
                                isCollapsed={isCollapsed}
                            />
                            <SideBarButtons
                                to="/listings"
                                icon={<BsFillBuildingsFill/>}
                                label="Listings"
                                isActive={active === 'listings'}
                                isCollapsed={isCollapsed}
                            />
                            <SideBarButtons
                                to="/profile"
                                icon={<FaUser/>}
                                label="Profile"
                                isActive={active === 'profile'}
                                isCollapsed={isCollapsed}
                            />
                        </BottomBar>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;