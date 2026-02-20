import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const ThreatMap = () => {
    // Simulate attack nodes
    const [attacks, setAttacks] = useState([]);

    useEffect(() => {
        const interval = setInterval(() => {
            const id = Math.random();
            const x = Math.random() * 100; // %
            const y = Math.random() * 100; // %
            
            setAttacks(prev => [...prev.slice(-10), { id, x, y }]);
        }, 800);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-light-surface dark:bg-dark-surface rounded-2xl p-6 shadow-neu-light dark:shadow-neu-dark border border-white/5 relative overflow-hidden min-h-[400px]">
            <h3 className="text-lg font-bold text-gray-700 dark:text-gray-200 mb-4 z-10 relative">Live Threat Map</h3>
            
            {/* Grid Background */}
            <div className="absolute inset-0 opacity-10" 
                style={{ 
                    backgroundImage: 'linear-gradient(#38bdf8 1px, transparent 1px), linear-gradient(90deg, #38bdf8 1px, transparent 1px)', 
                    backgroundSize: '40px 40px' 
                }}>
            </div>

            {/* Simulated World Map Outline (CSS Shapes or minimal SVG) */}
            <div className="absolute inset-10 border-2 border-dashed border-gray-500/20 rounded-xl"></div>

            {/* Attack Pings */}
            {attacks.map(attack => (
                <motion.div
                    key={attack.id}
                    initial={{ scale: 0, opacity: 1 }}
                    animate={{ scale: 4, opacity: 0 }}
                    transition={{ duration: 2 }}
                    style={{ left: `${attack.x}%`, top: `${attack.y}%` }}
                    className="absolute w-2 h-2 bg-red-500 rounded-full"
                >
                    <div className="absolute inset-0 bg-red-500 rounded-full animate-ping"></div>
                </motion.div>
            ))}

            {/* Connecting Lines (Decor) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
                <line x1="10%" y1="20%" x2="50%" y2="50%" stroke="#38bdf8" strokeWidth="1" strokeDasharray="5,5" />
                <line x1="80%" y1="80%" x2="50%" y2="50%" stroke="#38bdf8" strokeWidth="1" strokeDasharray="5,5" />
                <circle cx="50%" cy="50%" r="5" fill="#38bdf8" />
            </svg>
            
            <div className="absolute bottom-4 right-4 bg-black/40 backdrop-blur-md p-2 rounded text-xs text-white">
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500"></span> Critical
                    <span className="w-2 h-2 rounded-full bg-yellow-500 ml-2"></span> Suspicious
                </div>
            </div>
        </div>
    );
};

export default ThreatMap;
