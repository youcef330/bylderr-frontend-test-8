import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const DistributionCalendar = ({
    activeStartDate,
    handleActiveStartDateChange,
    isDistributionDate,
    goToToday,
    goToPreviousMonth,
    goToNextMonth,
    isFirstMonth,
    isLastMonth,
}) => {
    const getMonthYearString = () => {
        return activeStartDate.toLocaleString("default", {
            month: "long",
            year: "numeric",
        });
    };

    return (
        <div>
            <div className="flex flex-col items-right mb-4">
                <h3 className="font-bold text-lg mb-2">Distribution Calendar</h3>
                <div className="flex flex-row justify-between">
                    <span className="font-bold items-center text-md text-midnight-blue">
                        {getMonthYearString()}
                    </span>

                    <div className="flex space-x-2">
                        <button
                            onClick={goToToday}
                            className="text-sm bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                        >
                            Go to Today
                        </button>
                        <button
                            onClick={goToPreviousMonth}
                            className="text-sm bg-gray-500 text-white px-3 py-1 rounded-md hover:bg-gray-600"
                            disabled={isFirstMonth()}
                        >
                            Previous
                        </button>
                        <button
                            onClick={goToNextMonth}
                            className="text-sm bg-gray-500 text-white px-3 py-1 rounded-md hover:bg-gray-600"
                            disabled={isLastMonth()}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>

            <Calendar
                className="react-calendar"
                activeStartDate={activeStartDate}
                onActiveStartDateChange={handleActiveStartDateChange}
                tileClassName={({ date, view }) =>
                    view === "month" && isDistributionDate(date)
                        ? "bg-midnight-blue text-white rounded-full"
                        : null
                }
                showNavigation={false}
            />

            <style>{`
        .react-calendar {
          width: 100%;
          border: none;
          font-family: inherit;
          line-height: 1.125em;
        }

        .react-calendar__tile--now {
          background: #ffff76;
        }

        .text-white {
          color: white !important;
        }

        .rounded-full {
          border-radius: 9999px !important;
        }

        button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        button:hover:not(:disabled) {
          transition: background-color 0.2s;
        }
      `}</style>
        </div>
    );
};

export default DistributionCalendar;