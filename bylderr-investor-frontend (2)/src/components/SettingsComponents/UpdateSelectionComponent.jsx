import React, { useState, useEffect } from 'react';

const UpdateSelectionComponent = ({
    selectionData = { commercial: [], residential: [], timeHorizon: [] },
    onSelectionChange
}) => {
    const [selectedCommercial, setSelectedCommercial] = useState(selectionData.commercial);
    const [selectedResidential, setSelectedResidential] = useState(selectionData.residential);
    const [selectedTimeHorizon, setSelectedTimeHorizon] = useState(selectionData.timeHorizon);

    const options = {
        commercial: ['Industrial', 'Medical', 'Hospitality', 'Office', 'Retail'],
        residential: ['Single-Family', 'Multi-Family', 'Construction', 'Land'],
        timeHorizon: ['Short-Term Investors', 'Long-Term Investors'],
    };

    useEffect(() => {
        setSelectedCommercial(selectionData.commercial);
        setSelectedResidential(selectionData.residential);
        setSelectedTimeHorizon(selectionData.timeHorizon);
    }, [selectionData]);

    const handleSelectionToggle = (category, value) => {
        const updateSelection = (currentSelection) =>
            currentSelection.includes(value)
                ? currentSelection.filter((item) => item !== value)
                : [...currentSelection, value];

        let updatedSelections = { ...selectionData };

        switch (category) {
            case 'commercial':
                const updatedCommercial = updateSelection(selectedCommercial);
                setSelectedCommercial(updatedCommercial);
                updatedSelections.commercial = updatedCommercial;
                break;

            case 'residential':
                const updatedResidential = updateSelection(selectedResidential);
                setSelectedResidential(updatedResidential);
                updatedSelections.residential = updatedResidential;
                break;

            case 'timeHorizon':
                const updatedTimeHorizon = updateSelection(selectedTimeHorizon);
                setSelectedTimeHorizon(updatedTimeHorizon);
                updatedSelections.timeHorizon = updatedTimeHorizon;
                break;

            default:
                break;
        }

        if (onSelectionChange) {
            onSelectionChange(updatedSelections);
        }
    };

    const renderOptions = (category, selectedValues) =>
        options[category].map((option) => (
            <button
                key={option}
                type="button"
                onClick={() => handleSelectionToggle(category, option)}
                className={`px-4 py-2 rounded-md text-gray-700 ${selectedValues.includes(option)
                        ? 'bg-gray-300 font-semibold'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
            >
                {option}
            </button>
        ));

    return (
        <div className="space-y-4">
            {/* Commercial */}
            <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
                <h3 className="font-semibold text-gray-700 mb-2 md:mb-0">Commercial:</h3>
                <div className="flex flex-wrap gap-2">
                    {renderOptions('commercial', selectedCommercial)}
                </div>
            </div>

            {/* Residential */}
            <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
                <h3 className="font-semibold text-gray-700 mb-2 md:mb-0">Residential:</h3>
                <div className="flex flex-wrap gap-2">
                    {renderOptions('residential', selectedResidential)}
                </div>
            </div>

            {/* Time Horizon */}
            <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
                <h3 className="font-semibold text-gray-700 mb-2 md:mb-0">Time Horizon:</h3>
                <div className="flex flex-wrap gap-2">
                    {options.timeHorizon.map((option) => (
                        <div key={option} className="flex flex-col items-start">
                            <button
                                type="button"
                                onClick={() => handleSelectionToggle('timeHorizon', option)}
                                className={`px-4 py-2 rounded-md text-gray-700 ${selectedTimeHorizon.includes(option)
                                        ? 'bg-gray-300 font-semibold'
                                        : 'bg-gray-100 hover:bg-gray-200'
                                    }`}
                            >
                                {option}
                            </button>
                            <p className="text-sm text-gray-500">
                                {option === 'Short-Term Investors'
                                    ? '(Months to a Few Years)'
                                    : '(5-20+ Years)'}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UpdateSelectionComponent;