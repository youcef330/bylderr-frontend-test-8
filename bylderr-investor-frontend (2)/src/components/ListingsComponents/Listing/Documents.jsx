import { useState } from 'react';
import DocumentItem from './DocumentItem';
import { FaChevronRight, FaChevronDown } from 'react-icons/fa';

/**
 * Documents Component
 *
 * A React component that displays a list of document items. Provides a toggle feature
 * to expand or collapse the list when there are more than 4 documents.
 *
 */
const Documents = ({ documents }) => {
    if (!documents || documents.length === 0) return null;

    const [isExpanded, setIsExpanded] = useState(false);
    const visibleDocuments = isExpanded ? documents : documents.slice(0, 4);


    // Toggles the expansion state of the documents list.
    const toggleDocuments = () => setIsExpanded((prev) => !prev);

    return (
        <>
            <div className="flex flex-row justify-between items-center">
                <h2 className="pt-5 pl-5 font-bold text-gray-500 dark:text-gray-100 text-xl">
                    Documents
                </h2>
                {documents.length > 4 && (
                    <button
                        onClick={toggleDocuments}
                        className="py-2 pl-4 text-right underline text-gray-600 dark:text-gray-100 hover:text-glitter flex items-center"
                    >
                        {isExpanded ? "Show Less" : "Show More"}
                        {isExpanded ? (
                            <FaChevronDown className="pl-2" size={16} />
                        ) : (
                            <FaChevronRight className="pl-2" size={16} />
                        )}
                    </button>
                )}
            </div>
            <div className="grid sm:grid-cols-2 gap-4 p-4">
                {visibleDocuments.map((item, index) => (
                    <DocumentItem key={index} item={item} />
                ))}
            </div>
        </>
    );
};

export default Documents;