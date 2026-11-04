import React from 'react';
import { Home, User, CreditCard, FileText, Menu } from 'lucide-react';

export const MobileBottomBar = ({ 
  activeTab, 
  setActiveTab, 
  onOpenMenu 
}) => {
  const isProfileActive = activeTab === 'student-info' || activeTab === 'admission';
  const isFinanceActive = activeTab === 'finance';
  const isExamActive = activeTab === 'exam';
  const isHomeActive = activeTab === 'home';

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 shadow-lg px-2 py-1 flex items-center justify-around select-none">
      
      {/* 1. Home */}
      <button
        onClick={() => setActiveTab('home')}
        className={`flex-1 flex flex-col items-center justify-center py-1 transition-all ${
          isHomeActive 
            ? 'text-orange-500 font-bold scale-105' 
            : 'text-slate-500 hover:text-slate-800'
        }`}
      >
        <Home className="w-5 h-5 mb-0.5" />
        <span className="text-[10px] tracking-tight">Home</span>
      </button>

      {/* 2. Profile / Student Information */}
      <button
        onClick={() => setActiveTab('student-info')}
        className={`flex-1 flex flex-col items-center justify-center py-1 transition-all ${
          isProfileActive 
            ? 'text-orange-500 font-bold scale-105' 
            : 'text-slate-500 hover:text-slate-800'
        }`}
      >
        <User className="w-5 h-5 mb-0.5" />
        <span className="text-[10px] tracking-tight">Profile</span>
      </button>

      {/* 3. Fees / Finance */}
      <button
        onClick={() => setActiveTab('finance')}
        className={`flex-1 flex flex-col items-center justify-center py-1 transition-all ${
          isFinanceActive 
            ? 'text-orange-500 font-bold scale-105' 
            : 'text-slate-500 hover:text-slate-800'
        }`}
      >
        <div className="relative">
          <CreditCard className="w-5 h-5 mb-0.5" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-500 rounded-full ring-1 ring-white" />
        </div>
        <span className="text-[10px] tracking-tight">Fees</span>
      </button>

      {/* 4. Exam */}
      <button
        onClick={() => setActiveTab('exam')}
        className={`flex-1 flex flex-col items-center justify-center py-1 transition-all ${
          isExamActive 
            ? 'text-orange-500 font-bold scale-105' 
            : 'text-slate-500 hover:text-slate-800'
        }`}
      >
        <FileText className="w-5 h-5 mb-0.5" />
        <span className="text-[10px] tracking-tight">Exam</span>
      </button>

      {/* 5. Menu Drawer Toggle */}
      <button
        onClick={onOpenMenu}
        className="flex-1 flex flex-col items-center justify-center py-1 text-slate-500 hover:text-slate-800 transition-all active:scale-95"
      >
        <Menu className="w-5 h-5 mb-0.5 text-slate-700" />
        <span className="text-[10px] tracking-tight font-medium">Menu</span>
      </button>

    </nav>
  );
};
