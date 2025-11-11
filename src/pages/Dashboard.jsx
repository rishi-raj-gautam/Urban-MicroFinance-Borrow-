import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { Wallet, FileText, TrendingUp, Bell, ArrowRight, Calendar, Upload } from 'lucide-react';

const Dashboard = () => {
  const { theme, darkMode } = useTheme();
  const navigate = useNavigate();

  const quickActions = [
    { icon: Upload, label: 'Upload KYC', color: 'from-purple-500 to-purple-600', path: '/kyc' },
    { icon: Wallet, label: 'Apply Loan', color: 'from-blue-500 to-blue-600', path: '/apply' },
    { icon: FileText, label: 'My Loans', color: 'from-green-500 to-green-600', path: '/loans' },
    { icon: TrendingUp, label: 'Repayment', color: 'from-orange-500 to-orange-600', path: '/repayment' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div>
        <h2 className={`text-3xl font-bold ${theme.text}`}>Welcome Back! 👋</h2>
        <p className={`${theme.textMuted} mt-1`}>Rajesh Kumar • BOR001</p>
      </div>

      {/* Active Loan Card */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-6 shadow-lg`}>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <span className={`font-semibold ${theme.text}`}>Active Loan</span>
        </div>
        
        {/* Grid Layout for Loan Details */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className={`text-sm ${theme.textMuted} mb-1`}>Loan Amount</p>
            <p className={`text-3xl font-bold ${theme.text}`}>₹25,000</p>
          </div>
          <div>
            <p className={`text-sm ${theme.textMuted} mb-1`}>Next EMI Due</p>
            <p className={`text-3xl font-bold ${theme.text}`}>₹2,150</p>
          </div>
        </div>

        <div className={`flex items-center justify-between p-4 rounded-xl ${theme.subtle}`}>
          <div className="flex items-center gap-2">
            <Calendar size={20} className={darkMode ? 'text-blue-400' : 'text-blue-600'} />
            <span className={`text-sm font-medium ${theme.text}`}>Due on</span>
          </div>
          <span className={`text-sm font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
            15 Dec 2025
          </span>
        </div>

        <button
          onClick={() => navigate('/repayment')}
          className="w-full mt-4 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white transition-colors shadow-lg"
        >
          View Repayment Schedule
          <ArrowRight size={18} />
        </button>
      </div>

      {/* Quick Actions Grid */}
      <div>
        <h3 className={`text-xl font-semibold mb-4 ${theme.text}`}>Quick Actions</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={() => navigate(action.path)}
              className={`${theme.cardBg} rounded-2xl border ${theme.border} p-6 hover:scale-105 transition-all shadow-md`}
            >
              <div className={`bg-gradient-to-br ${action.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-4 shadow-xl`}>
                <action.icon className="text-white" size={32} />
              </div>
              <p className={`font-semibold text-left ${theme.text}`}>{action.label}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-6`}>
        <h3 className={`text-xl font-semibold mb-4 ${theme.text}`}>Recent Activity</h3>
        <div className="space-y-3">
          {[
            { label: 'EMI Paid', amount: '₹2,150', date: '15 Nov 2025', status: 'success' },
            { label: 'Loan Disbursed', amount: '₹25,000', date: '15 Oct 2025', status: 'info' },
          ].map((activity, index) => (
            <div key={index} className={`flex items-center justify-between p-4 rounded-xl ${theme.subtle}`}>
              <div>
                <p className={`font-semibold ${theme.text}`}>{activity.label}</p>
                <p className={`text-sm ${theme.textMuted}`}>{activity.date}</p>
              </div>
              <p className={`text-xl font-bold ${activity.status === 'success' ? 'text-green-500' : darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                {activity.amount}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
