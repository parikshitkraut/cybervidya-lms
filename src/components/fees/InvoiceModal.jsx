import React from 'react';
import { Printer, Download, FileText, CheckCircle, ShieldCheck, X } from 'lucide-react';
import { INSTITUTION } from '../../data/mockData';

export const InvoiceModal = ({ isOpen, onClose, transaction, student, feeSummary }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div 
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity no-print"
        onClick={onClose}
      />

      <div className="min-h-full flex items-center justify-center p-4 sm:p-6">
        <div 
          className="relative transform overflow-hidden rounded-2xl bg-white text-left shadow-2xl transition-all w-full max-w-3xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150 print:m-0 print:border-none print:shadow-none"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Action Toolbar */}
          <div className="no-print px-6 py-3 bg-slate-100 border-b border-slate-200 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 flex items-center gap-2">
              <FileText className="w-4 h-4 text-cyber-600" />
              <span>Academic Fee Invoice & Demand Note</span>
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="px-3 py-1.5 rounded-lg bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 text-xs font-semibold shadow-sm flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5 text-cyber-600" />
                <span>Print Invoice</span>
              </button>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors ml-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Printable Invoice */}
          <div className="p-8 print:p-0 print-area text-slate-900 bg-white">
            
            {/* Header */}
            <div className="flex items-start justify-between border-b-2 border-slate-900 pb-5">
              <div>
                <h1 className="text-xl font-extrabold text-slate-950 uppercase tracking-tight">
                  {INSTITUTION.name}
                </h1>
                <p className="text-xs text-slate-600 mt-0.5">{INSTITUTION.accreditation}</p>
                <p className="text-[10px] text-slate-400 max-w-sm mt-1">{INSTITUTION.address}</p>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Tax Invoice</span>
                <div className="text-lg font-black font-mono text-slate-900 mt-0.5">
                  {transaction?.invoiceNumber || 'INV-2026-0842'}
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Date: {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                </p>
                <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                  Status: Billed & Reconciled
                </span>
              </div>
            </div>

            {/* Billed To / Student Details */}
            <div className="grid grid-cols-2 gap-4 py-4 border-b border-slate-200 text-xs">
              <div>
                <span className="text-slate-400 font-semibold uppercase text-[10px] tracking-wider block mb-1">
                  Billed To (Student)
                </span>
                <strong className="text-sm font-bold text-slate-900 block">{student.name}</strong>
                <p className="text-slate-600">PRN: <strong className="font-mono">{student.prn}</strong> | Roll: {student.rollNo}</p>
                <p className="text-slate-600">{student.branch} ({student.program})</p>
                <p className="text-slate-500">{student.email} • {student.phone}</p>
              </div>
              <div className="text-right space-y-1">
                <span className="text-slate-400 font-semibold uppercase text-[10px] tracking-wider block mb-1">
                  Institutional Accounts
                </span>
                <p className="text-slate-700 font-medium">Finance Office, CyberVidya ERP</p>
                <p className="text-slate-500">Bank: Axis Bank, Nagpur Main Branch</p>
                <p className="text-slate-500 font-mono">A/C: 923010048291048</p>
                <p className="text-slate-500 font-mono">IFSC: UTIB0000042</p>
              </div>
            </div>

            {/* Itemized Table */}
            <div className="mt-5">
              <table className="w-full text-left text-xs border border-slate-300">
                <thead className="bg-slate-100 border-b border-slate-300 font-bold uppercase text-[10px] text-slate-700">
                  <tr>
                    <th className="py-2.5 px-3 border-r border-slate-300 w-12 text-center">#</th>
                    <th className="py-2.5 px-3 border-r border-slate-300">Fee Head Description</th>
                    <th className="py-2.5 px-3 border-r border-slate-300 text-center">Session</th>
                    <th className="py-2.5 px-3 text-right">Standard Fee (₹)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {feeSummary.feeBreakdown.map((item, idx) => (
                    <tr key={idx}>
                      <td className="py-2.5 px-3 border-r border-slate-200 text-center font-mono">{idx + 1}</td>
                      <td className="py-2.5 px-3 border-r border-slate-200 font-medium">
                        {item.head}
                        <span className="block text-[10px] text-slate-400">{item.remarks}</span>
                      </td>
                      <td className="py-2.5 px-3 border-r border-slate-200 text-center text-slate-500">
                        {INSTITUTION.academicYear}
                      </td>
                      <td className="py-2.5 px-3 text-right font-medium">
                        ₹{item.amount.toLocaleString('en-IN')}
                      </td>
                    </tr>
                  ))}
                  
                  {/* Gross Total */}
                  <tr className="bg-slate-50/50 font-bold text-slate-800">
                    <td colSpan="3" className="py-2.5 px-3 text-right uppercase text-[10px]">
                      Gross Institutional Fee:
                    </td>
                    <td className="py-2.5 px-3 text-right font-bold">
                      ₹{feeSummary.totalCourseFees.toLocaleString('en-IN')}
                    </td>
                  </tr>

                  {/* Scholarship Deduction */}
                  <tr className="bg-emerald-50/30 text-emerald-800 font-bold">
                    <td colSpan="3" className="py-2.5 px-3 text-right uppercase text-[10px]">
                      Less: State EBC & Merit Scholarship Waiver:
                    </td>
                    <td className="py-2.5 px-3 text-right font-bold text-emerald-700">
                      -₹{feeSummary.scholarshipDiscount.toLocaleString('en-IN')}
                    </td>
                  </tr>

                  {/* Net Payable */}
                  <tr className="bg-slate-900 text-white font-black text-sm">
                    <td colSpan="3" className="py-3 px-3 text-right uppercase tracking-wider text-xs">
                      Net Academic Annual Payable:
                    </td>
                    <td className="py-3 px-3 text-right font-extrabold text-base">
                      ₹{feeSummary.netPayableFees.toLocaleString('en-IN')}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Reconciliation Note */}
            <div className="mt-5 p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
              <div>
                <span className="text-slate-500">Total Amount Paid So Far: </span>
                <strong className="text-emerald-700 font-bold">₹{feeSummary.amountPaid.toLocaleString('en-IN')}</strong>
              </div>
              <div>
                <span className="text-slate-500">Current Outstanding Balance: </span>
                <strong className="text-amber-700 font-bold">₹{feeSummary.outstandingBalance.toLocaleString('en-IN')}</strong>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-8 pt-4 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-400">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>GST Exempted under Section 12AA of the Income Tax Act for Educational Services.</span>
              </div>
              <p>Generated by CyberVidya ERP System</p>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
