"use client";

import React, { useState, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import AppSidebar from '@/components/app-sidebar';
import Editor, { OnMount } from '@monaco-editor/react';
import { toPng } from 'html-to-image';
import MermaidDiagram from '@/components/mermaid-diagram';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const TEMPLATE_2340 = `sequenceDiagram\n  actor C as Client\n  participant S as Server\n  participant DB as Database\n  C->>S: GET /api/users\n  S->>DB: query users\n  DB-->>S: return data\n  S-->>C: send 200 OK`;

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
  const [code, setCode] = useState(INITIAL_CODE);
  const [cursorPos, setCursorPos] = useState({ line: 1, column: 1 });
  const [showCheatSheet, setShowCheatSheet] = useState(true);
  const [zoom, setZoom] = useState(1);
  const [diagramName, setDiagramName] = useState('Untitled Diagram');
  const previewRef = useRef<HTMLDivElement>(null);

  const handleEditorDidMount: OnMount = (editor) => {
    editor.onDidChangeCursorPosition((e) => {
      setCursorPos({ line: e.position.lineNumber, column: e.position.column });
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    alert("Copied Mermaid code to clipboard!");
  };

  const downloadImage = async () => {
    if (!previewRef.current) return;
    try {
      // The filter prevents html-to-image from trying to read CSS rules that are cross-origin
      // or from injected fonts that cause Security/Syntax errors.
      const filter = (node: HTMLElement) => {
        // Skip Monaco Editor and other UI elements
        const exclusionClasses = ['monaco-editor', 'codicon'];
        if (exclusionClasses.some(cls => node.classList?.contains(cls))) return false;
        
        // Skip external stylesheets that cause SecurityErrors when scanned
        if (node.tagName === 'LINK' || node.tagName === 'STYLE') return false;

        return true;
      };

      const dataUrl = await toPng(previewRef.current, { 
        backgroundColor: '#ffffff',
        filter,
        // Prevent SecurityError/SyntaxError from external font access
        skipFonts: true,
        fontEmbedCSS: '',
        // Ensure we capture it at a decent resolution regardless of current zoom
        pixelRatio: 2,
        // Force a slight delay to ensure rendering is complete
        cacheBust: true,
      });
      
      const link = document.createElement('a');
      const fileName = diagramName.trim() ? diagramName.trim() : 'diagram';
      link.download = `${fileName}-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to download image', err);
      alert('Failed to download image. Please check the console for details.');
    }
  };

  const loadTemplate = () => {
    setCode(TEMPLATE_2340);
  };

  const handleZoom = (type: 'in' | 'out' | 'reset') => {
    if (type === 'in') setZoom(z => Math.min(z + 0.1, 2));
    else if (type === 'out') setZoom(z => Math.max(z - 0.1, 0.5));
    else setZoom(1);
  };

  const handleClearStorage = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 antialiased">
      <AppSidebar onSettings={() => setShowSettings(true)} />

      {/* Sandbox Main Area */}
      <div className="flex flex-1 flex-col overflow-hidden">

        {/* Toolbar */}
        <div className="flex items-center justify-between px-6 py-2.5 bg-white dark:bg-slate-900 border-b border-primary/10 shrink-0">
          <div className="flex items-center gap-2">
            <button onClick={copyToClipboard} className="flex items-center gap-2 px-3 py-1.5 text-primary bg-primary/5 rounded-lg text-xs font-semibold hover:bg-primary/10 transition-colors">
              <span className="material-symbols-outlined text-sm">content_copy</span>
              Copy Mermaid Code
            </button>
            <button onClick={downloadImage} className="flex items-center gap-2 px-3 py-1.5 text-primary bg-primary/5 rounded-lg text-xs font-semibold hover:bg-primary/10 transition-colors">
              <span className="material-symbols-outlined text-sm">download</span>
              Download PNG
            </button>
            <button onClick={loadTemplate} className="flex items-center gap-2 px-3 py-1.5 text-white bg-primary rounded-lg text-xs font-semibold hover:opacity-90 transition-colors">
              <span className="material-symbols-outlined text-sm">folder_open</span>
              Load 2340 Template
            </button>
            <div className="h-6 w-px bg-primary/10 mx-1"></div>
            <div className="flex items-center gap-2 px-3 py-1 bg-primary/5 rounded-lg">
              <span className="material-symbols-outlined text-sm text-primary/40">edit</span>
              <input
                type="text"
                value={diagramName}
                onChange={(e) => setDiagramName(e.target.value)}
                placeholder="Diagram Name"
                className="bg-transparent border-none outline-none text-xs font-bold text-primary placeholder:text-primary/30 w-40"
              />
            </div>
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
            <button 
              onClick={() => setShowCheatSheet(!showCheatSheet)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${showCheatSheet ? 'bg-primary text-white' : 'bg-primary/5 text-primary hover:bg-primary/10'}`}
            >
              <span className="material-symbols-outlined text-sm">{showCheatSheet ? 'visibility_off' : 'visibility'}</span>
              Cheat Sheet
            </button>
          </div>
        </div>

        {/* Main IDE Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Editor Pane */}
          {(activeView === 'editor' || activeView === 'split') && (
            <div className={`flex flex-col bg-slate-800 border-r border-slate-700/50 ${activeView === 'split' ? 'w-1/2' : 'flex-1'}`}>
              <div className="flex items-center px-4 py-2 bg-slate-800/80 border-b border-slate-700/50 justify-between shrink-0">
                <span className="text-slate-400 text-xs font-mono">ClassDiagram.mmd</span>
                <span className="text-slate-500 text-[10px] uppercase tracking-widest font-bold">Mermaid Syntax</span>
              </div>
              <div className="flex-1 overflow-hidden">
                <Editor
                  height="100%"
                  language="yaml"
                  theme="vs-dark"
                  value={code}
                  onChange={(val) => setCode(val || '')}
                  onMount={handleEditorDidMount}
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                    padding: { top: 16 },
                    scrollBeyondLastLine: false,
                    wordWrap: 'on',
                    lineNumbersMinChars: 3
                  }}
                />
              </div>
            </div>
          )}

          {/* Preview Pane */}
          {(activeView === 'preview' || activeView === 'split') && (
            <div className="flex-1 bg-white dark:bg-slate-900 overflow-auto flex items-center justify-center relative p-8">
              <div className="absolute top-4 left-4 text-xs font-bold text-primary/40 uppercase tracking-widest z-10">Live Preview</div>

              <div ref={previewRef} className="w-full h-full pb-16 flex items-center justify-center bg-white dark:bg-slate-900 overflow-hidden">
                <MermaidDiagram code={code} zoom={zoom} />
              </div>

              {/* Zoom Controls */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-white dark:bg-slate-800 p-2 rounded-xl shadow-2xl border border-primary/10 z-10">
                <button onClick={() => handleZoom('out')} className="p-1.5 hover:bg-primary/5 rounded-lg text-primary dark:text-slate-400">
                  <span className="material-symbols-outlined text-lg">zoom_out</span>
                </button>
                <span className="text-xs font-bold text-primary dark:text-slate-300 px-2">{Math.round(zoom * 100)}%</span>
                <button onClick={() => handleZoom('in')} className="p-1.5 hover:bg-primary/5 rounded-lg text-primary dark:text-slate-400">
                  <span className="material-symbols-outlined text-lg">zoom_in</span>
                </button>
                <div className="w-px h-4 bg-primary/10 mx-1"></div>
                <button onClick={() => handleZoom('reset')} className="p-1.5 hover:bg-primary/5 rounded-lg text-primary dark:text-slate-400">
                  <span className="material-symbols-outlined text-lg">restart_alt</span>
                </button>
              </div>
            </div>
          )}

          {/* Right Panel: Cheat Sheet */}
          {showCheatSheet && (
            <aside className="w-72 bg-white dark:bg-slate-900 border-l border-primary/10 flex flex-col shrink-0">
              <div className="p-4 border-b border-primary/10 flex items-center justify-between">
                <h2 className="text-primary dark:text-slate-100 font-bold text-sm flex items-center gap-2">
                  <span className="material-symbols-outlined text-lg">auto_awesome</span>
                  Mermaid Cheat Sheet
                </h2>
                <button 
                  onClick={() => setShowCheatSheet(false)}
                  className="p-1 hover:bg-primary/5 rounded-lg text-primary/40 transition-colors"
                >
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
          )}
        </div>

        {/* Footer Status Bar */}
        <footer className="bg-primary dark:bg-primary/40 px-6 py-1.5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
              <span className="text-white/60 text-[10px] font-bold uppercase">Live Sync Active</span>
            </div>
            <div className="h-3 w-px bg-white/20"></div>
            <span className="text-white/60 text-[10px] font-bold uppercase">Line {cursorPos.line}, Col {cursorPos.column}</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-white/60 text-[10px] font-bold uppercase">UTF-8</span>
            <span className="text-white/60 text-[10px] font-bold uppercase">Mermaid v10.2.0</span>
          </div>
        </footer>
      </div>

      {/* Settings Dialog */}
      <AnimatePresence>
        {showSettings && (
          <Dialog open={showSettings} onOpenChange={setShowSettings}>
            <DialogContent className="sm:max-w-md font-display">
              <DialogHeader>
                <DialogTitle>Settings</DialogTitle>
                <DialogDescription>Manage your sandbox preferences and local storage.</DialogDescription>
              </DialogHeader>
              <div className="flex flex-col gap-4 py-4">
                <div className="flex flex-col gap-2">
                  <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">Danger Zone</h4>
                  <motion.button
                    onClick={handleClearStorage}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 px-4 bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 font-bold rounded-xl text-sm flex items-center justify-center gap-2 hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                  >
                    <span className="material-symbols-outlined">delete_forever</span>
                    Clear Local Storage &amp; Reset Editor
                  </motion.button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </div>
  );
}
