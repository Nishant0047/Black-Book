import React, { useState, useEffect } from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell 
} from 'recharts';
import useAppStore from '../../store/useAppStore';

const initialData = Array.from({ length: 15 }, (_, i) => ({
  name: new Date(Date.now() - (15 - i) * 5000).toLocaleTimeString([], {minute:'2-digit', second:'2-digit'}),
  uv: Math.floor(Math.random() * 5000) + 1000,
}));

const pieData = [
  { name: 'Malware', value: 450 },
  { name: 'Phishing', value: 300 },
  { name: 'DDoS', value: 350 },
  { name: 'Injection', value: 200 },
  { name: 'Scan', value: 150 },
];
const COLORS = ['#ef4444', '#f59e0b', '#38bdf8', '#10b981', '#8b5cf6'];

const ChartCard = ({ title, children }) => (
    <div className="bg-light-surface dark:bg-dark-surface p-4 rounded-xl shadow-neu-light dark:shadow-neu-dark border border-white/5 h-full flex flex-col">
        <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-4">{title}</h3>
        <div className="flex-1 w-full min-h-[250px]">
            {children}
        </div>
    </div>
);

const AnalyticsCharts = () => {
  const { websocketConnected } = useAppStore();
  const [data, setData] = useState(initialData);

  // Animate the line chart while connected
  useEffect(() => {
    if (!websocketConnected) return;

    const interval = setInterval(() => {
      setData(prev => {
        const newData = [...prev.slice(1)];
        newData.push({
          name: new Date().toLocaleTimeString([], {minute:'2-digit', second:'2-digit'}),
          uv: Math.floor(Math.random() * 5000) + 1000,
        });
        return newData;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [websocketConnected]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
        <ChartCard title="Network Traffic Volume (Live)">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.4}/>
                            <stop offset="95%" stopColor="#38bdf8" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#888" opacity={0.1} vertical={false} />
                    <XAxis dataKey="name" stroke="#888" fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis stroke="#888" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(val) => `${(val/1000).toFixed(1)}k`} />
                    <Tooltip 
                        contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px', backdropFilter: 'blur(8px)' }}
                        itemStyle={{ color: '#fff' }}
                    />
                    <Area type="monotone" dataKey="uv" stroke="#38bdf8" strokeWidth={2} fillOpacity={1} fill="url(#colorUv)" isAnimationActive={false} />
                </AreaChart>
            </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Threat Classification">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius="60%"
                        outerRadius="80%"
                        paddingAngle={4}
                        dataKey="value"
                        stroke="none"
                    >
                        {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip 
                         contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px', backdropFilter: 'blur(8px)' }}
                         itemStyle={{ color: '#fff' }}
                    />
                </PieChart>
            </ResponsiveContainer>
        </ChartCard>
    </div>
  );
};

export default AnalyticsCharts;
