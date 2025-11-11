import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Bell, AlertCircle, CheckCircle, Info, X } from 'lucide-react';

const Notifications = () => {
  const { theme, darkMode } = useTheme();
  const [language, setLanguage] = useState('en');

  const text = {
    en: {
      title: 'Notifications',
      subtitle: 'Stay updated with your loan activities',
      markAllRead: 'Mark All as Read',
      clearAll: 'Clear All',
    },
    hi: {
      title: 'सूचनाएं',
      subtitle: 'अपनी ऋण गतिविधियों से अपडेट रहें',
      markAllRead: 'सभी को पढ़ा हुआ चिह्नित करें',
      clearAll: 'सभी साफ़ करें',
    }
  };

  const t = text[language];

  const notifications = [
    {
      type: 'warning',
      icon: AlertCircle,
      color: 'text-orange-500',
      bg: 'bg-orange-500/10',
      titleEn: 'EMI Due Soon',
      titleHi: 'EMI जल्द देय',
      messageEn: 'Your next EMI of ₹2,150 is due on 15 Dec 2025',
      messageHi: 'आपकी अगली EMI ₹2,150 की 15 दिसंबर 2025 को देय है',
      time: '2h ago',
      unread: true,
    },
    {
      type: 'success',
      icon: CheckCircle,
      color: 'text-green-500',
      bg: 'bg-green-500/10',
      titleEn: 'Payment Successful',
      titleHi: 'भुगतान सफल',
      messageEn: 'EMI 2 of ₹2,150 paid successfully',
      messageHi: 'EMI 2 ₹2,150 की सफलतापूर्वक भुगतान किया गया',
      time: '1 day ago',
      unread: true,
    },
    {
      type: 'info',
      icon: Info,
      color: 'text-blue-500',
      bg: 'bg-blue-500/10',
      titleEn: 'Loan Approved',
      titleHi: 'ऋण स्वीकृत',
      messageEn: 'Your loan application LA002 has been approved for ₹15,000',
      messageHi: 'आपका ऋण आवेदन LA002 ₹15,000 के लिए स्वीकृत कर दिया गया है',
      time: '2 days ago',
      unread: false,
    },
    {
      type: 'info',
      icon: Bell,
      color: 'text-blue-500',
      bg: 'bg-blue-500/10',
      titleEn: 'Document Verification Complete',
      titleHi: 'दस्तावेज़ सत्यापन पूर्ण',
      messageEn: 'Your KYC documents have been verified successfully',
      messageHi: 'आपके KYC दस्तावेज़ सफलतापूर्वक सत्यापित हो गए हैं',
      time: '3 days ago',
      unread: false,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className={`text-3xl font-bold ${theme.text}`}>{t.title}</h1>
          <p className={`${theme.textMuted} mt-1`}>{t.subtitle}</p>
        </div>
        <div className="flex gap-2">
          <button className={`px-4 py-2 rounded-lg text-sm font-medium ${darkMode ? 'text-blue-400' : 'text-blue-600'} ${theme.hover}`}>
            {t.markAllRead}
          </button>
        </div>
      </div>

      {/* Notifications Grid */}
      <div className="grid grid-cols-1 gap-4">
        {notifications.map((notif, index) => (
          <div
            key={index}
            className={`${theme.cardBg} rounded-xl border ${theme.border} p-5 hover:scale-[1.01] transition-all shadow-md ${
              notif.unread ? 'border-l-4 border-l-blue-500' : ''
            }`}
          >
            <div className="flex items-start gap-4">
              {/* Icon */}
              <div className={`${notif.bg} w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0`}>
                <notif.icon className={notif.color} size={24} />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <h3 className={`font-bold ${theme.text}`}>
                    {language === 'en' ? notif.titleEn : notif.titleHi}
                  </h3>
                  {notif.unread && (
                    <div className="w-2.5 h-2.5 bg-blue-500 rounded-full flex-shrink-0 ml-2"></div>
                  )}
                </div>
                <p className={`text-sm ${theme.textMuted} mb-2`}>
                  {language === 'en' ? notif.messageEn : notif.messageHi}
                </p>
                <div className="flex items-center justify-between">
                  <p className={`text-xs ${theme.textMuted}`}>{notif.time}</p>
                  <button className={`p-1 rounded ${theme.hover}`}>
                    <X size={16} className={theme.textMuted} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Clear All Button */}
      <button className={`w-full py-3 rounded-xl font-medium ${theme.text} ${theme.hover} border ${theme.border} transition-all`}>
        {t.clearAll}
      </button>
    </div>
  );
};

export default Notifications;
