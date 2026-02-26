import { create } from 'zustand';
import { initialAlerts, initialLogs, initialThreats } from '../data/mockData';

const useAppStore = create((set, get) => ({
  // Theming & User
  theme: 'dark',
  userRole: 'Admin', // Admin, Analyst, Viewer
  setTheme: (theme) => set({ theme }),
  setUserRole: (role) => set({ userRole: role }),
  toggleTheme: () => set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),

  // Networking/Backend status
  websocketConnected: false,
  setWebsocketConnected: (status) => set({ websocketConnected: status }),
  
  // Data arrays
  alerts: initialAlerts,
  logs: initialLogs,
  threats: initialThreats,
  
  // PCAP Upload State
  uploadStatus: 'idle', // idle, uploading, parsing, enrichment, done, error
  processingStatus: '',
  setUploadStatus: (status, message = '') => set({ uploadStatus: status, processingStatus: message }),

  // Enterprise SOC Metrics
  systemHealth: {
    mongoDB: 'Online',
    postgres: 'Online',
    redis: 'Online',
    kafka: 'Online',
    workers: { running: 12, idle: 4, offline: 0 }
  },
  threatScore: 24,
  eventStreamActive: true,
  apiRequestRate: 1240, // req/min
  cacheHitRatio: 94.2, // %

  updateSystemMetrics: (metrics) => set((state) => ({ ...state, ...metrics })),
  toggleEventStream: () => set((state) => ({ eventStreamActive: !state.eventStreamActive })),

  // Actions
  addAlert: (alert) => set((state) => ({ alerts: [alert, ...state.alerts] })),
  updateAlertStatus: (id, status) => set((state) => ({
    alerts: state.alerts.map(a => a.id === id ? { ...a, status } : a)
  })),
  addLog: (log) => set((state) => ({ logs: [log, ...state.logs] })),
  
  // Mock Data Reset
  resetMockData: () => set({
    alerts: initialAlerts,
    logs: initialLogs,
    threats: initialThreats,
  })
}));

export default useAppStore;
