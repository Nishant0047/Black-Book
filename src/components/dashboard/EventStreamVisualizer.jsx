import React from 'react';
import { motion } from 'framer-motion';
import { Database, Server, Cpu, Radio, ArrowRight } from 'lucide-react';
import { cn } from '../../utils/cn';

const Node = ({ icon: Icon, label, color, active }) => (
    <div className={cn(
        "flex flex-col items-center gap-2 p-4 rounded border transition-all duration-300 relative z-10 bg-white dark:bg-[#030712] overflow-hidden group",
        active 
            ? `border-${color}-400 dark:border-${color}-500/50 shadow-sm dark:shadow-[0_0_15px_rgba(var(--tw-color-${color}-500),0.3)]` 
            : "border-gray-200 dark:border-[rgba(59,130,246,0.2)] opacity-70"
    )}>
        {/* Pulsing Core */}
        <div className={`p-2 rounded bg-${color}-100 dark:bg-${color}-500/10 text-${color}-600 dark:text-${color}-500 flex items-center justify-center relative`}>
            {active && <div className={`absolute inset-0 bg-${color}-500 rounded-full animate-ping opacity-20`}></div>}
            <Icon size={20} className="relative z-10" style={{ filter: active ? `drop-shadow(0 0 5px currentColor)` : 'none' }} />
        </div>
        <span className={`text-[10px] font-bold uppercase tracking-wider ${active ? `text-${color}-700 dark:text-${color}-400` : 'text-gray-500'}`}>{label}</span>
        
        {/* Subtle Scan Overlay */}
        {active && <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-100 dark:via-white/5 to-transparent h-[20%] w-full animate-[scan-line_2s_linear_infinite] pointer-events-none"></div>}
    </div>
);

const Packet = ({ delay, color }) => (
    <motion.div
        className={`absolute top-1/2 left-0 w-2 h-2 rounded-full z-20 ${color === 'red' ? 'bg-red-500 dark:bg-[#FF003C] shadow-[0_0_4px_#EF4444] dark:shadow-[0_0_8px_#FF003C]' : 'bg-blue-500 dark:bg-[#00F0FF] shadow-[0_0_4px_#3B82F6] dark:shadow-[0_0_8px_#00F0FF]'}`}
        initial={{ x: '10%', y: '-50%', opacity: 0, scale: 0 }}
        animate={{ x: '90%', y: '-50%', opacity: [0, 1, 1, 0], scale: [0, 1, 1, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "linear", delay: delay }}
    />
);

import useAppStore from '../../store/useAppStore';

const EventStreamVisualizer = () => {
    const { theme } = useAppStore();
    return (
        <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="soc-panel cyber-panel p-6 overflow-hidden relative border-gray-200 dark:border-[rgba(59,130,246,0.3)]"
        >
            <h3 className="text-xs font-bold text-gray-800 dark:text-[#E0F2FE] uppercase tracking-wider mb-8 flex items-center gap-2">
                <Radio size={14} className="text-blue-600 dark:text-[#00F0FF] animate-pulse" style={{ filter: theme === 'dark' ? 'drop-shadow(0 0 5px #00F0FF)' : 'none' }}/>
                Event Streaming Pipeline
            </h3>

            <div className="relative flex items-center justify-between px-10 py-10">
                {/* Connecting Line Database -> Analytics */}
                <div className="absolute left-16 right-16 top-1/2 h-[2px] -translate-y-1/2 overflow-hidden pointer-events-none z-0">
                    <div className="w-full h-full bg-gray-200 dark:bg-[#1F2937]"></div>
                    <motion.div 
                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-transparent via-blue-400 dark:via-[#00F0FF]/50 to-transparent w-1/3"
                        initial={{ x: '-100%' }}
                        animate={{ x: '300%' }}
                        transition={{ duration: 3, ease: "linear", repeat: Infinity }}
                    />
                </div>
                
                {/* Fast Moving Packets */}
                <div className="absolute left-16 right-16 top-1/2 -translate-y-1/2 h-8 overflow-visible pointer-events-none">
                    <Packet delay={0} color="blue" />
                    <Packet delay={0.4} color="blue" />
                    <Packet delay={0.8} color="red" />
                    <Packet delay={1.2} color="blue" />
                    <Packet delay={1.6} color="blue" />
                    <Packet delay={2.0} color="red" />
                </div>

                <Node icon={Radio} label="Ingest" color="blue" active={true} />
                <ArrowRight className="text-blue-400 dark:text-[#00F0FF]/50 animate-pulse relative z-10" />
                
                <Node icon={Cpu} label="Processing" color="purple" active={true} />
                <ArrowRight className="text-blue-400 dark:text-[#00F0FF]/50 animate-pulse relative z-10" />

                <Node icon={Database} label="Storage" color="yellow" active={true} />
                <ArrowRight className="text-blue-400 dark:text-[#00F0FF]/50 animate-pulse relative z-10" />

                <Node icon={Server} label="Analytics" color="green" active={true} />
            </div>

            <div className="grid grid-cols-4 gap-4 mt-6 text-center border-t border-gray-200 dark:border-[rgba(59,130,246,0.3)] pt-6 relative z-10">
                <div className="bg-gray-50 dark:bg-[#111827]/50 p-3 rounded border border-gray-200 dark:border-[rgba(59,130,246,0.2)]">
                    <div className="text-[10px] uppercase font-bold text-blue-600 dark:text-[#38BDF8] mb-1">Throughput</div>
                    <div className="text-sm font-mono text-blue-500 dark:text-[#00F0FF]">45 MB/s</div>
                </div>
                <div className="bg-gray-50 dark:bg-[#111827]/50 p-3 rounded border border-gray-200 dark:border-[rgba(59,130,246,0.2)]">
                    <div className="text-[10px] uppercase font-bold text-blue-600 dark:text-[#38BDF8] mb-1">Latency</div>
                    <div className="text-sm font-mono text-purple-600 dark:text-purple-400">12 ms</div>
                </div>
                <div className="bg-gray-50 dark:bg-[#111827]/50 p-3 rounded border border-gray-200 dark:border-[rgba(59,130,246,0.2)]">
                    <div className="text-[10px] uppercase font-bold text-blue-600 dark:text-[#38BDF8] mb-1">Events</div>
                    <div className="text-sm font-mono text-yellow-600 dark:text-yellow-400">8.2k/s</div>
                </div>
                <div className="bg-gray-50 dark:bg-[#111827]/50 p-3 rounded border border-gray-200 dark:border-[rgba(59,130,246,0.2)]">
                    <div className="text-[10px] uppercase font-bold text-blue-600 dark:text-[#38BDF8] mb-1">Dropped</div>
                    <div className="text-sm font-mono text-red-500 dark:text-[#FF003C]">0.01%</div>
                </div>
            </div>
        </motion.div>
    );
};

export default EventStreamVisualizer;
