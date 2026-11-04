import React, { useState } from 'react';
import { 
  User, 
  FileText, 
  Building2, 
  MapPin, 
  Users, 
  Landmark, 
  GraduationCap, 
  Download, 
  CheckCircle2, 
  Clock, 
  Eye 
} from 'lucide-react';

export const StudentInformationPage = ({ student }) => {
  // Active sub-tab matching Screenshot 4 & 5:
  // 'personal' | 'admission' | 'address' | 'parent' | 'bank' | 'academic' | 'documents'
  const [activeTab, setActiveTab] = useState('personal');

  const tabs = [
    { id: 'personal', label: 'Personal Information' },
    { id: 'admission', label: 'Admission Information' },
    { id: 'address', label: 'Address Information' },
    { id: 'parent', label: 'Parent Details' },
    { id: 'bank', label: 'Bank Details' },
    { id: 'academic', label: 'Academic Records' },
    { id: 'documents', label: 'Documents' },
  ];

  return (
    <div className="space-y-4">
      
      {/* Page Title from Screenshot 4 & 5 */}
      <h2 className="text-[17px] font-bold text-slate-900 tracking-tight">
        Student Information
      </h2>

      {/* Student Name Header Card */}
      <div className="bg-white rounded border border-slate-200 shadow-xs p-4 flex items-center gap-4">
        {/* Silhouette Avatar */}
        <div className="w-16 h-16 rounded-full bg-slate-200 flex items-center justify-center text-slate-400 shrink-0">
          <User className="w-10 h-10" />
        </div>
        <div>
          <h1 className="text-[18px] font-bold text-slate-900">
            {student.name || "MISS. Riddhi Pramod Naidu"}
          </h1>
          <p className="text-xs text-slate-500 font-mono mt-0.5">
            Registration No: <span className="font-semibold text-slate-700">{student.registrationNo}</span> • Year: <span className="font-semibold text-slate-700">{student.year}</span> • Branch: <span className="font-semibold text-slate-700">{student.branchFullName || student.branch}</span>
          </p>
        </div>
      </div>

      {/* Sub-Tabs Bar from Screenshot 4 & 5 */}
      <div className="bg-white rounded border border-slate-200 shadow-xs px-4 pt-2 flex items-center gap-6 overflow-x-auto border-b">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-2.5 text-[13px] font-medium transition-all whitespace-nowrap relative ${
                isActive
                  ? 'text-orange-500 border-b-2 border-orange-500 font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB 1: Personal Information (Exact match to Screenshot 5) */}
      {activeTab === 'personal' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          
          {/* Left Column */}
          <div className="space-y-4">
            
            {/* Panel 1: Basic Information */}
            <div className="bg-white rounded border border-slate-200 shadow-xs p-4 sm:p-5">
              <div className="mb-3 border-b border-slate-200 pb-1">
                <span className="text-[12px] font-bold text-[#00a896] uppercase tracking-wide">
                  Basic Information ─────────
                </span>
              </div>
              <div className="space-y-2 text-[12px] text-slate-700">
                <div className="flex items-baseline">
                  <span className="w-44 text-slate-500 shrink-0">Title :</span>
                  <span className="font-medium text-slate-800">{student.title || "MISS"}</span>
                </div>
                <div className="flex items-baseline">
                  <span className="w-44 text-slate-500 shrink-0">Display Name Format :</span>
                  <span className="font-medium text-slate-800">{student.displayNameFormat || "FIRST MIDDLE LAST"}</span>
                </div>
                <div className="flex items-baseline">
                  <span className="w-44 text-slate-500 shrink-0">Display Name :</span>
                  <span className="font-bold text-slate-900">{student.displayName || "RIDDHI PRAMOD NAIDU"}</span>
                </div>
                <div className="flex items-baseline">
                  <span className="w-44 text-slate-500 shrink-0">Marital Status :</span>
                  <span className="font-medium text-slate-800">{student.maritalStatus || "Unmarried"}</span>
                </div>
                <div className="flex items-baseline">
                  <span className="w-44 text-slate-500 shrink-0">Gender :</span>
                  <span className="font-medium text-slate-800">{student.gender || "Female"}</span>
                </div>
                <div className="flex items-baseline">
                  <span className="w-44 text-slate-500 shrink-0">Date of Birth :</span>
                  <span className="font-medium text-slate-800">{student.dob || "28/08/2006"}</span>
                </div>
                <div className="flex items-baseline">
                  <span className="w-44 text-slate-500 shrink-0">Email ID :</span>
                  <span className="font-mono text-slate-800">{student.email || "ugf24ee041@jitnagpur.edu.in"}</span>
                </div>
                <div className="flex items-baseline">
                  <span className="w-44 text-slate-500 shrink-0">Institute Email ID :</span>
                  <span className="font-mono text-slate-800">{student.instituteEmail || "naiduriddhi8@gmail.com"}</span>
                </div>
                <div className="flex items-baseline">
                  <span className="w-44 text-slate-500 shrink-0">Mobile Number :</span>
                  <span className="font-mono text-slate-800">{student.phone || "(+91) 7498595419"}</span>
                </div>
                <div className="flex items-baseline">
                  <span className="w-44 text-slate-500 shrink-0">Alternate Mobile Number :</span>
                  <span className="text-slate-800">{student.alternateMobile || "--"}</span>
                </div>
              </div>
            </div>

            {/* Panel 2: Other Information */}
            <div className="bg-white rounded border border-slate-200 shadow-xs p-4 sm:p-5">
              <div className="mb-3 border-b border-slate-200 pb-1">
                <span className="text-[12px] font-bold text-[#00a896] uppercase tracking-wide">
                  Other Information ─────────
                </span>
              </div>
              <div className="space-y-2 text-[12px] text-slate-700">
                <div className="flex items-baseline">
                  <span className="w-44 text-slate-500 shrink-0">Nationality :</span>
                  <span className="font-medium text-slate-800">{student.nationality || "Indian"}</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column */}
          <div className="space-y-4">
            
            {/* Panel 3: Admin Information */}
            <div className="bg-white rounded border border-slate-200 shadow-xs p-4 sm:p-5">
              <div className="mb-3 border-b border-slate-200 pb-1">
                <span className="text-[12px] font-bold text-[#00a896] uppercase tracking-wide">
                  Admin Information ─────────
                </span>
              </div>
              <div className="space-y-2 text-[12px] text-slate-700">
                <div className="flex items-baseline">
                  <span className="w-48 text-slate-500 shrink-0">Registration Number :</span>
                  <span className="font-mono font-medium text-slate-800">{student.registrationNo}</span>
                </div>
                <div className="flex items-baseline">
                  <span className="w-48 text-slate-500 shrink-0">University/Enrollment Number :</span>
                  <span className="font-mono font-medium text-slate-800">{student.universityEnrollmentNo || "20250140700495"}</span>
                </div>
                <div className="flex items-baseline">
                  <span className="w-48 text-slate-500 shrink-0">Application Number :</span>
                  <span className="text-slate-800">{student.applicationNo || "--"}</span>
                </div>
                <div className="flex items-baseline">
                  <span className="w-48 text-slate-500 shrink-0">Roll Number :</span>
                  <span className="font-mono font-medium text-slate-800">{student.rollNo}</span>
                </div>
              </div>
            </div>

            {/* Panel 4: Personal Information */}
            <div className="bg-white rounded border border-slate-200 shadow-xs p-4 sm:p-5">
              <div className="mb-3 border-b border-slate-200 pb-1">
                <span className="text-[12px] font-bold text-[#00a896] uppercase tracking-wide">
                  Personal Information ─────────
                </span>
              </div>
              <div className="space-y-2 text-[12px] text-slate-700">
                <div className="flex items-baseline">
                  <span className="w-48 text-slate-500 shrink-0">Birth Place :</span>
                  <span className="text-slate-800">{student.birthPlace || "--"}</span>
                </div>
                <div className="flex items-baseline">
                  <span className="w-48 text-slate-500 shrink-0">Birth State :</span>
                  <span className="font-medium text-slate-800">{student.birthState || "Maharashtra"}</span>
                </div>
                <div className="flex items-baseline">
                  <span className="w-48 text-slate-500 shrink-0">Whatsapp Mobile Number :</span>
                  <span className="text-slate-800">{student.whatsappMobile || "--"}</span>
                </div>
                <div className="flex items-baseline">
                  <span className="w-48 text-slate-500 shrink-0">Alternate Email :</span>
                  <span className="text-slate-800">{student.alternateEmail || "--"}</span>
                </div>
                <div className="flex items-baseline">
                  <span className="w-48 text-slate-500 shrink-0">Referral Source :</span>
                  <span className="text-slate-800">{student.referralSource || "--"}</span>
                </div>
                <div className="flex items-baseline">
                  <span className="w-48 text-slate-500 shrink-0">Physically Challenged :</span>
                  <span className="font-medium text-slate-800">{student.physicallyChallenged || "No"}</span>
                </div>
                <div className="flex items-baseline">
                  <span className="w-48 text-slate-500 shrink-0">Blood Group :</span>
                  <span className="text-slate-800">{student.bloodGroup || "--"}</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* TAB 2: Admission Information (Exact match to Screenshot 4) */}
      {activeTab === 'admission' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          
          {/* Left Box from Screenshot 4 */}
          <div className="bg-white rounded border border-slate-200 shadow-xs p-4 sm:p-5">
            <div className="space-y-2 text-[12px] text-slate-700">
              <div className="flex items-baseline">
                <span className="w-48 text-slate-500 shrink-0">Date of Admission :</span>
                <span className="font-medium text-slate-800">{student.dateOfAdmission || "29/08/2024"}</span>
              </div>
              <div className="flex items-baseline">
                <span className="w-48 text-slate-500 shrink-0">Enrollment Session :</span>
                <span className="font-medium text-slate-800">{student.enrollmentSession || "Odd 2024"}</span>
              </div>
              <div className="flex items-baseline">
                <span className="w-48 text-slate-500 shrink-0">Academic Batch :</span>
                <span className="font-medium text-slate-800">{student.academicBatch || "2024-2028"}</span>
              </div>
              <div className="flex items-baseline">
                <span className="w-48 text-slate-500 shrink-0">Faculty Scope :</span>
                <span className="font-medium text-slate-800">{student.facultyScope || "GENERAL"}</span>
              </div>
              <div className="flex items-baseline">
                <span className="w-48 text-slate-500 shrink-0">School :</span>
                <span className="font-medium text-slate-800">{student.school || "GENERAL"}</span>
              </div>
              <div className="flex items-baseline">
                <span className="w-48 text-slate-500 shrink-0">Degree :</span>
                <span className="font-bold text-slate-900">{student.degree || "B TECH"}</span>
              </div>
              <div className="flex items-baseline">
                <span className="w-48 text-slate-500 shrink-0">Branch :</span>
                <span className="font-medium text-slate-800">{student.branchFullName || "Electrical Engineering"}</span>
              </div>
              <div className="flex items-baseline">
                <span className="w-48 text-slate-500 shrink-0">Scheme :</span>
                <span className="font-medium text-slate-800">{student.scheme || "B TECH- EE"}</span>
              </div>
              <div className="flex items-baseline">
                <span className="w-48 text-slate-500 shrink-0">Admission Category :</span>
                <span className="font-medium text-slate-800">{student.admissionCategory || "CAP"}</span>
              </div>
              <div className="flex items-baseline">
                <span className="w-48 text-slate-500 shrink-0">Fees Category :</span>
                <span className="font-medium text-slate-800">{student.feeCategoryName || "EBC-TF-100"}</span>
              </div>
              <div className="flex items-baseline">
                <span className="w-48 text-slate-500 shrink-0">Student Group :</span>
                <span className="text-slate-800">{student.studentGroup || "--"}</span>
              </div>
              <div className="flex items-baseline">
                <span className="w-48 text-slate-500 shrink-0">Enrollment Type :</span>
                <span className="font-medium text-slate-800">{student.enrollmentType || "First Year"}</span>
              </div>
              <div className="flex items-baseline">
                <span className="w-48 text-slate-500 shrink-0">Shift :</span>
                <span className="font-medium text-slate-800">{student.shift || "SHIFT 1"}</span>
              </div>
              <div className="flex items-baseline">
                <span className="w-48 text-slate-500 shrink-0">Entrance Exam Reg. No. :</span>
                <span className="font-mono font-medium text-slate-800">{student.entranceExamRegNo || "EN24230968"}</span>
              </div>
              <div className="flex items-baseline">
                <span className="w-48 text-slate-500 shrink-0">Entrance Exam Merit No. :</span>
                <span className="font-mono font-medium text-slate-800">{student.entranceExamMeritNo || "52073"}</span>
              </div>
            </div>
          </div>

          {/* Right Box from Screenshot 4 */}
          <div className="bg-white rounded border border-slate-200 shadow-xs p-4 sm:p-5">
            <div className="space-y-2 text-[12px] text-slate-700">
              <div className="flex items-baseline">
                <span className="w-44 text-slate-500 shrink-0">Faculty Scope :</span>
                <span className="font-medium text-slate-800">{student.facultyScope || "GENERAL"}</span>
              </div>
              <div className="flex items-baseline">
                <span className="w-44 text-slate-500 shrink-0">School :</span>
                <span className="font-medium text-slate-800">{student.school || "GENERAL"}</span>
              </div>
              <div className="flex items-baseline">
                <span className="w-44 text-slate-500 shrink-0">Degree :</span>
                <span className="font-bold text-slate-900">{student.degree || "B TECH"}</span>
              </div>
              <div className="flex items-baseline">
                <span className="w-44 text-slate-500 shrink-0">Branch :</span>
                <span className="font-medium text-slate-800">{student.branchFullName || "Electrical Engineering"}</span>
              </div>
              <div className="flex items-baseline">
                <span className="w-44 text-slate-500 shrink-0">Scheme :</span>
                <span className="font-medium text-slate-800">{student.scheme || "B TECH- EE"}</span>
              </div>
              <div className="flex items-baseline">
                <span className="w-44 text-slate-500 shrink-0">Current Session :</span>
                <span className="font-medium text-slate-800">{student.currentSession || "Odd 2026"}</span>
              </div>
              <div className="flex items-baseline">
                <span className="w-44 text-slate-500 shrink-0">Year :</span>
                <span className="font-medium text-slate-800">{student.year || "III"}</span>
              </div>
              <div className="flex items-baseline">
                <span className="w-44 text-slate-500 shrink-0">Semester :</span>
                <span className="font-medium text-slate-800">{student.semester || "V"}</span>
              </div>
              <div className="flex items-baseline">
                <span className="w-44 text-slate-500 shrink-0">Class Section :</span>
                <span className="font-medium text-slate-800">{student.section || "A"}</span>
              </div>
              <div className="flex items-baseline">
                <span className="w-44 text-slate-500 shrink-0">Admission Status :</span>
                <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                  {student.admissionStatus || "ACTIVE"}
                </span>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* TAB 3: Address Information */}
      {activeTab === 'address' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-white rounded border border-slate-200 shadow-xs p-5">
            <div className="mb-3 border-b border-slate-200 pb-1">
              <span className="text-[12px] font-bold text-[#00a896] uppercase tracking-wide">
                Correspondence Address ─────────
              </span>
            </div>
            <div className="space-y-2 text-[12px] text-slate-700">
              <p><span className="text-slate-500">Address :</span> Plot No. 42, Anand Nagar, Koradi Road</p>
              <p><span className="text-slate-500">City / District :</span> Nagpur, Maharashtra</p>
              <p><span className="text-slate-500">Pin Code :</span> 440030</p>
              <p><span className="text-slate-500">Country :</span> India</p>
            </div>
          </div>

          <div className="bg-white rounded border border-slate-200 shadow-xs p-5">
            <div className="mb-3 border-b border-slate-200 pb-1">
              <span className="text-[12px] font-bold text-[#00a896] uppercase tracking-wide">
                Permanent Address ─────────
              </span>
            </div>
            <div className="space-y-2 text-[12px] text-slate-700">
              <p><span className="text-slate-500">Address :</span> Plot No. 42, Anand Nagar, Koradi Road</p>
              <p><span className="text-slate-500">City / District :</span> Nagpur, Maharashtra</p>
              <p><span className="text-slate-500">Pin Code :</span> 440030</p>
              <p><span className="text-slate-500">Country :</span> India</p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: Parent Details */}
      {activeTab === 'parent' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-white rounded border border-slate-200 shadow-xs p-5">
            <div className="mb-3 border-b border-slate-200 pb-1">
              <span className="text-[12px] font-bold text-[#00a896] uppercase tracking-wide">
                Father Details ─────────
              </span>
            </div>
            <div className="space-y-2 text-[12px] text-slate-700">
              <p><span className="text-slate-500">Father Name :</span> Pramod Naidu</p>
              <p><span className="text-slate-500">Occupation :</span> Private Service</p>
              <p><span className="text-slate-500">Contact Number :</span> (+91) 94221 56789</p>
              <p><span className="text-slate-500">Annual Family Income :</span> ₹ 3,50,000.00</p>
            </div>
          </div>

          <div className="bg-white rounded border border-slate-200 shadow-xs p-5">
            <div className="mb-3 border-b border-slate-200 pb-1">
              <span className="text-[12px] font-bold text-[#00a896] uppercase tracking-wide">
                Mother Details ─────────
              </span>
            </div>
            <div className="space-y-2 text-[12px] text-slate-700">
              <p><span className="text-slate-500">Mother Name :</span> Sunita Naidu</p>
              <p><span className="text-slate-500">Occupation :</span> Homemaker</p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: Bank Details */}
      {activeTab === 'bank' && (
        <div className="bg-white rounded border border-slate-200 shadow-xs p-5 max-w-xl">
          <div className="mb-3 border-b border-slate-200 pb-1">
            <span className="text-[12px] font-bold text-[#00a896] uppercase tracking-wide">
              Registered Student Bank Account ─────────
            </span>
          </div>
          <div className="space-y-2 text-[12px] text-slate-700">
            <p><span className="text-slate-500">Bank Name :</span> Bank of Maharashtra</p>
            <p><span className="text-slate-500">Branch :</span> Koradi Road Branch, Nagpur</p>
            <p><span className="text-slate-500">Account Number :</span> <span className="font-mono font-bold">60249811234</span></p>
            <p><span className="text-slate-500">IFSC Code :</span> <span className="font-mono font-bold">MAHB0001205</span></p>
            <p><span className="text-slate-500">Account Holder :</span> RIDDHI PRAMOD NAIDU</p>
            <p className="text-[11px] text-emerald-700 font-semibold pt-2">✓ Verified for MahaDBT EBC Freeship Direct Benefit Transfer</p>
          </div>
        </div>
      )}

      {/* TAB 6: Academic Records */}
      {activeTab === 'academic' && (
        <div className="bg-white rounded border border-slate-200 shadow-xs overflow-hidden">
          <table className="w-full text-left text-[12px]">
            <thead className="bg-[#34373d] text-white text-[11px]">
              <tr>
                <th className="py-2 px-3">Examination / Stage</th>
                <th className="py-2 px-3">Board / Institute</th>
                <th className="py-2 px-3">Passing Year</th>
                <th className="py-2 px-3 text-right">Score / CGPA</th>
                <th className="py-2 px-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr className="hover:bg-slate-50">
                <td className="py-2.5 px-3 font-semibold">SSC (Class 10th)</td>
                <td className="py-2.5 px-3">Maharashtra State Board (MSBSHSE)</td>
                <td className="py-2.5 px-3">2022</td>
                <td className="py-2.5 px-3 text-right font-bold text-slate-900">88.40%</td>
                <td className="py-2.5 px-3 text-center"><span className="px-2 py-0.5 rounded text-[10px] font-bold bg-green-100 text-green-800">Passed</span></td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="py-2.5 px-3 font-semibold">HSC (Class 12th)</td>
                <td className="py-2.5 px-3">Maharashtra State Board (MSBSHSE)</td>
                <td className="py-2.5 px-3">2024</td>
                <td className="py-2.5 px-3 text-right font-bold text-slate-900">82.60%</td>
                <td className="py-2.5 px-3 text-center"><span className="px-2 py-0.5 rounded text-[10px] font-bold bg-green-100 text-green-800">Passed</span></td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="py-2.5 px-3 font-semibold">B.Tech Sem I & II</td>
                <td className="py-2.5 px-3">Jhulelal Institute of Technology (Autonomous)</td>
                <td className="py-2.5 px-3">2025</td>
                <td className="py-2.5 px-3 text-right font-bold text-slate-900">8.85 SGPA</td>
                <td className="py-2.5 px-3 text-center"><span className="px-2 py-0.5 rounded text-[10px] font-bold bg-green-100 text-green-800">Cleared</span></td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="py-2.5 px-3 font-semibold">B.Tech Sem III & IV</td>
                <td className="py-2.5 px-3">Jhulelal Institute of Technology (Autonomous)</td>
                <td className="py-2.5 px-3">2026</td>
                <td className="py-2.5 px-3 text-right font-bold text-slate-900">8.92 CGPA</td>
                <td className="py-2.5 px-3 text-center"><span className="px-2 py-0.5 rounded text-[10px] font-bold bg-green-100 text-green-800">Cleared</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* TAB 7: Documents */}
      {activeTab === 'documents' && (
        <div className="bg-white rounded border border-slate-200 shadow-xs p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {(student.documents || []).map((doc) => (
              <div key={doc.id} className="p-3 bg-slate-50 rounded border border-slate-200 flex items-center justify-between hover:bg-slate-100/70 transition-colors">
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <div className="w-8 h-8 rounded bg-red-100 text-red-600 flex items-center justify-center font-bold text-[10px] shrink-0">
                    PDF
                  </div>
                  <div className="overflow-hidden text-xs">
                    <p className="font-semibold text-slate-800 truncate" title={doc.name}>{doc.name}</p>
                    <p className="text-[10px] text-slate-500">{doc.size} • Verified</p>
                  </div>
                </div>
                <button 
                  onClick={() => alert(`Downloading verified document: ${doc.name}`)}
                  className="p-1.5 rounded hover:bg-white text-blue-600 shadow-2xs shrink-0" 
                  title="Download Document"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
