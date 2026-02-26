import React, { useState, useEffect } from 'react';
import { 
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend
} from 'recharts';
import useAppStore from '../../store/useAppStore';

const pieData = [
  { name: 'Malware', value: 45 },
  { name: 'Phishing', value: 30 },
  { name: 'DDoS', value: 35 },
  { name: 'Injection', value: 20 },
  { name: 'Scan', value: 15 },
];
// Deep glowing neon colors
const COLORS = ['#FF003C', '#FFEA00', '#00F0FF', '#39FF14', '#B537F2'];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-panel p-3 border border-white/10 bg-[#0B1221]/90 shadow-2xl backdrop-blur-xl">
        <p className="text-xs text-slate-400 mb-1 font-mono">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm font-bold flex items-center gap-2" style={{ color: entry.color || entry.payload.fill }}>
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color || entry.payload.fill, boxShadow: `0 0 8px ${entry.color || entry.payload.fill}` }}></span>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const ChartPanel = ({ title, children, className = "" }) => (
    <div className={`glass-panel p-5 flex flex-col relative group ${className}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
        <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2 z-10">
          <div className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-pulse" style={{ boxShadow: '0 0 8px #00F0FF' }}></div>
          {title}
        </h3>
        <div className="flex-1 w-full min-h-[240px] z-10">
            {children}
        </div>
    </div>
);

const DashboardCharts = () => {
  const { websocketConnected, threatScore, apiRequestRate } = useAppStore();
  
  const [lineData, setLineData] = useState(Array.from({ length: 20 }, (_, i) => ({
    name: new Date(Date.now() - (20 - i) * 3000).toLocaleTimeString([], {minute:'2-digit', second:'2-digit'}),
    score: Math.floor(Math.random() * 40) + 10,
    baseline: 20
  })));

  const [barData, setBarData] = useState(Array.from({ length: 15 }, (_, i) => ({
    name: new Date(Date.now() - (15 - i) * 3000).toLocaleTimeString([], {minute:'2-digit', second:'2-digit'}),
    volume: Math.floor(Math.random() * 1500) + 500,
  })));

  useEffect(() => {
    if (!websocketConnected) return;

    const interval = setInterval(() => {
      const timeStr = new Date().toLocaleTimeString([], {minute:'2-digit', second:'2-digit'});
      
      setLineData(prev => {
        const newData = [...prev.slice(1)];
        newData.push({ name: timeStr, score: useAppStore.getState().threatScore, baseline: 20 });
        return newData;
      });

      setBarData(prev => {
        const newData = [...prev.slice(1)];
        newData.push({ name: timeStr, volume: useAppStore.getState().apiRequestRate });
        return newData;
      });

    }, 3000);

    return () => clearInterval(interval);
  }, [websocketConnected]);

  return (
    <div className="flex flex-col gap-6 h-full">
        {/* Top Full Width Line Chart */}
        <ChartPanel title="Global Risk Pipeline (Live)" className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={lineData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#00F0FF" stopOpacity={0.6}/>
                            <stop offset="95%" stopColor="#00F0FF" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorBaseline" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#B537F2" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#B537F2" stopOpacity={0}/>
                        </linearGradient>
                        <filter id="glow">
                           <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                           <feMerge>
                              <feMergeNode in="coloredBlur"/>
                              <feMergeNode in="SourceGraphic"/>
                           </feMerge>
                        </filter>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                    <XAxis dataKey="name" stroke="#64748B" fontSize={10} tickLine={false} axisLine={false} dy={10} />
                    <YAxis stroke="#64748B" fontSize={10} tickLine={false} axisLine={false} dx={-10} domain={[0, 100]} />
                    <Tooltip content={<CustomTooltip />} />
                    
                    <Area type="monotone" dataKey="baseline" stroke="#B537F2" strokeWidth={1} fillOpacity={1} fill="url(#colorBaseline)" isAnimationActive={false} strokeDasharray="4 4" />
                    <Area type="monotone" dataKey="score" stroke="#00F0FF" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" isAnimationActive={false} style={{ filter: 'url(#glow)' }} />
                </AreaChart>
            </ResponsiveContainer>
        </ChartPanel>

        {/* Bottom Split: Bar Chart & Pie Chart */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
            <ChartPanel title="Network Throughput">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={barData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#39FF14" stopOpacity={0.9}/>
                              <stop offset="100%" stopColor="#39FF14" stopOpacity={0.2}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                        <XAxis dataKey="name" stroke="#64748B" fontSize={10} tickLine={false} axisLine={false} dy={10} />
                        <YAxis stroke="#64748B" fontSize={10} tickLine={false} axisLine={false} dx={-10} />
                        <Tooltip content={<CustomTooltip />} cursor={{fill: '#1E293B'}} />
                        <Bar dataKey="volume" fill="url(#colorVolume)" radius={[4, 4, 0, 0]} isAnimationActive={false}>
                           {barData.map((entry, index) => (
                             <Cell key={`cell-${index}`} fill={'url(#colorVolume)'} />
                           ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </ChartPanel>

            <ChartPanel title="Threat Vectors">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={pieData}
                            cx="50%"
                            cy="50%"
                            innerRadius="65%"
                            outerRadius="85%"
                            paddingAngle={4}
                            dataKey="value"
                            stroke="none"
                        >
                            {pieData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} style={{ filter: 'drop-shadow(0px 0px 6px rgba(255,255,255,0.2))' }} />
                            ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                        <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '11px', color: '#94A3B8' }} />
                    </PieChart>
                </ResponsiveContainer>
            </ChartPanel>
        </div>
    </div>
  );
};

export default DashboardCharts;
