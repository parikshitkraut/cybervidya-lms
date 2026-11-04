import React, { useState } from 'react';
import { User, Eye, EyeOff, RefreshCw, KeyRound, CheckCircle2, ShieldCheck, AlertCircle } from 'lucide-react';
import jitLogo from '../../assets/jit-logo.png';
import cyberLogo from '../../assets/cybervidya-logo.png';
import campusBg from '../../assets/jitn-campus-bg.png';
import { INSTITUTION } from '../../data/mockData';

export const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('ugf24ee036');
  const [password, setPassword] = useState('parikshit');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotInput, setForgotInput] = useState('');
  const [forgotSubmitted, setForgotSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const cleanUser = username.trim().toLowerCase();

      // Strict validation: ID must be ugf24ee036 (or ugf24ee041 from screenshot) and password must be parikshit
      if ((cleanUser === 'ugf24ee036' || cleanUser === 'ugf24ee041') && password === 'parikshit') {
        onLogin({
          role: 'student',
          username: username.trim().toUpperCase(),
        });
      } else {
        // If incorrect, DO NOT open the dashboard!
        setErrorMessage('Invalid User Name or Password. Access denied.');
      }
    }, 400);
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

      {/* Main Login Card - Exactly replicating the screenshot with phone responsiveness */}
      <div className="relative z-10 w-[92%] sm:w-full max-w-[370px] bg-white rounded-lg sm:rounded-md shadow-2xl p-5 sm:p-7 border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header with Two Logos */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 mb-5 sm:mb-6">
          {/* Left: JIT Logo */}
          <div className="flex items-center justify-center">
            <img 
              src={jitLogo} 
              alt="JIT - Jhulelal Institute of Technology" 
              className="h-14 sm:h-16 object-contain"
            />
          </div>

          {/* Thin Vertical Divider */}
          <div className="h-10 sm:h-12 w-[1px] bg-slate-200/90" />

          {/* Right: CyberVidya Logo */}
          <div className="flex items-center justify-center">
            <img 
              src={cyberLogo} 
              alt="CYBER विद्या" 
              className="h-10 sm:h-12 object-contain"
            />
          </div>
        </div>

        {/* Heading: Sign In */}
        <h2 className="text-xl sm:text-[22px] font-bold text-slate-900 text-left mb-4 sm:mb-5">
          Sign In
        </h2>

        {/* Error Alert if credentials incorrect */}
        {errorMessage && (
          <div className="mb-4 p-2.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded flex items-center gap-2 animate-in fade-in">
            <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
            <span className="font-medium">{errorMessage}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4">
          
          {/* User Name Row */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
              <label className="w-full sm:w-24 text-xs sm:text-[13px] font-medium text-slate-800 text-left shrink-0">
                User Name
              </label>
              <div className="relative flex-1">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    if (errorMessage) setErrorMessage('');
                  }}
                  required
                  placeholder="ugf24ee036"
                  className="w-full bg-[#eef4ff] hover:bg-[#e6efff] focus:bg-white border border-[#c7d8fe] focus:border-blue-500 rounded px-3 py-2 sm:py-1.5 text-base sm:text-[13px] font-mono text-slate-900 placeholder-slate-400 focus:outline-none transition-colors pr-8"
                />
                <User className="w-4 h-4 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Password Row */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
              <label className="w-full sm:w-24 text-xs sm:text-[13px] font-medium text-slate-800 text-left shrink-0">
                Password
              </label>
              <div className="relative flex-1">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errorMessage) setErrorMessage('');
                  }}
                  required
                  placeholder="parikshit"
                  className="w-full bg-[#eef4ff] hover:bg-[#e6efff] focus:bg-white border border-[#c7d8fe] focus:border-blue-500 rounded px-3 py-2 sm:py-1.5 text-base sm:text-[13px] text-slate-900 placeholder-slate-400 focus:outline-none transition-colors pr-8"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="p-1.5 sm:p-1 text-slate-400 hover:text-slate-600 absolute right-2 top-1/2 -translate-y-1/2"
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4 sm:w-3.5 sm:h-3.5" /> : <Eye className="w-4 h-4 sm:w-3.5 sm:h-3.5" />}
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
              className="text-xs sm:text-[11px] text-slate-700 hover:text-blue-600 transition-colors py-1"
            >
              Forgot Password?
            </button>
          </div>

          {/* Login Button - Exact Bright Green from Screenshot */}
          <div className="pt-1 flex justify-center">
            <button
              type="submit"
              disabled={isLoading}
              className="w-32 sm:w-28 py-2.5 sm:py-1.5 px-4 bg-[#18b82a] hover:bg-[#15a225] active:bg-[#128a20] text-white text-sm sm:text-[13px] font-bold rounded shadow-sm hover:shadow transition-all flex items-center justify-center gap-2"
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

      </div>

      {/* Floating Bottom Right Refresh / Security Badge (from screenshot) */}
      <div className="absolute bottom-4 right-4 z-20">
        <div 
          onClick={() => {
            alert("CyberVidya Gateway Active: JITN Autonomous Authentication Server.");
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
