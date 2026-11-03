import React, { useState } from 'react';
import { Calendar, Clock, Video, MapPin, User, ExternalLink, Sparkles } from 'lucide-react';
import { INSTITUTION } from '../../data/mockData';

const WEEKLY_SCHEDULE = [
  {
    day: "Monday",
    slots: [
      { time: "09:00 AM - 10:00 AM", code: "CS601", title: "Advanced Data Structures", room: "Smart Lab 304", instructor: "Dr. Sandeep Kulkarni", liveUrl: "https://meet.google.com/abc-jitn-cse" },
      { time: "10:15 AM - 11:15 AM", code: "CS602", title: "Deep Learning Architectures", room: "AI Lab 1", instructor: "Dr. Ananya Sen", liveUrl: "https://meet.google.com/xyz-jitn-ai" },
      { time: "11:30 AM - 01:30 PM", code: "CS603", title: "Cloud & Kubernetes Practical", room: "Cloud Computing CoE", instructor: "Prof. Harish Mehta", liveUrl: "https://meet.google.com/jitn-k8s-cloud" },
    ]
  },
  {
    day: "Tuesday (Today)",
    isToday: true,
    slots: [
      { time: "10:00 AM - 11:30 AM", code: "CS601", title: "Advanced Data Structures & Algorithms", room: "Smart Lab 304 & Online", instructor: "Dr. Sandeep Kulkarni", liveUrl: "https://meet.google.com/abc-jitn-cse", isLive: true },
      { time: "02:00 PM - 04:00 PM", code: "CS602", title: "Deep Learning Laboratory (PyTorch)", room: "NVIDIA AI Center", instructor: "Dr. Ananya Sen", liveUrl: "https://meet.google.com/xyz-jitn-ai" },
    ]
  },
  {
    day: "Wednesday",
    slots: [
      { time: "09:30 AM - 11:00 AM", code: "CS604", title: "Database Engineering & Sharding", room: "Lecture Hall 202", instructor: "Dr. Meenakshi Joshi", liveUrl: "https://meet.google.com/jitn-db-class" },
      { time: "11:30 AM - 01:00 PM", code: "CS605", title: "Cyber Security & Cryptography", room: "Cyber Security Cell", instructor: "Prof. Vikram Singhania", liveUrl: "https://meet.google.com/jitn-sec-class" },
    ]
  },
  {
    day: "Thursday",
    slots: [
      { time: "10:00 AM - 12:00 PM", code: "CS603", title: "Microservices & Docker Hands-on", room: "DevOps CoE", instructor: "Prof. Harish Mehta", liveUrl: "https://meet.google.com/jitn-k8s-cloud" },
      { time: "02:00 PM - 04:00 PM", code: "PROJ", title: "Capstone Project Mentorship", room: "Innovation Incubation Hall", instructor: "All Mentors", liveUrl: "https://meet.google.com/jitn-project" },
    ]
  },
  {
    day: "Friday",
    slots: [
      { time: "09:00 AM - 11:00 AM", code: "CS601", title: "Algorithmic Problem Solving & LeetCode", room: "Smart Lab 304", instructor: "Dr. Sandeep Kulkarni", liveUrl: "https://meet.google.com/abc-jitn-cse" },
      { time: "02:00 PM - 04:00 PM", code: "SEMINAR", title: "Technical Seminar & Paper Review", room: "Auditorium Hall 2", instructor: "Dean Academics", liveUrl: "https://meet.google.com/jitn-seminar" },
    ]
  }
];

export const TimetableSchedule = () => {
  const [selectedDay, setSelectedDay] = useState("Tuesday (Today)");

  const currentDaySchedule = WEEKLY_SCHEDULE.find(d => d.day === selectedDay) || WEEKLY_SCHEDULE[1];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Academic Timetable & Live Rooms</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {INSTITUTION.name} • B.Tech CSE Semester 6 (Division A)
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5 bg-slate-100 p-1 rounded-xl">
          {WEEKLY_SCHEDULE.map((d) => (
            <button
              key={d.day}
              onClick={() => setSelectedDay(d.day)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedDay === d.day
                  ? 'bg-white text-cyber-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {d.day.split(' ')[0]} {d.isToday && '• Today'}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {currentDaySchedule.slots.map((slot, idx) => (
          <div
            key={idx}
            className={`p-6 rounded-2xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
              slot.isLive 
                ? 'bg-gradient-to-r from-cyber-50/70 via-indigo-50/40 to-white border-cyber-300 shadow-md ring-1 ring-cyber-400/20'
                : 'bg-white border-slate-200/90 shadow-sm'
            }`}
          >
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-800">
                  {slot.code}
                </span>
                <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{slot.time}</span>
                </span>
                {slot.isLive && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-extrabold text-red-600 bg-red-50 px-2 py-0.5 rounded-full border border-red-200 animate-pulse">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
                    LIVE NOW
                  </span>
                )}
              </div>

              <h3 className="text-base font-bold text-slate-900">
                {slot.title}
              </h3>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                <span className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <span>{slot.instructor}</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{slot.room}</span>
                </span>
              </div>
            </div>

            <div className="shrink-0 pt-2 md:pt-0">
              <a
                href={slot.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                  slot.isLive
                    ? 'bg-cyber-600 hover:bg-cyber-700 text-white shadow-md shadow-cyber-600/20'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <Video className="w-4 h-4" />
                <span>Join Live Classroom</span>
                <ExternalLink className="w-3 h-3 ml-0.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
