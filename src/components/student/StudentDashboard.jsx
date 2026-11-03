import React from 'react';
import { 
  BookOpen, 
  Award, 
  Calendar, 
  Clock, 
  CreditCard, 
  FileText, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Video, 
  ExternalLink,
  AlertCircle,
  GraduationCap,
  TrendingUp,
  Percent
} from 'lucide-react';
import { INSTITUTION } from '../../data/mockData';

export const StudentDashboard = ({ 
  student, 
  courses, 
  feeSummary, 
  upcomingClasses, 
  assignments, 
  announcements,
  onOpenCourse,
  onOpenPayNow,
  setActiveTab 
}) => {
  const pendingAssignments = assignments.filter(a => a.status === 'Pending');
  const primaryCourse = courses[0];

  return (
    <div className="space-y-6">
      
      {/* Hero Welcome Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-cyber-900 via-indigo-900 to-vidya-950 text-white p-6 sm:p-8 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-cyber-500/30 text-cyber-300 border border-cyber-400/30">
                {INSTITUTION.academicYear} • {INSTITUTION.currentSemester}
              </span>
              <span className="text-xs text-slate-300">| PRN: {student.prn}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Welcome back, {student.name.split(' ')[0]}! 👋
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {student.branch} • Section {student.section}. You have <strong className="text-white font-semibold">{upcomingClasses.length} academic sessions</strong> scheduled today and <strong className="text-amber-300 font-semibold">{pendingAssignments.length} pending assignments</strong>.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            {feeSummary.outstandingBalance > 0 && (
              <button
                onClick={onOpenPayNow}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white text-xs font-bold shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-2"
              >
                <CreditCard className="w-4 h-4" />
                <span>Pay Dues (₹{feeSummary.outstandingBalance.toLocaleString('en-IN')})</span>
              </button>
            )}
            <button
              onClick={() => setActiveTab('courses')}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold backdrop-blur-md border border-white/20 transition-all flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4" />
              <span>Resume Learning</span>
            </button>
          </div>
        </div>

        {/* Ambient background decoration */}
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-cyber-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-40 -top-10 w-48 h-48 bg-vidya-500/20 rounded-full blur-2xl pointer-events-none" />
      </div>

      {/* Quick Academic Metric Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        
        {/* Metric 1: CGPA */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-sm flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-cyber-50 text-cyber-600 flex items-center justify-center shrink-0">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">Cumulative CGPA</span>
            <div className="text-xl font-extrabold text-slate-900">{student.cgpa} <span className="text-xs font-normal text-slate-400">/ 10</span></div>
          </div>
        </div>

        {/* Metric 2: Attendance */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-sm flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <Percent className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">Biometric Attendance</span>
            <div className="text-xl font-extrabold text-emerald-600">{student.attendancePercentage}%</div>
          </div>
        </div>

        {/* Metric 3: Active Courses */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-sm flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-vidya-50 text-vidya-600 flex items-center justify-center shrink-0">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">Enrolled Courses</span>
            <div className="text-xl font-extrabold text-slate-900">{courses.length} Subjects</div>
          </div>
        </div>

        {/* Metric 4: Fee Status */}
        <div 
          onClick={() => setActiveTab('fees')}
          className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-sm flex items-center gap-3.5 cursor-pointer hover:border-cyber-300 transition-all"
        >
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
            feeSummary.outstandingBalance > 0 ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'
          }`}>
            <CreditCard className="w-5 h-5" />
          </div>
          <div className="overflow-hidden">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">Fees Status</span>
            <div className={`text-base font-extrabold truncate ${
              feeSummary.outstandingBalance > 0 ? 'text-amber-600' : 'text-emerald-600'
            }`}>
              {feeSummary.outstandingBalance > 0 ? `₹${(feeSummary.outstandingBalance/1000).toFixed(0)}k Due` : '100% Cleared'}
            </div>
          </div>
        </div>

      </div>

      {/* Main Grid: Learning Progress & Today's Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Learning In Progress */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Active Course Spotlight */}
          {primaryCourse && (
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-cyber-700 bg-cyber-50 px-2.5 py-1 rounded-full border border-cyber-200">
                  Currently Studying • {primaryCourse.code}
                </span>
                <span className="text-xs font-semibold text-slate-500">
                  {primaryCourse.progress}% Completed
                </span>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <img 
                  src={primaryCourse.thumbnail} 
                  alt={primaryCourse.title}
                  className="w-full sm:w-36 h-24 rounded-xl object-cover ring-1 ring-slate-200 shrink-0" 
                />
                <div className="space-y-1.5 flex-1">
                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    {primaryCourse.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2">
                    {primaryCourse.description}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <img 
                      src={primaryCourse.instructorAvatar} 
                      alt={primaryCourse.instructor} 
                      className="w-5 h-5 rounded-full object-cover"
                    />
                    <span>{primaryCourse.instructor}</span>
                  </div>
                </div>
              </div>

              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-cyber-600 to-indigo-600 h-2 rounded-full transition-all duration-500" 
                  style={{ width: `${primaryCourse.progress}%` }}
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-slate-500">
                  {primaryCourse.completedLectures} of {primaryCourse.totalLectures} video lectures finished
                </span>
                <button
                  onClick={() => onOpenCourse(primaryCourse)}
                  className="px-4 py-2 rounded-xl bg-cyber-600 hover:bg-cyber-700 text-white text-xs font-bold shadow-md shadow-cyber-600/20 transition-all flex items-center gap-1.5"
                >
                  <Video className="w-3.5 h-3.5" />
                  <span>Continue Lecture</span>
                </button>
              </div>
            </div>
          )}

          {/* Enrolled Courses Grid */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-slate-900">Enrolled Courses (Semester 6)</h3>
              <button 
                onClick={() => setActiveTab('courses')}
                className="text-xs font-semibold text-cyber-600 hover:text-cyber-700 flex items-center gap-1"
              >
                <span>View All Courses</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {courses.slice(1, 4).map((c) => (
                <div 
                  key={c.id} 
                  onClick={() => onOpenCourse(c)}
                  className="p-3.5 rounded-xl border border-slate-200/80 hover:border-cyber-300 hover:bg-slate-50/50 cursor-pointer transition-all flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-700 shrink-0">
                      {c.code}
                    </div>
                    <div className="overflow-hidden">
                      <h4 className="text-xs font-bold text-slate-900 truncate">{c.title}</h4>
                      <p className="text-[11px] text-slate-500 truncate">{c.instructor} • {c.credits} Credits</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <div className="w-20 hidden sm:block">
                      <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                        <div 
                          className="bg-cyber-600 h-1.5 rounded-full" 
                          style={{ width: `${c.progress}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-slate-400 text-right block mt-0.5">{c.progress}%</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Classes, Assignments, Circulars */}
        <div className="space-y-6">
          
          {/* Today's Classes & Timetable */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-cyber-600" />
                <span>Today's Classes</span>
              </h3>
              <span className="text-[10px] font-bold text-cyber-600 bg-cyber-50 px-2 py-0.5 rounded">
                Live Timetable
              </span>
            </div>

            <div className="space-y-3">
              {upcomingClasses.map((cls) => (
                <div 
                  key={cls.id} 
                  className={`p-3 rounded-xl border text-xs space-y-1.5 transition-all ${
                    cls.isLive 
                      ? 'bg-gradient-to-r from-cyber-50/80 to-indigo-50/50 border-cyber-300 shadow-sm' 
                      : 'bg-slate-50/60 border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{cls.courseCode}</span>
                    {cls.isLive ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-extrabold text-red-600 bg-red-50 px-1.5 py-0.5 rounded border border-red-200 animate-pulse">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
                        LIVE
                      </span>
                    ) : (
                      <span className="text-[10px] text-slate-400 font-medium">Scheduled</span>
                    )}
                  </div>
                  <p className="font-semibold text-slate-800 text-[11px] leading-tight line-clamp-1">{cls.topic}</p>
                  <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1">
                    <span>{cls.time}</span>
                    <a
                      href={cls.joinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyber-600 hover:text-cyber-800 font-bold flex items-center gap-0.5"
                    >
                      <span>Join Room</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pending Assignments */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <FileText className="w-4 h-4 text-amber-600" />
                <span>Pending Submissions</span>
              </h3>
              <button 
                onClick={() => setActiveTab('assignments')}
                className="text-[11px] font-semibold text-cyber-600 hover:text-cyber-700"
              >
                View All
              </button>
            </div>

            {pendingAssignments.length === 0 ? (
              <p className="text-xs text-slate-400 py-3 text-center">All assignments submitted on time! 🎉</p>
            ) : (
              <div className="space-y-2">
                {pendingAssignments.slice(0, 2).map((asg) => (
                  <div 
                    key={asg.id}
                    onClick={() => setActiveTab('assignments')}
                    className="p-3 rounded-xl border border-slate-200/80 hover:border-amber-300 hover:bg-amber-50/20 cursor-pointer transition-all text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-800">{asg.courseCode}</span>
                      <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">
                        Due {asg.dueDate}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 font-medium line-clamp-1 mt-1">{asg.title}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* College Announcements */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900">Latest Circulars</h3>
              <button 
                onClick={() => setActiveTab('announcements')}
                className="text-[11px] font-semibold text-cyber-600 hover:text-cyber-700"
              >
                Notices
              </button>
            </div>
            <div className="space-y-2 text-xs">
              {announcements.slice(0, 2).map((ann) => (
                <div key={ann.id} className="p-2.5 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer">
                  <div className="flex items-center gap-1.5 mb-1">
                    {ann.urgent && (
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                    )}
                    <span className="text-[10px] font-bold text-slate-500 uppercase">{ann.category}</span>
                  </div>
                  <h5 className="font-semibold text-slate-900 text-[11px] line-clamp-2 leading-tight">{ann.title}</h5>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
