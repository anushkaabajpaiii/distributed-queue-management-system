
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, Users, Bell, LogOut, Settings, Plus, Info } from 'lucide-react';
import UserView from './components/UserView';
import AdminDashboard from './components/AdminDashboard';
import { Appointment, ServiceType, AppointmentStatus } from './types';
import { INITIAL_APPOINTMENTS } from './constants';

const Navigation: React.FC = () => {
  const location = useLocation();
  const isAdmin = location.pathname.includes('/admin');

  return (
    <nav className="bg-indigo-600 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <div className="flex-shrink-0 flex items-center gap-2">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <LayoutDashboard className="text-indigo-600 w-5 h-5" />
              </div>
              <span className="font-bold text-xl tracking-tight">Q-Master Pro</span>
            </div>
            <div className="hidden md:flex items-baseline space-x-4">
              <Link
                to="/"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${
                  !isAdmin ? 'bg-indigo-700 text-white' : 'text-indigo-100 hover:bg-indigo-500'
                }`}
              >
                User View
              </Link>
              <Link
                to="/admin"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${
                  isAdmin ? 'bg-indigo-700 text-white' : 'text-indigo-100 hover:bg-indigo-500'
                }`}
              >
                Admin Dashboard
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-indigo-100 hover:text-white relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-400 rounded-full border-2 border-indigo-600"></span>
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-indigo-500">
              <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center border border-indigo-400">
                <Users className="w-4 h-4" />
              </div>
              <span className="text-sm font-medium hidden sm:block">Demo User</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

const App: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>(INITIAL_APPOINTMENTS);

  const addAppointment = (name: string, service: ServiceType) => {
    const newApp: Appointment = {
      id: crypto.randomUUID(),
      userName: name,
      service,
      status: AppointmentStatus.QUEUED,
      timestamp: new Date().toISOString(),
      estimatedWaitMinutes: appointments.filter(a => a.status === AppointmentStatus.QUEUED).length * 10 + 5
    };
    setAppointments(prev => [...prev, newApp]);
  };

  const updateStatus = (id: string, status: AppointmentStatus) => {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status } : a));
  };

  return (
    <HashRouter>
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Navigation />
        <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
          <AnimatePresence mode="wait">
            <Routes>
              <Route 
                path="/" 
                element={<UserView appointments={appointments} onJoin={addAppointment} />} 
              />
              <Route 
                path="/admin" 
                element={<AdminDashboard appointments={appointments} onUpdate={updateStatus} />} 
              />
            </Routes>
          </AnimatePresence>
        </main>
        
        <footer className="bg-white border-t py-6 mt-12">
          <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-slate-500 text-sm gap-4">
            <p>© 2024 Q-Master Systems. Professional Service Excellence.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-indigo-600">Privacy Policy</a>
              <a href="#" className="hover:text-indigo-600">Terms of Service</a>
              <a href="#" className="hover:text-indigo-600">Contact Support</a>
            </div>
          </div>
        </footer>
      </div>
    </HashRouter>
  );
};

export default App;
