import React, { useState } from 'react';
import { CheckCircle2, XCircle, Award, ArrowRight, RotateCcw, HelpCircle } from 'lucide-react';
import { Modal } from '../common/Modal';

const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "What is the worst-case time complexity of searching in a Red-Black Tree with N nodes?",
    options: ["O(1)", "O(log N)", "O(N)", "O(N log N)"],
    correctIndex: 1,
    explanation: "Because the longest path from root to leaf in a Red-Black tree is at most twice the length of the shortest path, search is guaranteed O(log N)."
  },
  {
    id: 2,
    question: "Which algorithmic property is strictly maintained by B-Trees to optimize database disk block accesses?",
    options: [
      "All leaf nodes must be at the exact same depth",
      "Each node can have at most 2 children",
      "Nodes are stored randomly across memory tracks",
      "Keys are kept unordered for faster write operations"
    ],
    correctIndex: 0,
    explanation: "B-Trees are perfectly balanced; all leaf nodes appear at the same level to ensure uniform block reads."
  },
  {
    id: 3,
    question: "The Ford-Fulkerson algorithm terminates with maximum network flow when:",
    options: [
      "No augmenting path exists in the residual graph",
      "All vertices are visited twice",
      "The capacity of every single edge is reduced to zero",
      "The minimum cut exceeds total flow"
    ],
    correctIndex: 0,
    explanation: "By the Max-Flow Min-Cut theorem, when no s-t augmenting path exists in the residual graph Gf, the current flow is maximal."
  }
];

export const QuizModal = ({ isOpen, onClose, courseTitle = "Advanced Algorithms" }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSelect = (optionIdx) => {
    if (isSubmitted) return;
    setSelectedAnswers(prev => ({ ...prev, [currentIdx]: optionIdx }));
  };

  const handleNext = () => {
    if (currentIdx < QUIZ_QUESTIONS.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setIsSubmitted(true);
    }
  };

  const calculateScore = () => {
    let score = 0;
    QUIZ_QUESTIONS.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) score++;
    });
    return score;
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedAnswers({});
    setIsSubmitted(false);
  };

  const currentQ = QUIZ_QUESTIONS[currentIdx];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Interactive Knowledge Check: ${courseTitle}`}
      subtitle="CyberVidya Continuous Academic Evaluation"
      maxWidth="max-w-xl"
    >
      <div className="space-y-5">
        {!isSubmitted ? (
          <div>
            {/* Progress */}
            <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
              <span>Question {currentIdx + 1} of {QUIZ_QUESTIONS.length}</span>
              <span className="font-semibold text-cyber-600">
                {Math.round(((currentIdx + 1) / QUIZ_QUESTIONS.length) * 100)}% Complete
              </span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-1.5 mb-5 overflow-hidden">
              <div 
                className="bg-cyber-600 h-1.5 rounded-full transition-all"
                style={{ width: `${((currentIdx + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
              />
            </div>

            {/* Question */}
            <h4 className="text-sm font-bold text-slate-900 leading-snug mb-4">
              {currentQ.question}
            </h4>

            {/* Options */}
            <div className="space-y-2.5">
              {currentQ.options.map((opt, oIdx) => {
                const isSelected = selectedAnswers[currentIdx] === oIdx;
                return (
                  <button
                    key={oIdx}
                    onClick={() => handleSelect(oIdx)}
                    className={`w-full text-left p-3.5 rounded-xl border text-xs font-medium transition-all flex items-center justify-between ${
                      isSelected
                        ? 'border-cyber-600 bg-cyber-50/70 text-cyber-900 shadow-sm'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <span>{opt}</span>
                    <span className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ml-2 ${
                      isSelected ? 'border-cyber-600 bg-cyber-600 text-white' : 'border-slate-300'
                    }`}>
                      {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Controls */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                disabled={currentIdx === 0}
                onClick={() => setCurrentIdx(currentIdx - 1)}
                className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100 disabled:opacity-40"
              >
                Previous
              </button>

              <button
                type="button"
                disabled={selectedAnswers[currentIdx] === undefined}
                onClick={handleNext}
                className="px-4 py-2 rounded-xl bg-cyber-600 hover:bg-cyber-700 text-white text-xs font-bold shadow-md shadow-cyber-600/20 disabled:opacity-50 flex items-center gap-1.5 transition-all"
              >
                <span>{currentIdx === QUIZ_QUESTIONS.length - 1 ? 'Submit Answers' : 'Next Question'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ) : (
          /* Results Screen */
          <div className="text-center py-4 space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-vidya-100 text-vidya-600 flex items-center justify-center mx-auto shadow-inner">
              <Award className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-xl font-black text-slate-900">Quiz Completed!</h3>
              <p className="text-xs text-slate-500 mt-1">Continuous internal evaluation marks recorded.</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-sm font-bold text-slate-800">
              Score: <span className="text-cyber-600 text-lg">{calculateScore()}</span> / {QUIZ_QUESTIONS.length} Correct ({Math.round((calculateScore()/QUIZ_QUESTIONS.length)*100)}%)
            </div>

            {/* Explanations */}
            <div className="text-left space-y-3 max-h-56 overflow-y-auto pt-2">
              {QUIZ_QUESTIONS.map((q, idx) => {
                const userChoice = selectedAnswers[idx];
                const isCorrect = userChoice === q.correctIndex;
                return (
                  <div key={q.id} className="p-3 rounded-lg border border-slate-200 text-xs space-y-1">
                    <div className="flex items-start gap-2">
                      {isCorrect ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                      )}
                      <div>
                        <p className="font-semibold text-slate-900">{q.question}</p>
                        <p className="text-[11px] text-slate-500 mt-0.5">{q.explanation}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center gap-3 pt-3">
              <button
                onClick={handleRestart}
                className="flex-1 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retry Quiz</span>
              </button>
              <button
                onClick={onClose}
                className="flex-1 py-2 rounded-xl bg-cyber-600 hover:bg-cyber-700 text-white text-xs font-bold shadow-md shadow-cyber-600/20"
              >
                Close & Return
              </button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};
