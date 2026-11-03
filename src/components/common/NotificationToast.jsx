import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const NotificationToast = ({ notification, onClose }) => {
  if (!notification) return null;

  const { type = 'success', title, message } = notification;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />,
    info: <Info className="w-5 h-5 text-cyber-600 shrink-0" />,
  };

  const borders = {
    success: 'border-emerald-200 bg-emerald-50/90 text-emerald-950',
    error: 'border-red-200 bg-red-50/90 text-red-950',
    info: 'border-cyber-200 bg-cyber-50/90 text-cyber-950',
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 max-w-md w-full animate-in fade-in slide-in-from-bottom-5 duration-200">
      <div className={`p-4 rounded-xl shadow-xl border flex items-start gap-3 backdrop-blur-md ${borders[type]}`}>
        {icons[type]}
        <div className="flex-1">
          {title && <h4 className="text-xs font-bold leading-tight">{title}</h4>}
          <p className="text-xs mt-0.5 leading-relaxed opacity-90">{message}</p>
        </div>
        <button 
          onClick={onClose}
          className="text-slate-400 hover:text-slate-700 p-1"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
