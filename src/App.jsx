import React, { useState, useEffect } from 'react';
import { Navbar } from './components/common/Navbar';
import { Sidebar } from './components/common/Sidebar';
import { Footer } from './components/common/Footer';
import { MobileBottomBar } from './components/common/MobileBottomBar';
import { LoginPage } from './components/auth/LoginPage';
import { NotificationToast } from './components/common/NotificationToast';

// Student Pages matching screenshots
import { HomePage } from './components/home/HomePage';
import { StudentFeesPage } from './components/fees/StudentFeesPage';
import { RegisteredCoursesPage } from './components/student/RegisteredCoursesPage';
import { AttendancePage } from './components/student/AttendancePage';
import { ExamPage } from './components/student/ExamPage';
import { StudentInformationPage } from './components/student/StudentInformationPage';

// Modals
import { PayNowModal } from './components/fees/PayNowModal';
import { ReceiptModal } from './components/fees/ReceiptModal';
import { PaymentSuccessModal } from './components/fees/PaymentSuccessModal';

// Initial Data
import { 
  INSTITUTION, 
  INITIAL_STUDENT, 
  INITIAL_FEES_DATA, 
  INITIAL_TRANSACTION_HISTORY 
} from './data/mockData';
import { localStore } from './lib/supabase';

export function App() {
  const urlParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
  // Secret owner key allowing only you to view the dashboard when needed: ?owner=parikshit
  const isOwnerBypass = urlParams ? urlParams.get('owner') === 'parikshit' : false;
  const initialTabFromUrl = urlParams ? urlParams.get('tab') : null;

  // Strict: Always land on LoginPage. Nobody can enter through normal URL or login form.
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (isOwnerBypass) return true;
    return false;
  });

  // Active student tab matching screenshots: 'home' | 'admission' | 'attendance' | 'course' | 'exam' | 'finance' | 'feedback' | 'library' | 'courses'
  const [activeTab, setActiveTab] = useState(() => {
    if (initialTabFromUrl) return initialTabFromUrl;
    return localStore.get('activeTab', 'home');
  });

  // Mobile drawer state for phones
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Core Data States - Initialized with Parikshit Kundan Raut
  const [student, setStudent] = useState(() => {
    const saved = localStore.get('student', null);
    if (saved && (saved.abcId === '309864532452' || saved.universityEnrollmentNo === '20250140700489')) {
      return { 
        ...INITIAL_STUDENT, 
        ...saved 
      };
    }
    // Update localStore with official verified records from portal screenshots
    localStore.set('student', INITIAL_STUDENT);
    return INITIAL_STUDENT;
  });
  const [feesData, setFeesData] = useState(() => {
    const saved = localStore.get('feesData', null);
    if (saved && saved.grandTotal === 115000.00) {
      return saved;
    }
    return INITIAL_FEES_DATA;
  });
  const [paymentHistory, setPaymentHistory] = useState(() => {
    const saved = localStore.get('paymentHistory', null);
    if (
      saved && 
      Array.isArray(saved) && 
      saved.length > 0 && 
      saved.some(t => t.voucherNo === 'OFR2425022000050' && t.pdfUrl) && saved.some(t => t.voucherNo === 'OFR2627042900342')
    ) {
      return saved;
    }
    // Update localStore with official verified transaction records
    localStore.set('paymentHistory', INITIAL_TRANSACTION_HISTORY);
    return INITIAL_TRANSACTION_HISTORY;
  });

  // Modals
  const [isPayNowOpen, setIsPayNowOpen] = useState(false);
  const [payNowDefaultAmount, setPayNowDefaultAmount] = useState(14000.00);
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);
  const [activeReceipt, setActiveReceipt] = useState(null);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [latestPayment, setLatestPayment] = useState(null);

  // Notification Toast
  const [notification, setNotification] = useState(null);

  const showNotification = (type, title, message) => {
    setNotification({ type, title, message });
    setTimeout(() => setNotification(null), 4000);
  };

  // Sync state to local persistence
  useEffect(() => {
    localStore.set('isAuthenticated', isAuthenticated);
    localStore.set('activeTab', activeTab);
    localStore.set('student', student);
    localStore.set('feesData', feesData);
    localStore.set('paymentHistory', paymentHistory);
  }, [isAuthenticated, activeTab, student, feesData, paymentHistory]);

  // Login handler from exact login screenshot
  const handleLogin = (creds = {}) => {
    const rawUser = creds?.username || 'UGF24EE036';
    setIsAuthenticated(true);
    setActiveTab('home');

    // Sync student PRN and UID with the login ID (UGF24EE036) without overwriting Roll Number
    setStudent(prev => ({
      ...prev,
      prn: rawUser.toUpperCase(),
      registrationNo: rawUser.toUpperCase(),
      uid: rawUser.toUpperCase(),
      // Roll Number remains separate from UID (e.g. 36)
    }));

    showNotification(
      'success',
      'Sign In Successful',
      `Welcome to CyberVidya Portal, ${student.shortName}!`
    );
  };

  // Logout handler
  const handleLogout = () => {
    setIsAuthenticated(false);
    showNotification('info', 'Signed Out', 'You have been safely signed out to the CyberVidya login portal.');
  };

  // Open Pay Now
  const handleOpenPayNow = (amt) => {
    setPayNowDefaultAmount(amt || 14348.00);
    setIsPayNowOpen(true);
  };

  // Complete Payment handler
  const handlePaymentComplete = (newPaymentRecord) => {
    // 1. Prepend to payment history
    setPaymentHistory(prev => [newPaymentRecord, ...prev]);

    // 2. Mark Development fees as paid
    setFeesData(prev => ({
      ...prev,
      outstanding: 0.00,
      feeHeads: prev.feeHeads.map(h => {
        if (h.name === "Development Fees") {
          return {
            ...h,
            status: "Paid",
            statusType: "green",
            totalCollectedAmount: h.totalReceivables,
            outstanding: 0.00,
          };
        }
        return h;
      }),
      totals: {
        ...prev.totals,
        totalA: {
          ...prev.totals.totalA,
          outstanding: 0.00,
          totalCollectedAmount: prev.totals.totalA.totalReceivables,
        }
      }
    }));

    setIsPayNowOpen(false);
    setLatestPayment(newPaymentRecord);
    setIsSuccessOpen(true);
    showNotification('success', 'Fee Payment Verified!', `Official receipt ${newPaymentRecord.receiptNumber} generated.`);
  };

  // View Receipt handler
  const handleOpenReceipt = (receiptObj) => {
    setActiveReceipt(receiptObj || paymentHistory[0]);
    setIsReceiptOpen(true);
  };

  // 1. If not logged in, render the exact screenshot LoginPage
  if (!isAuthenticated) {
    return (
      <>
        <LoginPage onLogin={handleLogin} />
        <NotificationToast
          notification={notification}
          onClose={() => setNotification(null)}
        />
      </>
    );
  }

  // 2. When logged in, render the exact JITN CyberVidya Student Portal
  return (
    <div className="min-h-screen flex flex-col bg-[#f5f6f8] text-slate-900 font-sans antialiased">
      
      {/* Top Header: JIT Logo + JHULELAL INSTITUTE OF TECHNOLOGY, NAGPUR + Welcome RIDDHI */}
      <Navbar
        student={student}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={handleLogout}
        isMobileMenuOpen={isMobileMenuOpen}
        onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />

      {/* Main Container: Sidebar + Content */}
      <div className="flex flex-1 relative">
        
        {/* Dark Charcoal Sidebar: desktop mode + mobile slide-over drawer */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isMobileOpen={isMobileMenuOpen}
          onCloseMobile={() => setIsMobileMenuOpen(false)}
          student={student}
          onLogout={handleLogout}
        />

        {/* Inner Content Area matching Screenshots with mobile safe bottom spacing */}
        <main className="flex-1 p-3 sm:p-4 md:p-6 pb-20 md:pb-6 overflow-y-auto max-w-7xl w-full mx-auto">
          
          {/* Tab 1: Dashboard / Home Notice Board (Screenshot 1) */}
          {activeTab === 'home' && (
            <HomePage onNavigateToFees={() => setActiveTab('finance')} />
          )}

          {/* Tab 2: Finance / Student Fees Details (Screenshot 3) */}
          {activeTab === 'finance' && (
            <StudentFeesPage
              student={student}
              feesData={feesData}
              paymentHistory={paymentHistory}
              onPayNow={handleOpenPayNow}
              onViewReceipt={handleOpenReceipt}
              onViewInvoice={handleOpenReceipt}
            />
          )}

          {/* Tab 3: My Registered Courses */}
          {(activeTab === 'courses' || activeTab === 'course') && (
            <RegisteredCoursesPage />
          )}

          {/* Tab 4: Attendance */}
          {activeTab === 'attendance' && (
            <AttendancePage student={student} />
          )}

          {/* Tab 5: Exam */}
          {activeTab === 'exam' && (
            <ExamPage student={student} />
          )}

          {/* Tab 6: Student Information (Exact Match to Screenshot 4 & 5) */}
          {(activeTab === 'student-info' || activeTab === 'admission') && (
            <StudentInformationPage 
              student={student} 
              onUpdateStudent={(updated) => setStudent(prev => ({ ...prev, ...updated }))}
            />
          )}

          {/* Tab 7: Feedback, Library Placeholders */}
          {(activeTab === 'feedback' || activeTab === 'library') && (
            <div className="space-y-4">
              <h2 className="text-[17px] font-bold text-slate-900 capitalize">
                {activeTab} Portal
              </h2>
              <div className="bg-white rounded border border-slate-200 p-8 text-center text-xs text-slate-500 space-y-2">
                <p className="font-semibold text-slate-700">Autonomous Student Service Active</p>
                <p>All records up-to-date for session 2026-2027 under Registration No: <strong className="font-mono text-slate-900">{student.registrationNo}</strong>.</p>
                <button
                  onClick={() => setActiveTab('finance')}
                  className="mt-3 px-4 py-1.5 bg-[#18b82a] hover:bg-[#15a225] text-white text-xs font-bold rounded shadow-xs"
                >
                  Go to Student Fees Details
                </button>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* Mobile Bottom Navigation Bar (Phone-only thumb navigation) */}
      <MobileBottomBar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenMenu={() => setIsMobileMenuOpen(true)}
      />

      {/* Footer matching Screenshot 1, 2, 3 */}
      <Footer />

      {/* ================= MODALS ================= */}

      {/* Pay Now Modal with Razorpay + Dynamic UPI QR */}
      {isPayNowOpen && (
        <PayNowModal
          isOpen={isPayNowOpen}
          onClose={() => setIsPayNowOpen(false)}
          student={student}
          defaultAmount={payNowDefaultAmount}
          onPaymentComplete={handlePaymentComplete}
        />
      )}

      {/* Official Computerized Receipt Modal */}
      {isReceiptOpen && activeReceipt && (
        <ReceiptModal
          isOpen={isReceiptOpen}
          onClose={() => setIsReceiptOpen(false)}
          receipt={activeReceipt}
          student={student}
        />
      )}

      {/* Payment Success Confirmation */}
      {isSuccessOpen && latestPayment && (
        <PaymentSuccessModal
          isOpen={isSuccessOpen}
          onClose={() => setIsSuccessOpen(false)}
          paymentRecord={latestPayment}
          onViewReceipt={handleOpenReceipt}
          student={student}
        />
      )}

      {/* Floating Alert Toast */}
      <NotificationToast
        notification={notification}
        onClose={() => setNotification(null)}
      />

    </div>
  );
}

export default App;
