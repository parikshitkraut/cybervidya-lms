# CyberVidya Next - Advanced Autonomous LMS & Academic ERP

A complete, modern, and professional Learning Management System (LMS) and Academic ERP inspired by [JITN CyberVidya](https://jitn.cybervidya.net/) (Jhulelal Institute of Technology, Nagpur). Built with **React 18**, **Vite**, **Tailwind CSS**, **Supabase integration**, and **Razorpay Payment Gateway**.

---

## 🌟 Key Modules & Features

### 🎓 1. Student Portal Experience
- **Interactive Student Profile**: Displays student details, PRN (`2023BCSE042`), Roll No, Branch (`B.Tech Computer Science & Engineering`), Semester, Section, CGPA (`8.84`), biometric attendance percentage (`89.4%`), faculty mentor, and guardian contacts.
- **Course Catalog & Video Player**:
  - Accredited curriculum with modules, unit-wise syllabus, and lecture checklists.
  - Built-in video player with speed controls, progress tracking, and lecture notes.
  - Downloadable study materials (PDF lecture slides, code notebooks, lab manuals).
  - Interactive Unit Quizzes with instant scoring, timer, and question explanations.
- **Classes & Timetable**:
  - Live daily lecture timetable with room locations and one-click Google Meet / Smart Classroom join links.
  - Weekly schedule viewer with "Live Now" animated indicators.
- **Assignments & Lab Work**:
  - Filter by All, Pending, and Graded assignments with deadline countdowns.
  - Interactive submission modal supporting file uploads (`.pdf`, `.zip`, `.ipynb`) and repository URLs.
  - Graded feedback and faculty remarks view.
- **Announcements & Circulars**:
  - Categorized notices (Accounts & Examination, Scholarship Cell, Technical Events) with urgent action flags.
- **Certificates & Honors**:
  - Cryptographically verifiable course completion credentials.
  - Official printable certificate dialog with autonomous university seal and dean's digital signature.

---

### 💳 2. Fees & Payments Module (Student Dashboard)
A complete, institutional fee management portal meeting UGC, AICTE, and university norms:
- **Comprehensive Fee Overview**:
  - Total Course Fees: `₹1,45,000`
  - Scholarship / EBC Waiver Applied: `-₹25,000`
  - Net Payable Fees: `₹1,20,000`
  - Amount Paid: `₹80,000` (67% cleared)
  - Outstanding Balance: `₹40,000`
  - Next Payment Due Date with countdown and grace period notice.
- **Installment Schedule**:
  - 3-Term installment breakdown (Term 1, Term 2, Term 3).
  - Real-time status tags (`Paid`, `Pending`, `Overdue`).
  - Due dates, paid dates, transaction IDs, and receipt references.
- **Payment History Ledger**:
  - Searchable and filterable transaction table.
  - Displays Receipt No, Transaction ID, Payment Date, Payment Method, Amount, and Status.
- **Action Buttons & Modals**:
  - **Pay Now**: Multi-mode checkout supporting installment payment, full balance clearance, or custom amount.
  - **Download Receipt**: Official computer-generated fee receipt with college watermark, receipt number, student PRN, itemized fee heads, amount in words, authorized signature, and verification QR code.
  - **View Invoice**: Itemized tax invoice and demand note with fee particulars and institutional bank details.
  - **Payment Confirmation Page**: Instant celebration screen with confetti, transaction reference, and receipt download.

---

### 🛡️ 3. Administrative ERP & Fees Management
- **Executive Dashboard**:
  - Real-time KPI cards: Total Billed Fees, Total Realized Fees, Outstanding Receivables, and Collection Rate.
  - Live stream of recent payments across campus.
  - Pending defaulters list with one-click reminder alerts.
- **Fees Administration Center**:
  - Student fee roster with filters by status (`Paid`, `Partial`, `Overdue`, `Unpaid`) and department.
  - **Record Offline Payment**: Dedicated modal for cash counter collections, cheques, demand drafts (DD), and bank transfers with auto-generated receipt numbers.
  - **Course Fee Regulations**: Configurable annual fee heads (Tuition, Development, Examination, Computing/Lab, Library) across programs (B.Tech, Lateral Entry, M.Tech).
  - **Scholarships & Waivers**: Manage State EBC, Merit Distinction, Sports Quota, and Defense concessions.
  - **Audit Reports**: Branch-wise realization matrix and CSV export capability.
- **Academic Management**:
  - Student enrollment directory with contact and academic standing.
  - Course builder to create new subjects, assign professors, and configure tuition fees.

---

### 🔒 4. Payment Security & Compliance
- **Razorpay Integration**:
  - Seamlessly loads `checkout.js` with merchant branding.
  - Safe demo fallback sandbox when live API keys are not provided.
  - Key configuration panel for testing with custom `rzp_test_...` credentials.
- **Data Privacy & RBI Standards**:
  - **Zero Card / PIN Storage**: Never stores or logs CVVs, card PAN numbers, or UPI PINs.
  - **Server-Side Verification**: Documented HMAC SHA-256 webhook signature verification (`crypto.createHmac('sha256', secret)`).
  - **PCI-DSS Level 1**: Compliant transaction routing.

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js `v18+` or `v20+` / `v26+`
- npm or pnpm

### 2. Run Locally
```bash
# Navigate to project directory
cd "C:\Users\shewa\.gemini\antigravity\scratch\cybervidya-lms"

# Start the Vite development server
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Build for Production
```bash
npm run build
npm run preview
```

---

## ⚙️ Environment Variables (Optional)
Create a `.env` file in the project root to connect live services:
```env
# Supabase Backend (Optional - Local persistence is active by default)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

# Razorpay Payment Gateway (Optional - Demo mode works out of the box)
VITE_RAZORPAY_KEY_ID=rzp_test_your_key_here
```

---

## 🏛️ Autonomous Institutional Identity
- **Institution**: Jhulelal Institute of Technology (JITN), Nagpur
- **Affiliation**: Approved by AICTE, New Delhi | Affiliated to R.T.M. Nagpur University
- **Accreditation**: NAAC 'A+' Grade Autonomous Institution
- **ERP Platform**: CyberVidya Next
