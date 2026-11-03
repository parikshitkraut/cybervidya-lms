import React, { useEffect } from 'react';
import { CheckCircle2, Download, ArrowRight, ShieldCheck, FileCheck, Share2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Modal } from '../common/Modal';
import { INSTITUTION } from '../../data/mockData';

export const PaymentSuccessModal = ({ 
  isOpen, 
  onClose, 
  paymentRecord, 
  onViewReceipt,
  student 
}) => {
  useEffect(() => {
    if (isOpen) {
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        console.log('Confetti triggered', e);
      }
    }
  }, [isOpen]);

  if (!isOpen || !paymentRecord) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Payment Successful & Confirmed"
      subtitle="CyberVidya Autonomous Financial Reconciled"
      maxWidth="max-w-lg"
    >
      <div className="text-center py-4 space-y-5">
        
        {/* Animated Green Badge */}
        <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner animate-in zoom-in-50 duration-300">
          <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
        </div>

        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            Transaction Cleared • 100% Verified
          </span>
          <h3 className="text-2xl font-black text-slate-900 mt-2">
            ₹{paymentRecord.amount.toLocaleString('en-IN')}
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Payment successfully processed via {paymentRecord.paymentMethod}
          </p>
        </div>

        {/* Transaction Summary Card */}
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-left text-xs space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-slate-500">Official Receipt No:</span>
            <strong className="text-cyber-700 font-mono font-bold">{paymentRecord.receiptNumber}</strong>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-500">Transaction ID:</span>
            <span className="font-mono text-slate-800 font-semibold">{paymentRecord.transactionId}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-500">Student PRN:</span>
            <span className="font-mono text-slate-800">{student?.prn || '2023BCSE042'}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-500">Date & Time:</span>
            <span className="text-slate-800">{paymentRecord.date} at {paymentRecord.time}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-500">Gateway Status:</span>
            <span className="text-emerald-700 font-bold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Authorized & Reconciled</span>
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-2 pt-2">
          <button
            onClick={() => {
              onClose();
              onViewReceipt(paymentRecord.receiptNumber);
            }}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyber-600 to-indigo-600 hover:from-cyber-700 hover:to-indigo-700 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-cyber-600/20 flex items-center justify-center gap-2 transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Download Official Receipt PDF</span>
          </button>

          <button
            onClick={onClose}
            className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors"
          >
            Return to Student Dashboard
          </button>
        </div>

        <p className="text-[10px] text-slate-400">
          A digital copy of this fee receipt has also been dispatched to your registered email: {student?.email}
        </p>

      </div>
    </Modal>
  );
};
