import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl.startsWith('https://')
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

/**
 * Recommended Supabase Database Schema for CyberVidya LMS:
 * 
 * -- Students Table
 * CREATE TABLE students (
 *   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
 *   prn VARCHAR(32) UNIQUE NOT NULL,
 *   roll_no VARCHAR(20) NOT NULL,
 *   full_name VARCHAR(120) NOT NULL,
 *   email VARCHAR(120) UNIQUE NOT NULL,
 *   phone VARCHAR(20),
 *   branch VARCHAR(60),
 *   semester INT DEFAULT 1,
 *   academic_year VARCHAR(20),
 *   created_at TIMESTAMPTZ DEFAULT NOW()
 * );
 * 
 * -- Courses Table
 * CREATE TABLE courses (
 *   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
 *   code VARCHAR(20) UNIQUE NOT NULL,
 *   title VARCHAR(150) NOT NULL,
 *   instructor VARCHAR(100),
 *   branch VARCHAR(60),
 *   semester INT,
 *   credits INT DEFAULT 4,
 *   fee NUMERIC(10, 2) DEFAULT 0.00,
 *   created_at TIMESTAMPTZ DEFAULT NOW()
 * );
 * 
 * -- Fees Structure & Installments
 * CREATE TABLE student_fees (
 *   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
 *   student_id UUID REFERENCES students(id) ON DELETE CASCADE,
 *   total_fee NUMERIC(10, 2) NOT NULL,
 *   scholarship_amount NUMERIC(10, 2) DEFAULT 0.00,
 *   paid_amount NUMERIC(10, 2) DEFAULT 0.00,
 *   outstanding_balance NUMERIC(10, 2) NOT NULL,
 *   academic_year VARCHAR(20) NOT NULL,
 *   updated_at TIMESTAMPTZ DEFAULT NOW()
 * );
 * 
 * -- Payment Transactions
 * CREATE TABLE fee_payments (
 *   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
 *   receipt_number VARCHAR(40) UNIQUE NOT NULL,
 *   student_id UUID REFERENCES students(id),
 *   amount NUMERIC(10, 2) NOT NULL,
 *   payment_method VARCHAR(40) NOT NULL, -- 'Razorpay', 'UPI', 'NetBanking', 'Card', 'Offline Cash', 'Cheque/DD'
 *   transaction_id VARCHAR(80),
 *   payment_status VARCHAR(30) DEFAULT 'Success',
 *   payment_date TIMESTAMPTZ DEFAULT NOW(),
 *   notes TEXT
 * );
 */

// Local persistence helper for demo & offline mode
const STORAGE_PREFIX = 'cybervidya_lms_';

export const localStore = {
  get: (key, defaultValue) => {
    try {
      const item = localStorage.getItem(STORAGE_PREFIX + key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  },
  set: (key, value) => {
    try {
      localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
    } catch (e) {
      console.warn('Storage set error:', e);
    }
  },
};
