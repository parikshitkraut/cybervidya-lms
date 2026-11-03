import React from 'react';
import {
  LayoutDashboard,
  BookOpen,
  Calendar,
  CreditCard,
  FileText,
  Award,
  BellRing,
  User,
  Users,
  Settings,
  DollarSign,
  TrendingUp,
  FileCheck2,
  FolderLock,
  Layers,
  HelpCircle,
  Shield,
  Sparkles
} from 'lucide-react';
import { INSTITUTION } from '../../data/mockData';

export const Sidebar = ({ 
  currentRole, 
  activeTab, 
  setActiveTab, 
  feeSummary, 
  pendingAssignmentsCount 
}) => {

  const studentNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'courses', label: 'My Courses & Lectures', icon: BookOpen },
    { id: 'timetable', label: 'Classes & Timetable', icon: Calendar, badge: 'Live' },
    { 
      id: 'fees', 
      label: 'Fees & Payments', 
      icon: CreditCard, 
      highlight: feeSummary.outstandingBalance > 0,
      badge: feeSummary.outstandingBalance > 0 ? `₹${(feeSummary.outstandingBalance/1000).toFixed(0)}k Due` : null
    },
    { 
      id: 'assignments', 
      label: 'Assignments & Labs', 
      icon: FileText, 
      badge: pendingAssignmentsCount > 0 ? `${pendingAssignmentsCount} Due` : null 
    },
    { id: 'announcements', label: 'Announcements', icon: BellRing },
    { id: 'certificates', label: 'Certificates & Honors', icon: Award },
    { id: 'profile', label: 'Student Profile', icon: User },
  ];

  const adminNavItems = [
    { id: 'admin-overview', label: 'Executive Overview', icon: TrendingUp },
    { 
      id: 'admin-fees', 
      label: 'Fees Administration', 
      icon: DollarSign,
      highlight: true,
      badge: 'Core'
    },
    { id: 'admin-students', label: 'Students Roster', icon: Users },
    { id: 'admin-courses', label: 'Academic Courses', icon: Layers },
    { id: 'admin-reports', label: 'Collection Reports', icon: FileCheck2 },
    { id: 'admin-scholarships', label: 'Scholarships & Waivers', icon: Award },
  ];

  const items = currentRole === 'admin' ? adminNavItems : studentNavItems;

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col shrink-0 min-h-[calc(100vh-4rem)]">
      
      {/* Role Banner / Context */}
      <div className="p-4 border-b border-slate-100">
        <div className={`p-3 rounded-xl border flex items-center gap-3 ${
          currentRole === 'admin'
            ? 'bg-gradient-to-r from-vidya-50 to-indigo-50 border-vidya-200/80 text-vidya-900'
            : 'bg-gradient-to-r from-cyber-50 to-indigo-50 border-cyber-200/80 text-cyber-900'
        }`}>
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
            currentRole === 'admin' ? 'bg-vidya-600 text-white' : 'bg-cyber-600 text-white'
          }`}>
            {currentRole === 'admin' ? <Shield className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
          </div>
          <div className="overflow-hidden">
            <p className="text-[10px] font-bold tracking-wider uppercase opacity-75">
              {currentRole === 'admin' ? 'Administrative Suite' : 'Autonomous Student ERP'}
            </p>
            <p className="text-xs font-bold truncate">
              {currentRole === 'admin' ? 'Finance & Academic Office' : 'B.Tech CSE - Sem VI'}
            </p>
          </div>
        </div>
      </div>

      {/* Nav List */}
      <nav className="p-3 space-y-1 flex-1 overflow-y-auto">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                isActive
                  ? currentRole === 'admin'
                    ? 'bg-gradient-to-r from-vidya-600 to-indigo-600 text-white shadow-md shadow-vidya-600/20'
                    : 'bg-gradient-to-r from-cyber-600 to-indigo-600 text-white shadow-md shadow-cyber-600/20'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                  isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-700'
                }`} />
                <span>{item.label}</span>
              </div>

              {item.badge && (
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                  isActive
                    ? 'bg-white/20 text-white'
                    : item.highlight
                      ? 'bg-amber-100 text-amber-700 border border-amber-300'
                      : 'bg-cyber-100 text-cyber-700'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Institutional Footer Seal */}
      <div className="p-4 border-t border-slate-100 bg-slate-50/50">
        <div className="text-[11px] text-slate-500 space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-slate-700">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Razorpay Secured Gateway</span>
          </div>
          <p className="text-[10px] text-slate-400 leading-relaxed">
            {INSTITUTION.accreditation}
          </p>
          <div className="pt-2 text-[9px] text-slate-400 flex items-center justify-between border-t border-slate-200">
            <span>CyberVidya v2.6</span>
            <span className="font-mono text-emerald-600">PCI-DSS 256-bit</span>
          </div>
        </div>
      </div>

    </aside>
  );
};
