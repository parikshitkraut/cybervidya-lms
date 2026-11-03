import React from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  GraduationCap, 
  Award, 
  Calendar, 
  ShieldCheck, 
  Building2, 
  BookOpen, 
  CreditCard,
  Percent,
  CheckCircle2
} from 'lucide-react';
import { INSTITUTION } from '../../data/mockData';

export const StudentProfile = ({ student, feeSummary }) => {
  return (
    <div className="space-y-6">
      
      {/* Profile Header Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <img 
            src={student.avatar} 
            alt={student.name}
            className="w-28 h-28 rounded-2xl object-cover ring-4 ring-cyber-500/20 shadow-md shrink-0" 
          />

          <div className="space-y-2 text-center sm:text-left flex-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-cyber-50 text-cyber-700 border border-cyber-200">
                PRN: {student.prn}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                Roll No: {student.rollNo}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-vidya-50 text-vidya-700 border border-vidya-200">
                {student.admissionCategory}
              </span>
            </div>

            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              {student.name}
            </h2>

            <p className="text-sm font-semibold text-slate-600">
              {student.program} in {student.branch} ({student.section})
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span>{student.email}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <span>{student.phone}</span>
              </span>
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center shrink-0 w-full sm:w-auto">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Autonomous Standing</span>
            <div className="text-2xl font-black text-cyber-600 mt-1">{student.cgpa}</div>
            <span className="text-xs font-semibold text-slate-600 block">CGPA (First Class Dist.)</span>
            <div className="mt-2 text-[11px] font-semibold text-emerald-600 bg-emerald-50 py-0.5 px-2 rounded-full border border-emerald-200">
              {student.attendancePercentage}% Attendance
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Academic Particulars & Guardian */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Academic Enrollment Particulars */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-cyber-600" />
            <span>Academic Curriculum Details</span>
          </h3>

          <div className="divide-y divide-slate-100 text-xs text-slate-600">
            <div className="py-2.5 flex justify-between">
              <span className="text-slate-400">Current Academic Year:</span>
              <strong className="text-slate-900 font-semibold">{student.academicYear}</strong>
            </div>
            <div className="py-2.5 flex justify-between">
              <span className="text-slate-400">Current Semester:</span>
              <strong className="text-slate-900 font-semibold">Semester {student.semester} (Even)</strong>
            </div>
            <div className="py-2.5 flex justify-between">
              <span className="text-slate-400">Earned Credits:</span>
              <strong className="text-slate-900 font-semibold">{student.creditsEarned} / {student.totalCreditsRequired} Credits</strong>
            </div>
            <div className="py-2.5 flex justify-between">
              <span className="text-slate-400">Faculty Mentor / Advisor:</span>
              <strong className="text-slate-900 font-semibold">{student.mentor}</strong>
            </div>
            <div className="py-2.5 flex justify-between">
              <span className="text-slate-400">Affiliated University:</span>
              <span className="text-slate-900 font-medium text-right">R.T.M. Nagpur University</span>
            </div>
          </div>
        </div>

        {/* Guardian & Contact Information */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-vidya-600" />
            <span>Guardian & Verified Emergency Contact</span>
          </h3>

          <div className="divide-y divide-slate-100 text-xs text-slate-600">
            <div className="py-2.5 flex justify-between">
              <span className="text-slate-400">Father / Guardian Name:</span>
              <strong className="text-slate-900 font-semibold">{student.guardianName}</strong>
            </div>
            <div className="py-2.5 flex justify-between">
              <span className="text-slate-400">Guardian Contact Number:</span>
              <strong className="text-slate-900 font-semibold">{student.guardianPhone}</strong>
            </div>
            <div className="py-2.5 flex justify-between">
              <span className="text-slate-400">Permanent Campus Address:</span>
              <span className="text-slate-900 font-medium text-right">Civil Lines, Nagpur - 440001</span>
            </div>
            <div className="py-2.5 flex justify-between">
              <span className="text-slate-400">Fee Scheme Category:</span>
              <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                {student.feeCategory}
              </span>
            </div>
            <div className="py-2.5 flex justify-between">
              <span className="text-slate-400">Anti-Ragging Undertaking:</span>
              <span className="text-emerald-600 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Verified by UGC/AICTE</span>
              </span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
