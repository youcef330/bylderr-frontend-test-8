import { createSlice } from '@reduxjs/toolkit';

export const signupSlice = createSlice({
    name: 'signup',
    initialState: {
        email: '',
        password: '',
        confirmPassword: '',
        currentStep: 1,
        investorType: '',
        riskLevel: 1,
        investmentAmount: '',
        selectedRange: '',
        accreditedInvestorStatus: '', 
        annualIncome: '',             
        netWorth: '',                 
        userDetails: {
            firstName: '',
            lastName: '',
            dob: '',
            ssn: '',
            validIdNum: '',
            streetAddress: '',
            unitNumber: '',
            city: '',
            state: '',
            zipCode: '',
            entityName:'',
            ein:'',
            phone:'',
        },
        isSubmitting: false,
        progress: 0,
        locations: [],
        commercial: [],
        residential: [],
        timeHorizon: [],
    },
    reducers: {
        // Set email
        setEmail: (state, action) => {
            state.email = action.payload;
        },
        // Set password
        setPassword: (state, action) => {
            state.password = action.payload;
        },
        // Set confirm password
        setConfirmPassword: (state, action) => {
            state.confirmPassword = action.payload;
        },

        // Set Investor Type
        setInvestorType: (state, action) => {
            state.investorType = action.payload;
        },

        // Set Accredited Investor Status
        setAccreditedInvestorStatus: (state, action) => {
            state.accreditedInvestorStatus = action.payload;
        },

        // Set Annual Income
        setAnnualIncome: (state, action) => {
            state.annualIncome = action.payload;
        },

        // Set Net Worth
        setNetWorth: (state, action) => {
            state.netWorth = action.payload;
        },

        // Navigate to the next step
        nextStep: (state) => {
            state.currentStep += 1;
            state.progress = (state.currentStep / 8) * 100;
        },
        // Navigate to the previous step
        prevStep: (state) => {
            state.currentStep -= 1;
            state.progress = (state.currentStep / 8) * 100;
        },
        // Set if form is being submitted
        setIsSubmitting: (state, action) => {
            state.isSubmitting = action.payload;
        },
        // Set user details for name, address, etc.
        setUserDetails: (state, action) => {
            state.userDetails = { ...state.userDetails, ...action.payload };
        },
        // Set Risk Level of Investor
        setSliderValue: (state, action) => {
            state.riskLevel = action.payload;
        },
        // Set the amount the investor wants to invest
        setInvestmentAmount: (state, action) => {
            state.investmentAmount = action.payload;
        },
        // Set the amount to update the amount when a range is selected
        setSelectedRange: (state, action) => {
            state.selectedRange = action.payload;
            state.investmentAmount = action.payload;
        },
        // Add locations selected by investors
        addLocation: (state, action) => {
            state.locations.push({
                id: Date.now(), // Unique ID for each location
                name: action.payload,
            });
        },
        // Remove locations selected by investors
        removeLocation: (state, action) => {
            state.locations = state.locations.filter(location => location.id !== action.payload);
        },
        // Toggle property type and investor timeframe
        toggleSelection: (state, action) => {
            const { category, value } = action.payload;
            const index = state[category].indexOf(value);
            if (index === -1) {
                state[category].push(value);
            } else {
                state[category].splice(index, 1);
            }
        },
    },
});

export const {
    setEmail,
    setPassword,
    setConfirmPassword,
    nextStep,
    prevStep,
    setIsSubmitting,
    setUserDetails,
    setSliderValue,
    setInvestmentAmount,
    setSelectedRange,
    addLocation,
    removeLocation,
    toggleSelection,
    setInvestorType,
    setAccreditedInvestorStatus,
    setAnnualIncome,
    setNetWorth,
} = signupSlice.actions;

export default signupSlice.reducer;
