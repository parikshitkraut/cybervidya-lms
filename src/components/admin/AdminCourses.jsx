import React, { useState } from 'react';
import { Layers, Plus, BookOpen, Edit, Trash2, IndianRupee, User } from 'lucide-react';
import { Modal } from '../common/Modal';

export const AdminCourses = ({ courses, onAddCourse }) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCode, setNewCode] = useState('');
  const [newInstructor, setNewInstructor] = useState('');
  const [newFee, setNewFee] = useState('30000');
  const [newCredits, setNewCredits] = useState('4');

  const handleCreateCourse = (e) => {
    e.preventDefault();
    if (!newTitle || !newCode) return;

    onAddCourse({
      id: 'course_' + Date.now(),
      code: newCode.toUpperCase(),
      title: newTitle,
      branch: 'Computer Science & Engineering',
      semester: 6,
      credits: Number(newCredits) || 4,
      instructor: newInstructor || 'Dr. Faculty Member',
      instructorRole: 'Professor',
      instructorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      thumbnail: 'https://images.unsplash.com/photo-1516116211227-bbc13c72b8d0?auto=format&fit=crop&w=600&q=80',
      progress: 0,
      totalModules: 4,
      completedModules: 0,
      totalLectures: 24,
      completedLectures: 0,
      fee: Number(newFee) || 30000,
      description: 'Comprehensive academic course curriculum designed for engineering excellence.',
      modules: [],
      materials: []
    });

    setIsAddModalOpen(false);
    setNewTitle('');
    setNewCode('');
    setNewInstructor('');
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Academic Courses & Fee Allocations</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Define course syllabus, assign faculty chairs, and configure individual course tuition fees.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-vidya-600 to-indigo-600 hover:from-vidya-700 hover:to-indigo-700 text-white text-xs font-bold shadow-md shadow-vidya-600/20 flex items-center gap-1.5 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Academic Course</span>
        </button>
      </div>

      {/* Courses List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((c) => (
          <div key={c.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between">
            <div className="p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-800">
                  {c.code}
                </span>
                <span className="text-xs font-black text-slate-900 flex items-center">
                  <IndianRupee className="w-3.5 h-3.5" />
                  <span>{c.fee?.toLocaleString('en-IN') || '30,000'}</span>
                </span>
              </div>

              <h3 className="font-bold text-sm text-slate-900 line-clamp-1">{c.title}</h3>
              <p className="text-xs text-slate-500 line-clamp-2">{c.description}</p>

              <div className="pt-2 flex items-center gap-2 text-xs text-slate-600">
                <User className="w-3.5 h-3.5 text-slate-400" />
                <span>{c.instructor}</span>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>{c.credits} Credits • Sem {c.semester}</span>
              <span className="text-[11px] font-semibold text-cyber-600">Active Curriculum</span>
            </div>
          </div>
        ))}
      </div>

      {/* Add Course Modal */}
      {isAddModalOpen && (
        <Modal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          title="Create New Academic Course"
          subtitle="Add subject to department syllabus and set tuition fee"
          maxWidth="max-w-md"
        >
          <form onSubmit={handleCreateCourse} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Course Title</label>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g. Distributed Consensus Systems"
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Course Code</label>
                <input
                  type="text"
                  value={newCode}
                  onChange={(e) => setNewCode(e.target.value)}
                  placeholder="CS606"
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Tuition Fee (₹)</label>
                <input
                  type="number"
                  value={newFee}
                  onChange={(e) => setNewFee(e.target.value)}
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Lead Instructor / Professor</label>
              <input
                type="text"
                value={newInstructor}
                onChange={(e) => setNewInstructor(e.target.value)}
                placeholder="e.g. Dr. Rajesh Verma"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none"
              />
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-vidya-600 hover:bg-vidya-700 text-white text-xs font-bold shadow-md"
              >
                Create Course
              </button>
            </div>
          </form>
        </Modal>
      )}

    </div>
  );
};
