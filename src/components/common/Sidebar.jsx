import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  FolderPlus, 
  CalendarCheck, 
  Cog, 
  FileText, 
  CreditCard, 
  ClipboardList, 
  BookOpen, 
  Award,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';

export const Sidebar = ({ activeTab, setActiveTab }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const navItems = [
    { id: 'home', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'admission', label: 'Admission', icon: FolderPlus, hasSubmenu: true },
    { id: 'attendance', label: 'Attendance', icon: CalendarCheck, hasSubmenu: true },
    { id: 'course', label: 'Course', icon: Cog, hasSubmenu: true },
    { id: 'exam', label: 'Exam', icon: FileText, hasSubmenu: true },
    { id: 'finance', label: 'Finance', icon: CreditCard, hasSubmenu: true, highlight: true },
    { id: 'feedback', label: 'Feedback Form', icon: ClipboardList, hasSubmenu: true },
    { id: 'library', label: 'Library', icon: BookOpen, hasSubmenu: true },
    { id: 'courses', label: 'My Registered Courses', icon: Cog, hasSubmenu: false },
  ];

  return (
    <aside 
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      className={`bg-[#2b2d32] text-slate-300 transition-all duration-200 shrink-0 flex flex-col z-20 shadow-md ${
        isExpanded ? 'w-52' : 'w-14'
      }`}
      style={{ minHeight: 'calc(100vh - 3.5rem)' }}
    >
      
      {/* Navigation List */}
      <nav className="py-2 space-y-0.5 flex-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center h-11 px-4 transition-colors group relative ${
                isActive
                  ? 'bg-[#1e2023] text-white font-medium border-l-3 border-orange-500'
                  : 'hover:bg-[#34373d] text-slate-300 hover:text-white'
              }`}
              title={!isExpanded ? item.label : undefined}
            >
              {/* Icon */}
              <div className="w-6 flex items-center justify-center shrink-0">
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-300 group-hover:text-white'}`} />
              </div>

              {/* Label (shown when expanded) */}
              {isExpanded && (
                <div className="ml-3 flex-1 flex items-center justify-between overflow-hidden">
                  <span className="text-[13px] truncate text-left">
                    {item.label}
                  </span>
                  {item.hasSubmenu && (
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-white shrink-0 ml-1" />
                  )}
                </div>
              )}
            </button>
          );
        })}
      </nav>

      {/* Collapse / Expand Toggle Button at bottom */}
      <div className="p-2 border-t border-[#3a3d44] flex justify-center">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-1.5 rounded hover:bg-[#34373d] text-slate-400 hover:text-white transition-colors"
          title={isExpanded ? "Collapse Sidebar" : "Expand Sidebar"}
        >
          {isExpanded ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>
      </div>

    </aside>
  );
};
