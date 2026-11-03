import React, { useState } from 'react';
import { 
  GraduationCap, 
  Bell, 
  Search, 
  ShieldCheck, 
  User, 
  CreditCard, 
  ChevronDown, 
  LogOut, 
  Sparkles,
  School,
  ExternalLink,
  BookOpen
} from 'lucide-react';
import { INSTITUTION } from '../../data/mockData';

export const Navbar = ({ 
  currentRole, 
  onRoleChange, 
  student, 
  activeTab, 
  setActiveTab,
  onOpenPayNow,
  feeSummary
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200">
      <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Left: Brand & Institution */}
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-cyber-600 via-indigo-600 to-vidya-600 flex items-center justify-center text-white shadow-md shadow-cyber-500/20">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-cyber-700 via-indigo-700 to-vidya-700 bg-clip-text text-transparent">
                CyberVidya
              </span>
              <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-cyber-50 text-cyber-700 border border-cyber-200">
                Next ERP
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium truncate hidden sm:block">
              {INSTITUTION.name} ({INSTITUTION.shortName})
            </p>
          </div>
        </div>

        {/* Center: Search */}
        <div className="hidden md:flex items-center flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text"
              placeholder="Search courses, study materials, receipts, PRN..."
              className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-4 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyber-500/30 focus:border-cyber-500 transition-all"
            />
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5">
          
          {/* Quick Role Switcher Pill */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200/80">
            <button
              onClick={() => onRoleChange('student')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                currentRole === 'student'
                  ? 'bg-white text-cyber-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Student Portal
            </button>
            <button
              onClick={() => onRoleChange('admin')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                currentRole === 'admin'
                  ? 'bg-gradient-to-r from-vidya-700 to-indigo-700 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Admin ERP
            </button>
          </div>

          {/* Quick Pay CTA for student if dues exist */}
          {currentRole === 'student' && feeSummary.outstandingBalance > 0 && (
            <button
              onClick={onOpenPayNow}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-sm shadow-emerald-600/20 transition-all animate-pulse-subtle"
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>Pay Due (₹{feeSummary.outstandingBalance.toLocaleString('en-IN')})</span>
            </button>
          )}

          {/* Notification Bell */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 relative transition-colors"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-2xl border border-slate-200 p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="font-semibold text-xs text-slate-900">Notifications & Alerts</span>
                  <span className="text-[10px] text-cyber-600 font-medium">3 unread</span>
                </div>
                <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto mt-1">
                  <div className="py-2 px-1 hover:bg-slate-50 rounded cursor-pointer transition-colors">
                    <div className="flex items-start gap-2">
                      <span className="w-2 h-2 mt-1.5 rounded-full bg-red-500 shrink-0"></span>
                      <div>
                        <p className="text-xs font-semibold text-slate-900">Final Term Fee Due: 15 Nov 2026</p>
                        <p className="text-[11px] text-slate-500 mt-0.5">Please pay ₹40,000 to receive university exam hall ticket.</p>
                      </div>
                    </div>
                  </div>
                  <div className="py-2 px-1 hover:bg-slate-50 rounded cursor-pointer transition-colors">
                    <div className="flex items-start gap-2">
                      <span className="w-2 h-2 mt-1.5 rounded-full bg-cyber-500 shrink-0"></span>
                      <div>
                        <p className="text-xs font-semibold text-slate-900">Live Lecture CS601 in 30 mins</p>
                        <p className="text-[11px] text-slate-500 mt-0.5">Dr. Sandeep Kulkarni: NP-Completeness & 3-SAT Reduction.</p>
                      </div>
                    </div>
                  </div>
                  <div className="py-2 px-1 hover:bg-slate-50 rounded cursor-pointer transition-colors">
                    <div className="flex items-start gap-2">
                      <span className="w-2 h-2 mt-1.5 rounded-full bg-emerald-500 shrink-0"></span>
                      <div>
                        <p className="text-xs font-semibold text-slate-900">Assignment 3 Graded (28/30)</p>
                        <p className="text-[11px] text-slate-500 mt-0.5">Deep Learning lab feedback posted by Dr. Ananya Sen.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Pill */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2 pl-2 pr-1.5 py-1 rounded-xl hover:bg-slate-100 transition-colors border border-transparent hover:border-slate-200"
            >
              <img 
                src={student.avatar} 
                alt={student.name} 
                className="w-8 h-8 rounded-lg object-cover ring-2 ring-cyber-400/30"
              />
              <div className="text-left hidden sm:block">
                <p className="text-xs font-semibold text-slate-800 leading-tight">
                  {currentRole === 'admin' ? 'Administrator' : student.name}
                </p>
                <p className="text-[10px] text-slate-500 font-mono">
                  {currentRole === 'admin' ? 'Finance & ERP Officer' : student.prn}
                </p>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 p-2 z-50">
                <div className="px-3 py-2 border-b border-slate-100 mb-1">
                  <p className="text-xs font-bold text-slate-900">{student.name}</p>
                  <p className="text-[11px] text-slate-500">{student.email}</p>
                  <span className="inline-block mt-1 px-1.5 py-0.5 rounded text-[9px] font-mono bg-cyber-50 text-cyber-700">
                    {student.branch} ({student.section})
                  </span>
                </div>
                <button
                  onClick={() => {
                    setActiveTab('profile');
                    setShowProfileMenu(false);
                  }}
                  className="w-full text-left px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50 rounded-lg flex items-center gap-2"
                >
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <span>My Academic Profile</span>
                </button>
                <button
                  onClick={() => {
                    setActiveTab('fees');
                    setShowProfileMenu(false);
                  }}
                  className="w-full text-left px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50 rounded-lg flex items-center gap-2"
                >
                  <CreditCard className="w-3.5 h-3.5 text-slate-400" />
                  <span>Fee Receipts & Invoices</span>
                </button>
                <div className="border-t border-slate-100 my-1"></div>
                <div className="px-3 py-1 text-[10px] text-slate-400">
                  Autonomous ERP v2.6.4 (JITN)
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </header>
  );
};
