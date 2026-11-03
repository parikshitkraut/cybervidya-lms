import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Play, 
  Pause, 
  CheckCircle2, 
  Circle, 
  Download, 
  FileText, 
  BookOpen, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Share2, 
  Video,
  Clock,
  ExternalLink,
  Sparkles
} from 'lucide-react';

export const CoursePlayer = ({ 
  course, 
  onBack, 
  onToggleLesson,
  onOpenQuiz 
}) => {
  const [activeTab, setActiveTab] = useState('curriculum'); // 'curriculum' | 'materials' | 'notes' | 'quiz'
  const [currentLesson, setCurrentLesson] = useState(
    course.modules?.[0]?.lessons?.[0] || {
      id: 'default',
      title: `${course.title} - Comprehensive Overview`,
      duration: '45m',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
    }
  );
  const [expandedModules, setExpandedModules] = useState({ 0: true, 1: true });

  const toggleModule = (idx) => {
    setExpandedModules(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
            title="Back to Courses"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-cyber-50 text-cyber-700 border border-cyber-200">
                {course.code}
              </span>
              <span className="text-xs text-slate-500">{course.credits} Credits • Sem {course.semester}</span>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5 leading-snug">
              {course.title}
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenQuiz}
            className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-vidya-600 to-indigo-600 hover:from-vidya-700 hover:to-indigo-700 text-white text-xs font-bold shadow-md shadow-vidya-600/20 transition-all flex items-center gap-1.5"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Unit Quiz</span>
          </button>
        </div>
      </div>

      {/* Main Player Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: Video Stage & Tabs (2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          
          {/* Video Container */}
          <div className="bg-slate-950 rounded-2xl overflow-hidden shadow-2xl border border-slate-800 relative group aspect-video">
            <video
              key={currentLesson.id}
              src={currentLesson.videoUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'}
              controls
              playsInline
              className="w-full h-full object-cover"
              poster={course.thumbnail}
            />
          </div>

          {/* Current Lesson Title Banner */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-cyber-600">
                Active Lecture
              </span>
              <h3 className="text-base font-bold text-slate-900 mt-0.5">
                {currentLesson.title}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Instructor: {course.instructor} • Duration: {currentLesson.duration || '45 mins'}
              </p>
            </div>

            <button
              onClick={() => onToggleLesson(course.id, currentLesson.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                currentLesson.completed
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-300'
                  : 'bg-cyber-600 hover:bg-cyber-700 text-white shadow-md shadow-cyber-600/20'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{currentLesson.completed ? 'Completed' : 'Mark as Complete'}</span>
            </button>
          </div>

          {/* Tabs: Overview, Study Materials, Discussion */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <div className="flex border-b border-slate-200 gap-6">
              <button
                onClick={() => setActiveTab('curriculum')}
                className={`pb-3 text-xs font-bold border-b-2 transition-all ${
                  activeTab === 'curriculum'
                    ? 'border-cyber-600 text-cyber-600'
                    : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                Course Syllabus & Outline
              </button>
              <button
                onClick={() => setActiveTab('materials')}
                className={`pb-3 text-xs font-bold border-b-2 transition-all ${
                  activeTab === 'materials'
                    ? 'border-cyber-600 text-cyber-600'
                    : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                Study Materials & PDFs ({course.materials?.length || 2})
              </button>
            </div>

            <div className="mt-4">
              {activeTab === 'curriculum' && (
                <div className="space-y-3 text-xs text-slate-600">
                  <p className="leading-relaxed">
                    {course.description}
                  </p>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                    <h4 className="font-bold text-slate-900">Key Learning Outcomes:</h4>
                    <ul className="list-disc list-inside space-y-1 text-slate-600">
                      <li>Understand mathematical rigor and computational limits in this discipline.</li>
                      <li>Hands-on laboratory implementation with industry best practices and unit tests.</li>
                      <li>Preparation for autonomous internal examinations and university accreditation.</li>
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === 'materials' && (
                <div className="space-y-3">
                  {(course.materials || []).map((mat, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl border border-slate-200 hover:border-cyber-300 bg-slate-50/50 flex items-center justify-between transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-cyber-50 text-cyber-600 flex items-center justify-center shrink-0">
                          <FileText className="w-4 h-4" />
                        </div>
                        <div>
                          <h5 className="font-semibold text-xs text-slate-900">{mat.title}</h5>
                          <span className="text-[11px] text-slate-400">{mat.type} • {mat.size}</span>
                        </div>
                      </div>

                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          alert(`Downloading: ${mat.title}`);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-semibold shadow-sm flex items-center gap-1.5 transition-all"
                      >
                        <Download className="w-3.5 h-3.5 text-cyber-600" />
                        <span>Download</span>
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Right: Modules & Lessons Accordion (1 col) */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4 h-fit">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Course Modules</h3>
              <p className="text-[11px] text-slate-500">{course.progress}% completed</p>
            </div>
            <span className="text-xs font-mono font-bold text-cyber-600">
              {course.completedLectures || 18}/{course.totalLectures || 24}
            </span>
          </div>

          <div className="space-y-3 max-h-[700px] overflow-y-auto pr-1">
            {(course.modules || []).map((mod, modIdx) => {
              const isExpanded = expandedModules[modIdx] ?? false;

              return (
                <div key={mod.id} className="border border-slate-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => toggleModule(modIdx)}
                    className="w-full p-3 bg-slate-50 hover:bg-slate-100 transition-colors flex items-center justify-between text-left"
                  >
                    <div className="space-y-0.5">
                      <span className="text-xs font-bold text-slate-800 block">{mod.title}</span>
                      <span className="text-[10px] text-slate-400">{mod.duration} • {mod.lessons?.length || 0} Lectures</span>
                    </div>
                    {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </button>

                  {isExpanded && (
                    <div className="divide-y divide-slate-100 bg-white">
                      {(mod.lessons || []).map((lesson) => {
                        const isCurrent = currentLesson.id === lesson.id;
                        return (
                          <div
                            key={lesson.id}
                            onClick={() => setCurrentLesson(lesson)}
                            className={`p-3 flex items-start justify-between gap-2 cursor-pointer transition-all ${
                              isCurrent
                                ? 'bg-cyber-50/70 border-l-4 border-cyber-600 text-cyber-900'
                                : 'hover:bg-slate-50 text-slate-700'
                            }`}
                          >
                            <div className="flex items-start gap-2.5">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onToggleLesson(course.id, lesson.id);
                                }}
                                className="mt-0.5 text-slate-400 hover:text-emerald-600"
                              >
                                {lesson.completed ? (
                                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                ) : (
                                  <Circle className="w-4 h-4" />
                                )}
                              </button>
                              <div>
                                <h6 className={`text-xs font-medium leading-tight ${isCurrent ? 'font-bold text-cyber-900' : ''}`}>
                                  {lesson.title}
                                </h6>
                                <span className="text-[10px] text-slate-400 mt-0.5 block">
                                  {lesson.duration}
                                </span>
                              </div>
                            </div>

                            <Play className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${isCurrent ? 'text-cyber-600 fill-cyber-600' : 'text-slate-300'}`} />
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
};
