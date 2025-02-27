const mockTaxData = {
    annualIncome: 125000,
    netWorth: 1500000,
    isAccreditedInvestor: false,
    income: 12500.75,
    realizedGains: 3200.5,
    dividendsEarned: 5750,
    interestEarned: 5750,
    capitalGainsLosses: 5750,
    withholding: 1500.25,
    retirementContributions: 2000,
    estimatedTaxDue: 5000,
    taxFilingStatus: "Single",

    taxWithholding: {
        federal: 500,
        state: 300,
        local: 200,
    },
    incomeVerificationDocuments: [
        {
            id: 1,
            name: "Income Verification 2023.pdf",
            url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        },
        {
            id: 2,
            name: "Income Statement.pdf",
            url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        },
    ],

    netWorthVerificationDocuments: [
        {
            id: 1,
            name: "Net Worth Statement.pdf",
            url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        },
        {
            id: 2,
            name: "Assets Overview.pdf",
            url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        },
    ],
    documents: [
        {
            id: 1,
            year: 2023,
            name: "Form 1099-DIV 2023",
            type: "Form 1099-DIV",
            status: "Available",
            url: "/docs/1099-div-2023.pdf",
        },
        {
            id: 2,
            year: 2023,
            name: "Form 1099-B 2023",
            type: "Form 1099-B",
            status: "Available",
            url: "/docs/1099-b-2023.pdf",
        },
        {
            id: 3,
            year: 2023,
            name: "Consolidated Tax Statement",
            type: "Consolidated Statement",
            status: "Available",
            url: "/docs/consolidated-2023.pdf",
        },
        {
            id: 4,
            year: 2024,
            name: "Form 1099-DIV 2024",
            type: "Form 1099-DIV",
            status: "Pending",
            url: "",
        },
    ],
    notifications: [
        {
            message: "Your Form 1099-DIV 2023 is available for download.",
            date: "2023-12-01",
            type: "info",
        },
        {
            message: "Upcoming tax deadline on April 15, 2024.",
            date: "2023-12-10",
            type: "alert",
        },
    ],
};

export default mockTaxData;