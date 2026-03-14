import React from 'react';
import { User, Bell, Shield, Palette, Globe, Save } from 'lucide-react';

const SettingsSection = ({ title, icon: Icon, children }) => (
  <div className="card">
    <div className="flex items-center gap-3 mb-6">
      <div className="p-2 rounded-lg bg-primary/10 text-primary">
        <Icon size={20} />
      </div>
      <h3 className="font-bold text-lg">{title}</h3>
    </div>
    <div className="space-y-4">
      {children}
    </div>
  </div>
);

const SettingsInput = ({ label, type = "text", placeholder }) => (
  <div>
    <label className="text-xs font-bold text-text-muted uppercase mb-2 block">{label}</label>
    <input 
      type={type} 
      placeholder={placeholder}
      className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-border rounded-xl outline-none focus:ring-2 focus:ring-primary text-sm transition-all"
    />
  </div>
);

const SettingsView = () => {
  return (
    <div className="space-y-8 max-w-[1000px] mx-auto">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-text-muted mt-1">Manage your store profile and platform preferences.</p>
        </div>
        <button className="btn-primary flex items-center gap-2 px-8">
          <Save size={18} />
          Save Changes
        </button>
      </header>

      <div className="grid grid-cols-1 gap-6">
        <SettingsSection title="Store Profile" icon={User}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SettingsInput label="Store Name" placeholder="Main Street Branch" />
            <SettingsInput label="Store ID" placeholder="ST-4029" />
            <SettingsInput label="Contact Email" placeholder="manager@store.com" />
            <SettingsInput label="Phone Number" placeholder="+1 (555) 000-0000" />
          </div>
        </SettingsSection>

        <SettingsSection title="Notification Preferences" icon={Bell}>
          <div className="space-y-4">
            {[
              { label: 'Inventory Expiry Alerts', desc: 'Get notified when items are < 30 days from expiry.' },
              { label: 'Automation Suggestions', desc: 'Daily breakdown of potential price adjustments.' },
              { label: 'Weekly Performance Reports', desc: 'Summary of surplus recovery and sales velocity.' },
            ].map((pref, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
                <div>
                  <p className="font-bold text-sm">{pref.label}</p>
                  <p className="text-xs text-text-muted mt-0.5">{pref.desc}</p>
                </div>
                <div className="w-12 h-6 bg-primary rounded-full relative cursor-pointer">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </SettingsSection>

        <SettingsSection title="Security & Access" icon={Shield}>
          <div className="space-y-4">
            <button className="w-full text-left px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-border rounded-xl text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-700 transition-all">
              Change Administrator Password
            </button>
            <button className="w-full text-left px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-border rounded-xl text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-700 transition-all">
              Manage API Keys
            </button>
          </div>
        </SettingsSection>
      </div>
    </div>
  );
};

export default SettingsView;
