import React from 'react';
import { motion } from 'framer-motion';

export default function StatusCard({ title, value, unit, icon: Icon, color = '#00FFFF', delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6, ease: 'easeOut' }}
      whileHover={{ y: -6, boxShadow: `0 20px 40px rgba(0,0,0,0.5), 0 0 30px ${color}22` }}
      className="fde-glass p-6 flex flex-col items-center justify-center text-center relative overflow-hidden group cursor-default"
    >
      {/* Background glow */}
      <div
        className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity duration-500"
        style={{ backgroundColor: color }}
      />
      
      {/* Icon */}
      {Icon && (
        <div className="mb-3 p-3 rounded-2xl" style={{ background: `${color}18`, border: `1px solid ${color}40` }}>
          <Icon size={24} style={{ color }} className="drop-shadow-[0_0_8px_currentColor]" />
        </div>
      )}

      <p className="text-[10px] font-black uppercase tracking-[0.25em] text-gray-500 mb-2">{title}</p>
      <h3
        className="text-3xl md:text-4xl font-black tracking-tighter"
        style={{ color, textShadow: `0 0 20px ${color}80` }}
      >
        {value}
        <span className="text-lg font-bold ml-2 opacity-50">{unit}</span>
      </h3>
    </motion.div>
  );
}
