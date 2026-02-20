import React from 'react';
import { Search, Bell, Calendar, Grip } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { cn } from '../../utils/cn';

const TopBar = ({ toggleRightPanel }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="h-16 flex items-center justify-between px-6 bg-light-bg/80 dark:bg-dark-bg/80 backdrop-blur-md border-b border-white/5 z-40">
      {/* Search */}
      <div className="flex-1 max-w-xl">
        <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-dark-accent transition-colors" size={18} />
            <input 
                type="text" 
                placeholder="Search IPs, Domains, Hash..." 
                className="w-full bg-light-surface dark:bg-dark-surface shadow-neu-pressed-light dark:shadow-neu-pressed-dark rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-dark-accent/50 transition-all text-gray-700 dark:text-gray-200"
            />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        {/* Real-time Status */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-xs font-semibold text-green-500">SYSTEM ONLINE</span>
        </div>

        {/* Theme Toggle */}
        <button 
            onClick={toggleTheme}
            className="p-2 rounded-full transition-all duration-300 hover:bg-gray-100 dark:hover:bg-white/5 active:scale-95 relative overflow-hidden"
        >
            <div className={cn("transition-transform duration-500", theme === 'dark' ? "rotate-0" : "rotate-90")}>
                {theme === 'dark' ? '🌙' : '☀️'}
            </div>
        </button>

        {/* Notifications */}
        <button className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/5 transition-colors">
            <Bell size={20} className="text-gray-600 dark:text-gray-300" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        <button className="hidden md:block p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/5 transition-colors">
            <Calendar size={20} className="text-gray-600 dark:text-gray-300" />
        </button>
        
        <div className="h-8 w-[1px] bg-gray-300 dark:bg-white/10 mx-1"></div>

        <button onClick={toggleRightPanel} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 transition-colors">
            <Grip size={22} className="text-gray-600 dark:text-gray-300" />
        </button>
      </div>
    </header>
  );
};

export default TopBar;
