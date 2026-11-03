import React from 'react';
import { 
  Calendar, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  CreditCard, 
  FileText,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export const InstallmentSchedule = ({ 
  installments, 
  onPayInstallment, 
  onViewReceipt 
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-5 border-b border-slate-100">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <span>Academic Year Installment Schedule</span>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-cyber-50 text-cyber-700 border border-cyber-200">
              Session 2026-2027
            </span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Institutional fee plan divided into 3 equal terms with zero interest financing.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Autonomous Finance Verified</span>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {installments.map((inst, index) => {
          const isPaid = inst.status === 'Paid';
          const isPending = inst.status === 'Pending';
          const isOverdue = inst.status === 'Overdue';

          return (
            <div
              key={inst.id}
              className={`p-5 rounded-xl border transition-all ${
                isPaid
                  ? 'bg-emerald-50/20 border-emerald-200/80'
                  : isOverdue
                  ? 'bg-red-50/20 border-red-200/80'
                  : 'bg-slate-50/60 border-slate-200/90 hover:border-cyber-300'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                
                {/* Left: Term & Details */}
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-sm text-slate-900">
                      {inst.term}
                    </span>
                    <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full border ${
                      isPaid
                        ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                        : isOverdue
                        ? 'bg-red-100 text-red-800 border-red-300'
                        : 'bg-amber-100 text-amber-800 border-amber-300'
                    }`}>
                      {inst.status}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-slate-500">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>Due Date: <strong>{new Date(inst.dueDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</strong></span>
                    </div>

                    {isPaid && (
                      <div className="flex items-center gap-1.5 text-emerald-700 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Paid on {new Date(inst.paidDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                      </div>
                    )}

                    {inst.paymentMethod && (
                      <span className="text-[11px] bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-600">
                        {inst.paymentMethod}
                      </span>
                    )}

                    {inst.transactionId && (
                      <span className="text-[11px] font-mono text-slate-500">
                        Txn: {inst.transactionId}
                      </span>
                    )}
                  </div>
                </div>

                {/* Right: Amount & Actions */}
                <div className="flex items-center justify-between lg:justify-end gap-4 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-200/60">
                  <div className="text-right">
                    <span className="text-xs text-slate-400 block">Term Amount</span>
                    <span className="text-xl font-black text-slate-900 tracking-tight">
                      ₹{inst.amount.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div>
                    {isPaid ? (
                      <button
                        onClick={() => onViewReceipt(inst.receiptNumber)}
                        className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 border border-slate-200 text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5"
                      >
                        <FileText className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Receipt</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => onPayInstallment(inst)}
                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyber-600 to-indigo-600 hover:from-cyber-700 hover:to-indigo-700 text-white text-xs font-bold shadow-md shadow-cyber-600/20 transition-all flex items-center gap-1.5"
                      >
                        <CreditCard className="w-3.5 h-3.5" />
                        <span>Pay Term</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
