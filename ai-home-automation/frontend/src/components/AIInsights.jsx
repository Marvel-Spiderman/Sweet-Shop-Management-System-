import React, { useState, useEffect } from 'react';
import { Cpu, Sparkles } from 'lucide-react';

function AIInsights({ isAutomationOn, isActive }) {
    const [tip, setTip] = useState("Awaiting simulation data...");

    useEffect(() => {
        if (!isActive) {
            setTip("Simulator paused. Ready for analysis.");
            return;
        }

        let tips = [
            "AI suggests running the washing machine after 9 PM to save 15% energy.",
            "Weather analysis: Cooling costs predicted to spike at 2 PM. Pre-cooling recommended.",
            "Idle device detected: Living Room TV standby power is 4W.",
            "Energy usage in Bedroom is 12% higher than last week's average."
        ];

        if (isAutomationOn) {
            setTip("Auto-Mode starting... initializing smart schedules based on predicted load.");
            const to = setTimeout(() => {
                setTip("Automated optimization active: Adjusted HVAC to 26°C and dimmed living room lamps. Target savings: 35%.");
            }, 3000);
            return () => clearTimeout(to);
        } else {
            setTip(tips[0]);
            let i = 1;
            const iter = setInterval(() => {
                setTip(tips[i % tips.length]);
                i++;
            }, 7000);
            return () => clearInterval(iter);
        }
    }, [isActive, isAutomationOn]);

    return (
        <div className={`hud-panel relative transition-all duration-500 ${isAutomationOn ? 'border-neon-pink/60 shadow-[#ff00ff_0_0_15px_inset]' : 'border-gray-800'}`}>
            <div className={`flex gap-2 items-center mb-3 ${isAutomationOn ? 'text-neon-pink text-shadow-[#ff00ff_0_0_8px]' : 'text-gray-500'}`}>
                <Cpu size={18} />
                <span className="text-xs font-bold uppercase tracking-widest">Predictive Agent</span>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed min-h-[4rem] flex items-center">
                {tip}
            </p>
            {isAutomationOn && (
                <div className="absolute -top-3 -right-3 text-neon-pink animate-pulse bg-[#0a0a1a] rounded-full p-1 border border-neon-pink">
                    <Sparkles size={16} />
                </div>
            )}
        </div>
    );
}

export default AIInsights;
