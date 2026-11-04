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
  ChevronRight,
  ChevronLeft
} from 'lucide-react';

export const Sidebar = ({ activeTab, setActiveTab }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);

  const navItems = [
    { id: 'home', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'admission', label: 'Admission', icon: FolderPlus, hasSubmenu: true },
    { id: 'attendance', label: 'Attendance', icon: CalendarCheck, hasSubmenu: true },
    { id: 'course', label: 'Course', icon: Cog, hasSubmenu: true },
    { id: 'exam', label: 'Exam', icon: FileText, hasSubmenu: true },
    { id: 'finance', label: 'Finance', icon: CreditCard, hasSubmenu: true },
    { id: 'feedback', label: 'Feedback Form', icon: ClipboardList, hasSubmenu: true },
    { id: 'library', label: 'Library', icon: BookOpen, hasSubmenu: true },
    { id: 'courses', label: 'My Registered Courses', icon: Cog, hasSubmenu: false },
  ];

  // Exact submenus matching Screenshot 1, 2, 3
  const subMenus = {
    admission: [
      { id: 'student-info', label: '• Student Information', tab: 'student-info' },
      { id: 'mentor-updates', label: '• Mentor Updates', tab: 'student-info' },
      { id: 'profile-history', label: '• Update Profile History', tab: 'student-info' },
    ],
    course: [
      { id: 'course-reg', label: '• Student Course Registration', tab: 'courses' },
      { id: 'major-minor', label: '• Major / Minor Registration', tab: 'courses' },
    ],
    exam: [
      { id: 'exam-reports', label: 'Exam Reports', hasArrow: true, tab: 'exam' },
      { id: 'exam-schedule', label: '• Exam Schedule', tab: 'exam' },
      { id: 'hall-tickets', label: '• My Hall Tickets', tab: 'exam' },
      { id: 'exam-score', label: '• Exam Score', tab: 'exam' },
      { id: 'score-card', label: '• Score Card', tab: 'exam' },
      { id: 'exam-form', label: '• My Exam Form', tab: 'exam' },
      { id: 'student-result', label: '• Student Result', tab: 'exam' },
      { id: 'exam-grievance', label: '• My Exam Grievance', tab: 'exam' },
    ],
    attendance: [
      { id: 'student-attendance', label: '• Student Attendance', tab: 'attendance' },
      { id: 'subject-attendance', label: '• Subject Wise Attendance', tab: 'attendance' },
    ],
    finance: [
      { id: 'fees-details', label: '• Student Fees Details', tab: 'finance' },
      { id: 'online-receipts', label: '• Online Payment Receipts', tab: 'finance' },
    ],
    feedback: [
      { id: 'course-feedback', label: '• Student Feedback', tab: 'feedback' },
    ],
    library: [
      { id: 'library-search', label: '• Library Book Search / OPAC', tab: 'library' },
      { id: 'issued-books', label: '• Issued Books & Dues', tab: 'library' },
    ],
  };

  const activeSubMenuItems = hoveredItem && subMenus[hoveredItem];

  return (
    <aside 
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => {
        setIsExpanded(false);
        setHoveredItem(null);
      }}
      className={`bg-[#2b2d32] text-slate-300 transition-all duration-200 shrink-0 flex flex-col z-30 shadow-md relative ${
        isExpanded ? 'w-52' : 'w-14'
      }`}
      style={{ minHeight: 'calc(100vh - 3.5rem)' }}
    >
      
      {/* Navigation List */}
      <nav className="py-2 space-y-0.5 flex-1 relative">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isItemActive = activeTab === item.id || (item.id === 'admission' && activeTab === 'student-info');
          const isHovered = hoveredItem === item.id;

          return (
            <div
              key={item.id}
              onMouseEnter={() => setHoveredItem(item.id)}
              className="relative"
            >
              <button
                onClick={() => {
                  if (item.id === 'admission') {
                    setActiveTab('student-info');
                  } else {
                    setActiveTab(item.id);
                  }
                  setHoveredItem(null);
                }}
                className={`w-full flex items-center h-11 px-4 transition-colors group relative ${
                  isHovered || isItemActive
                    ? 'bg-[#1e2023] text-white font-medium border-l-3 border-orange-500'
                    : 'hover:bg-[#34373d] text-slate-300 hover:text-white'
                }`}
                title={!isExpanded ? item.label : undefined}
              >
                {/* Icon */}
                <div className="w-6 flex items-center justify-center shrink-0">
                  <Icon className={`w-4 h-4 ${isItemActive || isHovered ? 'text-white' : 'text-slate-300 group-hover:text-white'}`} />
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
            </div>
          );
        })}

        {/* Flyout Submenu Panel (Exact Match to Screenshot 1, 2, 3) */}
        {isExpanded && activeSubMenuItems && (
          <div 
            onMouseEnter={() => setHoveredItem(hoveredItem)}
            onMouseLeave={() => setHoveredItem(null)}
            className="absolute left-full top-0 w-60 bg-[#2b2d32] border-l border-[#3a3d44] shadow-2xl py-2 z-50 text-[13px] text-slate-300 select-none animate-in fade-in slide-in-from-left-1 duration-150"
            style={{ minHeight: '100%' }}
          >
            {activeSubMenuItems.map((sub) => (
              <div
                key={sub.id}
                onClick={() => {
                  setActiveTab(sub.tab);
                  setHoveredItem(null);
                }}
                className="py-2.5 px-5 hover:bg-[#34373d] hover:text-white cursor-pointer transition-colors flex items-center justify-between group"
              >
                <span className="truncate">{sub.label}</span>
                {sub.hasArrow && (
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-white shrink-0" />
                )}
              </div>
            ))}
          </div>
        )}

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
