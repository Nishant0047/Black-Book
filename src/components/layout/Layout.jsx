import React, { useState } from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import RightPanel from './RightPanel';

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [rightPanelOpen, setRightPanelOpen] = useState(false);

  return (
    <div className="flex h-screen w-full bg-light-bg dark:bg-dark-bg text-gray-900 dark:text-white transition-colors duration-300 overflow-hidden font-sans">
      {/* Background Blobs Removed for Enterprise UI */}

      <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      <div className="relative flex-1 flex flex-col z-10 h-full overflow-hidden">
        <TopBar toggleRightPanel={() => setRightPanelOpen(!rightPanelOpen)} />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6 scrollbar-hide relative">
            <div className="absolute inset-0 z-[-1] pointer-events-none"></div>
            {children}
        </main>
      </div>

      <RightPanel isOpen={rightPanelOpen} onClose={() => setRightPanelOpen(false)} />
    </div>
  );
};

export default Layout;
