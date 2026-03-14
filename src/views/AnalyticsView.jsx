import React from 'react';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Download, Filter, TrendingUp, DollarSign, Package, Users } from 'lucide-react';

const data = [
  { name: 'Jan', sales: 4000, surplus: 2400 },
  { name: 'Feb', sales: 3000, surplus: 1398 },
  { name: 'Mar', sales: 2000, surplus: 9800 },
  { name: 'Apr', sales: 2780, surplus: 3908 },
  { name: 'May', sales: 1890, surplus: 4800 },
  { name: 'Jun', sales: 2390, surplus: 3800 },
];

const pieData = [
  { name: 'Electronics', value: 400 },
  { name: 'Clothing', value: 300 },
  { name: 'Pharmacy', value: 300 },
  { name: 'Home Decor', value: 200 },
];

const COLORS = ['#1e3a8a', '#14b8a6', '#f59e0b', '#ef4444'];

const AnalyticsView = () => {
  return (
    <div className="space-y-8 max-w-[1400px] mx-auto">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold">Analytics & Insights</h1>
          <p className="text-text-muted mt-1">Detailed performance metrics for your surplus liquidation.</p>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 px-6 py-2.5 bg-bg-card border border-border text-text-main rounded-xl font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
            <Download size={18} />
            Export Report
          </button>
          <button className="btn-primary flex items-center gap-2">
            <Filter size={18} />
            Filter Data
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <DollarSign size={20} />
            </div>
            <h3 className="text-text-muted text-sm font-medium">Total Revenue</h3>
          </div>
          <p className="text-2xl font-bold">₹124,500</p>
          <div className="flex items-center gap-1 text-emerald-500 text-xs font-bold mt-2">
            <TrendingUp size={14} />
            +12.5% from last month
          </div>
        </div>
        <div className="card">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-secondary/10 text-secondary">
              <Package size={20} />
            </div>
            <h3 className="text-text-muted text-sm font-medium">Items Liquidated</h3>
          </div>
          <p className="text-2xl font-bold">1,248 Units</p>
          <div className="flex items-center gap-1 text-emerald-500 text-xs font-bold mt-2">
            <TrendingUp size={14} />
            +8.2% from last month
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="card">
          <h3 className="text-lg font-bold mb-8">Revenue vs Surplus Recovery</h3>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148, 163, 184, 0.1)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip />
                <Area type="monotone" dataKey="sales" stroke="#1e3a8a" fill="#1e3a8a20" strokeWidth={3} />
                <Area type="monotone" dataKey="surplus" stroke="#14b8a6" fill="#14b8a620" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-bold mb-8">Surplus by Category</h3>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={110}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6 mt-4">
            {pieData.map((entry, index) => (
              <div key={entry.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                <span className="text-xs text-text-muted">{entry.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsView;
