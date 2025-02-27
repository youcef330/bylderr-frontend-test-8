const propertyDetailsInfo = {
    id: {
        title: "Property ID",
        description: "Unique identifier for the property."
    },
    name: {
        title: "Property Name",
        description: "The official name or title of the property."
    },
    lineSummary: {
        title: "Summary",
        description: "A brief summary of the property features."
    },
    paragraph: {
        title: "Description",
        description: "A detailed description of the property."
    },
    soldPercentage: {
        title: "Sold Percentage",
        description: "The percentage of the property that has been sold or funded."
    },
    street: {
        title: "Street Address",
        description: "Street location of the property."
    },
    city: {
        title: "City",
        description: "City where the property is located."
    },
    state: {
        title: "State",
        description: "State where the property is located."
    },
    zipcode: {
        title: "ZIP Code",
        description: "Postal code for the property location."
    },
    neighborhood: {
        title: "Neighborhood",
        description: "Area or community where the property is situated."
    },
    nearbyFacilities: {
        title: "Nearby Facilities",
        description: "Facilities or landmarks close to the property."
    },
    otherFacility: {
        title: "Other Facility",
        description: "Additional facility or landmark near the property."
    },
    propertyType: {
        title: "Property Type",
        description: "Type or classification of the property."
    },
    otherType: {
        title: "Other Type",
        description: "Additional specification for property type if applicable."
    },
    yearBuilt: {
        title: "Year Built",
        description: "The year the property was originally constructed."
    },
    yearRenovated: {
        title: "Year Renovated",
        description: "The year the property was last renovated, if applicable."
    },
    propertyCondition: {
        title: "Property Condition",
        description: "Current condition or grade of the property.",
        options: [
            { name: "Class A", definition: "Prime locations, modern designs, premium tenants, high rents." },
            { name: "Class B", definition: "Secondary areas, affordable, mix of local and national tenants." },
            { name: "Class C", definition: "Older spaces, less desirable, budget-focused, lower rents." },
            { name: "Class D", definition: "Distressed areas, outdated, low rents, high vacancy." },
        ]
    },
    squareFootage: {
        title: "Square Footage",
        description: "Total area of the property in square feet."
    },
    parkingSpaces: {
        title: "Parking Spaces",
        description: "Number of parking spaces available at the property."
    },
    bedrooms: {
        title: "Bedrooms",
        description: "Number of bedrooms in the property."
    },
    bathrooms: {
        title: "Bathrooms",
        description: "Number of bathrooms in the property."
    },
    hasGarage: {
        title: "Garage",
        description: "Indicates if the property includes a garage."
    },
    hasBasement: {
        title: "Basement",
        description: "Indicates if the property includes a basement."
    },
    isOccupied: {
        title: "Occupied",
        description: "Indicates if the property is currently occupied."
    },
    propertyStatus: {
        title: "Property Status",
        description: "Current status of the property (e.g., Listed, Leased, Pending)."
    },
    propertyAmenities: {
        title: "Amenities",
        description: "Features and amenities offered by the property."
    },
    numberOfUnits: {
        title: "Number of Units",
        description: "Total housing units available in the property."
    },
    occupancyRate: {
        title: "Occupancy Rate",
        description: "Percentage of occupied units in the property."
    },
    floors: {
        title: "Floors",
        description: "Number of floors in the property."
    },
    lotSize: {
        title: "Lot Size",
        description: "Size of the land the property occupies (in acres or sqft)."
    },
    zoning: {
        title: "Zoning",
        description: "Zoning classification of the property."
    },
    topography: {
        title: "Topography",
        description: "The physical characteristics of the land (e.g., Flat, Hilly)."
    },
    expectedCompletionDate: {
        title: "Expected Completion Date",
        description: "Anticipated date for construction or renovation completion."
    },
    constructionPhase: {
        title: "Construction Phase",
        description: "Current phase of construction if applicable."
    },
    estimatedConstructionCost: {
        title: "Estimated Construction Cost",
        description: "Projected cost of construction or renovation."
    },
    permitStatus: {
        title: "Permit Status",
        description: "Current status of necessary permits."
    },
    floorCount: {
        title: "Floor Count",
        description: "Number of floors or stories in the building."
    },
    loadingDocks: {
        title: "Loading Docks",
        description: "Number of loading docks available at the property."
    },
    specializedEquipment: {
        title: "Specialized Equipment",
        description: "Equipment specific to the property's purpose (e.g., Medical)."
    },
    numberOfRooms: {
        title: "Number of Rooms",
        description: "Total number of rooms in the property."
    },
    starRating: {
        title: "Star Rating",
        description: "Rating for hospitality properties."
    },
    footTraffic: {
        title: "Foot Traffic",
        description: "Estimated foot traffic near the property (for retail)."
    },
    rent: {
        title: "Rent",
        description: "Monthly rental amount."
    },
    grossRentalIncome: {
        title: "Gross Rental Income",
        description: "Annual rental income before expenses."
    },
    noi: {
        title: "Net Operating Income (NOI)",
        description: "Income from the property after deducting operating expenses."
    },
    capRate: {
        title: "Capitalization Rate (Cap Rate)",
        description: "Rate of return on the property based on NOI."
    },
    propertyValue: {
        title: "Property Value",
        description: "Estimated market value of the property."
    },
    latitude: {
        title: "Latitude",
        description: "Geographical latitude coordinate of the property."
    },
    longitude: {
        title: "Longitude",
        description: "Geographical longitude coordinate of the property."
    },
    investmentMinimum: {
        title: "Investment Minimum",
        description: "Minimum investment amount required."
    },
    expectedReturns: {
        title: "Expected Returns",
        description: "Anticipated return on investment (ROI) percentage."
    },
    offeringBreakdown: {
        title: "Offering Breakdown",
        description: "Detailed breakdown of the investment offering."
    },
    contractPrice: {
        title: "Contract Price",
        description: "Price agreed upon in the purchase contract."
    },
    cashReserve: {
        title: "Cash Reserve",
        description: "Amount reserved in cash for emergencies or operations."
    },
    improvementCost: {
        title: "Improvement Cost",
        description: "Estimated cost for property improvements."
    },
    dueDiligence: {
        title: "Due Diligence",
        description: "Costs associated with due diligence processes."
    },
    acquisitionFee: {
        title: "Acquisition Fee",
        description: "Fee for acquiring the property."
    },
    initialImages: {
        title: "Initial Images",
        description: "Primary images showcasing the property."
    },
    documents: {
        title: "Documents",
        description: "Legal and informational documents related to the property."
    },
    financialDetails: {
        title: "Financial Details",
        description: "Detailed breakdown of income and expenses."
    },
    propertyUpdates: {
        title: "Property Updates",
        description: "Recent updates or changes related to the property."
    }
};

export default propertyDetailsInfo;