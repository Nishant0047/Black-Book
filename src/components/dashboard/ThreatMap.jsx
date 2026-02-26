import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useAppStore from '../../store/useAppStore';

const ThreatPing = ({ threat }) => {
    const theme = useAppStore(state => state.theme);
    // Determine color based on severity using the new Cyber Station palette
    const colors = {
        Critical: { light: '#dc2626', dark: '#FF003C' },
        High: { light: '#d97706', dark: '#FFEA00' },
        Medium: { light: '#16a34a', dark: '#39FF14' },
        Low: { light: '#0284c7', dark: '#00F0FF' }
    };
    const colorObj = colors[threat.severity] || colors.Low;
    const color = theme === 'dark' ? colorObj.dark : colorObj.light;

    // Use source/dest coords if available, otherwise fallback to map center
    const startX = threat.sourceCoords ? threat.sourceCoords[0] : 15 + Math.random() * 70;
    const startY = threat.sourceCoords ? threat.sourceCoords[1] : 15 + Math.random() * 70;
    const endX = threat.destCoords ? threat.destCoords[0] : 50;
    const endY = threat.destCoords ? threat.destCoords[1] : 50;

    return (
        <>
            {/* Origin Ping with Tooltip */}
            <div className="absolute z-30 group" style={{ left: `${startX}%`, top: `${startY}%` }}>
                <motion.div
                    initial={{ scale: 0, opacity: 1 }}
                    animate={{ scale: 3, opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 2, ease: "easeOut", repeat: Infinity }}
                    className="absolute w-4 h-4 rounded-full -ml-2 -mt-2"
                >
                    <div className="absolute inset-0 rounded-full" style={{ backgroundColor: color, boxShadow: `0 0 20px ${color}` }}></div>
                </motion.div>
                <div className="absolute w-2 h-2 rounded-full -ml-1 -mt-1 z-40" style={{ backgroundColor: color, boxShadow: `0 0 10px ${color}, 0 0 20px ${color}` }}></div>
                
                {/* Tooltip Overlay */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max glass-panel border border-white/10 bg-[#0B1221]/90 p-2 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-[100] shadow-2xl">
                    <div className="text-[10px] font-mono text-[#E0F2FE]">SRC: {threat.sourceIp}</div>
                    <div className="text-[10px] font-bold mt-0.5" style={{ color: color, textShadow: theme === 'dark' ? `0 0 8px ${color}` : 'none' }}>{threat.type.toUpperCase()}</div>
                </div>
            </div>
            
            {/* Destination Ping */}
            <div className="absolute z-30 group" style={{ left: `${endX}%`, top: `${endY}%` }}>
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: [0, 2.5, 4], opacity: [0, 1, 0] }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 2, ease: "easeOut", delay: 0.5, repeat: Infinity }}
                    className="absolute w-3 h-3 rounded-full -ml-1.5 -mt-1.5"
                >
                    <div className="absolute inset-0 rounded-full" style={{ backgroundColor: '#00F0FF', boxShadow: `0 0 15px #00F0FF` }}></div>
                </motion.div>
                <div className="absolute w-1.5 h-1.5 rounded-full -ml-[3px] -mt-[3px] z-40 bg-white shadow-[0_0_10px_#00F0FF,0_0_20px_#00F0FF]"></div>
            </div>

            {/* Connecting Line (Arc via SVG Path) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible">
                <defs>
                   <linearGradient id={`grad-${threat.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor={color} stopOpacity="1" />
                      <stop offset="100%" stopColor="#00F0FF" stopOpacity="0.2" />
                   </linearGradient>
                   <filter id="glowLine">
                       <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                       <feMerge>
                           <feMergeNode in="coloredBlur"/>
                           <feMergeNode in="SourceGraphic"/>
                       </feMerge>
                   </filter>
                </defs>
                <motion.line 
                    x1={`${startX}%`} 
                    y1={`${startY}%`} 
                    x2={`${endX}%`} 
                    y2={`${endY}%`} 
                    stroke={`url(#grad-${threat.id})`} 
                    strokeWidth="1.5" 
                    strokeDasharray="4,4"
                    filter="url(#glowLine)"
                    initial={{ pathLength: 0, opacity: 0.8 }}
                    animate={{ pathLength: 1, opacity: 0 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                />
            </svg>
        </>
    );
};

const ThreatMap = ({ className = "" }) => {
    const { threats, theme } = useAppStore();
    const activeThreats = threats.slice(0, 8); // Allow showing up to 8 max on the map for density

    return (
        <div className={`glass-panel p-5 h-full min-h-[400px] flex flex-col group relative ${className}`}>
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            
            <div className="flex justify-between items-center mb-4 z-40 relative">
                <h3 className="text-[11px] font-bold text-[#00F0FF] uppercase tracking-widest flex items-center gap-2" style={{ textShadow: theme === 'dark' ? '0 0 10px rgba(0,240,255,0.5)' : 'none' }}>
                   <div className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse" style={{ boxShadow: '0 0 8px #00F0FF' }}></div>
                   Global Threat Vector Map
                </h3>
                <div className="flex gap-4 text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider">
                    <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#FF003C] shadow-[0_0_8px_#FF003C] animate-pulse"></span> Critical</span>
                    <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#FFEA00] shadow-[0_0_8px_#FFEA00] animate-pulse"></span> High</span>
                    <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#00F0FF] shadow-[0_0_8px_#00F0FF]"></span> Monitor</span>
                </div>
            </div>
            
            {/* Map Container */}
            <div className="flex-1 relative rounded-xl border border-white/5 bg-[#050A15]/50 backdrop-blur-md overflow-hidden transition-all duration-500 group-hover:border-[#00F0FF]/20 group-hover:shadow-[0_0_30px_rgba(0,240,255,0.05)]">
                
                {/* Radar Sweep Effect */}
                <div className="absolute inset-0 z-20 pointer-events-none rounded-full origin-center animate-[radar-spin_4s_linear_infinite]"
                     style={{
                         background: 'conic-gradient(from 0deg, transparent 70%, rgba(0, 240, 255, 0.4) 100%)',
                         width: '200%', height: '200%', left: '-50%', top: '-50%'
                     }}>
                </div>
                
                {/* Horizontal Scan Line Overlay */}
                <div className="scan-overlay"></div>

                {/* Grid Background */}
                <div className="absolute inset-0 opacity-30" 
                    style={{ 
                        backgroundImage: 'linear-gradient(rgba(0, 240, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 240, 255, 0.1) 1px, transparent 1px)', 
                        backgroundSize: '30px 30px' 
                    }}>
                </div>

                {/* Simulated World Map Outline - Using a CSS filter to make it look like a highly styled cyan map */}
                <div className="absolute inset-2 opacity-30 pointer-events-none bg-[url('https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg')] bg-no-repeat bg-center bg-contain" style={{ filter: 'brightness(0) saturate(100%) invert(88%) sepia(86%) saturate(2854%) hue-rotate(152deg) brightness(101%) contrast(105%) opacity(0.5)' }}></div>

                {/* Central Datacenter Reactor Core (HQ) */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 z-10 group-hover:scale-110 transition-transform duration-500">
                    <div className="absolute inset-0 bg-[#00F0FF] rounded-full cyber-glow animate-[pulse_2s_ease-in-out_infinite]"></div>
                    <div className="absolute inset-1.5 bg-white rounded-full"></div>
                    <div className="absolute inset-[-12px] border border-[#00F0FF]/40 rounded-full animate-[radar-spin_3s_linear_infinite_reverse]"></div>
                    <div className="absolute inset-[-24px] border border-dashed border-[#00F0FF]/20 rounded-full animate-[radar-spin_6s_linear_infinite]"></div>
                </div>

                {/* Active Threat Animations */}
                <AnimatePresence>
                    {activeThreats.map(threat => (
                        <ThreatPing key={threat.id} threat={threat} />
                    ))}
                </AnimatePresence>
                
                {activeThreats.length === 0 && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
                        <span className="text-[10px] font-mono text-[#00F0FF] bg-[#0B1221]/80 px-4 py-2 rounded uppercase tracking-widest backdrop-blur border border-[#00F0FF]/30 shadow-[0_0_15px_rgba(0,240,255,0.2)]">
                            Awaiting Vector Telemetry...
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ThreatMap;
