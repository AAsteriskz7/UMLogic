"use client";

import React, { useState } from 'react';

export default function DiagramModule() {
  const [activeTab, setActiveTab] = useState<'purpose' | 'build' | 'quiz'>('build');

  return (
    <div className="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 antialiased">
      {/* SideNavBar - Preserved from Dashboard */}
      <aside className="w-64 bg-primary text-white flex flex-col justify-between p-6 shrink-0">
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-accent flex items-center justify-center text-primary">
              <span className="material-symbols-outlined font-bold">account_tree</span>
            </div>
            <div className="flex flex-col">
              <h1 className="text-white text-lg font-bold leading-none">UMLogic</h1>
              <p className="text-white/60 text-xs font-medium">Object &amp; Design</p>
            </div>
          </div>
          <nav className="flex flex-col gap-2">
            <a className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:bg-white/5 hover:text-white transition-colors" href="/">
              <span className="material-symbols-outlined">dashboard</span>
              <span className="text-sm font-medium">Dashboard</span>
            </a>
            <a className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/10 text-white" href="#">
              <span className="material-symbols-outlined">database</span>
              <span className="text-sm font-medium">Models</span>
            </a>
          </nav>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-8 relative">
        <div className="max-w-[1440px] mx-auto">

          {/* Page Header & Tabs */}
          <div className="mb-8">
            <div className="flex flex-col gap-1 mb-6">
              <h1 className="text-3xl font-bold text-primary dark:text-slate-100">Multi-Modal Learning Module</h1>
              <p className="text-primary/60 dark:text-slate-400 font-medium">Sequence Diagram Construction</p>
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

          {/* ===== INTERACTIVE BUILD TAB ===== */}
          {activeTab === 'build' && (
            <div className="grid grid-cols-12 gap-6">

              {/* Left: Interactive Canvas */}
              <div className="col-span-12 lg:col-span-8 flex flex-col gap-4">
                <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-primary/5 flex-1 min-h-[500px] relative overflow-hidden flex flex-col">

                  {/* Canvas Toolbar */}
                  <div className="p-4 border-b border-primary/5 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
                    <div className="flex gap-2">
                      <span className="px-3 py-1 bg-accent/10 text-accent text-xs font-bold rounded-full uppercase">Step 3 of 12</span>
                      <span className="text-primary/40 text-xs font-medium uppercase tracking-widest px-1">Interactive Editor</span>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-1.5 rounded-lg hover:bg-primary/5 text-primary/60"><span className="material-symbols-outlined text-[20px]">zoom_in</span></button>
                      <button className="p-1.5 rounded-lg hover:bg-primary/5 text-primary/60"><span className="material-symbols-outlined text-[20px]">zoom_out</span></button>
                      <button className="p-1.5 rounded-lg hover:bg-primary/5 text-primary/60"><span className="material-symbols-outlined text-[20px]">fullscreen</span></button>
                    </div>
                  </div>

                  {/* Diagram Content */}
                  <div className="flex-1 p-8 relative overflow-auto">
                    <div className="flex justify-around items-start min-w-[600px] h-full">
                      {/* Lifeline 1 */}
                      <div className="flex flex-col items-center">
                        <div className="px-6 py-3 bg-primary text-white rounded-lg font-bold shadow-md z-10 border-2 border-primary">UI Controller</div>
                        <div className="border-l-2 border-dashed border-primary h-80 opacity-20"></div>
                      </div>
                      {/* Lifeline 2 */}
                      <div className="flex flex-col items-center relative">
                        <div className="px-6 py-3 bg-white dark:bg-slate-800 text-primary dark:text-white rounded-lg font-bold shadow-md z-10 border-2 border-primary">Event Manager</div>
                        <div className="border-l-2 border-dashed border-primary h-80 relative">
                          {/* Interaction Arrows */}
                          <div className="absolute top-10 -left-[160px] w-[160px] h-[2px] bg-primary group">
                            <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-primary whitespace-nowrap">1. checkCapacity(eventID)</span>
                            <div className="absolute -right-2 -top-[5px] border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[8px] border-l-primary"></div>
                          </div>
                          <div className="absolute top-24 -left-[160px] w-[160px] h-[2px] bg-primary/40 border-t border-dashed border-primary/40">
                            <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-primary/40 whitespace-nowrap">2. status: Available</span>
                          </div>
                          {/* Active State Highlight */}
                          <div className="absolute top-40 -left-[160px] w-[160px] h-12 bg-accent/10 border-2 border-accent border-dashed rounded-lg flex items-center justify-center">
                            <span className="text-[10px] font-bold text-accent px-2 text-center leading-tight">3. Logic: validateCapacity()</span>
                          </div>
                        </div>
                      </div>
                      {/* Lifeline 3 */}
                      <div className="flex flex-col items-center">
                        <div className="px-6 py-3 bg-white dark:bg-slate-800 text-primary dark:text-white rounded-lg font-bold shadow-md z-10 border-2 border-primary">Database</div>
                        <div className="border-l-2 border-dashed border-primary h-80 opacity-20"></div>
                      </div>
                    </div>
                  </div>

                  {/* Playback Controller */}
                  <div className="p-6 border-t border-primary/10 bg-white dark:bg-slate-900">
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <button className="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary/90 transition-all shadow-lg">
                            <span className="material-symbols-outlined">play_arrow</span>
                          </button>
                          <button className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary/20 transition-all">
                            <span className="material-symbols-outlined text-[18px]">replay</span>
                          </button>
                          <div className="ml-2">
                            <p className="text-xs font-bold text-primary/40 uppercase tracking-widest">Current Action</p>
                            <p className="text-primary font-bold">Step 3: Event capacity check</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-xs font-bold text-primary/60">03 / 12</span>
                          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary/90 transition-all shadow-sm">
                            Next Step
                            <span className="material-symbols-outlined text-sm">arrow_forward</span>
                          </button>
                        </div>
                      </div>

                      {/* Timeline Slider */}
                      <div className="relative pt-2 pb-4">
                        <div className="h-1.5 w-full bg-primary/10 rounded-full overflow-hidden flex">
                          <div className="h-full bg-primary w-[25%] transition-all"></div>
                        </div>
                        {/* Step Markers */}
                        <div className="absolute top-1.5 left-0 w-full flex justify-between px-1">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary ring-4 ring-white dark:ring-slate-900 -mt-[1px]"></div>
                          <div className="h-1.5 w-1.5 rounded-full bg-primary ring-4 ring-white dark:ring-slate-900 -mt-[1px]"></div>
                          <div className="h-1.5 w-1.5 rounded-full bg-primary ring-4 ring-white dark:ring-slate-900 -mt-[1px]"></div>
                          <div className="h-1.5 w-1.5 rounded-full bg-slate-300 ring-4 ring-white dark:ring-slate-900 -mt-[1px]"></div>
                          <div className="h-1.5 w-1.5 rounded-full bg-slate-300 ring-4 ring-white dark:ring-slate-900 -mt-[1px]"></div>
                          <div className="h-1.5 w-1.5 rounded-full bg-slate-300 ring-4 ring-white dark:ring-slate-900 -mt-[1px]"></div>
                          <div className="h-1.5 w-1.5 rounded-full bg-slate-300 ring-4 ring-white dark:ring-slate-900 -mt-[1px]"></div>
                          <div className="h-1.5 w-1.5 rounded-full bg-slate-300 ring-4 ring-white dark:ring-slate-900 -mt-[1px]"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* Right: Explainer & Traceability */}
              <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
                {/* Contextual Explainer */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-primary/5 flex flex-col gap-4">
                  <div className="flex items-center gap-2 text-primary dark:text-slate-100">
                    <span className="material-symbols-outlined text-accent">lightbulb</span>
                    <h3 className="font-bold text-lg">Contextual Explainer</h3>
                  </div>
                  <div className="space-y-4">
                    <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                      The <span className="font-bold text-primary dark:text-slate-200">checkCapacity()</span> method is triggered when the UI Controller receives a registration request. This asynchronous call ensures the system doesn&apos;t block while waiting for a response from the Event Manager.
                    </p>
                    <div className="p-4 bg-primary/5 rounded-xl border-l-4 border-primary">
                      <p className="text-xs font-bold text-primary mb-1 uppercase tracking-tighter">Pro-Tip</p>
                      <p className="text-xs text-primary/80 italic">Sequence diagrams focus on the order of messages between objects, rather than the internal logic of the objects themselves.</p>
                    </div>
                  </div>
                </div>

                {/* Traceability List */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-primary/5 flex flex-col gap-4">
                  <div className="flex items-center gap-2 text-primary dark:text-slate-100">
                    <span className="material-symbols-outlined text-accent">link</span>
                    <h3 className="font-bold text-lg">Traceability List</h3>
                  </div>
                  <p className="text-xs text-slate-500 uppercase font-bold tracking-widest">DCD Methods Mapping</p>
                  <div className="flex flex-col gap-3">
                    <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center justify-between border border-transparent hover:border-accent/30 transition-all cursor-default">
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-400">EventManager.java</span>
                        <span className="text-sm font-semibold text-primary dark:text-slate-200">validateCapacity()</span>
                      </div>
                      <span className="material-symbols-outlined text-accent text-[20px] fill-1">check_circle</span>
                    </div>
                    <div className="p-3 bg-accent/5 rounded-xl flex items-center justify-between border-2 border-accent transition-all ring-2 ring-accent/10">
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-accent">EventManager.java</span>
                        <span className="text-sm font-bold text-primary dark:text-slate-100">getAvailableSpots()</span>
                      </div>
                      <span className="px-2 py-0.5 bg-accent text-[10px] text-white font-bold rounded uppercase">Active</span>
                    </div>
                    <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center justify-between border border-transparent opacity-60">
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-400">DatabaseProxy.java</span>
                        <span className="text-sm font-semibold text-primary dark:text-slate-200">queryEvent(id)</span>
                      </div>
                      <span className="material-symbols-outlined text-slate-300 text-[20px]">circle</span>
                    </div>
                  </div>
                  <button className="mt-2 w-full py-2 text-xs font-bold text-primary/40 hover:text-primary transition-colors flex items-center justify-center gap-1 uppercase tracking-widest">
                    View Detailed Class Diagram
                    <span className="material-symbols-outlined text-xs">open_in_new</span>
                  </button>
                </div>
              </div>

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
