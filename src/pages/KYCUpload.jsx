import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { Upload, Camera, FileText, CheckCircle, X, ArrowRight } from 'lucide-react';

const KYCUpload = () => {
  const { theme, darkMode } = useTheme();
  const navigate = useNavigate();
  const [language, setLanguage] = useState('en');
  const [documents, setDocuments] = useState({
    aadhaar: null,
    pan: null,
    selfie: null,
  });

  const text = {
    en: {
      title: 'Complete KYC Verification',
      subtitle: 'Upload your documents to verify identity',
      aadhaar: 'Aadhaar Card',
      aadhaarDesc: 'Front & back side of Aadhaar',
      pan: 'PAN Card',
      panDesc: 'Clear image of PAN card',
      selfie: 'Selfie with ID',
      selfieDesc: 'Take a selfie holding your ID',
      upload: 'Click to Upload',
      uploaded: 'Uploaded',
      change: 'Change Document',
      continue: 'Submit & Continue',
      skip: 'Skip for Now',
    },
    hi: {
      title: 'KYC सत्यापन पूरा करें',
      subtitle: 'पहचान सत्यापित करने के लिए अपने दस्तावेज़ अपलोड करें',
      aadhaar: 'आधार कार्ड',
      aadhaarDesc: 'आधार का आगे और पीछे का भाग',
      pan: 'पैन कार्ड',
      panDesc: 'पैन कार्ड की स्पष्ट तस्वीर',
      selfie: 'ID के साथ सेल्फी',
      selfieDesc: 'अपनी ID पकड़कर सेल्फी लें',
      upload: 'अपलोड करने के लिए क्लिक करें',
      uploaded: 'अपलोड किया गया',
      change: 'दस्तावेज़ बदलें',
      continue: 'जमा करें और जारी रखें',
      skip: 'अभी छोड़ें',
    }
  };

  const t = text[language];

  const docs = [
    { key: 'aadhaar', label: t.aadhaar, desc: t.aadhaarDesc, icon: FileText, color: 'from-blue-500 to-blue-600' },
    { key: 'pan', label: t.pan, desc: t.panDesc, icon: FileText, color: 'from-green-500 to-green-600' },
    { key: 'selfie', label: t.selfie, desc: t.selfieDesc, icon: Camera, color: 'from-purple-500 to-purple-600' },
  ];

  const handleUpload = (key, file) => {
    setDocuments({ ...documents, [key]: file });
  };

  const allUploaded = Object.values(documents).every(doc => doc !== null);

  const handleSubmit = () => {
    navigate('/dashboard');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className={`text-3xl font-bold ${theme.text}`}>{t.title}</h1>
        <p className={`${theme.textMuted} mt-1`}>{t.subtitle}</p>
      </div>

      {/* Progress Indicator */}
      <div className="flex items-center gap-2">
        {Object.values(documents).map((doc, index) => (
          <div
            key={index}
            className={`h-2 flex-1 rounded-full ${
              doc ? 'bg-green-500' : darkMode ? 'bg-gray-700' : 'bg-gray-200'
            }`}
          />
        ))}
      </div>

      {/* Document Upload Cards - Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {docs.map((doc) => (
          <div key={doc.key} className={`${theme.cardBg} rounded-2xl border ${theme.border} p-6 shadow-lg`}>
            <div className="flex items-start justify-between mb-4">
              <div className={`bg-gradient-to-br ${doc.color} w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl`}>
                <doc.icon className="text-white" size={28} />
              </div>
              {documents[doc.key] && (
                <CheckCircle className="text-green-500" size={28} />
              )}
            </div>

            <div className="mb-4">
              <h3 className={`font-bold text-lg ${theme.text} mb-1`}>{doc.label}</h3>
              <p className={`text-sm ${theme.textMuted}`}>{doc.desc}</p>
            </div>

            {documents[doc.key] && (
              <div className={`p-3 rounded-xl mb-3 ${theme.subtle}`}>
                <p className={`text-sm ${theme.text} truncate`}>{documents[doc.key].name}</p>
                <p className={`text-xs ${theme.textMuted}`}>{(documents[doc.key].size / 1024).toFixed(2)} KB</p>
              </div>
            )}

            {!documents[doc.key] ? (
              <label className={`block w-full py-4 rounded-xl border-2 border-dashed ${theme.border} ${theme.hover} cursor-pointer text-center transition-all`}>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleUpload(doc.key, e.target.files[0])}
                />
                <Upload className={`mx-auto mb-2 ${theme.textMuted}`} size={28} />
                <span className={`font-semibold ${theme.text}`}>{t.upload}</span>
              </label>
            ) : (
              <button
                onClick={() => setDocuments({ ...documents, [doc.key]: null })}
                className={`w-full py-3 rounded-xl ${theme.subtle} ${theme.hover} font-semibold ${theme.text} transition-all`}
              >
                {t.change}
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={handleSubmit}
          disabled={!allUploaded}
          className={`flex-1 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 ${
            allUploaded
              ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          } transition-all`}
        >
          {t.continue}
          <ArrowRight size={20} />
        </button>
        <button
          onClick={() => navigate('/dashboard')}
          className={`py-4 px-6 rounded-xl font-semibold ${theme.text} ${theme.hover} border ${theme.border} transition-all`}
        >
          {t.skip}
        </button>
      </div>
    </div>
  );
};

export default KYCUpload;
