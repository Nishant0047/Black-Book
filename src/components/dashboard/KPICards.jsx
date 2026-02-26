import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Activity, ShieldAlert, Zap, Database, Server, Wifi, ActivitySquare, AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ResponsiveContainer, AreaChart, Area } from 'recharts';
import useAppStore from '../../store/useAppStore';
import AnimatedNumber from '../ui/AnimatedNumber';

// Helper to generate initial sparkline data
const generateSparkData = (base, variance, count = 15) => {
    return Array.from({ length: count }, (_, i) => ({
        time: i,
        value: Math.max(0, base + (Math.random() - 0.5) * variance)
    }));
};

// -------------------------------------------------------------------------------- //
// REUSABLE COMPONENTS
// -------------------------------------------------------------------------------- //

const Sparkline = ({ data, color, id }) => (
    <div className="h-10 w-full mt-2 -mb-2 -mx-1">
        <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
                <defs>
                    <linearGradient id={`grad-${id}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={color} stopOpacity={0.4} />
                        <stop offset="100%" stopColor={color} stopOpacity={0} />
                    </linearGradient>
                </defs>
                <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke={color} 
                    fill={`url(#grad-${id})`} 
                    strokeWidth={1.5} 
                    dot={false} 
                    isAnimationActive={false} // Disable Recharts anim to allow smooth data sliding
                />
            </AreaChart>
        </ResponsiveContainer>
    </div>
);

const TrendIndicator = ({ current, history }) => {
    if (history.length < 2) return null;
    const prev = history[history.length - 2].value;
    const diff = current - prev;
    if (diff === 0) return null;
    
    // Calculate simple percentage, safeguard against /0
    const percent = prev !== 0 ? ((Math.abs(diff) / prev) * 100).toFixed(1) : diff.toFixed(1);
    const isUp = diff > 0;
    
    // In SOC, sometimes "up" is bad (like alerts or threat score).
    // For simplicity, we just use standard green up / red down, except for specific cards if needed.
    // We'll leave it simple for now or customize via props.

    return (
        <div className={`flex items-center text-[10px] font-bold ml-2 mb-1.5 ${isUp ? 'text-red-400' : 'text-[#39FF14]'}`}>
            {isUp ? <TrendingUp size={12} className="mr-0.5" /> : <TrendingDown size={12} className="mr-0.5" />}
            {percent}%
        </div>
    );
};

const BaseMetricCard = ({ title, value, unit, history, color, icon: Icon, id, reverseTrendColor = false }) => {
    const [isFlashing, setIsFlashing] = useState(false);
    const prevValue = useRef(value);

    useEffect(() => {
        if (prevValue.current !== value) {
            setIsFlashing(true);
            const timer = setTimeout(() => setIsFlashing(false), 400);
            prevValue.current = value;
            return () => clearTimeout(timer);
        }
    }, [value]);

    // Calculate trend
    const prev = history.length > 1 ? history[history.length - 2].value : value;
    const diff = value - prev;
    const percent = prev !== 0 ? ((Math.abs(diff) / prev) * 100).toFixed(1) : 0;
    const isUp = diff >= 0;
    
    let trendColor = isUp ? 'text-[#39FF14]' : 'text-red-400';
    if (reverseTrendColor) {
        trendColor = isUp ? 'text-red-400' : 'text-[#39FF14]';
    }
    if (diff === 0) trendColor = 'text-slate-500';

    return (
        <motion.div
            animate={{ backgroundColor: isFlashing ? 'rgba(255,255,255,0.08)' : '#111827' }}
            transition={{ duration: 0.4 }}
            className="bg-[#111827] border border-[#1F2937] rounded-xl p-4 flex flex-col justify-between hover:bg-[#1f2937]/40 transition-colors relative group overflow-hidden shadow-sm"
        >
            {/* Status Indicator Ring */}
            <div className="absolute top-4 right-4 flex items-center justify-center">
                <span className="flex h-1.5 w-1.5 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: color }}></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5" style={{ backgroundColor: color }}></span>
                </span>
            </div>

            <div className="flex items-center gap-2 mb-1 relative z-10">
                <Icon size={14} className="text-slate-400 group-hover:text-white transition-colors" />
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{title}</span>
            </div>

            <div className="flex items-end gap-1 z-10 -mb-1 mt-1">
                <span className="text-2xl font-bold text-white tracking-tight" style={{ textShadow: `0 0 10px ${color}40` }}>
                    <AnimatedNumber value={value} />
                </span>
                {unit && <span className="text-xs text-slate-500 font-bold mb-1 ml-0.5">{unit}</span>}

                <div className={`flex items-center text-[10px] font-bold ml-2 mb-1.5 ${trendColor}`}>
                    {diff !== 0 && (isUp ? <TrendingUp size={12} className="mr-0.5" /> : <TrendingDown size={12} className="mr-0.5" />)}
                    {diff !== 0 && `${percent}%`}
                </div>
            </div>

            <Sparkline data={history} color={color} id={id} />
        </motion.div>
    );
};

const ThreatScoreCard = ({ value }) => {
    const [isFlashing, setIsFlashing] = useState(false);
    const prevValue = useRef(value);

    useEffect(() => {
        if (prevValue.current !== value) {
            setIsFlashing(true);
            const timer = setTimeout(() => setIsFlashing(false), 400);
            prevValue.current = value;
            return () => clearTimeout(timer);
        }
    }, [value]);

    // Circular progress math
    const radius = 28;
    const strokeWidth = 5;
    const normalizedRadius = radius - strokeWidth * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (value / 100) * circumference;

    let color = '#39FF14'; // Green
    if (value > 40) color = '#FFEA00'; // Yellow
    if (value > 70) color = '#FF003C'; // Red

    const prev = prevValue.current;
    const diff = value - prev;
    const isUp = diff >= 0;

    return (
        <motion.div
            animate={{ backgroundColor: isFlashing ? 'rgba(255,50,50,0.08)' : '#111827' }}
            transition={{ duration: 0.4 }}
            className="bg-[#111827] border border-[#1F2937] border-l-[3px] rounded-xl p-4 flex justify-between items-center hover:bg-[#1f2937]/40 transition-colors relative group overflow-hidden shadow-sm"
            style={{ borderLeftColor: color }}
        >
            <div className="flex flex-col z-10">
                <div className="flex items-center gap-2 mb-2">
                    <ShieldAlert size={14} className="text-slate-400" />
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Threat Score</span>
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-3xl font-bold text-white tracking-tight" style={{ textShadow: `0 0 15px ${color}60` }}>
                        <AnimatedNumber value={value} />
                    </span>
                    <div className="flex flex-col">
                        <span className="text-[10px] font-mono text-slate-500">/ 100</span>
                        {diff !== 0 && (
                            <span className={`text-[10px] font-bold flex items-center ${isUp ? 'text-[#FF003C]' : 'text-[#39FF14]'}`}>
                                {isUp ? <TrendingUp size={10} className="mr-0.5" /> : <TrendingDown size={10} className="mr-0.5" />}
                                {Math.abs(diff)} pts
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* Circular Ring */}
            <div className="relative flex items-center justify-center mr-2">
                <svg height={radius * 2} width={radius * 2} className="rotate-[-90deg] drop-shadow-[0_0_8px_currentColor]" style={{ color }}>
                    {/* Track */}
                    <circle stroke="#1F2937" fill="transparent" strokeWidth={strokeWidth} r={normalizedRadius} cx={radius} cy={radius} />
                    {/* Fill */}
                    <motion.circle
                        stroke={color}
                        fill="transparent"
                        strokeWidth={strokeWidth}
                        strokeDasharray={circumference + ' ' + circumference}
                        initial={{ strokeDashoffset: circumference }}
                        animate={{ strokeDashoffset }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        r={normalizedRadius}
                        cx={radius}
                        cy={radius}
                        strokeLinecap="round"
                    />
                </svg>
            </div>
            
            {/* Background warning glow for high threat */}
            {value > 70 && <div className="absolute inset-0 bg-[#FF003C]/5 pointer-events-none animate-pulse"></div>}
        </motion.div>
    );
};

const StreamStatusCard = ({ status }) => {
    return (
        <div className="bg-[#111827] border border-[#1F2937] rounded-xl p-4 flex flex-col justify-between hover:bg-[#1f2937]/40 transition-colors relative group overflow-hidden shadow-sm">
            
            <div className="flex items-center gap-2 mb-1">
                <Wifi size={14} className="text-slate-400" />
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Data Stream</span>
            </div>

            <div className="flex-1 flex flex-col justify-center items-center h-full mb-1">
                {status ? (
                    <>
                        <div className="text-lg font-bold text-[#39FF14] tracking-widest flex items-center gap-2" style={{ textShadow: '0 0 10px rgba(57,255,20,0.5)' }}>
                            ONLINE
                            <div className="flex items-end gap-[2px] h-4 mb-0.5">
                                <motion.div animate={{ height: ['40%', '100%', '40%'] }} transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }} className="w-1 bg-[#39FF14] rounded-t-sm"></motion.div>
                                <motion.div animate={{ height: ['80%', '40%', '80%'] }} transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }} className="w-1 bg-[#39FF14] rounded-t-sm"></motion.div>
                                <motion.div animate={{ height: ['30%', '90%', '30%'] }} transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }} className="w-1 bg-[#39FF14] rounded-t-sm"></motion.div>
                                <motion.div animate={{ height: ['100%', '50%', '100%'] }} transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }} className="w-1 bg-[#39FF14] rounded-t-sm"></motion.div>
                            </div>
                        </div>
                        <span className="text-[10px] text-slate-500 font-mono mt-1 w-full text-center">SYNCED: 0ms LATENCY</span>
                    </>
                ) : (
                    <>
                        <div className="text-lg font-bold text-[#FF003C] tracking-widest flex items-center gap-2" style={{ textShadow: '0 0 10px rgba(255,0,60,0.5)' }}>
                            OFFLINE
                            <AlertTriangle size={16} className="text-[#FF003C] animate-pulse" />
                        </div>
                        <span className="text-[10px] text-slate-500 font-mono mt-1 w-full text-center">CONNECTION LOST</span>
                    </>
                )}
            </div>
            
            {/* Offline Error Overlay */}
            {!status && <div className="absolute inset-0 bg-[#FF003C]/5 pointer-events-none"></div>}
        </div>
    );
};

// -------------------------------------------------------------------------------- //
// MAIN COMPONENT
// -------------------------------------------------------------------------------- //

const KPICards = () => {
    const store = useAppStore();
    
    // Initial data setup
    const initialLogs = store.logs?.length || 0;
    const initialAlerts = store.alerts?.filter(a => a.status === 'Active').length || 0;
    
    const [metrics, setMetrics] = useState({
        threatScore: { val: store.threatScore || 24 },
        alerts: { val: initialAlerts, history: generateSparkData(initialAlerts, 2) },
        eps: { val: store.apiRequestRate || 1240, history: generateSparkData(store.apiRequestRate || 1240, 100) },
        apiLoad: { val: 45, history: generateSparkData(45, 10) },
        logs: { val: initialLogs + 8450123, history: generateSparkData(initialLogs + 8450123, 1000) },
        serverLoad: { val: 62, history: generateSparkData(62, 5) },
        cacheHit: { val: store.cacheHitRatio || 94.2, history: generateSparkData(store.cacheHitRatio || 94, 2) }
    });

    // Real-time Simulation Engine
    useEffect(() => {
        const interval = setInterval(() => {
            setMetrics(prev => {
                const tick = Date.now();
                
                // Helper to add a new point and truncate history
                const updateSeries = (series, newVal) => {
                    const newHistory = [...series.history.slice(1), { time: tick, value: newVal }];
                    return { val: newVal, history: newHistory };
                };

                // Randomized variations
                const newThreat = Math.max(0, Math.min(100, prev.threatScore.val + Math.floor((Math.random() - 0.5) * 8)));
                const newAlerts = Math.max(0, prev.alerts.val + (Math.random() > 0.8 ? 1 : Math.random() < 0.2 ? -1 : 0));
                const newEps = Math.max(100, Math.min(5000, prev.eps.val + Math.floor((Math.random() - 0.5) * 300)));
                const newApiLoad = Math.max(0, Math.min(100, prev.apiLoad.val + Math.floor((Math.random() - 0.5) * 12)));
                const newLogs = prev.logs.val + Math.floor(Math.random() * 50); // always increments
                const newServerLoad = Math.max(10, Math.min(95, prev.serverLoad.val + Math.floor((Math.random() - 0.5) * 8)));
                
                // Cache hit is typically stable
                const newCacheHit = Math.max(80, Math.min(99.9, prev.cacheHit.val + (Math.random() - 0.5) * 1.5));

                return {
                    threatScore: { val: newThreat },
                    alerts: updateSeries(prev.alerts, newAlerts),
                    eps: updateSeries(prev.eps, newEps),
                    apiLoad: updateSeries(prev.apiLoad, newApiLoad),
                    logs: updateSeries(prev.logs, newLogs),
                    serverLoad: updateSeries(prev.serverLoad, newServerLoad),
                    cacheHit: updateSeries(prev.cacheHit, newCacheHit)
                };
            });
        }, 3500); // Live update every 3.5s

        return () => clearInterval(interval);
    }, []);

    // Layout configuration
    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col gap-4"
        >
            {/* Top Row: Critical Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
                <ThreatScoreCard 
                    value={metrics.threatScore.val} 
                />
                
                <BaseMetricCard 
                    id="alerts"
                    title="Active Alerts" 
                    value={metrics.alerts.val} 
                    history={metrics.alerts.history}
                    color="#FF003C" // Red theme for alerts
                    icon={AlertTriangle}
                    reverseTrendColor={true} // up is bad
                />
                
                <BaseMetricCard 
                    id="eps"
                    title="Events Per Second" 
                    value={metrics.eps.val} 
                    history={metrics.eps.history}
                    color="#00F0FF" // Cyan
                    icon={ActivitySquare}
                />
                
                <BaseMetricCard 
                    id="apiload"
                    title="API Load" 
                    value={metrics.apiLoad.val} 
                    unit="%"
                    history={metrics.apiLoad.history}
                    color="#B537F2" // Purple
                    icon={Activity}
                    reverseTrendColor={true} // higher load is generally bad
                />
            </div>

            {/* Bottom Row: System Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
                <BaseMetricCard 
                    id="logs"
                    title="Total Logs (24h)" 
                    value={metrics.logs.val} 
                    history={metrics.logs.history}
                    color="#38BDF8" // Light blue
                    icon={Database}
                />
                
                <BaseMetricCard 
                    id="serverload"
                    title="Server Load" 
                    value={metrics.serverLoad.val} 
                    unit="%"
                    history={metrics.serverLoad.history}
                    color="#FFEA00" // Yellow
                    icon={Server}
                    reverseTrendColor={true}
                />
                
                <BaseMetricCard 
                    id="cachehit"
                    title="Cache Hit Ratio" 
                    value={Number(metrics.cacheHit.val.toFixed(1))} // round 1 decimal
                    unit="%"
                    history={metrics.cacheHit.history}
                    color="#39FF14" // Neon Green
                    icon={Zap}
                />
                
                <StreamStatusCard 
                    status={store.websocketConnected} 
                />
            </div>
        </motion.div>
    );
};

export default KPICards;
