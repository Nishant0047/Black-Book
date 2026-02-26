import React from 'react';
import { 
  LineChart, Line, BarChart, Bar, AreaChart, Area, 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import PageTransition from '../components/ui/PageTransition';

// Mock Data
const trafficData = Array.from({ length: 24 }, (_, i) => ({
    time: `${i}:00`,
    inbound: Math.floor(Math.random() * 5000) + 2000,
    outbound: Math.floor(Math.random() * 4000) + 1000,
    blocked: Math.floor(Math.random() * 1000) + 100
}));

const attackTypeData = [
    { name: 'DDoS', count: 4000, amt: 2400 },
    { name: 'SQLi', count: 3000, amt: 2210 },
    { name: 'XSS', count: 2000, amt: 2290 },
    { name: 'Brute Force', count: 2780, amt: 2000 },
    { name: 'Malware', count: 1890, amt: 2181 },
    { name: 'Phishing', count: 2390, amt: 2500 }
];

const riskScoreData = Array.from({ length: 30 }, (_, i) => ({
    day: `Day ${i + 1}`,
    score: Math.max(0, Math.min(100, 50 + Math.sin(i / 3) * 30 + Math.random() * 20))
}));

const ChartWrapper = ({ title, children, fullWidth = false }) => (
    <div className={`soc-panel p-4 flex flex-col ${fullWidth ? 'col-span-full' : ''}`}>
        <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-6">{title}</h3>
        <div className="flex-1 w-full min-h-[280px]">
            {children}
        </div>
    </div>
);

// Custom Heatmap for Threat Activity
const ActivityHeatmap = () => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const hours = Array.from({length: 24}, (_, i) => i);
    
    // Generate random intensity (0-4)
    const data = days.map(() => hours.map(() => Math.floor(Math.random() * 5)));
    
    const getColor = (intensity) => {
        switch(intensity) {
            case 0: return 'bg-gray-100 dark:bg-gray-800/50';
            case 1: return 'bg-blue-900/40';
            case 2: return 'bg-blue-700/60';
            case 3: return 'bg-blue-500/80';
            case 4: return 'bg-blue-400';
            default: return 'bg-gray-800';
        }
    };

    return (
        <div className="flex flex-col h-full w-full overflow-x-auto text-xs">
            <div className="flex mb-1">
                <div className="w-8"></div>
                {hours.map(h => (
                    <div key={h} className="flex-1 text-center text-[9px] text-gray-500">{h}</div>
                ))}
            </div>
            {days.map((day, dIdx) => (
                <div key={day} className="flex items-center mb-1 gap-1">
                    <div className="w-8 text-[10px] text-gray-500 font-medium">{day}</div>
                    {data[dIdx].map((intensity, hIdx) => (
                        <div 
                            key={hIdx} 
                            className={`flex-1 aspect-square rounded-sm ${getColor(intensity)} transition-colors hover:ring-1 hover:ring-white`}
                            title={`${day} ${hIdx}:00 - Activity Level ${intensity}`}
                        ></div>
                    ))}
                </div>
            ))}
            <div className="mt-4 flex items-center justify-end gap-2 text-[10px] text-gray-400">
                <span>Less</span>
                <div className="w-3 h-3 rounded-sm bg-gray-100 dark:bg-gray-800/50"></div>
                <div className="w-3 h-3 rounded-sm bg-blue-900/40"></div>
                <div className="w-3 h-3 rounded-sm bg-blue-700/60"></div>
                <div className="w-3 h-3 rounded-sm bg-blue-500/80"></div>
                <div className="w-3 h-3 rounded-sm bg-blue-400"></div>
                <span>More</span>
            </div>
        </div>
    );
};

const AnalyticsPage = () => {
    return (
        <PageTransition>
            <div className="space-y-6 pb-10">
                 <div>
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Security Analytics</h1>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Long-term trend analysis and threat intelligence</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    
                    {/* Traffic Overview */}
                    <ChartWrapper title="24h Traffic Overview" fullWidth>
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={trafficData}>
                                <defs>
                                    <linearGradient id="colorInbound" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                                    </linearGradient>
                                    <linearGradient id="colorOutbound" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                                    </linearGradient>
                                    <linearGradient id="colorBlocked" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                                <XAxis dataKey="time" stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip 
                                    contentStyle={{ backgroundColor: '#111827', borderColor: '#1F2937', borderRadius: '4px' }}
                                    itemStyle={{ color: '#E5E7EB' }}
                                />
                                <Legend />
                                <Area type="monotone" dataKey="inbound" stroke="#3b82f6" fillOpacity={1} fill="url(#colorInbound)" />
                                <Area type="monotone" dataKey="outbound" stroke="#10b981" fillOpacity={1} fill="url(#colorOutbound)" />
                                <Area type="monotone" dataKey="blocked" stroke="#ef4444" fillOpacity={1} fill="url(#colorBlocked)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </ChartWrapper>

                    {/* Attack Types Distribution */}
                    <ChartWrapper title="Detected Attack Types">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={attackTypeData} layout="vertical">
                                <CartesianGrid strokeDasharray="3 3" stroke="#374151" horizontal={false} />
                                <XAxis type="number" stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis dataKey="name" type="category" width={80} stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip 
                                    cursor={{fill: '#1F2937'}}
                                    contentStyle={{ backgroundColor: '#111827', borderColor: '#1F2937', borderRadius: '4px' }}
                                />
                                <Bar dataKey="count" fill="#8B5CF6" radius={[0, 2, 2, 0]} barSize={20} />
                            </BarChart>
                        </ResponsiveContainer>
                    </ChartWrapper>

                    {/* 30 Day Risk Score */}
                    <ChartWrapper title="30-Day Risk Score Trend">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={riskScoreData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                                <XAxis dataKey="day" stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} tick={{fontSize: 10}} interval={4} />
                                <YAxis domain={[0, 100]} stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip 
                                    contentStyle={{ backgroundColor: '#111827', borderColor: '#1F2937', borderRadius: '4px' }}
                                />
                                <Line type="monotone" dataKey="score" stroke="#F59E0B" strokeWidth={2} dot={false} activeDot={{ r: 4, fill: '#111827', stroke: '#F59E0B' }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </ChartWrapper>

                    {/* Threat Activity Heatmap */}
                    <ChartWrapper title="Threat Activity Heatmap (7 Days)">
                        <ActivityHeatmap />
                    </ChartWrapper>
                </div>
            </div>
        </PageTransition>
    );
};

export default AnalyticsPage;
