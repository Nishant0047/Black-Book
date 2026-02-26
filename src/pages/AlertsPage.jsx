import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, AlertCircle, AlertTriangle, ShieldCheck, CheckCircle, XCircle } from 'lucide-react';
import useAppStore from '../store/useAppStore';
import PageTransition from '../components/ui/PageTransition';
import StatusBadge from '../components/ui/StatusBadge';
import { cn } from '../utils/cn';

const AlertsPage = () => {
    const { alerts, updateAlertStatus } = useAppStore();
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [severityFilter, setSeverityFilter] = useState('All');

    // Filtering Logic
    const filteredAlerts = alerts.filter(alert => {
        const matchesSearch = alert.type.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              alert.sourceIp.includes(searchTerm) || 
                              alert.destinationIp.includes(searchTerm);
        const matchesStatus = statusFilter === 'All' || alert.status === statusFilter;
        const matchesSeverity = severityFilter === 'All' || alert.severity === severityFilter;
        return matchesSearch && matchesStatus && matchesSeverity;
    });

    return (
        <PageTransition>
            <div className="space-y-6 pb-10 h-full flex flex-col">
                {/* Header & Controls */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Security Alerts</h1>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">Real-time threat detection and incident response</p>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-3">
                        {/* Search */}
                        <div className="relative group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#00F0FF] group-focus-within:animate-pulse" size={16} />
                            <input 
                                type="text" 
                                placeholder="Search IP or Type..." 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-9 pr-4 py-2 bg-[#030712] border border-[rgba(0,240,255,0.3)] rounded text-sm text-[#E0F2FE] placeholder-[#38BDF8] focus:outline-none focus:border-[#00F0FF] focus:shadow-[0_0_10px_rgba(0,240,255,0.5)] transition-all duration-300 w-64"
                            />
                        </div>
                        
                        {/* Severity Filter */}
                        <select 
                            value={severityFilter}
                            onChange={(e) => setSeverityFilter(e.target.value)}
                            className="px-4 py-2 bg-[#030712] border border-[rgba(0,240,255,0.3)] rounded text-sm text-[#00F0FF] focus:outline-none focus:border-[#00F0FF] focus:shadow-[0_0_10px_rgba(0,240,255,0.5)] transition-all duration-300 appearance-none cursor-pointer"
                        >
                            <option value="All">All Severities</option>
                            <option value="Critical">Critical</option>
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                        </select>

                        {/* Status Filter */}
                        <select 
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="px-4 py-2 bg-[#030712] border border-[rgba(0,240,255,0.3)] rounded text-sm text-[#00F0FF] focus:outline-none focus:border-[#00F0FF] focus:shadow-[0_0_10px_rgba(0,240,255,0.5)] transition-all duration-300 appearance-none cursor-pointer"
                        >
                            <option value="All">All Statuses</option>
                            <option value="Active">Active</option>
                            <option value="Investigating">Investigating</option>
                            <option value="Resolved">Resolved</option>
                            <option value="Ignored">Ignored</option>
                        </select>
                    </div>
                </div>

                {/* Alerts Table Container */}
                <div className="flex-1 soc-panel cyber-panel rounded border border-[rgba(0,240,255,0.3)] overflow-hidden flex flex-col min-h-[500px]">
                    
                    {/* Scan line overlay */}
                    <div className="scan-overlay opacity-20 hidden md:block"></div>

                    <div className="overflow-x-auto relative z-10">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr>
                                    <th className="soc-table-header bg-[rgba(0,240,255,0.05)] border-b border-[rgba(0,240,255,0.3)] text-[#00F0FF]">Severity</th>
                                    <th className="soc-table-header bg-[rgba(0,240,255,0.05)] border-b border-[rgba(0,240,255,0.3)] text-[#00F0FF]">Threat Type</th>
                                    <th className="soc-table-header bg-[rgba(0,240,255,0.05)] border-b border-[rgba(0,240,255,0.3)] text-[#00F0FF]">Source IP</th>
                                    <th className="soc-table-header bg-[rgba(0,240,255,0.05)] border-b border-[rgba(0,240,255,0.3)] text-[#00F0FF]">Destination IP</th>
                                    <th className="soc-table-header bg-[rgba(0,240,255,0.05)] border-b border-[rgba(0,240,255,0.3)] text-[#00F0FF]">Timestamp</th>
                                    <th className="soc-table-header bg-[rgba(0,240,255,0.05)] border-b border-[rgba(0,240,255,0.3)] text-[#00F0FF]">Status</th>
                                    <th className="soc-table-header bg-[rgba(0,240,255,0.05)] border-b border-[rgba(0,240,255,0.3)] text-[#00F0FF] text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[rgba(0,240,255,0.1)]">
                                <AnimatePresence initial={false}>
                                    {filteredAlerts.map(alert => (
                                        <motion.tr 
                                            key={alert.id}
                                            initial={{ opacity: 0, x: -20, backgroundColor: 'rgba(255, 0, 60, 0.2)' }}
                                            animate={{ opacity: 1, x: 0, backgroundColor: 'transparent' }}
                                            exit={{ opacity: 0, x: 20 }}
                                            transition={{ duration: 0.3 }}
                                            className="soc-table-row group hover:bg-[rgba(0,240,255,0.05)] transition-colors border-b border-[rgba(0,240,255,0.1)] relative"
                                        >
                                            {/* Hover Highlight Line */}
                                            <td className="absolute left-0 top-0 bottom-0 w-1 bg-[#00F0FF] opacity-0 group-hover:opacity-100 transition-opacity shadow-[0_0_10px_#00F0FF]"></td>

                                            <td className="px-4 py-2 pl-6">
                                                <StatusBadge status={alert.severity} type="severity" className="scale-75 origin-left" />
                                            </td>
                                            <td className="px-4 py-2 text-xs font-bold text-[#E0F2FE] group-hover:text-[#00F0FF] transition-colors">{alert.type}</td>
                                            <td className="px-4 py-2 text-xs font-mono text-[#38BDF8]">{alert.sourceIp}</td>
                                            <td className="px-4 py-2 text-xs font-mono text-[#38BDF8]">{alert.destinationIp}</td>
                                            <td className="px-4 py-2 text-xs font-mono text-gray-500 group-hover:text-gray-400 transition-colors">{new Date(alert.timestamp).toLocaleString()}</td>
                                            <td className="px-4 py-2">
                                                <StatusBadge status={alert.status} type="status" className="scale-75 origin-left" />
                                            </td>
                                            <td className="px-4 py-2 text-right">
                                                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    {alert.status === 'Active' && (
                                                        <>
                                                            <button 
                                                                onClick={() => updateAlertStatus(alert.id, 'Investigating')}
                                                                className="p-1.5 text-[#00F0FF] hover:bg-[#00F0FF]/20 rounded transition-colors cyber-glow"
                                                                title="Investigate"
                                                            >
                                                                <Search size={16} />
                                                            </button>
                                                            <button 
                                                                onClick={() => updateAlertStatus(alert.id, 'Resolved')}
                                                                className="p-1.5 text-[#39FF14] hover:bg-[#39FF14]/20 rounded transition-colors shadow-[0_0_10px_rgba(57,255,20,0.5)]"
                                                                title="Resolve"
                                                            >
                                                                <CheckCircle size={16} />
                                                            </button>
                                                            <button 
                                                                onClick={() => updateAlertStatus(alert.id, 'Ignored')}
                                                                className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded transition-colors"
                                                                title="Ignore"
                                                            >
                                                                <XCircle size={16} />
                                                            </button>
                                                        </>
                                                    )}
                                                    {alert.status === 'Investigating' && (
                                                         <button 
                                                         onClick={() => updateAlertStatus(alert.id, 'Resolved')}
                                                         className="p-1.5 text-[#39FF14] hover:bg-[#39FF14]/20 rounded transition-colors shadow-[0_0_10px_rgba(57,255,20,0.5)] flex items-center gap-1 text-xs font-bold uppercase tracking-wider"
                                                         title="Resolve"
                                                     >
                                                         <CheckCircle size={14} /> Resolve
                                                     </button>
                                                    )}
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </AnimatePresence>
                                {filteredAlerts.length === 0 && (
                                    <tr>
                                        <td colSpan="7" className="p-12 text-center text-gray-500 font-mono text-sm uppercase tracking-widest animate-pulse">
                                            No vectors detected matching search criteria.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </PageTransition>
    );
};

export default AlertsPage;
