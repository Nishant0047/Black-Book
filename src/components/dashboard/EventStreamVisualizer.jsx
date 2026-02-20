import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Database, Server, Cpu, Radio, ArrowRight } from 'lucide-react';
import { cn } from '../../utils/cn';

const Node = ({ icon: Icon, label, color, active }) => (
    <div className={cn(
        "flex flex-col items-center gap-2 p-4 rounded-xl border transition-all duration-300 relative z-10 bg-light-surface dark:bg-dark-surface",
        active 
            ? `border-${color}-500 shadow-[0_0_15px_rgba(var(--color-${color}),0.3)] scale-105` 
            : "border-white/10 opacity-70"
    )}>
        <div className={`p-3 rounded-full bg-${color}-500/10 text-${color}-500`}>
            <Icon size={24} />
        </div>
        <span className="text-xs font-bold text-gray-500 dark:text-gray-400">{label}</span>
        {active && (
            <div className={`absolute inset-0 rounded-xl bg-${color}-500/5 animate-pulse`}></div>
        )}
    </div>
);

const Packet = ({ delay }) => (
    <motion.div
        className="absolute top-1/2 left-0 w-3 h-3 bg-white rounded-full shadow-[0_0_10px_white] z-20"
        initial={{ x: '10%', opacity: 0 }}
        animate={{ x: '90%', opacity: [0, 1, 1, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: delay }}
    />
);

const EventStreamVisualizer = () => {
    return (
        <div className="bg-light-surface dark:bg-dark-surface p-6 rounded-2xl shadow-neu-light dark:shadow-neu-dark border border-white/5 overflow-hidden relative">
            <h3 className="text-lg font-bold text-gray-700 dark:text-gray-200 mb-8 flex items-center gap-2">
                <Radio size={20} className="text-blue-500 animate-pulse" />
                Event Streaming Pipeline (Kafka Mode)
            </h3>

            <div className="relative flex items-center justify-between px-10 py-10">
                {/* Connecting Line */}
                <div className="absolute left-16 right-16 top-1/2 h-1 bg-white/5 -translate-y-1/2"></div>
                
                {/* Packets */}
                <div className="absolute left-16 right-16 top-1/2 -translate-y-1/2 h-4 overflow-visible pointer-events-none">
                    <Packet delay={0} />
                    <Packet delay={1} />
                    <Packet delay={2} />
                </div>

                <Node icon={Radio} label="Ingest" color="blue" active={true} />
                <ArrowRight className="text-gray-600 animate-pulse" />
                
                <Node icon={Cpu} label="Processing" color="purple" active={true} />
                <ArrowRight className="text-gray-600 animate-pulse" />

                <Node icon={Database} label="Storage" color="yellow" active={true} />
                <ArrowRight className="text-gray-600 animate-pulse" />

                <Node icon={Server} label="Analytics" color="green" active={true} />
            </div>

            <div className="grid grid-cols-4 gap-4 mt-6 text-center">
                <div className="bg-black/20 p-2 rounded">
                    <div className="text-xs text-gray-400">Throughput</div>
                    <div className="text-lg font-mono text-blue-400">45 MB/s</div>
                </div>
                <div className="bg-black/20 p-2 rounded">
                    <div className="text-xs text-gray-400">Latency</div>
                    <div className="text-lg font-mono text-purple-400">12 ms</div>
                </div>
                <div className="bg-black/20 p-2 rounded">
                    <div className="text-xs text-gray-400">Events</div>
                    <div className="text-lg font-mono text-yellow-400">8.2k/s</div>
                </div>
                <div className="bg-black/20 p-2 rounded">
                    <div className="text-xs text-gray-400">Errors</div>
                    <div className="text-lg font-mono text-red-500">0.01%</div>
                </div>
            </div>
        </div>
    );
};

export default EventStreamVisualizer;
