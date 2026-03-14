import React from 'react';
import LandingPage from './views/LandingPage';
import DashboardLayout from './components/DashboardLayout';
import DashboardHome from './views/DashboardHome';
import InventoryView from './views/InventoryView';
import MarketplaceView from './views/MarketplaceView';

function App() {
  const [view, setView] = React.useState('landing');
  const [dark, setDark] = React.useState(false);

  React.useEffect(() => {
    if (dark) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [dark]);

  const toggleView = (newView) => setView(newView);
  const toggleDark = () => setDark(!dark);

  if (view === 'landing') {
    return <LandingPage onStart={() => setView('dashboard')} toggleDark={toggleDark} isDark={dark} />;
  }

  return (
    <DashboardLayout 
      currentView={view} 
      setView={setView} 
      toggleDark={toggleDark} 
      isDark={dark}
      onLogout={() => setView('landing')}
    >
      {view === 'dashboard' && <DashboardHome />}
      {view === 'inventory' && <InventoryView />}
      {view === 'marketplace' && <MarketplaceView />}
    </DashboardLayout>
  );
}

export default App;
