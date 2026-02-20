import React from 'react';
import { Activity, Shield, Zap, Database, Server, Wifi } from 'lucide-react';
import { motion } from 'framer-motion';

const KPI = ({ title, value, unit, icon: Icon, color, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: delay * 0.1 }}
    className="neu-card p-5 flex items-center justify-between relative overflow-hidden group"
  >
    <div className={`absolute top-0 right-0 w-20 h-20 bg-${color}-500/10 rounded-full blur-2xl -mr-10 -mt-10 transition-all group-hover:bg-${color}-500/20`}></div>
    
    <div>
        <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">{title}</h3>
        <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-gray-800 dark:text-white">{value}</span>
            <span className="text-xs text-gray-400">{unit}</span>
        </div>
    </div>
    
    <div className={`p-3 rounded-full bg-${color}-500/10 text-${color}-500 ring-1 ring-${color}-500/20 shadow-[0_0_15px_rgba(0,0,0,0.1)] group-hover:scale-110 transition-transform`}>
        <Icon size={24} />
    </div>
  </motion.div>
);

const KPICards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <KPI title="Total Logs" value="8.4M" unit="" icon={Database} color="blue" delay={1} />
        <KPI title="Threat Score" value="72" unit="/100" icon={Shield} color="red" delay={2} />
        <KPI title="Active Alerts" value="14" unit="" icon={Activity} color="orange" delay={3} />
        <KPI title="Avg Latency" value="24" unit="ms" icon={Zap} color="yellow" delay={4} />
        <KPI title="Processing" value="98" unit="%" icon={Server} color="green" delay={5} />
        <KPI title="API Requests" value="1.2k" unit="/min" icon={Wifi} color="purple" delay={6} />
    </div>
  );
};

export default KPICards;
