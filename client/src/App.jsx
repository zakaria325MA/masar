import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import ProfDashboard from './pages/ProfDashboard';
import StudentDashboard from './pages/StudentDashboard';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard-prof" element={<ProfDashboard />} />
        <Route path="/dashboard-student" element={<StudentDashboard />} />
        <Route path="/dashboard-admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
