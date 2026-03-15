"use client";

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import AppSidebar from '@/components/app-sidebar';
import UCDInteractiveBuild from '@/components/ucd-interactive-build';
import SDInteractiveBuild from '@/components/sd-interactive-build';
import { SSDInteractiveBuild } from '@/components/ssd-interactive-build';
import { DMDInteractiveBuild } from '@/components/dmd-interactive-build';
import { DCDInteractiveBuild } from '@/components/dcd-interactive-build';
import { QUIZ_DATA, Question } from '@/lib/quiz-data';
import { useEffect } from 'react';

const DIAGRAM_TITLES: Record<string, string> = {
  ucd: 'Use Case Diagram',
  dmd: 'Domain Model Diagram',
  ssd: 'System Sequence Diagram',
  sd:  'Sequence Diagram',
  dcd: 'Design Class Diagram',
};

export default function DiagramModule() {
  const params = useParams();
  const diagramType = typeof params?.type === 'string' ? params.type : 'ucd';
  const diagramTitle = DIAGRAM_TITLES[diagramType] ?? 'Diagram Module';
  const [activeTab, setActiveTab] = useState<'info' | 'build' | 'quiz'>('info');

  // Quiz State
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  const questions = QUIZ_DATA[diagramType] || [];
  const currentQuestion = questions[currentQuestionIdx];

  const handleAnswerSelect = (label: string) => {
    if (isAnswerSubmitted) return;
    setSelectedAnswer(label);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIdx < questions.length - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswerSubmitted(false);
    } else {
      setQuizComplete(true);
    }
  };

  const handleSubmitAnswer = () => {
    if (!selectedAnswer || isAnswerSubmitted) return;
    setIsAnswerSubmitted(true);
    if (selectedAnswer === currentQuestion.options.find(o => o.isCorrect)?.label) {
      setScore(prev => prev + 1);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIdx(0);
    setSelectedAnswer(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setQuizComplete(false);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 antialiased">
      <AppSidebar />

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-8 relative">
        <div className="max-w-[1440px] mx-auto">

          {/* Page Header & Tabs */}
          <div className="mb-8">
            <div className="flex flex-col gap-1 mb-6">
              <h1 className="text-3xl font-bold text-primary dark:text-slate-100">{diagramTitle} Construction</h1>
            </div>
            <div className="flex border-b border-primary/10 gap-8">
              <button
                onClick={() => setActiveTab('info')}
                className={`flex items-center gap-2 border-b-2 pb-4 px-2 hover:text-primary transition-all ${activeTab === 'info' ? 'border-primary text-primary' : 'border-transparent text-primary/50'}`}
              >
                <span className="material-symbols-outlined text-sm">info</span>
                <span className="text-sm font-bold uppercase tracking-wider">Information</span>
              </button>
              <button
                onClick={() => setActiveTab('build')}
                className={`flex items-center gap-2 border-b-2 pb-4 px-2 hover:text-primary transition-all ${activeTab === 'build' ? 'border-primary text-primary' : 'border-transparent text-primary/50'}`}
              >
                <span className="material-symbols-outlined text-sm">edit_note</span>
                <span className="text-sm font-bold uppercase tracking-wider">Interactive Build</span>
              </button>
              <button
                onClick={() => setActiveTab('quiz')}
                className={`flex items-center gap-2 border-b-2 pb-4 px-2 hover:text-primary transition-all ${activeTab === 'quiz' ? 'border-primary text-primary' : 'border-transparent text-primary/50'}`}
              >
                <span className="material-symbols-outlined text-sm">quiz</span>
                <span className="text-sm font-bold uppercase tracking-wider">Mini Quiz</span>
              </button>
            </div>
          </div>

          {/* ===== INFORMATION TAB ===== */}
          {activeTab === 'info' && (
            <div className="flex flex-col gap-8 max-w-4xl">
 
              {/* Section 1: Use Case Fundamentals */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-primary/5 overflow-hidden">
                <div className="px-8 py-5 border-b border-primary/5 bg-slate-50/50 dark:bg-slate-800/50 flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary text-[18px]">menu_book</span>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-primary/40 uppercase tracking-widest">Section 01</p>
                    <h2 className="text-base font-bold text-primary dark:text-slate-100">Use Case Fundamentals</h2>
                  </div>
                </div>
 
                <div className="p-8 flex flex-col gap-6">
                  <div className="flex flex-col gap-4">
                    <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                      <span className="font-bold text-primary dark:text-slate-200">Use Cases</span> are text stories used to discover and record functional requirements. They describe interactions between users and a subject.
                    </p>
                    <div className="p-4 bg-primary/5 rounded-xl border border-primary/10">
                       <p className="text-xs font-bold text-primary uppercase tracking-widest mb-1">System under Development (SuD)</p>
                       <p className="text-xs text-slate-500 leading-relaxed italic">The "Subject" is the system currently being built or discussed.</p>
                    </div>
                  </div>
 
                  <div className="flex flex-col gap-3">
                    <p className="text-xs font-bold text-primary/40 uppercase tracking-widest">Core Terms</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        { term: 'Actor', desc: 'Something with behavior, such as a person, computer system, or organization.' },
                        { term: 'Scenario', desc: 'A specific sequence of actions and interactions between actors and the system.' },
                        { term: 'Use Case', desc: 'A collection of related success and failure scenarios describing actors using a system to support a goal.' },
                      ].map((item) => (
                        <div key={item.term} className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-primary/5">
                          <p className="text-xs font-bold text-primary mb-1">{item.term}</p>
                          <p className="text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
 
              {/* Section 2: Use-Case Diagram */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-primary/5 overflow-hidden">
                <div className="px-8 py-5 border-b border-primary/5 bg-slate-50/50 dark:bg-slate-800/50 flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary text-[18px]">account_tree</span>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-primary/40 uppercase tracking-widest">Section 02</p>
                    <h2 className="text-base font-bold text-primary dark:text-slate-100">The Use Case Diagram</h2>
                  </div>
                </div>
 
                <div className="p-8 flex flex-col gap-6">
                  <div className="p-5 bg-primary/5 dark:bg-primary/10 border-l-4 border-primary rounded-r-xl flex flex-col gap-2">
                    <p className="text-xs font-bold text-primary dark:text-slate-200 uppercase tracking-widest">Graphical Depiction</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                      A visual model of the use case interactions within a system.
                    </p>
                    <p className="text-xs text-slate-500">
                      Primary actors: <span className="font-bold">left</span>, Supporting: <span className="font-bold">right</span>, Offstage: <span className="font-bold">bottom</span>.
                    </p>
                  </div>
 
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                      { icon: 'accessibility_new', label: 'Actors (Stick-figures)', desc: 'Nouns representing users/systems.' },
                      { icon: 'radio_button_unchecked', label: 'Use cases (Ellipses)', desc: 'Verbs representing goals.' },
                      { icon: 'timeline', label: 'Associations (Lines)', desc: 'Connecting actors to goals.' },
                    ].map((item) => (
                      <div key={item.label} className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl flex flex-col gap-2 border border-primary/5">
                        <span className="material-symbols-outlined text-primary text-[22px]">{item.icon}</span>
                        <p className="text-[11px] font-bold text-primary dark:text-slate-100">{item.label}</p>
                        <p className="text-[10px] leading-relaxed text-slate-500 dark:text-slate-400">{item.desc}</p>
                      </div>
                    ))}
                  </div>
 
                  <div className="flex flex-col gap-3">
                    <p className="text-xs font-bold text-primary/40 uppercase tracking-widest">Kinds of Actors</p>
                    <div className="flex flex-col gap-2">
                      {[
                        { tag: 'Primary', desc: 'Has user goals fulfilled through using services of the SuD.', badge: 'bg-primary/10 text-primary' },
                        { tag: 'Supporting', desc: 'Provides a service (e.g., database) to the SuD.', badge: 'bg-accent/10 text-accent' },
                        { tag: 'Offstage', desc: 'Has an interest in the behavior but is not primary/supporting.', badge: 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-300' },
                      ].map((a) => (
                        <div key={a.tag} className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                          <span className={`mt-0.5 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase shrink-0 ${a.badge}`}>{a.tag}</span>
                          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">{a.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
 
              {/* Section 3: Use Case Relationships */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-primary/5 overflow-hidden">
                <div className="px-8 py-5 border-b border-primary/5 bg-slate-50/50 dark:bg-slate-800/50 flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-accent/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-accent text-[18px]">swap_horiz</span>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-primary/40 uppercase tracking-widest">Section 03</p>
                    <h2 className="text-base font-bold text-primary dark:text-slate-100">Use Case Relationships</h2>
                  </div>
                </div>
 
                <div className="p-8 flex flex-col gap-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Include */}
                    <div className="flex flex-col gap-4 p-5 rounded-xl border-2 border-primary/10 bg-primary/5 dark:bg-primary/5">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 bg-primary text-white text-[10px] font-bold rounded uppercase tracking-wider font-mono">&lt;&lt;include&gt;&gt;</span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                        Used if a sub-use case or series of steps is used by <span className="font-bold">several</span> use cases.
                      </p>
                      <div className="p-3 bg-white dark:bg-slate-800 rounded-lg border border-primary/10">
                        <p className="text-[10px] text-slate-500 leading-relaxed">
                          Arrow points <span className="font-bold">TO</span> the child use case from the base.
                        </p>
                      </div>
                    </div>
 
                    {/* Extend */}
                    <div className="flex flex-col gap-4 p-5 rounded-xl border-2 border-accent/10 bg-accent/5 dark:bg-accent/5">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 bg-accent text-white text-[10px] font-bold rounded uppercase tracking-wider font-mono">&lt;&lt;extend&gt;&gt;</span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                        Used when a use case may <span className="font-bold italic">optionally</span> take an alternate path (exceptions).
                      </p>
                      <div className="p-3 bg-white dark:bg-slate-800 rounded-lg border border-accent/10">
                        <p className="text-[10px] text-slate-500 leading-relaxed">
                           Arrow points <span className="font-bold">TO</span> the base use case from the child.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
 
              {/* Section 4: Steps to Creating a Use Case Diagram */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-primary/5 overflow-hidden">
                <div className="px-8 py-5 border-b border-primary/5 bg-slate-50/50 dark:bg-slate-800/50 flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary text-[18px]">checklist</span>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-primary/40 uppercase tracking-widest">Section 04</p>
                    <h2 className="text-base font-bold text-primary dark:text-slate-100">Creating a Use Case Diagram</h2>
                  </div>
                </div>
                <div className="p-8 flex flex-col gap-4">
                  <div className="flex flex-col gap-4">
                    {[
                      { step: '01', title: 'Choose the system boundary', desc: 'Identify the System under Discussion (SuD).' },
                      { step: '02', title: 'Identify primary actors', desc: 'Those whose goals are fulfilled by the system.' },
                      { step: '03', title: 'Identify user goals', desc: 'List what each actor wants to achieve.' },
                      { step: '04', title: 'Define use cases', desc: 'Satisfy goals and pass the EBP test.' },
                    ].map((item) => (
                      <div key={item.step} className="flex gap-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-primary/5">
                        <div className="h-9 w-9 rounded-xl bg-primary text-white flex items-center justify-center font-bold text-xs shrink-0">{item.step}</div>
                        <div className="flex flex-col gap-1">
                          <p className="text-sm font-bold text-primary dark:text-slate-100">{item.title}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
 
              {/* Section 5: CampusConnect Example */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-primary/5 overflow-hidden">
                <div className="px-8 py-5 border-b border-primary/5 bg-slate-50/50 dark:bg-slate-800/50 flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-accent/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-accent text-[18px]">hub</span>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-primary/40 uppercase tracking-widest">Section 05</p>
                    <h2 className="text-base font-bold text-primary dark:text-slate-100">Example: CampusConnect - Join Organization</h2>
                  </div>
                </div>
                <div className="p-8 flex flex-col gap-8">
                  <div className="p-5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-primary/5">
                    <p className="text-xs font-bold text-primary uppercase mb-2">Scenario</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed italic">
                      "A student discovers an interesting professional organization on CampusConnect. They navigate to the organization's page and click 'Join'. The system validates their student status and adds them to the roster. If the organization requires approval, an administrator is notified."
                    </p>
                  </div>
 
                  <div className="rounded-xl overflow-hidden border border-primary/5">
                    {[
                      { field: 'Use Case', value: 'Join Organization' },
                      { field: 'Primary Actor', value: 'Student' },
                      { field: 'Supporting Actor', value: 'Student Database, Administrator' },
                      { field: 'Postconditions', value: "Student is added to roster; Administrator notified if approval required." },
                    ].map((row, i) => (
                      <div key={i} className={`grid grid-cols-12 border-t border-primary/5 first:border-t-0 ${i % 2 === 0 ? 'bg-white dark:bg-slate-900' : 'bg-slate-50/50 dark:bg-slate-800/30'}`}>
                        <div className="col-span-4 px-4 py-3 border-r border-primary/5">
                          <p className="text-xs font-bold text-primary dark:text-slate-300">{row.field}</p>
                        </div>
                        <div className="col-span-8 px-4 py-3">
                          <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">{row.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
 
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                       <p className="text-xs font-bold text-primary/40 uppercase tracking-widest">UCD Visualization</p>
                       <span className="text-[10px] text-slate-400 italic">Screenshot Placeholder</span>
                    </div>
                    <div className="aspect-video bg-slate-100 dark:bg-slate-800 rounded-2xl flex flex-col items-center justify-center border-2 border-dashed border-primary/10 group cursor-help transition-all hover:bg-slate-200 dark:hover:bg-slate-700">
                       <div className="h-16 w-16 rounded-full bg-white dark:bg-slate-900 shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                          <span className="material-symbols-outlined text-primary text-3xl">image</span>
                       </div>
                       <p className="text-sm font-bold text-slate-600 dark:text-slate-400 uppercase tracking-tighter">UCD_CampusConnect_JoinOrg.png</p>
                       <p className="text-[10px] text-slate-400 mt-1">Replace with high-res diagram screenshot</p>
                    </div>
                  </div>
 
                  <div className="flex justify-end pt-2">
                    <button
                      onClick={() => setActiveTab('build')}
                      className="flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all"
                    >
                      Step-by-Step Build
                      <span className="material-symbols-outlined text-sm">construction</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ===== INTERACTIVE BUILD TAB ===== */}
          {activeTab === 'build' && (
            <div className="animate-in fade-in duration-500">
              {diagramType === 'ucd' && <UCDInteractiveBuild />}
              {diagramType === 'sd' && <SDInteractiveBuild />}
              {diagramType === 'ssd' && <SSDInteractiveBuild />}
              {diagramType === 'dmd' && <DMDInteractiveBuild />}
              {diagramType === 'dcd' && <DCDInteractiveBuild />}
              {diagramType !== 'ucd' && diagramType !== 'sd' && diagramType !== 'ssd' && diagramType !== 'dmd' && diagramType !== 'dcd' && (
                <div className="h-[500px] flex items-center justify-center border-2 border-dashed border-primary/10 rounded-3xl bg-slate-50/50 dark:bg-slate-800/50">
                  <div className="text-center">
                    <span className="material-symbols-outlined text-4xl text-primary/20 mb-3">construction</span>
                    <p className="text-primary/40 font-medium">Interactive build for {diagramTitle} coming soon!</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ===== QUIZ TAB ===== */}
          {activeTab === 'quiz' && (
            <div className="animate-in fade-in duration-500">
              {quizComplete ? (
                <div className="flex flex-col items-center justify-center py-12 px-6 bg-white dark:bg-slate-900 rounded-3xl border border-primary/10 shadow-xl max-w-2xl mx-auto">
                  <div className="h-20 w-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6">
                    <span className="material-symbols-outlined text-4xl text-green-600">celebration</span>
                  </div>
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">Quiz Complete!</h2>
                  <p className="text-slate-500 dark:text-slate-400 mb-8 text-center">
                    You've successfully completed the {diagramTitle} mini quiz.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 w-full mb-8">
                    <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl border border-primary/5 text-center">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Final Score</p>
                      <p className="text-3xl font-black text-primary">{score} / {questions.length}</p>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl border border-primary/5 text-center">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Accuracy</p>
                      <p className="text-3xl font-black text-primary">{questions.length > 0 ? Math.round((score / questions.length) * 100) : 0}%</p>
                    </div>
                  </div>

                  <div className="flex gap-4 w-full">
                    <button 
                      onClick={resetQuiz}
                      className="flex-1 py-4 px-6 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-all flex items-center justify-center gap-2"
                    >
                      <span className="material-symbols-outlined text-lg">restart_alt</span>
                      Try Again
                    </button>
                    <button 
                      onClick={() => setActiveTab('info')}
                      className="flex-1 py-4 px-6 rounded-2xl bg-primary text-white font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
                    >
                      <span className="material-symbols-outlined text-lg">menu_book</span>
                      Back to Info
                    </button>
                  </div>
                </div>
              ) : questions.length > 0 ? (
                <div className="flex flex-col gap-6">
                  {/* Quiz Header */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                       <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                        {diagramTitle} Mini
                      </span>
                      <span className="text-slate-400 text-xs">•</span>
                      <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                        Question {currentQuestionIdx + 1} of {questions.length}
                      </span>
                    </div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                      Mini Quiz
                    </h1>
                  </div>

                  {/* Question Card */}
                  <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-primary/5 shadow-sm">
                    <p className="text-[10px] font-bold text-primary/40 uppercase tracking-widest mb-4">Question</p>
                    <p className="text-xl font-bold text-slate-800 dark:text-slate-100 leading-relaxed italic">
                      "{currentQuestion.text}"
                    </p>
                    {currentQuestion.codeSnippet && (
                       <div className="mt-6 p-4 bg-slate-900 rounded-xl font-mono text-xs text-slate-300 border border-white/5 overflow-x-auto whitespace-pre">
                         {currentQuestion.codeSnippet}
                       </div>
                    )}
                  </div>

                  {/* Options */}
                  <div className="grid grid-cols-1 gap-3">
                    {currentQuestion.options.map((opt) => {
                      const isSelected = selectedAnswer === opt.label;
                      const showCorrect = isAnswerSubmitted && opt.isCorrect;
                      const showWrong = isAnswerSubmitted && isSelected && !opt.isCorrect;

                      return (
                        <button
                          key={opt.label}
                          onClick={() => handleAnswerSelect(opt.label)}
                          disabled={isAnswerSubmitted}
                          className={`flex items-center gap-4 p-5 rounded-2xl border-2 transition-all text-left group ${
                            showCorrect 
                              ? 'bg-green-50 dark:bg-green-900/10 border-green-500/50' 
                              : showWrong
                              ? 'bg-red-50 dark:bg-red-900/10 border-red-500/50'
                              : isSelected
                              ? 'bg-primary/5 border-primary shadow-sm'
                              : 'bg-white dark:bg-slate-900 border-primary/5 hover:border-primary/20'
                          }`}
                        >
                          <div className={`h-10 w-10 rounded-xl flex items-center justify-center font-bold transition-colors ${
                            showCorrect
                              ? 'bg-green-500 text-white'
                              : showWrong
                              ? 'bg-red-500 text-white'
                              : isSelected
                              ? 'bg-primary text-white'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-400 group-hover:bg-primary/10 group-hover:text-primary'
                          }`}>
                            {opt.label}
                          </div>
                          <div className="flex-1">
                            <p className={`font-semibold text-sm ${
                              isSelected || showCorrect || showWrong
                                ? 'text-slate-900 dark:text-slate-100'
                                : 'text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-100'
                            }`}>
                              {opt.text}
                            </p>
                          </div>
                          {isAnswerSubmitted && opt.isCorrect && (
                            <span className="material-symbols-outlined text-green-500 bg-green-100 dark:bg-green-900/30 p-1.5 rounded-full text-lg">check</span>
                          )}
                          {showWrong && (
                            <span className="material-symbols-outlined text-red-500 bg-red-100 dark:bg-red-900/30 p-1.5 rounded-full text-lg">close</span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Feedback & Navigation */}
                  <div className="flex flex-col gap-6 mt-4">
                    {isAnswerSubmitted && (
                      <div className="bg-primary/5 dark:bg-primary/10 border-l-4 border-primary rounded-r-2xl p-6 animate-in slide-in-from-left duration-500">
                        <div className="flex gap-4">
                          <span className="material-symbols-outlined text-primary">lightbulb</span>
                          <div>
                            <h4 className="font-bold text-primary mb-1 text-sm uppercase tracking-wider">Explanation</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                              {currentQuestion.explanation}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between border-t border-primary/5 pt-8">
                      <button 
                         onClick={() => currentQuestionIdx > 0 && setCurrentQuestionIdx(prev => prev - 1)}
                         disabled={currentQuestionIdx === 0}
                         className="flex items-center gap-2 text-slate-400 hover:text-primary transition-colors font-bold text-sm disabled:opacity-0"
                      >
                        <span className="material-symbols-outlined text-lg">arrow_back</span>
                        Previous
                      </button>

                      {!isAnswerSubmitted ? (
                        <button
                          onClick={handleSubmitAnswer}
                          disabled={!selectedAnswer}
                          className="bg-primary text-white px-10 py-4 rounded-2xl font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all disabled:opacity-50 disabled:grayscale flex items-center gap-2"
                        >
                          Check Answer
                          <span className="material-symbols-outlined text-lg">done_all</span>
                        </button>
                      ) : (
                        <button
                          onClick={handleNextQuestion}
                          className="bg-primary text-white px-10 py-4 rounded-2xl font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all flex items-center gap-3 group"
                        >
                          {currentQuestionIdx === questions.length - 1 ? 'See Results' : 'Next Question'}
                          <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_forward</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="py-20 text-center bg-white dark:bg-slate-900 rounded-3xl border border-primary/10">
                   <span className="material-symbols-outlined text-5xl text-primary/20 mb-4 scale-150">error</span>
                   <p className="text-primary/40 font-bold uppercase tracking-widest text-sm">No quiz questions available yet.</p>
                </div>
              )}
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
