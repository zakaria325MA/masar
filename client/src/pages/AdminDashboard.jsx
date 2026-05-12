import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import API_URL from '../config';
import { Users, Shield, LogOut, Plus, Trash2, Key, Search, CheckCircle, X, Bell, Edit3 } from 'lucide-react';
import '../dashboard.css';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('students');
  const [students, setStudents] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showGradeModal, setShowGradeModal] = useState(false);
  const [showAnnounceModal, setShowAnnounceModal] = useState(false);
  
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [gradeForm, setGradeForm] = useState({ subject: '', note: '', absences: 0 });
  const [newStudent, setNewStudent] = useState({ name: '', group: '', code: '', password: '123' });
  const [announceForm, setAnnounceForm] = useState({ title: '', content: '' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [sRes, aRes] = await Promise.all([
        axios.get(`${API_URL}/students`),
        axios.get(`${API_URL}/announcements`)
      ]);
      setStudents(sRes.data);
      setAnnouncements(aRes.data);
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddStudent = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/students`, newStudent);
      setShowAddModal(false);
      setNewStudent({ name: '', group: '', code: '', password: '123' });
      setShowToast('Élève ajouté!');
      fetchData();
    } catch (err) { alert('Error'); }
  };

  const handlePostAnnouncement = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/announcements`, announceForm);
      setShowAnnounceModal(false);
      setAnnounceForm({ title: '', content: '' });
      setShowToast('Annonce publiée!');
      fetchData();
    } catch (err) { alert('Error'); }
  };

  const handleUpdateData = async (e) => {
    e.preventDefault();
    try {
      const updatedGrades = gradeForm.subject ? { ...(selectedStudent.grades || {}), [gradeForm.subject]: gradeForm.note } : selectedStudent.grades;
      await axios.put(`${API_URL}/students/${selectedStudent._id}`, { 
        grades: updatedGrades,
        absences: gradeForm.absences
      });
      setShowGradeModal(false);
      setShowToast('Modifications enregistrées!');
      fetchData();
    } catch (err) { alert('Error'); }
  };

  const handleDeleteStudent = async (id) => {
    if(window.confirm('Supprimer?')) {
      await axios.delete(`${API_URL}/students/${id}`);
      fetchData();
    }
  };

  if (loading) return <div className="dashboard-container" style={{display:'flex', alignItems:'center', justifyContent:'center'}}>Chargement...</div>;

  return (
    <div className="dashboard-container">
      <AnimatePresence>
        {showToast && (
          <motion.div initial={{ y: -50 }} animate={{ y: 20 }} exit={{ y: -50 }} className="toast" style={{ position: 'fixed', top: 0, left: '50%', transform: 'translateX(-50%)', backgroundColor: '#10b981', color: 'white', padding: '12px 24px', borderRadius: '12px', zIndex: 6000 }}><CheckCircle size={20} /> {showToast}</motion.div>
        )}
      </AnimatePresence>

      <aside className="sidebar" style={{ background: '#0f172a' }}>
        <div className="sidebar-logo"><Shield size={32} color="#818cf8" /> <span style={{fontWeight:'bold'}}>Admin</span></div>
        <nav style={{flex:1}}>
          <button onClick={() => setActiveTab('students')} className={`nav-link ${activeTab === 'students' ? 'active' : ''}`} style={{width:'100%', border:'none', background:'none', textAlign:'left', cursor:'pointer'}}><Users size={20}/> <span>Élèves</span></button>
          <button onClick={() => setActiveTab('announcements')} className={`nav-link ${activeTab === 'announcements' ? 'active' : ''}`} style={{width:'100%', border:'none', background:'none', textAlign:'left', cursor:'pointer'}}><Bell size={20}/> <span>Annonces</span></button>
        </nav>
        <button className="nav-link" onClick={() => window.location.href='/login'} style={{width:'100%', border:'none', background:'none', color:'#f87171', cursor:'pointer'}}><LogOut size={20}/> <span>Déconnexion</span></button>
      </aside>

      <main className="main-content">
        <header className="dashboard-header"><div><h1>{activeTab === 'students' ? 'Élèves' : 'Annonces'}</h1><p>Administration ISTA AZILAL</p></div></header>

        {activeTab === 'students' ? (
          <div className="data-table-container">
            <div className="table-header"><button className="btn-primary" onClick={() => setShowAddModal(true)}><Plus size={18} /> Ajouter</button></div>
            <table className="data-table">
              <thead><tr><th>Nom</th><th>Groupe</th><th>Code</th><th>Absences</th><th>Notes</th><th style={{textAlign:'center'}}>Actions</th></tr></thead>
              <tbody>
                {students.map(s => (
                  <tr key={s._id}>
                    <td><b>{s.name}</b></td><td>{s.group}</td>
                    <td><div className="badge"><Key size={14} /> {s.code}</div></td>
                    <td style={{textAlign:'center'}}><b>{s.absences || 0}h</b></td>
                    <td>{s.grades && Object.entries(s.grades).map(([m, n], i) => <div key={i} style={{fontSize:'0.7rem'}}>{m}: {n}</div>)}</td>
                    <td style={{ textAlign: 'center' }}>
                      <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
                        <button className="btn-save" onClick={() => { setSelectedStudent(s); setGradeForm({subject:'', note:'', absences: s.absences||0}); setShowGradeModal(true); }}><Edit3 size={20}/></button>
                        <button style={{color:'#ef4444'}} onClick={() => handleDeleteStudent(s._id)}><Trash2 size={20}/></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="data-table-container">
            <div className="table-header"><button className="btn-primary" onClick={() => setShowAnnounceModal(true)}><Plus size={18} /> Publier</button></div>
            <div style={{padding:'24px'}}>
              {announcements.map(a => (
                <div key={a._id} className="glass-card" style={{marginBottom:'15px', padding:'15px', borderLeft:'5px solid #6366f1'}}>
                   <h4>{a.title}</h4><p>{a.content}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Grade Modal */}
      <AnimatePresence>
        {showGradeModal && (
          <div className="modal-overlay" style={{position:'fixed', inset:0, background:'rgba(0,0,0,0.5)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:5000}}>
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="glass-card" style={{background:'white', padding:'30px', borderRadius:'16px', width:'400px'}}>
              <div style={{display:'flex', justifyContent:'space-between', marginBottom:'20px'}}><h3>Modifier: {selectedStudent?.name}</h3><button onClick={() => setShowGradeModal(false)}><X/></button></div>
              <form onSubmit={handleUpdateData}>
                <label className="massar-label">Absences (h)</label>
                <input type="number" className="massar-input" value={gradeForm.absences} onChange={e => setGradeForm({...gradeForm, absences: parseInt(e.target.value)||0})} />
                <label className="massar-label">Matière</label>
                <input className="massar-input" value={gradeForm.subject} onChange={e => setGradeForm({...gradeForm, subject: e.target.value})} />
                <label className="massar-label">Note /20</label>
                <input type="number" className="massar-input" value={gradeForm.note} onChange={e => setGradeForm({...gradeForm, note: e.target.value})} />
                <button type="submit" className="btn-primary" style={{width:'100%', marginTop:'15px'}}>Sauvegarder</button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;
