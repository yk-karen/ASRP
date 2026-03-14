import React from 'react';
import { 
  IndianRupee, 
  Package, 
  AlertCircle, 
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Box
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  PieChart,
  Pie
} from 'recharts';
import { motion } from 'framer-motion';

const StatCard = ({ title, value, change, isPositive, icon: Icon, color }) => (
  <motion.div 
    whileHover={{ y: -4 }}
    className="card"
  >
    <div className="flex justify-between items-start mb-4">
      <div className={`p-2 rounded-lg bg-${color}-50 dark:bg-${color}-900/20 text-${color}-600`} style={{ backgroundColor: `rgba(var(--${color}-rgb), 0.1)`, color: `var(--${color})` }}>
        <Icon size={24} />
      </div>
      <div className={`flex items-center gap-1 text-xs font-bold ${isPositive ? 'text-emerald-500' : 'text-rose-500'}`}>
        {isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
        {change}%
      </div>
    </div>
    <h3 className="text-muted text-sm font-medium">{title}</h3>
    <p className="text-2xl font-bold mt-1">{value}</p>
  </motion.div>
);

const agingData = [
  { name: '0-30d', value: 45, color: '#10b981' },
  { name: '30-60d', value: 30, color: '#f59e0b' },
  { name: '60-90d', value: 15, color: '#f97316' },
  { name: '90d+', value: 10, color: '#ef4444' },
];

const pricingTrends = [
  { date: 'Mon', revenue: 4200, potential: 3800 },
  { date: 'Tue', revenue: 4800, potential: 4100 },
  { date: 'Wed', revenue: 3900, potential: 4400 },
  { date: 'Thu', revenue: 5200, potential: 4800 },
  { date: 'Fri', revenue: 6100, potential: 5400 },
  { date: 'Sat', revenue: 7500, potential: 6200 },
  { date: 'Sun', revenue: 8200, potential: 6800 },
];

const DashboardHome = ({ products }) => {
  const totalValue = products.reduce((acc, p) => acc + parseFloat(p.price.replace('₹', '')), 0);
  const surplusSold = products.filter(p => p.discount > 0).reduce((acc, p) => acc + (parseFloat(p.price.replace('₹', '')) * (p.discount / 100)), 0);
  const agingItems = products.filter(p => p.age > 30).length;
  const expiringBatches = products.filter(p => {
    if (p.expiry === 'N/A') return false;
    const daysLeft = Math.ceil((new Date(p.expiry) - new Date()) / (1000 * 60 * 60 * 24));
    return daysLeft < 30;
  }).length;

  return (
    <div className="space-y-8 max-w-[1400px] mx-auto">
      <header>
        <h1 className="text-3xl font-bold">Good morning, Store Manager</h1>
        <p className="text-muted mt-1">Here's what's happening with your inventory today.</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Inventory Value" 
          value={`₹${(totalValue / 1000).toFixed(2)}K`} 
          change="2.4" 
          isPositive={true} 
          icon={IndianRupee} 
          color="primary" 
        />
        <StatCard 
          title="Aging Products" 
          value={`${agingItems} Items`} 
          change="8.1" 
          isPositive={false} 
          icon={Box} 
          color="secondary" 
        />
        <StatCard 
          title="Expiring Soon" 
          value={`${expiringBatches} Batches`} 
          change="12.5" 
          isPositive={false} 
          icon={AlertCircle} 
          color="accent" 
        />
        <StatCard 
          title="Surplus Sold" 
          value={`₹${surplusSold.toLocaleString()}`} 
          change="15.8" 
          isPositive={true} 
          icon={TrendingUp} 
          color="emerald" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <div className="lg:col-span-2 card">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-lg font-bold">Inventory Pricing Trends</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Revenue captured vs potential loss</p>
            </div>
            <select className="bg-slate-100 dark:bg-slate-800 border-none rounded-lg text-xs font-semibold p-2 outline-none">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={pricingTrends}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148, 163, 184, 0.2)" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)', borderRadius: '12px', boxShadow: 'var(--shadow-lg)' }}
                  itemStyle={{ fontSize: '12px', color: 'var(--text-main)' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="var(--primary)" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                <Area type="monotone" dataKey="potential" stroke="var(--secondary)" strokeWidth={2} strokeDasharray="5 5" fill="transparent" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Aging Pie */}
        <div className="card">
          <h3 className="text-lg font-bold mb-8">Inventory Aging Breakdown</h3>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={agingData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {agingData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-8 space-y-4">
            {agingData.map((item) => (
              <div key={item.name} className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-muted">{item.name}</span>
                </div>
                <span className="font-bold">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
