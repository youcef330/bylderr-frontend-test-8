import React, { useState, useEffect } from 'react';
import { faThLarge, faHome, faUser } from '@fortawesome/free-solid-svg-icons';
import Header from './Header';
import { Outlet } from 'react-router-dom';
import SideBarButtons from './SideBarButtons';
import LogoButton from './LogoButton';
import LogoutButton from '../LogoutButton';
import BottomBar from './BottomBar';

const DeveloperSidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [active, setActive] = useState(() => {
        const savedActiveSection = localStorage.getItem('activeSection');
        return savedActiveSection ? savedActiveSection : 'dashboard';
    });


    useEffect(() => {
        localStorage.setItem('activeSection', active);
    }, [active]);

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    const handleSetActive = (section) => {
        setActive(section);
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
                        expandedLogo="src/assets/BYLDERR_img.png"
                        collapsedLogo="src/assets/Bylderr_logo.png"
                    />

                    <nav className="mt-10 space-y-5 items-center" onClick={(e) => e.stopPropagation()}>
                        <SideBarButtons
                            to="/developer"
                            icon={faThLarge}
                            label="Dashboard"
                            isActive={active === 'dashboard'}
                            onClick={() => handleSetActive('dashboard')}
                            isCollapsed={isCollapsed}
                        />
                        <SideBarButtons
                            to="/developer/listings"
                            icon={faHome}
                            label="Listings"
                            isActive={active === 'listings'}
                            onClick={() => handleSetActive('listings')}
                            isCollapsed={isCollapsed}
                        />
                        <SideBarButtons
                            to="/developer/profile"
                            icon={faUser}
                            label="Profile"
                            isActive={active === 'profile'}
                            onClick={() => handleSetActive('profile')}
                            isCollapsed={isCollapsed}
                        />
                        <LogoutButton />
                    </nav>
                </div>
            </div>

            {/* Main Content */}
            <div className={`flex-1 flex flex-col transition-all duration-300 ${isCollapsed ? 'sm:ml-20' : 'sm:ml-64'}`}>
                <div className="flex-1 overflow-y-auto pt-4 mt-16">
                    <div className={`fixed top-0 left-0 right-0 bg-white z-10 shadow`}>
                        <Header />
                    </div>
                    <Outlet />
                    <div className={`fixed bottom-0 left-0 right-0 bg-white z-10 shadow`}>
                        <BottomBar>
                            <SideBarButtons
                                to="/"
                                icon={faThLarge}
                                label="Dashboard"
                                isActive={active === 'dashboard'}
                                onClick={() => handleSetActive('dashboard')}
                                isCollapsed={isCollapsed}
                            />
                            <SideBarButtons
                                to="/listings"
                                icon={faHome}
                                label="Listings"
                                isActive={active === 'listings'}
                                onClick={() => handleSetActive('listings')}
                                isCollapsed={isCollapsed}
                            />
                            <SideBarButtons
                                to="/profile"
                                icon={faUser}
                                label="Profile"
                                isActive={active === 'profile'}
                                onClick={() => handleSetActive('profile')}
                                isCollapsed={isCollapsed}
                            />
                        </BottomBar>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeveloperSidebar;