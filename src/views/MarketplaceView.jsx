import React from 'react';
import { ShoppingCart, MapPin, Tag, ArrowUpRight, Search, Filter, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

const ProductCard = ({ name, category, price, oldPrice, discount, stock, location, image }) => (
  <motion.div 
    whileHover={{ y: -6 }}
    className="card group overflow-hidden"
  >
    <div className="relative aspect-video rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800 mb-4">
      <div className="absolute top-3 left-3 z-10">
        <span className="bg-rose-500 text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-lg">
          {discount}% OFF
        </span>
      </div>
      <div className="absolute inset-0 flex items-center justify-center text-slate-300">
        <Tag size={48} strokeWidth={1} />
      </div>
      {/* Placeholder for real image */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
    
    <div className="space-y-2">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-[10px] font-bold text-secondary uppercase tracking-wider">{category}</p>
          <h3 className="font-bold text-sm leading-snug group-hover:text-primary transition-colors">{name}</h3>
        </div>
        <button className="p-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 text-muted hover:text-primary transition-colors">
          <ArrowUpRight size={16} />
        </button>
      </div>
      
      <div className="flex items-center gap-2 text-xs text-muted">
        <MapPin size={12} />
        <span>{location}</span>
      </div>

      <div className="pt-3 border-t border-border flex justify-between items-center">
        <div>
          <span className="text-lg font-bold">{price}</span>
          <span className="text-xs text-muted line-through ml-2">{oldPrice}</span>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-bold text-muted uppercase">Stock</p>
          <p className="text-xs font-bold">{stock} units</p>
        </div>
      </div>
      
      <button className="w-full mt-2 py-2.5 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-black dark:hover:bg-white transition-all transform active:scale-[0.98]">
        <ShoppingCart size={14} />
        Request to Buy
      </button>
    </div>
  </motion.div>
);

const AlertCard = ({ title, message, type }) => (
  <div className={`p-4 rounded-xl border flex gap-4 ${
    type === 'warning' ? 'bg-amber-50 border-amber-200 dark:bg-amber-950/20 dark:border-amber-900/50' : 'bg-rose-50 border-rose-200 dark:bg-rose-950/20 dark:border-rose-900/50'
  }`}>
    <div className={`p-2 rounded-lg h-fit ${
      type === 'warning' ? 'bg-amber-100 text-amber-600' : 'bg-rose-100 text-rose-600'
    }`}>
      <AlertTriangle size={20} />
    </div>
    <div>
      <h4 className={`font-bold text-sm ${type === 'warning' ? 'text-amber-900 dark:text-amber-200' : 'text-rose-900 dark:text-rose-200'}`}>{title}</h4>
      <p className="text-xs mt-1 text-slate-600 dark:text-slate-400 leading-relaxed">{message}</p>
      <button className="mt-3 text-[10px] font-bold flex items-center gap-1 hover:underline">
        Take Action <ArrowUpRight size={12} />
      </button>
    </div>
  </div>
);

const MarketplaceView = () => {
  const products = [
    { name: 'ErgoPro Office Chairs', category: 'Furniture', price: '$85.00', oldPrice: '$180.00', discount: 52, stock: 45, location: 'Denver, CO' },
    { name: 'PureAqua Filtration Units', category: 'Appliances', price: '$120.00', oldPrice: '$240.00', discount: 50, stock: 12, location: 'Austin, TX' },
    { name: 'LuxeCotton T-Shirts (Bulk)', category: 'Apparel', price: '$8.50', oldPrice: '$22.00', discount: 61, stock: 240, location: 'Chicago, IL' },
    { name: 'Modernist Floor Lamps', category: 'Home Decor', price: '$45.00', oldPrice: '$95.00', discount: 52, stock: 18, location: 'Miami, FL' },
    { name: 'Vitamin B12 Supplements', category: 'Health', price: '$12.00', oldPrice: '$32.00', discount: 62, stock: 500, location: 'Seattle, WA' },
    { name: 'Noise-Cancelling Earbuds', category: 'Electronics', price: '$65.00', oldPrice: '$120.00', discount: 45, stock: 85, location: 'Phoenix, AZ' },
  ];

  return (
    <div className="space-y-8 max-w-[1400px] mx-auto">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Surplus Marketplace</h1>
          <p className="text-muted mt-1">Acquire surplus inventory from verified B2B partners.</p>
        </div>
        
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={16} />
            <input 
              type="text" 
              placeholder="Filter products..." 
              className="pl-9 pr-4 py-2 bg-white dark:bg-slate-900 border border-border rounded-xl text-sm w-48 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <button className="p-2 border border-border rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800">
            <Filter size={18} />
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        {/* Marketplace Grid */}
        <div className="xl:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p, i) => (
            <ProductCard key={i} {...p} />
          ))}
        </div>

        {/* Sidebar Alerts */}
        <div className="space-y-6">
          <div className="card">
            <h3 className="font-bold mb-4 flex items-center justify-between">
              Critical Alerts
              <span className="w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] flex items-center justify-center animate-pulse">2</span>
            </h3>
            <div className="space-y-4">
              <AlertCard 
                title="Inventory Backlog"
                message="200 Jackets have been unsold for 45 days. Recommended discount increase to 40%."
                type="danger"
              />
              <AlertCard 
                title="Expiry Warning"
                message="Medicine batch #402 expires in 60 days. Listing on marketplace recommended."
                type="warning"
              />
            </div>
          </div>

          <div className="card bg-gradient-to-br from-secondary/10 to-primary/10 border-none">
            <h3 className="font-bold text-sm text-primary">Marketplace Earnings</h3>
            <p className="text-3xl font-bold mt-2">$14,580</p>
            <p className="text-xs text-muted mt-1">Revenue from your surplus sales this month.</p>
            <div className="mt-4 h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-primary w-[65%]" />
            </div>
            <p className="text-[10px] font-bold text-right mt-1 text-primary">65% of target</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketplaceView;
