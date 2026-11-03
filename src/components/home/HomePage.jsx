import React from 'react';
import { Calendar, FileText, Download, ExternalLink } from 'lucide-react';
import { NOTICE_BOARD } from '../../data/mockData';

export const HomePage = ({ onNavigateToFees }) => {
  return (
    <div className="space-y-4">
      
      {/* Page Title from Screenshot 1 */}
      <div>
        <h2 className="text-[18px] font-bold text-slate-900 tracking-tight">
          Home
        </h2>
        <h3 className="text-[14px] font-semibold text-slate-700 mt-2">
          Notice Board
        </h3>
      </div>

      {/* Notices Feed - Exact layout from Screenshot 1 */}
      <div className="space-y-4 max-w-4xl">
        {NOTICE_BOARD.map((item) => (
          <div 
            key={item.id}
            className="bg-white rounded border border-slate-200 shadow-xs p-5 relative overflow-hidden space-y-3"
          >
            {/* Top row: Avatar + Title + Time */}
            <div className="flex items-start justify-between gap-4">
              
              <div className="flex items-start gap-4">
                {/* Circular Author Avatar (e.g. IDS, CC, JIT) from Screenshot 1 */}
                <div className="w-12 h-12 rounded-full bg-[#34373d] text-white flex items-center justify-center font-bold text-sm shrink-0 tracking-wider">
                  {item.authorInitials}
                </div>

                <div className="space-y-1">
                  <h4 className="text-[14px] font-bold text-slate-900 leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-[12px] text-slate-600">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Timestamp e.g. "📅 5 days ago" */}
              <div className="flex items-center gap-1.5 text-[11px] text-slate-500 shrink-0">
                <Calendar className="w-3.5 h-3.5" />
                <span>{item.timeAgo}</span>
              </div>

            </div>

            {/* Document / PDF Grid from Screenshot 1 */}
            {item.hasThumbnail && (
              <div className="pl-16 pt-1">
                <div className="w-16 h-20 bg-slate-100 rounded border border-slate-300 p-1 shadow-xs hover:border-blue-400 cursor-pointer transition-colors flex flex-col items-center justify-center">
                  <FileText className="w-8 h-8 text-slate-400" />
                  <span className="text-[9px] text-slate-500 font-semibold mt-1">Circular</span>
                </div>
              </div>
            )}

            {/* Red PDF Icons Row from Screenshot 1 */}
            {item.pdfCount && (
              <div className="pl-16 pt-1">
                <div className="flex items-center gap-2 flex-wrap">
                  {Array.from({ length: item.pdfCount }).map((_, pIdx) => (
                    <button
                      key={pIdx}
                      onClick={() => alert(`Downloading Supplementary Result Circular Part ${pIdx + 1}.pdf`)}
                      className="w-8 h-10 bg-[#e53935] hover:bg-[#d32f2f] text-white rounded text-[10px] font-bold flex items-center justify-center shadow-xs transition-colors shrink-0"
                      title={`Download Document Part ${pIdx + 1}`}
                    >
                      PDF
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Footer with Author from Screenshot 1 */}
            <div className="pt-2 border-t border-slate-100 text-right">
              <span className="text-[11px] text-slate-500">
                Posted By : <strong className="font-semibold text-slate-700">{item.authorName}</strong>
              </span>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
