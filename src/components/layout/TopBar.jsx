import React from 'react';
import { Search, Bell, Calendar, Grip } from 'lucide-react';
import useAppStore from '../../store/useAppStore';
import { cn } from '../../utils/cn';

const TopBar = ({ toggleRightPanel }) => {
  const { theme, toggleTheme, websocketConnected, alerts } = useAppStore();
  
  // Count unread critical alerts for the bell notification
  const unreadCriticalCount = alerts.filter(a => a.severity === 'Critical' && a.status === 'Active').length;

  return (
    <header className="h-16 flex items-center justify-between px-6 bg-white dark:bg-[#030712] border-b border-gray-200 dark:border-[rgba(0,240,255,0.2)] z-40 relative transition-colors duration-300">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-10 dark:opacity-20 pointer-events-none" 
          style={{ 
              backgroundImage: 'linear-gradient(rgba(59, 130, 246, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.2) 1px, transparent 1px)', 
              backgroundSize: '20px 20px' 
          }}>
      </div>
      <div className="absolute bottom-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-400 dark:via-[#00F0FF]/50 to-transparent"></div>

      {/* Search */}
      <div className="flex-1 max-w-xl relative z-10">
        <div className="relative group w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500 dark:text-[#00F0FF] group-focus-within:animate-pulse transition-colors" size={16} />
            <input 
                type="text" 
                placeholder="Search IPs, Domains, Hash..." 
                className="w-full bg-gray-50 dark:bg-[#0B1220] border border-gray-300 dark:border-[rgba(0,240,255,0.3)] rounded py-1.5 pl-9 pr-4 text-sm focus:outline-none focus:border-blue-500 dark:focus:border-[#00F0FF] focus:shadow-[0_0_10px_rgba(59,130,246,0.2)] dark:focus:shadow-[0_0_10px_rgba(0,240,255,0.3)] transition-all text-gray-800 dark:text-[#E0F2FE] placeholder-gray-400 dark:placeholder-[#38BDF8]"
            />
            {/* Corner Bracket Decorations */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-blue-400 dark:border-[#00F0FF]/50 pointer-events-none rounded-tl"></div>
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-blue-400 dark:border-[#00F0FF]/50 pointer-events-none rounded-br"></div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4 relative z-10">
        {/* Real-time Status */}
        <div className={cn("hidden md:flex items-center gap-2 px-3 py-1 rounded border transition-all", 
          websocketConnected ? "bg-green-100/50 dark:bg-[#39FF14]/10 border-green-300 dark:border-[#39FF14]/30 shadow-sm dark:shadow-[0_0_10px_rgba(57,255,20,0.1)]" : "bg-red-100/50 dark:bg-[#FF003C]/10 border-red-300 dark:border-[#FF003C]/30 shadow-sm dark:shadow-[0_0_10px_rgba(255,0,60,0.1)]"
        )}>
            <div className={cn("w-2 h-2 rounded-full", websocketConnected ? "bg-green-500 dark:bg-[#39FF14] animate-pulse shadow-[0_0_5px_#10B981] dark:shadow-[0_0_5px_#39FF14]" : "bg-red-500 dark:bg-[#FF003C] shadow-[0_0_5px_#EF4444] dark:shadow-[0_0_5px_#FF003C]")}></div>
            <span className={cn("text-[10px] font-bold tracking-widest uppercase", websocketConnected ? "text-green-700 dark:text-[#39FF14]" : "text-red-700 dark:text-[#FF003C]")}>
              {websocketConnected ? 'SYSTEM ONLINE' : 'DISCONNECTED'}
            </span>
        </div>

        {/* Theme Toggle */}
        <button 
            onClick={toggleTheme}
            className="p-1.5 rounded text-blue-600 dark:text-[#00F0FF] hover:bg-blue-50 dark:hover:bg-[#00F0FF]/10 hover:shadow-[0_0_10px_rgba(59,130,246,0.2)] dark:hover:shadow-[0_0_10px_rgba(0,240,255,0.2)] transition-all border border-transparent hover:border-blue-300 dark:hover:border-[#00F0FF]/30"
            title="Toggle Theme"
        >
            {theme === 'dark' ? <span className="text-[10px] font-bold tracking-widest">LIGHT</span> : <span className="text-[10px] font-bold tracking-widest text-[#0B1220]">DARK</span>}
        </button>

        {/* Notifications */}
        <button className="relative p-1.5 rounded text-gray-600 dark:text-[#E0F2FE] hover:text-blue-600 dark:hover:text-[#00F0FF] hover:bg-blue-50 dark:hover:bg-[#00F0FF]/10 hover:shadow-[0_0_10px_rgba(59,130,246,0.2)] dark:hover:shadow-[0_0_10px_rgba(0,240,255,0.2)] transition-all border border-transparent hover:border-blue-300 dark:hover:border-[#00F0FF]/30">
            <Bell size={18} />
            {unreadCriticalCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 dark:bg-[#FF003C] rounded-full shadow-[0_0_8px_#EF4444] dark:shadow-[0_0_8px_#FF003C] animate-pulse"></span>
            )}
        </button>

        <button className="hidden md:block p-1.5 rounded text-gray-600 dark:text-[#E0F2FE] hover:text-blue-600 dark:hover:text-[#00F0FF] hover:bg-blue-50 dark:hover:bg-[#00F0FF]/10 hover:shadow-[0_0_10px_rgba(59,130,246,0.2)] dark:hover:shadow-[0_0_10px_rgba(0,240,255,0.2)] transition-all border border-transparent hover:border-blue-300 dark:hover:border-[#00F0FF]/30">
            <Calendar size={18} />
        </button>
        
        <div className="h-6 w-[1px] bg-gray-200 dark:bg-[#00F0FF]/30 mx-1"></div>

        <button onClick={toggleRightPanel} className="p-1.5 rounded text-gray-600 dark:text-[#E0F2FE] hover:text-blue-600 dark:hover:text-[#00F0FF] hover:bg-blue-50 dark:hover:bg-[#00F0FF]/10 hover:shadow-[0_0_10px_rgba(59,130,246,0.2)] dark:hover:shadow-[0_0_10px_rgba(0,240,255,0.2)] transition-all border border-transparent hover:border-blue-300 dark:hover:border-[#00F0FF]/30 dark:cyber-glow">
            <Grip size={18} />
        </button>
      </div>
    </header>
  );
};

export default TopBar;
