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

// Reusable mobile-optimized row component:
// On phone (< 640px): Stacks label and value cleanly so long texts never get squished
// On desktop (>= 640px): Standard 2-column layout matching CyberVidya screenshot
const InfoRow = ({ label, value, isMono = false, isBold = false, badge = null }) => (
  <div className="flex flex-col sm:flex-row sm:items-baseline py-1 sm:py-0.5 border-b border-slate-50 last:border-0 sm:border-0">
    <span className="w-full sm:w-48 text-slate-500 text-[11px] sm:text-[12px] shrink-0 font-normal">
      {label} :
    </span>
    {badge ? (
      <div>{badge}</div>
    ) : (
      <span className={`text-[12px] break-all sm:break-normal ${
        isBold ? 'font-bold text-slate-900' : 'font-medium text-slate-800'
      } ${isMono ? 'font-mono' : ''}`}>
        {value || "--"}
      </span>
    )}
  </div>
);

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
      <div className="bg-white rounded border border-slate-200 shadow-xs p-3.5 sm:p-4 flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3 sm:gap-4">
        {/* Silhouette Avatar */}
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-slate-200 flex items-center justify-center text-slate-400 shrink-0 ring-1 ring-slate-300">
          <User className="w-8 h-8 sm:w-10 sm:h-10" />
        </div>
        <div>
          <h1 className="text-[16px] sm:text-[18px] font-bold text-slate-900">
            {student.name || "MISS. Riddhi Pramod Naidu"}
          </h1>
          <p className="text-[11px] sm:text-xs text-slate-500 font-mono mt-0.5">
            Registration No: <span className="font-semibold text-slate-700">{student.registrationNo}</span> • Year: <span className="font-semibold text-slate-700">{student.year}</span> • Branch: <span className="font-semibold text-slate-700">{student.branchFullName || student.branch}</span>
          </p>
        </div>
      </div>

      {/* Sub-Tabs Bar from Screenshot 4 & 5 - Mobile horizontally swipeable */}
      <div className="bg-white rounded border border-slate-200 shadow-xs px-3 sm:px-4 pt-2 flex items-center gap-4 sm:gap-6 overflow-x-auto border-b scrollbar-none touch-scroll">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-2.5 text-[12px] sm:text-[13px] font-medium transition-all whitespace-nowrap shrink-0 relative ${
                isActive
                  ? 'text-orange-500 border-b-2 border-orange-500 font-bold'
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
            <div className="bg-white rounded border border-slate-200 shadow-xs p-3.5 sm:p-5">
              <div className="mb-3 border-b border-slate-200 pb-1">
                <span className="text-[12px] font-bold text-[#00a896] uppercase tracking-wide">
                  Basic Information ─────────
                </span>
              </div>
              <div className="space-y-1.5 sm:space-y-2 text-[12px] text-slate-700">
                <InfoRow label="Title" value={student.title || "MISS"} />
                <InfoRow label="Display Name Format" value={student.displayNameFormat || "FIRST MIDDLE LAST"} />
                <InfoRow label="Display Name" value={student.displayName || "RIDDHI PRAMOD NAIDU"} isBold />
                <InfoRow label="Marital Status" value={student.maritalStatus || "Unmarried"} />
                <InfoRow label="Gender" value={student.gender || "Female"} />
                <InfoRow label="Date of Birth" value={student.dob || "28/08/2006"} />
                <InfoRow label="Email ID" value={student.email || "ugf24ee041@jitnagpur.edu.in"} isMono />
                <InfoRow label="Institute Email ID" value={student.instituteEmail || "naiduriddhi8@gmail.com"} isMono />
                <InfoRow label="Mobile Number" value={student.phone || "(+91) 7498595419"} isMono />
                <InfoRow label="Alternate Mobile Number" value={student.alternateMobile || "--"} />
              </div>
            </div>

            {/* Panel 2: Other Information */}
            <div className="bg-white rounded border border-slate-200 shadow-xs p-3.5 sm:p-5">
              <div className="mb-3 border-b border-slate-200 pb-1">
                <span className="text-[12px] font-bold text-[#00a896] uppercase tracking-wide">
                  Other Information ─────────
                </span>
              </div>
              <div className="space-y-1.5 sm:space-y-2 text-[12px] text-slate-700">
                <InfoRow label="Nationality" value={student.nationality || "Indian"} />
              </div>
            </div>

          </div>

          {/* Right Column */}
          <div className="space-y-4">
            
            {/* Panel 3: Admin Information */}
            <div className="bg-white rounded border border-slate-200 shadow-xs p-3.5 sm:p-5">
              <div className="mb-3 border-b border-slate-200 pb-1">
                <span className="text-[12px] font-bold text-[#00a896] uppercase tracking-wide">
                  Admin Information ─────────
                </span>
              </div>
              <div className="space-y-1.5 sm:space-y-2 text-[12px] text-slate-700">
                <InfoRow label="Registration Number" value={student.registrationNo} isMono />
                <InfoRow label="University/Enrollment Number" value={student.universityEnrollmentNo || "20250140700495"} isMono />
                <InfoRow label="Application Number" value={student.applicationNo || "--"} />
                <InfoRow label="Roll Number" value={student.rollNo} isMono />
              </div>
            </div>

            {/* Panel 4: Personal Information */}
            <div className="bg-white rounded border border-slate-200 shadow-xs p-3.5 sm:p-5">
              <div className="mb-3 border-b border-slate-200 pb-1">
                <span className="text-[12px] font-bold text-[#00a896] uppercase tracking-wide">
                  Personal Information ─────────
                </span>
              </div>
              <div className="space-y-1.5 sm:space-y-2 text-[12px] text-slate-700">
                <InfoRow label="Birth Place" value={student.birthPlace || "--"} />
                <InfoRow label="Birth State" value={student.birthState || "Maharashtra"} />
                <InfoRow label="Whatsapp Mobile Number" value={student.whatsappMobile || "--"} />
                <InfoRow label="Alternate Email" value={student.alternateEmail || "--"} />
                <InfoRow label="Referral Source" value={student.referralSource || "--"} />
                <InfoRow label="Physically Challenged" value={student.physicallyChallenged || "No"} />
                <InfoRow label="Blood Group" value={student.bloodGroup || "--"} />
              </div>
            </div>

          </div>

        </div>
      )}

      {/* TAB 2: Admission Information (Exact match to Screenshot 4) */}
      {activeTab === 'admission' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          
          {/* Left Box from Screenshot 4 */}
          <div className="bg-white rounded border border-slate-200 shadow-xs p-3.5 sm:p-5">
            <div className="space-y-1.5 sm:space-y-2 text-[12px] text-slate-700">
              <InfoRow label="Date of Admission" value={student.dateOfAdmission || "29/08/2024"} />
              <InfoRow label="Enrollment Session" value={student.enrollmentSession || "Odd 2024"} />
              <InfoRow label="Academic Batch" value={student.academicBatch || "2024-2028"} />
              <InfoRow label="Faculty Scope" value={student.facultyScope || "GENERAL"} />
              <InfoRow label="School" value={student.school || "GENERAL"} />
              <InfoRow label="Degree" value={student.degree || "B TECH"} isBold />
              <InfoRow label="Branch" value={student.branchFullName || "Electrical Engineering"} />
              <InfoRow label="Scheme" value={student.scheme || "B TECH- EE"} />
              <InfoRow label="Admission Category" value={student.admissionCategory || "CAP"} />
              <InfoRow label="Fees Category" value={student.feeCategoryName || "EBC-TF-100"} />
              <InfoRow label="Student Group" value={student.studentGroup || "--"} />
              <InfoRow label="Enrollment Type" value={student.enrollmentType || "First Year"} />
              <InfoRow label="Shift" value={student.shift || "SHIFT 1"} />
              <InfoRow label="Entrance Exam Reg. No." value={student.entranceExamRegNo || "EN24230968"} isMono />
              <InfoRow label="Entrance Exam Merit No." value={student.entranceExamMeritNo || "52073"} isMono />
            </div>
          </div>

          {/* Right Box from Screenshot 4 */}
          <div className="bg-white rounded border border-slate-200 shadow-xs p-3.5 sm:p-5">
            <div className="space-y-1.5 sm:space-y-2 text-[12px] text-slate-700">
              <InfoRow label="Faculty Scope" value={student.facultyScope || "GENERAL"} />
              <InfoRow label="School" value={student.school || "GENERAL"} />
              <InfoRow label="Degree" value={student.degree || "B TECH"} isBold />
              <InfoRow label="Branch" value={student.branchFullName || "Electrical Engineering"} />
              <InfoRow label="Scheme" value={student.scheme || "B TECH- EE"} />
              <InfoRow label="Current Session" value={student.currentSession || "Odd 2026"} />
              <InfoRow label="Year" value={student.year || "III"} />
              <InfoRow label="Semester" value={student.semester || "V"} />
              <InfoRow label="Class Section" value={student.section || "A"} />
              <InfoRow 
                label="Admission Status" 
                badge={
                  <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {student.admissionStatus || "ACTIVE"}
                  </span>
                } 
              />
            </div>
          </div>

        </div>
      )}

      {/* TAB 3: Address Information */}
      {activeTab === 'address' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-white rounded border border-slate-200 shadow-xs p-4 sm:p-5">
            <div className="mb-3 border-b border-slate-200 pb-1">
              <span className="text-[12px] font-bold text-[#00a896] uppercase tracking-wide">
                Correspondence Address ─────────
              </span>
            </div>
            <div className="space-y-1.5 text-[12px] text-slate-700">
              <InfoRow label="Address" value="Plot No. 42, Anand Nagar, Koradi Road" />
              <InfoRow label="City / District" value="Nagpur, Maharashtra" />
              <InfoRow label="Pin Code" value="440030" isMono />
              <InfoRow label="Country" value="India" />
            </div>
          </div>

          <div className="bg-white rounded border border-slate-200 shadow-xs p-4 sm:p-5">
            <div className="mb-3 border-b border-slate-200 pb-1">
              <span className="text-[12px] font-bold text-[#00a896] uppercase tracking-wide">
                Permanent Address ─────────
              </span>
            </div>
            <div className="space-y-1.5 text-[12px] text-slate-700">
              <InfoRow label="Address" value="Plot No. 42, Anand Nagar, Koradi Road" />
              <InfoRow label="City / District" value="Nagpur, Maharashtra" />
              <InfoRow label="Pin Code" value="440030" isMono />
              <InfoRow label="Country" value="India" />
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: Parent Details */}
      {activeTab === 'parent' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-white rounded border border-slate-200 shadow-xs p-4 sm:p-5">
            <div className="mb-3 border-b border-slate-200 pb-1">
              <span className="text-[12px] font-bold text-[#00a896] uppercase tracking-wide">
                Father Details ─────────
              </span>
            </div>
            <div className="space-y-1.5 text-[12px] text-slate-700">
              <InfoRow label="Father Name" value="Pramod Naidu" isBold />
              <InfoRow label="Occupation" value="Private Service" />
              <InfoRow label="Contact Number" value="(+91) 94221 56789" isMono />
              <InfoRow label="Annual Family Income" value="₹ 3,50,000.00" />
            </div>
          </div>

          <div className="bg-white rounded border border-slate-200 shadow-xs p-4 sm:p-5">
            <div className="mb-3 border-b border-slate-200 pb-1">
              <span className="text-[12px] font-bold text-[#00a896] uppercase tracking-wide">
                Mother Details ─────────
              </span>
            </div>
            <div className="space-y-1.5 text-[12px] text-slate-700">
              <InfoRow label="Mother Name" value="Sunita Naidu" isBold />
              <InfoRow label="Occupation" value="Homemaker" />
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: Bank Details */}
      {activeTab === 'bank' && (
        <div className="bg-white rounded border border-slate-200 shadow-xs p-4 sm:p-5 max-w-xl">
          <div className="mb-3 border-b border-slate-200 pb-1">
            <span className="text-[12px] font-bold text-[#00a896] uppercase tracking-wide">
              Registered Student Bank Account ─────────
            </span>
          </div>
          <div className="space-y-1.5 text-[12px] text-slate-700">
            <InfoRow label="Bank Name" value="Bank of Maharashtra" />
            <InfoRow label="Branch" value="Koradi Road Branch, Nagpur" />
            <InfoRow label="Account Number" value="60249811234" isMono isBold />
            <InfoRow label="IFSC Code" value="MAHB0001205" isMono isBold />
            <InfoRow label="Account Holder" value="RIDDHI PRAMOD NAIDU" isBold />
            <div className="pt-2 text-[11px] text-emerald-700 font-semibold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Verified for MahaDBT EBC Freeship Direct Benefit Transfer (DBT)</span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: Academic Records - Scrollable on phone */}
      {activeTab === 'academic' && (
        <div className="bg-white rounded border border-slate-200 shadow-xs overflow-hidden">
          <div className="md:hidden px-3 py-1.5 bg-slate-100 text-[11px] text-slate-600 border-b border-slate-200">
            👉 Swipe horizontally to view full academic grades & passing status
          </div>
          <div className="overflow-x-auto scrollbar-none touch-scroll">
            <table className="w-full text-left text-[12px] min-w-[520px]">
              <thead className="bg-[#34373d] text-white text-[11px]">
                <tr>
                  <th className="py-2.5 px-3">Examination / Stage</th>
                  <th className="py-2.5 px-3">Board / Institute</th>
                  <th className="py-2.5 px-3">Passing Year</th>
                  <th className="py-2.5 px-3 text-right">Score / CGPA</th>
                  <th className="py-2.5 px-3 text-center">Status</th>
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
        </div>
      )}

      {/* TAB 7: Documents */}
      {activeTab === 'documents' && (
        <div className="bg-white rounded border border-slate-200 shadow-xs p-3.5 sm:p-4">
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
                  className="p-2 rounded hover:bg-white text-blue-600 shadow-2xs shrink-0" 
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
