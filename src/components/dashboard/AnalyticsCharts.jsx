import React from 'react';
import { 
  LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell 
} from 'recharts';

const data = [
  { name: '00:00', uv: 4000, pv: 2400, amt: 2400 },
  { name: '04:00', uv: 3000, pv: 1398, amt: 2210 },
  { name: '08:00', uv: 2000, pv: 9800, amt: 2290 },
  { name: '12:00', uv: 2780, pv: 3908, amt: 2000 },
  { name: '16:00', uv: 1890, pv: 4800, amt: 2181 },
  { name: '20:00', uv: 2390, pv: 3800, amt: 2500 },
  { name: '23:59', uv: 3490, pv: 4300, amt: 2100 },
];

const pieData = [
  { name: 'Malware', value: 400 },
  { name: 'Phishing', value: 300 },
  { name: 'DDoS', value: 300 },
  { name: 'Injection', value: 200 },
];
const COLORS = ['#ef4444', '#f59e0b', '#3b82f6', '#10b981'];

const ChartCard = ({ title, children }) => (
    <div className="bg-light-surface dark:bg-dark-surface p-4 rounded-xl shadow-neu-light dark:shadow-neu-dark border border-white/5">
        <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-4">{title}</h3>
        <div className="h-64 w-full">
            {children}
        </div>
    </div>
);

const AnalyticsCharts = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ChartCard title="Threat Traffic Trend">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#38bdf8" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" opacity={0.1} />
                    <XAxis dataKey="name" stroke="#888" fontSize={12} />
                    <YAxis stroke="#888" fontSize={12} />
                    <Tooltip 
                        contentStyle={{ backgroundColor: '#1e293b', borderColor: '#333' }}
                        itemStyle={{ color: '#fff' }}
                    />
                    <Area type="monotone" dataKey="uv" stroke="#38bdf8" fillOpacity={1} fill="url(#colorUv)" />
                </AreaChart>
            </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Attack Distribution">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                    >
                        {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip 
                         contentStyle={{ backgroundColor: '#1e293b', borderColor: '#333', borderRadius: '8px' }}
                         itemStyle={{ color: '#fff' }}
                    />
                </PieChart>
            </ResponsiveContainer>
        </ChartCard>
    </div>
  );
};

export default AnalyticsCharts;
