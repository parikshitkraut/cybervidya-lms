import React, { useState } from 'react';
import { FileCheck2, Download, Printer, Filter, Calendar, TrendingUp, IndianRupee } from 'lucide-react';
import { INSTITUTION } from '../../data/mockData';

export const AdminReports = ({ students, paymentHistory }) => {
  const [selectedBranch, setSelectedBranch] = useState('All');

  const branchReports = [
    { branch: "Computer Science & Engineering", billed: 4850000, collected: 3620000, count: 180 },
    { branch: "Artificial Intelligence & Data Science", billed: 3200000, collected: 2450000, count: 120 },
    { branch: "Electronics & Communication", billed: 2700000, collected: 1980000, count: 90 },
    { branch: "Mechanical Engineering", billed: 2200000, collected: 1650000, count: 80 },
    { branch: "Electrical Engineering", billed: 2100000, collected: 1540000, count: 70 },
  ];

  const handleExportCSV = () => {
    let csv = "Receipt No,Transaction ID,Payer,Amount,Date,Method,Status\n";
    paymentHistory.forEach(p => {
      csv += `"${p.receiptNumber}","${p.transactionId}","${p.payerName}",${p.amount},"${p.date}","${p.paymentMethod}","${p.status}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `JITN_Fee_Collection_Report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm no-print">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Institutional Fee Collection Reports</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Audit-ready accounts ledger and branch-wise realization summaries.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-vidya-600 to-indigo-600 hover:from-vidya-700 hover:to-indigo-700 text-white text-xs font-bold shadow-md shadow-vidya-600/20 flex items-center gap-1.5"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Audit Report</span>
          </button>
        </div>
      </div>

      {/* Branch Breakdown Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-6 space-y-4">
        <h3 className="text-base font-bold text-slate-900">Branch-wise Realization Matrix</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-4">Engineering Department</th>
                <th className="py-3 px-4 text-center">Students</th>
                <th className="py-3 px-4 text-right">Total Billed</th>
                <th className="py-3 px-4 text-right">Realized Fees</th>
                <th className="py-3 px-4 text-right">Outstanding</th>
                <th className="py-3 px-4 text-center">Collection %</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {branchReports.map((b, idx) => {
                const outstanding = b.billed - b.collected;
                const pct = Math.round((b.collected / b.billed) * 100);
                return (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="py-3 px-4 font-bold text-slate-800">{b.branch}</td>
                    <td className="py-3 px-4 text-center text-slate-600">{b.count}</td>
                    <td className="py-3 px-4 text-right font-medium">₹{(b.billed / 100000).toFixed(2)} L</td>
                    <td className="py-3 px-4 text-right font-bold text-emerald-600">₹{(b.collected / 100000).toFixed(2)} L</td>
                    <td className="py-3 px-4 text-right font-bold text-amber-600">₹{(outstanding / 100000).toFixed(2)} L</td>
                    <td className="py-3 px-4 text-center">
                      <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                        {pct}%
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Transaction Audit Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
        <h3 className="text-base font-bold text-slate-900">Detailed Transaction Log (Audit Trail)</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-2.5 px-3">Receipt No</th>
                <th className="py-2.5 px-3">Date</th>
                <th className="py-2.5 px-3">Payer</th>
                <th className="py-2.5 px-3">Method</th>
                <th className="py-2.5 px-3 text-right">Amount</th>
                <th className="py-2.5 px-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paymentHistory.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50">
                  <td className="py-2.5 px-3 font-mono font-bold text-cyber-700">{p.receiptNumber}</td>
                  <td className="py-2.5 px-3 text-slate-500">{p.date}</td>
                  <td className="py-2.5 px-3 font-medium text-slate-800">{p.payerName}</td>
                  <td className="py-2.5 px-3 text-slate-600">{p.paymentMethod}</td>
                  <td className="py-2.5 px-3 text-right font-extrabold text-slate-900">₹{p.amount.toLocaleString('en-IN')}</td>
                  <td className="py-2.5 px-3 text-center">
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
