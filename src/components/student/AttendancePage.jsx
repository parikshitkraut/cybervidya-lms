import React from 'react';
import { CalendarCheck, CheckCircle2, AlertCircle } from 'lucide-react';
import { ATTENDANCE_SUMMARY } from '../../data/mockData';

export const AttendancePage = ({ student }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-[17px] font-bold text-slate-900 tracking-tight">
        Subject-wise Biometric Attendance Details
      </h2>

      {/* Overview Stat Box */}
      <div className="bg-white rounded border border-slate-200 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
        <div>
          <span className="text-xs text-slate-500 font-medium">Cumulative Attendance</span>
          <div className="text-2xl font-black text-emerald-600 mt-0.5">
            {student.attendancePercentage}%
          </div>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Eligible for Autonomous End-Semester Examinations (Mandatory cutoff: 75%)
          </p>
        </div>

        <span className="px-3 py-1 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold inline-flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Attendance Criteria Satisfied</span>
        </span>
      </div>

      {/* Table */}
      <div className="bg-white rounded border border-slate-200 overflow-hidden shadow-xs">
        <div className="md:hidden px-3 py-1.5 bg-slate-100 text-[11px] text-slate-600 border-b border-slate-200">
          👉 Swipe horizontally to view full subject-wise biometric logs
        </div>
        <div className="overflow-x-auto scrollbar-none touch-scroll">
          <table className="w-full text-left text-xs border-collapse min-w-[500px]">
          <thead className="bg-[#34373d] text-white text-[11px]">
            <tr>
              <th className="py-2.5 px-3">Subject / Course</th>
              <th className="py-2.5 px-3 text-center">Conducted</th>
              <th className="py-2.5 px-3 text-center">Attended</th>
              <th className="py-2.5 px-3 text-center">Attendance %</th>
              <th className="py-2.5 px-3 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {ATTENDANCE_SUMMARY.map((row, idx) => (
              <tr key={idx} className="hover:bg-slate-50">
                <td className="py-2.5 px-3 font-semibold text-slate-800">{row.subject}</td>
                <td className="py-2.5 px-3 text-center font-mono">{row.conducted}</td>
                <td className="py-2.5 px-3 text-center font-mono">{row.attended}</td>
                <td className="py-2.5 px-3 text-center font-bold text-slate-900">{row.percentage}%</td>
                <td className="py-2.5 px-3 text-center">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#18b82a] text-white">
                    Clear
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
