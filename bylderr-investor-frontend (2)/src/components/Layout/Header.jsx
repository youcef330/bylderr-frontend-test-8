import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle, faCog, faBell } from '@fortawesome/free-solid-svg-icons';
import AddFundsModal from '../AddFunds/AddFundsModal';

const Header = () => {
	const [isModalOpen, setModalOpen] = useState(false);

	const openModal = () => setModalOpen(true);
	const closeModal = () => setModalOpen(false);

	return (
		<header className="flex items-center justify-end bg-white h-20 px-4 shadow-md">
			<button
				className="items-center text-md cursor-pointer mx-5 bg-midnight-blue text-white px-4 py-1 rounded-full hover:bg-blue-100"
				onClick={openModal}
			>
				Add Funds
			</button>

			<AddFundsModal isOpen={isModalOpen} onClose={closeModal} />
			{/* Icons */}
			<div className="flex items-center space-x-4 text-midnight-blue">
				{/* Help Screen */}
				<Link to="/HelpInvestors" className="flex items-center text-lg cursor-pointer hover:text-blue-900">
					<FontAwesomeIcon icon={faQuestionCircle} className="mr-2" />
				</Link>
				{/* Settings Screen */}
				<Link to="/Settings" className="flex items-center text-lg cursor-pointer hover:text-blue-900">
					<FontAwesomeIcon icon={faCog} className="mr-2" />
				</Link>
				{/* Notifications Screen */}
				<Link to='/account/notifications' className="flex items-center text-lg cursor-pointer hover:text-blue-900">
					<FontAwesomeIcon icon={faBell} className="text-lg cursor-pointer hover:text-blue-900" />
				</Link>
			</div>

			{/* User Profile Image */}
			<Link to="/account" className="flex items-center text-lg cursor-pointer ml-5 hover:text-blue-900">
				Profile Picture
			</Link>
		</header>
	);
};

export default Header;