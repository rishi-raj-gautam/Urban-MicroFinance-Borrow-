import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { Home, Upload, Wallet, FileText, TrendingUp, Bell, X } from 'lucide-react';

const Navigation = ({ isMobileOpen, setIsMobileOpen }) => {
  const { darkMode, theme } = useTheme();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', labelHi: 'डैशबोर्ड', icon: Home, path: '/dashboard' },
    { id: 'kyc', label: 'KYC Upload', labelHi: 'KYC अपलोड', icon: Upload, path: '/kyc' },
    { id: 'apply', label: 'Apply Loan', labelHi: 'ऋण आवेदन', icon: Wallet, path: '/apply' },
    { id: 'loans', label: 'My Loans', labelHi: 'मेरे ऋण', icon: FileText, path: '/loans' },
    { id: 'repayment', label: 'Repayment', labelHi: 'पुनर्भुगतान', icon: TrendingUp, path: '/repayment' },
    { id: 'notifications', label: 'Notifications', labelHi: 'सूचनाएं', icon: Bell, path: '/notifications' },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          w-64 flex-shrink-0 border-r ${theme.cardBg} ${theme.border}
          fixed lg:static inset-y-0 left-0 z-50
          transition-transform duration-300
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="h-full flex flex-col pt-16">
          {/* Close button for mobile */}
          <div className="flex items-center justify-between px-4 py-4 border-b lg:hidden ${theme.border}">
            <span className={`font-semibold ${theme.text}`}>Menu</span>
            <button
              onClick={() => setIsMobileOpen(false)}
              className={`p-2 rounded-lg transition-colors ${theme.subtle} ${theme.hover}`}
            >
              <X size={20} className={darkMode ? 'text-blue-400' : 'text-blue-600'} />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto px-4 py-6">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.id}>
                  <NavLink
                    to={item.path}
                    onClick={() => setIsMobileOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-medium ${
                        isActive 
                          ? `${darkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-500/10 text-blue-600'} font-semibold` 
                          : `${theme.textMuted} ${theme.hover}`
                      }`
                    }
                  >
                    <item.icon size={20} />
                    <span>{item.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* User Profile Section */}
          <div className={`border-t px-4 py-4 ${theme.border}`}>
            <div className="flex items-center gap-3 p-3 rounded-lg ${theme.subtle}">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${darkMode ? 'bg-blue-500/20' : 'bg-blue-500/10'}`}>
                <span className={`font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>RK</span>
              </div>
              <div className="flex-1">
                <p className={`font-semibold text-sm ${theme.text}`}>Rajesh Kumar</p>
                <p className={`text-xs ${theme.textMuted}`}>BOR001</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Navigation;
