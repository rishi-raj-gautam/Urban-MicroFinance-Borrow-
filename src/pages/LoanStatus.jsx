import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { Clock, CheckCircle, Wallet, Eye, ArrowRight, Calendar } from 'lucide-react';

const LoanStatus = () => {
  const { theme, darkMode } = useTheme();
  const navigate = useNavigate();
  const [language, setLanguage] = useState('en');

  const text = {
    en: {
      title: 'My Loans',
      subtitle: 'Track all your loan applications',
      loanId: 'Loan ID',
      amount: 'Amount',
      nextEMI: 'Next EMI',
      dueDate: 'Due Date',
      viewDetails: 'View Details',
      makePayment: 'Make Payment',
      status: {
        disbursed: 'Disbursed',
        approved: 'Approved',
        pending: 'Under Review',
        rejected: 'Rejected',
      }
    },
    hi: {
      title: 'मेरे ऋण',
      subtitle: 'अपने सभी ऋण आवेदनों को ट्रैक करें',
      loanId: 'ऋण ID',
      amount: 'राशि',
      nextEMI: 'अगली EMI',
      dueDate: 'नियत तारीख',
      viewDetails: 'विवरण देखें',
      makePayment: 'भुगतान करें',
      status: {
        disbursed: 'वितरित',
        approved: 'स्वीकृत',
        pending: 'समीक्षाधीन',
        rejected: 'अस्वीकृत',
      }
    }
  };

  const t = text[language];

  const loans = [
    {
      id: 'LA001',
      amount: 25000,
      status: 'disbursed',
      emi: 2150,
      dueDate: '15 Dec 2025',
      purpose: 'Business',
      icon: Wallet,
      color: 'from-green-500 to-green-600',
      statusColor: 'bg-green-500/10 text-green-500 border-green-500/20',
    },
    {
      id: 'LA002',
      amount: 15000,
      status: 'approved',
      purpose: 'Medical',
      icon: CheckCircle,
      color: 'from-blue-500 to-blue-600',
      statusColor: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    },
    {
      id: 'LA003',
      amount: 30000,
      status: 'pending',
      purpose: 'Education',
      icon: Clock,
      color: 'from-yellow-500 to-yellow-600',
      statusColor: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className={`text-3xl font-bold ${theme.text}`}>{t.title}</h1>
        <p className={`${theme.textMuted} mt-1`}>{t.subtitle}</p>
      </div>

      {/* Grid Layout for Loan Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loans.map((loan) => (
          <div 
            key={loan.id} 
            className={`${theme.cardBg} rounded-2xl border ${theme.border} p-6 hover:scale-105 transition-all shadow-lg`}
          >
            {/* Header with Icon and Status */}
            <div className="flex items-start justify-between mb-4">
              <div className={`bg-gradient-to-br ${loan.color} w-16 h-16 rounded-2xl flex items-center justify-center shadow-xl`}>
                <loan.icon className="text-white" size={32} />
              </div>
              <span className={`text-xs font-bold px-3 py-1.5 rounded-full border ${loan.statusColor}`}>
                {t.status[loan.status]}
              </span>
            </div>

            {/* Loan Details */}
            <div className="space-y-3 mb-4">
              <div>
                <p className={`text-sm ${theme.textMuted}`}>{t.loanId}</p>
                <p className={`font-bold ${theme.text}`}>{loan.id}</p>
              </div>

              <div>
                <p className={`text-sm ${theme.textMuted}`}>Purpose</p>
                <p className={`font-semibold ${theme.text}`}>{loan.purpose}</p>
              </div>

              <div>
                <p className={`text-sm ${theme.textMuted}`}>{t.amount}</p>
                <p className={`text-3xl font-bold ${theme.text}`}>₹{loan.amount.toLocaleString()}</p>
              </div>
            </div>

            {/* EMI Info (if disbursed) */}
            {loan.emi && loan.dueDate && (
              <div className={`p-4 rounded-xl mb-4 ${theme.subtle}`}>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className={`text-xs ${theme.textMuted}`}>{t.nextEMI}</p>
                    <p className={`font-bold ${theme.text}`}>₹{loan.emi.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className={`text-xs ${theme.textMuted}`}>{t.dueDate}</p>
                    <p className={`font-bold text-sm ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                      {loan.dueDate}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-2">
              {loan.status === 'disbursed' && (
                <button 
                  onClick={() => navigate('/repayment')}
                  className="w-full py-3 rounded-xl font-semibold bg-blue-500 hover:bg-blue-600 text-white transition-colors shadow-lg flex items-center justify-center gap-2"
                >
                  {t.makePayment}
                  <ArrowRight size={18} />
                </button>
              )}
              <button 
                className={`w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 ${
                  darkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-800'
                } ${theme.hover} transition-all`}
              >
                <Eye size={18} />
                {t.viewDetails}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoanStatus;
