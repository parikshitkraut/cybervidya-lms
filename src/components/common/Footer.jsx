import React from 'react';
import cyberLogo from '../../assets/cybervidya-logo.png';
import { RefreshCw } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-200 py-3 px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500 select-none relative z-10 mb-14 md:mb-0">
      
      {/* Left: Copyright from screenshots */}
      <div className="text-center sm:text-left">
        Copyright ©2026. All rights reserved.
      </div>

      {/* Center: CyberVidya Logo from screenshots */}
      <div className="flex items-center justify-center">
        <img 
          src={cyberLogo} 
          alt="CYBERविद्या" 
          className="h-4 sm:h-5 object-contain opacity-85 hover:opacity-100 transition-opacity"
        />
      </div>

      {/* Right: BETA status */}
      <div className="font-bold tracking-wider text-slate-400 uppercase text-[10px]">
        BETA
      </div>

      {/* Floating Refresh Token Badge from screenshots - position elevated on phone to avoid bottom bar */}
      <div className="fixed bottom-16 md:bottom-4 right-3 md:right-4 z-30">
        <div 
          onClick={() => alert("CyberVidya Gateway Token: Active & Synchronized with JITN Autonomous ERP.")}
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white text-blue-600 shadow-lg border border-slate-200 flex items-center justify-center cursor-pointer hover:bg-slate-50 active:scale-95 transition-all"
          title="CyberVidya Session Status: Active"
        >
          <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5" />
        </div>
      </div>

    </footer>
  );
};
