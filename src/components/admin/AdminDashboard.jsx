import React from 'react';
import { 
  TrendingUp, 
  Users, 
  BookOpen, 
  DollarSign, 
  FileCheck2, 
  ArrowUpRight, 
  ShieldAlert, 
  CheckCircle2, 
  Plus, 
  CreditCard,
  Building2
} from 'lucide-react';
import { INSTITUTION } from '../../data/mockData';

export const AdminDashboard = ({ 
  students, 
  courses, 
  paymentHistory, 
  onRecordPayment, 
  setActiveTab 
}) => {
  const totalReceivable = students.reduce((acc, curr) => acc + curr.totalFee, 0);
  const totalCollected = students.reduce((acc, curr) => acc + curr.paidAmount, 0);
  const totalOutstanding = students.reduce((acc, curr) => acc + curr.outstanding, 0);
  const collectionRate = Math.round((totalCollected / totalReceivable) * 100);

  return (
    <div className="space-y-6">
      
      {/* Executive Welcome Hero */}
      <div className="rounded-3xl bg-gradient-to-r from-vidya-950 via-slate-900 to-indigo-950 text-white p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-vidya-500/30 text-vidya-300 border border-vidya-400/30">
              Institutional Administration ERP
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {INSTITUTION.shortName} Academic & Finance Directorate
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Real-time monitoring of campus enrollments, curriculum delivery, biometric attendance, and fee collections for Session {INSTITUTION.academicYear}.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={onRecordPayment}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-vidya-600 to-indigo-600 hover:from-vidya-700 hover:to-indigo-700 text-white text-xs font-bold shadow-lg shadow-vidya-600/30 flex items-center gap-2 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Record Counter Payment</span>
            </button>
            <button
              onClick={() => setActiveTab('admin-fees')}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition-all flex items-center gap-2"
            >
              <DollarSign className="w-4 h-4" />
              <span>Open Fee Register</span>
            </button>
          </div>
        </div>

        <div className="absolute right-0 bottom-0 w-80 h-80 bg-vidya-500/15 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* KPI 1 */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Fee Collection</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-black text-slate-900">
            ₹{(totalCollected / 100000).toFixed(2)} L
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-xs text-emerald-600 font-semibold">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>{collectionRate}% Realization Rate</span>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Outstanding Dues</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <ShieldAlert className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-black text-amber-600">
            ₹{(totalOutstanding / 100000).toFixed(2)} L
          </div>
          <span className="text-xs text-slate-400 mt-2 block">
            Due by 15th Nov 2026
          </span>
        </div>

        {/* KPI 3 */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Active Students</span>
            <div className="w-8 h-8 rounded-lg bg-cyber-50 text-cyber-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-black text-slate-900">
            {students.length * 80}+ Enrolled
          </div>
          <span className="text-xs text-slate-400 mt-2 block">
            Across 5 Engineering Branches
          </span>
        </div>

        {/* KPI 4 */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Accredited Courses</span>
            <div className="w-8 h-8 rounded-lg bg-vidya-50 text-vidya-600 flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-black text-slate-900">
            {courses.length} Active
          </div>
          <span className="text-xs text-slate-400 mt-2 block">
            Semester 6 Curriculum
          </span>
        </div>

      </div>

      {/* Main Grid: Collections Feed & Defaulters */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: Recent Payments Log (2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900">Recent Real-time Fee Transactions</h3>
              <p className="text-xs text-slate-500">Live payment gateway reconciliations and cash counter receipts.</p>
            </div>
            <button
              onClick={() => setActiveTab('admin-reports')}
              className="text-xs font-semibold text-vidya-600 hover:text-vidya-700 flex items-center gap-1"
            >
              <span>Full Register</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {paymentHistory.map((pay) => (
              <div key={pay.id} className="py-3.5 flex items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-slate-900">{pay.payerName}</span>
                    <span className="font-mono text-[10px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-600">
                      {pay.receiptNumber}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    {pay.paymentMethod} • {pay.date} at {pay.time}
                  </p>
                </div>

                <div className="text-right">
                  <span className="font-black text-sm text-slate-900 block">
                    +₹{pay.amount.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    {pay.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Urgent Follow-ups / Defaulter Notice (1 col) */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4 h-fit">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-600" />
              <span>Pending Fee Defaulters</span>
            </h3>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-800">
              Session VI
            </span>
          </div>

          <div className="space-y-3">
            {students.filter(s => s.outstanding > 0).slice(0, 4).map((s) => (
              <div key={s.id} className="p-3 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-900">{s.name}</span>
                  <span className="text-xs font-black text-amber-600">
                    ₹{s.outstanding.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <span className="font-mono">{s.prn}</span>
                  <span>Roll: {s.rollNo}</span>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => setActiveTab('admin-fees')}
            className="w-full py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
          >
            Review All Defaulters & Send SMS
          </button>
        </div>

      </div>

    </div>
  );
};
