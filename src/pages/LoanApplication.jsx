import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { IndianRupee, ChevronDown, ArrowRight, Calendar, TrendingUp } from 'lucide-react';

const LoanApplication = () => {
  const { theme, darkMode } = useTheme();
  const navigate = useNavigate();
  const [language, setLanguage] = useState('en');
  const [amount, setAmount] = useState(15000);
  const [purpose, setPurpose] = useState('');
  const [tenure, setTenure] = useState(6);

  const text = {
    en: {
      title: 'Apply for Loan',
      subtitle: 'Get instant approval in minutes',
      loanAmount: 'Loan Amount',
      purpose: 'Loan Purpose',
      selectPurpose: 'Select Purpose',
      tenure: 'Repayment Tenure',
      months: 'months',
      emi: 'Monthly EMI',
      totalRepay: 'Total Repayment',
      interest: 'Interest Rate',
      apply: 'Submit Application',
      purposes: {
        business: 'Business Expansion',
        medical: 'Medical Emergency',
        education: 'Education',
        personal: 'Personal Use',
        agriculture: 'Agriculture',
        wedding: 'Wedding Expenses',
      }
    },
    hi: {
      title: 'ऋण के लिए आवेदन करें',
      subtitle: 'मिनटों में तुरंत स्वीकृति पाएं',
      loanAmount: 'ऋण राशि',
      purpose: 'ऋण का उद्देश्य',
      selectPurpose: 'उद्देश्य चुनें',
      tenure: 'पुनर्भुगतान अवधि',
      months: 'महीने',
      emi: 'मासिक EMI',
      totalRepay: 'कुल पुनर्भुगतान',
      interest: 'ब्याज दर',
      apply: 'आवेदन जमा करें',
      purposes: {
        business: 'व्यवसाय विस्तार',
        medical: 'चिकित्सा आपातकाल',
        education: 'शिक्षा',
        personal: 'व्यक्तिगत उपयोग',
        agriculture: 'कृषि',
        wedding: 'शादी के खर्च',
      }
    }
  };

  const t = text[language];

  const calculateEMI = () => {
    const interest = 0.12;
    const monthlyRate = interest / 12;
    const emi = (amount * monthlyRate * Math.pow(1 + monthlyRate, tenure)) / 
                (Math.pow(1 + monthlyRate, tenure) - 1);
    return Math.round(emi);
  };

  const emi = calculateEMI();
  const totalRepayment = emi * tenure;

  const handleSubmit = () => {
    if (purpose) {
      alert('Loan application submitted successfully!');
      navigate('/loans');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className={`text-3xl font-bold ${theme.text}`}>{t.title}</h1>
        <p className={`${theme.textMuted} mt-1`}>{t.subtitle}</p>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Input Fields */}
        <div className="space-y-6">
          {/* Loan Amount Slider */}
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-6 shadow-lg`}>
            <label className={`block text-sm font-semibold mb-3 ${theme.text}`}>
              {t.loanAmount}
            </label>
            <div className="text-center mb-6">
              <span className={`text-5xl font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                ₹{amount.toLocaleString()}
              </span>
            </div>
            <input
              type="range"
              min="5000"
              max="50000"
              step="1000"
              value={amount}
              onChange={(e) => setAmount(parseInt(e.target.value))}
              className="w-full h-3 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
            <div className="flex justify-between mt-3">
              <span className={`text-sm font-medium ${theme.textMuted}`}>₹5,000</span>
              <span className={`text-sm font-medium ${theme.textMuted}`}>₹50,000</span>
            </div>
          </div>

          {/* Purpose Dropdown */}
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-6 shadow-lg`}>
            <label className={`block text-sm font-semibold mb-3 ${theme.text}`}>
              {t.purpose}
            </label>
            <div className="relative">
              <select
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                className={`w-full px-4 py-4 text-lg rounded-xl border ${theme.border} ${theme.bg} ${theme.text} appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500`}
              >
                <option value="">{t.selectPurpose}</option>
                {Object.entries(t.purposes).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
              <ChevronDown className={`absolute right-4 top-1/2 -translate-y-1/2 ${theme.textMuted} pointer-events-none`} size={24} />
            </div>
          </div>

          {/* Tenure Selection */}
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-6 shadow-lg`}>
            <label className={`block text-sm font-semibold mb-4 ${theme.text}`}>
              {t.tenure}
            </label>
            <div className="grid grid-cols-4 gap-3">
              {[3, 6, 9, 12].map((month) => (
                <button
                  key={month}
                  onClick={() => setTenure(month)}
                  className={`py-4 rounded-xl font-bold text-lg transition-all ${
                    tenure === month
                      ? 'bg-blue-500 text-white shadow-lg scale-105'
                      : `${theme.subtle} ${theme.text} ${theme.hover}`
                  }`}
                >
                  {month}
                  <div className="text-xs font-normal mt-1">{t.months}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Loan Summary */}
        <div className="space-y-6">
          {/* EMI Details Card */}
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-6 shadow-lg`}>
            <h3 className={`text-lg font-bold ${theme.text} mb-6`}>Loan Summary</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar size={20} className={darkMode ? 'text-blue-400' : 'text-blue-600'} />
                  <span className={`${theme.textMuted}`}>{t.emi}</span>
                </div>
                <span className={`text-2xl font-bold ${theme.text}`}>₹{emi.toLocaleString()}</span>
              </div>

              <div className={`h-px ${theme.border}`} />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp size={20} className={darkMode ? 'text-blue-400' : 'text-blue-600'} />
                  <span className={`${theme.textMuted}`}>{t.totalRepay}</span>
                </div>
                <span className={`text-2xl font-bold ${theme.text}`}>₹{totalRepayment.toLocaleString()}</span>
              </div>

              <div className={`h-px ${theme.border}`} />

              <div className="flex items-center justify-between">
                <span className={`${theme.textMuted}`}>{t.interest}</span>
                <span className={`text-lg font-bold text-green-500`}>12% p.a.</span>
              </div>
            </div>
          </div>

          {/* Breakdown Card */}
          <div className={`${theme.cardBg} rounded-2xl border ${theme.border} p-6 shadow-lg`}>
            <h3 className={`text-lg font-bold ${theme.text} mb-4`}>Payment Breakdown</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className={`${theme.textMuted}`}>Principal Amount</span>
                <span className={`font-semibold ${theme.text}`}>₹{amount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className={`${theme.textMuted}`}>Total Interest</span>
                <span className={`font-semibold ${theme.text}`}>₹{(totalRepayment - amount).toLocaleString()}</span>
              </div>
              <div className={`h-px ${theme.border}`} />
              <div className="flex justify-between">
                <span className={`font-semibold ${theme.text}`}>Total Payable</span>
                <span className={`text-xl font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                  ₹{totalRepayment.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={!purpose}
            className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 ${
              purpose
                ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            } transition-all`}
          >
            {t.apply}
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoanApplication;
