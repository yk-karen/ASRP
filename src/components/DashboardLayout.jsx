import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Package, 
  Zap,
  AlertTriangle,
  ShoppingCart,
  BarChart3,
  Settings,
  Menu,
  X,
  User,
  LogOut,
  ChevronRight,
  ShieldCheck,
  LogIn,
  Search,
  Sun,
  Moon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const NavItem = ({ icon: Icon, label, isActive, onClick, isOpen }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
      isActive 
        ? 'bg-primary text-white shadow-lg ring-1 ring-primary/20' 
        : 'text-text-muted hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-text-main'
    } ${!isOpen ? 'justify-center' : ''}`}
  >
    <Icon size={20} className={isActive ? 'text-white' : 'text-primary'} />
    {isOpen && <span className="font-semibold text-sm">{label}</span>}
  </button>
);

const DashboardLayout = ({ children, currentView, setView, toggleDark, isDark, onLogout, isAdmin, openLogin }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, adminOnly: true },
    { id: 'inventory', label: 'Inventory', icon: Package, adminOnly: true },
    { id: 'automation', label: 'Price Automation', icon: Zap, adminOnly: true },
    { id: 'alerts', label: 'Expiry Alerts', icon: AlertTriangle, adminOnly: true },
    { id: 'marketplace', label: 'Marketplace', icon: ShoppingCart, adminOnly: false },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, adminOnly: true },
    { id: 'settings', label: 'Settings', icon: Settings, adminOnly: true },
  ];

  const filteredNavItems = isAdmin 
    ? navItems 
    : navItems.filter(item => !item.adminOnly);

  return (
    <div className="flex h-screen overflow-hidden bg-bg-main text-text-main">
      {/* Sidebar */}
      <AnimatePresence mode="wait">
        {sidebarOpen && (
          <motion.aside 
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            className="w-72 h-full glass border-r border-border flex flex-col z-40"
          >
            <div className="p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-white font-bold">ASRP</div>
                <span className="font-display font-bold text-lg">ASRP</span>
              </div>
              <button 
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 px-4 overflow-y-auto space-y-2 mt-4">
              {filteredNavItems.map((item) => (
                <NavItem 
                  key={item.id}
                  icon={item.icon}
                  label={item.label}
                  isActive={currentView === item.id}
                  onClick={() => setView(item.id)}
                  isOpen={sidebarOpen}
                />
              ))}
            </div>

            {/* User Profile / Logout - Only for Admin */}
            {isAdmin && (
              <div className="p-4 border-t border-border">
                <button 
                  onClick={onLogout}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-all font-bold ${!sidebarOpen ? 'justify-center' : ''}`}
                >
                  <LogOut size={20} />
                  {sidebarOpen && <span>Logout</span>}
                </button>
              </div>
            )}
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {/* Header */}
        <header className="h-20 glass border-b border-border flex items-center justify-between px-8 z-30">
          <div className="flex items-center gap-4">
            {!sidebarOpen && (
              <button 
                onClick={() => setSidebarOpen(true)}
                className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <Menu size={20} />
              </button>
            )}
            <div className="relative group hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-primary transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Search inventory, sales..." 
                className="pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-xl w-64 md:w-80 focus:ring-2 focus:ring-primary outline-none text-sm transition-all text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={toggleDark} className="p-2 rounded-xl border border-border hover:bg-slate-100 dark:hover:bg-slate-800 transition-all mr-2">
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            {isAdmin ? (
              <div className="flex items-center gap-3 pl-4 border-l border-border">
                <div className="text-right hidden sm:block">
                  <p className="text-xs font-bold text-text-main line-clamp-1">Nithin Nibin</p>
                  <p className="text-[10px] text-text-muted">Administrator</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white shadow-lg">
                  <ShieldCheck size={20} />
                </div>
              </div>
            ) : (
              <button 
                onClick={openLogin}
                className="flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-xl font-bold text-sm shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <LogIn size={18} />
                Admin Login
              </button>
            )}
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8 relative">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
