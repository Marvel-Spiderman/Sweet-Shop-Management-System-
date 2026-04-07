import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Cpu, Wind, PlugZap, Flame, Lightbulb, Zap, ArrowLeft, Hexagon, Plus, Zap as ZapIcon, Leaf, DollarSign, Camera, Lock, Thermometer, Speaker, DoorOpen, Wifi, Tv, Trash2 } from 'lucide-react';
import DashboardView from '../components/DashboardView';
import AIInsights from '../components/AIInsights';
import FrequencyGraph from '../components/FrequencyGraph';
import StatusCard from '../components/StatusCard';
import AddApplianceModal from '../components/AddApplianceModal';

const ROOMS = ['All Space', 'Main Living', 'Sleep Pod', 'Kitchen', 'Work Zone'];

const PRESETS = {
  'Custom': null,
  'Peak Hours': { multiplier: 2.2, label: 'Peak Hours' },
  'Night Mode': { multiplier: 0.3, label: 'Night Mode' },
  'Eco Mode': { multiplier: 0.6, label: 'Eco Mode' },
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
};
const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

export default function Dashboard() {
  const navigate = useNavigate();
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [isSimulatorOn, setIsSimulatorOn] = useState(false);
  const [isAutomationOn, setIsAutomationOn] = useState(false);
  const [activeRoom, setActiveRoom] = useState('All Space');
  const [selectedPreset, setSelectedPreset] = useState('Custom');
  const [showModal, setShowModal] = useState(false);
  const [showPresetMenu, setShowPresetMenu] = useState(false);
  const [isHubActive, setIsHubActive] = useState(true);
  const presetRef = useRef(null);

  const [devices, setDevices] = useState([]);

  useEffect(() => {
    fetch('/api/devices')
      .then(res => res.json())
      .then(data => setDevices(data))
      .catch(err => console.error("Failed to fetch devices:", err));
  }, []);

  const [metrics, setMetrics] = useState({ totalPower: 0, cost: 0, co2: 0, efficiency: 74 });

  useEffect(() => {
    let interval;
    if (isSimulatorOn) {
      interval = setInterval(() => {
        const t = Date.now() / 1000;
        const preset = PRESETS[selectedPreset];
        let simulatedPower = 0;

        setDevices(prev => prev.map(dev => {
          let devIsOn = dev.isOn;
          if (isAutomationOn) {
            if (dev.type === 'bulb' && new Date().getSeconds() % 10 > 5) devIsOn = false;
            if (dev.type === 'ac' && dev.room === 'Sleep Pod') devIsOn = true;
          }
          if (devIsOn) {
            const multiplier = preset ? preset.multiplier : 1;
            simulatedPower += dev.basePower * multiplier * (0.5 + 0.5 * Math.sin(t / 60) + (Math.random() * 0.2 - 0.1));
          }
          return { ...dev, isOn: devIsOn };
        }));

        const newEff = isAutomationOn ? 92 + Math.floor(Math.random() * 4) : 74 + Math.floor(Math.random() * 5);
        setMetrics(prev => ({
          ...prev,
          totalPower: Math.round(simulatedPower),
          cost: +(prev.cost + (simulatedPower / 1000) * 0.05).toFixed(3),
          co2: +(prev.co2 + (simulatedPower / 1000) * 0.21).toFixed(3),
          efficiency: newEff
        }));
      }, 2000);
    } else {
      let pps = 0;
      devices.forEach(d => { if (d.isOn) pps += d.basePower; });
      setMetrics(prev => ({ ...prev, totalPower: pps }));
    }
    return () => clearInterval(interval);
  }, [isSimulatorOn, isAutomationOn, selectedPreset]);

  const toggleDevice = async (id) => {
    try {
      const res = await fetch(`/api/devices/${id}/toggle`, { method: 'PATCH' });
      if (res.ok) {
        const updatedDevice = await res.json();
        setDevices(d => d.map(x => x.id === id ? updatedDevice : x));
      }
    } catch (err) {
      console.error("Failed to toggle device:", err);
    }
  };

  const addDevice = async (dev) => {
    try {
      const res = await fetch('/api/devices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dev)
      });
      if (res.ok) {
        const newDevice = await res.json();
        setDevices(d => [...d, newDevice]);
      }
    } catch (err) {
      console.error("Failed to add device:", err);
    }
  };

  const deleteDevice = async (id) => {
    try {
      const res = await fetch(`/api/devices/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setDevices(prev => prev.filter(x => x.id != id));
      }
    } catch (err) {
      console.error("Failed to delete device:", err);
    }
  };

  const filteredDevices = React.useMemo(() => {
    return activeRoom === 'All Space' ? devices : devices.filter(d => d.room === activeRoom);
  }, [devices, activeRoom]);

  const getIcon = (type, isOn) => {
    const base = `transition-all duration-500 ${isOn ? '' : 'text-gray-600'}`;
    switch (type) {
      case 'bulb':    return <Lightbulb   size={34} strokeWidth={1.5} className={isOn ? `text-[#00FFFF] drop-shadow-[0_0_15px_#00FFFF] ${base}` : base} />;
      case 'ac':      return <Wind        size={34} strokeWidth={1.5} className={isOn ? `text-[#FF00FF] drop-shadow-[0_0_15px_#FF00FF] animate-pulse ${base}` : base} />;
      case 'heater':  return <Flame       size={34} strokeWidth={1.5} className={isOn ? `text-[#FFAA00] drop-shadow-[0_0_15px_#FFAA00] animate-bounce ${base}` : base} />;
      case 'tv':      return <Tv          size={34} strokeWidth={1.5} className={isOn ? `text-[#8a2be2] drop-shadow-[0_0_15px_#8a2be2] ${base}` : base} />;
      case 'camera':  return <Camera      size={34} strokeWidth={1.5} className={isOn ? `text-[#FF5733] drop-shadow-[0_0_15px_#FF5733] ${base}` : base} />;
      case 'lock':    return <Lock        size={34} strokeWidth={1.5} className={isOn ? `text-[#A0A0A0] drop-shadow-[0_0_15px_#A0A0A0] ${base}` : base} />;
      case 'sensor':  return <Thermometer size={34} strokeWidth={1.5} className={isOn ? `text-[#FFD700] drop-shadow-[0_0_15px_#FFD700] ${base}` : base} />;
      case 'speaker': return <Speaker     size={34} strokeWidth={1.5} className={isOn ? `text-[#007BFF] drop-shadow-[0_0_15px_#007BFF] ${base}` : base} />;
      case 'door':    return <DoorOpen    size={34} strokeWidth={1.5} className={isOn ? `text-[#8B4513] drop-shadow-[0_0_15px_#8B4513] ${base}` : base} />;
      default:        return <PlugZap     size={34} strokeWidth={1.5} className={isOn ? `text-[#00FF7A] drop-shadow-[0_0_15px_#00FF7A] ${base}` : base} />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen relative p-4 md:p-8 flex flex-col"
      style={{ fontFamily: 'Inter, sans-serif' }}
      onMouseMove={(e) => setMousePos({ x: e.clientX, y: e.clientY })}
    >
      {/* Interactive Cursor Spotlight */}
      <div
        className="pointer-events-none fixed inset-0 z-50 transition-opacity duration-300 mix-blend-screen"
        style={{
          background: `radial-gradient(800px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0,240,255,0.05), transparent 40%)`
        }}
      />

      <div className="bg-orb orb-1" />
      <div className="bg-orb orb-2" />

      {/* Add Appliance Modal */}
      <AddApplianceModal isOpen={showModal} onClose={() => setShowModal(false)} onAdd={addDevice} />

      {/* HEADER */}
      <header className="relative w-full max-w-[1400px] mx-auto flex items-center justify-between z-20 mb-10 mt-2 px-2">
        <div className="flex-1 flex justify-start">
          <button
            onClick={() => navigate('/')}
            aria-label="Go back to landing"
            className="bg-white/5 p-4 rounded-full hover:bg-white/10 border border-white/10 transition-all duration-300 hidden md:flex"
          >
            <ArrowLeft size={22} className="text-white" />
          </button>
        </div>

        {/* Center Logo */}
        <div className="flex flex-col items-center cursor-pointer group" onClick={() => navigate('/')}>
          <div className="relative flex items-center justify-center">
            <Hexagon size={60} strokeWidth={1} className="text-[#00FFFF] absolute animate-[spin_12s_linear_infinite] opacity-70 group-hover:opacity-100 transition-opacity" />
            <Zap size={26} className="text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.8)] group-hover:scale-110 transition-transform duration-500" />
          </div>
          <h2 className="mt-5 text-2xl font-black tracking-[0.3em] uppercase text-white">
            NEX<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FFFF] to-[#FF00FF]">US</span>
          </h2>
        </div>

        {/* Right: 3 Cyber Buttons Only in HUD Section */}
        <div className="flex-1 flex justify-end">
          <div className="fde-control-section flex-row items-center !p-1 !rounded-full !gap-2">
            {/* Custom Preset Button with dropdown above */}
            <div className="relative" ref={presetRef}>
              <button
                onClick={() => setShowPresetMenu(!showPresetMenu)}
                className={`cyber-btn !py-2.5 !px-6 !text-[11px] font-semibold tracking-normal ${selectedPreset !== 'Custom' ? '' : 'opacity-80 hover:opacity-100'}`}
              >
                {selectedPreset === 'Custom' ? 'Custom ▾' : `${selectedPreset} ▾`}
              </button>

              {/* Popup menu appearing ABOVE the button */}
              <AnimatePresence>
                {showPresetMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full mt-3 right-0 fde-glass rounded-[24px] overflow-hidden z-50 py-2"
                    style={{ minWidth: 200, border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 20px 60px rgba(0,0,0,0.8)' }}
                  >
                    {['Custom', 'Peak Hours', 'Night Mode', 'Eco Mode'].map((p, i) => (
                      <button
                        key={p}
                        onClick={() => { setSelectedPreset(p); setShowPresetMenu(false); }}
                        className="w-full text-left px-5 py-3 text-sm font-medium tracking-wide transition-all duration-200 flex items-center justify-between gap-4"
                        style={{
                          color: selectedPreset === p ? '#00FFFF' : '#9ca3af',
                          borderTop: i > 0 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                          background: selectedPreset === p ? 'rgba(0,255,255,0.05)' : 'transparent',
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                        onMouseLeave={e => e.currentTarget.style.background = selectedPreset === p ? 'rgba(0,255,255,0.05)' : 'transparent'}
                      >
                        {p}
                        {selectedPreset === p && <span style={{ color: '#00FFFF' }}>✓</span>}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Simulate */}
            <button
              onClick={() => setIsSimulatorOn(!isSimulatorOn)}
              aria-label="Simulator Mode"
              className={`cyber-btn !py-2.5 !px-6 !text-[10px] ${isSimulatorOn ? '' : 'opacity-60 hover:opacity-100'}`}
            >
              {isSimulatorOn ? 'SIM: ONLINE' : 'Simulate'}
            </button>

            {/* Initialize AI */}
            <button
              onClick={() => setIsAutomationOn(!isAutomationOn)}
              aria-label="AI Automation"
              className={`cyber-btn !py-2.5 !px-6 !text-[10px] ${isAutomationOn ? '' : 'opacity-60 hover:opacity-100'}`}
            >
              {isAutomationOn ? 'AI: ACTIVE' : 'Initialize AI'}
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT - Staggered entrance */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="w-full max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 z-10 flex-1"
      >

        {/* === LEFT COLUMN === */}
        <motion.div variants={itemVariants} className="md:col-span-4 lg:col-span-3 flex flex-col gap-6">

          {/* Status Cards */}
          <StatusCard title="Current Draw" value={metrics.totalPower} unit="W" color="#00FFFF" icon={ZapIcon} delay={0.1} />
          <StatusCard title="Projected Cost" value={`₹${metrics.cost.toFixed(2)}`} unit="" color="#00FF7A" icon={DollarSign} delay={0.2} />
          <StatusCard title="CO₂ Footprint" value={metrics.co2.toFixed(2)} unit="kg" color="#FF00FF" icon={Leaf} delay={0.3} />

          {/* IoT Hub Connection Status Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="fde-glass p-4"
          >
            <p className="text-[9px] font-black uppercase tracking-[0.25em] text-gray-600 mb-3">Hub Gateway</p>

            {/* Main Hub Device - Master Node Toggle */}
            <div 
              onClick={() => setIsHubActive(!isHubActive)}
              className={`flex items-center gap-3 p-3 rounded-2xl border cursor-pointer transition-all duration-500 shadow-lg ${
                isHubActive 
                  ? 'bg-[#00FFFF]/5 border-[#00FFFF]/30 hover:bg-[#00FFFF]/10 shadow-[#00FFFF]/5' 
                  : 'bg-red-500/5 border-red-500/20 grayscale-[0.5] hover:bg-red-500/10 shadow-red-500/5'
              }`}
            >
              <div className="relative flex-shrink-0">
                <Cpu 
                  size={28} 
                  strokeWidth={1.5} 
                  className={`transition-all duration-500 ${isHubActive ? 'text-[#00FFFF]' : 'text-red-500/40'}`} 
                  style={{ filter: isHubActive ? 'drop-shadow(0 0 8px #00FFFF)' : 'none' }} 
                />
                <motion.span
                  animate={isHubActive ? { scale: [1, 1.5, 1], opacity: [1, 0, 1] } : { scale: 1, opacity: 0.3 }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className={`absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full border border-black transition-colors duration-500 ${isHubActive ? 'bg-[#00ff7a]' : 'bg-red-500'}`}
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-xs font-black tracking-wide uppercase transition-colors duration-500 ${isHubActive ? 'text-white' : 'text-red-500/60'}`}>IOT HUB CONTROLLER [Master]</p>
                <p className={`text-[9px] font-black uppercase tracking-widest transition-colors duration-500 ${isHubActive ? 'text-[#00FFFF]/80' : 'text-red-500/40'}`}>
                  {isHubActive ? '192.168.1.1 · Active' : 'UPLINK DISCONNECTED'}
                </p>
              </div>
              <Wifi 
                size={14} 
                className={`transition-all duration-500 ${isHubActive ? 'text-[#00ff7a]' : 'text-red-900'}`} 
                style={{ filter: isHubActive ? 'drop-shadow(0 0 4px #00ff7a)' : 'none' }} 
              />
            </div>

            {/* Connected Sub-devices - Clickable */}
            <div className="flex flex-col gap-1.5">
              {[
                { Icon: Lightbulb, name: 'Lamp Node', type: 'bulb', color: '#00FFFF' },
                { Icon: Wind, name: 'Climate Unit', type: 'ac', color: '#FF00FF' },
                { Icon: Flame, name: 'Heat Module', type: 'heater', color: '#FFAA00' },
                { Icon: PlugZap, name: 'Power Relay', type: 'plug', color: '#00FF7A' },
              ].map(({ Icon, name, type, color }) => {
                // Find ALL devices of this type
                const typeDevices = devices.filter(d => d.type === type);
                const anyOn = typeDevices.some(d => d.isOn);
                const handleClick = async () => {
                  if (!isHubActive) return;
                  // Toggle all devices of that type
                  for (const dev of typeDevices) {
                    await toggleDevice(dev.id);
                  }
                };
                const finalOn = isHubActive && anyOn;
                return (
                  <motion.div
                    key={name}
                    whileTap={isHubActive ? { scale: 0.96 } : {}}
                    whileHover={isHubActive ? { backgroundColor: finalOn ? `${color}10` : 'rgba(255,255,255,0.03)' } : {}}
                    onClick={handleClick}
                    className={`flex items-center gap-2.5 px-2.5 py-2 rounded-xl border transition-colors duration-300 select-none ${
                        !isHubActive ? 'opacity-20 border-white/5 cursor-not-allowed' :
                        finalOn ? 'border-white/15 bg-white/3 cursor-pointer' : 'border-white/5 bg-transparent cursor-pointer'
                      }`}
                  >
                    <Icon
                      size={14}
                      strokeWidth={1.5}
                      style={{
                        color: finalOn ? color : '#3a3a3a',
                        filter: finalOn ? `drop-shadow(0 0 5px ${color})` : 'none',
                        flexShrink: 0,
                        transition: 'all 0.4s',
                      }}
                    />
                    <span className="text-[9px] font-black uppercase tracking-wider text-gray-400 flex-1">{name}</span>
                    {/* Toggle pill */}
                    <div className={`flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest transition-all duration-300 ${
                        !isHubActive ? 'bg-black/40 text-gray-800 border-white/5' :
                        finalOn ? 'bg-[#00ff7a]/20 text-[#00ff7a] border border-[#00ff7a]/30' : 
                        'bg-red-900/20 text-red-500/60 border border-red-900/30'
                      }`}>
                      <span className={`w-1 h-1 rounded-full ${isHubActive && finalOn ? 'bg-[#00ff7a] shadow-[0_0_4px_#00ff7a]' : 'bg-red-700/50'}`}></span>
                      {!isHubActive ? 'No Link' : finalOn ? 'Live' : 'Off'}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Horizontal Rotating IoT Image Carousel */}
          <div className={`fde-glass overflow-hidden relative flex flex-col py-4 transition-all duration-700 ${!isHubActive ? 'border-red-500/20 bg-red-500/5' : ''}`}>
            <p className={`text-center text-[10px] font-black uppercase tracking-[0.25em] mb-3 transition-colors duration-500 ${isHubActive ? 'text-gray-600' : 'text-red-500 animate-pulse'}`}>
              {isHubActive ? 'Hardware Elements' : 'Hardware Offline (Link Lost)'}
            </p>
            <div
              className={`relative overflow-hidden w-full group transition-all duration-700 ${!isHubActive ? 'grayscale opacity-30 pointer-events-none' : ''}`}
              style={{
                height: 120,
                maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
              }}
            >
              <div
                className={`flex gap-3 absolute group-hover:[animation-play-state:paused] ${isHubActive ? 'animate-slide-x' : ''}`}
                style={{ width: 'max-content' }}
              >
                {['/iot_1.png', '/iot_2.png', '/iot_3.png', '/iot_hub.png', '/iot_1.png', '/iot_2.png', '/iot_3.png', '/iot_hub.png'].map((src, i) => (
                  <div
                    key={i}
                    className="flex-shrink-0 rounded-xl overflow-hidden relative cursor-pointer group/img"
                    style={{ width: 100, height: 100 }}
                  >
                    <img
                      src={src}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-110"
                      alt="IoT device"
                      style={{
                        opacity: 0.35,
                        mixBlendMode: 'luminosity',
                        filter: 'brightness(0.7) contrast(1.1)',
                        transition: 'opacity 0.4s, filter 0.4s, transform 0.7s',
                      }}
                      onMouseEnter={e => {
                        e.target.style.opacity = '0.85';
                        e.target.style.filter = 'brightness(1) contrast(1.1)';
                        e.target.style.mixBlendMode = 'normal';
                      }}
                      onMouseLeave={e => {
                        e.target.style.opacity = '0.35';
                        e.target.style.filter = 'brightness(0.7) contrast(1.1)';
                        e.target.style.mixBlendMode = 'luminosity';
                      }}
                    />
                    {/* subtle neon border on hover */}
                    <div className="absolute inset-0 rounded-xl border border-transparent group-hover/img:border-[#00FFFF]/50 group-hover/img:shadow-[inset_0_0_12px_rgba(0,255,255,0.15)] transition-all duration-400 pointer-events-none" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* === CENTER COLUMN === */}
        <motion.div variants={itemVariants} className="md:col-span-8 lg:col-span-6 flex flex-col gap-6">

          {/* Room Filter - Cyber Buttons */}
          <div className="flex gap-3 overflow-x-auto py-1 justify-center flex-wrap">
            {ROOMS.map(r => (
              <button
                key={r}
                onClick={() => setActiveRoom(r)}
                aria-label={`Filter by ${r}`}
                className={`cyber-btn !py-2.5 !px-6 !text-[10px] whitespace-nowrap transition-all duration-300 ${activeRoom === r ? '' : 'opacity-40 hover:opacity-80'
                  }`}
              >
                {r}
              </button>
            ))}
          </div>

          {/* Add New Device - Cyber Button */}
          <button
            onClick={() => setShowModal(true)}
            className="cyber-btn w-full !py-4 flex items-center justify-center gap-3 group"
          >
            <Plus size={16} className="group-hover:rotate-90 transition-transform duration-300" />
            Add New Device
          </button>

          <div className={`grid grid-cols-2 gap-4 transition-all duration-700 ${!isHubActive ? 'opacity-50 pointer-events-none' : ''}`}>
            {filteredDevices.map((dev, i) => (
              <motion.div
                key={dev.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.08 }}
                whileHover={isHubActive ? { y: -5 } : {}}
                whileTap={isHubActive ? { scale: 0.97 } : {}}
                onClick={() => isHubActive && toggleDevice(dev.id)}
                className={`group relative cursor-pointer flex flex-col items-center justify-center p-7 border rounded-[28px] transition-colors duration-500 ${
                  !isHubActive ? 'bg-black/20 border-red-900/10 grayscale' :
                  dev.isOn
                    ? 'bg-white/5 border-[#00FFFF]/40 shadow-[inset_0_0_25px_rgba(0,255,255,0.08)]'
                    : 'bg-transparent border-white/6 hover:border-white/15 hover:bg-white/3'
                  }`}
              >
                {/* Delete Button - Increased Hit Area */}
                {isHubActive && (
                  <button
                    onClick={(e) => { e.stopPropagation(); deleteDevice(dev.id); }}
                    className="absolute top-4 right-4 p-2.5 rounded-full hover:bg-red-500/20 text-gray-400 hover:text-red-500 transition-all duration-300 opacity-0 group-hover:opacity-100 z-50"
                    title="Remove Device"
                    aria-label="Remove Device"
                  >
                    <Trash2 size={18} />
                  </button>
                )}

                <motion.div
                  className="mb-5"
                  animate={dev.isOn ? { filter: ['drop-shadow(0 0 8px #00FFFF)', 'drop-shadow(0 0 18px #00FFFF)', 'drop-shadow(0 0 8px #00FFFF)'] } : {}}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  {getIcon(dev.type, dev.isOn)}
                </motion.div>
                <h4 className="font-black text-sm text-white tracking-wide text-center mb-1">{dev.name}</h4>
                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#00FFFF]/40 mb-2">{dev.sector || 'Unassigned'}</p>
                <p className="text-xs font-black uppercase tracking-[0.25em] mb-4" style={{ color: dev.isOn ? '#00FFFF' : '#444' }}>
                  {dev.isOn ? `${dev.basePower}W · Active` : 'Standby'}
                </p>

                {/* Individual Device Connection Status */}
                <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border transition-all duration-500 mt-auto ${
                  !isHubActive ? 'bg-red-950/20 border-red-500/20' : 'bg-black/40 border-white/5'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${
                    !isHubActive ? 'bg-red-600 shadow-[0_0_5px_#ef4444]' :
                    dev.isOn ? 'bg-[#00ff7a] animate-pulse shadow-[0_0_5px_#00ff7a]' : 'bg-gray-600'
                  }`}></span>
                  <span className={`text-[8px] font-black uppercase tracking-[0.2em] transition-colors duration-500 ${
                    !isHubActive ? 'text-red-500/60' : 'text-gray-400'
                  }`}>
                    {!isHubActive ? 'HUB DISCONNECTED' : dev.isOn ? 'DEVICE: CONNECTED' : 'DEVICE: OFFLINE'}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Connected Devices Hub */}
          <motion.div variants={itemVariants} className="fde-glass p-5">
            <div className="flex items-center justify-between mb-4">
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-gray-500">
                Connected Protocols
              </p>
              <div className="flex items-center gap-1.5">
                <span className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${isHubActive ? 'bg-[#00ff7a] animate-pulse shadow-[0_0_5px_#00ff7a]' : 'bg-red-500 shadow-[0_0_5px_#ef4444]'}`}></span>
                <span className={`text-[9px] font-black uppercase tracking-widest transition-colors duration-500 ${isHubActive ? 'text-[#00ff7a]/80' : 'text-red-500/60'}`}>
                  {isHubActive ? 'Hub Online' : 'Hub Offline'}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {[
                { icon: Lightbulb, label: 'Bulbs', type: 'bulb', color: '#00FFFF', real: true },
                { icon: Wind, label: 'Climate', type: 'ac', color: '#FF00FF', real: true },
                { icon: PlugZap, label: 'Plugs', type: 'plug', color: '#00FF7A', real: true },
                { icon: Flame, label: 'Heaters', type: 'heater', color: '#FFAA00', real: true },
                { icon: Camera, label: 'Cameras', type: 'camera', color: '#FF5733', real: true },
                { icon: Lock, label: 'Locks', type: 'lock', color: '#A0A0A0', real: true },
                { icon: Thermometer, label: 'Sensors', type: 'sensor', color: '#FFD700', real: true },
                { icon: Speaker, label: 'Speakers', type: 'speaker', color: '#007BFF', real: true },
                { icon: DoorOpen, label: 'Door Ctrl', type: 'door', color: '#8B4513', real: true },
              ].map((item) => {
                const Icon = item.icon;
                const typeDevices = item.real ? devices.filter(d => d.type === item.type) : [];
                const anyOn = typeDevices.some(d => d.isOn);
                const finalOn = isHubActive && anyOn;
                const activeCount = typeDevices.filter(d => d.isOn).length;
                const handleClick = async () => {
                  if (!item.real || !isHubActive) return;
                  for (const dev of typeDevices) await toggleDevice(dev.id);
                };
                return (
                  <motion.div
                    key={item.label}
                    whileTap={item.real && isHubActive ? { scale: 0.93 } : {}}
                    onClick={handleClick}
                    className={`flex flex-col items-center justify-center p-2.5 rounded-2xl border text-center transition-all duration-300 ${
                        !isHubActive ? 'opacity-20 grayscale border-white/5 cursor-not-allowed' :
                        item.real
                          ? finalOn
                            ? 'border-white/20 bg-white/5 cursor-pointer hover:bg-white/8'
                            : 'border-white/8 bg-transparent cursor-pointer opacity-60 hover:opacity-90'
                          : 'border-white/5 bg-transparent opacity-25 cursor-not-allowed'
                      }`}
                    style={finalOn ? { boxShadow: `inset 0 0 14px ${item.color}18` } : {}}
                  >
                    <Icon
                      size={20}
                      strokeWidth={1.5}
                      className="mb-1.5"
                      style={{
                        color: finalOn ? item.color : (item.real && isHubActive ? '#444' : '#2a2a2a'),
                        filter: finalOn ? `drop-shadow(0 0 6px ${item.color})` : 'none',
                        transition: 'all 0.4s',
                      }}
                    />
                    <span className="text-[7px] font-black uppercase tracking-wider text-gray-400 leading-tight">{item.label}</span>
                    <span className={`text-[7px] font-black uppercase tracking-widest mt-0.5 transition-colors duration-300 ${
                        finalOn ? 'text-[#00ff7a]' : item.real && isHubActive ? 'text-gray-700' : 'text-[#222]'
                      }`}>
                      {!isHubActive ? 'off' : item.real ? (finalOn ? `${activeCount} live` : 'off') : 'n/a'}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Chart */}
          <motion.div variants={itemVariants} className="fde-glass overflow-hidden min-h-[280px]">
            <DashboardView isSimulatorOn={isSimulatorOn} devices={devices} metrics={metrics} />
          </motion.div>
        </motion.div>

        {/* === RIGHT COLUMN === */}
        <motion.div variants={itemVariants} className="md:col-span-12 lg:col-span-3 flex flex-col gap-6">

          <div className="fde-glass flex flex-col items-center p-5">
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-gray-600 text-center w-full pb-4 border-b border-white/5">Core Frequency Array</p>
            <FrequencyGraph />
          </div>

          <div className="fde-glass p-6">
            <AIInsights isAutomationOn={isAutomationOn} isActive={isSimulatorOn} />
          </div>
        </motion.div>

      </motion.div>
    </motion.div>
  );
}
