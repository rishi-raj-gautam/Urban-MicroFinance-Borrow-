import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Smartphone, ArrowRight, Globe } from 'lucide-react';

const Login = ({ onLogin }) => {
  const { theme, darkMode } = useTheme();
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [language, setLanguage] = useState('en');

  const text = {
    en: {
      welcome: 'Welcome Back',
      subtitle: 'Get instant micro-loans',
      phone: 'Mobile Number',
      phonePlaceholder: 'Enter 10-digit mobile number',
      sendOTP: 'Send OTP',
      otp: 'Enter OTP',
      otpPlaceholder: '6-digit OTP',
      verify: 'Verify & Login',
      resend: 'Resend OTP',
    },
    hi: {
      welcome: 'स्वागत है',
      subtitle: 'तुरंत माइक्रो-लोन प्राप्त करें',
      phone: 'मोबाइल नंबर',
      phonePlaceholder: '10 अंकों का मोबाइल नंबर दर्ज करें',
      sendOTP: 'OTP भेजें',
      otp: 'OTP दर्ज करें',
      otpPlaceholder: '6 अंकों का OTP',
      verify: 'सत्यापित करें और लॉगिन करें',
      resend: 'OTP फिर से भेजें',
    }
  };

  const t = text[language];

  const handleSendOTP = () => {
    if (phone.length === 10) {
      setOtpSent(true);
    }
  };

  const handleVerify = () => {
    if (otp.length === 6) {
      onLogin();
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${theme.bg} p-4`}>
      <div className={`w-full max-w-md ${theme.cardBg} rounded-2xl border ${theme.border} p-8 shadow-2xl`}>
        {/* Language Toggle */}
        <div className="flex justify-end mb-6">
          <button
            onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${theme.subtle} ${theme.hover}`}
          >
            <Globe size={18} className={darkMode ? 'text-blue-400' : 'text-blue-600'} />
            <span className={`text-sm font-medium ${theme.text}`}>
              {language === 'en' ? 'हिंदी' : 'English'}
            </span>
          </button>
        </div>

        {/* Logo & Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl mx-auto mb-4 flex items-center justify-center shadow-xl">
            <Smartphone className="text-white" size={40} />
          </div>
          <h1 className={`text-3xl font-bold ${theme.text} mb-2`}>{t.welcome}</h1>
          <p className={`${theme.textMuted}`}>{t.subtitle}</p>
        </div>

        {/* Phone Input */}
        {!otpSent ? (
          <div className="space-y-4">
            <div>
              <label className={`block text-sm font-semibold mb-2 ${theme.text}`}>
                {t.phone}
              </label>
              <input
                type="tel"
                maxLength="10"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                placeholder={t.phonePlaceholder}
                className={`w-full px-4 py-4 text-lg rounded-xl border ${theme.border} ${theme.bg} ${theme.text} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>
            <button
              onClick={handleSendOTP}
              disabled={phone.length !== 10}
              className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 ${
                phone.length === 10
                  ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              } transition-all`}
            >
              {t.sendOTP}
              <ArrowRight size={20} />
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className={`block text-sm font-semibold mb-2 ${theme.text}`}>
                {t.otp}
              </label>
              <input
                type="tel"
                maxLength="6"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                placeholder={t.otpPlaceholder}
                className={`w-full px-4 py-4 text-lg text-center tracking-widest rounded-xl border ${theme.border} ${theme.bg} ${theme.text} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>
            <button
              onClick={handleVerify}
              disabled={otp.length !== 6}
              className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 ${
                otp.length === 6
                  ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              } transition-all`}
            >
              {t.verify}
              <ArrowRight size={20} />
            </button>
            <button
              onClick={() => setOtpSent(false)}
              className={`w-full py-3 rounded-xl font-medium ${theme.text} ${theme.hover}`}
            >
              {t.resend}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
