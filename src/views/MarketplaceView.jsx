import React from 'react';
import { ShoppingCart, MapPin, Tag, ArrowUpRight, Search, Filter, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { Camera } from 'lucide-react';
import ProductPhotoModal from '../components/ProductPhotoModal';

const ProductCard = ({ name, category, price, oldPrice, discount, stock, location, image: initialImage, isAdmin }) => {
  const [image, setImage] = React.useState(initialImage);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleCapture = (imageData) => {
    setImage(imageData);
  };

  return (
    <motion.div 
      whileHover={{ y: -6 }}
      className="card group overflow-hidden"
    >
      <div className="relative aspect-video rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800 mb-4 flex items-center justify-center">
        {image ? (
          <img src={image} alt={name} className="w-full h-full object-cover" />
        ) : (
          <Tag size={48} strokeWidth={1} className="text-slate-300" />
        )}
        
        <div className="absolute top-3 left-3 z-10">
          <span className="bg-rose-500 text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-lg">
            {discount}% OFF
          </span>
        </div>

        {/* Add Picture Button Overlay - Admin Only */}
        {isAdmin && (
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="p-3 bg-white/20 hover:bg-white/40 rounded-full text-white backdrop-blur-sm transition-all"
              title="Add Product Picture"
            >
              <Camera size={24} />
            </button>
          </div>
        )}

        {isAdmin && (
          <ProductPhotoModal 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)} 
            onCapture={handleCapture} 
          />
        )}
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
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
        
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <MapPin size={12} />
          <span>{location}</span>
        </div>

        <div className="pt-3 border-t border-border flex justify-between items-center">
          <div>
            <span className="text-lg font-bold text-slate-900 dark:text-slate-100">{price}</span>
            <span className="text-xs text-slate-400 dark:text-slate-500 line-through ml-2">{oldPrice}</span>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase">Stock</p>
            <p className="text-xs font-bold text-slate-900 dark:text-slate-100">{stock} units</p>
          </div>
        </div>
        
        <button className="w-full mt-2 py-2.5 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-black dark:hover:bg-white transition-all transform active:scale-[0.98]">
          <ShoppingCart size={14} />
          Request to Buy
        </button>
      </div>
    </motion.div>
  );
};

const AlertCard = ({ title, message, type }) => (
  <div className={`p-4 rounded-xl border flex gap-4 ${
    type === 'warning' ? 'bg-amber-50 border-amber-200 dark:bg-amber-950/40 dark:border-amber-900/50' : 'bg-rose-50 border-rose-200 dark:bg-rose-950/40 dark:border-rose-900/50'
  }`}>
    <div className={`p-2 rounded-lg h-fit ${
      type === 'warning' ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/50 dark:text-amber-400' : 'bg-rose-100 text-rose-600 dark:bg-rose-900/50 dark:text-rose-400'
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

const MarketplaceView = ({ products, isAdmin }) => {
  const activeItems = products.filter(p => p.discount > 0);

  const formattedItems = activeItems.map(item => {
    const basePrice = parseFloat(item.price.replace('₹', ''));
    const discPrice = basePrice * (1 - (item.discount / 100));
    return {
      ...item,
      price: `₹${discPrice.toFixed(2)}`,
      oldPrice: `₹${basePrice.toFixed(2)}`,
    };
  });

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
          {formattedItems.map((p, i) => (
            <ProductCard key={i} {...p} isAdmin={isAdmin} />
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
            <p className="text-3xl font-bold mt-2">₹14,580</p>
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
