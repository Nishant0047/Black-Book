import React from 'react';
import { Database, Server, Cpu, Activity, Zap } from 'lucide-react';
import useAppStore from '../../store/useAppStore';

const StatusRow = ({ label, status, icon: Icon, metrics }) => {
    const isOnline = status === 'Online' || status === 'Healthy' || status > 0; // Handle numbered statuses if passed
    const colorClass = isOnline ? 'text-[#39FF14]' : 'text-[#FF003C]';
    const glowClass = isOnline ? 'shadow-[0_0_15px_rgba(57,255,20,0.5)]' : 'shadow-[0_0_15px_rgba(255,0,60,0.5)]';
    const borderClass = isOnline ? 'border-[#39FF14]/50' : 'border-[#FF003C]/50';

    return (
        <div className="flex flex-col items-center justify-center p-5 border-r border-b lg:border-b-0 border-white/5 last:border-r-0 hover:bg-white/5 transition-all duration-300 group relative overflow-hidden flex-1 min-w-[140px]">
            {/* Spinning Node Animation */}
            <div className="relative w-14 h-14 mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <div className={`absolute inset-0 rounded-full border border-dashed ${borderClass} animate-[radar-spin_4s_linear_infinite] opacity-50`}></div>
                <div className={`absolute inset-1.5 rounded-full border border-solid ${borderClass} animate-[radar-spin_3s_linear_infinite_reverse] opacity-70`}></div>
                <div className={`absolute inset-3 rounded-full ${isOnline ? 'bg-[#39FF14]/20' : 'bg-[#FF003C]/20'} animate-[pulse_2s_ease-in-out_infinite] ${glowClass}`}></div>
                <Icon size={18} className={`relative z-10 ${isOnline ? 'text-[#39FF14] drop-shadow-[0_0_8px_#39FF14]' : 'text-[#FF003C] drop-shadow-[0_0_8px_#FF003C]'}`} />
            </div>

            <div className="text-center z-10">
                <div className="text-[10px] font-bold text-[#E0F2FE] tracking-widest uppercase mb-1">{label}</div>
                <div className="text-[10px] text-[#38BDF8] font-mono mb-2 h-4 opacity-80">{metrics}</div>
                
                <div className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[9px] font-bold tracking-widest uppercase border ${isOnline ? 'bg-[#39FF14]/10 border-[#39FF14]/30 text-[#39FF14] shadow-[0_0_10px_rgba(57,255,20,0.2)]' : 'bg-[#FF003C]/10 border-[#FF003C]/30 text-[#FF003C] shadow-[0_0_10px_rgba(255,0,60,0.2)]'}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${isOnline ? 'bg-[#39FF14] shadow-[0_0_8px_#39FF14] animate-pulse' : 'bg-[#FF003C] shadow-[0_0_8px_#FF003C] animate-pulse'}`}></span>
                    {status}
                </div>
            </div>

            {/* Hover Scan overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00F0FF]/10 to-transparent h-[150%] w-full -translate-y-[150%] group-hover:animate-[scan-line_2s_linear_infinite] pointer-events-none"></div>
        </div>
    );
};

const SystemHealthPanel = () => {
    const { systemHealth, cacheHitRatio, theme } = useAppStore();

    return (
        <div className="glass-panel flex flex-col w-full relative overflow-hidden group">
            {/* Background Grid */}
            <div className="absolute inset-0 opacity-20 pointer-events-none" 
                    style={{ 
                        backgroundImage: 'linear-gradient(rgba(0, 240, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 240, 255, 0.1) 1px, transparent 1px)', 
                        backgroundSize: '30px 30px' 
                    }}>
            </div>
            <div className="absolute inset-0 bg-gradient-to-tr from-[#00F0FF]/5 to-[#B537F2]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

            <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between bg-[#050A15]/60 backdrop-blur-xl relative z-10">
                <h3 className="text-[11px] font-bold text-[#00F0FF] uppercase tracking-widest flex items-center gap-2" style={{ textShadow: theme === 'dark' ? '0 0 10px rgba(0,240,255,0.5)' : 'none' }}>
                    <Activity size={14} className="animate-pulse drop-shadow-[0_0_8px_#00F0FF]" />
                    Core Infrastructure Grid
                </h3>
                <div className="flex items-center gap-3">
                   <div className="w-1.5 h-1.5 rounded-full bg-[#39FF14] animate-pulse shadow-[0_0_8px_#39FF14]"></div>
                   <div className="text-[10px] font-mono text-[#38BDF8] tracking-widest">UPTIME: 99.999%</div>
                </div>
            </div>
            <div className="flex flex-wrap lg:flex-nowrap relative z-10 bg-[#0B1221]/40">
                <StatusRow label="MongoDB Cluster" status={systemHealth.mongoDB} icon={Database} metrics="Primary + 2 Sec" />
                <StatusRow label="PostgreSQL DB" status={systemHealth.postgres} icon={Database} metrics="Conn: 124/200" />
                <StatusRow label="Redis Cache" status={systemHealth.redis} icon={Zap} metrics={`Hit Ratio: ${cacheHitRatio}%`} />
                <StatusRow label="Kafka Streams" status={systemHealth.kafka} icon={Server} metrics="Lag: 12ms" />
                <StatusRow 
                    label="Worker Nodes" 
                    status="Healthy" 
                    icon={Cpu} 
                    metrics={`${systemHealth.workers.running} R | ${systemHealth.workers.idle} I`} 
                />
            </div>
        </div>
    );
};

export default SystemHealthPanel;
