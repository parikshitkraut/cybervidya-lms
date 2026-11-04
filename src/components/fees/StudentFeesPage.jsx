import React, { useState } from 'react';
import { User, ChevronUp, ChevronDown, Eye, FileText, Download, CreditCard, CheckCircle2 } from 'lucide-react';
import { ACADEMIC_YEARS_FEES } from '../../data/mockData';

export const StudentFeesPage = ({ 
  student, 
  paymentHistory, 
  onPayNow, 
  onViewReceipt, 
  onViewInvoice 
}) => {
  // Store expanded state for each academic year (all collapsed by default, exactly matching the screenshot)
  const [expandedYears, setExpandedYears] = useState({
    'year_1': false,
    'year_2': false,
    'year_3': false,
  });

  // Active sub-tab per year: { [yearId]: 'academic' | 'others' | 'transactions' | 'online_history' }
  const [subTabs, setSubTabs] = useState({
    'year_1': 'academic',
    'year_2': 'academic',
    'year_3': 'academic',
  });

  // Modal for clicking Pay Now when dues are already paid
  const [noPendingModal, setNoPendingModal] = useState(null);

  const toggleYear = (yearId) => {
    setExpandedYears(prev => ({
      ...prev,
      [yearId]: !prev[yearId]
    }));
  };

  const setYearSubTab = (yearId, tab) => {
    setSubTabs(prev => ({
      ...prev,
      [yearId]: tab
    }));
  };

  return (
    <div className="space-y-4">
      
      {/* Page Title from Screenshot 1 & 3 */}
      <h2 className="text-[17px] font-bold text-slate-900 tracking-tight">
        Student Fees Details
      </h2>

      {/* Top Student Particulars Card (Exact layout from Screenshot 1 & 3) */}
      <div className="bg-white rounded border border-slate-200 shadow-xs relative overflow-hidden">
        {/* Teal top accent line */}
        <div className="h-[3px] bg-[#00a896] w-full" />

        <div className="p-3.5 sm:p-5 flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
          
          {/* Avatar Silhouette */}
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-slate-200 flex items-center justify-center text-slate-400 shrink-0 ring-1 ring-slate-300">
            <User className="w-8 h-8 sm:w-10 sm:h-10" />
          </div>

          {/* 3-Column Particulars Grid - Mobile responsive with left-right alignment on small screens */}
          <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-1.5 sm:gap-y-2 gap-x-6 text-[12px] text-slate-600">
            
            {/* Column 1 */}
            <div className="space-y-1.5">
              <div className="flex items-baseline justify-between sm:justify-start">
                <span className="w-32 text-slate-500 shrink-0">Name :</span>
                <span className="font-semibold text-slate-800 uppercase truncate text-right sm:text-left" title={student.name}>
                  {student.name}
                </span>
              </div>
              <div className="flex items-baseline justify-between sm:justify-start">
                <span className="w-32 text-slate-500 shrink-0">Branch :</span>
                <span className="text-slate-800 font-medium text-right sm:text-left">{student.branch}</span>
              </div>
              <div className="flex items-baseline justify-between sm:justify-start">
                <span className="w-32 text-slate-500 shrink-0">Academic Batch :</span>
                <span className="text-slate-800 font-medium text-right sm:text-left">{student.academicBatch}</span>
              </div>
              <div className="flex items-baseline justify-between sm:justify-start">
                <span className="w-32 text-slate-500 shrink-0">Academic Year :</span>
                <span className="text-slate-800 font-medium text-right sm:text-left">{student.academicYear}</span>
              </div>
              <div className="flex items-baseline justify-between sm:justify-start">
                <span className="w-32 text-slate-500 shrink-0">Category :</span>
                <span className="text-slate-800 font-medium text-right sm:text-left">{student.category}</span>
              </div>
            </div>

            {/* Column 2 */}
            <div className="space-y-1.5">
              <div className="flex items-baseline justify-between sm:justify-start">
                <span className="w-36 text-slate-500 shrink-0">Registration Number :</span>
                <span className="font-mono text-slate-800 font-medium text-right sm:text-left">{student.registrationNo}</span>
              </div>
              <div className="flex items-baseline justify-between sm:justify-start">
                <span className="w-36 text-slate-500 shrink-0">Year :</span>
                <span className="text-slate-800 font-medium text-right sm:text-left">{student.year}</span>
              </div>
              <div className="flex items-baseline justify-between sm:justify-start">
                <span className="w-36 text-slate-500 shrink-0">Class Section :</span>
                <span className="text-slate-800 font-medium text-right sm:text-left">{student.section}</span>
              </div>
              <div className="flex items-baseline justify-between sm:justify-start">
                <span className="w-36 text-slate-500 shrink-0">Academic Session :</span>
                <span className="text-slate-800 font-medium text-right sm:text-left">{student.academicSession}</span>
              </div>
              <div className="flex items-baseline justify-between sm:justify-start">
                <span className="w-36 text-slate-500 shrink-0">Fee Category Name :</span>
                <span className="text-slate-800 font-medium text-right sm:text-left">{student.feeCategoryName}</span>
              </div>
            </div>

            {/* Column 3 */}
            <div className="space-y-1.5">
              <div className="flex items-baseline justify-between sm:justify-start">
                <span className="w-36 text-slate-500 shrink-0">Degree :</span>
                <span className="text-slate-800 font-medium text-right sm:text-left">{student.degree}</span>
              </div>
              <div className="flex items-baseline justify-between sm:justify-start">
                <span className="w-36 text-slate-500 shrink-0">Semester :</span>
                <span className="text-slate-800 font-medium text-right sm:text-left">{student.semester}</span>
              </div>
              <div className="flex items-baseline justify-between sm:justify-start">
                <span className="w-36 text-slate-500 shrink-0">Roll Number :</span>
                <span className="font-mono text-slate-800 font-bold text-right sm:text-left">{student.rollNo || "36"}</span>
              </div>
              <div className="flex items-baseline justify-between sm:justify-start">
                <span className="w-36 text-slate-500 shrink-0">Admission Category :</span>
                <span className="text-slate-800 font-medium text-right sm:text-left">{student.admissionCategory}</span>
              </div>
              <div className="flex items-baseline justify-between sm:justify-start">
                <span className="w-36 text-slate-500 shrink-0">Enrollment Type :</span>
                <span className="text-slate-800 font-medium text-right sm:text-left">{student.enrollmentType}</span>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* 3 Academic Years Accordion List (Exact match to CyberVidya screenshot) */}
      <div className="space-y-3">
        {ACADEMIC_YEARS_FEES.map((yearData) => {
          const isExpanded = expandedYears[yearData.id];
          const activeSubTab = subTabs[yearData.id] || 'academic';

          // Filter transactions for this academic year
          const yearTransactions = paymentHistory.filter(t => 
            t.academicYear?.includes(yearData.academicYear) || 
            t.description?.includes(yearData.academicYear) ||
            (yearData.id === 'year_3' && !t.academicYear)
          );

          return (
            <div 
              key={yearData.id}
              className="bg-white rounded border border-slate-200 shadow-xs overflow-hidden"
            >
              
              {/* Accordion Bar (Exact clean styling from Screenshot) */}
              <div 
                onClick={() => toggleYear(yearData.id)}
                className="p-3 bg-slate-50 hover:bg-slate-100/80 border-b border-slate-200 flex items-center justify-between cursor-pointer select-none transition-colors"
              >
                <span className="text-[13px] font-bold text-slate-800">
                  {yearData.label}
                </span>

                <button className="text-slate-500 p-0.5">
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>

              {/* Accordion Body */}
              {isExpanded && (
                <div>
                  
                  {/* Sub-tabs Row (Clean tabs with green Pay Now button matching Screenshot 7, mobile swipeable) */}
                  <div className="px-3 sm:px-4 pt-2 border-b border-slate-200 flex items-center justify-between gap-3 bg-white overflow-x-auto scrollbar-none touch-scroll">
                    <div className="flex items-center gap-4 sm:gap-6 shrink-0">
                      <button
                        onClick={() => setYearSubTab(yearData.id, 'academic')}
                        className={`pb-2.5 text-[13px] font-medium transition-all whitespace-nowrap relative ${
                          activeSubTab === 'academic'
                            ? 'text-orange-500 border-b-2 border-orange-500 font-bold'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        Academic
                      </button>
                      <button
                        onClick={() => setYearSubTab(yearData.id, 'others')}
                        className={`pb-2.5 text-[13px] font-medium transition-all whitespace-nowrap relative ${
                          activeSubTab === 'others'
                            ? 'text-orange-500 border-b-2 border-orange-500 font-bold'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        Others
                      </button>
                      <button
                        onClick={() => setYearSubTab(yearData.id, 'transactions')}
                        className={`pb-2.5 text-[13px] font-medium transition-all whitespace-nowrap relative ${
                          activeSubTab === 'transactions'
                            ? 'text-orange-500 border-b-2 border-orange-500 font-bold'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        Transaction History
                      </button>
                      <button
                        onClick={() => setYearSubTab(yearData.id, 'online_history')}
                        className={`pb-2.5 text-[13px] font-medium transition-all whitespace-nowrap relative ${
                          activeSubTab === 'online_history'
                            ? 'text-orange-500 border-b-2 border-orange-500 font-bold'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        Online Payment History
                      </button>
                    </div>

                    {/* Exact Green Pay Now Button from Screenshot 7 */}
                    <div className="pb-2 shrink-0">
                      <button
                        onClick={() => setNoPendingModal(yearData.label)}
                        className="px-3.5 sm:px-4 py-1.5 bg-[#18b82a] hover:bg-[#15a225] text-white text-[12px] font-bold rounded shadow-xs transition-colors cursor-pointer whitespace-nowrap"
                        title="Fees already fully paid"
                      >
                        Pay Now
                      </button>
                    </div>
                  </div>

                  {/* Sub-tab 1: Academic Fees Table (Exact columns and styling from Screenshot 2 & 3) */}
                  {activeSubTab === 'academic' && (
                    <div>
                      {/* Mobile Swipe Hint */}
                      <div className="md:hidden flex items-center justify-between px-3 py-1.5 bg-slate-100/90 border-b border-slate-200 text-[11px] text-slate-600 select-none">
                        <span className="font-medium flex items-center gap-1.5">
                          👉 Swipe table sideways for breakdown
                        </span>
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#18b82a] text-white shrink-0">
                          Outstanding: ₹0.00
                        </span>
                      </div>

                      <div className="overflow-x-auto scrollbar-none touch-scroll">
                        <table className="w-full text-left border-collapse text-[12px] min-w-[640px]">
                        
                        {/* Dark Charcoal Table Header */}
                        <thead>
                          <tr className="bg-[#34373d] text-white text-[11px] font-semibold tracking-wider">
                            <th className="py-2.5 px-3 border-r border-[#42464e] w-12 text-center">S. No.</th>
                            <th className="py-2.5 px-3 border-r border-[#42464e]">Fee Heads</th>
                            <th className="py-2.5 px-3 border-r border-[#42464e] text-right">PYOB</th>
                            <th className="py-2.5 px-3 border-r border-[#42464e] text-right">Current Receivables</th>
                            <th className="py-2.5 px-3 border-r border-[#42464e] text-right">Total Receivables</th>
                            <th className="py-2.5 px-3 border-r border-[#42464e] text-right">Total Collected Amount</th>
                            <th className="py-2.5 px-3 border-r border-[#42464e] text-right">Outstanding</th>
                            <th className="py-2.5 px-3 border-r border-[#42464e] text-center">Status</th>
                            <th className="py-2.5 px-2 text-center w-10"></th>
                          </tr>
                        </thead>

                        {/* Rows */}
                        <tbody className="divide-y divide-slate-100 text-slate-700">
                          {yearData.feeHeads.map((head) => (
                            <tr key={head.id} className="hover:bg-slate-50 transition-colors">
                              <td className="py-2 px-3 text-center border-r border-slate-100">{head.id}</td>
                              <td className="py-2 px-3 border-r border-slate-100 font-medium text-slate-800">{head.name}</td>
                              <td className="py-2 px-3 border-r border-slate-100 text-right">₹ {head.pyob.toFixed(2)}</td>
                              <td className="py-2 px-3 border-r border-slate-100 text-right">₹ {head.currentReceivables.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                              <td className="py-2 px-3 border-r border-slate-100 text-right">₹ {head.totalReceivables.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                              <td className="py-2 px-3 border-r border-slate-100 text-right">₹ {head.totalCollectedAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                              <td className="py-2 px-3 border-r border-slate-100 text-right font-medium">₹ {head.outstanding.toFixed(2)}</td>
                              <td className="py-2 px-3 border-r border-slate-100 text-center">
                                {head.statusType === 'green' ? (
                                  <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-[#18b82a] text-white">
                                    {head.status}
                                  </span>
                                ) : (
                                  <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-[#1d52f6] text-white">
                                    {head.status}
                                  </span>
                                )}
                              </td>
                              <td className="py-2 px-2 text-center">
                                <button 
                                  onClick={() => onViewReceipt(yearTransactions[0] || paymentHistory[0])}
                                  className="text-slate-600 hover:text-blue-600"
                                  title="View official receipt"
                                >
                                  <Eye className="w-3.5 h-3.5 mx-auto" />
                                </button>
                              </td>
                            </tr>
                          ))}

                          {/* (A) Total Row from Screenshot 2 & 3 */}
                          <tr className="bg-slate-50/80 font-bold text-slate-900 border-t border-slate-200">
                            <td className="py-2.5 px-3 text-center border-r border-slate-200">(A)</td>
                            <td className="py-2.5 px-3 border-r border-slate-200">Total</td>
                            <td className="py-2.5 px-3 border-r border-slate-200 text-right">₹ {yearData.totals.totalA.pyob.toFixed(2)}</td>
                            <td className="py-2.5 px-3 border-r border-slate-200 text-right">₹ {yearData.totals.totalA.currentReceivables.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                            <td className="py-2.5 px-3 border-r border-slate-200 text-right">₹ {yearData.totals.totalA.totalReceivables.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                            <td className="py-2.5 px-3 border-r border-slate-200 text-right">₹ {yearData.totals.totalA.totalCollectedAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                            <td className="py-2.5 px-3 border-r border-slate-200 text-right">₹ {yearData.totals.totalA.outstanding.toFixed(2)}</td>
                            <td colSpan="2" className="border-r-0"></td>
                          </tr>

                          {/* (B) Scholarship Amount Row from Screenshot 2 & 3 */}
                          <tr className="bg-white font-bold text-slate-900 border-t border-slate-100">
                            <td className="py-2.5 px-3 text-center border-r border-slate-100">(B)</td>
                            <td className="py-2.5 px-3 border-r border-slate-100 font-semibold text-slate-800">
                              {yearData.totals.scholarshipB.label || "Scholarship Amount"}
                            </td>
                            <td className="py-2.5 px-3 border-r border-slate-100 text-right"></td>
                            <td className="py-2.5 px-3 border-r border-slate-100 text-right"></td>
                            <td className="py-2.5 px-3 border-r border-slate-100 text-right">₹ {yearData.totals.scholarshipB.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                            <td className="py-2.5 px-3 border-r border-slate-100 text-right">₹ {yearData.totals.scholarshipB.collected.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                            <td className="py-2.5 px-3 border-r border-slate-100 text-right">₹ {yearData.totals.scholarshipB.outstanding.toFixed(2)}</td>
                            <td colSpan="2"></td>
                          </tr>

                          {/* (A + B) Grand Total Row from Screenshot 3 (Total fee: ₹125,848.00 / 125k) */}
                          <tr className="bg-[#f0f5ff] font-extrabold text-slate-950 border-t-2 border-slate-300">
                            <td className="py-2.5 px-3 text-center border-r border-slate-200">(A + B)</td>
                            <td className="py-2.5 px-3 border-r border-slate-200 uppercase tracking-wider text-[11px]">Grand Total</td>
                            <td className="py-2.5 px-3 border-r border-slate-200 text-right"></td>
                            <td className="py-2.5 px-3 border-r border-slate-200 text-right"></td>
                            <td className="py-2.5 px-3 border-r border-slate-200 text-right text-blue-800">₹ {yearData.grandTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                            <td className="py-2.5 px-3 border-r border-slate-200 text-right text-emerald-700">₹ {yearData.grandTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                            <td className="py-2.5 px-3 border-r border-slate-200 text-right font-black">₹ 0.00</td>
                            <td colSpan="2"></td>
                          </tr>
                        </tbody>

                      </table>
                    </div>
                  </div>
                )}

                {/* Sub-tab 2: Others Table (Exact match to Screenshot media_1793730832009_917bea16.png) */}
                {activeSubTab === 'others' && (
                  <div>
                    {/* Mobile Swipe Hint */}
                    <div className="md:hidden flex items-center justify-between px-3 py-1.5 bg-slate-100/90 border-b border-slate-200 text-[11px] text-slate-600 select-none">
                      <span className="font-medium flex items-center gap-1.5">
                        👉 Swipe table sideways for exam fee heads
                      </span>
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#18b82a] text-white shrink-0">
                        Paid
                      </span>
                    </div>

                    <div className="overflow-x-auto scrollbar-none touch-scroll">
                      <table className="w-full text-left border-collapse text-[12px] min-w-[640px]">
                        
                        {/* Dark Charcoal Table Header */}
                        <thead>
                          <tr className="bg-[#34373d] text-white text-[11px] font-semibold tracking-wider">
                            <th className="py-2.5 px-3 border-r border-[#42464e] w-12 text-center">S. No.</th>
                            <th className="py-2.5 px-3 border-r border-[#42464e]">Fee Heads</th>
                            <th className="py-2.5 px-3 border-r border-[#42464e] text-right">PYOB</th>
                            <th className="py-2.5 px-3 border-r border-[#42464e] text-right">Current Receivables</th>
                            <th className="py-2.5 px-3 border-r border-[#42464e] text-right">Total Receivables</th>
                            <th className="py-2.5 px-3 border-r border-[#42464e] text-right">Total Collected Amount</th>
                            <th className="py-2.5 px-3 border-r border-[#42464e] text-right">Outstanding</th>
                            <th className="py-2.5 px-3 border-r border-[#42464e] text-center">Status</th>
                            <th className="py-2.5 px-2 text-center w-10"></th>
                          </tr>
                        </thead>

                        {/* Rows matching user screenshot */}
                        <tbody className="divide-y divide-slate-100 text-slate-700">
                          {(yearData.otherFeeHeads || []).map((head) => (
                            <tr key={head.id} className="hover:bg-slate-50 transition-colors">
                              <td className="py-2 px-3 text-center border-r border-slate-100">{head.id}</td>
                              <td className="py-2 px-3 border-r border-slate-100 font-medium text-slate-800">{head.name}</td>
                              <td className="py-2 px-3 border-r border-slate-100 text-right">₹ {head.pyob.toFixed(2)}</td>
                              <td className="py-2 px-3 border-r border-slate-100 text-right">₹ {head.currentReceivables.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                              <td className="py-2 px-3 border-r border-slate-100 text-right">₹ {head.totalReceivables.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                              <td className="py-2 px-3 border-r border-slate-100 text-right">₹ {head.totalCollectedAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                              <td className="py-2 px-3 border-r border-slate-100 text-right font-medium">₹ {head.outstanding.toFixed(2)}</td>
                              <td className="py-2 px-3 border-r border-slate-100 text-center">
                                {head.statusType === 'green' ? (
                                  <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-[#18b82a] text-white">
                                    {head.status}
                                  </span>
                                ) : (
                                  <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-[#1d52f6] text-white">
                                    {head.status}
                                  </span>
                                )}
                              </td>
                              <td className="py-2 px-2 text-center">
                                <button 
                                  onClick={() => onViewReceipt({
                                    id: `other_${yearData.id}_${head.id}`,
                                    receiptNumber: `REC-JITN-${yearData.academicYear.slice(0,4)}-${7000 + head.id}`,
                                    transactionId: `TXN_EXAM_${yearData.id}_0${head.id}`,
                                    date: `${yearData.academicYear.slice(0,4)}-09-15`,
                                    time: "10:30 AM",
                                    amount: head.totalCollectedAmount,
                                    description: `${head.name} (${yearData.label})`,
                                    paymentMethod: "Online PG (Razorpay / UPI)",
                                    status: "Success",
                                    bankReference: `AXIS-${982100 + head.id}`,
                                    invoiceNumber: `INV-${yearData.academicYear.slice(0,4)}-EX0${head.id}`,
                                    payerName: student.name,
                                  })}
                                  className="text-slate-600 hover:text-blue-600"
                                  title="View official receipt"
                                >
                                  <Eye className="w-3.5 h-3.5 mx-auto" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>

                      </table>
                    </div>
                  </div>
                )}

                {/* Sub-tab 3: Transaction History */}
                {activeSubTab === 'transactions' && (
                  <div className="p-3 sm:p-4 space-y-3">
                    <div className="overflow-x-auto scrollbar-none touch-scroll">
                      <table className="w-full text-left text-[12px] min-w-[580px]">
                          <thead className="bg-[#34373d] text-white text-[11px]">
                            <tr>
                              <th className="py-2 px-3">Receipt No</th>
                              <th className="py-2 px-3">Date</th>
                              <th className="py-2 px-3">Transaction ID</th>
                              <th className="py-2 px-3">Description</th>
                              <th className="py-2 px-3">Method</th>
                              <th className="py-2 px-3 text-right">Student Paid Amount</th>
                              <th className="py-2 px-3 text-center">Receipt</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                            {yearTransactions.length > 0 ? (
                              yearTransactions.map((txn) => (
                                <tr key={txn.id} className="hover:bg-slate-50">
                                  <td className="py-2.5 px-3 font-mono font-bold text-blue-700">{txn.receiptNumber}</td>
                                  <td className="py-2.5 px-3 text-slate-600">{txn.date}</td>
                                  <td className="py-2.5 px-3 font-mono text-slate-500">{txn.transactionId}</td>
                                  <td className="py-2.5 px-3 text-slate-800">{txn.description}</td>
                                  <td className="py-2.5 px-3 text-slate-600">{txn.paymentMethod}</td>
                                  <td className="py-2.5 px-3 text-right font-bold text-slate-900">
                                    ₹ {txn.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                                  </td>
                                  <td className="py-2.5 px-3 text-center">
                                    <button
                                      onClick={() => onViewReceipt(txn)}
                                      className="px-2.5 py-1 rounded text-[11px] font-semibold bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200"
                                    >
                                      Download
                                    </button>
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td colSpan="7" className="py-4 text-center text-slate-400">
                                  No transactions logged for this session.
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* Sub-tab 4: Online Payment History */}
                  {activeSubTab === 'online_history' && (
                    <div className="p-3 sm:p-4 space-y-3">
                      <div className="overflow-x-auto scrollbar-none touch-scroll">
                        <table className="w-full text-left text-[12px] min-w-[500px]">
                          <thead className="bg-[#34373d] text-white text-[11px]">
                            <tr>
                              <th className="py-2 px-3">Gateway Ref</th>
                              <th className="py-2 px-3">Payment Mode</th>
                              <th className="py-2 px-3">Date</th>
                              <th className="py-2 px-3 text-right">Amount</th>
                              <th className="py-2 px-3 text-center">Status</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                            {yearTransactions.map((txn) => (
                              <tr key={txn.id} className="hover:bg-slate-50">
                                <td className="py-2.5 px-3 font-mono text-slate-700">{txn.bankReference || 'RZP_ORDER_981'}</td>
                                <td className="py-2.5 px-3 text-slate-700">{txn.paymentMethod}</td>
                                <td className="py-2.5 px-3 text-slate-600">{txn.date}</td>
                                <td className="py-2.5 px-3 text-right font-bold text-emerald-600">
                                  ₹ {txn.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                                </td>
                                <td className="py-2.5 px-3 text-center">
                                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#18b82a] text-white">
                                    {txn.status}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                </div>
              )}

            </div>
          );
        })}
      </div>

      {/* No Pending Dues Modal when user clicks Pay Now */}
      {noPendingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-sm bg-white rounded-lg shadow-2xl p-6 border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center gap-2.5 mb-2 text-emerald-600">
              <CheckCircle2 className="w-6 h-6 shrink-0" />
              <h3 className="text-base font-bold text-slate-900">Fee Dues Fully Settled</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed mt-2">
              All academic and examination dues for academic session <strong className="text-slate-800">{noPendingModal}</strong> have been completely settled.
            </p>
            <div className="mt-3 p-3 bg-emerald-50 border border-emerald-200 rounded text-xs text-emerald-800 flex justify-between font-medium">
              <span>Current Outstanding:</span>
              <span className="font-bold text-emerald-700">₹ 0.00</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-2">
              No pending balance exists for this period. Download or view verified receipts under the <strong>Transaction History</strong> sub-tab.
            </p>
            <div className="mt-5 flex justify-end">
              <button
                onClick={() => setNoPendingModal(null)}
                className="px-4 py-1.5 bg-[#18b82a] hover:bg-[#15a225] text-white text-xs font-bold rounded shadow-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
