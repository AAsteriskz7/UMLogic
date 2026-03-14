"use client";

import React, { useState } from 'react';
import AppSidebar from '@/components/app-sidebar';

const INITIAL_CODE = `classDiagram
  class User {
    +String username
    +String email
    +login()
    +logout()
  }

  class Admin {
    +deleteUser()
    +updatePermissions()
  }

  User <|-- Admin
  User *-- Profile : composition`;

export default function SandboxPage() {
  const [showSettings, setShowSettings] = useState(false);
  const [activeView, setActiveView] = useState<'editor' | 'preview' | 'split'>('split');

  return (
    <div className="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 antialiased">
      <AppSidebar onSettings={() => setShowSettings(true)} />

      {/* Sandbox Main Area */}
      <div className="flex flex-1 flex-col overflow-hidden">

        {/* Toolbar */}
        <div className="flex items-center justify-between px-6 py-2.5 bg-white dark:bg-slate-900 border-b border-primary/10 shrink-0">
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-3 py-1.5 text-primary bg-primary/5 rounded-lg text-xs font-semibold hover:bg-primary/10 transition-colors">
              <span className="material-symbols-outlined text-sm">content_copy</span>
              Copy Mermaid Code
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 text-primary bg-primary/5 rounded-lg text-xs font-semibold hover:bg-primary/10 transition-colors">
              <span className="material-symbols-outlined text-sm">download</span>
              Download SVG
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 text-white bg-primary rounded-lg text-xs font-semibold hover:opacity-90 transition-colors">
              <span className="material-symbols-outlined text-sm">folder_open</span>
              Load 2340 Template
            </button>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex bg-primary/5 p-1 rounded-xl">
              {(['editor', 'preview', 'split'] as const).map((view) => (
                <button
                  key={view}
                  onClick={() => setActiveView(view)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${activeView === view ? 'bg-white dark:bg-primary text-primary dark:text-white shadow-sm' : 'text-primary/60 dark:text-slate-400'}`}
                >
                  {view === 'split' ? 'Split View' : view.charAt(0).toUpperCase() + view.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main IDE Content */}
        <div className="flex flex-1 overflow-hidden">

          {/* Icon Sidebar */}
          <aside className="w-14 flex flex-col items-center py-5 gap-5 bg-primary dark:bg-primary/20 border-r border-primary/10 shrink-0">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center text-white">
              <span className="material-symbols-outlined text-[20px]">code</span>
            </div>
            <div className="w-9 h-9 rounded-xl hover:bg-white/10 flex items-center justify-center text-white/60 transition-colors cursor-pointer">
              <span className="material-symbols-outlined text-[20px]">description</span>
            </div>
            <div className="w-9 h-9 rounded-xl hover:bg-white/10 flex items-center justify-center text-white/60 transition-colors cursor-pointer">
              <span className="material-symbols-outlined text-[20px]">history</span>
            </div>
            <div className="mt-auto flex flex-col gap-4">
              <div className="w-9 h-9 rounded-xl hover:bg-white/10 flex items-center justify-center text-white/60 transition-colors cursor-pointer">
                <span className="material-symbols-outlined text-[20px]">help</span>
              </div>
            </div>
          </aside>

          {/* Editor Pane */}
          {(activeView === 'editor' || activeView === 'split') && (
            <div className={`flex flex-col bg-slate-800 border-r border-slate-700/50 ${activeView === 'split' ? 'w-1/2' : 'flex-1'}`}>
              <div className="flex items-center px-4 py-2 bg-slate-800/80 border-b border-slate-700/50 justify-between shrink-0">
                <span className="text-slate-400 text-xs font-mono">ClassDiagram.mmd</span>
                <span className="text-slate-500 text-[10px] uppercase tracking-widest font-bold">Mermaid Syntax</span>
              </div>
              <div className="flex-1 p-5 font-mono text-sm overflow-auto leading-relaxed" style={{ scrollbarWidth: 'thin', scrollbarColor: '#00305744 transparent' }}>
                <div className="flex gap-4">
                  <div className="text-slate-600 select-none text-right w-6 text-xs leading-relaxed">
                    {INITIAL_CODE.split('\n').map((_, i) => (
                      <div key={i}>{i + 1}</div>
                    ))}
                  </div>
                  <div className="text-slate-300 text-xs leading-relaxed whitespace-pre">
                    <span className="text-blue-400">classDiagram</span>{'\n'}
                    {'  '}<span className="text-purple-400">class</span> <span className="text-yellow-400">User</span> {'{'}{'\n'}
                    {'    '}+String username{'\n'}
                    {'    '}+String email{'\n'}
                    {'    '}+login(){'\n'}
                    {'    '}+logout(){'\n'}
                    {'  '}{'}'}{'\n'}
                    {'\n'}
                    {'  '}<span className="text-purple-400">class</span> <span className="text-yellow-400">Admin</span> {'{'}{'\n'}
                    {'    '}+deleteUser(){'\n'}
                    {'    '}+updatePermissions(){'\n'}
                    {'  '}{'}'}{'\n'}
                    {'\n'}
                    {'  '}<span className="text-yellow-400">User</span> <span className="text-blue-400">{'<|--'}</span> <span className="text-yellow-400">Admin</span>{'\n'}
                    {'  '}<span className="text-yellow-400">User</span> <span className="text-blue-400">{'*--'}</span> <span className="text-yellow-400">Profile</span> : composition
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Preview Pane */}
          {(activeView === 'preview' || activeView === 'split') && (
            <div className="flex-1 bg-white dark:bg-slate-900 p-8 overflow-auto flex items-center justify-center relative">
              <div className="absolute top-4 left-4 text-xs font-bold text-primary/40 uppercase tracking-widest">Live Preview</div>

              {/* Diagram Mockup */}
              <div className="w-full max-w-md bg-primary/5 dark:bg-white/5 rounded-2xl border-2 border-dashed border-primary/20 p-8">
                <div className="flex flex-col items-center gap-8">
                  {/* Class Box: User */}
                  <div className="w-48 bg-white dark:bg-slate-800 border-2 border-primary rounded-lg overflow-hidden shadow-xl shadow-primary/10">
                    <div className="bg-primary/10 px-3 py-1.5 border-b-2 border-primary text-center font-bold text-sm text-primary dark:text-slate-100">User</div>
                    <div className="p-3 text-xs space-y-1 font-mono text-primary/80 dark:text-slate-300">
                      <div>+ String username</div>
                      <div>+ String email</div>
                      <hr className="my-1.5 border-primary/20" />
                      <div>+ login()</div>
                      <div>+ logout()</div>
                    </div>
                  </div>

                  {/* Connection Arrow */}
                  <div className="flex flex-col items-center">
                    <div className="relative w-0.5 h-12 bg-primary">
                      <div className="absolute -top-3 -left-[7px] border-l-[8px] border-r-[8px] border-b-[12px] border-l-transparent border-r-transparent border-b-primary rotate-180"></div>
                    </div>
                  </div>

                  {/* Class Box: Admin */}
                  <div className="w-48 bg-white dark:bg-slate-800 border-2 border-primary rounded-lg overflow-hidden shadow-xl shadow-primary/10">
                    <div className="bg-primary/10 px-3 py-1.5 border-b-2 border-primary text-center font-bold text-sm text-primary dark:text-slate-100">Admin</div>
                    <div className="p-3 text-xs space-y-1 font-mono text-primary/80 dark:text-slate-300">
                      <div>+ deleteUser()</div>
                      <div>+ updatePermissions()</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Zoom Controls */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-white dark:bg-slate-800 p-2 rounded-xl shadow-2xl border border-primary/10">
                <button className="p-1.5 hover:bg-primary/5 rounded-lg text-primary dark:text-slate-400">
                  <span className="material-symbols-outlined text-lg">zoom_out</span>
                </button>
                <span className="text-xs font-bold text-primary dark:text-slate-300 px-2">100%</span>
                <button className="p-1.5 hover:bg-primary/5 rounded-lg text-primary dark:text-slate-400">
                  <span className="material-symbols-outlined text-lg">zoom_in</span>
                </button>
                <div className="w-px h-4 bg-primary/10 mx-1"></div>
                <button className="p-1.5 hover:bg-primary/5 rounded-lg text-primary dark:text-slate-400">
                  <span className="material-symbols-outlined text-lg">fullscreen</span>
                </button>
              </div>
            </div>
          )}

          {/* Right Panel: Cheat Sheet */}
          <aside className="w-72 bg-white dark:bg-slate-900 border-l border-primary/10 flex flex-col shrink-0">
            <div className="p-4 border-b border-primary/10 flex items-center justify-between">
              <h2 className="text-primary dark:text-slate-100 font-bold text-sm flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">auto_awesome</span>
                Mermaid Cheat Sheet
              </h2>
              <button className="p-1 hover:bg-primary/5 rounded-lg text-primary/40 transition-colors">
                <span className="material-symbols-outlined text-xl">chevron_right</span>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-5 space-y-6" style={{ scrollbarWidth: 'thin', scrollbarColor: '#00305744 transparent' }}>
              {/* Class Diagrams */}
              <div>
                <h3 className="text-xs font-bold text-primary dark:text-slate-400 uppercase tracking-widest mb-3">Class Diagrams</h3>
                <div className="space-y-2">
                  <div className="bg-primary/5 dark:bg-white/5 rounded-xl p-3 border border-primary/5">
                    <p className="text-xs font-bold text-primary dark:text-slate-200 mb-1">Relationships</p>
                    <code className="text-[10px] text-primary/70 dark:text-slate-400 block font-mono bg-white/50 dark:bg-black/20 p-1.5 rounded">
                      Inheritance: {'<|--'}<br />
                      Composition: *--<br />
                      Aggregation: o--<br />
                      Association: --
                    </code>
                  </div>
                  <div className="bg-primary/5 dark:bg-white/5 rounded-xl p-3 border border-primary/5">
                    <p className="text-xs font-bold text-primary dark:text-slate-200 mb-1">Visibility</p>
                    <code className="text-[10px] text-primary/70 dark:text-slate-400 block font-mono bg-white/50 dark:bg-black/20 p-1.5 rounded">
                      + Public<br />
                      - Private<br />
                      # Protected<br />
                      ~ Package/Internal
                    </code>
                  </div>
                </div>
              </div>

              {/* Sequence Diagrams */}
              <div>
                <h3 className="text-xs font-bold text-primary dark:text-slate-400 uppercase tracking-widest mb-3">Sequence Diagrams</h3>
                <div className="bg-primary/5 dark:bg-white/5 rounded-xl p-3 border border-primary/5">
                  <p className="text-xs font-bold text-primary dark:text-slate-200 mb-1">Basic Syntax</p>
                  <code className="text-[10px] text-primary/70 dark:text-slate-400 block font-mono bg-white/50 dark:bg-black/20 p-1.5 rounded">
                    sequenceDiagram<br />
                    {'  '}Alice-&gt;&gt;John: Hello!<br />
                    {'  '}John--&gt;&gt;Alice: Hi Alice!
                  </code>
                </div>
              </div>

              {/* Pro Tip */}
              <div className="bg-primary rounded-2xl p-4 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <span className="material-symbols-outlined text-lg">lightbulb</span>
                  <span className="text-xs font-bold">Pro Tip</span>
                </div>
                <p className="text-[11px] leading-relaxed opacity-80">
                  Use the 2340 Template button to quickly load standard software engineering patterns like Factory, Singleton, or Observer.
                </p>
              </div>
            </div>
          </aside>
        </div>

        {/* Footer Status Bar */}
        <footer className="bg-primary dark:bg-primary/40 px-6 py-1.5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
              <span className="text-white/60 text-[10px] font-bold uppercase">Live Sync Active</span>
            </div>
            <div className="h-3 w-px bg-white/20"></div>
            <span className="text-white/60 text-[10px] font-bold uppercase">Line 14, Col 2</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-white/60 text-[10px] font-bold uppercase">UTF-8</span>
            <span className="text-white/60 text-[10px] font-bold uppercase">Mermaid v10.2.0</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
