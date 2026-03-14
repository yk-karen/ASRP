import React from 'react';
import { TrendingDown, Play, Pause, RefreshCw, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const AutomationCard = ({ name, currentDiscount, suggestedDiscount, reason, impact }) => (
  <div className="card group">
    <div className="flex justify-between items-start mb-4">
      <div>
        <h3 className="font-bold text-lg">{name}</h3>
        <p className="text-xs text-text-muted mt-1">{reason}</p>
      </div>
      <div className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-full text-[10px] font-bold">
        Suggesting +{suggestedDiscount - currentDiscount}%
      </div>
    </div>
    
    <div className="grid grid-cols-2 gap-4 py-4 border-y border-border">
      <div>
        <p className="text-[10px] uppercase font-bold text-text-muted">Current Disc.</p>
        <p className="font-bold">{currentDiscount}%</p>
      </div>
      <div>
        <p className="text-[10px] uppercase font-bold text-text-muted">Suggested</p>
        <p className="font-bold text-primary">{suggestedDiscount}%</p>
      </div>
    </div>

    <div className="mt-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <TrendingDown size={14} className="text-secondary" />
        <span className="text-xs font-medium text-text-muted">{impact}</span>
      </div>
      <button className="px-4 py-1.5 bg-primary text-white rounded-lg font-bold text-xs hover:bg-primary/90 transition-all">
        Apply Now
      </button>
    </div>
  </div>
);

const AutomationView = () => {
  const suggestions = [
    { name: 'Ceramic Table Lamp', currentDiscount: 50, suggestedDiscount: 65, reason: 'Stagnant inventory (120+ days)', impact: 'Est. clearance in 5 days' },
    { name: 'Ultra-Comfort Sneakers', currentDiscount: 10, suggestedDiscount: 25, reason: 'Slow moving season (45 days)', impact: '+15% Sales velocity' },
    { name: 'Linen Summer Dress', currentDiscount: 10, suggestedDiscount: 20, reason: 'Off-season backlog', impact: 'Clears shelf space' },
  ];

  return (
    <div className="space-y-8 max-w-[1400px] mx-auto">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold">Price Automation</h1>
          <p className="text-text-muted mt-1">Smart pricing algorithms maximizing your inventory turnover.</p>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 px-6 py-2.5 bg-bg-card border border-border text-text-main rounded-xl font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
            <Pause size={18} />
            Pause System
          </button>
          <button className="btn-primary flex items-center gap-2">
            <RefreshCw size={18} />
            Scan for Opportunities
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {suggestions.map((s, i) => (
              <AutomationCard key={i} {...s} />
            ))}
          </div>
          
          <div className="card bg-bg-card border-dashed border-2 flex flex-col items-center justify-center p-12 text-center text-text-muted">
            <AlertCircle size={48} className="mb-4 opacity-20" />
            <p className="font-medium">No other items met the automation threshold today.</p>
            <p className="text-xs mt-1">AI models verify movement every 24 hours.</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="card">
            <h3 className="font-bold mb-4">AIGuard™ Logs</h3>
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex gap-3 text-sm">
                  <div className="mt-1 w-2 h-2 rounded-full bg-secondary shrink-0" />
                  <div>
                    <p className="font-medium">Automated adjustment successful</p>
                    <p className="text-xs text-text-muted">Item #402 price reduced by 5% based on low velocity signal.</p>
                    <p className="text-[10px] text-text-muted mt-1">2 hours ago</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutomationView;
