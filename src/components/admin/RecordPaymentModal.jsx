import React, { useState } from 'react';
import { CreditCard, Building2, FileCheck, CheckCircle2, User } from 'lucide-react';
import { Modal } from '../common/Modal';
import { INSTITUTION } from '../../data/mockData';
import { generateReceiptNumber } from '../../lib/razorpay';

export const RecordPaymentModal = ({ isOpen, onClose, students, onPaymentRecorded }) => {
  const [selectedStudentId, setSelectedStudentId] = useState(students[0]?.id || 'std_001');
  const [amount, setAmount] = useState('40000');
  const [paymentMode, setPaymentMode] = useState('Offline Cash'); // 'Offline Cash' | 'Cheque' | 'Demand Draft (DD)' | 'NEFT / RTGS Bank Transfer'
  const [referenceNumber, setReferenceNumber] = useState('');
  const [bankName, setBankName] = useState('State Bank of India');
  const [term, setTerm] = useState('Term 3 (Even Semester Final)');
  const [remarks, setRemarks] = useState('Counter payment cleared at Accounts Window');

  const selectedStudent = students.find(s => s.id === selectedStudentId) || students[0];

  const handleSubmit = (e) => {
    e.preventDefault();
    const numAmount = Number(amount);
    if (!numAmount || numAmount <= 0) {
      alert('Please enter a valid amount.');
      return;
    }

    const receiptNum = generateReceiptNumber();
    const txnId = referenceNumber || `OFFLINE_${Date.now().toString().slice(-8)}`;

    const newPayment = {
      id: 'pay_' + Date.now(),
      receiptNumber: receiptNum,
      transactionId: txnId,
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      amount: numAmount,
      description: `${term} - ${selectedStudent.branch} (PRN: ${selectedStudent.prn})`,
      paymentMethod: paymentMode + (referenceNumber ? ` [Ref: ${referenceNumber}]` : ''),
      status: 'Success',
      bankReference: referenceNumber ? `${bankName} - ${referenceNumber}` : 'ACCOUNTS_CASH_COUNTER',
      invoiceNumber: `INV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      payerName: selectedStudent.name,
      payerEmail: selectedStudent.email,
    };

    onPaymentRecorded(selectedStudentId, newPayment, numAmount);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Record Offline Fee Payment"
      subtitle="Manual Reconciliation & Cash Counter Challan Entry"
      maxWidth="max-w-xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Student Selector */}
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">
            Select Student (PRN / Roll No)
          </label>
          <select
            value={selectedStudentId}
            onChange={(e) => setSelectedStudentId(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-vidya-500/20"
          >
            {students.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} ({s.prn}) - {s.branch} • Outstanding: ₹{s.outstanding.toLocaleString('en-IN')}
              </option>
            ))}
          </select>
        </div>

        {/* Amount & Term Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Amount Received (₹)
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-vidya-500/20"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Installment Term
            </label>
            <select
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-vidya-500/20"
            >
              <option value="Term 1 (Academic Initiation)">Term 1 (Admission)</option>
              <option value="Term 2 (Mid-Year Progress)">Term 2 (Mid-Year)</option>
              <option value="Term 3 (Even Semester Final)">Term 3 (Final)</option>
              <option value="Full Academic Fee Clearance">Full Year Clearance</option>
            </select>
          </div>
        </div>

        {/* Payment Mode */}
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">
            Offline Payment Mode
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {['Offline Cash', 'Cheque', 'Demand Draft (DD)', 'NEFT / RTGS Bank Transfer'].map((mode) => (
              <button
                type="button"
                key={mode}
                onClick={() => setPaymentMode(mode)}
                className={`p-2 rounded-xl border text-[11px] font-semibold text-center transition-all ${
                  paymentMode === mode
                    ? 'border-vidya-600 bg-vidya-50 text-vidya-900 shadow-sm'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>

        {/* Reference Number & Bank (if not cash) */}
        {paymentMode !== 'Offline Cash' && (
          <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
            <div>
              <label className="text-[11px] font-bold text-slate-700 block mb-1">
                Cheque / DD / UTR Ref No
              </label>
              <input
                type="text"
                value={referenceNumber}
                onChange={(e) => setReferenceNumber(e.target.value)}
                placeholder="e.g. CHQ-928410 or UTR..."
                required
                className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-700 block mb-1">
                Drawee Bank Name
              </label>
              <input
                type="text"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                placeholder="e.g. State Bank of India"
                className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 focus:outline-none"
              />
            </div>
          </div>
        )}

        {/* Remarks */}
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">
            Accounts Notes / Remarks
          </label>
          <input
            type="text"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none"
          />
        </div>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-vidya-600 to-indigo-600 hover:from-vidya-700 hover:to-indigo-700 text-white text-xs font-bold shadow-md shadow-vidya-600/20 flex items-center gap-1.5"
          >
            <FileCheck className="w-4 h-4" />
            <span>Generate Official Receipt</span>
          </button>
        </div>

      </form>
    </Modal>
  );
};
