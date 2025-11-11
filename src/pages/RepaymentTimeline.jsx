import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { CheckCircle, Circle, Calendar, TrendingUp, ArrowRight } from 'lucide-react';
import { emiSchedule } from '../data/mockData';

const RepaymentTimeline = () => {
  const { theme, darkMode } = useTheme();
  const [language, setLanguage] = useState('en');

  const text = {
    en: {
      title: 'Repayment Schedule',
      subtitle: 'Loan ID: LA001 • Business Loan',
      totalPaid: 'Total Paid',
      remaining: 'Remaining',
      progress: 'Progress',
      emiNo: 'EMI',
      amount: 'Amount',
      dueDate: 'Due Date',
      status: 'Status',
      paid: 'Paid',
      upcoming: 'Upcoming',
      payNow: 'Pay Now',
      downloadSchedule: 'Download Schedule',
    },
    hi: {
      title: 'पुनर्भुगतान अनुसूची',
      subtitle: 'ऋण ID: LA001 • व्यवसाय ऋण',
      totalPaid: 'कुल भुगतान',
      remaining: 'शेष',
      progress: 'प्रगति',
      emiNo: 'EMI',
      amount: 'राशि',
      dueDate: 'नियत तारीख',
      status: 'स्थिति',
      paid: 'भुगतान',
      upcoming: 'आगामी',
      payNow: 'अभी भुगतान करें',
      downloadSchedule: 'अनुसूची डाउनलोड करें',
    }
  };

  const t = text[language];

  const totalAmount = emiSchedule.reduce((sum, emi) => sum + emi.amount, 0);
  const paidAmount = emiSchedule.filter(e => e.status === 'paid').reduce((sum, emi) => sum + emi.amount, 0);
  const progress = (paidAmount / totalAmount) * 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className={`text-3xl font-bold ${theme.text}`}>{t.title}</h1>
        <p className={`${theme.textMuted} mt-1`}>{t.subtitle}</p>
      </div>

      {/* Grid Layout for Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Paid Card */}
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-6 shadow-lg`}>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 rounded-xl bg-green-500/10">
              <CheckCircle className="text-green-500" size={24} />
            </div>
            <p className={`text-sm ${theme.textMuted}`}>{t.totalPaid}</p>
          </div>
          <p className={`text-3xl font-bold text-green-500`}>₹{paidAmount.toLocaleString()}</p>
        </div>

        {/* Remaining Card */}
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-6 shadow-lg`}>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 rounded-xl bg-orange-500/10">
              <TrendingUp className="text-orange-500" size={24} />
            </div>
            <p className={`text-sm ${theme.textMuted}`}>{t.remaining}</p>
          </div>
          <p className={`text-3xl font-bold ${theme.text}`}>₹{(totalAmount - paidAmount).toLocaleString()}</p>
        </div>

        {/* Progress Card */}
        <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-6 shadow-lg`}>
          <div className="flex items-center gap-3 mb-2">
            <div className={`p-3 rounded-xl ${darkMode ? 'bg-blue-500/20' : 'bg-blue-500/10'}`}>
              <Calendar className={darkMode ? 'text-blue-400' : 'text-blue-600'} size={24} />
            </div>
            <p className={`text-sm ${theme.textMuted}`}>{t.progress}</p>
          </div>
          <p className={`text-3xl font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
            {Math.round(progress)}%
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-6 shadow-lg`}>
        <div className="flex items-center justify-between mb-3">
          <span className={`text-sm font-semibold ${theme.text}`}>Overall Progress</span>
          <span className={`text-sm font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
            {emiSchedule.filter(e => e.status === 'paid').length} of {emiSchedule.length} EMIs paid
          </span>
        </div>
        <div className={`w-full h-4 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
          <div
            className="h-4 rounded-full bg-gradient-to-r from-green-500 to-green-600 transition-all shadow-lg"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* EMI Timeline */}
      <div>
        <h2 className={`text-xl font-bold ${theme.text} mb-4`}>Payment Timeline</h2>
        <div className="space-y-3">
          {emiSchedule.map((emi) => (
            <div
              key={emi.no}
              className={`${theme.cardBg} rounded-xl border ${theme.border} p-5 hover:scale-[1.02] transition-all shadow-md`}
            >
              <div className="flex items-center gap-4">
                {/* Status Icon */}
                <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                  emi.status === 'paid' 
                    ? 'bg-green-500 shadow-lg' 
                    : darkMode ? 'bg-gray-700' : 'bg-gray-200'
                }`}>
                  {emi.status === 'paid' ? (
                    <CheckCircle className="text-white" size={24} />
                  ) : (
                    <Circle className={theme.textMuted} size={24} />
                  )}
                </div>

                {/* EMI Info - Grid Layout */}
                <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className={`text-xs ${theme.textMuted} mb-1`}>{t.emiNo}</p>
                    <p className={`font-bold ${theme.text}`}>{emi.no}</p>
                  </div>
                  <div>
                    <p className={`text-xs ${theme.textMuted} mb-1`}>{t.amount}</p>
                    <p className={`font-bold ${theme.text}`}>₹{emi.amount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className={`text-xs ${theme.textMuted} mb-1`}>{t.dueDate}</p>
                    <p className={`font-semibold text-sm ${theme.text}`}>{emi.date}</p>
                  </div>
                  <div className="flex items-end justify-end">
                    <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${
                      emi.status === 'paid' 
                        ? 'bg-green-500/10 text-green-500' 
                        : 'bg-yellow-500/10 text-yellow-500'
                    }`}>
                      {emi.status === 'paid' ? t.paid : t.upcoming}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button className="py-4 rounded-xl font-bold text-lg bg-blue-500 hover:bg-blue-600 text-white transition-colors shadow-lg flex items-center justify-center gap-2">
          {t.payNow}
          <ArrowRight size={20} />
        </button>
        <button className={`py-4 rounded-xl font-semibold text-lg ${theme.text} ${theme.hover} border ${theme.border} transition-all`}>
          {t.downloadSchedule}
        </button>
      </div>
    </div>
  );
};

export default RepaymentTimeline;
