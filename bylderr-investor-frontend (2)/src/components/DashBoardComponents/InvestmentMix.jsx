import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { fetchInvestmentMix } from '../../api/dashboardApi';
import formatToUSD from '../../utils/formatToUSD';
import { investmentMixMockData } from '../../mockData/investmentMixMockData';

// Colors for each slice
const COLORS = ["#001c3e", "#002b5c", "#003f8c", "#1e5b9d", "#3d77ae", "#5b93bf", "#79afd0", "#98cbe1", "#b6e7f2"];

// Customized label for PieChart
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, value, index }) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius + (outerRadius - innerRadius) * 0.6;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill={COLORS[index]} textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {formatToUSD(value)}
        </text>
    );
};

const InvestmentMix = () => {
    const [investmentMixData, setInvestmentMixData] = useState([]);
    const [status, setStatus] = useState('idle');
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchInvestmentMixData = async () => {
            setStatus('loading');
            if (import.meta.env.VITE_REACT_APP_AUTH_MODE == 'mock') {
                setInvestmentMixData(investmentMixMockData);
                setStatus('mock');
            }else{
                try {
                    const response = await fetchInvestmentMix();
                    setInvestmentMixData(response.data);
                    setStatus('succeeded');
                } catch (err) {
                    console.error('Error fetching data:', err.message);
                    setInvestmentMixData([{ name: 'N/A', value: 100 }]);
                    setError('Failed to fetch investment mix data. Please refresh the page or try again shortly.');
                    setStatus('failed');
                }
            }
            
        };

        fetchInvestmentMixData();
    }, []);

    if (status === 'loading') {
        return <div>Loading data...</div>;
    }

    return (
        <div className="bg-white rounded-lg shadow-lg p-1 w-auto h-full border-2">
            <div className='p-5'>
                <h2 className="text-2xl font-semibold mb-4">Investment Mix</h2>
                {error && (
                    <div className='bg-yellow-50 border border-yellow-500 text-yellow-700 p-2 rounded mb-4'>
                        {error}
                    </div>
                )}
            </div>
            <ChartAndBreakdown data={investmentMixData} />
        </div>
    );
};

const ChartAndBreakdown = ({ data }) => (
    <>
        {/* Donut Chart */}
        <div className="flex flex-auto justify-center w-full h-1/2">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius="40%"
                        outerRadius="70%"
                        startAngle={90}
                        endAngle={-270}
                        labelLine={true}
                        label={renderCustomizedLabel}
                        fill="#8884d8"
                        dataKey="value"
                        paddingAngle={5}
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip formatter={(value) => formatToUSD(value)} />
                </PieChart>
            </ResponsiveContainer>
        </div>

        {/* Breakdown */}
        <div className="mt-6">
            {data.map((entry, index) => (
                <div key={index} className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                        <div
                            className="w-4 h-4 rounded-full mr-2"
                            style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        ></div>
                        <span className="text-gray-700">{entry.name}</span>
                    </div>
                    <div>
                        <span className="text-gray-700">${entry.value.toLocaleString()}</span>
                        <span className="text-green-500 text-sm ml-2">+{2.3}%</span>
                    </div>
                </div>
            ))}
        </div>
    </>
);

export default InvestmentMix;