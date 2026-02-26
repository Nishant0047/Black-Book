import React from 'react';
import { cn } from '../../utils/cn';

const StatusBadge = ({ status, type = 'status', className }) => {
  const getSeverityStyle = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'critical': return 'bg-red-100/50 dark:bg-[#FF003C]/20 text-red-600 dark:text-[#FF003C] border-red-400 dark:border-[#FF003C]/50 shadow-sm dark:shadow-[0_0_10px_rgba(255,0,60,0.3)]';
      case 'high': return 'bg-orange-100/50 dark:bg-[#FFEA00]/20 text-orange-600 dark:text-[#FFEA00] border-orange-400 dark:border-[#FFEA00]/50 shadow-sm dark:shadow-[0_0_10px_rgba(255,234,0,0.3)]';
      case 'medium': return 'bg-blue-100/50 dark:bg-[#00F0FF]/20 text-blue-600 dark:text-[#00F0FF] border-blue-400 dark:border-[#00F0FF]/50 shadow-sm dark:shadow-[0_0_10px_rgba(0,240,255,0.3)]';
      case 'low': return 'bg-gray-100/50 dark:bg-[#38BDF8]/10 text-gray-600 dark:text-[#38BDF8] border-gray-300 dark:border-[#38BDF8]/30';
      default: return 'bg-gray-100/50 dark:bg-gray-500/20 text-gray-500 dark:text-gray-500 border-gray-300 dark:border-gray-500/30';
    }
  };

  const getStatusStyle = (state) => {
    switch (state?.toLowerCase()) {
      case 'active': return 'bg-red-100/50 dark:bg-[#FF003C]/20 text-red-600 dark:text-[#FF003C] border-red-400 dark:border-[#FF003C]/50 shadow-sm dark:shadow-[0_0_10px_rgba(255,0,60,0.3)] animate-pulse';
      case 'resolved': return 'bg-green-100/50 dark:bg-[#39FF14]/20 text-green-600 dark:text-[#39FF14] border-green-400 dark:border-[#39FF14]/50 shadow-sm dark:shadow-[0_0_10px_rgba(57,255,20,0.3)]';
      case 'ignored': return 'bg-gray-100/50 dark:bg-gray-500/20 text-gray-500 dark:text-gray-400 border-gray-300 dark:border-gray-500/30';
      case 'info': return 'bg-blue-100/50 dark:bg-[#00F0FF]/20 text-blue-600 dark:text-[#00F0FF] border-blue-400 dark:border-[#00F0FF]/50 shadow-sm dark:shadow-[0_0_10px_rgba(0,240,255,0.3)]';
      case 'warn': return 'bg-orange-100/50 dark:bg-[#FFEA00]/20 text-orange-600 dark:text-[#FFEA00] border-orange-400 dark:border-[#FFEA00]/50 shadow-sm dark:shadow-[0_0_10px_rgba(255,234,0,0.3)]';
      case 'error': return 'bg-red-100/50 dark:bg-[#FF003C]/20 text-red-600 dark:text-[#FF003C] border-red-400 dark:border-[#FF003C]/50 shadow-sm dark:shadow-[0_0_10px_rgba(255,0,60,0.3)]';
      default: return 'bg-gray-100/50 dark:bg-gray-500/20 text-gray-500 border-gray-300 dark:border-gray-500/30';
    }
  };

  const baseStyle = "px-2.5 py-0.5 rounded text-[10px] font-bold tracking-widest uppercase border uppercase backdrop-blur-sm";
  const customStyle = type === 'severity' ? getSeverityStyle(status) : getStatusStyle(status);

  return (
    <span className={cn(baseStyle, customStyle, className)}>
      {status}
    </span>
  );
};

export default StatusBadge;
