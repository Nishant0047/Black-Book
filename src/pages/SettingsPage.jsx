import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Moon, Sun, User, Database, ShieldAlert, Monitor, Server, BellRing, Link } from 'lucide-react';
import useAppStore from '../store/useAppStore';
import PageTransition from '../components/ui/PageTransition';

const SectionHeader = ({ icon: Icon, title, description }) => (
    <div className="mb-4 pb-3 border-b border-light-border dark:border-dark-border">
        <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2 mb-1 uppercase tracking-wider">
            <Icon size={16} className="text-blue-500" /> {title}
        </h3>
        <p className="text-[10px] text-gray-500 font-mono tracking-wide">{description}</p>
    </div>
);

const SettingRow = ({ children, title, description, border = true }) => (
    <div className={`flex flex-col sm:flex-row sm:items-center justify-between py-4 gap-4 ${border ? 'border-b border-light-border dark:border-dark-border' : ''}`}>
        <div>
            <h4 className="text-xs font-bold text-gray-700 dark:text-gray-300">{title}</h4>
            <p className="text-[10px] text-gray-500 mt-1">{description}</p>
        </div>
        <div className="flex-shrink-0">
            {children}
        </div>
    </div>
);

const SettingsPage = () => {
    const { theme, toggleTheme, userRole, setUserRole, websocketConnected, setWebsocketConnected, resetMockData } = useAppStore();
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);

    return (
        <PageTransition>
            <div className="space-y-6 pb-10 max-w-4xl">
                 <div>
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                        <Settings size={28} className="text-gray-400"/> System Preferences
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Manage appearance, roles, and simulation data</p>
                </div>

                <div className="space-y-6">
                    
                    {/* Appearance */}
                    <section className="soc-panel p-6">
                        <SectionHeader icon={Monitor} title="Appearance" description="Customize how the dashboard looks and feels." />
                        
                        <SettingRow title="Theme Interface" description="Switch between Light and Dark interface modes.">
                            <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 p-1 rounded border border-light-border dark:border-dark-border">
                                <button 
                                    onClick={() => theme !== 'light' && toggleTheme()}
                                    className={`px-4 py-1.5 rounded text-[10px] font-bold uppercase tracking-wider flex items-center gap-2 transition-colors ${theme === 'light' ? 'bg-white text-gray-800 shadow-sm border border-light-border' : 'text-gray-500 hover:text-gray-700'}`}
                                >
                                    <Sun size={14} /> Light
                                </button>
                                <button 
                                    onClick={() => theme !== 'dark' && toggleTheme()}
                                    className={`px-4 py-1.5 rounded text-[10px] font-bold uppercase tracking-wider flex items-center gap-2 transition-colors ${theme === 'dark' ? 'bg-[#0B1220] text-white border border-dark-border' : 'text-gray-500 hover:text-gray-300'}`}
                                >
                                    <Moon size={14} /> Dark
                                </button>
                            </div>
                        </SettingRow>

                        <SettingRow title="Push Notifications" description="Allow browser notifications for critical alerts." border={false}>
                             <button 
                                onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                                className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors border ${notificationsEnabled ? 'bg-blue-500 border-blue-600' : 'bg-gray-300 dark:bg-gray-700 border-gray-400 dark:border-gray-600'}`}
                             >
                                <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${notificationsEnabled ? 'translate-x-5' : 'translate-x-1'}`}/>
                             </button>
                        </SettingRow>
                    </section>

                    {/* Access Control */}
                    <section className="soc-panel p-6">
                        <SectionHeader icon={User} title="Access Control" description="Simulate different user role perspectives." />
                        
                        <SettingRow title="Active User Role" description="Change role to preview different navigation and permissions." border={false}>
                             <select 
                                value={userRole}
                                onChange={(e) => setUserRole(e.target.value)}
                                className="px-3 py-1.5 bg-gray-50 dark:bg-[#0B1220] border border-light-border dark:border-dark-border rounded text-[10px] uppercase font-bold text-gray-700 dark:text-gray-300 focus:outline-none focus:border-blue-500 transition-colors"
                            >
                                <option value="Admin">Administrator (L4)</option>
                                <option value="Analyst">SOC Analyst (L2)</option>
                                <option value="Viewer">Read-only Viewer</option>
                            </select>
                        </SettingRow>
                    </section>

                    {/* Simulation Controls */}
                    <section className="soc-panel p-6">
                         <SectionHeader icon={Server} title="Simulation Engine" description="Manage the mock data stream and backend connections." />
                         
                         <SettingRow title="WebSocket Connection" description="Toggle the simulated real-time data ingestion pipeline.">
                             <button 
                                onClick={() => setWebsocketConnected(!websocketConnected)}
                                className={`px-4 py-1.5 rounded text-[10px] font-bold uppercase tracking-wider flex items-center gap-2 transition-colors border ${websocketConnected ? 'bg-green-500/10 text-green-500 border-green-500/30 hover:bg-green-500/20' : 'bg-red-500/10 text-red-500 border-red-500/30 hover:bg-red-500/20'}`}
                            >
                                <Link size={14} className={websocketConnected ? 'animate-pulse' : ''}/>
                                {websocketConnected ? 'Disconnect Socket' : 'Connect Socket'}
                            </button>
                         </SettingRow>

                         <SettingRow title="Reset Mock Data" description="Clear all current alerts and logs, restoring the initial dataset." border={false}>
                              <button 
                                onClick={() => {
                                    if(window.confirm('Are you sure you want to reset all simulated data?')) {
                                        resetMockData();
                                    }
                                }}
                                className="px-4 py-1.5 bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400 border border-red-500/20 rounded text-[10px] font-bold uppercase tracking-wider hover:bg-red-100 dark:hover:bg-red-500/20 transition-colors"
                              >
                                  Reset Data State
                              </button>
                         </SettingRow>
                    </section>
                </div>
            </div>
        </PageTransition>
    );
};

export default SettingsPage;
