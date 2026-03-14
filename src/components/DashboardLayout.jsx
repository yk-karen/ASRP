import React from 'react';
import { 
  LayoutDashboard, 
  Package, 
  TrendingDown, 
  Bell, 
  ShoppingBag, 
  BarChart2, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  Sun, 
  Moon,
  Search
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const NavItem = ({ icon: Icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
      active 
        ? 'bg-primary text-white shadow-lg' 
        : 'text-muted hover:bg-slate-100 dark:hover:bg-slate-800'
    }`}
  >
    <Icon size={20} />
    <span className="font-semibold text-sm">{label}</span>
  </button>
);

const DashboardLayout = ({ children, currentView, setView, toggleDark, isDark, onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'inventory', label: 'Inventory', icon: Package },
    { id: 'automation', label: 'Price Automation', icon: TrendingDown },
    { id: 'alerts', label: 'Expiry Alerts', icon: Bell },
    { id: 'marketplace', label: 'Marketplace', icon: ShoppingBag },
    { id: 'analytics', label: 'Analytics', icon: BarChart2 },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-bg-light">
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
                <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-white font-bold">A</div>
                <span className="font-display font-bold text-lg">Adaptive Platform</span>
              </div>
              <button 
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 px-4 overflow-y-auto space-y-2 mt-4">
              {menuItems.map((item) => (
                <NavItem 
                  key={item.id}
                  icon={item.icon}
                  label={item.label}
                  active={currentView === item.id}
                  onClick={() => setView(item.id)}
                />
              ))}
            </div>

            <div className="p-4 border-t border-border space-y-2">
              <NavItem icon={Settings} label="Settings" active={currentView === 'settings'} onClick={() => setView('settings')} />
              <button 
                onClick={onLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all"
              >
                <LogOut size={20} />
                <span className="font-semibold text-sm">Logout</span>
              </button>
            </div>
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
                className="pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-xl w-64 md:w-80 focus:ring-2 focus:ring-primary outline-none text-sm transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={toggleDark}
              className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-secondary p-[2px]">
              <div className="w-full h-full rounded-[10px] bg-white dark:bg-slate-950 flex items-center justify-center font-bold text-sm">
                JS
              </div>
            </div>
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
