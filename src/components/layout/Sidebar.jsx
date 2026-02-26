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
        "flex items-center gap-4 p-3 rounded-lg transition-all duration-300 group",
        isActive 
          ? "bg-light-primary/10 dark:bg-dark-primary/10 text-light-primary dark:text-dark-primary border-l-4 border-light-primary dark:border-dark-primary" 
          : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 border-l-4 border-transparent"
      )
    }
  >
    <div className="relative">
        <Icon size={20} className="transition-transform group-hover:scale-110" />
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
            "h-screen bg-light-surface dark:bg-dark-surface border-r border-light-border dark:border-dark-border transition-all duration-500 z-50 flex flex-col",
            isOpen ? "w-64" : "w-16"
        )}
    >
      <div className="h-16 flex items-center justify-between px-4 border-b border-light-border dark:border-dark-border">
        <div className={cn("flex items-center gap-2 overflow-hidden transition-all", isOpen ? "w-auto opacity-100" : "w-0 opacity-0")}>
            <div className="w-8 h-8 flex items-center justify-center font-bold text-white rounded bg-dark-primary">CI</div>
            <span className="font-bold text-lg tracking-wider text-light-textMain dark:text-white">
                CYBER.INTEL
            </span>
        </div>
        <button onClick={toggleSidebar} className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400">
            {isOpen ? <X size={18} /> : <Menu size={18} />}
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

      <div className="p-4 border-t border-light-border dark:border-dark-border">
          <div className={cn("flex items-center gap-3 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer", !isOpen && "justify-center")}>
              <div className="w-8 h-8 rounded overflow-hidden relative border border-gray-300 dark:border-gray-600">
                  <img src="https://ui-avatars.com/api/?name=Admin+User&background=3B82F6&color=fff" alt="User" className="w-full h-full object-cover" />
              </div>
              {isOpen && (
                  <div className="overflow-hidden">
                      <h4 className="text-xs font-bold text-gray-800 dark:text-gray-200">Admin User</h4>
                      <p className="text-[10px] text-gray-500 dark:text-dark-textMuted uppercase tracking-wider">Security Analyst</p>
                  </div>
              )}
          </div>
      </div>
    </aside>
  );
};

export default Sidebar;
