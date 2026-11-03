import React, { useState } from 'react';
import { DollarSign, CheckCircle2, ShieldCheck, Plus, X } from 'lucide-react';
import { Modal } from '../common/Modal';
import { FEE_STRUCTURES } from '../../data/mockData';

export const FeeStructureModal = ({ isOpen, onClose, onSave }) => {
  const [structures, setStructures] = useState(FEE_STRUCTURES);

  const handleUpdate = (id, field, value) => {
    setStructures(prev => prev.map(s => {
      if (s.id === id) {
        const updated = { ...s, [field]: Number(value) || 0 };
        updated.totalAnnualFee = 
          (field === 'tuitionFee' ? Number(value) : s.tuitionFee) +
          (field === 'developmentFee' ? Number(value) : s.developmentFee) +
          (field === 'examFee' ? Number(value) : s.examFee) +
          (field === 'labFee' ? Number(value) : s.labFee) +
          (field === 'libraryFee' ? Number(value) : s.libraryFee);
        return updated;
      }
      return s;
    }));
  };

  const handleSaveAll = () => {
    if (onSave) onSave(structures);
    alert('Fee structures updated across Autonomous Academic ERP successfully.');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Configure Program Fee Structures"
      subtitle="Regulated annual fee heads & installment policy"
      maxWidth="max-w-2xl"
    >
      <div className="space-y-5">
        {structures.map((fs) => (
          <div key={fs.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-sm text-slate-900">{fs.program}</h4>
                <p className="text-[11px] text-slate-500">Applicable to: {fs.branches.join(', ')}</p>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 block uppercase font-bold">Total Annual Fee</span>
                <span className="text-base font-black text-slate-900">
                  ₹{fs.totalAnnualFee.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2 border-t border-slate-200 text-xs">
              <div>
                <label className="text-[10px] text-slate-500 block mb-0.5">Tuition</label>
                <input
                  type="number"
                  value={fs.tuitionFee}
                  onChange={(e) => handleUpdate(fs.id, 'tuitionFee', e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded px-2 py-1 text-xs font-semibold"
                />
              </div>

              <div>
                <label className="text-[10px] text-slate-500 block mb-0.5">Development</label>
                <input
                  type="number"
                  value={fs.developmentFee}
                  onChange={(e) => handleUpdate(fs.id, 'developmentFee', e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded px-2 py-1 text-xs font-semibold"
                />
              </div>

              <div>
                <label className="text-[10px] text-slate-500 block mb-0.5">Exam</label>
                <input
                  type="number"
                  value={fs.examFee}
                  onChange={(e) => handleUpdate(fs.id, 'examFee', e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded px-2 py-1 text-xs font-semibold"
                />
              </div>

              <div>
                <label className="text-[10px] text-slate-500 block mb-0.5">Lab/Computing</label>
                <input
                  type="number"
                  value={fs.labFee}
                  onChange={(e) => handleUpdate(fs.id, 'labFee', e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded px-2 py-1 text-xs font-semibold"
                />
              </div>

              <div>
                <label className="text-[10px] text-slate-500 block mb-0.5">Library</label>
                <input
                  type="number"
                  value={fs.libraryFee}
                  onChange={(e) => handleUpdate(fs.id, 'libraryFee', e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded px-2 py-1 text-xs font-semibold"
                />
              </div>
            </div>
          </div>
        ))}

        <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSaveAll}
            className="px-5 py-2 rounded-xl bg-vidya-600 hover:bg-vidya-700 text-white text-xs font-bold shadow-md"
          >
            Save Fee Regulations
          </button>
        </div>
      </div>
    </Modal>
  );
};
