import React, { useState } from 'react';
import { User, Eye, EyeOff, RefreshCw, KeyRound, CheckCircle2, ShieldCheck, HelpCircle } from 'lucide-react';
import jitLogo from '../../assets/jit-logo.png';
import cyberLogo from '../../assets/cybervidya-logo.png';
import campusBg from '../../assets/jitn-campus-bg.png';
import { INSTITUTION } from '../../data/mockData';

export const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('UGF24EE041');
  const [password, setPassword] = useState('jitn@2026');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotInput, setForgotInput] = useState('');
  const [forgotSubmitted, setForgotSubmitted] = useState(false);
  const [roleSelection, setRoleSelection] = useState('student'); // 'student' | 'admin'

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      // If username has 'admin' or roleSelection is admin
      const isAdm = username.toLowerCase().includes('admin') || roleSelection === 'admin';
      onLogin({
        role: isAdm ? 'admin' : 'student',
        username: username,
      });
    }, 600);
  };

  const handleQuickStudent = () => {
    setUsername('UGF24EE041');
    setPassword('jitn@2026');
    setRoleSelection('student');
  };

  const handleQuickAdmin = () => {
    setUsername('ADMIN_FINANCE');
    setPassword('admin@jitn');
    setRoleSelection('admin');
  };

  return (
    <div 
      className="min-h-screen w-full relative flex items-center justify-center p-4 bg-slate-900 bg-cover bg-center select-none"
      style={{
        backgroundImage: `url(${campusBg})`,
      }}
    >
      {/* Subtle overlay so the white card pops authentically */}
      <div className="absolute inset-0 bg-black/5 pointer-events-none" />

      {/* Main Login Card - Exactly replicating the screenshot */}
      <div className="relative z-10 w-full max-w-[370px] bg-white rounded-md shadow-2xl p-7 border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header with Two Logos */}
        <div className="flex items-center justify-center gap-4 mb-6">
          {/* Left: JIT Logo */}
          <div className="flex items-center justify-center">
            <img 
              src={jitLogo} 
              alt="JIT - Jhulelal Institute of Technology" 
              className="h-16 object-contain"
            />
          </div>

          {/* Thin Vertical Divider */}
          <div className="h-12 w-[1px] bg-slate-200/90" />

          {/* Right: CyberVidya Logo */}
          <div className="flex items-center justify-center">
            <img 
              src={cyberLogo} 
              alt="CYBER विद्या" 
              className="h-12 object-contain"
            />
          </div>
        </div>

        {/* Heading: Sign In */}
        <h2 className="text-[22px] font-bold text-slate-900 text-left mb-5">
          Sign In
        </h2>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* User Name Row */}
          <div>
            <div className="flex items-center gap-2">
              <label className="w-24 text-[13px] font-medium text-slate-800 text-left shrink-0">
                User Name
              </label>
              <div className="relative flex-1">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  placeholder="e.g. UGF24EE041"
                  className="w-full bg-[#eef4ff] hover:bg-[#e6efff] focus:bg-white border border-[#c7d8fe] focus:border-blue-500 rounded px-3 py-1.5 text-[13px] font-mono text-slate-900 placeholder-slate-400 focus:outline-none transition-colors pr-8"
                />
                <User className="w-4 h-4 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Password Row */}
          <div>
            <div className="flex items-center gap-2">
              <label className="w-24 text-[13px] font-medium text-slate-800 text-left shrink-0">
                Password
              </label>
              <div className="relative flex-1">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full bg-[#eef4ff] hover:bg-[#e6efff] focus:bg-white border border-[#c7d8fe] focus:border-blue-500 rounded px-3 py-1.5 text-[13px] text-slate-900 placeholder-slate-400 focus:outline-none transition-colors pr-8"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="p-1 text-slate-400 hover:text-slate-600 absolute right-2 top-1/2 -translate-y-1/2"
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>

          {/* Forgot Password Link */}
          <div className="text-right">
            <button
              type="button"
              onClick={() => {
                setShowForgotModal(true);
                setForgotSubmitted(false);
              }}
              className="text-[11px] text-slate-700 hover:text-blue-600 transition-colors"
            >
              Forgot Password?
            </button>
          </div>

          {/* Login Button - Exact Bright Green from Screenshot */}
          <div className="pt-1 flex justify-center">
            <button
              type="submit"
              disabled={isLoading}
              className="w-28 py-1.5 px-4 bg-[#18b82a] hover:bg-[#15a225] active:bg-[#128a20] text-white text-[13px] font-bold rounded shadow-sm hover:shadow transition-all flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  <span>Entering...</span>
                </>
              ) : (
                <span>Login</span>
              )}
            </button>
          </div>

        </form>

        {/* Quick Demo Helper Tabs */}
        <div className="mt-6 pt-4 border-t border-slate-100 text-center">
          <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold mb-2">
            One-Click Demo Portals
          </p>
          <div className="flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={handleQuickStudent}
              className={`px-2.5 py-1 text-[11px] font-semibold rounded border transition-all ${
                roleSelection === 'student'
                  ? 'bg-blue-50 text-blue-700 border-blue-200'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
              }`}
            >
              Student Portal
            </button>
            <button
              type="button"
              onClick={handleQuickAdmin}
              className={`px-2.5 py-1 text-[11px] font-semibold rounded border transition-all ${
                roleSelection === 'admin'
                  ? 'bg-purple-50 text-purple-700 border-purple-200'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
              }`}
            >
              Admin ERP
            </button>
          </div>
        </div>

      </div>

      {/* Floating Bottom Right Refresh / Security Badge (from screenshot) */}
      <div className="absolute bottom-4 right-4 z-20">
        <div 
          onClick={() => {
            handleQuickStudent();
            alert("CyberVidya Session Refreshed: JITN Autonomous Gateway Active.");
          }}
          className="w-10 h-10 rounded-full bg-white text-blue-600 shadow-lg border border-slate-200 flex items-center justify-center cursor-pointer hover:bg-slate-50 hover:scale-105 transition-all"
          title="CyberVidya Autonomous Security Token"
        >
          <RefreshCw className="w-5 h-5" />
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="w-full max-w-sm bg-white rounded-xl shadow-2xl p-6 border border-slate-200 animate-in fade-in zoom-in-95">
            <h3 className="text-base font-bold text-slate-900">Reset Portal Password</h3>
            <p className="text-xs text-slate-500 mt-1">
              Enter your student PRN (e.g. <code className="font-mono text-blue-600">UGF24EE041</code>) or parent registered mobile number.
            </p>

            {!forgotSubmitted ? (
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  setForgotSubmitted(true);
                }} 
                className="mt-4 space-y-3"
              >
                <input
                  type="text"
                  value={forgotInput}
                  onChange={(e) => setForgotInput(e.target.value)}
                  placeholder="PRN or Mobile Number"
                  required
                  className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-blue-500"
                />
                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowForgotModal(false)}
                    className="px-3 py-1.5 rounded text-xs text-slate-600 hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded bg-[#18b82a] hover:bg-[#15a225] text-white text-xs font-bold"
                  >
                    Send OTP
                  </button>
                </div>
              </form>
            ) : (
              <div className="mt-4 py-3 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <p className="text-xs font-bold text-slate-800">Password Reset OTP Sent!</p>
                <p className="text-[11px] text-slate-500">
                  A verification code has been dispatched to your university-registered mobile phone.
                </p>
                <button
                  type="button"
                  onClick={() => setShowForgotModal(false)}
                  className="mt-2 px-4 py-1.5 rounded bg-blue-600 text-white text-xs font-semibold"
                >
                  Back to Sign In
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
