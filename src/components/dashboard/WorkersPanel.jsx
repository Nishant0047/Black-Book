import React from 'react';
import { Cpu, Database, Server, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const WorkerStatus = ({ id, status, load, task }) => (
    <motion.div 
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center justify-between p-3 bg-white/50 dark:bg-black/10 shadow-sm border border-black/5 dark:border-white/5 rounded-lg mb-2"
    >
        <div className="flex items-center gap-3">
            <div className={`w-2 h-2 rounded-full ${status === 'running' ? 'bg-green-500 animate-pulse' : 'bg-gray-500'}`}></div>
            <div>
                <div className="text-sm font-bold text-gray-700 dark:text-gray-200">Worker-{id}</div>
                <div className="text-xs text-gray-500">{task}</div>
            </div>
        </div>
        <div className="text-right">
             <div className="text-xs font-mono text-blue-500 dark:text-blue-400">{load}% CPU</div>
             <div className="w-16 h-1 bg-gray-200 dark:bg-gray-700 rounded-full mt-1 overflow-hidden">
                 <div className="h-full bg-blue-500" style={{ width: `${load}%` }}></div>
             </div>
        </div>
    </motion.div>
);

const DBStatus = ({ name, status, latency }) => (
    <motion.div 
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center justify-between p-3 bg-white/50 dark:bg-transparent border border-black/5 dark:border-white/5 shadow-sm dark:shadow-none rounded-lg mb-2"
    >
        <div className="flex items-center gap-2">
            <Database size={16} className="text-purple-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{name}</span>
        </div>
        <div className="flex items-center gap-2">
            <span className={`text-[10px] px-2 py-0.5 rounded-full ${status === 'Healthy' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'}`}>
                {status}
            </span>
            <span className="text-xs font-mono text-gray-500">{latency}ms</span>
        </div>
    </motion.div>
);

const WorkersPanel = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
        {/* Processing Workers */}
        <div className="bg-light-surface dark:bg-dark-surface p-5 rounded-2xl shadow-neu-light dark:shadow-neu-dark border border-white/5">
             <h3 className="text-md font-bold text-gray-700 dark:text-gray-200 mb-4 flex items-center gap-2">
                <Cpu size={18} className="text-blue-500" />
                Processing Nodes
            </h3>
            <div className="space-y-1">
                <WorkerStatus id="01" status="running" load={78} task="Log Parsing" />
                <WorkerStatus id="02" status="running" load={45} task="Threat Enrich" />
                <WorkerStatus id="03" status="idle" load={12} task="Idle" />
            </div>
        </div>

        {/* Database & Cache */}
        <div className="bg-light-surface dark:bg-dark-surface p-5 rounded-2xl shadow-neu-light dark:shadow-neu-dark border border-white/5">
             <h3 className="text-md font-bold text-gray-700 dark:text-gray-200 mb-4 flex items-center gap-2">
                <Server size={18} className="text-purple-500" />
                Data Stores
            </h3>
            <div className="space-y-1">
                <DBStatus name="MongoDB (Logs)" status="Healthy" latency={24} />
                <DBStatus name="Postgres (Users)" status="Healthy" latency={12} />
                <DBStatus name="Elastic (Search)" status="Degraded" latency={140} />
                <DBStatus name="Redis (Cache)" status="Healthy" latency={2} />
            </div>
        </div>
    </div>
  );
};

export default WorkersPanel;
