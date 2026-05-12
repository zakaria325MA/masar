import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import API_URL from '../config';
import { LogOut, GraduationCap, Award, Calendar, Bell, Printer, User, UserX, Globe } from 'lucide-react';
import '../dashboard.css';

const StudentDashboard = () => {
  const [lang, setLang] = useState('fr'); 
  const [activeTab, setActiveTab] = useState('notes');
  const [studentData, setStudentData] = useState(null);
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const stored = JSON.parse(localStorage.getItem('currentStudent'));
      if (!stored) { window.location.href = '/login'; return; }

      const [sRes, aRes] = await Promise.all([
        axios.get(`${API_URL}/students`),
        axios.get(`${API_URL}/announcements`)
      ]);
      
      const current = sRes.data.find(s => s._id === (stored._id || stored.id));
      setStudentData(current || stored);
      setAnnouncements(aRes.data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  if (loading) return <div className="dashboard-container" style={{display:'flex', alignItems:'center', justifyContent:'center'}}>Chargement...</div>;

  const t = {
    fr: { notes: 'Mes Notes', announces: 'Annonces', logout: 'Déconnexion', title: 'Espace Élève', absences: 'Absences', print: 'Imprimer', infoTitle: 'Informations Personnelles', labelName: 'NOM COMPLET', labelCode: 'CODE MASAR', labelGroup: 'GROUPE', tableHeader: 'Bulletin de Notes', colModule: 'Module', colNote: 'Note /20', colResult: 'Résultat', valid: 'Validé', fail: 'Échec', noNotes: 'Aucune note.', lastAnnounces: 'Dernières Annonces', noAnnounces: 'Aucun avis.' },
    ar: { notes: 'نقطي', announces: 'إعلانات', logout: 'خروج', title: 'فضاء التلميذ', absences: 'غياب', print: 'طباعة', infoTitle: 'المعلومات الشخصية', labelName: 'الاسم الكامل', labelCode: 'رمز مسار', labelGroup: 'القسم', tableHeader: 'بيان النقط', colModule: 'المادة', colNote: 'النقطة', colResult: 'النتيجة', valid: 'مستوفاة', fail: 'غير مستوفاة', noNotes: 'لا توجد نقط.', lastAnnounces: 'آخر الإعلانات', noAnnounces: 'لا توجد إعلانات.' }
  };
  const curr = t[lang];

  return (
    <div className={`dashboard-container ${lang === 'ar' ? 'rtl' : ''}`} style={{ direction: lang === 'ar' ? 'rtl' : 'ltr' }}>
      <aside className="sidebar no-print" style={{ background: 'linear-gradient(180deg, #1e1b4b 0%, #312e81 100%)' }}>
        <div className="sidebar-logo"><span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Massar Pro</span></div>
        <div style={{ padding: '20px', textAlign: 'center' }}><div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'white', margin: '0 auto 10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><User size={35} color="#1e1b4b" /></div><p style={{ color: 'white', fontWeight: 'bold' }}>{studentData.name}</p></div>
        <nav style={{ flex: 1 }}>
          <button onClick={() => setActiveTab('notes')} className={`nav-link ${activeTab === 'notes' ? 'active' : ''}`}><GraduationCap size={20} /> <span>{curr.notes}</span></button>
          <button onClick={() => setActiveTab('announces')} className={`nav-link ${activeTab === 'announces' ? 'active' : ''}`}><Bell size={20} /> <span>{curr.announces}</span></button>
        </nav>
        <button onClick={() => setLang(lang === 'fr' ? 'ar' : 'fr')} style={{ margin: '10px 20px', background: 'rgba(255,255,255,0.1)', border: 'none', padding: '10px', borderRadius: '8px', color: 'white', cursor: 'pointer' }}><Globe size={18} /> {lang === 'fr' ? 'العربية' : 'Français'}</button>
        <button className="nav-link" style={{color:'#f87171'}} onClick={() => { localStorage.clear(); window.location.href = '/login'; }}><LogOut size={20} /> <span>{curr.logout}</span></button>
      </aside>
      <main className="main-content">
        <header className="dashboard-header no-print"><div><h1>{curr.title}</h1><p>ISTA AZILAL</p></div><div style={{display:'flex', gap:'15px'}}><div className="stat-card" style={{background:'white', border: '1px solid #e2e8f0'}}><div className="stat-icon" style={{background:'#fee2e2', color:'#ef4444'}}><UserX size={20} /></div><div><p style={{fontSize:'0.7rem', margin:0}}>{curr.absences}</p><p style={{fontSize:'1.1rem', fontWeight:'bold', margin:0}}>{studentData.absences || 0}h</p></div></div><button className="btn-primary" onClick={() => window.print()}><Printer size={18} /> {curr.print}</button></div></header>
        {activeTab === 'notes' ? (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2.5fr', gap: '30px' }}>
            <div className="glass-card" style={{ padding: '30px', background: 'white', border: '1px solid #e2e8f0' }}><h3 style={{fontWeight:'800', color: '#0f172a', marginBottom: '25px'}}>{curr.infoTitle}</h3><div style={{display: 'flex', flexDirection: 'column', gap: '20px'}}><div><p style={{fontSize: '0.8rem', color: '#64748b'}}>{curr.labelName}</p><p style={{fontWeight:'700', color: '#0f172a'}}>{studentData.name}</p></div><div><p style={{fontSize: '0.8rem', color: '#64748b'}}>{curr.labelCode}</p><p style={{fontWeight:'700', color: '#4338ca'}}>{studentData.code}</p></div><div><p style={{fontSize: '0.8rem', color: '#64748b'}}>{curr.labelGroup}</p><p style={{fontWeight:'700', color: '#0f172a'}}>{studentData.group}</p></div></div></div>
            <div className="data-table-container"><div className="table-header"><h2>{curr.tableHeader}</h2></div><table className="data-table"><thead><tr><th>{curr.colModule}</th><th>{curr.colNote}</th><th>{curr.colResult}</th></tr></thead><tbody>{studentData.grades && Object.entries(studentData.grades).map(([m, n], i) => (<tr key={i}><td>{m}</td><td style={{fontWeight:'800', color: n >= 10 ? '#10b981' : '#ef4444'}}>{n}</td><td><span style={{padding: '4px 12px', borderRadius: '100px', background: n >= 10 ? '#d1fae5' : '#fee2e2', color: n >= 10 ? '#065f46' : '#991b1b'}}>{n >= 10 ? curr.valid : curr.fail}</span></td></tr>))}</tbody></table></div>
          </div>
        ) : (
          <div className="data-table-container"><div className="table-header"><h2>{curr.lastAnnounces}</h2></div><div style={{padding:'20px'}}>{announcements.map(a => (<div key={a._id} className="glass-card" style={{marginBottom:'15px', padding:'20px', borderLeft: '5px solid #312e81', background: '#f8fafc'}}><h4 style={{fontWeight:'800'}}>{a.title}</h4><p>{a.content}</p></div>))}</div></div>
        )}
      </main>
    </div>
  );
};

export default StudentDashboard;
