import React, { useState } from 'react';
import { Home, Bell, User, LogOut, ChevronDown, CreditCard, BookOpen, Menu, X } from 'lucide-react';
import { INSTITUTION } from '../../data/mockData';
import jitLogo from '../../assets/jit-logo.png';

export const Navbar = ({ 
  student, 
  activeTab, 
  setActiveTab, 
  onLogout,
  isMobileMenuOpen,
  onToggleMobileMenu
}) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 h-14 flex items-center justify-between px-3 sm:px-6 select-none shadow-xs">
      
      {/* Left: Mobile Hamburger + JIT Emblem & College Name */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Mobile Hamburger Toggle */}
        <button
          onClick={onToggleMobileMenu}
          className="md:hidden p-2 -ml-1 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors"
          title={isMobileMenuOpen ? "Close menu" : "Open navigation menu"}
          aria-label="Toggle navigation menu"
        >
          {isMobileMenuOpen ? <X className="w-5 h-5 text-slate-800" /> : <Menu className="w-5 h-5 text-slate-800" />}
        </button>

        <div 
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-2 sm:gap-3 cursor-pointer"
        >
          <img 
            src={jitLogo} 
            alt="JIT Logo" 
            className="h-8 w-8 sm:h-10 sm:w-10 object-contain shrink-0"
          />
          <div className="flex flex-col">
            <span className="hidden sm:inline text-xs sm:text-[13px] font-bold text-slate-800 tracking-wide uppercase">
              {INSTITUTION.name}
            </span>
            <span className="sm:hidden text-[12px] font-extrabold text-slate-800 tracking-tight uppercase leading-tight">
              JIT, NAGPUR
            </span>
            <span className="sm:hidden text-[9px] font-medium text-slate-500 uppercase tracking-wider">
              Autonomous ERP
            </span>
          </div>
        </div>
      </div>

      {/* Right: Home, Bell, Welcome RIDDHI, Avatar */}
      <div className="flex items-center gap-1.5 sm:gap-4">
        
        {/* Home Icon */}
        <button
          onClick={() => setActiveTab('home')}
          className={`p-2 rounded-md transition-colors ${
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
            className="p-2 rounded-md text-slate-600 hover:text-slate-900 transition-colors relative"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-72 max-w-[calc(100vw-1.5rem)] bg-white rounded-lg shadow-xl border border-slate-200 p-3 z-50 text-xs animate-in fade-in zoom-in-95">
              <div className="font-bold pb-2 border-b border-slate-100 text-slate-800">
                Academic Alerts
              </div>
              <div className="py-2 space-y-2">
                <p className="text-slate-700 font-medium">Exam Circular: Supplementary Exam Timetable released.</p>
                <p className="text-slate-500 text-[11px]">Development fee receipt available in Finance tab.</p>
              </div>
            </div>
          )}
        </div>

        {/* Welcome RIDDHI & User Silhouette Avatar */}
        <div className="relative">
          <div 
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-1.5 sm:gap-2 cursor-pointer py-1 pl-1"
          >
            <span className="text-[12px] text-slate-700 hidden md:inline">
              Welcome <span className="text-[#c2185b] font-medium uppercase">{student.shortName || 'PARIKSHIT'}</span>
            </span>

            {/* Circular Silhouette Avatar from screenshot */}
            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-300 transition-colors shrink-0 ring-1 ring-slate-300">
              <User className="w-4 h-4" />
            </div>

            <ChevronDown className="w-3 h-3 text-slate-400" />
          </div>

          {/* User Menu Dropdown */}
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-64 max-w-[calc(100vw-2rem)] bg-white rounded-lg shadow-xl border border-slate-200 p-2 z-50 animate-in fade-in zoom-in-95">
              <div className="px-3 py-2 border-b border-slate-100 mb-1 bg-slate-50/60 rounded">
                <p className="text-xs font-bold text-slate-900">{student.name}</p>
                <p className="text-[11px] font-mono text-slate-500">PRN: {student.prn}</p>
                <span className="inline-block mt-1 px-1.5 py-0.5 rounded text-[10px] font-medium bg-blue-50 text-blue-700">
                  {student.degree} {student.branch} (Sem {student.semester})
                </span>
              </div>

              <button
                onClick={() => {
                  setActiveTab('student-info');
                  setShowProfileMenu(false);
                }}
                className="w-full text-left px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 rounded flex items-center gap-2"
              >
                <User className="w-4 h-4 text-slate-400" />
                <span>Student Information</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('finance');
                  setShowProfileMenu(false);
                }}
                className="w-full text-left px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 rounded flex items-center gap-2"
              >
                <CreditCard className="w-4 h-4 text-slate-400" />
                <span>Student Fees Details</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('courses');
                  setShowProfileMenu(false);
                }}
                className="w-full text-left px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 rounded flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4 text-slate-400" />
                <span>My Registered Courses</span>
              </button>

              <div className="border-t border-slate-100 my-1" />

              <button
                onClick={() => {
                  setShowProfileMenu(false);
                  onLogout();
                }}
                className="w-full text-left px-3 py-2 text-xs text-red-600 hover:bg-red-50 rounded flex items-center gap-2 font-medium"
              >
                <LogOut className="w-4 h-4" />
                <span>Log Out</span>
              </button>
            </div>
          )}
        </div>

      </div>

    </header>
  );
};
