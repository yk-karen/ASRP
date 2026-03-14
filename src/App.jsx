import React from 'react';
import LandingPage from './views/LandingPage';
import DashboardLayout from './components/DashboardLayout';
import DashboardHome from './views/DashboardHome';
import InventoryView from './views/InventoryView';
import MarketplaceView from './views/MarketplaceView';
import AutomationView from './views/AutomationView';
import AlertsView from './views/AlertsView';
import AnalyticsView from './views/AnalyticsView';
import SettingsView from './views/SettingsView';
import AdminLoginModal from './components/AdminLoginModal';
import { supabase } from './lib/supabase';

const initialProducts = [
  { id: 1, name: 'Cotton Crewneck Sweater', category: 'Clothing', stock: 124, arrival: '2024-02-15', expiry: '2025-02-15', price: '₹59.00', status: 'Fresh', age: 15, discount: 0, location: 'Warehouse A' },
  { id: 2, name: 'Ultra-Comfort Sneakers', category: 'Footwear', stock: 45, arrival: '2024-01-10', expiry: '2025-01-10', price: '₹108.00', status: 'Aging', age: 45, discount: 10, location: 'Austin, TX' },
  { id: 3, name: 'Vitamin C Complex (100ml)', category: 'Pharmacy', stock: 512, arrival: '2023-11-20', expiry: '2024-05-30', price: '₹22.50', status: 'Near Expiry', age: 85, discount: 25, location: 'Denver, CO' },
  { id: 4, name: 'Ceramic Table Lamp', category: 'Home Decor', stock: 12, arrival: '2023-09-05', expiry: '2025-09-05', price: '₹45.00', status: 'Stagnant', age: 120, discount: 50, location: 'Miami, FL' },
  { id: 5, name: 'Wireless Headphones V2', category: 'Electronics', stock: 88, arrival: '2024-02-01', expiry: '2025-02-01', price: '₹199.00', status: 'Fresh', age: 28, discount: 0, location: 'Warehouse B' },
  { id: 6, name: 'Linen Summer Dress', category: 'Clothing', stock: 65, arrival: '2024-01-05', expiry: '2025-01-05', price: '₹72.00', status: 'Aging', age: 55, discount: 10, location: 'Warehouse A' },
];

function App() {
  const [view, setView] = React.useState('marketplace'); // Public entry point
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = React.useState(false);
  const [dark, setDark] = React.useState(false);
  const [products, setProducts] = React.useState(initialProducts);

  const handleLogin = () => {
    setIsAdmin(true);
    setView('dashboard');
  };

  const handleLogout = () => {
    setIsAdmin(false);
    setView('marketplace');
  };

  const addProduct = (newProduct) => {
    setProducts(prev => [newProduct, ...prev]);
  };

  const updateProduct = (id, updates) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  React.useEffect(() => {
    const root = window.document.documentElement;
    if (dark) {
      root.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      root.classList.remove('dark');
      document.body.classList.remove('dark');
    }
  }, [dark]);

  const toggleDark = () => setDark(!dark);

  // Protected Views Wrapper
  const renderView = () => {
    // Marketplace is always public
    if (view === 'marketplace') return <MarketplaceView products={products} isAdmin={isAdmin} />;

    // Other views require Admin
    if (!isAdmin) {
      return (
        <div className="flex flex-col items-center justify-center p-20 text-center">
          <div className="w-20 h-20 bg-primary/10 text-primary rounded-3xl flex items-center justify-center mb-6">
            <Lock size={40} />
          </div>
          <h2 className="text-3xl font-bold text-text-main">Admin Access Required</h2>
          <p className="text-text-muted mt-2 max-w-md">Please log in as an administrator to access the dashboard and management tools.</p>
          <button 
            onClick={() => setIsLoginModalOpen(true)}
            className="mt-8 btn-primary px-8 py-3"
          >
            Open Admin Login
          </button>
        </div>
      );
    }

    switch (view) {
      case 'dashboard': return <DashboardHome products={products} />;
      case 'inventory': return <InventoryView products={products} onAddProduct={addProduct} />;
      case 'automation': return <AutomationView products={products} onUpdateProduct={updateProduct} />;
      case 'alerts': return <AlertsView products={products} onUpdateProduct={updateProduct} />;
      case 'analytics': return <AnalyticsView products={products} />;
      case 'settings': return <SettingsView />;
      default: return <MarketplaceView products={products} />;
    }
  };

  return (
    <DashboardLayout 
      currentView={view} 
      setView={setView} 
      toggleDark={toggleDark} 
      isDark={dark}
      isAdmin={isAdmin}
      openLogin={() => setIsLoginModalOpen(true)}
      onLogout={handleLogout}
    >
      {renderView()}

      <AdminLoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
        onLogin={handleLogin}
      />
    </DashboardLayout>
  );
}

export default App;
