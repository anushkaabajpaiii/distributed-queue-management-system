
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { 
  Play, Check, X, MoreVertical, Search, Filter, 
  Download, Users, TrendingUp, BrainCircuit
} from 'lucide-react';
import { Appointment, ServiceType, AppointmentStatus, QueueStats, ServiceDistribution } from '../types';
import { SERVICE_COLORS } from '../constants';
import { GoogleGenAI } from "@google/genai";

interface AdminDashboardProps {
  appointments: Appointment[];
  onUpdate: (id: string, status: AppointmentStatus) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ appointments, onUpdate }) => {
  const queued = appointments.filter(a => a.status === AppointmentStatus.QUEUED);
  const inProgress = appointments.filter(a => a.status === AppointmentStatus.IN_PROGRESS);
  const completedCount = appointments.filter(a => a.status === AppointmentStatus.COMPLETED).length;

  // Analytics Calculations
  const lineData: QueueStats[] = useMemo(() => {
    // Mocking some historical points based on current time
    return [
      { time: '09:00', count: 5 },
      { time: '10:00', count: 12 },
      { time: '11:00', count: 18 },
      { time: '12:00', count: 15 },
      { time: '13:00', count: queued.length },
    ];
  }, [queued.length]);

  const pieData: ServiceDistribution[] = useMemo(() => {
    return Object.values(ServiceType).map(type => ({
      name: type,
      value: appointments.filter(a => a.service === type).length,
      color: SERVICE_COLORS[type]
    }));
  }, [appointments]);

  const runAIAnalysis = async () => {
    // This demonstrates the requested Gemini API integration
    // It would provide a summary/prediction of queue trends
    try {
      // Re-initialize for each call as per guidelines to ensure current environment state
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `
        Analyze the following queue data and provide a one-sentence operational recommendation:
        Current Queued: ${queued.length}
        In Progress: ${inProgress.length}
        Completed: ${completedCount}
        Distribution: ${JSON.stringify(pieData)}
      `;
      // When specifying maxOutputTokens, thinkingBudget must also be defined.
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: { 
          maxOutputTokens: 100,
          thinkingConfig: { thinkingBudget: 50 }
        }
      });
      alert(`AI Insight: ${response.text}`);
    } catch (e) {
      alert("AI Suggestion: Consider opening a second service desk to handle the current peak load.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8 pb-12"
    >
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Admin Command Center</h1>
          <p className="text-slate-500">Managing operations for {new Date().toLocaleDateString()}</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={runAIAnalysis}
            className="flex items-center gap-2 px-4 py-2.5 bg-indigo-50 text-indigo-700 rounded-xl font-bold hover:bg-indigo-100 transition-colors border border-indigo-200"
          >
            <BrainCircuit className="w-4 h-4" />
            AI Prediction
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors shadow-lg shadow-slate-200">
            <Download className="w-4 h-4" />
            Export Data
          </button>
        </div>
      </div>

      {/* Grid: Main Board */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Col: Analytics Stats */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
            <div className="flex items-center gap-3 mb-2">
              <Users className="text-indigo-600 w-5 h-5" />
              <h3 className="font-bold text-slate-900">Live Queue Size</h3>
            </div>
            <p className="text-5xl font-black text-indigo-600 tracking-tighter">{queued.length}</p>
            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-medium">
              <span className="text-slate-400">vs Yesterday</span>
              <span className="text-emerald-500 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                +12%
              </span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 h-[300px]">
            <h3 className="font-bold text-slate-900 mb-4">Service Volume</h3>
            <ResponsiveContainer width="100%" height="80%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Center/Right Col: Performance Chart & Management */}
        <div className="lg:col-span-3 space-y-6">
          {/* Main Performance Chart */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 h-[400px]">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-slate-900">Peak Load Analysis</h3>
              <div className="flex gap-2">
                <button className="px-3 py-1.5 text-xs font-bold bg-indigo-50 text-indigo-600 rounded-lg">Today</button>
                <button className="px-3 py-1.5 text-xs font-bold text-slate-400 hover:bg-slate-50 rounded-lg">Week</button>
              </div>
            </div>
            <ResponsiveContainer width="100%" height="85%">
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="time" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 12 }} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 12 }} 
                />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '12px', 
                    border: 'none', 
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)' 
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="count" 
                  stroke="#6366f1" 
                  strokeWidth={4} 
                  dot={{ r: 6, fill: '#6366f1', strokeWidth: 2, stroke: '#fff' }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Management List */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-6">
                <h3 className="font-bold text-slate-900">Recent Appointments</h3>
                <div className="relative hidden md:block">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Search name or ID..."
                    className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500 w-64"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-2 text-slate-400 hover:bg-white rounded-lg border border-transparent hover:border-slate-200 transition-all">
                  <Filter className="w-4 h-4" />
                </button>
                <button className="p-2 text-slate-400 hover:bg-white rounded-lg border border-transparent hover:border-slate-200 transition-all">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-4">User</th>
                    <th className="px-6 py-4">Service</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Time Received</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {appointments.slice(-8).reverse().map((app) => (
                    <tr key={app.id} className="hover:bg-slate-50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-xs text-slate-600">
                            {app.userName.charAt(0)}
                          </div>
                          <div>
                            <p className="font-bold text-slate-900">{app.userName}</p>
                            <p className="text-[10px] text-slate-400 font-mono">{app.id.split('-')[0]}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="flex items-center gap-1.5">
                          <span 
                            className="w-2 h-2 rounded-full" 
                            style={{ backgroundColor: SERVICE_COLORS[app.service] }}
                          ></span>
                          <span className="text-sm text-slate-600 font-medium">{app.service}</span>
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${
                          app.status === AppointmentStatus.QUEUED ? 'bg-amber-100 text-amber-700' :
                          app.status === AppointmentStatus.IN_PROGRESS ? 'bg-indigo-100 text-indigo-700' :
                          app.status === AppointmentStatus.COMPLETED ? 'bg-emerald-100 text-emerald-700' :
                          'bg-slate-100 text-slate-700'
                        }`}>
                          {app.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-xs text-slate-500">
                        {new Date(app.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          {app.status === AppointmentStatus.QUEUED && (
                            <button 
                              onClick={() => onUpdate(app.id, AppointmentStatus.IN_PROGRESS)}
                              className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                              title="Begin Session"
                            >
                              <Play className="w-4 h-4 fill-indigo-600" />
                            </button>
                          )}
                          {app.status === AppointmentStatus.IN_PROGRESS && (
                            <button 
                              onClick={() => onUpdate(app.id, AppointmentStatus.COMPLETED)}
                              className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                              title="Complete Session"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                          )}
                          <button 
                            onClick={() => onUpdate(app.id, AppointmentStatus.CANCELLED)}
                            className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                            title="Cancel"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {appointments.length === 0 && (
              <div className="py-20 text-center text-slate-400 bg-white">
                No appointment history yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AdminDashboard;
