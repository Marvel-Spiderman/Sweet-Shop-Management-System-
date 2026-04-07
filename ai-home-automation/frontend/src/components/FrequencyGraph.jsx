import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

// Generate some futuristic-looking demo data for the last 12 hours
const generateMockData = () => {
  const data = [];
  const now = new Date();
  for (let i = 12; i >= 0; i--) {
    let t = new Date(now.getTime() - i * 60 * 60 * 1000);
    const hour = t.getHours();
    let base = 200; 
    if (hour > 18 && hour < 23) base += 800; 
    if (hour > 7 && hour < 10) base += 500;  
    
    data.push({
      time: `${hour.toString().padStart(2, '0')}:00`,
      power: base + Math.random() * 300, 
      solar: (hour > 7 && hour < 18) ? Math.random() * 600 + 200 : 0, 
    });
  }
  return data;
};

// Custom tooltip for Cyberpunk feel
const CyberTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-black/80 border border-[#00f0ff]/30 backdrop-blur-md p-4 rounded-xl shadow-[0_0_15px_rgba(0,240,255,0.2)]">
        <p className="text-[#00f0ff] font-bold mb-2 tracking-widest text-xs uppercase">{label} INTERVAL</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm font-medium" style={{ color: entry.color }}>
            {entry.name.toUpperCase()}: {(entry.value || 0).toFixed(0)}W
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function FrequencyGraph() {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(generateMockData());
    const interval = setInterval(() => {
      setData(current => {
        const newData = [...current];
        const lastEntry = { ...newData[newData.length - 1] };
        lastEntry.power += (Math.random() - 0.5) * 50;
        newData[newData.length - 1] = lastEntry;
        return newData;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full flex flex-col items-center gap-8 py-4">
      
      {/* Interactive Telemetry Chart */}
      <div className="w-full h-[250px] relative flex flex-col">
        <h3 className="text-[#00FFFF] text-xs font-black uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00FFFF] animate-pulse"></span>
          Energy Telemetry (24H)
        </h3>
        <div className="flex-1 w-full relative">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorPower" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00FFFF" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#00FFFF" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorSolar" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8a2be2" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#8a2be2" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="time" stroke="#666" fontSize={10} tickLine={false} axisLine={false} tickMargin={10}/>
              <YAxis stroke="#666" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}W`}/>
              <Tooltip content={<CyberTooltip />} cursor={{ stroke: 'rgba(0, 240, 255, 0.2)', strokeWidth: 1, strokeDasharray: '4 4' }} />
              <Area type="monotone" dataKey="power" name="Grid Draw" stroke="#00FFFF" strokeWidth={3} fillOpacity={1} fill="url(#colorPower)" animationDuration={1500}/>
              <Area type="monotone" dataKey="solar" name="Solar Output" stroke="#8a2be2" strokeWidth={3} fillOpacity={1} fill="url(#colorSolar)" animationDuration={1500}/>
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Abstract Venn Diagram Matrix */}
      <div className="relative w-full h-[320px] flex items-center justify-center bg-transparent mt-4 overflow-hidden border-t border-white/5 pt-8">
        <div className="relative w-[280px] h-[280px] flex items-center justify-center mix-blend-screen -mt-6">
          {/* Top Circle */}
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }} className="absolute origin-center w-full h-full flex items-start justify-center">
            <div className="w-48 h-48 rounded-full border border-[#8a2be2]/50 bg-gradient-to-br from-[#8a2be2]/20 to-transparent -mt-10 flex items-start justify-center pt-8 backdrop-blur-sm transition-all duration-500 hover:bg-[#8a2be2]/30">
              <span className="text-white/80 font-bold text-xs uppercase tracking-widest translate-y-2">Predictive AI</span>
            </div>
          </motion.div>
          {/* Bottom Right */}
          <motion.div animate={{ rotate: -360 }} transition={{ duration: 45, repeat: Infinity, ease: "linear" }} className="absolute origin-center w-full h-full flex items-end justify-end">
            <div className="w-48 h-48 rounded-full border border-[#ffaa00]/50 bg-gradient-to-bl from-[#ffaa00]/20 to-transparent flex items-center justify-end pr-8 backdrop-blur-sm transition-all duration-500 hover:bg-[#ffaa00]/30 -mr-6 -mb-6">
              <span className="text-white/80 font-bold text-xs uppercase tracking-widest text-right max-w-[80px]">User Control</span>
            </div>
          </motion.div>
          {/* Bottom Left */}
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 50, repeat: Infinity, ease: "linear" }} className="absolute origin-center w-full h-full flex items-end justify-start">
            <div className="w-48 h-48 rounded-full border border-[#ff003c]/50 bg-gradient-to-tr from-[#ff003c]/20 to-transparent flex items-center justify-start pl-8 backdrop-blur-sm transition-all duration-500 hover:bg-[#ff003c]/30 -ml-6 -mb-6">
              <span className="text-white/80 font-bold text-xs uppercase tracking-widest max-w-[80px]">Sensor Grid</span>
            </div>
          </motion.div>
          {/* Center Glow */}
          <div className="absolute z-10 w-24 h-24 rounded-full bg-gradient-to-r from-[#00f0ff] via-[#8a2be2] to-[#ff003c] flex items-center justify-center opacity-90 blur-[2px] animate-pulse"></div>
          <div className="absolute z-20 flex flex-col items-center text-center">
              <span className="text-white font-black text-xs md:text-sm uppercase tracking-[0.2em] drop-shadow-[0_0_10px_#fff]">Nexus</span>
              <span className="text-white font-bold text-[10px] uppercase tracking-widest drop-shadow-[0_0_10px_#fff]">AI Core</span>
          </div>
        </div>
      </div>

    </div>
  );
}
