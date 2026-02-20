import React, { useState, useEffect } from 'react';
import { AlertCircle, AlertTriangle, ShieldCheck, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MOCK_ALERTS = [
    { id: 1, type: 'critical', message: 'SQL Injection detected on /login', ip: '192.168.1.105', time: 'Just now' },
    { id: 2, type: 'warning', message: 'High CPU usage on Node-3', ip: '10.0.0.3', time: '2m ago' },
    { id: 3, type: 'info', message: 'New user admin created', ip: '192.168.1.55', time: '5m ago' },
];

const AlertItem = ({ alert, onDismiss }) => {
    const colors = {
        critical: 'red',
        warning: 'yellow',
        info: 'blue',
        success: 'green'
    };
    const color = colors[alert.type] || 'gray';
    
    return (
        <motion.div
            layout
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className={`p-3 rounded-lg mb-2 border border-${color}-500/20 bg-${color}-500/5 flex items-start gap-3 group relative overflow-hidden`}
        >
            <div className={`p-2 rounded-full bg-${color}-500/10 text-${color}-500`}>
                {alert.type === 'critical' ? <AlertCircle size={16} /> : 
                 alert.type === 'warning' ? <AlertTriangle size={16} /> : <ShieldCheck size={16} />}
            </div>
            <div className="flex-1">
                <h4 className={`text-sm font-semibold text-${color}-500 capitalize`}>{alert.type} Alert</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">{alert.message}</p>
                <div className="flex justify-between items-center mt-1">
                    <span className="text-[10px] text-gray-400 font-mono">{alert.ip}</span>
                    <span className="text-[10px] text-gray-400">{alert.time}</span>
                </div>
            </div>
            <button 
                onClick={() => onDismiss(alert.id)}
                className="opacity-0 group-hover:opacity-100 absolute top-2 right-2 p-1 hover:bg-white/10 rounded transition-all text-gray-400"
            >
                <X size={14} />
            </button>
        </motion.div>
    );
};

const AlertsPanel = () => {
    const [alerts, setAlerts] = useState(MOCK_ALERTS);

    useEffect(() => {
        // Simulate incoming alerts
        const interval = setInterval(() => {
            const types = ['critical', 'warning', 'info', 'success'];
            const type = types[Math.floor(Math.random() * types.length)];
            const newAlert = {
                id: Date.now(),
                type,
                message: `Simulated event detected on port ${Math.floor(Math.random() * 9000)}`,
                ip: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
                time: 'Just now'
            };
            setAlerts(prev => [newAlert, ...prev].slice(0, 8));
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const dismissAlert = (id) => {
        setAlerts(prev => prev.filter(a => a.id !== id));
    };

    return (
        <div className="bg-light-surface dark:bg-dark-surface rounded-2xl p-5 shadow-neu-light dark:shadow-neu-dark border border-white/5 h-full min-h-[500px] flex flex-col">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-700 dark:text-gray-200">Real-time Stream</h3>
                <span className="text-xs font-mono text-green-500 animate-pulse">● LIVE</span>
            </div>
            
            <div className="flex-1 overflow-y-auto scrollbar-hide">
                <AnimatePresence>
                    {alerts.map(alert => (
                        <AlertItem key={alert.id} alert={alert} onDismiss={dismissAlert} />
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default AlertsPanel;
