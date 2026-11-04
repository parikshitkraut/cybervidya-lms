import React, { useState } from 'react';
import { User, Eye, EyeOff, RefreshCw, KeyRound, CheckCircle2, ShieldCheck, AlertCircle } from 'lucide-react';
import jitLogo from '../../assets/jit-logo.png';
import cyberLogo from '../../assets/cybervidya-logo.png';
import campusBg from '../../assets/jitn-campus-bg.png';
import { INSTITUTION } from '../../data/mockData';

export const LoginPage = ({ onLogin }) => {
  // Empty by default - user must enter credentials manually
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorTimestamp, setErrorTimestamp] = useState('');
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotInput, setForgotInput] = useState('');
  const [forgotSubmitted, setForgotSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setShowErrorModal(false);
    setIsLoading(true);

    // Fast, authentic handshake verifying student credentials
    setTimeout(() => {
      setIsLoading(false);
      const cleanUser = username.trim().toLowerCase();
      const cleanPass = password.trim();

      // Student credentials specified:
      // ID: ugf24ee036
      // Password: parikshit02
      const isCorrectUser = !cleanUser || cleanUser === 'ugf24ee036' || cleanUser === 'parikshit' || cleanUser.includes('parikshit');
      const isCorrectPass = cleanPass === 'parikshit02';

      if (isCorrectUser && isCorrectPass) {
        if (onLogin) onLogin({ username: username.trim() || 'UGF24EE036' });
      } else if (cleanPass === 'parikshit02') {
        // Also allow if the password is correct
        if (onLogin) onLogin({ username: username.trim() || 'UGF24EE036' });
      } else {
        setErrorMessage('Invalid User Name or Password. Please check your credentials and try again.');
      }
    }, 600);
  };

  return (
    <div className="min-h-screen w-full relative flex items-center justify-center p-4 sm:p-6 bg-slate-950 select-none overflow-hidden">
      
      {/* 
        Authentic JIT Campus Architecture Backdrop:
        Cleanly inpainted campus building backdrop matching the official portal.
      */}
      <div 
        className="absolute inset-0 bg-cover bg-center pointer-events-none"
        style={{
          backgroundImage: `url(${campusBg})`,
        }}
      />
      <div className="absolute inset-0 bg-black/15 pointer-events-none" />

      {/* Main Login Card - Premium, sharp, centered and perfectly responsive on mobile */}
      <div className="relative z-10 w-full max-w-[360px] bg-white rounded-xl shadow-[0_15px_40px_rgba(0,0,0,0.35)] p-5 sm:p-7 border border-slate-200/80 animate-in fade-in zoom-in-95 duration-200">
        
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
          <div className="h-10 sm:h-12 w-[1px] bg-slate-200" />

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
        <h2 className="text-xl sm:text-[22px] font-bold text-slate-900 text-left mb-4 sm:mb-5 tracking-tight">
          Sign In
        </h2>

        {/* Server Error Alert Banner */}
        {errorMessage && (
          <div className="mb-4 p-3 bg-red-50 border border-red-300 text-red-800 text-xs rounded-lg flex items-start gap-2.5 animate-in fade-in shadow-xs">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            <div className="flex-1 text-left">
              <div className="font-bold text-red-900 text-[12px] mb-0.5 flex items-center justify-between">
                <span>500 - Internal Server Error</span>
                <span className="font-mono text-[9px] bg-red-100 text-red-800 px-1.5 py-0.2 rounded font-normal">HTTP 500</span>
              </div>
              <div className="text-[11px] text-red-700 leading-relaxed">{errorMessage}</div>
              <div className="text-[10px] text-red-500 font-mono mt-1 pt-1 border-t border-red-200/80">
                Host: auth-node-02.jitn.cybervidya.net • Ref: ERR_DB_TIMEOUT_500
              </div>
            </div>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
          {/* Hidden fields to deflect aggressive Chrome mobile autofill */}
          <input type="text" name="prevent_autofill_user" className="hidden" tabIndex="-1" autoComplete="off" />
          <input type="password" name="prevent_autofill_pwd" className="hidden" tabIndex="-1" autoComplete="off" />
          
          {/* User Name Row */}
          <div>
            <div className="flex flex-col gap-1">
              <label className="text-xs sm:text-[13px] font-medium text-slate-800 text-left">
                User Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="cv_auth_uid"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    if (errorMessage) setErrorMessage('');
                  }}
                  required
                  autoComplete="off"
                  data-lpignore="true"
                  placeholder="Enter User Name"
                  className="w-full bg-[#eef4ff] hover:bg-[#e6efff] focus:bg-white border border-[#c7d8fe] focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-lg px-3 py-2.5 text-[15px] sm:text-[13px] font-mono text-slate-900 placeholder-slate-400 focus:outline-none transition-all pr-9"
                />
                <User className="w-4 h-4 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Password Row */}
          <div>
            <div className="flex flex-col gap-1">
              <label className="text-xs sm:text-[13px] font-medium text-slate-800 text-left">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="cv_auth_key"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errorMessage) setErrorMessage('');
                  }}
                  required
                  autoComplete="new-password"
                  data-lpignore="true"
                  placeholder="Enter Password"
                  className="w-full bg-[#eef4ff] hover:bg-[#e6efff] focus:bg-white border border-[#c7d8fe] focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-lg px-3 py-2.5 text-[15px] sm:text-[13px] text-slate-900 placeholder-slate-400 focus:outline-none transition-all pr-9"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="p-1.5 text-slate-400 hover:text-slate-600 absolute right-2 top-1/2 -translate-y-1/2"
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          {/* Forgot Password Link */}
          <div className="text-right pt-0.5">
            <button
              type="button"
              onClick={() => {
                setShowForgotModal(true);
                setForgotSubmitted(false);
              }}
              className="text-xs sm:text-[11px] text-slate-600 hover:text-blue-600 font-medium transition-colors py-1 cursor-pointer"
            >
              Forgot Password?
            </button>
          </div>

          {/* Login Button - Exact Bright Green from Screenshot */}
          <div className="pt-1 flex justify-center">
            <button
              type="submit"
              disabled={isLoading}
              className="w-36 py-2.5 sm:py-2 px-5 bg-[#18b82a] hover:bg-[#15a225] active:bg-[#128a20] text-white text-sm sm:text-[13px] font-bold rounded-lg shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-80"
            >
              {isLoading ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  <span>Connecting...</span>
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
            alert("CyberVidya Gateway: JITN Autonomous Authentication Server (auth.jitn.cybervidya.net)");
          }}
          className="w-10 h-10 rounded-full bg-white text-blue-600 shadow-lg border border-slate-200 flex items-center justify-center cursor-pointer hover:bg-slate-50 hover:scale-105 transition-all"
          title="CyberVidya Autonomous Security Token"
        >
          <RefreshCw className="w-5 h-5" />
        </div>
      </div>

      {/* 500 Internal Server Error Modal Dialog (Realistic CyberVidya ERP System Error) */}
      {showErrorModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden border border-slate-200 animate-in zoom-in-95 duration-200 text-left">
            
            {/* Modal Red Error Header */}
            <div className="bg-red-600 text-white px-5 py-3.5 flex items-center gap-2.5">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <div>
                <h3 className="text-sm font-bold tracking-tight">500 - Internal Server Error</h3>
                <p className="text-[10px] text-red-100 font-mono">CyberVidya ERP Gateway Exception</p>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-5 space-y-3 text-xs text-slate-700">
              <div className="p-3 bg-slate-50 rounded border border-slate-200 space-y-1.5 font-mono text-[11px]">
                <div className="flex justify-between">
                  <span className="text-slate-500">Service:</span>
                  <span className="font-bold text-slate-800">auth-node-02.jitn.cybervidya.net</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Error Code:</span>
                  <span className="font-bold text-red-600">ERR_AUTH_SVC_TIMEOUT_500</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Timestamp:</span>
                  <span className="text-slate-600">{errorTimestamp || "2026-11-04 18:58:30 IST"}</span>
                </div>
              </div>

              <p className="text-slate-600 leading-relaxed text-[12px]">
                The server encountered an unexpected error while attempting to establish a secure database session for your account. The university ERP cluster is currently experiencing heavy load or undergoing scheduled database maintenance.
              </p>

              <div className="p-2.5 bg-amber-50 border border-amber-200 rounded text-amber-800 text-[11px] leading-relaxed">
                <strong>Action Required:</strong> Please verify your network connection or contact the <strong>Jhulelal Institute of Technology IT Helpdesk</strong> (it-support@jitnagpur.edu.in) if the problem persists.
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-5 py-3 bg-slate-50 border-t border-slate-200 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowErrorModal(false)}
                className="px-4 py-1.5 bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold rounded shadow-xs cursor-pointer transition-colors"
              >
                Close & Try Again
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="w-full max-w-sm bg-white rounded-xl shadow-2xl p-6 border border-slate-200 animate-in fade-in zoom-in-95 text-left">
            <h3 className="text-base font-bold text-slate-900">Reset Portal Password</h3>
            <p className="text-xs text-slate-500 mt-1">
              Enter your student PRN (e.g. <code className="font-mono text-blue-600">UGF24EE036</code>) or registered mobile number.
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
                  className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-blue-500 font-mono"
                />
                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowForgotModal(false)}
                    className="px-3 py-1.5 rounded text-xs text-slate-600 hover:bg-slate-100 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded bg-[#18b82a] hover:bg-[#15a225] text-white text-xs font-bold cursor-pointer"
                  >
                    Send OTP
                  </button>
                </div>
              </form>
            ) : (
              <div className="mt-4 py-3 text-center space-y-2">
                <AlertCircle className="w-8 h-8 text-red-600 mx-auto" />
                <p className="text-xs font-bold text-red-800">SMS Gateway Timeout (500)</p>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Unable to communicate with university SMS gateway service. OTP dispatch failed. Please contact the college examination branch directly.
                </p>
                <button
                  type="button"
                  onClick={() => setShowForgotModal(false)}
                  className="mt-2 px-4 py-1.5 rounded bg-slate-800 text-white text-xs font-semibold cursor-pointer"
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
