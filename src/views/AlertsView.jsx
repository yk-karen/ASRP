import React from 'react';
import { AlertTriangle, Clock, Calendar, ArrowRight, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';

const AlertRow = ({ name, category, expiry, daysLeft, risk, onMove }) => (
  <tr className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
    <td className="px-6 py-4">
      <div className="flex items-center gap-3">
        <div className={`w-2 h-2 rounded-full ${risk === 'Critical' ? 'bg-rose-500 animate-pulse' : risk === 'High' ? 'bg-amber-500' : 'bg-blue-500'}`} />
        <div>
          <p className="font-semibold text-sm">{name}</p>
          <p className="text-[10px] text-text-muted">{category}</p>
        </div>
      </div>
    </td>
    <td className="px-6 py-4 text-sm text-text-muted">{expiry}</td>
    <td className="px-6 py-4">
      <div className="flex items-center gap-2">
        <Clock size={14} className={daysLeft < 30 ? 'text-rose-500' : 'text-text-muted'} />
        <span className={`text-sm font-bold ${daysLeft < 30 ? 'text-rose-500' : 'text-text-main'}`}>{daysLeft} days</span>
      </div>
    </td>
    <td className="px-6 py-4">
      <span className={`px-2 py-1 rounded-md text-[10px] font-bold ${
        risk === 'Critical' ? 'bg-rose-100 text-rose-700 dark:bg-rose-900/30' : 
        risk === 'High' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30' : 
        'bg-blue-100 text-blue-700 dark:bg-blue-900/30'
      }`}>
        {risk} Risk
      </span>
    </td>
    <td className="px-6 py-4 text-right">
      <button 
        onClick={onMove}
        className="px-4 py-1.5 bg-bg-card border border-border rounded-lg text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
      >
        Move to Marketplace
      </button>
    </td>
  </tr>
);

const AlertsView = ({ products, onUpdateProduct }) => {
  const alerts = products
    .map(p => {
      const expiry = p.expiry !== 'N/A' ? new Date(p.expiry) : null;
      if (!expiry) return null;
      const daysLeft = Math.ceil((expiry - new Date()) / (1000 * 60 * 60 * 24));
      if (daysLeft > 60) return null; // Only show near expiries
      
      return {
        ...p,
        daysLeft,
        risk: daysLeft < 30 ? 'Critical' : daysLeft < 45 ? 'High' : 'Moderate'
      };
    })
    .filter(Boolean);

  const handleMoveToMarketplace = (id) => {
    onUpdateProduct(id, { 
      discount: 25, 
      status: 'On Sale',
      reason: 'Moved from Expiry Alerts'
    });
    alert("Item successfully moved to Marketplace with 25% discount!");
  };

  return (
    <div className="space-y-8 max-w-[1400px] mx-auto">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold">Expiry Alerts</h1>
          <p className="text-text-muted mt-1">Proactive tracking of shelf-life to prevent waste.</p>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 px-6 py-2.5 bg-bg-card border border-border text-text-main rounded-xl font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
            <Calendar size={18} />
            View Calendar
          </button>
          <button className="btn-primary flex items-center gap-2">
            <ShieldAlert size={18} />
            Bulk Clearance
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card bg-rose-500 text-white border-none">
          <p className="text-sm font-medium opacity-80">Critical Expiries</p>
          <p className="text-3xl font-bold mt-2">12 Items</p>
          <p className="text-xs mt-1 text-rose-100 italic">Action required within 48 hours</p>
        </div>
        <div className="card bg-amber-500 text-white border-none">
          <p className="text-sm font-medium opacity-80">Upcoming (30d+)</p>
          <p className="text-3xl font-bold mt-2">45 Items</p>
          <p className="text-xs mt-1 text-amber-100 italic">Monitor sales velocity</p>
        </div>
        <div className="card bg-primary text-white border-none">
          <p className="text-sm font-medium opacity-80">Waste Prevented</p>
          <p className="text-3xl font-bold mt-2">₹4,280</p>
          <p className="text-xs mt-1 text-blue-100 italic">Total revenue saved this month</p>
        </div>
      </div>

      <div className="card p-0 overflow-hidden">
        <div className="p-6 border-b border-border flex justify-between items-center">
          <h3 className="font-bold flex items-center gap-2">
            <AlertTriangle size={18} className="text-rose-500" />
            Active Expiry Queue
          </h3>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-semibold">Priority: High</span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-100/50 dark:bg-slate-800/50 text-text-muted uppercase text-[10px] font-bold tracking-wider">
                <td className="px-6 py-4">Product</td>
                <td className="px-6 py-4">Expiry Date</td>
                <td className="px-6 py-4">Time Left</td>
                <td className="px-6 py-4">Risk Level</td>
                <td className="px-6 py-4 text-right">Action</td>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {alerts.map((alert, i) => (
                <AlertRow 
                  key={i} 
                  {...alert} 
                  onMove={() => handleMoveToMarketplace(alert.id)}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AlertsView;
