import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, ArrowRight } from 'lucide-react';

const SLIDES = [
  { src: '/iot_hub.png',  label: 'NODE // Central IoT Hub' },
  { src: '/iot_1.png',   label: 'NODE // Smart Sensors Grid' },
  { src: '/iot_2.png',   label: 'NODE // Device Mesh Network' },
  { src: '/iot_3.png',   label: 'NODE // Autonomous Control Layer' },
];

export default function Landing() {
  const navigate = useNavigate();
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [terminalLines, setTerminalLines] = useState([]);
  const [showOverlay, setShowOverlay] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-cycle slides every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % SLIDES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const lines = [
      "> INITIATING SECURE HANDSHAKE...",
      "> BYPASSING LOCAL FIREWALL...",
      "> SYNCHRONIZING WITH IOT GRID...",
      "> LOADING AUTONOMOUS MODELS...",
      "> CONNECTION SECURED. INITIALIZING UI..."
    ];
    lines.forEach((line, i) => {
      setTimeout(() => setTerminalLines(prev => [...prev, line]), 500 + i * 600);
    });
    
    // Hide overlay after sequence finishes
    setTimeout(() => {
      setShowOverlay(false);
    }, 4000);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 3.8 // Wait for overlay to finish before animating page in
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <div 
      className="min-h-screen relative flex flex-col items-center justify-center p-6 lg:p-12 overflow-hidden bg-black font-['Inter']"
      onMouseMove={(e) => setMousePos({ x: e.clientX, y: e.clientY })}
    >
      {/* Full Screen Boot Overlay */}
      <AnimatePresence>
        {showOverlay && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center p-8 backdrop-blur-3xl"
          >
            <div className="w-full max-w-2xl font-mono text-xs md:text-sm text-[#00f0ff] flex flex-col items-start justify-center h-full">
               <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 2 }}>
                 <Cpu size={48} className="mb-8" />
               </motion.div>
               <div className="mb-6 opacity-60">SMART_ENERGY_OS // v4.2.0-core // TERMINAL_ACCESS</div>
               {terminalLines.map((l, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, x: -10 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    transition={{ ease: "easeOut", duration: 0.2 }}
                    className="mb-3 tracking-widest text-[#00f0ff]/90"
                  >
                    {l}
                  </motion.div>
               ))}
               <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }} className="mt-2 h-4 w-2.5 bg-[#00f0ff]" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Interactive Cursor Spotlight */}
      <div 
        className="pointer-events-none fixed inset-0 z-50 transition-opacity duration-300 mix-blend-screen"
        style={{
          background: `radial-gradient(800px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0,240,255,0.06), transparent 40%)`
        }}
      />

      {/* Cinematic Background Image Parallax */}
      <div className="bg-parallax"></div>

      {/* Background Neon Orbs */}
      <div className="bg-orb orb-1"></div>
      <div className="bg-orb orb-2"></div>
      
      <motion.div 
        variants={containerVariants} 
        initial="hidden" 
        animate="show" 
        className="flex flex-col items-center justify-center z-10 text-center w-full max-w-6xl flex-grow pb-10"
      >
        
        {/* Perfectly Centered Title Section */}
        <motion.div variants={itemVariants} className="mb-10 w-full flex flex-col items-center justify-center relative mt-12">
          <motion.div 
            animate={{ boxShadow: ['0 0 0px #00f0ff', '0 0 15px #00f0ff', '0 0 0px #00f0ff'] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="flex items-center justify-center gap-3 text-xs md:text-sm font-bold uppercase tracking-[0.4em] text-[#00f0ff] mb-8 bg-[#00f0ff]/10 py-2.5 px-8 rounded-full border border-[#00f0ff]/20 backdrop-blur-md w-max mx-auto"
          >
            <Cpu size={16} />
            <span>Next-Gen AI Protocol</span>
          </motion.div>
          
          <motion.h1 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="text-[3rem] sm:text-[5rem] md:text-[7rem] font-black leading-[1.1] tracking-tighter text-center mix-blend-screen w-full break-words relative"
          >
            <motion.span 
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="text-gradient inline-block"
            >
              SMART
            </motion.span>
            <motion.span 
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 0.5 }}
              className="text-gradient-neon filter drop-shadow-[0_0_30px_rgba(0,240,255,0.6)] inline-block md:ml-4"
            >
               ENERGY
            </motion.span>
          </motion.h1>
        </motion.div>
        
        {/* Animated Description Text */}
        <motion.p 
          variants={{
            hidden: { opacity: 1 },
            show: { 
              opacity: 1, 
              transition: { staggerChildren: 0.015, delayChildren: 4.5 } 
            }
          }}
          initial="hidden"
          animate="show"
          className="text-gray-400 text-sm sm:text-base md:text-xl font-light tracking-wide max-w-4xl mx-auto mb-10 leading-relaxed relative z-20"
        >
          {"Predictive Analytics. Autonomous Core Management. Real-Time Diagnostics. Take absolute visual control of your digital ecosystem.".split("").map((char, index) => (
            <motion.span 
              key={index} 
              variants={{ hidden: { opacity: 0, filter: 'blur(4px)' }, show: { opacity: 1, filter: 'blur(0px)' } }}
            >
              {char}
            </motion.span>
          ))}
        </motion.p>
        
        {/* Auto-Sliding Cyber Image Carousel */}
        <motion.div 
          variants={itemVariants}
          className="relative w-full max-w-4xl mx-auto h-auto aspect-video mb-10 rounded-[32px] p-1 bg-gradient-to-br from-[#00f0ff]/40 via-black to-[#8a2be2]/40 shadow-[0_0_50px_rgba(0,240,255,0.1)] group cursor-pointer z-20"
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-full h-full rounded-[28px] overflow-hidden relative border border-white/10 bg-black">
            {/* Images with crossfade */}
            <AnimatePresence mode="wait">
              <motion.img
                key={currentSlide}
                src={SLIDES[currentSlide].src}
                alt={SLIDES[currentSlide].label}
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.9, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>
            
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 z-10 group-hover:from-black/30 transition-colors duration-500" />

            {/* Slide label */}
            <div className="absolute bottom-4 left-5 z-20">
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentSlide}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.4 }}
                  className="text-[10px] font-black uppercase tracking-[0.3em] text-white/50 font-mono"
                >
                  {SLIDES[currentSlide].label}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* Dot Indicators */}
            <div className="absolute bottom-4 right-5 z-20 flex gap-2 items-center">
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`transition-all duration-300 rounded-full ${
                    i === currentSlide 
                      ? 'w-5 h-1.5 bg-[#00f0ff] shadow-[0_0_6px_#00f0ff]' 
                      : 'w-1.5 h-1.5 bg-white/20 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>
        
        {/* Call to Action Button */}
        <motion.div variants={itemVariants} className="flex justify-center w-full z-20">
          <button onClick={() => navigate('/dashboard')} className="cyber-btn flex items-center justify-center gap-4 group !py-4 !px-10 !text-base">
            <span>Initialize System</span>
            <ArrowRight size={22} className="group-hover:translate-x-3 transition-transform" />
          </button>
        </motion.div>
        
      </motion.div>

      {/* Live System Status Ticker */}
      <div className="fixed bottom-0 left-0 w-full bg-[#00f0ff]/10 border-t border-[#00f0ff]/20 z-50 overflow-hidden py-1 backdrop-blur-md">
        <motion.div 
          animate={{ x: ["0%", "-50%"] }} 
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="whitespace-nowrap text-[10px] font-black uppercase tracking-[0.3em] text-[#00f0ff]/70 font-mono w-max"
        >
          {/* Double the string so it loops seamlessly */}
          {[1, 2].map(n => (
            <React.Fragment key={n}>
              [NODE: 01-ALPHA ONLINE] &nbsp;&nbsp;&nbsp;&nbsp; // &nbsp;&nbsp;&nbsp;&nbsp; 
              [GRID LATENCY: 12MS] &nbsp;&nbsp;&nbsp;&nbsp; // &nbsp;&nbsp;&nbsp;&nbsp; 
              [UPLINK: 99.98%] &nbsp;&nbsp;&nbsp;&nbsp; // &nbsp;&nbsp;&nbsp;&nbsp; 
              [ACTIVE SENSORS: 1,048] &nbsp;&nbsp;&nbsp;&nbsp; // &nbsp;&nbsp;&nbsp;&nbsp; 
              [AI CORE: NOMINAL] &nbsp;&nbsp;&nbsp;&nbsp; // &nbsp;&nbsp;&nbsp;&nbsp; 
            </React.Fragment>
          ))}
        </motion.div>
      </div>

    </div>
  );
}
