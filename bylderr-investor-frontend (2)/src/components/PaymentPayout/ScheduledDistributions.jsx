import React, { useState, useEffect } from "react";
import ScheduleSettings from "./ScheduleSettings";
import AdvancedSettings from "./AdvancedSettings";
import DistributionCalendar from "./DistributionCalendar";

const ScheduledDistributions = ({
    frequency,
    banks,
    estimatedAmount,
    defaultCap,
    defaultMin,
    istext,
    isEmail,
    isCalender,
    defaultPrincipalRepaymentOption,

}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isBankOpen, setIsBankOpen] = useState(false);
    const [selectedFrequency, setSelectedFrequency] = useState(frequency);
    const [selectedBank, setSelectedBank] = useState("Chase Bank - **** **** **** 1234");

    const [notifications, setNotifications] = useState({
        text: !!istext,
        email: !!isEmail,
        calendar: !!isCalender,
    });

    const [cap, setCap] = useState(defaultCap);
    const [min, setMin] = useState(defaultMin);
    const [errors, setErrors] = useState({ cap: '', min: '' });
    const [principalRepaymentOption, setPrincipalRepaymentOption] = useState(defaultPrincipalRepaymentOption);

    const [distributionDates, setDistributionDates] = useState("");
    const [nextDistribution, setNextDistribution] = useState("");
    const [distributionDatesList, setDistributionDatesList] = useState([]);
    const [uniqueMonthsWithData, setUniqueMonthsWithData] = useState([]);
    const [activeStartDate, setActiveStartDate] = useState(new Date());

    const frequencies = [
        "Monthly",
        "Bi-monthly",
        "Quarterly",
        "Biannually",
        "Annually",
    ];

    const bankList = [
        "Chase Bank - **** **** **** 1234",
        "Bank of America - **** **** **** 5678",
        "Wells Fargo - **** **** **** 9012",
    ];

    // Dropdown toggles
    const toggleDropdown = () => setIsOpen(!isOpen);
    const toggleBankDropdown = () => setIsBankOpen(!isBankOpen);

    // Handle selections
    const handleSelect = (freq) => {
        setSelectedFrequency(freq);
        setIsOpen(false);
    };

    const handleBankSelect = (bank) => {
        setSelectedBank(bank);
        setIsBankOpen(false);
    };

    // Notification toggle
    const handleToggle = (type) => {
        setNotifications((prev) => ({
            ...prev,
            [type]: !prev[type],
        }));
    };


    const validate = () => {
        let valid = true;
        let newErrors = { cap: '', min: '' };

        if (cap === '') {
            newErrors.cap = 'Distribution Cap is required.';
            valid = false;
        } else if (isNaN(cap)) {
            newErrors.cap = 'Distribution Cap must be a number.';
            valid = false;
        } else if (Number(cap) < 0) {
            newErrors.cap = 'Distribution Cap cannot be negative.';
            valid = false;
        }

        if (min === '') {
            newErrors.min = 'Distribution Minimum is required.';
            valid = false;
        } else if (isNaN(min)) {
            newErrors.min = 'Distribution Minimum must be a number.';
            valid = false;
        } else if (Number(min) < 0) {
            newErrors.min = 'Distribution Minimum cannot be negative.';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            console.log('Form submitted:', { cap, min });
        }
    };

    const getLastDayOfMonth = (year, month) => new Date(year, month + 1, 0);

    const getNextDistributionDate = (distributionMonths, today) => {
        const currentYear = today.getFullYear();
        const distributionDates = [];

        distributionMonths.forEach((month) => {
            const distDate = getLastDayOfMonth(currentYear, month);
            if (distDate >= today) {
                distributionDates.push(distDate);
            }
        });

        if (distributionDates.length === 0) {
            const nextYear = currentYear + 1;
            distributionMonths.forEach((month) => {
                const distDate = getLastDayOfMonth(nextYear, month);
                distributionDates.push(distDate);
            });
        }

        distributionDates.sort((a, b) => a - b);
        return distributionDates[0];
    };

    const calculateDistributionDates = (frequency) => {
        switch (frequency) {
            case "Monthly":
                return "Last day of each month";
            case "Bi-monthly":
                return "Last day of January, March, May, July, September, November";
            case "Quarterly":
                return "Last day of March, June, September, December";
            case "Biannually":
                return "Last day of June, December";
            case "Annually":
                return "Last day of December";
            default:
                return "";
        }
    };

    const calculateNextDistribution = (frequency) => {
        const today = new Date();
        let nextDate = null;

        switch (frequency) {
            case "Monthly":
                nextDate = getNextDistributionDate([...Array(12).keys()], today);
                break;
            case "Bi-monthly":
                nextDate = getNextDistributionDate([0, 2, 4, 6, 8, 10], today);
                break;
            case "Quarterly":
                nextDate = getNextDistributionDate([2, 5, 8, 11], today);
                break;
            case "Biannually":
                nextDate = getNextDistributionDate([5, 11], today);
                break;
            case "Annually":
                nextDate = getNextDistributionDate([11], today);
                break;
            default:
                nextDate = today;
        }

        if (!nextDate) return "";
        const options = { year: "numeric", month: "long", day: "numeric" };
        return nextDate.toLocaleDateString(undefined, options);
    };

    const generateAllDistributionDates = (frequency) => {
        const today = new Date();
        const currentYear = today.getFullYear();
        const nextYear = currentYear + 1;
        let months = [];

        switch (frequency) {
            case "Monthly":
                months = [...Array(12).keys()];
                break;
            case "Bi-monthly":
                months = [0, 2, 4, 6, 8, 10];
                break;
            case "Quarterly":
                months = [2, 5, 8, 11];
                break;
            case "Biannually":
                months = [5, 11];
                break;
            case "Annually":
                months = [11];
                break;
            default:
                months = [];
        }

        const datesThisYear = months.map((m) => getLastDayOfMonth(currentYear, m));
        const datesNextYear = months.map((m) => getLastDayOfMonth(nextYear, m));
        const allDates = [...datesThisYear, ...datesNextYear].filter((date) => date >= today);
        allDates.sort((a, b) => a - b);
        return allDates;
    };

    useEffect(() => {
        setDistributionDates(calculateDistributionDates(selectedFrequency));
        setNextDistribution(calculateNextDistribution(selectedFrequency));
        const datesList = generateAllDistributionDates(selectedFrequency);
        setDistributionDatesList(datesList);

        const monthsWithData = datesList.map((date) => new Date(date.getFullYear(), date.getMonth(), 1));
        const uniqueMonths = [...new Set(monthsWithData.map((d) => d.getTime()))]
            .map((time) => new Date(time))
            .sort((a, b) => a - b);

        const today = new Date();
        const currentMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        if (!uniqueMonths.some((date) => date.getMonth() === currentMonth.getMonth() && date.getFullYear() === currentMonth.getFullYear())) {
            uniqueMonths.unshift(currentMonth);
        }

        setUniqueMonthsWithData(uniqueMonths);
        setActiveStartDate(currentMonth);
    }, [selectedFrequency]);

    const isDistributionDate = (date) => {
        return distributionDatesList.some(
            (distDate) =>
                distDate.getFullYear() === date.getFullYear() &&
                distDate.getMonth() === date.getMonth() &&
                distDate.getDate() === date.getDate()
        );
    };

    const handleActiveStartDateChange = ({ activeStartDate }) => {
        setActiveStartDate(activeStartDate);
    };

    // Navigation handlers for calendar
    const goToToday = () => {
        const today = new Date();
        const currentMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        setActiveStartDate(currentMonth);
    };

    const goToPreviousMonth = () => {
        const index = uniqueMonthsWithData.findIndex(
            (d) => d.getFullYear() === activeStartDate.getFullYear() && d.getMonth() === activeStartDate.getMonth()
        );
        if (index > 0) {
            setActiveStartDate(uniqueMonthsWithData[index - 1]);
        }
    };

    const goToNextMonth = () => {
        const index = uniqueMonthsWithData.findIndex(
            (d) => d.getFullYear() === activeStartDate.getFullYear() && d.getMonth() === activeStartDate.getMonth()
        );
        if (index < uniqueMonthsWithData.length - 1) {
            setActiveStartDate(uniqueMonthsWithData[index + 1]);
        }
    };

    const isFirstMonth = () => {
        const index = uniqueMonthsWithData.findIndex(
            (d) => d.getFullYear() === activeStartDate.getFullYear() && d.getMonth() === activeStartDate.getMonth()
        );
        return index === 0;
    };

    const isLastMonth = () => {
        const index = uniqueMonthsWithData.findIndex(
            (d) => d.getFullYear() === activeStartDate.getFullYear() && d.getMonth() === activeStartDate.getMonth()
        );
        return index === uniqueMonthsWithData.length - 1;
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-4">
            {/* Left Column: Schedule Settings */}
            <ScheduleSettings
                frequencies={frequencies}
                selectedFrequency={selectedFrequency}
                isOpen={isOpen}
                toggleDropdown={toggleDropdown}
                handleSelect={handleSelect}
                distributionDates={distributionDates}
                nextDistribution={nextDistribution}
                estimatedAmount={estimatedAmount}
                selectedBank={selectedBank}
                bankList={banks || bankList}
                isBankOpen={isBankOpen}
                toggleBankDropdown={toggleBankDropdown}
                handleBankSelect={handleBankSelect}
            />

            {/* Middle Column: Advanced Settings */}
            <AdvancedSettings
                cap={cap}
                setCap={setCap}
                min={min}
                setMin={setMin}
                errors={errors}
                handleSubmit={handleSubmit}
                notifications={notifications}
                handleToggle={handleToggle}
                principalRepaymentOption={principalRepaymentOption}
                setPrincipalRepaymentOption={setPrincipalRepaymentOption}
            />

            {/* Right Column: Distribution Calendar */}
            <DistributionCalendar
                activeStartDate={activeStartDate}
                handleActiveStartDateChange={handleActiveStartDateChange}
                isDistributionDate={isDistributionDate}
                goToToday={goToToday}
                goToPreviousMonth={goToPreviousMonth}
                goToNextMonth={goToNextMonth}
                isFirstMonth={isFirstMonth}
                isLastMonth={isLastMonth}
                uniqueMonthsWithData={uniqueMonthsWithData}
            />
        </div>
    );
};

export default ScheduledDistributions;