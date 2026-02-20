import React, { useState } from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import RightPanel from './RightPanel';

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [rightPanelOpen, setRightPanelOpen] = useState(false);

  return (
    <div className="flex h-screen w-full bg-light-bg dark:bg-dark-bg text-gray-900 dark:text-white transition-colors duration-300 overflow-hidden font-sans">
      {/* Background Blobs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
         <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float opacity-30"></div>
         <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-float opacity-30 animation-delay-2000"></div>
      </div>

      <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      <div className="relative flex-1 flex flex-col z-10 h-full overflow-hidden">
        <TopBar toggleRightPanel={() => setRightPanelOpen(!rightPanelOpen)} />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6 scrollbar-hide relative">
            <div className="absolute inset-0 z-[-1] pointer-events-none bg-gradient-to-br from-transparent to-black/5 dark:to-white/5 opacity-50"></div>
            {children}
        </main>
      </div>

      <RightPanel isOpen={rightPanelOpen} onClose={() => setRightPanelOpen(false)} />
    </div>
  );
};

export default Layout;
