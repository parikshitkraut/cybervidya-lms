import React, { useState, useEffect } from 'react';
import { Navbar } from './components/common/Navbar';
import { Sidebar } from './components/common/Sidebar';
import { NotificationToast } from './components/common/NotificationToast';

// Student Components
import { StudentDashboard } from './components/student/StudentDashboard';
import { StudentProfile } from './components/student/StudentProfile';
import { AssignmentsList } from './components/student/AssignmentsList';
import { CertificatesView } from './components/student/CertificatesView';
import { TimetableSchedule } from './components/student/TimetableSchedule';
import { AnnouncementsView } from './components/student/AnnouncementsView';

// Course Components
import { CourseCatalog } from './components/courses/CourseCatalog';
import { CoursePlayer } from './components/courses/CoursePlayer';
import { QuizModal } from './components/courses/QuizModal';

// Fees Components
import { FeeOverviewCards } from './components/fees/FeeOverviewCards';
import { InstallmentSchedule } from './components/fees/InstallmentSchedule';
import { PaymentHistoryTable } from './components/fees/PaymentHistoryTable';
import { PayNowModal } from './components/fees/PayNowModal';
import { ReceiptModal } from './components/fees/ReceiptModal';
import { InvoiceModal } from './components/fees/InvoiceModal';
import { PaymentSuccessModal } from './components/fees/PaymentSuccessModal';

// Admin Components
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AdminFeesManagement } from './components/admin/AdminFeesManagement';
import { AdminStudents } from './components/admin/AdminStudents';
import { AdminCourses } from './components/admin/AdminCourses';
import { AdminReports } from './components/admin/AdminReports';
import { RecordPaymentModal } from './components/admin/RecordPaymentModal';
import { FeeStructureModal } from './components/admin/FeeStructureModal';
import { ScholarshipModal } from './components/admin/ScholarshipModal';

// Initial Mock Data
import { 
  INSTITUTION, 
  INITIAL_STUDENT, 
  INITIAL_FEE_SUMMARY, 
  INITIAL_INSTALLMENTS, 
  INITIAL_PAYMENT_HISTORY, 
  INITIAL_COURSES, 
  UPCOMING_CLASSES, 
  ASSIGNMENTS, 
  ANNOUNCEMENTS, 
  CERTIFICATES, 
  ALL_STUDENTS 
} from './data/mockData';
import { localStore } from './lib/supabase';

export function App() {
  // Roles: 'student' | 'admin'
  const [currentRole, setCurrentRole] = useState(() => localStore.get('role', 'student'));
  const [activeTab, setActiveTab] = useState(() => currentRole === 'admin' ? 'admin-overview' : 'dashboard');

  // Core Data States with persistence
  const [student, setStudent] = useState(() => localStore.get('student', INITIAL_STUDENT));
  const [feeSummary, setFeeSummary] = useState(() => localStore.get('feeSummary', INITIAL_FEE_SUMMARY));
  const [installments, setInstallments] = useState(() => localStore.get('installments', INITIAL_INSTALLMENTS));
  const [paymentHistory, setPaymentHistory] = useState(() => localStore.get('paymentHistory', INITIAL_PAYMENT_HISTORY));
  const [courses, setCourses] = useState(() => localStore.get('courses', INITIAL_COURSES));
  const [assignments, setAssignments] = useState(() => localStore.get('assignments', ASSIGNMENTS));
  const [allStudents, setAllStudents] = useState(() => localStore.get('allStudents', ALL_STUDENTS));
  
  // Active playing course
  const [activeCourse, setActiveCourse] = useState(null);

  // Modal States
  const [isPayNowOpen, setIsPayNowOpen] = useState(false);
  const [payNowDefaultAmount, setPayNowDefaultAmount] = useState(null);
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);
  const [activeReceipt, setActiveReceipt] = useState(null);
  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);
  const [activeInvoice, setActiveInvoice] = useState(null);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [latestPayment, setLatestPayment] = useState(null);
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  // Admin Modals
  const [isRecordPaymentOpen, setIsRecordPaymentOpen] = useState(false);
  const [isFeeStructureOpen, setIsFeeStructureOpen] = useState(false);
  const [isScholarshipOpen, setIsScholarshipOpen] = useState(false);

  // Notifications
  const [notification, setNotification] = useState(null);

  const showNotification = (type, title, message) => {
    setNotification({ type, title, message });
    setTimeout(() => setNotification(null), 4000);
  };

  // Sync state to local persistence
  useEffect(() => {
    localStore.set('feeSummary', feeSummary);
    localStore.set('installments', installments);
    localStore.set('paymentHistory', paymentHistory);
    localStore.set('allStudents', allStudents);
    localStore.set('courses', courses);
    localStore.set('assignments', assignments);
    localStore.set('role', currentRole);
  }, [feeSummary, installments, paymentHistory, allStudents, courses, assignments, currentRole]);

  // Handle switching roles
  const handleRoleChange = (newRole) => {
    setCurrentRole(newRole);
    setActiveTab(newRole === 'admin' ? 'admin-overview' : 'dashboard');
    setActiveCourse(null);
  };

  // Payment completed (Razorpay or Demo checkout)
  const handlePaymentComplete = (newPaymentRecord, amountPaid, paymentChoice) => {
    // 1. Prepend to payment history
    setPaymentHistory(prev => [newPaymentRecord, ...prev]);

    // 2. Update fee summary
    const newPaidAmount = feeSummary.amountPaid + amountPaid;
    const newOutstanding = Math.max(0, feeSummary.outstandingBalance - amountPaid);
    setFeeSummary(prev => ({
      ...prev,
      amountPaid: newPaidAmount,
      outstandingBalance: newOutstanding,
    }));

    // 3. If paid installment, mark term 3 as paid
    setInstallments(prev => prev.map(inst => {
      if (inst.status === 'Pending' && (paymentChoice === 'installment' || paymentChoice === 'full')) {
        return {
          ...inst,
          status: 'Paid',
          paidDate: newPaymentRecord.date,
          transactionId: newPaymentRecord.transactionId,
          receiptNumber: newPaymentRecord.receiptNumber,
          paymentMethod: newPaymentRecord.paymentMethod,
        };
      }
      return inst;
    }));

    // 4. Update student in admin roster
    setAllStudents(prev => prev.map(s => {
      if (s.id === student.id) {
        return {
          ...s,
          paidAmount: s.paidAmount + amountPaid,
          outstanding: Math.max(0, s.outstanding - amountPaid),
          feeStatus: newOutstanding === 0 ? 'Paid' : 'Partial',
          lastPaymentDate: newPaymentRecord.date,
        };
      }
      return s;
    }));

    setIsPayNowOpen(false);
    setLatestPayment(newPaymentRecord);
    setIsSuccessOpen(true);
    showNotification('success', 'Fee Payment Verified!', `Official receipt ${newPaymentRecord.receiptNumber} generated.`);
  };

  // Admin records offline payment
  const handleRecordOfflinePayment = (studentId, newPayment, amount) => {
    setPaymentHistory(prev => [newPayment, ...prev]);

    setAllStudents(prev => prev.map(s => {
      if (s.id === studentId) {
        const newOutstanding = Math.max(0, s.outstanding - amount);
        return {
          ...s,
          paidAmount: s.paidAmount + amount,
          outstanding: newOutstanding,
          feeStatus: newOutstanding === 0 ? 'Paid' : 'Partial',
          lastPaymentDate: newPayment.date,
        };
      }
      return s;
    }));

    // If recording for currently viewed student
    if (studentId === student.id) {
      setFeeSummary(prev => ({
        ...prev,
        amountPaid: prev.amountPaid + amount,
        outstandingBalance: Math.max(0, prev.outstandingBalance - amount),
      }));
      setInstallments(prev => prev.map(inst => {
        if (inst.status === 'Pending') {
          return {
            ...inst,
            status: 'Paid',
            paidDate: newPayment.date,
            transactionId: newPayment.transactionId,
            receiptNumber: newPayment.receiptNumber,
            paymentMethod: newPayment.paymentMethod,
          };
        }
        return inst;
      }));
    }

    showNotification('success', 'Offline Payment Recorded', `Receipt ${newPayment.receiptNumber} issued for ₹${amount.toLocaleString('en-IN')}`);
  };

  // View Receipt handler
  const handleOpenReceipt = (receiptNumberOrObject) => {
    let target = null;
    if (typeof receiptNumberOrObject === 'string') {
      target = paymentHistory.find(p => p.receiptNumber === receiptNumberOrObject) || paymentHistory[0];
    } else {
      target = receiptNumberOrObject;
    }
    setActiveReceipt(target);
    setIsReceiptOpen(true);
  };

  // View Invoice handler
  const handleOpenInvoice = (transaction) => {
    setActiveInvoice(transaction);
    setIsInvoiceOpen(true);
  };

  // Open Pay Now
  const handleOpenPayNow = (amount = null) => {
    setPayNowDefaultAmount(amount);
    setIsPayNowOpen(true);
  };

  // Toggle Lesson Completion
  const handleToggleLesson = (courseId, lessonId) => {
    setCourses(prev => prev.map(c => {
      if (c.id === courseId) {
        let total = 0;
        let completed = 0;
        const newModules = (c.modules || []).map(m => {
          const newLessons = (m.lessons || []).map(l => {
            total++;
            const isTarget = l.id === lessonId;
            const isCompleted = isTarget ? !l.completed : l.completed;
            if (isCompleted) completed++;
            return { ...l, completed: isCompleted };
          });
          return { ...m, lessons: newLessons };
        });

        const progress = total > 0 ? Math.round((completed / total) * 100) : c.progress;
        return {
          ...c,
          modules: newModules,
          progress,
          completedLectures: completed,
          totalLectures: total || c.totalLectures,
        };
      }
      return c;
    }));
  };

  // Assignment submission
  const handleSubmitAssignment = (asgId, submissionData) => {
    setAssignments(prev => prev.map(a => {
      if (a.id === asgId) {
        return {
          ...a,
          status: 'Submitted',
          submittedFile: submissionData.file,
          submittedAt: submissionData.submittedAt,
        };
      }
      return a;
    }));
    showNotification('success', 'Assignment Submitted', 'Work uploaded and queued for faculty evaluation.');
  };

  // Send fee reminder SMS
  const handleSendReminder = (targetStudent) => {
    showNotification(
      'info', 
      'Fee Reminder Dispatched', 
      `Automated SMS & Email sent to ${targetStudent.name} and parent registered contact: ${targetStudent.phone}`
    );
  };

  // Add course
  const handleAddCourse = (newCourse) => {
    setCourses(prev => [newCourse, ...prev]);
    showNotification('success', 'Course Added', `${newCourse.title} (${newCourse.code}) enrolled into curriculum.`);
  };

  const pendingAssignmentsCount = assignments.filter(a => a.status === 'Pending').length;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      
      {/* Top Navbar */}
      <Navbar
        currentRole={currentRole}
        onRoleChange={handleRoleChange}
        student={student}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenPayNow={() => handleOpenPayNow(feeSummary.outstandingBalance)}
        feeSummary={feeSummary}
      />

      {/* Main Body Layout */}
      <div className="flex flex-1">
        
        {/* Left Sidebar */}
        <Sidebar
          currentRole={currentRole}
          activeTab={activeTab}
          setActiveTab={(tab) => {
            setActiveTab(tab);
            setActiveCourse(null);
          }}
          feeSummary={feeSummary}
          pendingAssignmentsCount={pendingAssignmentsCount}
        />

        {/* Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full overflow-y-auto">
          
          {/* ================= STUDENT PORTAL VIEWS ================= */}
          {currentRole === 'student' && (
            <>
              {/* 1. Student Dashboard */}
              {activeTab === 'dashboard' && (
                <StudentDashboard
                  student={student}
                  courses={courses}
                  feeSummary={feeSummary}
                  upcomingClasses={UPCOMING_CLASSES}
                  assignments={assignments}
                  announcements={ANNOUNCEMENTS}
                  onOpenCourse={(c) => {
                    setActiveCourse(c);
                    setActiveTab('courses');
                  }}
                  onOpenPayNow={() => handleOpenPayNow(feeSummary.outstandingBalance)}
                  setActiveTab={setActiveTab}
                />
              )}

              {/* 2. Courses & Lectures */}
              {activeTab === 'courses' && (
                activeCourse ? (
                  <CoursePlayer
                    course={activeCourse}
                    onBack={() => setActiveCourse(null)}
                    onToggleLesson={handleToggleLesson}
                    onOpenQuiz={() => setIsQuizOpen(true)}
                  />
                ) : (
                  <CourseCatalog
                    courses={courses}
                    onSelectCourse={(c) => setActiveCourse(c)}
                  />
                )
              )}

              {/* 3. Timetable & Schedule */}
              {activeTab === 'timetable' && (
                <TimetableSchedule />
              )}

              {/* 4. DEDICATED FEES & PAYMENTS SECTION */}
              {activeTab === 'fees' && (
                <div className="space-y-6">
                  {/* Top Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-cyber-50 text-cyber-700 border border-cyber-200">
                          Accounts & Finance Directorate
                        </span>
                        <span className="text-xs text-slate-400">Autonomous ERP</span>
                      </div>
                      <h2 className="text-xl font-black text-slate-900 mt-1">
                        Academic Fees & Online Payments Portal
                      </h2>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {INSTITUTION.name} • PRN: <strong className="font-mono text-slate-800">{student.prn}</strong> • Session {INSTITUTION.academicYear}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      {feeSummary.outstandingBalance > 0 && (
                        <button
                          onClick={() => handleOpenPayNow(feeSummary.outstandingBalance)}
                          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white text-xs font-bold shadow-lg shadow-emerald-500/20 flex items-center gap-2 transition-all"
                        >
                          <span>Pay Total Outstanding (₹{feeSummary.outstandingBalance.toLocaleString('en-IN')})</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* 4 Overview Cards */}
                  <FeeOverviewCards
                    feeSummary={feeSummary}
                    onPayNow={handleOpenPayNow}
                    onViewBreakdown={() => handleOpenInvoice(paymentHistory[0])}
                  />

                  {/* Installment Schedule */}
                  <InstallmentSchedule
                    installments={installments}
                    onPayInstallment={(inst) => handleOpenPayNow(inst.amount)}
                    onViewReceipt={handleOpenReceipt}
                  />

                  {/* Transaction History Table */}
                  <PaymentHistoryTable
                    paymentHistory={paymentHistory}
                    onViewReceipt={handleOpenReceipt}
                    onViewInvoice={handleOpenInvoice}
                  />
                </div>
              )}

              {/* 5. Assignments & Labs */}
              {activeTab === 'assignments' && (
                <AssignmentsList
                  assignments={assignments}
                  onSubmitAssignment={handleSubmitAssignment}
                />
              )}

              {/* 6. Announcements & Circulars */}
              {activeTab === 'announcements' && (
                <AnnouncementsView announcements={ANNOUNCEMENTS} />
              )}

              {/* 7. Certificates & Honors */}
              {activeTab === 'certificates' && (
                <CertificatesView certificates={CERTIFICATES} student={student} />
              )}

              {/* 8. Student Profile */}
              {activeTab === 'profile' && (
                <StudentProfile student={student} feeSummary={feeSummary} />
              )}
            </>
          )}

          {/* ================= ADMIN ERP VIEWS ================= */}
          {currentRole === 'admin' && (
            <>
              {/* 1. Admin Executive Dashboard */}
              {activeTab === 'admin-overview' && (
                <AdminDashboard
                  students={allStudents}
                  courses={courses}
                  paymentHistory={paymentHistory}
                  onRecordPayment={() => setIsRecordPaymentOpen(true)}
                  setActiveTab={setActiveTab}
                />
              )}

              {/* 2. DEDICATED ADMIN FEES MANAGEMENT */}
              {activeTab === 'admin-fees' && (
                <AdminFeesManagement
                  students={allStudents}
                  onRecordOfflinePayment={() => setIsRecordPaymentOpen(true)}
                  onViewReceipt={handleOpenReceipt}
                  onOpenFeeStructure={() => setIsFeeStructureOpen(true)}
                  onOpenScholarships={() => setIsScholarshipOpen(true)}
                  onSendReminder={handleSendReminder}
                />
              )}

              {/* 3. Students Roster */}
              {activeTab === 'admin-students' && (
                <AdminStudents students={allStudents} />
              )}

              {/* 4. Academic Courses */}
              {activeTab === 'admin-courses' && (
                <AdminCourses courses={courses} onAddCourse={handleAddCourse} />
              )}

              {/* 5. Collection Reports */}
              {activeTab === 'admin-reports' && (
                <AdminReports students={allStudents} paymentHistory={paymentHistory} />
              )}

              {/* 6. Scholarships & Waivers */}
              {activeTab === 'admin-scholarships' && (
                <div className="space-y-6">
                  <ScholarshipModal isOpen={true} onClose={() => setActiveTab('admin-fees')} />
                </div>
              )}
            </>
          )}

        </main>
      </div>

      {/* ================= MODAL DIALOGS ================= */}

      {/* Pay Now Modal */}
      {isPayNowOpen && (
        <PayNowModal
          isOpen={isPayNowOpen}
          onClose={() => setIsPayNowOpen(false)}
          student={student}
          feeSummary={feeSummary}
          installments={installments}
          defaultAmount={payNowDefaultAmount}
          onPaymentComplete={handlePaymentComplete}
        />
      )}

      {/* Official Receipt Modal */}
      {isReceiptOpen && activeReceipt && (
        <ReceiptModal
          isOpen={isReceiptOpen}
          onClose={() => setIsReceiptOpen(false)}
          receipt={activeReceipt}
          student={student}
        />
      )}

      {/* Tax Invoice Modal */}
      {isInvoiceOpen && (
        <InvoiceModal
          isOpen={isInvoiceOpen}
          onClose={() => setIsInvoiceOpen(false)}
          transaction={activeInvoice || paymentHistory[0]}
          student={student}
          feeSummary={feeSummary}
        />
      )}

      {/* Payment Success Confirmation Modal */}
      {isSuccessOpen && latestPayment && (
        <PaymentSuccessModal
          isOpen={isSuccessOpen}
          onClose={() => setIsSuccessOpen(false)}
          paymentRecord={latestPayment}
          onViewReceipt={handleOpenReceipt}
          student={student}
        />
      )}

      {/* Quiz Modal */}
      {isQuizOpen && (
        <QuizModal
          isOpen={isQuizOpen}
          onClose={() => setIsQuizOpen(false)}
          courseTitle={activeCourse?.title || "Computer Science Core"}
        />
      )}

      {/* Admin: Record Payment Modal */}
      {isRecordPaymentOpen && (
        <RecordPaymentModal
          isOpen={isRecordPaymentOpen}
          onClose={() => setIsRecordPaymentOpen(false)}
          students={allStudents}
          onPaymentRecorded={handleRecordOfflinePayment}
        />
      )}

      {/* Admin: Fee Structure Modal */}
      {isFeeStructureOpen && (
        <FeeStructureModal
          isOpen={isFeeStructureOpen}
          onClose={() => setIsFeeStructureOpen(false)}
          onSave={() => showNotification('success', 'Fee Structure Updated', 'New fee rules updated for B.Tech & M.Tech programs.')}
        />
      )}

      {/* Admin: Scholarships Modal */}
      {isScholarshipOpen && (
        <ScholarshipModal
          isOpen={isScholarshipOpen}
          onClose={() => setIsScholarshipOpen(false)}
        />
      )}

      {/* Floating Notification Toast */}
      <NotificationToast
        notification={notification}
        onClose={() => setNotification(null)}
      />

    </div>
  );
}

export default App;
