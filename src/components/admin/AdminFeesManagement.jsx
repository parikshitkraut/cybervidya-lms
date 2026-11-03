import React, { useState } from 'react';
import { 
  DollarSign, 
  Search, 
  Filter, 
  FileCheck, 
  Download, 
  Plus, 
  AlertTriangle, 
  CheckCircle2, 
  CreditCard, 
  Send, 
  UserCheck, 
  Printer,
  ChevronDown
} from 'lucide-react';
import { INSTITUTION } from '../../data/mockData';

export const AdminFeesManagement = ({ 
  students, 
  onRecordOfflinePayment, 
  onViewReceipt,
  onOpenFeeStructure,
  onOpenScholarships,
  onSendReminder
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All'); // 'All' | 'Paid' | 'Partial' | 'Overdue' | 'Unpaid'
  const [branchFilter, setBranchFilter] = useState('All');

  const filteredStudents = students.filter((s) => {
    const matchesSearch = 
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.prn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.rollNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.phone.includes(searchTerm);

    const matchesStatus = statusFilter === 'All' || s.feeStatus === statusFilter;
    const matchesBranch = branchFilter === 'All' || s.branch.toLowerCase().includes(branchFilter.toLowerCase());

    return matchesSearch && matchesStatus && matchesBranch;
  });

  // Calculate high level numbers
  const totalReceivable = students.reduce((acc, curr) => acc + curr.totalFee, 0);
  const totalCollected = students.reduce((acc, curr) => acc + curr.paidAmount, 0);
  const totalOutstanding = students.reduce((acc, curr) => acc + curr.outstanding, 0);
  const collectionPercentage = Math.round((totalCollected / totalReceivable) * 100);

  return (
    <div className="space-y-6">
      
      {/* Executive Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Billed */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Total Billed Fees</span>
          <div className="text-2xl font-black text-slate-900 mt-1">
            ₹{(totalReceivable / 100000).toFixed(2)} Lakhs
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">Across {students.length} Enrolled Students</span>
        </div>

        {/* Realized Collection */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Total Realized Fees</span>
          <div className="text-2xl font-black text-emerald-600 mt-1">
            ₹{(totalCollected / 100000).toFixed(2)} Lakhs
          </div>
          <div className="mt-2 w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
            <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${collectionPercentage}%` }} />
          </div>
          <span className="text-[11px] text-emerald-700 font-semibold mt-1 block">{collectionPercentage}% Realization Rate</span>
        </div>

        {/* Outstanding Overdue */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Outstanding Receivables</span>
          <div className="text-2xl font-black text-amber-600 mt-1">
            ₹{(totalOutstanding / 100000).toFixed(2)} Lakhs
          </div>
          <span className="text-[11px] text-amber-700 font-medium mt-1 block">
            {students.filter(s => s.outstanding > 0).length} Students with Dues
          </span>
        </div>

        {/* Defaulters / Critical */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Pending Defaulters</span>
          <div className="text-2xl font-black text-red-600 mt-1">
            {students.filter(s => s.feeStatus === 'Overdue' || s.feeStatus === 'Unpaid').length}
          </div>
          <span className="text-[11px] text-red-600 font-medium mt-1 block">Hall tickets on hold</span>
        </div>

      </div>

      {/* Action Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Student Fee Administration Ledger</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Monitor real-time payments, issue counter receipts, and manage installment allocations.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={onRecordOfflinePayment}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-vidya-600 to-indigo-600 hover:from-vidya-700 hover:to-indigo-700 text-white text-xs font-bold shadow-md shadow-vidya-600/20 transition-all flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Record Offline Payment</span>
          </button>

          <button
            onClick={onOpenFeeStructure}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors flex items-center gap-1.5"
          >
            <DollarSign className="w-3.5 h-3.5 text-cyber-600" />
            <span>Course Fee Rules</span>
          </button>

          <button
            onClick={onOpenScholarships}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors flex items-center gap-1.5"
          >
            <span>Scholarships</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by student name, PRN, roll number..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-vidya-500/20"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          
          {/* Status Tabs */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            {['All', 'Paid', 'Partial', 'Overdue', 'Unpaid'].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  statusFilter === status
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          {/* Branch Filter */}
          <select
            value={branchFilter}
            onChange={(e) => setBranchFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-700 focus:outline-none"
          >
            <option value="All">All Branches</option>
            <option value="Computer Science">Computer Science (CSE)</option>
            <option value="Artificial Intelligence">AI & Data Science (AIDS)</option>
            <option value="Electronics">Electronics (ECE)</option>
            <option value="Mechanical">Mechanical (ME)</option>
            <option value="Electrical">Electrical (EE)</option>
          </select>

        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-5">Student / PRN</th>
                <th className="py-3 px-5">Branch / Roll</th>
                <th className="py-3 px-5 text-right">Total Net Fee</th>
                <th className="py-3 px-5 text-right">Paid Amount</th>
                <th className="py-3 px-5 text-right">Outstanding</th>
                <th className="py-3 px-5 text-center">Status</th>
                <th className="py-3 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-8 text-center text-slate-400">
                    No students match the selected fee criteria.
                  </td>
                </tr>
              ) : (
                filteredStudents.map((student) => {
                  const isPaid = student.feeStatus === 'Paid';
                  const isPartial = student.feeStatus === 'Partial';
                  const isOverdue = student.feeStatus === 'Overdue';
                  const isUnpaid = student.feeStatus === 'Unpaid';

                  return (
                    <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                      
                      {/* Name & PRN */}
                      <td className="py-3.5 px-5">
                        <span className="font-bold text-slate-900 block">{student.name}</span>
                        <span className="font-mono text-[11px] text-cyber-700 block">{student.prn}</span>
                        <span className="text-[10px] text-slate-400 block">{student.phone}</span>
                      </td>

                      {/* Branch & Roll */}
                      <td className="py-3.5 px-5">
                        <span className="font-medium text-slate-800 block">{student.branch}</span>
                        <span className="text-[11px] text-slate-500 block">Roll: {student.rollNo} • Sem {student.semester}</span>
                        {student.scholarship !== 'None' && (
                          <span className="inline-block mt-0.5 px-1.5 py-0.2 rounded text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200">
                            {student.scholarship}
                          </span>
                        )}
                      </td>

                      {/* Total Fee */}
                      <td className="py-3.5 px-5 text-right font-medium text-slate-900">
                        ₹{student.totalFee.toLocaleString('en-IN')}
                      </td>

                      {/* Paid Amount */}
                      <td className="py-3.5 px-5 text-right font-bold text-emerald-600">
                        ₹{student.paidAmount.toLocaleString('en-IN')}
                      </td>

                      {/* Outstanding */}
                      <td className="py-3.5 px-5 text-right">
                        <span className={`font-black text-sm ${
                          student.outstanding > 0 ? 'text-amber-600' : 'text-slate-400'
                        }`}>
                          ₹{student.outstanding.toLocaleString('en-IN')}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-5 text-center">
                        <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider border ${
                          isPaid
                            ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                            : isPartial
                            ? 'bg-amber-100 text-amber-800 border-amber-300'
                            : isOverdue
                            ? 'bg-red-100 text-red-800 border-red-300'
                            : 'bg-slate-100 text-slate-700 border-slate-300'
                        }`}>
                          {student.feeStatus}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-5 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Send Reminder */}
                          {student.outstanding > 0 && (
                            <button
                              onClick={() => onSendReminder(student)}
                              className="p-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200"
                              title="Send Fee Reminder SMS/Email"
                            >
                              <Send className="w-3.5 h-3.5" />
                            </button>
                          )}

                          {/* Quick Cash Receipt Button */}
                          <button
                            onClick={onRecordOfflinePayment}
                            className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-semibold"
                            title="Record Cash/Cheque Collection"
                          >
                            Add Pay
                          </button>
                        </div>
                      </td>

                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
          <span>Displaying {filteredStudents.length} of {students.length} students</span>
          <span className="font-mono text-[11px]">Academic Year: {INSTITUTION.academicYear}</span>
        </div>
      </div>

    </div>
  );
};
