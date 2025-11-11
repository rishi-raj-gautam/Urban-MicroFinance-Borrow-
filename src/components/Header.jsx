import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { DollarSign, Moon, Sun, Globe, Menu, User } from 'lucide-react';

const Header = ({ onMenuClick }) => {
  const { darkMode, toggleDarkMode, theme } = useTheme();
  const [language, setLanguage] = React.useState('en');

  return (
    <header className={`flex-shrink-0 border-b ${theme.cardBg} ${theme.border} z-50`}>
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          {/* Mobile Hamburger */}
          <button
            onClick={onMenuClick}
            className={`lg:hidden p-2 rounded-lg transition-colors ${theme.subtle} ${theme.hover}`}
            aria-label="Toggle menu"
          >
            <Menu size={24} className={darkMode ? 'text-blue-400' : 'text-blue-600'} />
          </button>

          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className={`p-2 rounded-lg ${darkMode ? 'bg-blue-500/20' : 'bg-blue-500/10'}`}>
              <DollarSign size={24} className={darkMode ? 'text-blue-400' : 'text-blue-600'} />
            </div>
            <div>
              <h1 className={`text-xl font-bold ${theme.text}`}>Urban Micro Lending</h1>
              <p className={`text-xs ${theme.textMuted}`}>Borrower Portal</p>
            </div>
          </div>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
            className={`p-2 rounded-lg transition-colors ${theme.subtle} ${theme.hover}`}
            aria-label="Toggle language"
          >
            <Globe size={20} className={darkMode ? 'text-blue-400' : 'text-blue-600'} />
          </button>
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-lg transition-colors ${theme.subtle} ${theme.hover}`}
            aria-label="Toggle theme"
          >
            {darkMode ? (
              <Sun size={20} className="text-blue-400" />
            ) : (
              <Moon size={20} className="text-blue-600" />
            )}
          </button>
          <div className={`p-2 rounded-lg ${darkMode ? 'bg-blue-500/20' : 'bg-blue-500/10'}`}>
            <User size={20} className={darkMode ? 'text-blue-400' : 'text-blue-600'} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
