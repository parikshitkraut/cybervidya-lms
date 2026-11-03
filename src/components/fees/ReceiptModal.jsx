import React, { useRef } from 'react';
import { 
  Printer, 
  Download, 
  CheckCircle2, 
  QrCode, 
  Building2, 
  FileCheck,
  ShieldCheck,
  X
} from 'lucide-react';
import { INSTITUTION } from '../../data/mockData';

export const ReceiptModal = ({ isOpen, onClose, receipt, student }) => {
  if (!isOpen || !receipt) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Generate a printable window or trigger print
    window.print();
  };

  // Convert amount to Indian words roughly
  const amountInWords = (amount) => {
    if (amount === 40000) return "Rupees Forty Thousand Only";
    if (amount === 80000) return "Rupees Eighty Thousand Only";
    if (amount === 120000) return "Rupees One Lakh Twenty Thousand Only";
    return `Rupees ${amount.toLocaleString('en-IN')} Only`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity no-print"
        onClick={onClose}
      />

      <div className="min-h-full flex items-center justify-center p-4 sm:p-6">
        <div 
          className="relative transform overflow-hidden rounded-2xl bg-white text-left shadow-2xl transition-all w-full max-w-3xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150 print:m-0 print:border-none print:shadow-none"
          onClick={(e) => e.stopPropagation()}
        >
          
          {/* Action Toolbar (Hidden in Print) */}
          <div className="no-print px-6 py-3 bg-slate-100 border-b border-slate-200 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-emerald-600" />
              <span>Official Institutional Fee Receipt (Verified)</span>
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="px-3 py-1.5 rounded-lg bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 text-xs font-semibold shadow-sm flex items-center gap-1.5 transition-all"
              >
                <Printer className="w-3.5 h-3.5 text-cyber-600" />
                <span>Print Receipt</span>
              </button>
              <button
                onClick={handleDownload}
                className="px-3 py-1.5 rounded-lg bg-cyber-600 hover:bg-cyber-700 text-white text-xs font-semibold shadow-sm flex items-center gap-1.5 transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF</span>
              </button>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors ml-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Printable Receipt Content */}
          <div className="p-8 print:p-0 print-area text-slate-900 bg-white">
            
            {/* Header */}
            <div className="text-center border-b-2 border-slate-800 pb-4">
              <div className="flex items-center justify-center gap-3 mb-1">
                <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center font-black text-xl tracking-tighter">
                  {INSTITUTION.shortName}
                </div>
                <div>
                  <h1 className="text-xl font-extrabold text-slate-950 uppercase tracking-tight">
                    {INSTITUTION.name}
                  </h1>
                  <p className="text-[11px] font-semibold text-slate-600">
                    {INSTITUTION.accreditation}
                  </p>
                </div>
              </div>
              <p className="text-[10px] text-slate-500 max-w-xl mx-auto leading-relaxed">
                {INSTITUTION.affiliation} • {INSTITUTION.address}
              </p>
              <div className="mt-3 inline-block px-4 py-1 rounded-full bg-slate-100 text-slate-900 text-xs font-black uppercase tracking-wider border border-slate-300">
                OFFICIAL STUDENT FEE RECEIPT ({INSTITUTION.academicYear})
              </div>
            </div>

            {/* Receipt Meta & Student Details Grid */}
            <div className="grid grid-cols-2 gap-4 py-4 border-b border-slate-200 text-xs">
              <div className="space-y-1">
                <div>
                  <span className="text-slate-500">Student Name: </span>
                  <strong className="text-slate-900 font-bold uppercase">{student?.name || receipt.payerName}</strong>
                </div>
                <div>
                  <span className="text-slate-500">PRN / Enrollment: </span>
                  <strong className="text-slate-900 font-mono font-bold">{student?.prn || '2023BCSE042'}</strong>
                </div>
                <div>
                  <span className="text-slate-500">Program / Branch: </span>
                  <span className="text-slate-800 font-medium">{student?.branch || 'B.Tech Computer Science & Engineering'}</span>
                </div>
                <div>
                  <span className="text-slate-500">Semester & Roll No: </span>
                  <span className="text-slate-800 font-medium">Semester {student?.semester || 6} ({student?.section || 'CSE-A'}) • Roll: {student?.rollNo || 'CSE-42'}</span>
                </div>
              </div>

              <div className="space-y-1 text-right">
                <div>
                  <span className="text-slate-500">Receipt No: </span>
                  <strong className="text-cyber-700 font-mono font-bold">{receipt.receiptNumber}</strong>
                </div>
                <div>
                  <span className="text-slate-500">Transaction ID: </span>
                  <strong className="text-slate-800 font-mono">{receipt.transactionId}</strong>
                </div>
                <div>
                  <span className="text-slate-500">Payment Date: </span>
                  <span className="text-slate-800 font-medium">
                    {new Date(receipt.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })} at {receipt.time}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500">Payment Mode: </span>
                  <span className="font-semibold text-slate-900">{receipt.paymentMethod}</span>
                </div>
              </div>
            </div>

            {/* Fee Particulars Table */}
            <div className="mt-4">
              <table className="w-full text-left text-xs border border-slate-300">
                <thead className="bg-slate-100 border-b border-slate-300 font-bold uppercase text-[10px] text-slate-700">
                  <tr>
                    <th className="py-2.5 px-3 border-r border-slate-300 w-12 text-center">Sr.</th>
                    <th className="py-2.5 px-3 border-r border-slate-300">Particulars / Fee Head</th>
                    <th className="py-2.5 px-3 border-r border-slate-300">Remarks / Term</th>
                    <th className="py-2.5 px-3 text-right">Amount Paid (₹)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr>
                    <td className="py-2.5 px-3 border-r border-slate-200 text-center font-mono">1</td>
                    <td className="py-2.5 px-3 border-r border-slate-200 font-medium">
                      College Academic Tuition & Development Fee
                    </td>
                    <td className="py-2.5 px-3 border-r border-slate-200 text-slate-600">
                      {receipt.description || 'Session 2026-27 Installment'}
                    </td>
                    <td className="py-2.5 px-3 text-right font-bold text-slate-900">
                      ₹{receipt.amount.toLocaleString('en-IN')}
                    </td>
                  </tr>
                  <tr className="bg-slate-50/50 font-bold text-slate-900 border-t-2 border-slate-300">
                    <td colSpan="3" className="py-3 px-3 text-right uppercase tracking-wider text-[11px]">
                      Net Amount Received
                    </td>
                    <td className="py-3 px-3 text-right text-sm font-black text-slate-950">
                      ₹{receipt.amount.toLocaleString('en-IN')}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Amount in words */}
            <div className="mt-3 p-2.5 rounded bg-slate-50 border border-slate-200 text-xs">
              <span className="text-slate-500 font-medium">Amount Received in Words: </span>
              <strong className="text-slate-900 font-bold uppercase">{amountInWords(receipt.amount)}</strong>
            </div>

            {/* Footer with Seal & QR Verification */}
            <div className="mt-8 pt-4 border-t-2 border-slate-200 flex items-end justify-between text-xs">
              
              {/* QR Verification */}
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 p-1 bg-white border border-slate-300 rounded flex items-center justify-center">
                  <QrCode className="w-14 h-14 text-slate-900" />
                </div>
                <div className="text-[10px] text-slate-500 space-y-0.5">
                  <span className="font-bold text-emerald-700 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Digitally Signed & Validated</span>
                  </span>
                  <p className="font-mono">Ref: {receipt.bankReference || 'RZP-DIRECT'}</p>
                  <p>Verify at: jitn.cybervidya.net/verify</p>
                </div>
              </div>

              {/* Signature Stamp */}
              <div className="text-center">
                <div className="w-40 border-b border-slate-400 pb-1 mb-1">
                  <span className="font-serif italic font-bold text-indigo-900 text-sm">
                    P. K. Deshmukh
                  </span>
                </div>
                <p className="font-bold text-[11px] text-slate-800">Finance & Accounts Officer</p>
                <p className="text-[9px] text-slate-500">{INSTITUTION.name}</p>
              </div>

            </div>

            {/* Note */}
            <div className="mt-6 text-[9px] text-slate-400 text-center border-t border-slate-100 pt-2">
              Note: This is a system-generated computer receipt issued by the CyberVidya ERP System of {INSTITUTION.name}. Retain this receipt for university examination form submission and semester registration.
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
