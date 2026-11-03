import React, { useState } from 'react';
import { BookOpen, FileText, Download, Play, Video, CheckCircle2 } from 'lucide-react';
import { REGISTERED_COURSES } from '../../data/mockData';

export const RegisteredCoursesPage = () => {
  const [selectedCourse, setSelectedCourse] = useState(REGISTERED_COURSES[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="space-y-4">
      <h2 className="text-[17px] font-bold text-slate-900 tracking-tight">
        My Registered Courses (Semester V - EE)
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: Courses List */}
        <div className="space-y-3">
          {REGISTERED_COURSES.map((c) => (
            <div
              key={c.id}
              onClick={() => {
                setSelectedCourse(c);
                setIsPlaying(false);
              }}
              className={`p-4 rounded border cursor-pointer transition-all ${
                selectedCourse.id === c.id
                  ? 'bg-white border-blue-500 shadow-sm border-l-4'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                  {c.code}
                </span>
                <span className="text-[11px] text-slate-500">{c.credits} Credits</span>
              </div>
              <h4 className="text-[13px] font-bold text-slate-900 mt-1">{c.title}</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">Faculty: {c.instructor}</p>

              <div className="mt-2 w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                <div className="bg-[#18b82a] h-1.5 rounded-full" style={{ width: `${c.progress}%` }} />
              </div>
              <span className="text-[10px] text-slate-400 mt-1 block">{c.progress}% completed</span>
            </div>
          ))}
        </div>

        {/* Right: Selected Course Details & Lecture Viewer */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded border border-slate-200 p-5 shadow-xs space-y-4">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="font-mono text-xs font-bold text-blue-600">{selectedCourse.code}</span>
                <h3 className="text-base font-bold text-slate-900 mt-0.5">{selectedCourse.title}</h3>
                <p className="text-xs text-slate-500">Instructor: {selectedCourse.instructor} • Semester {selectedCourse.semester}</p>
              </div>

              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="px-3.5 py-1.5 rounded bg-[#18b82a] hover:bg-[#15a225] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
              >
                <Video className="w-3.5 h-3.5" />
                <span>{isPlaying ? 'Close Lecture' : 'Watch Lecture'}</span>
              </button>
            </div>

            {/* Video Player */}
            {isPlaying && (
              <div className="aspect-video bg-slate-900 rounded overflow-hidden shadow-inner">
                <video
                  src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                  controls
                  autoPlay
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Study Materials */}
            <div>
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                Downloadable Study Materials & Lecture Notes
              </h4>
              <div className="space-y-2">
                {selectedCourse.materials.map((m, mIdx) => (
                  <div key={mIdx} className="p-3 rounded border border-slate-200 bg-slate-50 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-red-500" />
                      <span className="font-medium text-slate-800">{m.title}</span>
                      <span className="text-[10px] text-slate-400 font-mono">({m.size})</span>
                    </div>
                    <button
                      onClick={() => alert(`Downloading: ${m.title}`)}
                      className="px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-300 rounded text-[11px] font-semibold text-slate-700 flex items-center gap-1"
                    >
                      <Download className="w-3 h-3 text-blue-600" />
                      <span>Download</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
