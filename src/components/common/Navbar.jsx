import React, { useState } from 'react';
import { Home, Bell, User, LogOut, ChevronDown, CreditCard, BookOpen } from 'lucide-react';
import { INSTITUTION } from '../../data/mockData';
import jitLogo from '../../assets/jit-logo.png';

export const Navbar = ({ 
  student, 
  activeTab, 
  setActiveTab, 
  onLogout 
}) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200 h-14 flex items-center justify-between px-4 sm:px-6 select-none shadow-xs">
      
      {/* Left: JIT Emblem & College Name */}
      <div 
        onClick={() => setActiveTab('home')}
        className="flex items-center gap-3 cursor-pointer"
      >
        <img 
          src={jitLogo} 
          alt="JIT Logo" 
          className="h-10 w-10 object-contain shrink-0"
        />
        <span className="text-xs sm:text-[13px] font-bold text-slate-800 tracking-wide uppercase">
          {INSTITUTION.name}
        </span>
      </div>

      {/* Right: Home, Bell, Welcome RIDDHI, Avatar */}
      <div className="flex items-center gap-4">
        
        {/* Home Icon */}
        <button
          onClick={() => setActiveTab('home')}
          className={`p-1.5 rounded transition-colors ${
            activeTab === 'home' ? 'text-slate-900 bg-slate-100' : 'text-slate-600 hover:text-slate-900'
          }`}
          title="Home Notice Board"
        >
          <Home className="w-4 h-4" />
        </button>

        {/* Bell / Notification Icon */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-1.5 rounded text-slate-600 hover:text-slate-900 transition-colors relative"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-red-500 rounded-full" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-xl border border-slate-200 p-3 z-50 text-xs">
              <div className="font-bold pb-2 border-b border-slate-100 text-slate-800">
                Academic Alerts
              </div>
              <div className="py-2 space-y-2">
                <p className="text-slate-700">Exam Circular: Supplementary Exam Timetable released.</p>
                <p className="text-slate-500 text-[11px]">Development fee receipt available in Finance tab.</p>
              </div>
            </div>
          )}
        </div>

        {/* Welcome RIDDHI & User Silhouette Avatar */}
        <div className="relative">
          <div 
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2 cursor-pointer py-1 pl-1"
          >
            <span className="text-[12px] text-slate-700 hidden sm:inline">
              Welcome <span className="text-[#c2185b] font-medium uppercase">{student.shortName || 'RIDDHI'}</span>
            </span>

            {/* Circular Silhouette Avatar from screenshot */}
            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-300 transition-colors shrink-0">
              <User className="w-4 h-4" />
            </div>

            <ChevronDown className="w-3 h-3 text-slate-400" />
          </div>

          {/* User Menu Dropdown */}
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-slate-200 p-2 z-50 animate-in fade-in zoom-in-95">
              <div className="px-3 py-2 border-b border-slate-100 mb-1">
                <p className="text-xs font-bold text-slate-900">{student.name}</p>
                <p className="text-[11px] font-mono text-slate-500">PRN: {student.prn}</p>
                <span className="inline-block mt-1 px-1.5 py-0.5 rounded text-[10px] font-medium bg-blue-50 text-blue-700">
                  {student.degree} {student.branch} (Sem {student.semester})
                </span>
              </div>

              <button
                onClick={() => {
                  setActiveTab('finance');
                  setShowProfileMenu(false);
                }}
                className="w-full text-left px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50 rounded flex items-center gap-2"
              >
                <CreditCard className="w-3.5 h-3.5 text-slate-400" />
                <span>Student Fees Details</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('courses');
                  setShowProfileMenu(false);
                }}
                className="w-full text-left px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50 rounded flex items-center gap-2"
              >
                <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                <span>My Registered Courses</span>
              </button>

              <div className="border-t border-slate-100 my-1" />

              <button
                onClick={() => {
                  setShowProfileMenu(false);
                  onLogout();
                }}
                className="w-full text-left px-3 py-1.5 text-xs text-red-600 hover:bg-red-50 rounded flex items-center gap-2 font-medium"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log Out</span>
              </button>
            </div>
          )}
        </div>

      </div>

    </header>
  );
};
