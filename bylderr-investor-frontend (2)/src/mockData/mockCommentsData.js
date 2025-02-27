export const mockCommentsData = [
    {
        id: 1,
        authorName: "John (Investor)",
        text: "Could you share the expected ROI for the next 5 years?",
        timestamp: "2 hours ago",
        upvotes: 4,
        downvotes: 0,
        replies: [
            {
                id: 2,
                authorName: "Property Manager",
                text: "Based on current market conditions, we're projecting around 8-10% annual ROI. However, this can vary with local economic factors.",
                timestamp: "1 hour ago",
                upvotes: 2,
                downvotes: 0,
                replies: [
                    {
                        id: 3,
                        authorName: "John (Investor)",
                        text: "That sounds reasonable. Do these projections account for potential renovations?",
                        timestamp: "45 minutes ago",
                        upvotes: 1,
                        downvotes: 0,
                        replies: [
                            {
                                id: 4,
                                authorName: "Property Manager",
                                text: "Yes, we've factored in minor renovations based on the property’s current inspection report.",
                                timestamp: "30 minutes ago",
                                upvotes: 0,
                                downvotes: 0,
                                replies: [],
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        id: 5,
        authorName: "Elena (Investor)",
        text: "What’s the current occupancy rate for the units?",
        timestamp: "1 hour ago",
        upvotes: 3,
        downvotes: 0,
        replies: [
            {
                id: 6,
                authorName: "Property Manager",
                text: "Currently, we’re at 95% occupancy. One of the units is set to be vacant next month, but we have multiple interested parties.",
                timestamp: "45 minutes ago",
                upvotes: 1,
                downvotes: 0,
                replies: [],
            },
        ],
    },
    {
        id: 7,
        authorName: "Marcus (Investor)",
        text: "Are there any major repairs or capital expenditures we should be aware of in the next year?",
        timestamp: "30 minutes ago",
        upvotes: 1,
        downvotes: 0,
        replies: [
            {
                id: 8,
                authorName: "Property Manager",
                text: "No major repairs are anticipated. We replaced the roof last year, and the HVAC units were serviced recently. Minor upkeep should be expected but nothing major.",
                timestamp: "15 minutes ago",
                upvotes: 0,
                downvotes: 0,
                replies: [],
            },
        ],
    },
];