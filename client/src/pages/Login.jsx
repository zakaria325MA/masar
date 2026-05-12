import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import API_URL from '../config';
import { X, Info, Phone, Mail, CheckCircle, AlertCircle, Globe } from 'lucide-react';
import '../massar.css';

const Login = () => {
  const [lang, setLang] = useState('fr'); // 'fr' or 'ar'
  const [isProf, setIsProf] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showForgotModal, setShowForgotModal] = useState(false);

  const t = {
    fr: {
      title: 'Portail Moutamadris',
      subtitle: 'Accédez à vos notes et votre parcours scolaire.',
      auth: 'Authentification',
      student: 'Élève',
      prof: 'Prof / Admin',
      label1: isProf ? 'Email / Nom d\'utilisateur' : 'Nom Complet',
      label2: isProf ? 'Mot de passe' : 'Code Masar',
      placeholder1: isProf ? 'admin@test.com' : 'Ex: Zakaria Mansour',
      placeholder2: isProf ? '••••••••' : 'Ex: STU123',
      login: 'Se connecter',
      forgot: 'Mot de passe oublié?',
      success: 'Bienvenue!',
      error: 'Erreur d\'authentification',
      modalTitle: 'Récupération de compte',
      modalText: 'Veuillez contacter l\'administration ISTA AZILAL pour réinitialiser votre code.',
      close: 'Fermer'
    },
    ar: {
      title: 'فضاء المتمدرس',
      subtitle: 'ولوج إلى نقطكم ومساركم الدراسي.',
      auth: 'تسجيل الدخول',
      student: 'تلميذ',
      prof: 'أستاذ / مدير',
      label1: isProf ? 'البريد الإلكتروني' : 'الاسم الكامل',
      label2: isProf ? 'كلمة المرور' : 'رمز مسار',
      placeholder1: isProf ? 'admin@test.com' : 'مثال: زكرياء منصور',
      placeholder2: isProf ? '••••••••' : 'مثال: STU123',
      login: 'تسجيل الدخول',
      forgot: 'نسيت كلمة المرور؟',
      success: 'مرحبا بك!',
      error: 'خطأ في تسجيل الدخول',
      modalTitle: 'استرجاع الحساب',
      modalText: 'يرجى الاتصال بإدارة ISTA AZILAL لإعادة تعيين الرمز الخاص بك.',
      close: 'إغلاق'
    }
  };

  const curr = t[lang];

  useEffect(() => {
    if (error) setError('');
  }, [email, password]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    setTimeout(() => {
      if (isProf && email === 'admin@test.com' && password === '123456') {
        localStorage.setItem('role', 'admin');
        setSuccess(curr.success);
        setTimeout(() => window.location.href = '/dashboard-admin', 1000);
        return;
      }
      if (isProf && email === 'prof@test.com' && password === '123456') {
        localStorage.setItem('role', 'prof');
        setSuccess(curr.success);
        setTimeout(() => window.location.href = '/dashboard-prof', 1000);
        return;
      }

      if (!isProf) {
        const students = JSON.parse(localStorage.getItem('massar_students')) || [];
        const student = students.find(s => s.name.toLowerCase() === email.trim().toLowerCase() && s.code === password.trim());
        if (student) {
          localStorage.setItem('currentStudent', JSON.stringify(student));
          localStorage.setItem('role', 'student');
          setSuccess(`${curr.success} ${student.name}`);
          setTimeout(() => window.location.href = '/dashboard-student', 1000);
        } else {
          setError(lang === 'fr' ? 'Smiya wlla Code ghaltin!' : 'الاسم أو الرمز غير صحيح!');
          setLoading(false);
        }
      } else {
        setError(lang === 'fr' ? 'Email wlla password ghaltin!' : 'البريد الإلكتروني أو كلمة المرور غير صحيحة!');
        setLoading(false);
      }
    }, 800);
  };

  return (
    <div className={`massar-body ${lang === 'ar' ? 'rtl' : ''}`} style={{ direction: lang === 'ar' ? 'rtl' : 'ltr' }}>
      {/* Language Switcher */}
      <div style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 1000 }}>
        <button onClick={() => setLang(lang === 'fr' ? 'ar' : 'fr')} style={{ background: 'white', border: '1px solid #e2e8f0', padding: '8px 16px', borderRadius: '100px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: 'bold', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
          <Globe size={18} /> {lang === 'fr' ? 'العربية' : 'Français'}
        </button>
      </div>

      <AnimatePresence>
        {success && (
          <motion.div initial={{ y: -100 }} animate={{ y: 20 }} exit={{ y: -100 }} style={{ position: 'fixed', top: 0, left: '50%', transform: 'translateX(-50%)', background: '#10b981', color: 'white', padding: '12px 24px', borderRadius: '12px', zIndex: 10000, display: 'flex', gap: '10px', fontWeight: 'bold' }}><CheckCircle /> {success}</motion.div>
        )}
        {error && (
          <motion.div initial={{ y: -100 }} animate={{ y: 20 }} exit={{ y: -100 }} style={{ position: 'fixed', top: 0, left: '50%', transform: 'translateX(-50%)', background: '#ef4444', color: 'white', padding: '12px 24px', borderRadius: '12px', zIndex: 10000, display: 'flex', gap: '10px', fontWeight: 'bold' }}><AlertCircle /> {error}</motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showForgotModal && (
          <div className="modal-overlay" style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="massar-form-box" style={{ background: 'white', padding: '40px', borderRadius: '16px', position: 'relative', textAlign: 'center' }}>
              <button onClick={() => setShowForgotModal(false)} style={{ position: 'absolute', right: '20px', top: '20px', border: 'none', background: 'none' }}><X /></button>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#0f172a' }}>{curr.modalTitle}</h2>
              <p style={{ color: '#475569', marginTop: '15px' }}>{curr.modalText}</p>
              <button className="massar-btn" style={{ marginTop: '20px' }} onClick={() => setShowForgotModal(false)}>{curr.close}</button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="massar-container">
        <div className="massar-left">
          <img src="/massar_logo.png" alt="Logo" className="massar-logo-large" style={{ filter: 'brightness(0) invert(1)' }} />
          <h1 style={{ fontSize: '2.5rem', fontWeight: '800', textAlign: 'center' }}>{curr.title}</h1>
          <p style={{ marginTop: '10px', opacity: '0.8', textAlign: 'center' }}>{curr.subtitle}</p>
        </div>
        <div className="massar-right">
          <div className="massar-form-box">
            <div className="massar-header">
              <img src="/massar_logo.png" alt="Logo" style={{ width: '150px', marginBottom: '20px' }} />
              <h2 className="massar-title" style={{ color: '#0f172a' }}>{curr.auth}</h2>
              <div style={{ display: 'flex', background: '#f1f5f9', padding: '4px', borderRadius: '8px', marginTop: '20px' }}>
                <button type="button" onClick={() => setIsProf(false)} style={{ flex: 1, padding: '8px', border: 'none', borderRadius: '6px', backgroundColor: !isProf ? 'white' : 'transparent', color: !isProf ? 'var(--massar-blue)' : '#64748b', fontWeight: '600', cursor: 'pointer' }}>{curr.student}</button>
                <button type="button" onClick={() => setIsProf(true)} style={{ flex: 1, padding: '8px', border: 'none', borderRadius: '6px', backgroundColor: isProf ? 'white' : 'transparent', color: isProf ? 'var(--massar-blue)' : '#64748b', fontWeight: '600', cursor: 'pointer' }}>{curr.prof}</button>
              </div>
            </div>
            <form onSubmit={handleLogin} style={{ marginTop: '30px' }}>
              <label className="massar-label">{curr.label1}</label>
              <input type="text" className="massar-input" placeholder={curr.placeholder1} value={email} onChange={(e) => setEmail(e.target.value)} required />
              <label className="massar-label">{curr.label2}</label>
              <input type={isProf ? "password" : "text"} className="massar-input" placeholder={curr.placeholder2} value={password} onChange={(e) => setPassword(e.target.value)} required />
              <button type="submit" className="massar-btn" disabled={loading}>{loading ? (lang === 'fr' ? 'Connexion...' : 'جاري الاتصال...') : curr.login}</button>
            </form>
            <div className="massar-footer">
              <button onClick={() => setShowForgotModal(true)} style={{ background: 'none', border: 'none', color: 'var(--massar-blue)', cursor: 'pointer', fontWeight: 'bold' }}>{curr.forgot}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
