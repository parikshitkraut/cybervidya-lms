import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  ExternalLink, 
  Search, 
  CheckCircle2, 
  Clock, 
  CreditCard,
  Printer,
  Eye,
  Filter
} from 'lucide-react';

export const PaymentHistoryTable = ({ 
  paymentHistory, 
  onViewReceipt, 
  onViewInvoice 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredHistory = paymentHistory.filter((item) => {
    const matchesSearch = 
      item.receiptNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.paymentMethod.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
      
      {/* Header & Filter Controls */}
      <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-slate-900">
            Payment History & Transaction Ledger
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Verified fee transactions with real-time digital receipts and tax invoices.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Search */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search Receipt / Txn ID..."
              className="bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyber-500/20 focus:border-cyber-500"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-cyber-500/20"
          >
            <option value="All">All Statuses</option>
            <option value="Success">Success Only</option>
            <option value="Pending">Pending</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/70 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              <th className="py-3 px-5">Receipt / Date</th>
              <th className="py-3 px-5">Description</th>
              <th className="py-3 px-5">Transaction ID</th>
              <th className="py-3 px-5">Method</th>
              <th className="py-3 px-5 text-right">Amount</th>
              <th className="py-3 px-5 text-center">Status</th>
              <th className="py-3 px-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
            {filteredHistory.length === 0 ? (
              <tr>
                <td colSpan="7" className="py-8 text-center text-slate-400 text-xs">
                  No fee transactions match your search query.
                </td>
              </tr>
            ) : (
              filteredHistory.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                  
                  {/* Receipt & Date */}
                  <td className="py-3.5 px-5">
                    <span className="font-mono font-bold text-cyber-700 block">
                      {item.receiptNumber}
                    </span>
                    <span className="text-[11px] text-slate-400 block mt-0.5">
                      {new Date(item.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })} • {item.time}
                    </span>
                  </td>

                  {/* Description */}
                  <td className="py-3.5 px-5 font-medium max-w-xs truncate text-slate-800" title={item.description}>
                    {item.description}
                  </td>

                  {/* Transaction ID */}
                  <td className="py-3.5 px-5">
                    <span className="font-mono text-[11px] bg-slate-100 px-2 py-0.5 rounded text-slate-700 border border-slate-200">
                      {item.transactionId}
                    </span>
                  </td>

                  {/* Payment Method */}
                  <td className="py-3.5 px-5 text-slate-600">
                    <div className="flex items-center gap-1.5">
                      <CreditCard className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{item.paymentMethod}</span>
                    </div>
                  </td>

                  {/* Amount */}
                  <td className="py-3.5 px-5 text-right">
                    <span className="font-extrabold text-slate-900 text-sm">
                      ₹{item.amount.toLocaleString('en-IN')}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="py-3.5 px-5 text-center">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      item.status === 'Success' 
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{item.status}</span>
                    </span>
                  </td>

                  {/* Action Buttons */}
                  <td className="py-3.5 px-5 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {/* Download Receipt button */}
                      <button
                        onClick={() => onViewReceipt(item.receiptNumber)}
                        className="px-2.5 py-1.5 rounded-lg bg-cyber-50 hover:bg-cyber-100 text-cyber-700 border border-cyber-200 text-[11px] font-semibold transition-all flex items-center gap-1"
                        title="Download Official Stamp Receipt"
                      >
                        <Download className="w-3 h-3" />
                        <span>Receipt</span>
                      </button>

                      {/* View Invoice button */}
                      <button
                        onClick={() => onViewInvoice(item)}
                        className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 text-[11px] font-semibold transition-all flex items-center gap-1"
                        title="View Detailed Tax Invoice"
                      >
                        <Eye className="w-3 h-3" />
                        <span>Invoice</span>
                      </button>
                    </div>
                  </td>

                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
        <span>Showing {filteredHistory.length} recorded payments</span>
        <span className="font-mono text-[11px] text-slate-400">All fees subject to AICTE/DTE norms</span>
      </div>

    </div>
  );
};
