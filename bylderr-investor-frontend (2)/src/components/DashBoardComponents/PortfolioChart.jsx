import React, { memo } from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

const formatYAxis = (tickItem) => {
    if (tickItem < 1000) {
        return `$${tickItem}`;
    }
    return `$${(tickItem / 1000).toFixed(0)}k`;
};

const formatXAxis = (tickItem) => {
    const date = new Date(tickItem);
    return `${date.getMonth() + 1}/${date.getFullYear()}`;
};

const formatCurrency = (value) => `$${value.toLocaleString()}`;

const PortfolioChart = ({ data }) => {
    return (
        <div className="flex justify-center items-center bg-white p-6">
            <div className="w-full h-full aspect-[7/4]">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={data}
                        margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0,
                        }}
                    >
                        <defs>
                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#003f8c" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#003f8c" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" tickFormatter={formatXAxis} />
                        <YAxis tickFormatter={formatYAxis} />
                        <Tooltip formatter={(value) => formatCurrency(value)} />
                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke="#003f8c"
                            fillOpacity={1}
                            fill="url(#colorValue)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default memo(PortfolioChart);