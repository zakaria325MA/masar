import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import API_URL from '../config';
import { Users, LogOut, Save, CheckCircle } from 'lucide-react';
import '../dashboard.css';

const ProfDashboard = () => {
  const [students, setStudents] = useState([]);
  const [subject, setSubject] = useState('Mathématiques');
  const [loading, setLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(`${API_URL}/students`);
      setStudents(response.data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const handleGradeChange = (id, value) => {
    setStudents(students.map(s => s._id === id ? { ...s, grades: { ...(s.grades || {}), [subject]: value } } : s));
  };

  const handleAbsenceChange = (id, increment) => {
    setStudents(students.map(s => s._id === id ? { ...s, absences: Math.max(0, (s.absences || 0) + increment) } : s));
  };

  const handleSave = async (student) => {
    try {
      await axios.put(`${API_URL}/students/${student._id}`, {
        grades: student.grades,
        absences: student.absences
      });
      setShowToast(`Données sauvegardées!`);
      setTimeout(() => setShowToast(false), 2000);
    } catch (err) { alert('Erreur'); }
  };

  if (loading) return <div className="dashboard-container" style={{display:'flex', alignItems:'center', justifyContent:'center'}}>Chargement...</div>;

  return (
    <div className="dashboard-container">
      <aside className="sidebar"><div className="sidebar-logo"><span>Prof Panel</span></div><nav style={{flex:1}}><button className="nav-link active"><Users size={20} /> <span>Ma Classe</span></button></nav><button className="nav-link" onClick={() => window.location.href='/login'}><LogOut size={20} /> <span>Déconnexion</span></button></aside>
      <main className="main-content">
        <header className="dashboard-header"><h1>Gestion de Classe</h1><div style={{display:'flex', alignItems:'center', gap:'10px', marginTop:'10px'}}><span>Matière:</span><input type="text" className="grade-input" style={{width:'200px'}} value={subject} onChange={e => setSubject(e.target.value)} /></div></header>
        <div className="data-table-container">
          <table className="data-table">
            <thead><tr><th>Élève</th><th>Groupe</th><th>Note /20</th><th>Absences</th><th>Actions</th></tr></thead>
            <tbody>
              {students.map(s => (
                <tr key={s._id}>
                  <td><b>{s.name}</b><br/><span style={{fontSize:'0.7rem', color:'#94a3b8'}}>{s.code}</span></td>
                  <td>{s.group}</td>
                  <td><input type="number" className="grade-input" value={s.grades?.[subject] || ''} onChange={e => handleGradeChange(s._id, e.target.value)} /></td>
                  <td><div style={{display:'flex', gap:'5px', alignItems:'center', justifyContent:'center'}}><button onClick={() => handleAbsenceChange(s._id, -1)}>-</button><b>{s.absences || 0}h</b><button onClick={() => handleAbsenceChange(s._id, 1)}>+</button></div></td>
                  <td><button className="btn-save" onClick={() => handleSave(s)}><Save size={18} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
      <AnimatePresence>{showToast && <motion.div initial={{ y: -50 }} animate={{ y: 20 }} exit={{ y: -50 }} className="toast" style={{ position: 'fixed', top: 0, left: '50%', transform: 'translateX(-50%)', backgroundColor: '#10b981', color: 'white', padding: '12px 24px', borderRadius: '12px', zIndex: 5000 }}><CheckCircle size={20} /> {showToast}</motion.div>}</AnimatePresence>
    </div>
  );
};

export default ProfDashboard;
