import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import useAppStore from './store/useAppStore';
import { useWebsocketSimulator } from './hooks/useWebsocketSimulator';
import Layout from './components/layout/Layout';

// Pages
import Dashboard from './pages/Dashboard';
import HistoryPage from './pages/HistoryPage';
import TeamPage from './pages/TeamPage';
import AlertsPage from './pages/AlertsPage';
import AnalyticsPage from './pages/AnalyticsPage';
import ThreatMapPage from './pages/ThreatMapPage';
import EventStreamPage from './pages/EventStreamPage';
import PcapUploadPage from './pages/PcapUploadPage';
import SettingsPage from './pages/SettingsPage';

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/alerts" element={<AlertsPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/threat-map" element={<ThreatMapPage />} />
        <Route path="/streaming" element={<EventStreamPage />} />
        <Route path="/upload" element={<PcapUploadPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="*" element={<div className="p-10 text-center text-gray-500">Page under construction</div>} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  const { theme } = useAppStore();
  
  // Start simulating WebSocket data
  useWebsocketSimulator();

  // Apply Tailwind dark mode class to HTML root
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <Router>
      <Layout>
        <AnimatedRoutes />
      </Layout>
    </Router>
  );
}

export default App;
