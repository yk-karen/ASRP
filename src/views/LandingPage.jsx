import React from 'react';
import { ArrowRight, BarChart3, Clock, AlertTriangle, ShoppingCart, ShieldCheck, Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

const FeatureCard = ({ icon: Icon, title, description }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="card flex flex-col gap-4"
  >
    <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(20, 184, 166, 0.1)', color: 'var(--secondary)' }}>
      <Icon size={24} />
    </div>
    <h3 className="text-xl font-bold">{title}</h3>
    <p className="text-muted text-sm">{description}</p>
  </motion.div>
);

const LandingPage = ({ onStart, toggleDark, isDark }) => {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="glass sticky top-0 z-50 py-4 px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-white font-bold">A</div>
          <span className="font-display font-bold text-xl">Adaptive Surplus</span>
        </div>
        <div className="flex items-center gap-6">
          <button onClick={toggleDark} className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5">
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button onClick={onStart} className="btn-primary flex items-center gap-2">
            Go to Dashboard <ArrowRight size={18} />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 container grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-secondary font-semibold tracking-wider uppercase text-sm">Smart Inventory Management</span>
          <h1 className="text-5xl md:text-6xl font-bold mt-4 leading-tight">
            Turn Surplus Inventory into <span style={{ color: 'var(--primary-light)' }}>Revenue</span>
          </h1>
          <p className="text-xl text-muted mt-6 max-w-lg">
            Our real-time dynamic pricing engine helps businesses reduce waste and maximize profits by automatically adjusting prices based on stock age and expiry.
          </p>
          <div className="flex gap-4 mt-10">
            <button onClick={onStart} className="btn-primary px-8 py-4 text-lg">
              Start Managing Inventory
            </button>
            <button className="px-8 py-4 text-lg font-semibold rounded-lg border-2 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800">
              View Demo
            </button>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-primary/5 rounded-full blur-3xl -z-10"></div>
          <img 
            src="/platform_illustration.png" 
            alt="Adaptive Surplus Platform" 
            className="w-full rounded-2xl shadow-2xl border border-white/20"
          />
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-slate-50/50 dark:bg-slate-900/50">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">Everything you need to eliminate waste</h2>
            <p className="text-muted mt-4">Powerful tools designed for retailers, warehouses, and pharmacies to stay ahead of product aging.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard 
              icon={BarChart3}
              title="Dynamic Pricing"
              description="Automatically reduces prices based on the number of days in stock and market demand."
            />
            <FeatureCard 
              icon={Clock}
              title="Lifecycle Tracking"
              description="Visual timeline showing every product's journey from arrival to clearance."
            />
            <FeatureCard 
              icon={AlertTriangle}
              title="Smart Expiry Alerts"
              description="Proactive notifications for products nearing expiry or low shelf-life."
            />
            <FeatureCard 
              icon={ShoppingCart}
              title="Surplus Marketplace"
              description="B2B marketplace where businesses can trade surplus stock at discounted rates."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-primary flex items-center justify-center text-white font-bold text-xs">A</div>
            <span className="font-display font-bold text-lg">Adaptive Surplus</span>
          </div>
          <p className="text-muted text-sm">© 2026 Adaptive Surplus Reduction Platform. All rights reserved.</p>
          <div className="flex gap-6 text-sm font-medium text-muted">
            <a href="#" className="hover:text-primary">Docs</a>
            <a href="#" className="hover:text-primary">Privacy</a>
            <a href="#" className="hover:text-primary">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
