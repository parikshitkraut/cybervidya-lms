/**
 * Razorpay Integration Module for CyberVidya LMS
 * 
 * Complies with RBI, NPCI, and PCI-DSS data security standards:
 * - Never collects, logs, or stores card CVV, PIN, or full PAN numbers.
 * - All sensitive transactions route through Razorpay's PCI-DSS Level 1 compliant checkout.
 * - Server-side webhook / signature verification architecture.
 */

export const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export const getRazorpayKey = () => {
  return import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_CyberVidyaDemoKey';
};

/**
 * Backend Verification Guide:
 * 
 * In a production backend (Node.js/Express, Next.js API, or Supabase Edge Functions):
 * 
 * const crypto = require('crypto');
 * function verifyRazorpaySignature({ razorpay_order_id, razorpay_payment_id, razorpay_signature }) {
 *   const generated_signature = crypto
 *     .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
 *     .update(razorpay_order_id + '|' + razorpay_payment_id)
 *     .digest('hex');
 *   return generated_signature === razorpay_signature;
 * }
 */

export const generateMockTransactionId = (prefix = 'TXN') => {
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(100000 + Math.random() * 900000);
  return `${prefix}_${timestamp}${random}`;
};

export const generateReceiptNumber = () => {
  const year = new Date().getFullYear();
  const num = Math.floor(1000 + Math.random() * 9000);
  return `REC-JITN-${year}-${num}`;
};
