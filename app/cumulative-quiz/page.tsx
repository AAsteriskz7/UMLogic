"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AppSidebar from '@/components/app-sidebar';
import { QUIZ_DATA, Question } from '@/lib/quiz-data';

export default function CumulativeQuiz() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  useEffect(() => {
    // Flatten all questions and shuffle
    const allQuestions = Object.values(QUIZ_DATA).flat();
    const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
    setQuestions(shuffled.slice(0, 15)); // Pick up to 15 questions
  }, []);

  const handleAnswerSelect = (label: string) => {
    if (isAnswerSubmitted) return;
    setSelectedAnswer(label);
  };

  const handleSubmitAnswer = () => {
    if (!selectedAnswer || isAnswerSubmitted) return;
    setIsAnswerSubmitted(true);
    const currentQ = questions[currentIdx];
    if (selectedAnswer === currentQ.options.find(o => o.isCorrect)?.label) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswerSubmitted(false);
    } else {
      setQuizComplete(true);
      // Save exam completion state
      try {
        const saved = localStorage.getItem('umlogic_progress');
        let progress = saved ? JSON.parse(saved) : {};
        const percentage = Math.round((score / questions.length) * 100);
        progress.finalExam = Math.max(progress.finalExam || 0, percentage);
        localStorage.setItem('umlogic_progress', JSON.stringify(progress));
        window.dispatchEvent(new Event('umlogic_progress_updated'));
      } catch (e) {
        console.error("Failed to save exam progress", e);
      }
    }
  };

  const resetQuiz = () => {
    const allQuestions = Object.values(QUIZ_DATA).flat();
    const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
    setQuestions(shuffled.slice(0, 15));
    setCurrentIdx(0);
    setSelectedAnswer(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setQuizComplete(false);
  };

  if (questions.length === 0) return null;

  const currentQ = questions[currentIdx];

  return (
    <div className="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 antialiased">
      <AppSidebar />

      <main className="flex-1 overflow-y-auto p-8 relative">
        <div className="max-w-[800px] mx-auto">
          {quizComplete ? (
            <div className="flex flex-col items-center justify-center py-16 px-8 bg-white dark:bg-slate-900 rounded-3xl border border-primary/10 shadow-xl max-w-2xl mx-auto mt-12 animate-in fade-in zoom-in-95 duration-500">
              <div className="h-24 w-24 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-5xl text-primary">school</span>
              </div>
              <h2 className="text-4xl font-black text-slate-900 dark:text-slate-100 mb-2">Final Exam Complete</h2>
              <p className="text-slate-500 dark:text-slate-400 mb-8 text-center text-lg">
                You've completed the CampusConnect UML simulation.
              </p>
              
              <div className="grid grid-cols-2 gap-6 w-full mb-10">
                <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl border border-primary/5 text-center shadow-sm">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Final Score</p>
                  <p className="text-4xl font-black text-primary">{score} / {questions.length}</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl border border-primary/5 text-center shadow-sm">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Accuracy</p>
                  <p className="text-4xl font-black text-primary">{Math.round((score / questions.length) * 100)}%</p>
                </div>
              </div>

              <div className="flex gap-4 w-full">
                <button 
                  onClick={resetQuiz}
                  className="flex-1 py-4 px-6 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-all flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-xl">restart_alt</span>
                  Retake Exam
                </button>
                <Link 
                  href="/dashboard"
                  className="flex-1 py-4 px-6 rounded-2xl bg-primary text-white font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all flex items-center justify-center gap-2 text-center"
                >
                  <span className="material-symbols-outlined text-xl">dashboard</span>
                  Dashboard
                </Link>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-primary/10 pb-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-accent text-primary px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
                      CS 2340
                    </span>
                    <span className="text-slate-400 text-xs">•</span>
                    <span className="text-primary text-[10px] font-bold uppercase tracking-widest border border-primary/20 px-2 py-0.5 rounded text-xs">
                      {currentQ.module}
                    </span>
                  </div>
                  <h1 className="text-4xl font-black text-slate-900 dark:text-slate-100">
                    Final Exam Simulation
                  </h1>
                </div>
                <div className="text-right flex flex-col items-end">
                   <div className="text-3xl font-black text-primary mb-1">{currentIdx + 1} <span className="text-slate-300 dark:text-slate-600 text-xl font-medium">/ {questions.length}</span></div>
                   <div className="w-32 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                     <div 
                       className="h-full bg-primary transition-all duration-500 rounded-full" 
                       style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
                     />
                   </div>
                </div>
              </div>

              {/* Question */}
              <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-primary/10 shadow-lg shadow-slate-200/20 dark:shadow-none">
                <p className="text-2xl font-bold text-slate-800 dark:text-slate-100 leading-relaxed">
                  {currentQ.text}
                </p>
                {currentQ.codeSnippet && (
                    <div className="mt-6 p-5 bg-slate-900 rounded-2xl font-mono text-sm text-slate-300 border border-white/10 overflow-x-auto whitespace-pre">
                      {currentQ.codeSnippet}
                    </div>
                )}
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 gap-4">
                {currentQ.options.map((opt) => {
                  const isSelected = selectedAnswer === opt.label;
                  const showCorrect = isAnswerSubmitted && opt.isCorrect;
                  const showWrong = isAnswerSubmitted && isSelected && !opt.isCorrect;

                  return (
                    <button
                      key={opt.label}
                      onClick={() => handleAnswerSelect(opt.label)}
                      disabled={isAnswerSubmitted}
                      className={`flex items-center gap-5 p-6 rounded-3xl border-2 transition-all text-left overflow-hidden relative group ${
                        showCorrect 
                          ? 'bg-green-50 dark:bg-green-900/10 border-green-500/50' 
                          : showWrong
                          ? 'bg-red-50 dark:bg-red-900/10 border-red-500/50'
                          : isSelected
                          ? 'bg-primary/5 border-primary shadow-md shadow-primary/5'
                          : 'bg-white dark:bg-slate-900 border-primary/10 hover:border-primary/30'
                      }`}
                    >
                      <div className={`h-12 w-12 rounded-2xl flex items-center justify-center font-black text-lg transition-colors z-10 ${
                        showCorrect
                          ? 'bg-green-500 text-white shadow-lg shadow-green-500/30'
                          : showWrong
                          ? 'bg-red-500 text-white shadow-lg shadow-red-500/30'
                          : isSelected
                          ? 'bg-primary text-white shadow-lg shadow-primary/30'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-400 group-hover:bg-primary/10 group-hover:text-primary'
                      }`}>
                        {opt.label}
                      </div>
                      <div className="flex-1 z-10">
                        <p className={`font-semibold text-lg ${
                          isSelected || showCorrect || showWrong
                            ? 'text-slate-900 dark:text-slate-100'
                            : 'text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-slate-100'
                        }`}>
                          {opt.text}
                        </p>
                      </div>
                      {isAnswerSubmitted && opt.isCorrect && (
                        <div className="absolute right-6 z-10 animate-in zoom-in spin-in-12 duration-300">
                          <span className="material-symbols-outlined text-green-500 bg-green-100 dark:bg-green-900/30 p-2 rounded-full text-2xl font-bold border-2 border-white dark:border-slate-900 shadow-sm">check</span>
                        </div>
                      )}
                      {showWrong && (
                        <div className="absolute right-6 z-10 animate-in zoom-in spin-in-12 duration-300">
                          <span className="material-symbols-outlined text-red-500 bg-red-100 dark:bg-red-900/30 p-2 rounded-full text-2xl font-bold border-2 border-white dark:border-slate-900 shadow-sm">close</span>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Feedback */}
              {isAnswerSubmitted && (
                <div className="bg-primary/5 dark:bg-primary/10 border-l-4 border-primary rounded-r-3xl p-8 animate-in slide-in-from-left-4 duration-500 mt-4">
                  <div className="flex gap-5">
                    <div className="mt-1">
                      <span className="material-symbols-outlined text-3xl text-primary bg-white dark:bg-slate-800 p-2 rounded-xl shadow-sm">lightbulb</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-primary mb-2 text-sm uppercase tracking-widest">Explanation</h4>
                      <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                        {currentQ.explanation}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Controls */}
              <div className="flex justify-end pt-8 pb-16">
                {!isAnswerSubmitted ? (
                  <button
                    onClick={handleSubmitAnswer}
                    disabled={!selectedAnswer}
                    className="bg-primary hover:bg-primary/90 text-white px-12 py-5 rounded-full font-bold shadow-xl shadow-primary/20 transition-all disabled:opacity-50 disabled:scale-100 active:scale-95 flex items-center gap-3 text-lg"
                  >
                    Check Answer
                    <span className="material-symbols-outlined font-bold">done_all</span>
                  </button>
                ) : (
                  <button
                    onClick={handleNextQuestion}
                    className="bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 px-12 py-5 rounded-full font-bold shadow-xl shadow-slate-900/20 dark:shadow-white/20 transition-all active:scale-95 flex items-center gap-3 group text-lg"
                  >
                    {currentIdx === questions.length - 1 ? 'Finish Exam' : 'Next Question'}
                    <span className="material-symbols-outlined font-bold transition-transform group-hover:translate-x-1">arrow_forward</span>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
