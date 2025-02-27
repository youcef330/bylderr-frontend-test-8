import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    return (
        <footer className="bg-glitter text-midnight-blue pt-20 py-10 w-full">
            <div className="px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">

                    {/* Potenital Links for Footer */}
                    <div>
                        <h2 className="text-lg font-semibold mb-4">BYLDERR</h2>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="text-sm text-gray-500 hover:underline">Privacy Policy</a>
                            </li>
                            <li>
                                <a href="#" className="text-sm text-gray-500 hover:underline">Terms of Service</a>
                            </li>
                            <li>
                                <a href="#" className="text-sm text-gray-500 hover:underline">Support</a>
                            </li>
                            <li>
                                <a href="#" className="text-sm text-gray-500 hover:underline">Contact Us</a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Information */}
                    <div>
                        <h2 className="text-lg font-semibold mb-4">Contact Us</h2>
                        <p className="text-sm text-gray-500">123 Main St, Suite 100</p>
                        <p className="text-sm text-gray-500">City, State, ZIP</p>
                        <p className="text-sm text-gray-500">Phone: (123) 456-7890</p>
                        <p className="text-sm text-gray-500">Email: info@bylderr.com</p>
                    </div>

                    {/* Social Media Links */}
                    <div>
                        <h2 className="text-lg font-semibold mb-4">Follow Us</h2>
                        <div className="flex justify-center space-x-4">
                            <a href="#" className="text-gray-400 hover:text-gray-300">
                                <FontAwesomeIcon icon={faFacebook} size="lg" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-gray-300">
                                <FontAwesomeIcon icon={faTwitter} size="lg" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-gray-300">
                                <FontAwesomeIcon icon={faInstagram} size="lg" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-gray-300">
                                <FontAwesomeIcon icon={faLinkedin} size="lg" />
                            </a>
                        </div>
                    </div>

                </div>

                {/* Copyright */}
                <div className="text-center border-t border-gray-500 mt-8 pt-4">
                    <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} BYLDERR. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;