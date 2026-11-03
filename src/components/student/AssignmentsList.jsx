import React, { useState } from 'react';
import { 
  FileText, 
  Upload, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  ExternalLink, 
  FileCode,
  Award,
  Calendar,
  X
} from 'lucide-react';
import { Modal } from '../common/Modal';

export const AssignmentsList = ({ assignments, onSubmitAssignment }) => {
  const [filter, setFilter] = useState('All');
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [submissionLink, setSubmissionLink] = useState('');
  const [fileName, setFileName] = useState('');

  const filtered = assignments.filter((a) => {
    if (filter === 'All') return true;
    return a.status === filter;
  });

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleConfirmSubmit = (e) => {
    e.preventDefault();
    if (!submissionLink && !fileName) {
      alert('Please provide a file attachment or repository/report link.');
      return;
    }

    onSubmitAssignment(selectedAssignment.id, {
      file: fileName || submissionLink,
      submittedAt: new Date().toISOString().split('T')[0],
    });

    setSelectedAssignment(null);
    setSubmissionLink('');
    setFileName('');
  };

  return (
    <div className="space-y-6">
      
      {/* Header & Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Laboratory & Course Assignments</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Continuous internal assessment marks linked directly to your RTMNU grade card.
          </p>
        </div>

        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
          {['All', 'Pending', 'Graded'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filter === status
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Assignments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((asg) => {
          const isPending = asg.status === 'Pending';
          const isGraded = asg.status === 'Graded';
          const isSubmitted = asg.status === 'Submitted';

          return (
            <div
              key={asg.id}
              className={`p-6 rounded-2xl border transition-all flex flex-col justify-between space-y-4 ${
                isGraded
                  ? 'bg-white border-emerald-200/90 shadow-sm'
                  : isPending
                  ? 'bg-white border-amber-200/90 shadow-sm hover:border-amber-300'
                  : 'bg-white border-slate-200/90 shadow-sm'
              }`}
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                    {asg.courseCode} • {asg.courseTitle}
                  </span>
                  <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full border ${
                    isGraded
                      ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                      : isPending
                      ? 'bg-amber-100 text-amber-800 border-amber-300'
                      : 'bg-cyber-100 text-cyber-800 border-cyber-300'
                  }`}>
                    {asg.status}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 leading-snug">
                  {asg.title}
                </h3>

                <p className="text-xs text-slate-500 leading-relaxed">
                  {asg.description}
                </p>

                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 pt-1">
                  <span className="flex items-center gap-1 font-semibold text-slate-700">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>Due: {asg.dueDate}</span>
                  </span>
                  <span>•</span>
                  <span>Max Marks: <strong>{asg.maxMarks}</strong></span>
                  <span>•</span>
                  <span className="text-[11px] text-slate-400">{asg.submissionType}</span>
                </div>

                {/* Graded Remarks */}
                {isGraded && (
                  <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-200 text-xs space-y-1">
                    <div className="flex items-center justify-between font-bold text-emerald-900">
                      <span>Evaluated Score:</span>
                      <span className="text-sm text-emerald-700">{asg.obtainedMarks} / {asg.maxMarks}</span>
                    </div>
                    {asg.feedback && (
                      <p className="text-[11px] text-emerald-800/90 italic">"{asg.feedback}"</p>
                    )}
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                {asg.submittedFile ? (
                  <span className="text-[11px] font-mono text-slate-500 truncate max-w-[200px]">
                    Sub: {asg.submittedFile}
                  </span>
                ) : (
                  <span className="text-[11px] text-amber-600 font-semibold">
                    Submission Pending
                  </span>
                )}

                {isPending && (
                  <button
                    onClick={() => setSelectedAssignment(asg)}
                    className="px-3.5 py-1.5 rounded-xl bg-cyber-600 hover:bg-cyber-700 text-white text-xs font-bold shadow-md shadow-cyber-600/20 transition-all flex items-center gap-1.5"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Submit Work</span>
                  </button>
                )}

                {(isSubmitted || isGraded) && (
                  <button
                    onClick={() => alert(`View submitted work: ${asg.submittedFile}`)}
                    className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold"
                  >
                    View Submission
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Submission Modal */}
      {selectedAssignment && (
        <Modal
          isOpen={Boolean(selectedAssignment)}
          onClose={() => setSelectedAssignment(null)}
          title="Submit Academic Assignment"
          subtitle={`${selectedAssignment.courseCode}: ${selectedAssignment.title}`}
          maxWidth="max-w-md"
        >
          <form onSubmit={handleConfirmSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Upload File (.pdf, .zip, .ipynb)
              </label>
              <input
                type="file"
                onChange={handleFileChange}
                className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-cyber-50 file:text-cyber-700 hover:file:bg-cyber-100"
              />
              {fileName && (
                <p className="text-[11px] font-mono text-emerald-600 mt-1 font-semibold">
                  Selected: {fileName}
                </p>
              )}
            </div>

            <div className="relative flex py-1 items-center">
              <div className="flex-grow border-t border-slate-200"></div>
              <span className="flex-shrink mx-3 text-slate-400 text-[10px] uppercase font-bold">OR URL / Repo</span>
              <div className="flex-grow border-t border-slate-200"></div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                GitHub Repository / Colab / Live Demo URL
              </label>
              <input
                type="url"
                value={submissionLink}
                onChange={(e) => setSubmissionLink(e.target.value)}
                placeholder="https://github.com/..."
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyber-500/20"
              />
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setSelectedAssignment(null)}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-cyber-600 hover:bg-cyber-700 text-white text-xs font-bold shadow-md shadow-cyber-600/20 flex items-center gap-1.5"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Submit to Faculty</span>
              </button>
            </div>
          </form>
        </Modal>
      )}

    </div>
  );
};
