import React from 'react';
import { Outlet } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import Header from './Header';
import Navigation from './Navigation';

const Layout = () => {
  const { theme } = useTheme();
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);

  return (
    <div className={`h-screen flex flex-col ${theme.bg}`}>
      <Header onMenuClick={() => setIsMobileOpen(!isMobileOpen)} />
      <div className="flex flex-1 overflow-hidden">
        <Navigation 
          isMobileOpen={isMobileOpen} 
          setIsMobileOpen={setIsMobileOpen} 
        />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
