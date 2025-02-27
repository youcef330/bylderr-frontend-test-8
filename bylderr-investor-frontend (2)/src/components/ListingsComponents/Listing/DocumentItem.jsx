import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileLines } from '@fortawesome/free-solid-svg-icons';
import { downloadDocument } from '../../../api/listingsApi';

const DocumentItem = ({ item }) => {
    const [error, setError] = useState(null);

    const handleDownload = async () => {
        setError(null);
        try {
            const fileData = await downloadDocument(item);
            const url = window.URL.createObjectURL(new Blob([fileData]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', item);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error('Error downloading the document:', error.message);
            setError('Failed to download the document. Please try again.');
        }
    };

    return (
        <div>
            <button
                onClick={handleDownload}
                className="text-gray-600 w-full p-4 rounded-lg shadow hover:text-midnight-blue text-left"
            >
                <FontAwesomeIcon className="text-midnight-blue pr-5" icon={faFileLines} /> {item}
            </button>
            {error && (
                <div className="bg-yellow-50 border border-yellow-500 text-yellow-700 p-2 rounded mt-2">
                    {error}
                </div>
            )}
        </div>
    );
};

export default DocumentItem;