import React from 'react';
import { FileText, Download, CheckCircle2, Calendar } from 'lucide-react';
import { INSTITUTION } from '../../data/mockData';

export const ExamPage = ({ student }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-[17px] font-bold text-slate-900 tracking-tight">
        Examination Cell & Hall Ticket Clearance
      </h2>

      <div className="bg-white rounded border border-slate-200 p-4 sm:p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 border-b border-slate-100">
          <div>
            <h3 className="font-bold text-slate-900 text-sm">
              End Semester Winter-2026 Examination Hall Ticket
            </h3>
            <p className="text-xs text-slate-500">
              PRN: {student.prn} • Branch: {student.branchFullName} • Sem {student.semester}
            </p>
          </div>
          <span className="self-start sm:self-auto px-2.5 py-1 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold shrink-0">
            Dues Cleared • Eligible
          </span>
        </div>

        <div className="p-4 bg-slate-50 rounded border border-slate-200 text-xs space-y-2">
          <p className="text-slate-700">
            <strong>Candidate Name:</strong> {student.name}
          </p>
          <p className="text-slate-700">
            <strong>Exam Center:</strong> JIT Campus, Main Examination Hall 102
          </p>
          <p className="text-slate-500">
            All institutional development fees for Odd 2026 session have been reconciled. Hall ticket is active.
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="px-4 py-2 bg-[#18b82a] hover:bg-[#15a225] text-white text-xs font-bold rounded shadow-xs flex items-center gap-1.5"
        >
          <Download className="w-4 h-4" />
          <span>Download & Print Hall Ticket</span>
        </button>
      </div>
    </div>
  );
};
