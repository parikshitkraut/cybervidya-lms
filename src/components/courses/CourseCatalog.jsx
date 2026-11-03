import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  PlayCircle, 
  Clock, 
  CheckCircle2, 
  FileText, 
  GraduationCap, 
  Layers, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const CourseCatalog = ({ courses, onSelectCourse }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSemester, setFilterSemester] = useState('All');

  const filteredCourses = courses.filter((c) => {
    const matchesSearch = 
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSem = filterSemester === 'All' || c.semester.toString() === filterSemester;
    return matchesSearch && matchesSem;
  });

  return (
    <div className="space-y-6">
      
      {/* Top Banner & Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Academic Course Catalog</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Curriculum accredited by AICTE and Rashtrasant Tukadoji Maharaj Nagpur University.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Search */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search course title, code, mentor..."
              className="bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-4 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyber-500/20"
            />
          </div>

          {/* Filter */}
          <select
            value={filterSemester}
            onChange={(e) => setFilterSemester(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-cyber-500/20"
          >
            <option value="All">All Semesters</option>
            <option value="6">Semester 6 (Current)</option>
            <option value="5">Semester 5 (Electives)</option>
          </select>
        </div>
      </div>

      {/* Grid of Courses */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <div 
            key={course.id}
            onClick={() => onSelectCourse(course)}
            className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col group hover:shadow-xl hover:border-cyber-300 transition-all cursor-pointer"
          >
            {/* Thumbnail */}
            <div className="relative h-44 overflow-hidden bg-slate-900">
              <img 
                src={course.thumbnail} 
                alt={course.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90 group-hover:opacity-100" 
              />
              <div className="absolute top-3 left-3 flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-lg bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-mono font-bold">
                  {course.code}
                </span>
                <span className="px-2 py-0.5 rounded-lg bg-cyber-500/90 text-white text-[10px] font-bold">
                  {course.credits} Credits
                </span>
              </div>
              <div className="absolute bottom-3 right-3">
                <div className="w-9 h-9 rounded-full bg-white/90 text-cyber-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <PlayCircle className="w-5 h-5 fill-cyber-600 text-white" />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-medium">
                  <Layers className="w-3.5 h-3.5 text-slate-400" />
                  <span>{course.totalModules || 4} Modules</span>
                  <span>•</span>
                  <span>{course.totalLectures || 24} Video Lectures</span>
                </div>

                <h3 className="font-bold text-slate-900 text-sm group-hover:text-cyber-600 transition-colors line-clamp-1">
                  {course.title}
                </h3>

                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {course.description}
                </p>
              </div>

              {/* Progress & Instructor */}
              <div className="pt-3 border-t border-slate-100 space-y-3">
                {/* Progress bar */}
                <div>
                  <div className="flex items-center justify-between text-[11px] mb-1">
                    <span className="text-slate-500">Academic Progress</span>
                    <strong className="text-slate-800">{course.progress}%</strong>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-cyber-600 to-indigo-600 h-1.5 rounded-full transition-all"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>

                {/* Instructor */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img 
                      src={course.instructorAvatar} 
                      alt={course.instructor}
                      className="w-6 h-6 rounded-full object-cover ring-1 ring-slate-200" 
                    />
                    <span className="text-xs font-semibold text-slate-700 truncate max-w-[140px]">
                      {course.instructor}
                    </span>
                  </div>

                  <span className="text-xs font-bold text-cyber-600 group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                    <span>Study</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
