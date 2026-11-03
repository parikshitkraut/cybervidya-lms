import React, { useState } from 'react';
import { Award, Plus, CheckCircle2, ShieldCheck, Users } from 'lucide-react';
import { Modal } from '../common/Modal';
import { SCHOLARSHIPS_LIST } from '../../data/mockData';

export const ScholarshipModal = ({ isOpen, onClose }) => {
  const [scholarships, setScholarships] = useState(SCHOLARSHIPS_LIST);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Scholarships & Tuition Fee Waivers"
      subtitle="Government welfare schemes & institutional merit grants"
      maxWidth="max-w-2xl"
    >
      <div className="space-y-4">
        {scholarships.map((s) => (
          <div key={s.id} className="p-4 rounded-xl border border-slate-200 bg-white hover:border-vidya-300 transition-all space-y-2">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-vidya-50 text-vidya-700 border border-vidya-200">
                  {s.category}
                </span>
                <h4 className="font-bold text-sm text-slate-900 mt-1">{s.name}</h4>
                <p className="text-xs text-slate-500 mt-0.5">{s.criteria}</p>
              </div>

              <div className="text-right">
                <span className="text-xs text-slate-400 block font-semibold">Waiver Grant</span>
                <span className="text-base font-black text-emerald-600">
                  ₹{s.amount.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-slate-400" />
                <span>{s.activeBeneficiaries} Active Students Awarded</span>
              </span>
              <span className="text-emerald-700 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>DTE & Directorate Approved</span>
              </span>
            </div>
          </div>
        ))}

        <div className="pt-3 border-t border-slate-100 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};
