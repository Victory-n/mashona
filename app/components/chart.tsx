"use client";

import { useEffect, useState } from "react";
import {
    LineChart,
    Line,
    XAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

import { chartData } from "../data/json/chart-data";

const GrowthChart = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return <div className="w-full h-100 bg-white rounded-xl" />;
    }

    return (
        <div className="w-full h-100 bg-white rounded-xl p-6 shadow-sm border border-neutral-100 flex flex-col">
            <h2 className="text-xl font-bold mb-6 text-neutral-800">Company Growth</h2>

            <div className="flex-1 w-full min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <XAxis 
                            dataKey="month" 
                            stroke="#A3A3A3" 
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                        />

                        <Tooltip
                            contentStyle={{
                                borderRadius: "12px",
                                border: "1px solid #E5E5E5",
                                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                                padding: "8px 12px"
                            }}
                            cursor={{ stroke: '#E5E5E5', strokeWidth: 2 }}
                        />

                        <Line
                            type="monotone"
                            dataKey="value"
                            stroke="#5A65AB"
                            strokeWidth={4}
                            dot={{ r: 4, fill: '#5A65AB', strokeWidth: 2, stroke: '#fff' }}
                            activeDot={{ r: 6, strokeWidth: 0 }}
                            animationDuration={1500}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default GrowthChart;