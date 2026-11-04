import React from 'react';
import { Printer, Download, QrCode, ShieldCheck, X } from 'lucide-react';
import { INSTITUTION } from '../../data/mockData';
import jitLogo from '../../assets/jit-logo.png';

export const ReceiptModal = ({ isOpen, onClose, receipt, student }) => {
  if (!isOpen || !receipt) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div 
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity no-print"
        onClick={onClose}
      />

      <div className="min-h-full flex items-center justify-center p-4">
        <div 
          className="relative transform overflow-hidden rounded bg-white text-left shadow-2xl transition-all w-full max-w-2xl border border-slate-200 animate-in fade-in zoom-in-95 print:m-0 print:border-none print:shadow-none"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Action Toolbar (no-print) */}
          <div className="no-print px-5 py-2.5 bg-slate-100 border-b border-slate-200 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700">Official Computerized Fee Receipt</span>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="px-3 py-1 bg-white hover:bg-slate-50 border border-slate-300 rounded text-xs font-semibold text-slate-700 flex items-center gap-1 shadow-xs"
              >
                <Printer className="w-3.5 h-3.5 text-blue-600" />
                <span>Print</span>
              </button>
              <button
                onClick={() => {
                  if (receipt.pdfUrl) {
                    const link = document.createElement('a');
                    link.href = receipt.pdfUrl;
                    link.setAttribute('download', receipt.fileName || `${receipt.voucherNo || 'FEE_RECEIPT'}.pdf`);
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  } else {
                    handlePrint();
                  }
                }}
                className="px-3 py-1 bg-[#18b82a] hover:bg-[#15a225] text-white rounded text-xs font-bold flex items-center gap-1 shadow-xs cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF</span>
              </button>
              <button
                onClick={onClose}
                className="p-1 text-slate-400 hover:text-slate-600 ml-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Printable Receipt Area */}
          <div className="p-8 print:p-0 print-area text-slate-900 bg-white space-y-4">
            
            {/* College Header with Logo */}
            <div className="text-center border-b-2 border-slate-900 pb-3">
              <div className="flex items-center justify-center gap-3">
                <img src={jitLogo} alt="JIT Logo" className="h-12 w-12 object-contain" />
                <div>
                  <h1 className="text-base font-extrabold uppercase tracking-tight text-slate-950">
                    {INSTITUTION.name}
                  </h1>
                  <p className="text-[10px] text-slate-600 font-semibold">{INSTITUTION.accreditation}</p>
                </div>
              </div>
              <p className="text-[9px] text-slate-400 mt-1">{INSTITUTION.address}</p>
              <div className="mt-2 inline-block px-3 py-0.5 rounded bg-slate-100 text-slate-800 text-[11px] font-bold uppercase tracking-wider border border-slate-300">
                STUDENT FEES RECEIPT ({student.academicYear})
              </div>
            </div>

            {/* Student Details Grid */}
            <div className="grid grid-cols-2 gap-4 text-[11px] border-b border-slate-200 pb-3">
              <div className="space-y-1">
                <p><span className="text-slate-500">Student Name:</span> <strong className="uppercase">{student.name}</strong></p>
                <p><span className="text-slate-500">Registration No:</span> <strong className="font-mono">{student.registrationNo}</strong></p>
                <p><span className="text-slate-500">Program / Degree:</span> {student.degree} ({student.branchFullName || 'Electrical Engineering'})</p>
                <p><span className="text-slate-500">Year / Semester:</span> Year {student.year} • Semester {student.semester}</p>
              </div>
              <div className="space-y-1 text-right">
                <p><span className="text-slate-500">Receipt No:</span> <strong className="font-mono text-blue-700">{receipt.receiptNumber}</strong></p>
                <p><span className="text-slate-500">Transaction ID:</span> <span className="font-mono">{receipt.transactionId}</span></p>
                <p><span className="text-slate-500">Payment Date:</span> {receipt.date} at {receipt.time}</p>
                <p><span className="text-slate-500">Payment Mode:</span> {receipt.paymentMethod}</p>
              </div>
            </div>

            {/* Particulars Table */}
            <table className="w-full text-left text-[11px] border border-slate-300">
              <thead className="bg-slate-100 border-b border-slate-300 font-bold uppercase text-[10px]">
                <tr>
                  <th className="py-2 px-3 border-r border-slate-300 w-10 text-center">Sr.</th>
                  <th className="py-2 px-3 border-r border-slate-300">Particulars / Fee Head</th>
                  <th className="py-2 px-3 border-r border-slate-300 text-center">Session</th>
                  <th className="py-2 px-3 text-right">Amount Paid</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="py-2 px-3 text-center border-r border-slate-200">1</td>
                  <td className="py-2 px-3 border-r border-slate-200 font-medium">Development & Academic Institutional Fees</td>
                  <td className="py-2 px-3 text-center border-r border-slate-200">{student.academicSession}</td>
                  <td className="py-2 px-3 text-right font-bold">₹ {receipt.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                </tr>
                <tr className="bg-slate-50 font-bold">
                  <td colSpan="3" className="py-2 px-3 text-right uppercase text-[10px]">Total Received Amount</td>
                  <td className="py-2 px-3 text-right font-black text-xs">₹ {receipt.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                </tr>
              </tbody>
            </table>

            {/* Signatures & Seal */}
            <div className="pt-6 border-t border-slate-200 flex items-end justify-between text-[10px]">
              <div className="flex items-center gap-2">
                <QrCode className="w-12 h-12 text-slate-800" />
                <div className="text-slate-400">
                  <p className="font-bold text-emerald-700">CyberVidya Validated</p>
                  <p className="font-mono">{receipt.bankReference}</p>
                </div>
              </div>
              <div className="text-center">
                <div className="w-32 border-b border-slate-400 pb-1 mb-1 font-serif italic text-xs">
                  Accounts Officer
                </div>
                <p className="font-bold text-slate-800">{INSTITUTION.name}</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
