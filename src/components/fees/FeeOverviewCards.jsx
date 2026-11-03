import React from 'react';
import { 
  CreditCard, 
  CheckCircle, 
  AlertTriangle, 
  Calendar, 
  ArrowUpRight, 
  FileText, 
  Download,
  IndianRupee,
  ShieldAlert
} from 'lucide-react';

export const FeeOverviewCards = ({ feeSummary, onPayNow, onViewBreakdown }) => {
  const {
    totalCourseFees,
    scholarshipDiscount,
    netPayableFees,
    amountPaid,
    outstandingBalance,
    nextPaymentDueDate,
  } = feeSummary;

  const paidPercentage = Math.round((amountPaid / netPayableFees) * 100);

  const formattedDate = new Date(nextPaymentDueDate).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  return (
    <div className="space-y-4">
      {/* Pending Alert Banner if balance > 0 */}
      {outstandingBalance > 0 && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-300/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-amber-500 text-white shrink-0">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-amber-950">
                Action Required: Term 3 Fee Payment Due on {formattedDate}
              </h4>
              <p className="text-xs text-amber-800/90 mt-0.5">
                Outstanding balance of <strong className="font-semibold">₹{outstandingBalance.toLocaleString('en-IN')}</strong> must be cleared before the due date to ensure automatic university exam hall-ticket release.
              </p>
            </div>
          </div>
          <button
            onClick={() => onPayNow(outstandingBalance)}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white text-xs font-bold shadow-md shadow-amber-600/20 shrink-0 transition-all flex items-center justify-center gap-1.5"
          >
            <CreditCard className="w-4 h-4" />
            <span>Pay Due Now</span>
          </button>
        </div>
      )}

      {/* 4 Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Net Course Fee */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm relative overflow-hidden group hover:border-cyber-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Net Course Fee</span>
            <div className="w-8 h-8 rounded-lg bg-cyber-50 text-cyber-600 flex items-center justify-center">
              <IndianRupee className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-extrabold text-slate-900 tracking-tight">
              ₹{netPayableFees.toLocaleString('en-IN')}
            </div>
            <div className="flex items-center gap-2 mt-1.5">
              <span className="text-[11px] text-slate-400 line-through">₹{totalCourseFees.toLocaleString('en-IN')}</span>
              <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                -₹{scholarshipDiscount.toLocaleString('en-IN')} Scholarship
              </span>
            </div>
          </div>
          <button
            onClick={onViewBreakdown}
            className="mt-4 text-[11px] font-semibold text-cyber-600 hover:text-cyber-700 flex items-center gap-1"
          >
            <span>View Fee Breakdown</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Card 2: Total Paid */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm relative overflow-hidden group hover:border-emerald-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Amount Paid</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-extrabold text-emerald-600 tracking-tight">
              ₹{amountPaid.toLocaleString('en-IN')}
            </div>
            <div className="mt-2 w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
              <div 
                className="bg-emerald-500 h-1.5 rounded-full transition-all duration-500" 
                style={{ width: `${paidPercentage}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-500 mt-1.5 font-medium">
              {paidPercentage}% of academic dues cleared
            </p>
          </div>
        </div>

        {/* Card 3: Outstanding Balance */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm relative overflow-hidden group hover:border-amber-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Outstanding Balance</span>
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
              outstandingBalance > 0 ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'
            }`}>
              {outstandingBalance > 0 ? <AlertTriangle className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
            </div>
          </div>
          <div className="mt-3">
            <div className={`text-2xl font-extrabold tracking-tight ${
              outstandingBalance > 0 ? 'text-amber-600' : 'text-emerald-600'
            }`}>
              ₹{outstandingBalance.toLocaleString('en-IN')}
            </div>
            <div className="mt-1.5">
              <span className={`inline-block text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                outstandingBalance > 0 
                  ? 'bg-amber-100 text-amber-800' 
                  : 'bg-emerald-100 text-emerald-800'
              }`}>
                {outstandingBalance > 0 ? 'Installment Due' : 'All Clear / No Dues'}
              </span>
            </div>
          </div>
        </div>

        {/* Card 4: Next Due Date */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm relative overflow-hidden group hover:border-vidya-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Next Payment Due</span>
            <div className="w-8 h-8 rounded-lg bg-vidya-50 text-vidya-600 flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-xl font-extrabold text-slate-900 tracking-tight">
              {outstandingBalance > 0 ? formattedDate : 'N/A (Cleared)'}
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              {outstandingBalance > 0 ? 'Term 3 (Even Semester Final)' : 'Current session paid in full'}
            </p>
          </div>
          {outstandingBalance > 0 && (
            <div className="mt-3 text-[10px] text-slate-400">
              Grace period: 7 days without late penalty
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
