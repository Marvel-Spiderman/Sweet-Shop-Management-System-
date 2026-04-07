import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function DashboardView({ isSimulatorOn, devices, metrics }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        if (!isSimulatorOn && data.length === 0) {
            if (metrics.totalPower > 0) {
                const now = new Date();
                const timeStr = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
                setData([{ time: timeStr, usage: metrics.totalPower, predicted: metrics.totalPower }]);
            }
            return;
        }

        const interval = setInterval(() => {
            setData(prev => {
                const now = new Date();
                const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;

                // Mock prediction data - generally tracks real usage with some slight offset
                let predictedVal = ((metrics.totalPower * 0.9) - Math.random() * 50);
                if (predictedVal < 0) predictedVal = 0;

                let newData = [...prev, { time: timeStr, usage: metrics.totalPower, predicted: predictedVal }];
                if (newData.length > 20) newData = newData.slice(newData.length - 20); // keep last 20 ticks
                return newData;
            });
        }, 2000);

        return () => clearInterval(interval);
    }, [isSimulatorOn, metrics.totalPower]);

    return (
        <div className="hud-panel flex flex-col h-full min-h-[400px]">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold uppercase tracking-wider text-gray-300">Power Usage History</h2>
                <div className="flex gap-4">
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                        <div className="w-3 h-3 rounded-full bg-neon-blue shadow-[0_0_8px_#00f3ff]"></div> Real-time (kW)
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                        <div className="w-3 h-3 rounded-full border-2 border-dashed border-neon-green"></div> Predicted
                    </div>
                </div>
            </div>
            <div className="flex-1 w-full h-[320px]">
                {data.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#00f3ff" stopOpacity={0.4} />
                                    <stop offset="95%" stopColor="#00f3ff" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                            <XAxis dataKey="time" stroke="#555" tick={{ fill: '#888', fontSize: 11 }} tickMargin={10} />
                            <YAxis stroke="#555" tick={{ fill: '#888', fontSize: 11 }} />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#111122', border: '1px solid #00f3ff', borderRadius: '8px', boxShadow: '0 0 15px rgba(0,243,255,0.3)', color: '#fff' }}
                                itemStyle={{ color: '#00f3ff' }}
                            />
                            <Area type="monotone" dataKey="usage" stroke="#00f3ff" strokeWidth={3} fillOpacity={1} fill="url(#colorUsage)" isAnimationActive={false} />
                            <Area type="monotone" dataKey="predicted" stroke="#0cf574" strokeWidth={2} strokeDasharray="5 5" fill="none" isAnimationActive={false} />
                        </AreaChart>
                    </ResponsiveContainer>
                ) : (
                    <div className="flex items-center justify-center h-full text-gray-600 border border-dashed border-gray-700 rounded text-sm">
                        Enable Simulator to generate activity map
                    </div>
                )}
            </div>
        </div>
    );
}

export default DashboardView;
