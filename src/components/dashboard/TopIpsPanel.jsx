import React from 'react';
import { ShieldAlert, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

const mockTopIps = [
    { ip: "192.168.1.105", blockCount: 1204, country: "RU" },
    { ip: "10.0.0.45", blockCount: 940, country: "CN" },
    { ip: "172.16.254.1", blockCount: 753, country: "BR" },
    { ip: "45.22.12.99", blockCount: 680, country: "NG" },
    { ip: "112.54.33.22", blockCount: 512, country: "KP" },
    { ip: "203.0.113.4", blockCount: 430, country: "US" },
    { ip: "8.8.4.4", blockCount: 210, country: "IN" },
];

import useAppStore from '../../store/useAppStore';

const TopIpsPanel = () => {
    const { theme } = useAppStore();
    return (
        <div className="glass-panel flex flex-col h-full min-h-[250px] relative overflow-hidden group">
            {/* Background Grid */}
            <div className="absolute inset-0 opacity-20 pointer-events-none" 
                style={{ 
                    backgroundImage: 'linear-gradient(rgba(0, 240, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 240, 255, 0.1) 1px, transparent 1px)', 
                    backgroundSize: '20px 20px' 
                }}>
            </div>
            <div className="absolute inset-0 bg-gradient-to-bl from-[#FF003C]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

            <div className="px-5 py-4 border-b border-white/10 bg-[#050A15]/60 backdrop-blur-xl relative z-10 flex items-center justify-between">
                <h3 className="text-[11px] font-bold text-[#FF003C] uppercase tracking-widest flex items-center gap-2">
                    <ShieldAlert size={14} className="text-[#FF003C] animate-[pulse_2s_ease-in-out_infinite] drop-shadow-[0_0_8px_#FF003C]" />
                    <span style={{ textShadow: theme === 'dark' ? '0 0 10px rgba(255,0,60,0.5)' : 'none' }}>Top Malicious Sources</span>
                </h3>
            </div>
            
            <div className="flex-1 overflow-y-auto scrollbar-hide py-2 relative z-10">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr>
                            <th className="px-5 py-3 text-[9px] font-bold text-[#94A3B8] uppercase tracking-widest border-b border-white/5 bg-[#0B1221]/50 backdrop-blur-md">Source IP</th>
                            <th className="px-5 py-3 text-[9px] font-bold text-[#94A3B8] uppercase tracking-widest border-b border-white/5 bg-[#0B1221]/50 backdrop-blur-md">Blocks</th>
                            <th className="px-5 py-3 text-[9px] font-bold text-[#94A3B8] uppercase tracking-widest border-b border-white/5 bg-[#0B1221]/50 backdrop-blur-md">Loc</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mockTopIps.map((target, idx) => (
                            <motion.tr 
                                key={idx} 
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: idx * 0.05 }}
                                className="border-b border-white/5 hover:bg-white/5 transition-colors group/row"
                            >
                                <td className="px-5 py-3 font-mono text-[11px] text-[#38BDF8] group-hover/row:text-[#00F0FF] transition-colors flex items-center gap-2">
                                    <Globe size={11} className="text-slate-500 group-hover/row:text-[#00F0FF] opacity-50 group-hover/row:opacity-100 transition-all drop-shadow-[0_0_5px_rgba(0,240,255,0)] group-hover/row:drop-shadow-[0_0_5px_rgba(0,240,255,0.5)]" />
                                    {target.ip}
                                </td>
                                <td className="px-5 py-3 text-[11px] font-mono font-bold text-[#FF003C] tracking-widest drop-shadow-[0_0_5px_rgba(255,0,60,0.2)]">{target.blockCount}</td>
                                <td className="px-5 py-3 text-[10px] text-slate-400 group-hover/row:text-[#00F0FF] transition-colors font-bold uppercase">{target.country}</td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TopIpsPanel;
