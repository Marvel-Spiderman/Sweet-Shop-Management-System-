import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lightbulb, Wind, Flame, PlugZap, Tv, Check, Camera, Lock, Thermometer, Speaker, DoorOpen } from 'lucide-react';

const TYPES = [
  { key: 'bulb',    label: 'Light',       Icon: Lightbulb,   color: '#00FFFF', power: 60   },
  { key: 'ac',      label: 'AC',          Icon: Wind,        color: '#FF00FF', power: 1200 },
  { key: 'heater',  label: 'Heater',      Icon: Flame,       color: '#FFAA00', power: 1500 },
  { key: 'plug',    label: 'Smart Plug',  Icon: PlugZap,     color: '#00FF7A', power: 200  },
  { key: 'tv',      label: 'Television',  Icon: Tv,          color: '#8a2be2', power: 150  },
  { key: 'camera',  label: 'Camera',      Icon: Camera,      color: '#FF5733', power: 10   },
  { key: 'lock',    label: 'Smart Lock',  Icon: Lock,        color: '#A0A0A0', power: 5    },
  { key: 'sensor',  label: 'Sensor',      Icon: Thermometer, color: '#FFD700', power: 2    },
  { key: 'speaker', label: 'Speaker',     Icon: Speaker,     color: '#007BFF', power: 30   },
  { key: 'door',    label: 'Door Ctrl',   Icon: DoorOpen,    color: '#8B4513', power: 15   },
];

const ROOMS = ['Main Living', 'Sleep Pod', 'Kitchen', 'Work Zone', 'Garage'];

export default function AddApplianceModal({ isOpen, onClose, onAdd }) {
  const [name, setName] = useState('');
  const [selectedType, setSelectedType] = useState(TYPES[0]);
  const [room, setRoom] = useState(ROOMS[0]);
  const [power, setPower] = useState(TYPES[0].power);
  const [added, setAdded] = useState(false);

  const reset = () => {
    setName(''); setSelectedType(TYPES[0]);
    setRoom(ROOMS[0]); setPower(TYPES[0].power); setAdded(false);
  };

  const handleTypeSelect = (type) => { setSelectedType(type); setPower(type.power); };

  const handleSubmit = () => {
    if (!name.trim()) return;
    setAdded(true);
    setTimeout(() => {
      onAdd({ name, type: selectedType.key, room, basePower: power, isOn: true });
      onClose();
      reset();
    }, 1200);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 lg:p-0"
          style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(24px)' }}
          onClick={() => { onClose(); reset(); }}
        >
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ type: 'spring', stiffness: 260, damping: 28 }}
            className="relative w-full max-w-xl overflow-hidden"
            style={{
              background: 'rgba(10,10,15,0.95)',
              border: `1px solid rgba(255, 255, 255, 0.08)`,
              borderRadius: 32,
              boxShadow: `0 30px 60px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255, 255, 255, 0.05)`,
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* Gradient top stripe */}
            <div className="h-[2px] w-full" style={{ background: `linear-gradient(90deg, transparent, ${selectedType.color}, transparent)` }} />

            {/* Success overlay */}
            <AnimatePresence>
              {added && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-30 flex flex-col items-center justify-center rounded-[32px]"
                  style={{ background: 'rgba(0,0,0,0.95)' }}
                >
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                    className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
                    style={{ background: `${selectedType.color}15`, border: `2.5px solid ${selectedType.color}`, boxShadow: `0 0 50px ${selectedType.color}40` }}
                  >
                    <Check size={32} style={{ color: selectedType.color }} strokeWidth={3.5} />
                  </motion.div>
                  <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-white font-semibold text-2xl tracking-tight"
                  >Device Added</motion.h3>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-gray-400 text-sm mt-2 font-medium"
                  >{name} successfully registered in {room}</motion.p>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="p-10">
              {/* Header */}
              <div className="flex justify-between items-start mb-10">
                <div>
                  <h2 className="text-3xl font-bold tracking-tight text-white">Add Device</h2>
                  <p className="text-gray-400 text-sm mt-1.5 font-medium opacity-80">Register a new IoT appliance to your grid</p>
                </div>
                <button
                  onClick={() => { onClose(); reset(); }}
                  className="p-2.5 rounded-full hover:bg-white/10 transition-colors border border-white/10 group"
                >
                  <X size={20} className="text-gray-500 group-hover:text-white transition-colors" />
                </button>
              </div>

              {/* Device Type Picker */}
              <div className="mb-8">
                <label className="text-[11px] font-semibold uppercase tracking-wider text-gray-500 block mb-4">Device Type</label>
                <div className="grid grid-cols-5 gap-3 max-h-[140px] overflow-y-auto pr-2 custom-scrollbar">
                  {TYPES.map(t => (
                    <motion.button
                      key={t.key}
                      whileHover={{ scale: 1.05, y: -3 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => handleTypeSelect(t)}
                      className="flex flex-col items-center gap-3 p-4 rounded-2xl border transition-all duration-300"
                      style={{
                        borderColor: selectedType.key === t.key ? `${t.color}50` : 'rgba(255,255,255,0.06)',
                        background: selectedType.key === t.key ? `${t.color}08` : 'transparent',
                        boxShadow: selectedType.key === t.key ? `0 10px 30px ${t.color}15` : 'none',
                      }}
                    >
                      <motion.div
                        animate={selectedType.key === t.key
                          ? { filter: [`drop-shadow(0 0 4px ${t.color})`, `drop-shadow(0 0 10px ${t.color})`, `drop-shadow(0 0 4px ${t.color})`] }
                          : { filter: 'none' }
                        }
                        transition={{ repeat: Infinity, duration: 2.5 }}
                      >
                        <t.Icon size={24} style={{ color: selectedType.key === t.key ? t.color : '#666' }} strokeWidth={1.75} />
                      </motion.div>
                      <span
                        className="text-[10px] font-semibold tracking-wide"
                        style={{ color: selectedType.key === t.key ? t.color : '#666' }}
                      >
                        {t.label}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Device Name */}
              <div className="mb-6">
                <label className="text-[11px] font-semibold uppercase tracking-wider text-gray-500 block mb-3">Device Name</label>
                <input
                  type="text"
                  placeholder="e.g. Living Room Lamp"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                  aria-label="Appliance name"
                  className="w-full text-white rounded-2xl p-4 border outline-none text-[15px] font-medium transition-all duration-300"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    borderColor: name ? `${selectedType.color}40` : 'rgba(255,255,255,0.08)',
                    boxShadow: name ? `0 4px 20px ${selectedType.color}10` : 'none',
                  }}
                />
              </div>

              {/* Assign Zone */}
              <div className="mb-6">
                <label className="text-[11px] font-semibold uppercase tracking-wider text-gray-500 block mb-3">Assign Zone</label>
                <div className="flex gap-2.5 flex-wrap">
                  {ROOMS.map(r => (
                    <button
                      key={r}
                      onClick={() => setRoom(r)}
                      className="px-5 py-2.5 rounded-full text-[11px] font-semibold tracking-wide border transition-all duration-200"
                      style={{
                        borderColor: room === r ? `${selectedType.color}60` : 'rgba(255,255,255,0.06)',
                        color: room === r ? selectedType.color : '#888',
                        background: room === r ? `${selectedType.color}08` : 'transparent',
                      }}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              {/* Power Slider */}
              <div className="mb-10">
                <div className="flex justify-between items-center mb-3">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-gray-500">Power Rating</label>
                  <span className="font-bold text-lg" style={{ color: selectedType.color }}>{power}W</span>
                </div>
                <input
                  type="range" min={5} max={3000} step={5}
                  value={power}
                  onChange={e => setPower(Number(e.target.value))}
                  className="w-full h-[3px] rounded-full outline-none appearance-none cursor-pointer bg-white/10"
                  style={{ accentColor: selectedType.color }}
                />
                <div className="flex justify-between text-gray-600 text-[10px] mt-2 font-semibold">
                  <span>5W</span><span>3000W</span>
                </div>
              </div>

              {/* Submit */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSubmit}
                disabled={!name.trim() || added}
                className="w-full py-4 rounded-2xl font-bold text-[15px] tracking-tight text-black transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                style={{
                  background: `linear-gradient(135deg, ${selectedType.color}, #a78bfa)`,
                  boxShadow: name ? `0 10px 40px ${selectedType.color}30, 0 8px 16px rgba(0,0,0,0.3)` : 'none',
                }}
              >
                Add to Grid
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
