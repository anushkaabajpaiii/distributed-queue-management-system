
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, User, ChevronRight, CheckCircle, Activity, LayoutGrid, Info } from 'lucide-react';
import { Appointment, ServiceType, AppointmentStatus } from '../types';

interface UserViewProps {
  appointments: Appointment[];
  onJoin: (name: string, service: ServiceType) => void;
}

const UserView: React.FC<UserViewProps> = ({ appointments, onJoin }) => {
  const [name, setName] = useState('');
  const [service, setService] = useState<ServiceType>(ServiceType.DOCTOR);
  const [showSuccess, setShowSuccess] = useState(false);

  const queuedAppointments = appointments.filter(a => a.status === AppointmentStatus.QUEUED);
  const totalWait = queuedAppointments.reduce((acc, curr) => acc + 10, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;
    onJoin(name, service);
    setName('');
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8"
    >
      <header className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-slate-900">Welcome to Q-Flow</h1>
        <p className="text-slate-500 max-w-lg mx-auto">Track your place in line and join our virtual queue for a faster service experience.</p>
      </header>

      {/* Hero Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4">
          <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Live Queue Size</p>
            <p className="text-3xl font-bold text-indigo-600">{queuedAppointments.length}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Est. Wait Time</p>
            <p className="text-3xl font-bold text-emerald-600">{totalWait} mins</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4">
          <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600">
            <LayoutGrid className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Total Services Today</p>
            <p className="text-3xl font-bold text-amber-600">{appointments.length}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Join Queue Form */}
        <div className="lg:col-span-1">
          <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200 border border-slate-100 h-full">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Join the Queue</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    placeholder="Enter your name"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Select Service</label>
                <div className="grid grid-cols-1 gap-2">
                  {Object.values(ServiceType).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setService(type)}
                      className={`px-4 py-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                        service === type 
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-700 ring-1 ring-indigo-600' 
                          : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <span className="font-medium">{type} Service</span>
                      {service === type && <CheckCircle className="w-5 h-5" />}
                    </button>
                  ))}
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold hover:bg-indigo-700 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-100"
              >
                Join Queue Now
                <ChevronRight className="w-5 h-5" />
              </button>
            </form>

            <AnimatePresence>
              {showSuccess && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-6 p-4 bg-emerald-50 text-emerald-700 rounded-xl border border-emerald-100 flex items-center gap-3 overflow-hidden"
                >
                  <CheckCircle className="w-5 h-5 flex-shrink-0" />
                  <p className="text-sm font-medium">Successfully joined the queue!</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Live Queue Display */}
        <div className="lg:col-span-2">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 h-full">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold text-slate-900">Live Queue Tracking</h2>
              <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full animate-pulse">LIVE UPDATES</span>
            </div>
            
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
              {queuedAppointments.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                  <Activity className="w-12 h-12 mb-4 opacity-20" />
                  <p>Queue is currently empty.</p>
                </div>
              ) : (
                queuedAppointments.map((app, index) => (
                  <motion.div
                    key={app.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="group relative bg-slate-50 hover:bg-white hover:shadow-md border border-slate-200 p-5 rounded-2xl flex items-center gap-6 transition-all"
                  >
                    <div className="w-10 h-10 flex-shrink-0 bg-white border border-slate-200 rounded-full flex items-center justify-center font-bold text-indigo-600">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-bold text-slate-900">{app.userName}</h4>
                        <span className="px-2 py-0.5 bg-slate-200 text-slate-600 text-[10px] font-bold rounded uppercase tracking-wider">
                          {app.service}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 font-mono truncate max-w-[200px] sm:max-w-xs">
                        ID: {app.id}
                      </p>
                    </div>
                    <div className="hidden sm:flex items-center gap-4 text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" />
                        <span className="text-xs font-medium">Wait: ~{index * 10 + 5}m</span>
                      </div>
                      <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-300 group-hover:text-indigo-600 transition-colors">
                        {/* Fixed missing Info icon */}
                        <Info className="w-5 h-5" />
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default UserView;
