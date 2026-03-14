"use client";

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import AppSidebar from '@/components/app-sidebar';
import UCDInteractiveBuild from '@/components/ucd-interactive-build';
import SDInteractiveBuild from '@/components/sd-interactive-build';
import { SSDInteractiveBuild } from '@/components/ssd-interactive-build';

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
  const [activeTab, setActiveTab] = useState<'purpose' | 'build' | 'quiz'>('build');

  return (
    <div className="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 antialiased">
      <AppSidebar />

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-8 relative">
        <div className="max-w-[1440px] mx-auto">

          {/* Page Header & Tabs */}
          <div className="mb-8">
            <div className="flex flex-col gap-1 mb-6">
              <h1 className="text-3xl font-bold text-primary dark:text-slate-100">Multi-Modal Learning Module</h1>
              <p className="text-primary/60 dark:text-slate-400 font-medium">{diagramTitle} Construction</p>
            </div>
            <div className="flex border-b border-primary/10 gap-8">
              <button
                onClick={() => setActiveTab('purpose')}
                className={`flex items-center gap-2 border-b-2 pb-4 px-2 hover:text-primary transition-all ${activeTab === 'purpose' ? 'border-primary text-primary' : 'border-transparent text-primary/50'}`}
              >
                <span className="material-symbols-outlined text-sm">info</span>
                <span className="text-sm font-bold uppercase tracking-wider">Purpose</span>
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
                <span className="text-sm font-bold uppercase tracking-wider">Logic Quiz</span>
              </button>
            </div>
          </div>

             {/* ===== PURPOSE TAB ===== */}
          {activeTab === 'purpose' && (
            <div className="flex flex-col gap-8 max-w-4xl">
 
              {/* Section 0: What is a Use Case? */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-primary/5 overflow-hidden">
                {/* Section Header */}
                <div className="px-8 py-5 border-b border-primary/5 bg-slate-50/50 dark:bg-slate-800/50 flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary text-[18px]">menu_book</span>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-primary/40 uppercase tracking-widest">Section 01</p>
                    <h2 className="text-base font-bold text-primary dark:text-slate-100">What is a Use Case?</h2>
                  </div>
                </div>
 
                <div className="p-8 flex flex-col gap-6">
                  {/* Intro */}
                  <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    A <span className="font-bold text-primary dark:text-slate-200">Use Case</span> is a text story used to discover and record the functional requirements of a system. It describes the interactions between users and a subject — at the requirements level, the subject is the <span className="font-semibold text-primary dark:text-slate-200">System under Development (SuD)</span>.
                  </p>
 
                  {/* Levels of rigor */}
                  <div className="flex flex-col gap-3">
                    <p className="text-xs font-bold text-primary/40 uppercase tracking-widest">Levels of Rigor</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      Use cases can be written at different levels of detail depending on the stage of development and the need for precision.
                    </p>
                    <div className="flex flex-col gap-2">
                      {[
                        {
                          level: 'Brief',
                          badge: 'bg-primary/10 text-primary',
                          bar: 'w-1/4 bg-primary/30',
                          desc: 'A one-paragraph summary of functionality. Used early in discovery to quickly capture scope.',
                        },
                        {
                          level: 'Casual',
                          badge: 'bg-primary/20 text-primary',
                          bar: 'w-2/4 bg-primary/60',
                          desc: 'Multiple paragraphs covering multiple scenarios, including the main success path and common alternatives.',
                        },
                        {
                          level: 'Fully-dressed',
                          badge: 'bg-primary text-white',
                          bar: 'w-full bg-primary',
                          desc: 'A structured, detailed description of all scenarios — preconditions, postconditions, main flow, and extensions.',
                        },
                      ].map((item) => (
                        <div key={item.level} className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-primary/5 flex flex-col gap-2">
                          <div className="flex items-center justify-between">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${item.badge}`}>{item.level}</span>
                            <div className="w-24 h-1.5 bg-primary/10 rounded-full overflow-hidden">
                              <div className={`h-full rounded-full ${item.bar}`}></div>
                            </div>
                          </div>
                          <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
 
              {/* Section 1: What is a Use-Case Diagram? */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-primary/5 overflow-hidden">
                {/* Section Header */}
                <div className="px-8 py-5 border-b border-primary/5 bg-slate-50/50 dark:bg-slate-800/50 flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary text-[18px]">account_tree</span>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-primary/40 uppercase tracking-widest">Section 02</p>
                    <h2 className="text-base font-bold text-primary dark:text-slate-100">What is a Use-Case Diagram?</h2>
                  </div>
                </div>
 
                <div className="p-8 flex flex-col gap-6">
                  {/* Intro paragraph */}
                  <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    A <span className="font-bold text-primary dark:text-slate-200">Use-Case Diagram</span> is a graphical depiction of a use case model — a set of text stories used to discover and record the functional requirements of a system. They visualize the interactions between <span className="font-semibold text-primary dark:text-slate-200">actors</span> (users or external systems) and the <span className="font-semibold text-primary dark:text-slate-200">Subject</span>, which is the system under development (SuD).
                  </p>
 
                  {/* Three core elements grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                      { icon: 'person', label: 'Actors', desc: 'Anything with behavior — a person, computer system, or organization — that interacts with the SuD.', color: 'text-accent' },
                      { icon: 'radio_button_unchecked', label: 'Use Cases', desc: 'A collection of related success and failure scenarios describing how actors use the system to meet a goal.', color: 'text-primary' },
                      { icon: 'timeline', label: 'Scenarios', desc: 'A specific sequence of actions and interactions between actors and the system being discussed.', color: 'text-accent' },
                    ].map((item) => (
                      <div key={item.label} className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl flex flex-col gap-2 border border-primary/5">
                        <span className={`material-symbols-outlined ${item.color} text-[22px]`}>{item.icon}</span>
                        <p className="text-sm font-bold text-primary dark:text-slate-100">{item.label}</p>
                        <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">{item.desc}</p>
                      </div>
                    ))}
                  </div>
 
                  {/* Diagram Structure callout */}
                  <div className="p-5 bg-primary/5 dark:bg-primary/10 border-l-4 border-primary rounded-r-xl flex flex-col gap-2">
                    <p className="text-xs font-bold text-primary dark:text-slate-200 uppercase tracking-widest">Diagram Structure</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      Actors are drawn as <span className="font-semibold text-primary dark:text-slate-200">stick figures</span> labeled with nouns. Use cases appear as <span className="font-semibold text-primary dark:text-slate-200">ellipses</span> labeled with verbs. Lines connect actors to the use cases in which they participate. By convention, the <span className="font-semibold">Primary Actor</span> appears on the left, the <span className="font-semibold">Supporting Actor</span> on the right, and the <span className="font-semibold">Offstage Actor</span> at the bottom.
                    </p>
                  </div>
 
                  {/* Actor types row */}
                  <div className="flex flex-col gap-3">
                    <p className="text-xs font-bold text-primary/40 uppercase tracking-widest">Three Kinds of Actors</p>
                    <div className="flex flex-col gap-2">
                      {[
                        { tag: 'Primary', desc: 'Has user goals fulfilled through using services of the SuD.', badge: 'bg-primary/10 text-primary' },
                        { tag: 'Supporting', desc: 'Provides a service (e.g. information) to the SuD.', badge: 'bg-accent/10 text-accent' },
                        { tag: 'Offstage', desc: 'Has an interest in the behavior of the use case but is neither primary nor supporting.', badge: 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-300' },
                      ].map((a) => (
                        <div key={a.tag} className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                          <span className={`mt-0.5 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase shrink-0 ${a.badge}`}>{a.tag}</span>
                          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{a.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
 
              {/* Section 2: Use Case Relationships */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-primary/5 overflow-hidden">
                {/* Section Header */}
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
                  <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    Use-Case Diagrams support two special stereotyped relationships — <span className="font-mono font-bold text-primary dark:text-slate-200">&lt;&lt;include&gt;&gt;</span> and <span className="font-mono font-bold text-primary dark:text-slate-200">&lt;&lt;extend&gt;&gt;</span> — to model shared behavior and optional alternate paths between use cases.
                  </p>
 
                  {/* Include vs Extend side-by-side */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
 
                    {/* Include */}
                    <div className="flex flex-col gap-4 p-5 rounded-xl border-2 border-primary/10 bg-primary/5 dark:bg-primary/5">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 bg-primary text-white text-[10px] font-bold rounded uppercase tracking-wider font-mono">&lt;&lt;include&gt;&gt;</span>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        Used when one use case is always used by another. Ideal when a sub-use case or series of steps is shared across <span className="font-semibold text-primary dark:text-slate-200">multiple</span> use cases.
                      </p>
                      <div className="p-3 bg-white dark:bg-slate-800 rounded-lg border border-primary/10">
                        <p className="text-xs font-bold text-primary/50 uppercase tracking-widest mb-1">Arrow Direction</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                          Dotted directed arrow from the <span className="font-semibold">base use case</span> → <span className="font-semibold">child use case</span>. The arrowhead points to the child.
                        </p>
                      </div>
                      <div className="p-3 bg-primary/5 rounded-lg border-l-4 border-primary">
                        <p className="text-xs font-bold text-primary mb-1 uppercase tracking-tighter">Example</p>
                        <p className="text-xs text-primary/80 italic">"Process Payment" includes "Validate Card" — every payment requires card validation.</p>
                      </div>
                    </div>
 
                    {/* Extend */}
                    <div className="flex flex-col gap-4 p-5 rounded-xl border-2 border-accent/10 bg-accent/5 dark:bg-accent/5">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 bg-accent text-white text-[10px] font-bold rounded uppercase tracking-wider font-mono">&lt;&lt;extend&gt;&gt;</span>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        Used when a use case may <span className="font-semibold text-primary dark:text-slate-200">optionally</span> take an alternate path. Think of these as exceptions to the typical path in a use case.
                      </p>
                      <div className="p-3 bg-white dark:bg-slate-800 rounded-lg border border-accent/10">
                        <p className="text-xs font-bold text-primary/50 uppercase tracking-widest mb-1">Arrow Direction</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                          Dotted directed arrow from the <span className="font-semibold">child use case</span> → <span className="font-semibold">base use case</span>. The arrowhead points to the base.
                        </p>
                      </div>
                      <div className="p-3 bg-accent/5 rounded-lg border-l-4 border-accent">
                        <p className="text-xs font-bold text-accent mb-1 uppercase tracking-tighter">Example</p>
                        <p className="text-xs text-accent/80 italic">"Apply Discount" extends "Process Payment" — discounts are optional and don't always occur.</p>
                      </div>
                    </div>
 
                  </div>
 
                  {/* Quick-reference comparison table */}
                  <div className="flex flex-col gap-2">
                    <p className="text-xs font-bold text-primary/40 uppercase tracking-widest">Quick Comparison</p>
                    <div className="rounded-xl overflow-hidden border border-primary/5">
                      <div className="grid grid-cols-3 bg-slate-50 dark:bg-slate-800 px-4 py-2">
                        <span className="text-[10px] font-bold text-primary/40 uppercase tracking-widest">Property</span>
                        <span className="text-[10px] font-bold text-primary uppercase tracking-widest font-mono">&lt;&lt;include&gt;&gt;</span>
                        <span className="text-[10px] font-bold text-accent uppercase tracking-widest font-mono">&lt;&lt;extend&gt;&gt;</span>
                      </div>
                      {[
                        { prop: 'Behavior', inc: 'Always executed', ext: 'Optionally executed' },
                        { prop: 'Purpose', inc: 'Shared sub-steps', ext: 'Alternate / exception path' },
                        { prop: 'Arrow tip points to', inc: 'Child use case', ext: 'Base use case' },
                      ].map((row, i) => (
                        <div key={i} className={`grid grid-cols-3 px-4 py-3 border-t border-primary/5 ${i % 2 === 0 ? 'bg-white dark:bg-slate-900' : 'bg-slate-50/50 dark:bg-slate-800/30'}`}>
                          <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{row.prop}</span>
                          <span className="text-xs text-slate-600 dark:text-slate-300">{row.inc}</span>
                          <span className="text-xs text-slate-600 dark:text-slate-300">{row.ext}</span>
                        </div>
                      ))}
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
                    <h2 className="text-base font-bold text-primary dark:text-slate-100">Steps to Creating a Use Case Diagram</h2>
                  </div>
                </div>
                <div className="p-8 flex flex-col gap-4">
                  <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    Follow these four steps to go from a blank page to a complete Use-Case Diagram for any system.
                  </p>
                  <div className="flex flex-col gap-3">
                    {[
                      {
                        step: '01',
                        icon: 'lock',
                        title: 'Choose the system boundary',
                        desc: 'Define the System under Discussion (SuD) — the boundary that separates what is inside your system from external actors.',
                        tip: null,
                      },
                      {
                        step: '02',
                        icon: 'target',
                        title: 'Identify primary actors',
                        desc: 'Find those who have user goals fulfilled through using services of the SuD.',
                        tip: 'Those that have user goals fulfilled through using services of the system.',
                      },
                      {
                        step: '03',
                        icon: 'theater_comedy',
                        title: 'For each actor, identify their user goals',
                        desc: 'List what each primary actor wants to achieve when interacting with the system.',
                        tip: 'Tabulate your findings in a simple actor–goal table to keep track.',
                      },
                      {
                        step: '04',
                        icon: 'science',
                        title: 'Define use cases that satisfy user goals',
                        desc: 'Name each use case according to the goal it fulfills (use verb phrases). Verify each with the Elementary Business Process (EBP) test.',
                        tip: 'Consider the Elementary Business Process (EBP) test for validity of each use case.',
                      },
                    ].map((item) => (
                      <div key={item.step} className="flex gap-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-primary/5">
                        {/* Step number + icon */}
                        <div className="flex flex-col items-center gap-1 shrink-0">
                          <div className="h-9 w-9 rounded-xl bg-primary text-white flex items-center justify-center font-bold text-xs">{item.step}</div>
                          <span className="material-symbols-outlined text-primary/30 text-[18px]">{item.icon}</span>
                        </div>
                        {/* Content */}
                        <div className="flex flex-col gap-1.5 flex-1">
                          <p className="text-sm font-bold text-primary dark:text-slate-100">{item.title}</p>
                          <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">{item.desc}</p>
                          {item.tip && (
                            <div className="mt-1 px-3 py-2 bg-primary/5 rounded-lg border-l-4 border-primary/30">
                              <p className="text-[11px] text-primary/70 italic">{item.tip}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
 
              {/* Section 5: Use Case Example + Diagram */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-primary/5 overflow-hidden">
                <div className="px-8 py-5 border-b border-primary/5 bg-slate-50/50 dark:bg-slate-800/50 flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-accent/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-accent text-[18px]">library_books</span>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-primary/40 uppercase tracking-widest">Section 05</p>
                    <h2 className="text-base font-bold text-primary dark:text-slate-100">Example: Library Management System</h2>
                  </div>
                </div>
                <div className="p-8 flex flex-col gap-8">
 
                  {/* Brief Format */}
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-bold rounded-full uppercase tracking-wider">Brief Format</span>
                      <span className="text-xs text-slate-400 font-medium">Reserve Book</span>
                    </div>
                    <div className="p-5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-primary/5">
                      <p className="text-xs font-bold text-primary dark:text-slate-200 mb-2">Reserve Book</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        A library member is able to reserve books for checkout at a later time. The process begins with the library member logging into the system using their library ID number and password. The member then searches the library's catalog for the desired books and selects the "Reserve" option for each book they wish to save. The system confirms the reservation and saves it in the member's account. When the books are available, the system sends a notification to the member indicating that they can now be checked out.
                      </p>
                    </div>
                  </div>
 
                  {/* Fully-dressed Format */}
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 bg-primary text-white text-[10px] font-bold rounded-full uppercase tracking-wider">Fully-Dressed Format</span>
                      <span className="text-xs text-slate-400 font-medium">Reserve Book</span>
                    </div>
                    <div className="rounded-xl overflow-hidden border border-primary/5">
                      {[
                        { field: 'Use Case 1', value: 'Reserve Book' },
                        { field: 'Primary Actor', value: 'Library Member' },
                        { field: 'Stakeholders & Interests', value: 'Librarian: requests from library members are handled efficiently.' },
                        { field: 'Preconditions', value: 'The Library Member must be registered in the Library Management System. The Library Member must have a valid ID card.' },
                        { field: 'Postcondition', value: "The system has updated the member's account to reflect reserved books. Reserved books are set aside and ready for pickup during library hours. The catalog is updated to reflect current availability. The circulation desk is updated so librarians can manage reservations." },
                      ].map((row, i) => (
                        <div key={i} className={`grid grid-cols-12 border-t border-primary/5 first:border-t-0 ${i % 2 === 0 ? 'bg-white dark:bg-slate-900' : 'bg-slate-50/50 dark:bg-slate-800/30'}`}>
                          <div className="col-span-3 px-4 py-3 border-r border-primary/5">
                            <p className="text-xs font-bold text-primary dark:text-slate-300">{row.field}</p>
                          </div>
                          <div className="col-span-9 px-4 py-3">
                            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{row.value}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
 
                  {/* Corresponding Use Case Diagram */}
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 bg-accent/10 text-accent text-[10px] font-bold rounded-full uppercase tracking-wider">Corresponding Diagram</span>
                      <span className="text-xs text-slate-400 font-medium">Library Management System</span>
                    </div>
                    <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-xl border border-primary/5 overflow-x-auto">
                      <svg viewBox="0 0 760 420" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-3xl mx-auto font-sans">
 
                        {/* ── Arrow marker defs ── */}
                        <defs>
                          <marker id="arr-gray" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                            <path d="M0,0 L0,6 L8,3 z" fill="#94a3b8"/>
                          </marker>
                          <marker id="arr-indigo" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                            <path d="M0,0 L0,6 L8,3 z" fill="#6366f1"/>
                          </marker>
                          <marker id="arr-amber" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                            <path d="M0,0 L0,6 L8,3 z" fill="#f59e0b"/>
                          </marker>
                        </defs>
 
                        {/* ── System boundary box ── */}
                        <rect x="155" y="30" width="450" height="360" rx="12"
                          fill="none" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="8,4"/>
                        {/* System label tab */}
                        <rect x="270" y="22" width="220" height="20" rx="4" fill="#e2e8f0"/>
                        <text x="380" y="36" textAnchor="middle" fontSize="10.5" fontWeight="700"
                          letterSpacing="0.5" fill="#475569">LIBRARY MANAGEMENT SYSTEM</text>
 
                        {/* ══════════════════════════════════════
                            PRIMARY ACTOR — Library Member (left)
                        ══════════════════════════════════════ */}
                        <g transform="translate(72, 160)">
                          <circle cy="-34" r="18" fill="#f8fafc" stroke="#475569" strokeWidth="1.8"/>
                          <line y1="-16" y2="26" stroke="#475569" strokeWidth="1.8"/>
                          <line x1="-20" y1="4" x2="20" y2="4" stroke="#475569" strokeWidth="1.8"/>
                          <line y1="26" x1="-16" y2="58" stroke="#475569" strokeWidth="1.8"/>
                          <line y1="26" x1="16" y2="58" stroke="#475569" strokeWidth="1.8"/>
                          <text y="76" textAnchor="middle" fontSize="11" fontWeight="700" fill="#334155">Library</text>
                          <text y="90" textAnchor="middle" fontSize="11" fontWeight="700" fill="#334155">Member</text>
                          <text y="104" textAnchor="middle" fontSize="9" fill="#94a3b8">(Primary)</text>
                        </g>
 
                        {/* ══════════════════════════════════════
                            SUPPORTING ACTOR — Notification Svc (right)
                        ══════════════════════════════════════ */}
                        <g transform="translate(688, 160)">
                          <circle cy="-34" r="18" fill="#f8fafc" stroke="#475569" strokeWidth="1.8"/>
                          <line y1="-16" y2="26" stroke="#475569" strokeWidth="1.8"/>
                          <line x1="-20" y1="4" x2="20" y2="4" stroke="#475569" strokeWidth="1.8"/>
                          <line y1="26" x1="-16" y2="58" stroke="#475569" strokeWidth="1.8"/>
                          <line y1="26" x1="16" y2="58" stroke="#475569" strokeWidth="1.8"/>
                          <text y="76" textAnchor="middle" fontSize="11" fontWeight="700" fill="#334155">Notification</text>
                          <text y="90" textAnchor="middle" fontSize="11" fontWeight="700" fill="#334155">Service</text>
                          <text y="104" textAnchor="middle" fontSize="9" fill="#94a3b8">(Supporting)</text>
                        </g>
 
                        {/* ══════════════════════════════════════
                            USE CASE ELLIPSES
                            Row 1 (y=100): Login | Reserve Book
                            Row 2 (y=210): Search Catalog | Send Notification
                            Row 3 (y=330): Validate ID  (child – accent border)
                        ══════════════════════════════════════ */}
 
                        {/* Login */}
                        <ellipse cx="270" cy="100" rx="85" ry="28"
                          fill="white" stroke="#475569" strokeWidth="1.6"/>
                        <text x="270" y="104" textAnchor="middle" fontSize="12" fontWeight="600" fill="#1e293b">Login</text>
 
                        {/* Reserve Book */}
                        <ellipse cx="490" cy="100" rx="100" ry="28"
                          fill="white" stroke="#475569" strokeWidth="1.6"/>
                        <text x="490" y="104" textAnchor="middle" fontSize="12" fontWeight="600" fill="#1e293b">Reserve Book</text>
 
                        {/* Search Catalog */}
                        <ellipse cx="270" cy="210" rx="95" ry="28"
                          fill="white" stroke="#475569" strokeWidth="1.6"/>
                        <text x="270" y="214" textAnchor="middle" fontSize="12" fontWeight="600" fill="#1e293b">Search Catalog</text>
 
                        {/* Send Notification */}
                        <ellipse cx="490" cy="210" rx="110" ry="28"
                          fill="white" stroke="#475569" strokeWidth="1.6"/>
                        <text x="490" y="214" textAnchor="middle" fontSize="12" fontWeight="600" fill="#1e293b">Send Notification</text>
 
                        {/* Validate ID — child (accent border) */}
                        <ellipse cx="380" cy="335" rx="95" ry="28"
                          fill="#f0f9ff" stroke="#6366f1" strokeWidth="1.8" strokeDasharray="0"/>
                        <text x="380" y="331" textAnchor="middle" fontSize="12" fontWeight="600" fill="#1e293b">Validate ID</text>
                        <text x="380" y="347" textAnchor="middle" fontSize="9" fill="#6366f1">(child use case)</text>
 
                        {/* ══════════════════════════════════════
                            ASSOCIATION LINES — actor to use case
                        ══════════════════════════════════════ */}
                        {/* Member → Login */}
                        <line x1="91" y1="126" x2="185" y2="103"
                          stroke="#94a3b8" strokeWidth="1.4" markerEnd="url(#arr-gray)"/>
                        {/* Member → Search Catalog */}
                        <line x1="91" y1="163" x2="175" y2="207"
                          stroke="#94a3b8" strokeWidth="1.4" markerEnd="url(#arr-gray)"/>
                        {/* Member → Reserve Book */}
                        <line x1="92" y1="140" x2="390" y2="105"
                          stroke="#94a3b8" strokeWidth="1.4" markerEnd="url(#arr-gray)"/>
                        {/* Notification Service → Send Notification */}
                        <line x1="669" y1="163" x2="600" y2="204"
                          stroke="#94a3b8" strokeWidth="1.4" markerEnd="url(#arr-gray)"/>
 
                        {/* ══════════════════════════════════════
                            <<include>> arrows (indigo dashed)
                            Login → Validate ID
                            Reserve Book → Validate ID
                        ══════════════════════════════════════ */}
                        {/* Login → Validate ID */}
                        <line x1="285" y1="128" x2="353" y2="307"
                          stroke="#6366f1" strokeWidth="1.4" strokeDasharray="6,3"
                          markerEnd="url(#arr-indigo)"/>
                        <rect x="226" y="208" width="72" height="16" rx="3" fill="#eef2ff"/>
                        <text x="262" y="220" textAnchor="middle" fontSize="9" fontStyle="italic" fill="#6366f1">«include»</text>
 
                        {/* Reserve Book → Validate ID */}
                        <line x1="468" y1="128" x2="405" y2="307"
                          stroke="#6366f1" strokeWidth="1.4" strokeDasharray="6,3"
                          markerEnd="url(#arr-indigo)"/>
                        <rect x="415" y="208" width="72" height="16" rx="3" fill="#eef2ff"/>
                        <text x="451" y="220" textAnchor="middle" fontSize="9" fontStyle="italic" fill="#6366f1">«include»</text>
 
                        {/* ══════════════════════════════════════
                            <<extend>> arrow (amber dashed)
                            Send Notification → Reserve Book
                        ══════════════════════════════════════ */}
                        <line x1="490" y1="182" x2="490" y2="128"
                          stroke="#f59e0b" strokeWidth="1.4" strokeDasharray="6,3"
                          markerEnd="url(#arr-amber)"/>
                        <rect x="496" y="148" width="66" height="16" rx="3" fill="#fffbeb"/>
                        <text x="529" y="160" textAnchor="middle" fontSize="9" fontStyle="italic" fill="#d97706">«extend»</text>
 
                      </svg>
 
                      {/* Legend */}
                      <div className="flex flex-wrap gap-5 justify-center mt-4 pt-4 border-t border-primary/5">
                        <div className="flex items-center gap-2">
                          <svg width="28" height="10"><line x1="0" y1="5" x2="22" y2="5" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#arr-gray)"/><polygon points="22,2 28,5 22,8" fill="#94a3b8"/></svg>
                          <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wide">Association</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <svg width="28" height="10"><line x1="0" y1="5" x2="22" y2="5" stroke="#6366f1" strokeWidth="1.5" strokeDasharray="4,2"/><polygon points="22,2 28,5 22,8" fill="#6366f1"/></svg>
                          <span className="text-[10px] text-indigo-500 font-semibold uppercase tracking-wide">«include»</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <svg width="28" height="10"><line x1="0" y1="5" x2="22" y2="5" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4,2"/><polygon points="22,2 28,5 22,8" fill="#f59e0b"/></svg>
                          <span className="text-[10px] text-amber-500 font-semibold uppercase tracking-wide">«extend»</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <svg width="28" height="14"><ellipse cx="14" cy="7" rx="13" ry="6" fill="#f0f9ff" stroke="#6366f1" strokeWidth="1.4"/></svg>
                          <span className="text-[10px] text-indigo-400 font-semibold uppercase tracking-wide">Child Use Case</span>
                        </div>
                      </div>
                    </div>
                  </div>
 
                  {/* CTA */}
                  <div className="flex justify-end pt-2">
                    <button
                      onClick={() => setActiveTab('build')}
                      className="flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all"
                    >
                      Start Building
                      <span className="material-symbols-outlined text-sm">arrow_forward</span>
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
              {diagramType !== 'ucd' && diagramType !== 'sd' && diagramType !== 'ssd' && (
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
            <div className="flex flex-col gap-6">

              {/* Quiz Header */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-primary/10 dark:bg-primary/30 text-primary dark:text-slate-100 px-3 py-1 rounded-full text-xs font-bold uppercase">UML Fundamentals</span>
                  <span className="text-slate-400 text-xs">•</span>
                  <span className="text-slate-500 dark:text-slate-400 text-xs font-medium uppercase tracking-wider">Module 4: GRASP Patterns</span>
                </div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Question 4 of 10</h1>
              </div>

              {/* Split Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                {/* Left Column: Diagram Reference */}
                <div className="lg:col-span-5 flex flex-col gap-4">
                  <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-primary/10 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-sm text-primary dark:text-slate-100 uppercase tracking-widest">Class Diagram Reference</h3>
                      <span className="material-symbols-outlined text-slate-400 scale-75">zoom_in</span>
                    </div>
                    {/* Placeholder diagram box */}
                    <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-6 min-h-[200px] flex items-center justify-center border border-primary/10">
                      <div className="text-center">
                        <span className="material-symbols-outlined text-primary/20 text-5xl block mb-2">schema</span>
                        <p className="text-xs text-slate-400 font-medium">Class diagram loads here</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column: Question & Options */}
                <div className="lg:col-span-7 flex flex-col gap-6">
                  {/* Question */}
                  <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-primary/10 shadow-sm">
                    <p className="text-xs font-bold text-primary/50 uppercase tracking-widest mb-3">Question</p>
                    <p className="text-lg font-semibold text-slate-800 dark:text-slate-100 leading-relaxed">
                      In a GRASP Controller pattern, which class is most appropriate to handle the system event <span className="font-mono text-primary font-bold">makeNewSale()</span>?
                    </p>
                  </div>

                  {/* Answer Options */}
                  <div className="flex flex-col gap-3">
                    {[
                      { label: 'A', text: 'Register (domain object representing a physical register)', correct: false, selected: false },
                      { label: 'B', text: 'POSSystem or Register — a facade or use case controller', correct: true, selected: true },
                      { label: 'C', text: 'The UI layer class that directly handles user input', correct: false, selected: false },
                      { label: 'D', text: 'onSystemTrigger()', correct: false, selected: false },
                    ].map((opt) => (
                      <div
                        key={opt.label}
                        className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                          opt.selected && opt.correct
                            ? 'bg-green-50 dark:bg-green-900/20 border-green-500'
                            : opt.selected && !opt.correct
                            ? 'bg-red-50 dark:bg-red-900/20 border-red-400'
                            : 'bg-slate-50 dark:bg-slate-700/50 border-transparent hover:border-primary/30'
                        }`}
                      >
                        <span className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
                          opt.selected && opt.correct
                            ? 'bg-green-500 text-white'
                            : opt.selected && !opt.correct
                            ? 'bg-red-400 text-white'
                            : 'bg-primary/10 text-primary'
                        }`}>{opt.label}</span>
                        <div className="flex-1">
                          <p className="font-medium text-slate-700 dark:text-slate-200">{opt.text}</p>
                        </div>
                        {opt.selected && (
                          <span className="material-symbols-outlined text-xl">
                            {opt.correct ? 'check_circle' : 'radio_button_unchecked'}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Detailed Logic Explanation Card */}
                  <div className="bg-primary/5 dark:bg-primary/10 border-l-4 border-primary rounded-r-xl p-6">
                    <div className="flex items-start gap-4">
                      <div className="mt-1">
                        <span className="material-symbols-outlined text-primary dark:text-slate-100">lightbulb</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-primary dark:text-slate-100 mb-2">Detailed Logic Explanation: GRASP Controller</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                          The <span className="font-semibold italic">Controller</span> pattern assigns the responsibility of dealing with system events to a non-UI class that represents the overall system (a façade) or a use case scenario. In the POS example, <span className="font-mono text-primary font-bold">makeNewSale()</span> is the entry point system operation. Generic names like <span className="italic">handleRequest</span> are often associated with generic front controllers rather than the domain-specific logic represented in this diagram.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Navigation */}
                  <div className="flex items-center justify-between pt-4">
                    <button className="flex items-center gap-2 text-slate-500 hover:text-primary font-bold text-sm transition-colors">
                      <span className="material-symbols-outlined">arrow_back</span>
                      Previous
                    </button>
                    <button className="bg-primary text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-primary/30 hover:bg-primary/90 transition-all flex items-center gap-2">
                      Next Question
                      <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </button>
                  </div>

                </div>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
