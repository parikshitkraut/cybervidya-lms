import React, { useState } from 'react';
import { BellRing, Calendar, ShieldAlert, Pin, ArrowRight, Share2, Tag } from 'lucide-react';
import { INSTITUTION } from '../../data/mockData';

export const AnnouncementsView = ({ announcements }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Accounts & Examination', 'Scholarship Cell', 'Technical Events'];

  const filtered = announcements.filter((a) => {
    if (selectedCategory === 'All') return true;
    return a.category === selectedCategory;
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Institutional Circulars & Notices</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Official communications from Academic, Examination, and Accounts Directorate.
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5 bg-slate-100 p-1 rounded-xl">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Notices Feed */}
      <div className="space-y-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            className={`p-6 rounded-2xl border transition-all ${
              item.urgent
                ? 'bg-gradient-to-r from-red-50/40 via-amber-50/20 to-white border-red-200/90 shadow-sm'
                : 'bg-white border-slate-200/90 shadow-sm'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                {item.urgent && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-red-100 text-red-800 border border-red-300 flex items-center gap-1">
                    <ShieldAlert className="w-3 h-3" />
                    <span>Urgent Action</span>
                  </span>
                )}
                <span className="text-[11px] font-semibold text-cyber-700 bg-cyber-50 px-2.5 py-0.5 rounded-full border border-cyber-200">
                  {item.category}
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Calendar className="w-3.5 h-3.5" />
                <span>{item.date}</span>
                <span>•</span>
                <span className="font-medium text-slate-600">{item.author}</span>
              </div>
            </div>

            <h3 className="text-base font-bold text-slate-900 mt-3 leading-snug">
              {item.title}
            </h3>

            <p className="text-xs text-slate-600 mt-2 leading-relaxed whitespace-pre-line">
              {item.content}
            </p>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
              <span className="font-mono text-[11px]">{INSTITUTION.shortName} Autonomous Notification</span>
              <span className="text-slate-500 font-medium">Notice Ref: NOTIF-2026-{item.id}</span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
