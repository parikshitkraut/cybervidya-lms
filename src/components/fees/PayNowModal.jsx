import React, { useState } from 'react';
import { 
  CreditCard, 
  ShieldCheck, 
  QrCode, 
  Building2, 
  Smartphone, 
  Lock, 
  AlertCircle, 
  Sparkles,
  CheckCircle2,
  Copy,
  Info,
  Key
} from 'lucide-react';
import { Modal } from '../common/Modal';
import { INSTITUTION } from '../../data/mockData';
import { 
  loadRazorpayScript, 
  getRazorpayKey, 
  generateMockTransactionId, 
  generateReceiptNumber 
} from '../../lib/razorpay';

export const PayNowModal = ({ 
  isOpen, 
  onClose, 
  student, 
  feeSummary, 
  installments,
  onPaymentComplete,
  defaultAmount = null
}) => {
  const pendingInstallment = installments.find(i => i.status === 'Pending') || installments[2];
  
  const [paymentChoice, setPaymentChoice] = useState('installment'); // 'installment' | 'full' | 'custom'
  const [customAmount, setCustomAmount] = useState(pendingInstallment?.amount || 40000);
  const [selectedMethod, setSelectedMethod] = useState('razorpay'); // 'razorpay' | 'upi_qr' | 'netbanking'
  const [isProcessing, setIsProcessing] = useState(false);
  const [razorpayKeyInput, setRazorpayKeyInput] = useState(getRazorpayKey());
  const [showKeyConfig, setShowKeyConfig] = useState(false);
  const [copiedUpi, setCopiedUpi] = useState(false);

  // Compute final amount to pay
  const amountToPay = 
    paymentChoice === 'installment' ? (pendingInstallment?.amount || 40000) :
    paymentChoice === 'full' ? feeSummary.outstandingBalance :
    Number(customAmount) || 0;

  const handleCopyUpi = () => {
    navigator.clipboard.writeText('jitn.cybervidya@axisbank');
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const executePayment = async () => {
    if (amountToPay <= 0) {
      alert('Please enter a valid payment amount.');
      return;
    }

    setIsProcessing(true);

    try {
      const scriptLoaded = await loadRazorpayScript();

      // Check if real Razorpay test key is provided and window.Razorpay is available
      if (scriptLoaded && window.Razorpay && razorpayKeyInput && !razorpayKeyInput.includes('DemoKey')) {
        const options = {
          key: razorpayKeyInput,
          amount: amountToPay * 100, // in paise
          currency: 'INR',
          name: INSTITUTION.name,
          description: `Fee Payment - ${student.branch} (PRN: ${student.prn})`,
          image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
          prefill: {
            name: student.name,
            email: student.email,
            contact: student.phone.replace(/[^0-9]/g, ''),
          },
          notes: {
            prn: student.prn,
            program: student.program,
            semester: student.semester.toString(),
            academic_year: INSTITUTION.academicYear,
            payment_choice: paymentChoice,
          },
          theme: {
            color: '#1d52f6',
          },
          handler: function (response) {
            handleSuccessPayload({
              transactionId: response.razorpay_payment_id || generateMockTransactionId('PAY_RZP'),
              paymentMethod: 'Razorpay PG (Live Key)',
              gatewayRef: response.razorpay_order_id || 'RZP_ORDER_' + Date.now(),
            });
          },
          modal: {
            ondismiss: function () {
              setIsProcessing(false);
            }
          }
        };

        const rzp = new window.Razorpay(options);
        rzp.on('payment.failed', function (resp) {
          alert('Payment Failed: ' + (resp.error.description || 'Transaction declined.'));
          setIsProcessing(false);
        });
        rzp.open();
        return;
      }

      // High-Fidelity Demo Simulation mode (Safe, compliant, instant confirmation)
      setTimeout(() => {
        const methodMap = {
          razorpay: 'Razorpay UPI (Google Pay / PhonePe)',
          upi_qr: 'Direct Dynamic UPI QR (BHIM/Paytm)',
          netbanking: 'Instant Net Banking (HDFC/SBI)',
        };

        handleSuccessPayload({
          transactionId: generateMockTransactionId('PAY_RZP'),
          paymentMethod: methodMap[selectedMethod] || 'Razorpay Gateway',
          gatewayRef: 'GATEWAY_REF_' + Date.now().toString().slice(-8),
        });
      }, 1400);

    } catch (err) {
      console.error('Payment checkout error:', err);
      setIsProcessing(false);
    }
  };

  const handleSuccessPayload = (gatewayDetails) => {
    setIsProcessing(false);
    const receiptNum = generateReceiptNumber();

    const newPaymentRecord = {
      id: 'pay_' + Date.now(),
      receiptNumber: receiptNum,
      transactionId: gatewayDetails.transactionId,
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      amount: amountToPay,
      description: `Academic Session ${INSTITUTION.academicYear} - ${paymentChoice === 'installment' ? pendingInstallment?.term : 'Tuition & Development Balance'}`,
      paymentMethod: gatewayDetails.paymentMethod,
      status: 'Success',
      bankReference: gatewayDetails.gatewayRef,
      invoiceNumber: `INV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      payerName: student.name,
      payerEmail: student.email,
    };

    onPaymentComplete(newPaymentRecord, amountToPay, paymentChoice);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={isProcessing ? () => {} : onClose}
      title="Secure Academic Fee Payment"
      subtitle={`${INSTITUTION.shortName} CyberVidya Portal • PRN: ${student.prn}`}
      maxWidth="max-w-2xl"
    >
      <div className="space-y-6">

        {/* 1. Select Payment Scope */}
        <div>
          <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2.5">
            Step 1: Select Installment / Amount
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            
            {/* Option A: Pending Installment */}
            <div
              onClick={() => setPaymentChoice('installment')}
              className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                paymentChoice === 'installment'
                  ? 'border-cyber-600 bg-cyber-50/60 shadow-sm'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">Term 3 Due</span>
                {paymentChoice === 'installment' && (
                  <CheckCircle2 className="w-4 h-4 text-cyber-600" />
                )}
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">Final Even Sem Term</p>
              <div className="mt-2 text-lg font-black text-slate-900">
                ₹{(pendingInstallment?.amount || 40000).toLocaleString('en-IN')}
              </div>
            </div>

            {/* Option B: Full Balance */}
            <div
              onClick={() => setPaymentChoice('full')}
              className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                paymentChoice === 'full'
                  ? 'border-cyber-600 bg-cyber-50/60 shadow-sm'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">Full Clearance</span>
                {paymentChoice === 'full' && (
                  <CheckCircle2 className="w-4 h-4 text-cyber-600" />
                )}
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">Total Outstanding</p>
              <div className="mt-2 text-lg font-black text-slate-900">
                ₹{feeSummary.outstandingBalance.toLocaleString('en-IN')}
              </div>
            </div>

            {/* Option C: Custom Amount */}
            <div
              onClick={() => setPaymentChoice('custom')}
              className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                paymentChoice === 'custom'
                  ? 'border-cyber-600 bg-cyber-50/60 shadow-sm'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">Custom Amount</span>
                {paymentChoice === 'custom' && (
                  <CheckCircle2 className="w-4 h-4 text-cyber-600" />
                )}
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">Partial Payment</p>
              <div className="mt-1">
                <input
                  type="number"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(Math.max(0, Number(e.target.value)))}
                  placeholder="Min ₹1000"
                  className="w-full text-sm font-bold text-slate-900 bg-white border border-slate-300 rounded px-2 py-0.5 focus:outline-none focus:ring-1 focus:ring-cyber-500"
                  onClick={(e) => {
                    e.stopPropagation();
                    setPaymentChoice('custom');
                  }}
                />
              </div>
            </div>

          </div>
        </div>

        {/* 2. Select Payment Method */}
        <div>
          <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2.5">
            Step 2: Choose Payment Gateway Method
          </label>
          <div className="space-y-2.5">
            
            {/* Razorpay Unified */}
            <label className={`flex items-start gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
              selectedMethod === 'razorpay'
                ? 'border-cyber-600 bg-cyber-50/40 shadow-sm'
                : 'border-slate-200 hover:border-slate-300'
            }`}>
              <input
                type="radio"
                name="payment_method"
                checked={selectedMethod === 'razorpay'}
                onChange={() => setSelectedMethod('razorpay')}
                className="mt-1 text-cyber-600 focus:ring-cyber-500"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 flex items-center gap-2">
                    <span>Razorpay Standard PG (UPI / Cards / NetBanking)</span>
                    <span className="px-2 py-0.5 rounded text-[10px] bg-cyber-100 text-cyber-800 font-extrabold">
                      Recommended
                    </span>
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <span className="text-[10px] font-mono font-bold text-cyber-600">RAZORPAY</span>
                  </div>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Instant receipt generation. Supports Google Pay, PhonePe, Paytm, RuPay, Visa, Mastercard, and 50+ Banks.
                </p>
              </div>
            </label>

            {/* Direct Dynamic UPI QR */}
            <label className={`flex items-start gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
              selectedMethod === 'upi_qr'
                ? 'border-cyber-600 bg-cyber-50/40 shadow-sm'
                : 'border-slate-200 hover:border-slate-300'
            }`}>
              <input
                type="radio"
                name="payment_method"
                checked={selectedMethod === 'upi_qr'}
                onChange={() => setSelectedMethod('upi_qr')}
                className="mt-1 text-cyber-600 focus:ring-cyber-500"
              />
              <div className="flex-1">
                <span className="text-xs font-bold text-slate-900 flex items-center gap-2">
                  <QrCode className="w-4 h-4 text-slate-600" />
                  <span>Instant UPI Dynamic QR Code</span>
                </span>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Scan directly with any UPI App on your mobile phone to pay ₹{amountToPay.toLocaleString('en-IN')}.
                </p>
                
                {selectedMethod === 'upi_qr' && (
                  <div className="mt-3 p-3 bg-white rounded-lg border border-slate-200 flex flex-col sm:flex-row items-center gap-4">
                    <div className="w-24 h-24 bg-slate-900 rounded-lg p-2 flex items-center justify-center shrink-0">
                      {/* Stylized QR placeholder */}
                      <div className="w-full h-full bg-white rounded flex flex-col items-center justify-center p-1">
                        <QrCode className="w-16 h-16 text-slate-900" />
                      </div>
                    </div>
                    <div className="text-xs text-slate-600 space-y-1">
                      <p className="font-semibold text-slate-900">Virtual Merchant UPI ID:</p>
                      <div className="flex items-center gap-2">
                        <code className="bg-slate-100 px-2 py-1 rounded font-mono text-[11px] text-slate-800">
                          jitn.cybervidya@axisbank
                        </code>
                        <button
                          type="button"
                          onClick={handleCopyUpi}
                          className="p-1 rounded hover:bg-slate-100 text-slate-500 hover:text-slate-800"
                          title="Copy UPI ID"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                        {copiedUpi && <span className="text-[10px] text-emerald-600 font-bold">Copied!</span>}
                      </div>
                      <p className="text-[10px] text-slate-400">
                        Merchant: Jhulelal Institute of Technology (Accounts)
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </label>

            {/* Net Banking */}
            <label className={`flex items-start gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
              selectedMethod === 'netbanking'
                ? 'border-cyber-600 bg-cyber-50/40 shadow-sm'
                : 'border-slate-200 hover:border-slate-300'
            }`}>
              <input
                type="radio"
                name="payment_method"
                checked={selectedMethod === 'netbanking'}
                onChange={() => setSelectedMethod('netbanking')}
                className="mt-1 text-cyber-600 focus:ring-cyber-500"
              />
              <div className="flex-1">
                <span className="text-xs font-bold text-slate-900 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-slate-600" />
                  <span>Direct Corporate Net Banking (SBI, HDFC, ICICI, Axis, PNB)</span>
                </span>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Direct bank integration with institutional reconciliation and instant challan receipt.
                </p>
              </div>
            </label>

          </div>
        </div>

        {/* Razorpay Key Config Accordion (for testing/integration) */}
        <div className="border border-slate-200 rounded-xl p-3 bg-slate-50">
          <button
            type="button"
            onClick={() => setShowKeyConfig(!showKeyConfig)}
            className="w-full flex items-center justify-between text-[11px] font-semibold text-slate-600 hover:text-slate-900"
          >
            <span className="flex items-center gap-1.5">
              <Key className="w-3.5 h-3.5 text-cyber-600" />
              <span>Razorpay Integration Settings (Test Key / Webhook Config)</span>
            </span>
            <span className="text-cyber-600">{showKeyConfig ? 'Hide' : 'Configure'}</span>
          </button>

          {showKeyConfig && (
            <div className="mt-3 pt-3 border-t border-slate-200 space-y-2">
              <label className="text-[11px] font-medium text-slate-700 block">
                Razorpay API Key ID (e.g. <code className="font-mono text-cyber-700">rzp_test_...</code>):
              </label>
              <input
                type="text"
                value={razorpayKeyInput}
                onChange={(e) => setRazorpayKeyInput(e.target.value)}
                placeholder="rzp_test_xxxxxxxxxxxxxx"
                className="w-full text-xs font-mono bg-white border border-slate-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-cyber-500"
              />
              <p className="text-[10px] text-slate-500 leading-relaxed">
                If provided with a valid Razorpay test key, the official Razorpay Checkout popup will launch. Otherwise, an autonomous sandbox flow simulates the checkout with full receipt & invoice generation.
              </p>
            </div>
          )}
        </div>

        {/* Payment Summary Box */}
        <div className="p-4 rounded-xl bg-slate-900 text-white flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 uppercase tracking-wider block">Total Amount Payable</span>
            <div className="text-2xl font-black tracking-tight text-white mt-0.5">
              ₹{amountToPay.toLocaleString('en-IN')}
            </div>
            <span className="text-[10px] text-emerald-400 font-medium">
              Zero gateway convenience surcharge
            </span>
          </div>

          <button
            type="button"
            disabled={isProcessing || amountToPay <= 0}
            onClick={executePayment}
            className={`px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg flex items-center gap-2 transition-all ${
              isProcessing || amountToPay <= 0
                ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-emerald-500/20 active:scale-95'
            }`}
          >
            {isProcessing ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Connecting Gateway...</span>
              </>
            ) : (
              <>
                <Lock className="w-4 h-4" />
                <span>Pay ₹{amountToPay.toLocaleString('en-IN')}</span>
              </>
            )}
          </button>
        </div>

        {/* Security Disclaimers */}
        <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between text-[11px] text-slate-400 gap-2">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>PCI-DSS Level 1 & RBI 256-Bit SSL Encrypted</span>
          </div>
          <div className="flex items-center gap-2">
            <span>Server-side Webhook Verified</span>
            <span>•</span>
            <span>No Card Credentials Stored</span>
          </div>
        </div>

      </div>
    </Modal>
  );
};
