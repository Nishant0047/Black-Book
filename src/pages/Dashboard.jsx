import React from 'react';
import KPICards from '../components/dashboard/KPICards';
import DashboardCharts from '../components/dashboard/DashboardCharts';
import AlertsPanel from '../components/dashboard/AlertsPanel';
import TopIpsPanel from '../components/dashboard/TopIpsPanel';
import SystemHealthPanel from '../components/dashboard/SystemHealthPanel';
import ThreatMap from '../components/dashboard/ThreatMap';
import PageTransition from '../components/ui/PageTransition';
import { motion } from 'framer-motion';

const Dashboard = () => {
  return (
    <PageTransition>
      <div className="space-y-6 pb-10 px-2 lg:px-4">
        {/* 1. Top Metric Strip */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <KPICards />
        </motion.section>

        {/* 2. Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Charts and Map */}
          <div className="lg:col-span-8 space-y-6">
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <DashboardCharts />
            </motion.section>

            <motion.section 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <ThreatMap className="h-[400px] w-full" />
            </motion.section>
          </div>

          {/* Right Column: Feeds and IPs */}
          <div className="lg:col-span-4 space-y-6 flex flex-col">
            <motion.section 
              className="flex-1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
                <div className="h-full">
                  <AlertsPanel />
                </div>
            </motion.section>
            
            <motion.section 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
                <TopIpsPanel />
            </motion.section>
          </div>
        </div>

        {/* 3. Bottom Section: System Health */}
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
        >
            <SystemHealthPanel />
        </motion.section>
      </div>
    </PageTransition>
  );
};

export default Dashboard;
