import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShieldAlert, 
  Activity, 
  Globe, 
  FileText, 
  UploadCloud, 
  History, 
  Settings, 
  Users,
  Menu,
  X
} from 'lucide-react';
import { cn } from '../../utils/cn';

const NavItem = ({ to, icon: Icon, label, isOpen }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      cn(
        "flex items-center gap-4 p-3 rounded-xl transition-all duration-300 group",
        isActive 
          ? "bg-light-surface dark:bg-dark-surface shadow-neu-pressed-light dark:shadow-neu-pressed-dark text-dark-accent" 
          : "hover:bg-light-surface/50 dark:hover:bg-dark-surface/50 hover:shadow-neu-light dark:hover:shadow-neu-dark text-gray-500 dark:text-gray-400"
      )
    }
  >
    <div className="relative">
        <Icon size={22} className="transition-transform group-hover:scale-110 group-active:scale-95" />
        {/* Glow effect on active */}
        <div className="absolute inset-0 bg-dark-accent/20 blur-md rounded-full opacity-0 group-[.active]:opacity-100 transition-opacity" />
    </div>
    <span className={cn("font-medium whitespace-nowrap overflow-hidden transition-all duration-300", isOpen ? "w-auto opacity-100" : "w-0 opacity-0")}>
      {label}
    </span>
  </NavLink>
);

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <aside 
        className={cn(
            "h-screen bg-light-bg dark:bg-dark-bg border-r border-white/10 transition-all duration-500 z-50 flex flex-col shadow-2xl",
            isOpen ? "w-64" : "w-20"
        )}
    >
      <div className="h-16 flex items-center justify-between px-6 border-b border-white/5">
        <div className={cn("flex items-center gap-2 overflow-hidden transition-all", isOpen ? "w-auto opacity-100" : "w-0 opacity-0")}>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-dark-accent to-dark-neon animate-pulse-slow"></div>
            <span className="font-bold text-lg tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-dark-accent to-dark-neon">
                CYBER.INTEL
            </span>
        </div>
        <button onClick={toggleSidebar} className="p-2 rounded-lg hover:bg-white/5 text-gray-500 dark:text-gray-400">
            {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-2 scrollbar-hide">
        <NavItem to="/" icon={LayoutDashboard} label="Dashboard" isOpen={isOpen} />
        <NavItem to="/alerts" icon={ShieldAlert} label="Alerts" isOpen={isOpen} />
        <NavItem to="/analytics" icon={Activity} label="Analytics" isOpen={isOpen} />
        <NavItem to="/threat-map" icon={Globe} label="Threat Map" isOpen={isOpen} />
        <NavItem to="/streaming" icon={FileText} label="Event Stream" isOpen={isOpen} />
        <NavItem to="/upload" icon={UploadCloud} label="PCAP Upload" isOpen={isOpen} />
        <NavItem to="/history" icon={History} label="History" isOpen={isOpen} />
        <NavItem to="/team" icon={Users} label="Team" isOpen={isOpen} />
        <NavItem to="/settings" icon={Settings} label="Settings" isOpen={isOpen} />
      </nav>

      <div className="p-4 border-t border-white/5">
          <div className={cn("flex items-center gap-3 p-3 rounded-xl bg-light-surface dark:bg-dark-surface shadow-neu-light dark:shadow-neu-dark", !isOpen && "justify-center")}>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 border-2 border-dark-accent relative overflow-hidden">
                  <img src="https://ui-avatars.com/api/?name=Admin+User&background=0D8ABC&color=fff" alt="User" />
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-dark-bg"></div>
              </div>
              {isOpen && (
                  <div className="overflow-hidden">
                      <h4 className="text-sm font-bold text-gray-800 dark:text-gray-200">Admin User</h4>
                      <p className="text-xs text-dark-accent">Security Analyst</p>
                  </div>
              )}
          </div>
      </div>
    </aside>
  );
};

export default Sidebar;
