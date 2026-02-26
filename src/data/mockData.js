// src/data/mockData.js

const randomIP = () => Array.from({length: 4}, () => Math.floor(Math.random() * 256)).join('.');
const randomSeverity = () => {
    const r = Math.random();
    if(r > 0.9) return 'Critical';
    if(r > 0.7) return 'High';
    if(r > 0.4) return 'Medium';
    return 'Low';
};

export const initialAlerts = Array.from({ length: 15 }, (_, i) => ({
  id: `ALT-${1000 + i}`,
  timestamp: new Date(Date.now() - Math.random() * 86400000).toISOString(),
  severity: randomSeverity(),
  sourceIp: randomIP(),
  destinationIp: randomIP(),
  type: ['DDoS Attempt', 'SQL Injection', 'Brute Force', 'Malware Signature', 'Anomalous Traffic'][Math.floor(Math.random() * 5)],
  status: Math.random() > 0.5 ? 'Active' : 'Resolved'
}));

export const initialLogs = Array.from({ length: 50 }, (_, i) => ({
  id: `LOG-${10000 + i}`,
  timestamp: new Date(Date.now() - Math.random() * 3600000).toISOString(),
  level: ['INFO', 'WARN', 'ERROR'][Math.floor(Math.random() * 3)],
  message: `Connection established to ${randomIP()}`,
  source: ['Firewall', 'Proxy', 'Auth Server', 'DB'][Math.floor(Math.random() * 4)]
}));

export const initialThreats = [
  { id: 'T-1', origin: [39.9042, 116.4074], destination: [37.7749, -122.4194], type: 'DDoS', intensity: 8 },
  { id: 'T-2', origin: [55.7558, 37.6173], destination: [51.5074, -0.1278], type: 'Brute Force', intensity: 6 },
  { id: 'T-3', origin: [35.6895, 139.6917], destination: [-33.8688, 151.2093], type: 'Malware', intensity: 4 }
];

export const generateRandomAlert = () => ({
  id: `ALT-${1000 + Math.floor(Math.random() * 9000)}`,
  timestamp: new Date().toISOString(),
  severity: randomSeverity(),
  sourceIp: randomIP(),
  destinationIp: randomIP(),
  type: ['Port Scan', 'XSS Attempt', 'Unauthorized Access', 'Data Exfiltration'][Math.floor(Math.random() * 4)],
  status: 'Active'
});

export const teamMembers = [
  {
      name: "Rishi",
      college: "Ajeenkya DY Patil School of Engineering",
      cgpa: "0",
      role: "Lead Developer",
      email: "rishi@example.com",
      linkedin: "https://linkedin.com",
      github: "https://github.com/rishi",
      mobile: "+91 9876543210",
      photo: "https://ui-avatars.com/api/?name=Rishi&background=random"
  },
  {
      name: "Tushar",
      college: "Symbiosis Institute of Technology",
      cgpa: "0",
      role: "Security Analyst",
      email: "tushar@example.com",
      linkedin: "https://linkedin.com",
      github: "https://github.com/tushar",
      mobile: "+91 9876543211",
      photo: "https://ui-avatars.com/api/?name=Tushar&background=random"
  },
  {
    name: "Nishant",
    college: "Pune Institute of Computer Technology",
    cgpa: "0",
    role: "Backend Engineer",
    email: "nishant@example.com",
    linkedin: "https://linkedin.com",
    github: "https://github.com/nishant",
    mobile: "+91 9876543212",
    photo: "https://ui-avatars.com/api/?name=Nishant&background=random"
  },
  {
    name: "Trupti",
    college: "Vishwakarma Institute of Technology",
    cgpa: "0",
    role: "Threat Researcher",
    email: "trupti@example.com",
    linkedin: "https://linkedin.com",
    github: "https://github.com/trupti",
    mobile: "+91 9876543213",
    photo: "https://ui-avatars.com/api/?name=Trupti&background=random"
  }
];
