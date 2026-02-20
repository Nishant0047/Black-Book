import React from 'react';
import KPICards from '../components/dashboard/KPICards';
import ThreatMap from '../components/dashboard/ThreatMap';
import AlertsPanel from '../components/dashboard/AlertsPanel';
import AnalyticsCharts from '../components/dashboard/AnalyticsCharts';
import EventStreamVisualizer from '../components/dashboard/EventStreamVisualizer';
import PCAPUpload from '../components/dashboard/PCAPUpload';
import WorkersPanel from '../components/dashboard/WorkersPanel';

const Dashboard = () => {
  return (
    <div className="space-y-6 pb-10">
      {/* 1. KPI Cards Row */}
      <section>
        <KPICards />
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 2. Main Content - Threat Map & Charts (Spans 2 cols) */}
        <section className="lg:col-span-2 space-y-6">
           <ThreatMap />
           <AnalyticsCharts />
           <EventStreamVisualizer />
        </section>

        {/* 3. Right Side - Alerts & Operations */}
        <section className="lg:col-span-1 space-y-6">
           <AlertsPanel />
           <WorkersPanel />
           <PCAPUpload />
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
