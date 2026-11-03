import React, { useState } from 'react';
import { 
  CreditCard, 
  ShieldCheck, 
  QrCode, 
  Building2, 
  Lock, 
  CheckCircle2, 
  Copy, 
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
  defaultAmount = 14348.00,
  onPaymentComplete 
}) => {
  const [amount, setAmount] = useState(defaultAmount || 14348.00);
  const [selectedMethod, setSelectedMethod] = useState('razorpay');
  const [isProcessing, setIsProcessing] = useState(false);
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [razorpayKeyInput, setRazorpayKeyInput] = useState(getRazorpayKey());

  const handleCopyUpi = () => {
    navigator.clipboard.writeText('jitn.cybervidya@axisbank');
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const executePayment = async () => {
    if (Number(amount) <= 0) {
      alert('Please enter a valid payment amount.');
      return;
    }

    setIsProcessing(true);

    try {
      const scriptLoaded = await loadRazorpayScript();

      if (scriptLoaded && window.Razorpay && razorpayKeyInput && !razorpayKeyInput.includes('DemoKey')) {
        const options = {
          key: razorpayKeyInput,
          amount: Math.round(Number(amount) * 100),
          currency: 'INR',
          name: INSTITUTION.name,
          description: `Fees Payment - ${student.name} (${student.registrationNo})`,
          prefill: {
            name: student.name,
            email: student.email,
            contact: student.phone.replace(/[^0-9]/g, ''),
          },
          theme: {
            color: '#18b82a',
          },
          handler: function (response) {
            handleSuccessPayload({
              transactionId: response.razorpay_payment_id || generateMockTransactionId('PAY_RZP'),
              paymentMethod: 'Razorpay PG',
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
        rzp.open();
        return;
      }

      // Safe Demo Simulation
      setTimeout(() => {
        handleSuccessPayload({
          transactionId: generateMockTransactionId('PAY_RZP'),
          paymentMethod: selectedMethod === 'upi_qr' ? 'UPI Dynamic QR' : 'Razorpay Gateway (UPI/NetBanking)',
          gatewayRef: 'AXIS_' + Date.now().toString().slice(-8),
        });
      }, 1000);

    } catch (e) {
      console.error(e);
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
      amount: Number(amount),
      description: `Session ${INSTITUTION.academicYear} - Development & Institutional Fees`,
      paymentMethod: gatewayDetails.paymentMethod,
      status: 'Success',
      bankReference: gatewayDetails.gatewayRef,
      invoiceNumber: `INV-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
      payerName: student.name,
      payerEmail: student.email,
    };

    onPaymentComplete(newPaymentRecord);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={isProcessing ? () => {} : onClose}
      title="Online Fees Payment"
      subtitle={`${INSTITUTION.name} • PRN: ${student.registrationNo}`}
      maxWidth="max-w-lg"
    >
      <div className="space-y-4">
        
        {/* Student & Fee Summary */}
        <div className="p-3.5 bg-slate-50 rounded border border-slate-200 text-xs space-y-1">
          <div className="flex justify-between">
            <span className="text-slate-500">Student Name:</span>
            <strong className="text-slate-900 font-semibold">{student.name}</strong>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Registration Number:</span>
            <span className="font-mono text-slate-800">{student.registrationNo}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Branch & Semester:</span>
            <span className="text-slate-800">{student.branch} • Sem {student.semester} ({student.academicYear})</span>
          </div>
        </div>

        {/* Amount */}
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">
            Payment Amount (₹)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full bg-white border border-slate-300 rounded px-3 py-2 text-sm font-bold text-slate-900 focus:outline-none focus:border-green-600 font-mono"
          />
        </div>

        {/* Mode selector */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-700 block mb-1">
            Choose Payment Method
          </label>
          
          <label className={`flex items-start gap-3 p-3 rounded border cursor-pointer transition-all ${
            selectedMethod === 'razorpay' ? 'border-green-600 bg-green-50/30' : 'border-slate-200'
          }`}>
            <input
              type="radio"
              name="method"
              checked={selectedMethod === 'razorpay'}
              onChange={() => setSelectedMethod('razorpay')}
              className="mt-0.5 text-green-600"
            />
            <div className="text-xs">
              <span className="font-bold text-slate-900 block">Razorpay Standard (UPI / Cards / NetBanking)</span>
              <p className="text-slate-500 text-[11px]">Instant receipt generation via Google Pay, PhonePe, Paytm, or Net Banking.</p>
            </div>
          </label>

          <label className={`flex items-start gap-3 p-3 rounded border cursor-pointer transition-all ${
            selectedMethod === 'upi_qr' ? 'border-green-600 bg-green-50/30' : 'border-slate-200'
          }`}>
            <input
              type="radio"
              name="method"
              checked={selectedMethod === 'upi_qr'}
              onChange={() => setSelectedMethod('upi_qr')}
              className="mt-0.5 text-green-600"
            />
            <div className="text-xs flex-1">
              <span className="font-bold text-slate-900 flex items-center gap-1.5">
                <QrCode className="w-3.5 h-3.5" />
                <span>Instant Dynamic UPI QR Code</span>
              </span>
              <p className="text-slate-500 text-[11px]">Scan directly using your mobile UPI App.</p>
              
              {selectedMethod === 'upi_qr' && (
                <div className="mt-2 p-2 bg-white rounded border border-slate-200 flex items-center gap-3">
                  <div className="w-16 h-16 bg-slate-900 rounded p-1 flex items-center justify-center shrink-0">
                    <QrCode className="w-14 h-14 text-white" />
                  </div>
                  <div className="text-[11px] text-slate-600">
                    <p className="font-mono text-slate-800">jitn.cybervidya@axisbank</p>
                    <button 
                      type="button" 
                      onClick={handleCopyUpi} 
                      className="text-blue-600 hover:underline mt-0.5"
                    >
                      {copiedUpi ? 'Copied!' : 'Copy UPI ID'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </label>
        </div>

        {/* Action Button - Exact Green #18b82a from screenshot */}
        <div className="pt-2">
          <button
            type="button"
            disabled={isProcessing || Number(amount) <= 0}
            onClick={executePayment}
            className="w-full py-2.5 px-4 bg-[#18b82a] hover:bg-[#15a225] disabled:bg-slate-400 text-white font-bold text-xs uppercase tracking-wider rounded shadow-xs flex items-center justify-center gap-2 transition-all"
          >
            {isProcessing ? (
              <>
                <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                <span>Processing Payment...</span>
              </>
            ) : (
              <>
                <Lock className="w-4 h-4" />
                <span>Pay ₹ {Number(amount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
              </>
            )}
          </button>
        </div>

        <p className="text-[10px] text-slate-400 text-center">
          Payment is 256-bit SSL encrypted. No card PIN or credentials are stored.
        </p>

      </div>
    </Modal>
  );
};
