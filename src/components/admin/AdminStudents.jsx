import React, { useState } from 'react';
import { Users, Search, Mail, Phone, GraduationCap, ArrowUpDown, CheckCircle2 } from 'lucide-react';
import { INSTITUTION } from '../../data/mockData';

export const AdminStudents = ({ students }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [branchFilter, setBranchFilter] = useState('All');

  const filtered = students.filter((s) => {
    const matchesSearch = 
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.prn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.rollNo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBranch = branchFilter === 'All' || s.branch.includes(branchFilter);
    return matchesSearch && matchesBranch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Student Enrollment Roster</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Institutional student directory for {INSTITUTION.name} • Total {students.length} Records
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search name, PRN..."
              className="bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-4 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-vidya-500/20"
            />
          </div>

          <select
            value={branchFilter}
            onChange={(e) => setBranchFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-700 focus:outline-none"
          >
            <option value="All">All Branches</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Artificial Intelligence">AI & Data Science</option>
            <option value="Electronics">Electronics</option>
            <option value="Mechanical">Mechanical</option>
            <option value="Electrical">Electrical</option>
          </select>
        </div>
      </div>

      {/* Roster Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((s) => (
          <div key={s.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4 hover:border-vidya-300 transition-all">
            <div className="flex items-start justify-between">
              <div>
                <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                  {s.prn}
                </span>
                <h3 className="font-bold text-slate-900 text-sm mt-1">{s.name}</h3>
                <p className="text-[11px] text-slate-500">{s.branch}</p>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                s.feeStatus === 'Paid' ? 'bg-emerald-100 text-emerald-800' :
                s.feeStatus === 'Partial' ? 'bg-amber-100 text-amber-800' :
                'bg-red-100 text-red-800'
              }`}>
                {s.feeStatus}
              </span>
            </div>

            <div className="divide-y divide-slate-100 text-xs text-slate-600">
              <div className="py-1.5 flex justify-between">
                <span className="text-slate-400">Roll No:</span>
                <strong className="text-slate-800 font-semibold">{s.rollNo} (Sem {s.semester})</strong>
              </div>
              <div className="py-1.5 flex justify-between">
                <span className="text-slate-400">Total Course Fee:</span>
                <span className="text-slate-800 font-medium">₹{s.totalFee.toLocaleString('en-IN')}</span>
              </div>
              <div className="py-1.5 flex justify-between">
                <span className="text-slate-400">Paid Amount:</span>
                <strong className="text-emerald-600 font-bold">₹{s.paidAmount.toLocaleString('en-IN')}</strong>
              </div>
              <div className="py-1.5 flex justify-between">
                <span className="text-slate-400">Outstanding:</span>
                <strong className="text-amber-600 font-bold">₹{s.outstanding.toLocaleString('en-IN')}</strong>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
              <span>{s.phone}</span>
              <span>{s.email}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
