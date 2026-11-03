export const INSTITUTION = {
  name: "JHULELAL INSTITUTE OF TECHNOLOGY, NAGPUR",
  shortName: "JITN",
  portalName: "CyberVidya",
  affiliation: "Affiliated to Rashtrasant Tukadoji Maharaj Nagpur University | Approved by AICTE, New Delhi",
  accreditation: "NAAC 'A+' Grade Autonomous Institution",
  address: "Koradi Road, Off Nagpur-Bhopal Highway, Lonara, Nagpur, Maharashtra 441111",
  phone: "+91 712 266 7777",
  email: "accounts@jitnagpur.edu.in",
  portalUrl: "https://jitn.cybervidya.net",
  academicYear: "2026-2027",
  academicSession: "Odd 2026",
  currentSemester: "Semester V",
};

export const INITIAL_STUDENT = {
  id: "std_001",
  name: "RIDDHI PRAMOD NAIK",
  shortName: "RIDDHI",
  prn: "UGF24EE041",
  registrationNo: "UGF24EE041",
  rollNo: "UGF24EE041",
  avatar: null, // Shows the authentic silhouette avatar from screenshot
  degree: "B TECH",
  branch: "EE",
  branchFullName: "Electrical Engineering",
  section: "A",
  year: "III",
  semester: "V",
  academicBatch: "2024-2028",
  academicSession: "Odd 2026",
  academicYear: "2026-2027",
  category: "OPEN",
  feeCategoryName: "EBC-TF-100",
  admissionCategory: "CAP",
  enrollmentType: "First Year",
  email: "riddhi.naik.ee24@jitnagpur.edu.in",
  phone: "+91 98230 45678",
  cgpa: 8.92,
  attendancePercentage: 91.5,
  creditsEarned: 94,
  totalCreditsRequired: 160,
};

export const INITIAL_FEES_DATA = {
  academicYearLabel: "2026-2027 III",
  totalReceivables: 14348.00,
  totalCollectedAmount: 14348.00,
  outstanding: 0.00,
  scholarshipAmount: 95652.00,
  feeHeads: [
    {
      id: 1,
      name: "SC Scholarship (60% GSRR)",
      pyob: 0.00,
      currentReceivables: 0.00,
      totalReceivables: 0.00,
      totalCollectedAmount: 0.00,
      outstanding: 0.00,
      status: "No Dues",
      statusType: "blue",
    },
    {
      id: 2,
      name: "Tuition fee",
      pyob: 0.00,
      currentReceivables: 0.00,
      totalReceivables: 0.00,
      totalCollectedAmount: 0.00,
      outstanding: 0.00,
      status: "No Dues",
      statusType: "blue",
    },
    {
      id: 3,
      name: "Development Fees",
      pyob: 0.00,
      currentReceivables: 14348.00,
      totalReceivables: 14348.00,
      totalCollectedAmount: 14348.00,
      outstanding: 0.00,
      status: "Paid",
      statusType: "green",
    },
    {
      id: 4,
      name: "Minority Scholarship",
      pyob: 0.00,
      currentReceivables: 0.00,
      totalReceivables: 0.00,
      totalCollectedAmount: 0.00,
      outstanding: 0.00,
      status: "No Dues",
      statusType: "blue",
    },
    {
      id: 5,
      name: "Advance Fees",
      pyob: 0.00,
      currentReceivables: 0.00,
      totalReceivables: 0.00,
      totalCollectedAmount: 0.00,
      outstanding: 0.00,
      status: "No Dues",
      statusType: "blue",
    },
  ],
  totals: {
    totalA: {
      pyob: 0.00,
      currentReceivables: 14348.00,
      totalReceivables: 14348.00,
      totalCollectedAmount: 14348.00,
      outstanding: 0.00,
    },
    scholarshipB: {
      amount: 95652.00,
      collected: 0.00,
      outstanding: 95652.00,
    }
  }
};

export const INITIAL_TRANSACTION_HISTORY = [
  {
    id: "txn_01",
    receiptNumber: "REC-JITN-2026-4412",
    transactionId: "TXN_RZP_982140",
    date: "2026-08-14",
    time: "10:30 AM",
    amount: 14348.00,
    description: "Session 2026-2027 III Development & Institutional Fees",
    paymentMethod: "Razorpay (UPI / NetBanking)",
    status: "Success",
    bankReference: "AXIS-PAY-982140",
    invoiceNumber: "INV-2026-084",
    payerName: "RIDDHI PRAMOD NAIK",
  }
];

export const NOTICE_BOARD = [
  {
    id: "not_1",
    authorInitials: "IDS",
    authorName: "Indrani Das Sarma",
    title: "Exam",
    description: "Exam schedule and verification circular for upcoming Semester V examinations.",
    timeAgo: "5 days ago",
    date: "2026-10-29",
    type: "exam",
    hasThumbnail: true,
  },
  {
    id: "not_2",
    authorInitials: "CC",
    authorName: "COE COE",
    title: "Result of B.Tech M.Tech MBA II/IV/VI Sem Winter-26 Supplementary Examination",
    description: "Result of B.Tech M.Tech MBA II/IV/VI Sem Winter-26 Supplementary Examination has been published on the university examination portal.",
    timeAgo: "19 days ago",
    date: "2026-10-15",
    type: "result",
    pdfCount: 11,
  },
  {
    id: "not_3",
    authorInitials: "CC",
    authorName: "COE COE",
    title: "TIME TABLE OF MBA III SEM WIN-26 SUPPLEMENTARY EXAM",
    description: "Official time table for MBA III Semester Winter-26 Supplementary Examination.",
    timeAgo: "21 days ago",
    date: "2026-10-13",
    type: "timetable",
    pdfCount: 3,
  },
  {
    id: "not_4",
    authorInitials: "JIT",
    authorName: "Accounts Office, JITN",
    title: "Online Fees Submission & Receipt Verification for Session 2026-2027",
    description: "All students are requested to clear development fees and submit online receipts through CyberVidya portal to ensure uninterrupted exam hall ticket release.",
    timeAgo: "24 days ago",
    date: "2026-10-10",
    type: "finance",
    pdfCount: 1,
  }
];

export const REGISTERED_COURSES = [
  {
    id: "ee501",
    code: "EE501",
    title: "Power Systems & Grid Operation",
    credits: 4,
    instructor: "Dr. S. K. Raut",
    semester: "V",
    progress: 74,
    materials: [
      { title: "Unit 1: Transmission Line Modeling.pdf", size: "3.2 MB" },
      { title: "Unit 2: Load Flow Analysis Gauss-Seidel.pdf", size: "4.1 MB" }
    ]
  },
  {
    id: "ee502",
    code: "EE502",
    title: "Electrical Machines & Drives II",
    credits: 4,
    instructor: "Prof. P. V. Joshi",
    semester: "V",
    progress: 82,
    materials: [
      { title: "Unit 1: Synchronous Motors & V-Curves.pdf", size: "2.8 MB" },
    ]
  },
  {
    id: "ee503",
    code: "EE503",
    title: "Control Systems Engineering",
    credits: 3,
    instructor: "Dr. Ananya Sen",
    semester: "V",
    progress: 68,
    materials: [
      { title: "Unit 1: Root Locus & Bode Plots Lab Guide.pdf", size: "5.5 MB" }
    ]
  },
  {
    id: "ee504",
    code: "EE504",
    title: "Power Electronics & Converters",
    credits: 3,
    instructor: "Prof. Vikram Singhania",
    semester: "V",
    progress: 60,
    materials: [
      { title: "Unit 1: Thyristor & Inverter Harmonics.pdf", size: "3.9 MB" }
    ]
  },
  {
    id: "ee505",
    code: "EE505",
    title: "Microcontrollers & Embedded Systems",
    credits: 3,
    instructor: "Dr. Sandeep Kulkarni",
    semester: "V",
    progress: 90,
    materials: [
      { title: "Unit 1: ARM Cortex-M Programming Lab.pdf", size: "4.8 MB" }
    ]
  }
];

export const ATTENDANCE_SUMMARY = [
  { subject: "EE501 - Power Systems", conducted: 42, attended: 39, percentage: 92.8 },
  { subject: "EE502 - Electrical Machines II", conducted: 38, attended: 35, percentage: 92.1 },
  { subject: "EE503 - Control Systems", conducted: 36, attended: 32, percentage: 88.9 },
  { subject: "EE504 - Power Electronics", conducted: 34, attended: 31, percentage: 91.2 },
  { subject: "EE505 - Microcontrollers", conducted: 40, attended: 38, percentage: 95.0 },
];
