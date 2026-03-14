import React from 'react';
import { Package, Clock, TrendingDown, ArrowRight, ShieldCheck, Timer, Camera } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ScannerModal from '../components/ScannerModal';

const LifecycleStep = ({ label, days, price, active, isFirst, isLast }) => (
  <div className="flex-1 relative">
    {/* Connector */}
    {!isLast && (
      <div className={`absolute top-4 left-1/2 w-full h-[2px] ${active ? 'bg-primary' : 'bg-slate-200 dark:bg-slate-700'}`} />
    )}
    
    <div className="relative flex flex-col items-center z-10">
      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
        active 
          ? 'bg-primary text-white ring-4 ring-primary/20' 
          : 'bg-slate-200 dark:bg-slate-700 text-muted'
      }`}>
        {isFirst ? <Package size={14} /> : isLast ? <ShieldCheck size={14} /> : <Clock size={14} />}
      </div>
      <div className="mt-4 text-center">
        <p className={`text-xs font-bold ${active ? 'text-primary' : 'text-muted'}`}>{label}</p>
        <p className="text-[10px] text-muted mt-1">{days} days</p>
        <p className="text-xs font-semibold mt-1" style={{ color: active ? 'var(--secondary)' : 'var(--text-muted)' }}>{price}</p>
      </div>
    </div>
  </div>
);

const ProductLifecycle = ({ currentDays }) => {
  const steps = [
    { label: 'Arrival', days: '0-30', price: 'Full Price', min: 0, max: 30 },
    { label: 'Stable', days: '30-60', price: '-10% Disc', min: 31, max: 60 },
    { label: 'Gradual', days: '60-90', price: '-25% Disc', min: 61, max: 90 },
    { label: 'Clearance', days: '90+', price: '-50% Disc', min: 91, max: 999 },
  ];

  return (
    <div className="card p-8">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h3 className="text-lg font-bold">Smart Lifecycle Strategy</h3>
          <p className="text-xs text-muted">Automated pricing stages based on stock age</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-secondary/10 text-secondary rounded-full text-xs font-bold">
          <Timer size={14} />
          In-System Protection Active
        </div>
      </div>
      
      <div className="flex items-start justify-between">
        {steps.map((step, index) => (
          <LifecycleStep 
            key={step.label}
            label={step.label}
            days={step.days}
            price={step.price}
            active={currentDays >= step.min && currentDays <= step.max}
            isFirst={index === 0}
            isLast={index === steps.length - 1}
          />
        ))}
      </div>
    </div>
  );
};

const inventoryData = [
  { id: 1, name: 'Cotton Crewneck Sweater', category: 'Clothing', stock: 124, arrival: '2024-02-15', expiry: 'N/A', price: '$59.00', status: 'Fresh', age: 15, discount: '0%' },
  { id: 2, name: 'Ultra-Comfort Sneakers', category: 'Footwear', stock: 45, arrival: '2024-01-10', expiry: 'N/A', price: '$108.00', status: 'Aging', age: 45, discount: '10%' },
  { id: 3, name: 'Vitamin C Complex (100ml)', category: 'Pharmacy', stock: 512, arrival: '2023-11-20', expiry: '2024-05-30', price: '$22.50', status: 'Near Expiry', age: 85, discount: '25%' },
  { id: 4, name: 'Ceramic Table Lamp', category: 'Home Decor', stock: 12, arrival: '2023-09-05', expiry: 'N/A', price: '$45.00', status: 'Stagnant', age: 120, discount: '50%' },
  { id: 5, name: 'Wireless Headphones V2', category: 'Electronics', stock: 88, arrival: '2024-02-01', expiry: 'N/A', price: '$199.00', status: 'Fresh', age: 28, discount: '0%' },
  { id: 6, name: 'Linen Summer Dress', category: 'Clothing', stock: 65, arrival: '2024-01-05', expiry: 'N/A', price: '$72.00', status: 'Aging', age: 55, discount: '10%' },
];

const InventoryView = () => {
  const [selectedProduct, setSelectedProduct] = React.useState(inventoryData[2]);
  const [isScannerOpen, setIsScannerOpen] = React.useState(false);
  const [items, setItems] = React.useState(inventoryData);

  const handleScanComplete = (data) => {
    const newItem = {
      id: items.length + 1,
      name: data.name,
      category: data.category,
      stock: 1,
      arrival: new Date().toISOString().split('T')[0],
      expiry: 'N/A',
      price: '$0.00',
      status: 'Fresh',
      age: 0,
      discount: '0%'
    };
    setItems([newItem, ...items]);
    setSelectedProduct(newItem);
  };

  return (
    <div className="space-y-8 max-w-[1400px] mx-auto">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold">Inventory Management</h1>
          <p className="text-muted mt-1">Monitor product lifecycles and automated discounts.</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => setIsScannerOpen(true)}
            className="px-6 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
          >
            <Camera size={18} />
            Scan Item
          </button>
          <button className="btn-primary">Add New Product</button>
        </div>
      </header>

      <ScannerModal 
        isOpen={isScannerOpen} 
        onClose={() => setIsScannerOpen(false)} 
        onScanComplete={handleScanComplete}
      />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-8">
          {/* Table */}
          <div className="card p-0 overflow-hidden">
            <div className="p-6 border-b border-border flex justify-between items-center">
              <h3 className="font-bold">Active Stock</h3>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-semibold cursor-pointer">All Categories</span>
                <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-semibold cursor-pointer">Status: High Risk</span>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-900/50 text-muted uppercase text-[10px] font-bold tracking-wider">
                    <td className="px-6 py-4">Product Name</td>
                    <td className="px-6 py-4">Stock</td>
                    <td className="px-6 py-4">Arrival</td>
                    <td className="px-6 py-4">Age</td>
                    <td className="px-6 py-4">Disc. Status</td>
                    <td className="px-6 py-4">Price</td>
                    <td className="px-6 py-4 text-right">Action</td>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {items.map((item) => (
                    <tr 
                      key={item.id} 
                      className={`group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer ${selectedProduct.id === item.id ? 'bg-primary/5' : ''}`}
                      onClick={() => setSelectedProduct(item)}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`status-indicator ${item.age < 30 ? 'status-green' : item.age < 60 ? 'status-yellow' : 'status-red'}`} />
                          <div>
                            <p className="font-semibold text-sm">{item.name}</p>
                            <p className="text-[10px] text-muted">{item.category}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-medium text-sm">{item.stock}</td>
                      <td className="px-6 py-4 text-muted text-sm">{item.arrival}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`font-bold ${item.age > 60 ? 'text-rose-500' : 'text-slate-700 dark:text-slate-300'}`}>
                          {item.age}d
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-md text-[10px] font-bold ${
                          item.discount === '0%' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30' : 
                          item.discount === '10%' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30' : 
                          'bg-rose-100 text-rose-700 dark:bg-rose-900/30'
                        }`}>
                          {item.discount} Off
                        </span>
                      </td>
                      <td className="px-6 py-4 font-bold text-sm">{item.price}</td>
                      <td className="px-6 py-4 text-right">
                        <button className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700">
                          <ArrowRight size={16} className="text-muted" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Details Panel */}
        <div className="space-y-6">
          <div className="card">
            <h3 className="text-lg font-bold mb-6">Product Details</h3>
            <div className="space-y-4">
              <div className="aspect-square rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center border-2 border-dashed border-slate-200 dark:border-slate-700">
                <Package size={48} className="text-slate-300" />
              </div>
              <div>
                <h4 className="font-bold text-xl">{selectedProduct.name}</h4>
                <p className="text-sm text-muted">{selectedProduct.category}</p>
              </div>
              <div className="grid grid-cols-2 gap-4 py-4 border-y border-border">
                <div>
                  <p className="text-[10px] uppercase font-bold text-muted">Base Price</p>
                  <p className="font-bold">{selectedProduct.price}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-muted">Arrival Date</p>
                  <p className="font-bold text-sm">{selectedProduct.arrival}</p>
                </div>
              </div>
            </div>
          </div>

          <ProductLifecycle currentDays={selectedProduct.age} />

          <div className="card bg-primary text-white border-none shadow-primary/20">
            <h3 className="font-bold flex items-center gap-2">
              <TrendingDown size={18} />
              Automation Suggestion
            </h3>
            <p className="text-sm text-blue-100 mt-2">
              Based on sales velocity, reducing price by another 5% could clear remaining stock in 4 days.
            </p>
            <button className="w-full mt-4 py-2 bg-white text-primary rounded-lg font-bold text-xs hover:bg-blue-50 transition-colors">
              Apply Suggestion
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryView;
