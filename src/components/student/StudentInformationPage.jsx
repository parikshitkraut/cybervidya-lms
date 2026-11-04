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
  Eye,
  Edit3,
  Save,
  X
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

export const StudentInformationPage = ({ student, onUpdateStudent }) => {
  // Active sub-tab matching Screenshot 4 & 5:
  // 'personal' | 'admission' | 'address' | 'parent' | 'bank' | 'academic' | 'documents'
  const [activeTab, setActiveTab] = useState('personal');

  // Modal to edit blank/personal values
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    dob: student.dob === '--' ? '' : student.dob,
    phone: student.phone === '--' ? '' : student.phone,
    alternateMobile: student.alternateMobile === '--' ? '' : student.alternateMobile,
    whatsappMobile: student.whatsappMobile === '--' ? '' : student.whatsappMobile,
    birthPlace: student.birthPlace === '--' ? '' : student.birthPlace,
    bloodGroup: student.bloodGroup === '--' ? '' : student.bloodGroup,
    dateOfAdmission: student.dateOfAdmission === '--' ? '' : student.dateOfAdmission,
    entranceExamRegNo: student.entranceExamRegNo === '--' ? '' : student.entranceExamRegNo,
    entranceExamMeritNo: student.entranceExamMeritNo === '--' ? '' : student.entranceExamMeritNo,
    addressLine1: student.address?.correspondence?.addressLine1 === '--' ? '' : (student.address?.correspondence?.addressLine1 || ''),
    pinCode: student.address?.correspondence?.pinCode === '--' ? '' : (student.address?.correspondence?.pinCode || ''),
    fatherOccupation: student.parentDetails?.fatherOccupation === '--' ? '' : (student.parentDetails?.fatherOccupation || ''),
    fatherMobile: student.parentDetails?.fatherMobile === '--' ? '' : (student.parentDetails?.fatherMobile || ''),
    motherOccupation: student.parentDetails?.motherOccupation === '--' ? '' : (student.parentDetails?.motherOccupation || ''),
    annualIncome: student.parentDetails?.annualIncome === '--' ? '' : (student.parentDetails?.annualIncome || ''),
    bankName: student.bankDetails?.bankName === '--' ? '' : (student.bankDetails?.bankName || ''),
    branchName: student.bankDetails?.branch === '--' ? '' : (student.bankDetails?.branch || ''),
    accountNumber: student.bankDetails?.accountNumber === '--' ? '' : (student.bankDetails?.accountNumber || ''),
    ifscCode: student.bankDetails?.ifscCode === '--' ? '' : (student.bankDetails?.ifscCode || ''),
  });

  const handleSaveForm = (e) => {
    e.preventDefault();
    if (onUpdateStudent) {
      onUpdateStudent({
        dob: formData.dob || '--',
        phone: formData.phone || '--',
        alternateMobile: formData.alternateMobile || '--',
        whatsappMobile: formData.whatsappMobile || '--',
        birthPlace: formData.birthPlace || '--',
        bloodGroup: formData.bloodGroup || '--',
        dateOfAdmission: formData.dateOfAdmission || '--',
        entranceExamRegNo: formData.entranceExamRegNo || '--',
        entranceExamMeritNo: formData.entranceExamMeritNo || '--',
        address: {
          correspondence: {
            addressLine1: formData.addressLine1 || '--',
            city: "Nagpur",
            district: "Nagpur",
            state: "Maharashtra",
            pinCode: formData.pinCode || '--',
            country: "India",
          },
          permanent: {
            addressLine1: formData.addressLine1 || '--',
            city: "Nagpur",
            district: "Nagpur",
            state: "Maharashtra",
            pinCode: formData.pinCode || '--',
            country: "India",
          }
        },
        parentDetails: {
          fatherName: "Kundan Raut",
          fatherOccupation: formData.fatherOccupation || '--',
          fatherMobile: formData.fatherMobile || '--',
          motherName: "SHALINI RAUT",
          motherOccupation: formData.motherOccupation || '--',
          annualIncome: formData.annualIncome || '--',
        },
        bankDetails: {
          bankName: formData.bankName || '--',
          branch: formData.branchName || '--',
          accountNumber: formData.accountNumber || '--',
          ifscCode: formData.ifscCode || '--',
          accountHolderName: "PARIKSHIT KUNDAN RAUT",
        }
      });
    }
    setIsEditModalOpen(false);
  };

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
      
      {/* Page Title & Edit Button from Screenshot 4 & 5 */}
      <div className="flex items-center justify-between">
        <h2 className="text-[17px] font-bold text-slate-900 tracking-tight">
          Student Information
        </h2>

        <button
          onClick={() => setIsEditModalOpen(true)}
          className="px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 hover:text-blue-600 rounded text-xs font-semibold flex items-center gap-1.5 shadow-2xs transition-colors"
          title="Edit student profile values"
        >
          <Edit3 className="w-3.5 h-3.5 text-blue-600" />
          <span>Edit Details</span>
        </button>
      </div>

      {/* Student Name Header Card */}
      <div className="bg-white rounded border border-slate-200 shadow-xs p-3.5 sm:p-4 flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3 sm:gap-4">
        {/* Silhouette Avatar */}
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-slate-200 flex items-center justify-center text-slate-400 shrink-0 ring-1 ring-slate-300">
          <User className="w-8 h-8 sm:w-10 sm:h-10" />
        </div>
        <div className="flex-1">
          <h1 className="text-[16px] sm:text-[18px] font-bold text-slate-900">
            {student.name || "PARIKSHIT KUNDAN RAUT"}
          </h1>
          <p className="text-[11px] sm:text-xs text-slate-500 font-mono mt-0.5">
            Registration No: <span className="font-semibold text-slate-700">{student.registrationNo || "UGF24EE036"}</span> • Year: <span className="font-semibold text-slate-700">{student.year || "III"}</span> • Branch: <span className="font-semibold text-slate-700">{student.branchFullName || student.branch || "Electrical Engineering"}</span>
          </p>
          <div className="flex items-center gap-2 mt-1.5 justify-center sm:justify-start">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-200">
              Caste: {student.caste || "SC"}
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
              Category: {student.category || "SCHEDULED CASTE"}
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
              Mother: {student.parentDetails?.motherName || "SHALINI RAUT"}
            </span>
          </div>
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
                <InfoRow label="Title" value={student.title || "MR."} />
                <InfoRow label="Display Name Format" value={student.displayNameFormat || "FIRST MIDDLE LAST"} />
                <InfoRow label="Display Name" value={student.displayName || "PARIKSHIT KUNDAN RAUT"} isBold />
                <InfoRow label="Marital Status" value={student.maritalStatus || "Unmarried"} />
                <InfoRow label="Gender" value={student.gender || "Male"} />
                <InfoRow label="Date of Birth" value={student.dob || "--"} />
                <InfoRow label="Email ID" value={student.email || "ugf24ee036@jitnagpur.edu.in"} isMono />
                <InfoRow label="Institute Email ID" value={student.instituteEmail || "parikshitkraut@gmail.com"} isMono />
                <InfoRow label="Mobile Number" value={student.phone || "--"} isMono />
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
                <InfoRow label="Caste" value={student.caste || "SC"} isBold />
                <InfoRow label="Category" value={student.category || "SCHEDULED CASTE"} isBold />
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
                <InfoRow label="Registration Number" value={student.registrationNo || "UGF24EE036"} isMono isBold />
                <InfoRow label="University/Enrollment Number" value={student.universityEnrollmentNo || "--"} isMono />
                <InfoRow label="Application Number" value={student.applicationNo || "--"} />
                <InfoRow label="Roll Number" value={student.rollNo || "UGF24EE036"} isMono isBold />
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
              <InfoRow label="Date of Admission" value={student.dateOfAdmission || "--"} />
              <InfoRow label="Enrollment Session" value={student.enrollmentSession || "Odd 2024"} />
              <InfoRow label="Academic Batch" value={student.academicBatch || "2024-2028"} />
              <InfoRow label="Faculty Scope" value={student.facultyScope || "GENERAL"} />
              <InfoRow label="School" value={student.school || "GENERAL"} />
              <InfoRow label="Degree" value={student.degree || "B TECH"} isBold />
              <InfoRow label="Branch" value={student.branchFullName || "Electrical Engineering"} />
              <InfoRow label="Scheme" value={student.scheme || "B TECH- EE"} />
              <InfoRow label="Admission Category" value={student.admissionCategory || "CAP"} />
              <InfoRow label="Fees Category" value={student.feeCategoryName || "SC Scholarship (60% GSRR)"} isBold />
              <InfoRow label="Student Group" value={student.studentGroup || "--"} />
              <InfoRow label="Enrollment Type" value={student.enrollmentType || "First Year"} />
              <InfoRow label="Shift" value={student.shift || "SHIFT 1"} />
              <InfoRow label="Entrance Exam Reg. No." value={student.entranceExamRegNo || "--"} isMono />
              <InfoRow label="Entrance Exam Merit No." value={student.entranceExamMeritNo || "--"} isMono />
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
              <InfoRow label="Address" value={student.address?.correspondence?.addressLine1 || "--"} />
              <InfoRow label="City / District" value={`${student.address?.correspondence?.city || "Nagpur"}, ${student.address?.correspondence?.state || "Maharashtra"}`} />
              <InfoRow label="Pin Code" value={student.address?.correspondence?.pinCode || "--"} isMono />
              <InfoRow label="Country" value={student.address?.correspondence?.country || "India"} />
            </div>
          </div>

          <div className="bg-white rounded border border-slate-200 shadow-xs p-4 sm:p-5">
            <div className="mb-3 border-b border-slate-200 pb-1">
              <span className="text-[12px] font-bold text-[#00a896] uppercase tracking-wide">
                Permanent Address ─────────
              </span>
            </div>
            <div className="space-y-1.5 text-[12px] text-slate-700">
              <InfoRow label="Address" value={student.address?.permanent?.addressLine1 || "--"} />
              <InfoRow label="City / District" value={`${student.address?.permanent?.city || "Nagpur"}, ${student.address?.permanent?.state || "Maharashtra"}`} />
              <InfoRow label="Pin Code" value={student.address?.permanent?.pinCode || "--"} isMono />
              <InfoRow label="Country" value={student.address?.permanent?.country || "India"} />
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
              <InfoRow label="Father Name" value={student.parentDetails?.fatherName || "Kundan Raut"} isBold />
              <InfoRow label="Occupation" value={student.parentDetails?.fatherOccupation || "--"} />
              <InfoRow label="Contact Number" value={student.parentDetails?.fatherMobile || "--"} isMono />
              <InfoRow label="Annual Family Income" value={student.parentDetails?.annualIncome || "--"} />
            </div>
          </div>

          <div className="bg-white rounded border border-slate-200 shadow-xs p-4 sm:p-5">
            <div className="mb-3 border-b border-slate-200 pb-1">
              <span className="text-[12px] font-bold text-[#00a896] uppercase tracking-wide">
                Mother Details ─────────
              </span>
            </div>
            <div className="space-y-1.5 text-[12px] text-slate-700">
              <InfoRow label="Mother Name" value={student.parentDetails?.motherName || "SHALINI RAUT"} isBold />
              <InfoRow label="Occupation" value={student.parentDetails?.motherOccupation || "--"} />
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
            <InfoRow label="Bank Name" value={student.bankDetails?.bankName || "--"} />
            <InfoRow label="Branch" value={student.bankDetails?.branch || "--"} />
            <InfoRow label="Account Number" value={student.bankDetails?.accountNumber || "--"} isMono />
            <InfoRow label="IFSC Code" value={student.bankDetails?.ifscCode || "--"} isMono />
            <InfoRow label="Account Holder" value={student.bankDetails?.accountHolderName || "PARIKSHIT KUNDAN RAUT"} isBold />
            <div className="pt-2 text-[11px] text-emerald-700 font-semibold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Registered for SC Freeship / Government Scholarship Direct Benefit Transfer (DBT)</span>
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
                  <td className="py-2.5 px-3 text-right font-bold text-slate-900">Passed</td>
                  <td className="py-2.5 px-3 text-center"><span className="px-2 py-0.5 rounded text-[10px] font-bold bg-green-100 text-green-800">Passed</span></td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="py-2.5 px-3 font-semibold">HSC (Class 12th)</td>
                  <td className="py-2.5 px-3">Maharashtra State Board (MSBSHSE)</td>
                  <td className="py-2.5 px-3">2024</td>
                  <td className="py-2.5 px-3 text-right font-bold text-slate-900">Passed</td>
                  <td className="py-2.5 px-3 text-center"><span className="px-2 py-0.5 rounded text-[10px] font-bold bg-green-100 text-green-800">Passed</span></td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="py-2.5 px-3 font-semibold">B.Tech Sem I & II</td>
                  <td className="py-2.5 px-3">Jhulelal Institute of Technology (Autonomous)</td>
                  <td className="py-2.5 px-3">2025</td>
                  <td className="py-2.5 px-3 text-right font-bold text-slate-900">Passed</td>
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

      {/* ================= EDIT MODAL ================= */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white rounded-xl shadow-2xl p-5 sm:p-6 border border-slate-200 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Edit Personal & Contact Information
                </h3>
                <p className="text-xs text-slate-500">
                  Fill in your actual details or leave blank (`--`) until available.
                </p>
              </div>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="p-1 rounded text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveForm} className="mt-4 space-y-4 text-xs">
              
              {/* Personal Section */}
              <div className="space-y-2">
                <h4 className="font-bold text-[#00a896] uppercase text-[11px]">Personal & Contact Details</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-600 font-medium mb-1">Date of Birth</label>
                    <input
                      type="text"
                      placeholder="e.g. 15/07/2005 or DD/MM/YYYY"
                      value={formData.dob}
                      onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded px-2.5 py-1.5 focus:bg-white focus:border-blue-500 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 font-medium mb-1">Mobile Number</label>
                    <input
                      type="text"
                      placeholder="e.g. (+91) 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded px-2.5 py-1.5 focus:bg-white focus:border-blue-500 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 font-medium mb-1">Whatsapp Number</label>
                    <input
                      type="text"
                      placeholder="e.g. (+91) 98765 43210"
                      value={formData.whatsappMobile}
                      onChange={(e) => setFormData({ ...formData, whatsappMobile: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded px-2.5 py-1.5 focus:bg-white focus:border-blue-500 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 font-medium mb-1">Blood Group</label>
                    <input
                      type="text"
                      placeholder="e.g. O+, B+, A+"
                      value={formData.bloodGroup}
                      onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded px-2.5 py-1.5 focus:bg-white focus:border-blue-500 text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Address Section */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <h4 className="font-bold text-[#00a896] uppercase text-[11px]">Address Information</h4>
                <div>
                  <label className="block text-slate-600 font-medium mb-1">Address Line</label>
                  <input
                    type="text"
                    placeholder="e.g. Plot No, Street, Landmark"
                    value={formData.addressLine1}
                    onChange={(e) => setFormData({ ...formData, addressLine1: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded px-2.5 py-1.5 focus:bg-white focus:border-blue-500 text-xs"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-600 font-medium mb-1">Pin Code</label>
                    <input
                      type="text"
                      placeholder="e.g. 440001"
                      value={formData.pinCode}
                      onChange={(e) => setFormData({ ...formData, pinCode: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded px-2.5 py-1.5 focus:bg-white focus:border-blue-500 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 font-medium mb-1">City</label>
                    <input
                      type="text"
                      disabled
                      value="Nagpur, Maharashtra"
                      className="w-full bg-slate-100 text-slate-500 border border-slate-200 rounded px-2.5 py-1.5 text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Parents Section */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <h4 className="font-bold text-[#00a896] uppercase text-[11px]">Parent Details</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-600 font-medium mb-1">Father's Name</label>
                    <input
                      type="text"
                      disabled
                      value="Kundan Raut"
                      className="w-full bg-slate-100 text-slate-700 font-semibold border border-slate-200 rounded px-2.5 py-1.5 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 font-medium mb-1">Mother's Name</label>
                    <input
                      type="text"
                      disabled
                      value="SHALINI RAUT"
                      className="w-full bg-slate-100 text-slate-700 font-semibold border border-slate-200 rounded px-2.5 py-1.5 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 font-medium mb-1">Father Contact</label>
                    <input
                      type="text"
                      placeholder="e.g. (+91) 94220 00000"
                      value={formData.fatherMobile}
                      onChange={(e) => setFormData({ ...formData, fatherMobile: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded px-2.5 py-1.5 focus:bg-white focus:border-blue-500 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 font-medium mb-1">Annual Income</label>
                    <input
                      type="text"
                      placeholder="e.g. ₹ 2,50,000.00"
                      value={formData.annualIncome}
                      onChange={(e) => setFormData({ ...formData, annualIncome: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded px-2.5 py-1.5 focus:bg-white focus:border-blue-500 text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Bank Details */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <h4 className="font-bold text-[#00a896] uppercase text-[11px]">Student Bank Account</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-600 font-medium mb-1">Bank Name</label>
                    <input
                      type="text"
                      placeholder="e.g. State Bank of India / Bank of Maharashtra"
                      value={formData.bankName}
                      onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded px-2.5 py-1.5 focus:bg-white focus:border-blue-500 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 font-medium mb-1">Account Number</label>
                    <input
                      type="text"
                      placeholder="Account Number"
                      value={formData.accountNumber}
                      onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded px-2.5 py-1.5 focus:bg-white focus:border-blue-500 text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 font-medium mb-1">IFSC Code</label>
                    <input
                      type="text"
                      placeholder="IFSC Code"
                      value={formData.ifscCode}
                      onChange={(e) => setFormData({ ...formData, ifscCode: e.target.value.toUpperCase() })}
                      className="w-full bg-slate-50 border border-slate-300 rounded px-2.5 py-1.5 focus:bg-white focus:border-blue-500 text-xs font-mono uppercase"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 font-medium mb-1">Account Holder</label>
                    <input
                      type="text"
                      disabled
                      value="PARIKSHIT KUNDAN RAUT"
                      className="w-full bg-slate-100 text-slate-700 font-semibold border border-slate-200 rounded px-2.5 py-1.5 text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-3 py-1.5 rounded text-xs text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#18b82a] hover:bg-[#15a225] text-white text-xs font-bold rounded flex items-center gap-1.5 shadow-xs"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Information</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};
