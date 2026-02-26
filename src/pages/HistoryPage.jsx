import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown, ChevronUp, Database, FileText } from 'lucide-react';
import useAppStore from '../store/useAppStore';
import PageTransition from '../components/ui/PageTransition';
import { cn } from '../utils/cn';

const LogRow = ({ log }) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <>
            <motion.tr 
                layout
                onClick={() => setExpanded(!expanded)}
                className="soc-table-row cursor-pointer transition-colors group hover:bg-[rgba(0,240,255,0.05)] border-b border-[rgba(0,240,255,0.1)] relative"
            >
                {/* Hover Highlight Line */}
                <td className="absolute left-0 top-0 bottom-0 w-1 bg-[#00F0FF] opacity-0 group-hover:opacity-100 transition-opacity shadow-[0_0_10px_#00F0FF]"></td>

                <td className="px-4 py-2 w-10 pl-6">
                    {expanded ? <ChevronUp size={16} className="text-[#38BDF8]" /> : <ChevronDown size={16} className="text-gray-500 group-hover:text-[#00F0FF]" />}
                </td>
                <td className="px-4 py-2 text-xs font-mono text-gray-500 group-hover:text-gray-400 whitespace-nowrap transition-colors">
                    {new Date(log.timestamp).toLocaleString()}
                </td>
                <td className="px-4 py-2">
                    <span className={cn(
                        "px-2 py-1 text-[10px] font-bold uppercase rounded-md tracking-widest",
                        log.level === 'error' ? "bg-[#FF003C]/10 text-[#FF003C] border border-[#FF003C]/30 shadow-[0_0_10px_rgba(255,0,60,0.2)]" :
                        log.level === 'warn' ? "bg-[#FFEA00]/10 text-[#FFEA00] border border-[#FFEA00]/30 shadow-[0_0_10px_rgba(255,234,0,0.2)]" :
                        "bg-[#00F0FF]/10 text-[#00F0FF] border border-[#00F0FF]/30 shadow-[0_0_10px_rgba(0,240,255,0.2)]"
                    )}>
                        {log.level}
                    </span>
                </td>
                <td className="px-4 py-2 text-xs font-mono font-bold text-[#E0F2FE] group-hover:text-[#00F0FF] transition-colors">
                    {log.source}
                </td>
                <td className="px-4 py-2 text-xs text-[#38BDF8] truncate max-w-[200px] md:max-w-[400px]">
                    {log.message}
                </td>
            </motion.tr>
            
            {/* Expanded Payload View */}
            <AnimatePresence>
                {expanded && (
                    <motion.tr
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                    >
                        <td colSpan="5" className="p-0 border-b border-[rgba(0,240,255,0.3)] bg-[rgba(0,240,255,0.02)]">
                            <div className="p-4 text-sm flex gap-4 relative overflow-hidden">
                                {/* Diagonal scanning line inside payload */}
                                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[#00F0FF]/5 to-transparent animate-[matrix-scroll_20s_linear_infinite] pointer-events-none"></div>
                                
                                <div className="flex-1 bg-[#111827] p-4 rounded border border-[rgba(0,240,255,0.2)] font-mono text-[10px] overflow-x-auto text-[#00F0FF] relative z-10 shadow-[inset_0_0_20px_rgba(0,240,255,0.05)]">
                                    <div className="text-[#38BDF8] mb-2 flex items-center gap-2"><FileText size={14} className="animate-pulse" /> RAW SECURE PAYLOAD</div>
                                    <pre className="opacity-90">{JSON.stringify(log.payload, null, 2)}</pre>
                                </div>
                                <div className="w-1/3 space-y-4 relative z-10">
                                     <div>
                                         <h4 className="text-[10px] font-bold text-gray-500 uppercase mb-1 tracking-widest">Log Trace ID</h4>
                                         <div className="font-mono text-[#E0F2FE] bg-[#030712] p-1.5 rounded border border-[#1F2937] text-xs">{log.id}</div>
                                     </div>
                                     <div>
                                         <h4 className="text-[10px] font-bold text-gray-500 uppercase mb-1 tracking-widest">Ingest Node</h4>
                                         <div className="flex items-center gap-2 text-[#E0F2FE]"><Database size={14} className="text-[#00F0FF] animate-pulse"/> Node-Alpha-01</div>
                                     </div>
                                     <div>
                                        <button className="text-[#00F0FF] hover:text-[#E0F2FE] hover:bg-[#00F0FF]/20 px-3 py-1.5 rounded border border-[#00F0FF]/50 text-xs font-bold uppercase tracking-widest transition-all shadow-[0_0_10px_rgba(0,240,255,0.2)]">Export Log Data</button>
                                     </div>
                                </div>
                            </div>
                        </td>
                    </motion.tr>
                )}
            </AnimatePresence>
        </>
    );
}

const HistoryPage = () => {
    const { logs } = useAppStore();
    const [searchTerm, setSearchTerm] = useState('');
    const [levelFilter, setLevelFilter] = useState('All');

    const filteredLogs = logs.filter(log => {
        const matchesSearch = log.message.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              log.source.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesLevel = levelFilter === 'All' || log.level === levelFilter;
        return matchesSearch && matchesLevel;
    });

    return (
        <PageTransition>
            <div className="space-y-6 pb-10 h-full flex flex-col">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">System History</h1>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">Raw event logs and payload inspection</p>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-3">
                        <div className="relative group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#00F0FF] group-focus-within:animate-pulse" size={16} />
                            <input 
                                type="text" 
                                placeholder="Search logs..." 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-9 pr-4 py-2 w-64 bg-[#030712] border border-[rgba(0,240,255,0.3)] rounded text-sm text-[#E0F2FE] placeholder-[#38BDF8] focus:outline-none focus:border-[#00F0FF] focus:shadow-[0_0_10px_rgba(0,240,255,0.5)] transition-all duration-300"
                            />
                        </div>
                        
                        <select 
                            value={levelFilter}
                            onChange={(e) => setLevelFilter(e.target.value)}
                            className="px-4 py-2 bg-[#030712] border border-[rgba(0,240,255,0.3)] rounded text-sm text-[#00F0FF] focus:outline-none focus:border-[#00F0FF] focus:shadow-[0_0_10px_rgba(0,240,255,0.5)] transition-all duration-300 appearance-none cursor-pointer"
                        >
                            <option value="All">All Levels</option>
                            <option value="info">Info</option>
                            <option value="warn">Warning</option>
                            <option value="error">Error</option>
                        </select>
                    </div>
                </div>

                <div className="flex-1 soc-panel cyber-panel rounded border border-[rgba(0,240,255,0.3)] overflow-hidden flex flex-col min-h-[500px] mt-4 relative">
                    {/* Scan line overlay */}
                    <div className="scan-overlay opacity-20 hidden md:block"></div>

                    <div className="overflow-x-auto flex-1 h-[600px] overflow-y-auto relative z-10">
                        <table className="w-full text-left border-collapse">
                            <thead className="sticky top-0 bg-[#0B1220] z-20 shadow-md">
                                <tr>
                                    <th className="soc-table-header bg-[rgba(0,240,255,0.05)] border-b border-[rgba(0,240,255,0.3)] w-10"></th>
                                    <th className="soc-table-header bg-[rgba(0,240,255,0.05)] border-b border-[rgba(0,240,255,0.3)] text-[#00F0FF]">Timestamp</th>
                                    <th className="soc-table-header bg-[rgba(0,240,255,0.05)] border-b border-[rgba(0,240,255,0.3)] text-[#00F0FF]">Level</th>
                                    <th className="soc-table-header bg-[rgba(0,240,255,0.05)] border-b border-[rgba(0,240,255,0.3)] text-[#00F0FF]">Source</th>
                                    <th className="soc-table-header bg-[rgba(0,240,255,0.05)] border-b border-[rgba(0,240,255,0.3)] text-[#00F0FF]">Message</th>
                                </tr>
                            </thead>
                            <tbody>
                                <AnimatePresence>
                                    {filteredLogs.map(log => (
                                        <LogRow key={log.id} log={log} />
                                    ))}
                                    {filteredLogs.length === 0 && (
                                        <tr>
                                            <td colSpan="5" className="p-12 text-center text-gray-500 font-mono text-sm uppercase tracking-widest animate-pulse">
                                                No logs found. Awaiting telemetry...
                                            </td>
                                        </tr>
                                    )}
                                </AnimatePresence>
                            </tbody>
                        </table>
                    </div>
                    
                    <div className="p-3 border-t border-[rgba(0,240,255,0.3)] bg-[rgba(17,24,39,0.8)] flex items-center justify-between text-xs text-[#38BDF8] font-bold tracking-widest relative z-10">
                        <span>Showing {filteredLogs.length} of {logs.length} logs</span>
                        <div className="flex gap-2">
                             <button className="px-3 py-1 rounded border border-[#1F2937] text-gray-600 cursor-not-allowed" disabled>PREV</button>
                             <button className="px-3 py-1 bg-[rgba(0,240,255,0.1)] text-[#00F0FF] border border-[#00F0FF]/50 rounded hover:bg-[#00F0FF]/25 transition-all shadow-[0_0_10px_rgba(0,240,255,0.2)] font-bold uppercase tracking-wider">NEXT</button>
                        </div>
                    </div>
                </div>
            </div>
        </PageTransition>
    );
};

export default HistoryPage;
