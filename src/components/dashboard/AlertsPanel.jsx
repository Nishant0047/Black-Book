import React from 'react';
import { AlertCircle, AlertTriangle, ShieldCheck, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import useAppStore from '../../store/useAppStore';
import StatusBadge from '../ui/StatusBadge';

const AlertItem = ({ alert, onDismiss }) => {
    const theme = useAppStore(state => state.theme);
    // Map our global severities to theme-aware colors
    const colors = {
        Critical: { light: '#dc2626', dark: '#FF003C' },
        High: { light: '#d97706', dark: '#FFEA00' },
        Medium: { light: '#2563eb', dark: '#00F0FF' },
        Low: { light: '#4b5563', dark: '#38BDF8' }
    };
    const colorObj = colors[alert.severity] || colors.Low;
    const activeColor = theme === 'dark' ? colorObj.dark : colorObj.light;
    
    // Determine glow class based on severity
    const glowClass = alert.severity === 'Critical' ? 'shadow-[0_0_15px_rgba(255,0,60,0.5)]' : 
                      alert.severity === 'High' ? 'shadow-[0_0_15px_rgba(255,234,0,0.3)]' : 
                      'shadow-[0_0_10px_rgba(0,240,255,0.2)]';
    
    return (
        <motion.div
            layout
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className={`p-3 border-b border-white/5 bg-white/5 dark:hover:bg-white/10 flex items-start gap-3 group relative transition-colors ${alert.severity === 'Critical' ? 'dark:bg-[rgba(255,0,60,0.05)]' : ''}`}
        >
            {/* Severity Indicator Line */}
            <div className="absolute left-0 top-0 bottom-0 w-[3px]" style={{ backgroundColor: activeColor, boxShadow: theme === 'dark' ? `0 0 8px ${activeColor}` : 'none' }}></div>

            <div className={`p-2 rounded-lg bg-[#050A15]/80 border flex-shrink-0 ${glowClass} relative overflow-hidden`} style={{ borderColor: theme === 'dark' ? `${activeColor}60` : `${activeColor}80`, color: activeColor }}>
                {/* Subtle pulse behind icon for active alerts */}
                {alert.status === 'Active' && <div className="absolute inset-0 opacity-20 animate-[pulse_1.5s_ease-in-out_infinite]" style={{ backgroundColor: activeColor }}></div>}
                {alert.severity === 'Critical' ? <AlertCircle size={16} className="relative z-10" /> : 
                 alert.severity === 'High' ? <AlertTriangle size={16} className="relative z-10" /> : 
                 alert.severity === 'Medium' ? <AlertTriangle size={16} className="relative z-10" /> : <ShieldCheck size={16} className="relative z-10" />}
            </div>
            
            <div className="flex-1 min-w-0 pb-0.5">
                <div className="flex justify-between items-start mb-1">
                    <h4 className="text-[11px] font-bold truncate tracking-widest uppercase flex items-center gap-2" style={{ color: activeColor, textShadow: theme === 'dark' ? `0 0 8px ${activeColor}80` : 'none' }}>
                        {alert.type}
                    </h4>
                    <span className="text-[9px] uppercase tracking-widest font-bold px-1.5 py-0.5 border rounded bg-[#050A15]/60" style={{ color: activeColor, borderColor: theme === 'dark' ? `${activeColor}40` : `${activeColor}80` }}>{alert.severity}</span>
                </div>
                <div className="flex justify-between items-center mt-1">
                    <span className="text-[10px] text-[#38BDF8] font-mono truncate mr-2 opacity-80 group-hover:opacity-100 transition-opacity">
                        <span className="text-slate-500">SRC:</span> {alert.sourceIp} <span className="text-[#00F0FF] mx-1">→</span> <span className="text-slate-500">DST:</span> {alert.destinationIp}
                    </span>
                    <span className="text-[9px] text-slate-500 whitespace-nowrap font-mono tracking-wider">
                        {new Date(alert.timestamp).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute:'2-digit', second:'2-digit' })}
                    </span>
                </div>
            </div>

            {alert.status === 'Active' && (
                <button 
                    onClick={() => onDismiss(alert.id, 'Ignored')}
                    className="opacity-0 group-hover:opacity-100 absolute top-2 right-2 p-1 hover:bg-[#00F0FF]/20 rounded transition-all text-[#00F0FF] border border-transparent hover:border-[#00F0FF]/50 shadow-[0_0_10px_rgba(0,240,255,0.3)] backdrop-blur-md"
                    title="Dismiss Alert"
                >
                    <X size={12} />
                </button>
            )}
        </motion.div>
    );
};

const AlertsPanel = () => {
    // Take only the 8 most recent alerts to fit in the panel
    const { alerts, updateAlertStatus, websocketConnected, theme } = useAppStore();
    const recentAlerts = alerts.slice(0, 8);

    const handleDismiss = (id, newStatus) => {
        updateAlertStatus(id, newStatus);
    };

    return (
        <div className="glass-panel flex flex-col h-full min-h-[350px] relative overflow-hidden group">
            {/* Background Grid */}
            <div className="absolute inset-0 opacity-20 pointer-events-none" 
                style={{ 
                    backgroundImage: 'linear-gradient(rgba(0, 240, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 240, 255, 0.1) 1px, transparent 1px)', 
                    backgroundSize: '20px 20px' 
                }}>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-[#00F0FF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

            <div className="px-5 py-4 border-b border-white/10 bg-[#050A15]/60 backdrop-blur-xl flex items-center justify-between relative z-10">
                <h3 className="text-[11px] font-bold text-[#00F0FF] uppercase tracking-widest flex items-center gap-2" style={{ textShadow: theme === 'dark' ? '0 0 10px rgba(0,240,255,0.5)' : 'none' }}>
                    <div className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-pulse" style={{ boxShadow: '0 0 8px #00F0FF' }}></div>
                    Live Threat Feed
                </h3>
                <div className="flex items-center gap-2">
                    <span className={`text-[9px] font-mono font-bold tracking-widest flex items-center gap-1.5 ${websocketConnected ? 'text-[#39FF14]' : 'text-[#FF003C]'}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${websocketConnected ? 'bg-[#39FF14] shadow-[0_0_8px_#39FF14] animate-pulse' : 'bg-[#FF003C] shadow-[0_0_8px_#FF003C]'}`}></span>
                        {websocketConnected ? 'LINK ACTIVE' : 'CONNECTION LOST'}
                    </span>
                </div>
            </div>
            
            <div className="flex-1 overflow-y-auto scrollbar-hide relative z-10">
                <AnimatePresence>
                    {recentAlerts.map((alert, index) => (
                        <div key={alert.id}>
                            <AlertItem alert={alert} onDismiss={handleDismiss} />
                        </div>
                    ))}
                </AnimatePresence>
                {recentAlerts.length === 0 && (
                    <div className="h-full flex flex-col items-center justify-center text-[#00F0FF]/50 text-xs font-mono tracking-widest uppercase">
                        <ShieldCheck size={32} className="mb-3 opacity-50 drop-shadow-[0_0_10px_rgba(0,240,255,0.5)]" />
                        No Active Threats Detected
                    </div>
                )}
            </div>
        </div>
    );
};

export default AlertsPanel;
