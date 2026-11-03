import React, { useState } from 'react';
import { 
  Award, 
  Download, 
  ExternalLink, 
  QrCode, 
  CheckCircle2, 
  ShieldCheck, 
  Printer, 
  X,
  Sparkles
} from 'lucide-react';
import { INSTITUTION } from '../../data/mockData';

export const CertificatesView = ({ certificates, student }) => {
  const [selectedCert, setSelectedCert] = useState(null);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Academic Certificates & Honors</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Cryptographically verifiable credentials issued by {INSTITUTION.name}.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Blockchain & QR Verifiable</span>
        </div>
      </div>

      {/* Grid of Certificates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {certificates.map((cert) => (
          <div 
            key={cert.id}
            className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col justify-between space-y-5 hover:border-vidya-300 hover:shadow-lg transition-all"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-vidya-50 text-vidya-600 flex items-center justify-center">
                  <Award className="w-5 h-5" />
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {cert.status}
                </span>
              </div>

              <div>
                <span className="text-[11px] font-mono text-slate-400 block">{cert.certificateNo}</span>
                <h3 className="text-base font-bold text-slate-900 leading-snug mt-0.5">
                  {cert.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Course: <strong className="text-slate-700 font-semibold">{cert.course}</strong>
                </p>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {cert.description}
              </p>

              <div className="pt-2 text-xs text-slate-500 flex items-center justify-between">
                <span>Issued on: {cert.issueDate}</span>
                <strong className="text-vidya-700 font-bold">{cert.score}</strong>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
              <span className="text-[10px] font-mono text-slate-400">
                ID: {cert.credentialId}
              </span>
              <button
                onClick={() => setSelectedCert(cert)}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-vidya-600 to-indigo-600 hover:from-vidya-700 hover:to-indigo-700 text-white text-xs font-bold shadow-md shadow-vidya-600/20 transition-all flex items-center gap-1.5"
              >
                <Award className="w-3.5 h-3.5" />
                <span>View Certificate</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Printable Certificate Modal */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div 
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity no-print"
            onClick={() => setSelectedCert(null)}
          />

          <div className="min-h-full flex items-center justify-center p-4 sm:p-6">
            <div 
              className="relative transform overflow-hidden rounded-3xl bg-white text-left shadow-2xl transition-all w-full max-w-3xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150 print:m-0 print:border-none print:shadow-none"
              onClick={(e) => e.stopPropagation()}
            >
              
              {/* Top toolbar */}
              <div className="no-print px-6 py-3 bg-slate-100 border-b border-slate-200 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 flex items-center gap-2">
                  <Award className="w-4 h-4 text-vidya-600" />
                  <span>Certificate of Academic Achievement</span>
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrint}
                    className="px-3 py-1.5 rounded-lg bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 text-xs font-semibold shadow-sm flex items-center gap-1.5"
                  >
                    <Printer className="w-3.5 h-3.5 text-cyber-600" />
                    <span>Print / Save PDF</span>
                  </button>
                  <button
                    onClick={() => setSelectedCert(null)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Certificate Template */}
              <div className="p-10 print:p-0 print-area text-slate-900 bg-white relative">
                
                {/* Border Frame */}
                <div className="border-4 border-double border-indigo-900 p-8 rounded-2xl relative text-center space-y-4">
                  
                  {/* Watermark / Seal */}
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center font-black text-xl">
                      {INSTITUTION.shortName}
                    </div>
                    <div>
                      <h2 className="text-lg font-black uppercase tracking-tight text-slate-950">
                        {INSTITUTION.name}
                      </h2>
                      <p className="text-[10px] text-slate-500 font-semibold">{INSTITUTION.accreditation}</p>
                    </div>
                  </div>

                  <div className="py-2">
                    <span className="text-xs font-serif uppercase tracking-widest text-indigo-900 font-extrabold block">
                      Autonomous Educational Excellence & Continuous Learning
                    </span>
                    <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 mt-1">
                      Certificate of Achievement
                    </h1>
                  </div>

                  <p className="text-xs text-slate-500 italic">This is proudly awarded to</p>

                  <h3 className="text-2xl font-black tracking-tight text-indigo-950 uppercase border-b-2 border-indigo-200 pb-2 inline-block px-8">
                    {student.name}
                  </h3>

                  <p className="text-xs text-slate-600 max-w-lg mx-auto leading-relaxed pt-2">
                    bearing Permanent Registration Number <strong className="font-mono text-slate-900">{student.prn}</strong> of {student.branch}, in recognition of exemplary academic performance and successful completion of the course:
                  </p>

                  <div className="p-3 bg-indigo-50/60 rounded-xl max-w-md mx-auto border border-indigo-200">
                    <h4 className="text-sm font-bold text-indigo-950">{selectedCert.course}</h4>
                    <p className="text-xs text-indigo-700 font-semibold mt-0.5">{selectedCert.score}</p>
                  </div>

                  {/* Signatures & QR */}
                  <div className="mt-8 pt-6 border-t border-slate-200 flex items-end justify-between text-xs">
                    <div className="flex items-center gap-3 text-left">
                      <div className="w-14 h-14 p-1 bg-white border border-slate-300 rounded flex items-center justify-center">
                        <QrCode className="w-12 h-12 text-slate-900" />
                      </div>
                      <div className="text-[9px] text-slate-400">
                        <p className="font-mono">Cert No: {selectedCert.certificateNo}</p>
                        <p className="font-mono">Hash: {selectedCert.credentialId}</p>
                        <p className="text-emerald-700 font-semibold">Autonomous AICTE Verified</p>
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="w-36 border-b border-slate-400 pb-1 mb-1 font-serif italic text-slate-800 text-sm">
                        Dr. S. Kulkarni
                      </div>
                      <p className="font-bold text-[10px] text-slate-800">Department Head & Dean</p>
                      <p className="text-[9px] text-slate-500">{INSTITUTION.name}</p>
                    </div>
                  </div>

                </div>

              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};
