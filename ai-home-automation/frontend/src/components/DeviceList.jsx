import React, { useState } from 'react';
import { Power, Plus, Lightbulb, Wind, PlugZap, Flame } from 'lucide-react';

const AppIcon = ({ type, isOn }) => {
    switch (type) {
        case 'bulb':
            return <Lightbulb size={26} className={`transition-all duration-300 ${isOn ? 'text-yellow-400 drop-shadow-[0_0_12px_rgba(250,204,21,1)]' : 'text-gray-500'}`} />;
        case 'ac':
            return <Wind size={26} className={`transition-all duration-300 ${isOn ? 'text-neon-blue drop-shadow-[0_0_10px_rgba(0,243,255,0.9)] animate-pulse' : 'text-gray-500'}`} />;
        case 'plug':
            return <PlugZap size={26} className={`transition-all duration-300 ${isOn ? 'text-neon-green drop-shadow-[0_0_10px_rgba(12,245,116,0.9)]' : 'text-gray-500'}`} />;
        case 'heater':
            return <Flame size={26} className={`transition-all duration-300 ${isOn ? 'text-orange-500 drop-shadow-[0_0_12px_rgba(249,115,22,1)] animate-bounce' : 'text-gray-500'}`} />;
        default:
            return <PlugZap size={26} className="text-gray-500" />;
    }
};

function DeviceList({ activeRoom, devices, toggleDevice, addDevice, rooms }) {
    const [showAdd, setShowAdd] = useState(false);
    const [newDev, setNewDev] = useState({ name: '', type: 'bulb', room: rooms[0], basePower: 100 });

    const filteredDevices = activeRoom === 'All' ? devices : devices.filter(d => d.room === activeRoom);

    const handleAdd = () => {
        if (newDev.name) {
            addDevice({ ...newDev, isOn: true });
            setShowAdd(false);
            setNewDev({ name: '', type: 'bulb', room: rooms[0], basePower: 100 });
        }
    };

    return (
        <div className="flex flex-col gap-4 h-full">
            <div className="hud-panel flex justify-between items-center bg-[#0a0a1a] shadow-[0_4px_15px_rgba(0,0,0,0.4)]">
                <h2 className="text-lg font-bold uppercase tracking-wider text-gray-200">Appliances</h2>
                <button onClick={() => setShowAdd(!showAdd)} className="bg-blue-600/20 text-neon-blue border border-neon-blue/50 rounded-full flex items-center justify-center w-8 h-8 hover:bg-neon-blue hover:text-black hover:shadow-[#00f3ff_0_0_15px] transition-all duration-300 transform hover:scale-110">
                    <Plus size={18} />
                </button>
            </div>

            {showAdd && (
                <div className="hud-panel border border-neon-purple/50 bg-[#0a0a16] shadow-[0_0_20px_rgba(181,55,242,0.15)] animate-in fade-in slide-in-from-top-2 duration-300">
                    <h3 className="text-xs text-neon-purple mb-3 uppercase font-bold tracking-wider">New Appliance</h3>
                    <div className="flex flex-col gap-3">
                        <input
                            type="text"
                            placeholder="Name (e.g. Desk Lamp)"
                            className="bg-[#111122] text-white rounded p-3 text-sm border border-gray-700 outline-none focus:border-neon-purple focus:shadow-[#b537f2_0_0_10px_inset] transition-all"
                            value={newDev.name}
                            onChange={e => setNewDev({ ...newDev, name: e.target.value })}
                        />
                        <div className="flex gap-2">
                            <select className="bg-[#111122] text-white rounded p-3 text-sm border border-gray-700 flex-1 outline-none focus:border-neon-purple focus:shadow-[#b537f2_0_0_10px_inset] transition-all cursor-pointer" value={newDev.type} onChange={e => setNewDev({ ...newDev, type: e.target.value })}>
                                <option value="bulb">Light Bulb</option>
                                <option value="ac">Air Conditioner</option>
                                <option value="plug">Smart Plug</option>
                                <option value="heater">Heater</option>
                            </select>
                            <select className="bg-[#111122] text-white rounded p-3 text-sm border border-gray-700 flex-1 outline-none focus:border-neon-purple focus:shadow-[#b537f2_0_0_10px_inset] transition-all cursor-pointer" value={newDev.room} onChange={e => setNewDev({ ...newDev, room: e.target.value })}>
                                {rooms.map(r => <option key={r} value={r}>{r}</option>)}
                            </select>
                        </div>
                        <button onClick={handleAdd} className="mt-3 bg-neon-purple/20 border border-neon-purple text-neon-purple font-bold py-3 rounded-lg shadow-[0_0_10px_rgba(181,55,242,0.2)] hover:bg-neon-purple hover:text-white hover:shadow-[0_0_20px_rgba(181,55,242,0.6)] transition-all duration-300 text-sm uppercase tracking-widest">
                            Add Device
                        </button>
                    </div>
                </div>
            )}

            <div className="flex flex-col gap-4 overflow-y-auto max-h-[60vh] pr-2 pb-4">
                {filteredDevices.map(dev => (
                    <div key={dev.id} className={`neon-panel p-5 flex justify-between items-center transition-all duration-500 transform hover:-translate-y-1 hover:shadow-xl cursor-default group ${dev.isOn ? 'border-neon-blue/40 shadow-[#00f3ff_0_0_10px_inset] bg-[#0c1020]' : 'border-gray-800 bg-[#0a0a1a] opacity-80 hover:opacity-100'}`}>
                        <div className="flex items-center gap-5">
                            <div className={`relative w-14 h-14 flex items-center justify-center rounded-2xl border transition-all duration-500 ${dev.isOn ? 'border-neon-blue/40 bg-[#0f172a] shadow-[#00f3ff_0_0_20px]' : 'border-gray-700 bg-gray-900 group-hover:border-gray-500'}`}>
                                <AppIcon type={dev.type} isOn={dev.isOn} />
                                {dev.isOn && (
                                    <div className="absolute inset-0 bg-white opacity-5 rounded-2xl animate-ping" style={{ animationDuration: '2s' }}></div>
                                )}
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-100 tracking-wide">{dev.name}</h4>
                                <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider">{dev.room} <span className="text-gray-700 mx-1">|</span> <span className={dev.isOn ? "text-neon-blue font-bold" : ""}>{dev.basePower}W</span></p>
                            </div>
                        </div>
                        <button onClick={() => toggleDevice(dev.id)} className={`relative flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 ${dev.isOn ? 'text-white bg-neon-blue shadow-[0_0_20px_rgba(0,243,255,0.8)] border border-white/20 hover:bg-[#33f6ff] focus:ring-neon-blue hover:scale-105' : 'text-gray-400 bg-gray-800 border border-gray-600 hover:text-white hover:bg-gray-700 focus:ring-gray-500'}`}>
                            <Power size={20} strokeWidth={dev.isOn ? 3 : 2} />
                        </button>
                    </div>
                ))}
                {filteredDevices.length === 0 && (
                    <div className="text-center text-gray-500 text-sm mt-10 p-6 border-2 border-dashed border-gray-800 rounded-xl bg-gray-900/30">
                        No appliances assigned to this room.<br/><span className="text-neon-blue/70 mt-2 block">Click the + button to add one.</span>
                    </div>
                )}
            </div>
        </div>
    );
}

export default DeviceList;
