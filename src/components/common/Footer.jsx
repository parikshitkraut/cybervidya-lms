import React from 'react';
import cyberLogo from '../../assets/cybervidya-logo.png';
import { RefreshCw } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-200 py-3 px-6 flex items-center justify-between text-[11px] text-slate-500 select-none relative z-10">
      
      {/* Left: Copyright from screenshots */}
      <div>
        Copyright ©2026. All rights reserved.
      </div>

      {/* Center: CyberVidya Logo from screenshots */}
      <div className="flex items-center justify-center">
        <img 
          src={cyberLogo} 
          alt="CYBERविद्या" 
          className="h-5 object-contain opacity-80 hover:opacity-100 transition-opacity"
        />
      </div>

      {/* Right: BETA status */}
      <div className="font-bold tracking-wider text-slate-400 uppercase text-[10px]">
        BETA
      </div>

      {/* Floating Refresh Token Badge from screenshots */}
      <div className="fixed bottom-4 right-4 z-40">
        <div 
          onClick={() => alert("CyberVidya Gateway Token: Active & Synchronized with JITN Autonomous ERP.")}
          className="w-10 h-10 rounded-full bg-white text-blue-600 shadow-lg border border-slate-200 flex items-center justify-center cursor-pointer hover:bg-slate-50 hover:scale-105 transition-all"
          title="CyberVidya Session Status: Active"
        >
          <RefreshCw className="w-5 h-5" />
        </div>
      </div>

    </footer>
  );
};
