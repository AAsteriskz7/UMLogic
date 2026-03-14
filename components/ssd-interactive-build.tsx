"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import mermaid from 'mermaid';

interface SSDStep {
  code: string;
  explanation: string;
  proTip: string;
  subtitle: string;
  scenario: string;
}

const SSD_STEPS: SSDStep[] = [
  {
    subtitle: "Primary Actors & Boundaries",
    scenario: "System Setup",
    explanation: "In a System Sequence Diagram (SSD), we treat the entire software as a single 'Black Box'. We only care about external interactions: who is using the system (Priya) and the system itself (CampusConnect).",
    proTip: "Actors are always on the left. The System is represented as a single participant.",
    code: `
sequenceDiagram
    actor Priya
    participant System as CampusConnect System
    `
  },
  {
    subtitle: "System Events (Requests)",
    scenario: "Authentication",
    explanation: "Every interaction starts with a System Event. Here, Priya initiates the session by sending her credentials as a directed request to the system.",
    proTip: "SSDs use 'System Events' to represent inputs from the outside world.",
    code: `
sequenceDiagram
    actor Priya
    participant System as CampusConnect System
    Priya->>System: logIn(credentials)
    `
  },
  {
    subtitle: "System Response",
    scenario: "Authentication",
    explanation: "The system processes the event and returns a confirmation response. Notice that we don't show internal database calls—those belong in a Design Sequence Diagram, not an SSD.",
    proTip: "Dashed lines represent return values or feedback from the system.",
    code: `
sequenceDiagram
    actor Priya
    participant System as CampusConnect System
    Priya->>System: logIn(credentials)
    System-->>Priya: showLoginConfirmation()
    `
  },
  {
    subtitle: "Viewing User State",
    scenario: "Profile Discovery",
    explanation: "Priya needs to see her profile. This event requests information that the system has stored about her current session and affiliations.",
    proTip: "System names should be clear and consistent throughout the diagram.",
    code: `
sequenceDiagram
    actor Priya
    participant System as CampusConnect System
    Priya->>System: logIn(credentials)
    System-->>Priya: showLoginConfirmation()
    Priya->>System: viewProfilePage()
    `
  },
  {
    subtitle: "Metadata Payload",
    scenario: "Profile Discovery",
    explanation: "The system responds with specific data: her organizations and upcoming events. SSDs use parameters to show what information is being transferred.",
    proTip: "Parameters like (organizations, events) define exactly what data is being returned.",
    code: `
sequenceDiagram
    actor Priya
    participant System as CampusConnect System
    Priya->>System: logIn(credentials)
    System-->>Priya: showLoginConfirmation()
    Priya->>System: viewProfilePage()
    System-->>Priya: showProfile(organizations, upcomingEvents)
    `
  },
  {
    subtitle: "Targeted Interaction",
    scenario: "Event Selection",
    explanation: "Priya interacts with a specific item (eventId). In diagrams, we use IDs or names to represent direct references to system entities.",
    proTip: "Unique identifiers in messages help specify which record the user is acting on.",
    code: `
sequenceDiagram
    actor Priya
    participant System as CampusConnect System
    Priya->>System: logIn(credentials)
    System-->>Priya: showLoginConfirmation()
    Priya->>System: viewProfilePage()
    System-->>Priya: showProfile(organizations, upcomingEvents)
    Priya->>System: selectEvent(eventId)
    `
  },
  {
    subtitle: "Data Presentation",
    scenario: "Event Selection",
    explanation: "The System reveals details of the selected event. An SSD clearly shows exactly what information the user receives upon successfully triggering a system event.",
    proTip: "System responses dictate what the UI will eventually display to the user.",
    code: `
sequenceDiagram
    actor Priya
    participant System as CampusConnect System
    Priya->>System: logIn(credentials)
    System-->>Priya: showLoginConfirmation()
    Priya->>System: viewProfilePage()
    System-->>Priya: showProfile(organizations, upcomingEvents)
    Priya->>System: selectEvent(eventId)
    System-->>Priya: showEventDetails(title, description, date, location, registeredCount)
    `
  },
  {
    subtitle: "Complete SSD Review",
    scenario: "Full Scenario",
    explanation: "A complete SSD shows the sequence of events (inputs) and responses (outputs) for a specific scenario. It defines the 'Contract' of how the system behaves externally.",
    proTip: "Use SSDs to identify required System Events before starting internal code design.",
    code: `
sequenceDiagram
    actor Priya
    participant System as CampusConnect System

    Priya->>System: logIn(credentials)
    System-->>Priya: showLoginConfirmation()

    Priya->>System: viewProfilePage()
    System-->>Priya: showProfile(organizations, upcomingEvents)

    Priya->>System: selectEvent(eventId)
    System-->>Priya: showEventDetails(title, description, date, location, registeredCount)

    Priya->>System: logOut()
    System-->>Priya: confirmLogout()
    `
  }
];

export function SSDInteractiveBuild() {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [renderError, setRenderError] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  
  const diagramRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const totalSteps = SSD_STEPS.length;

  const renderDiagram = useCallback(async () => {
    if (!diagramRef.current) return;
    try {
      setRenderError(false);
      
      const mermaidMod = await import('mermaid');
      const mermaid = mermaidMod.default;
      
      mermaid.initialize({
        startOnLoad: false,
        theme: 'default',
        securityLevel: 'loose',
        themeVariables: {
          primaryColor: '#6366f1',
          primaryTextColor: '#ffffff',
          primaryBorderColor: '#4f46e5',
          lineColor: '#6366f1',
          secondaryColor: '#f8fafc',
          tertiaryColor: '#ffffff',
          mainBkg: '#ffffff',
          nodeBorder: '#e2e8f0',
        },
        sequence: {
          actorMargin: 50,
          mirrorActors: false,
          bottomMarginAdj: 10,
          boxTextMargin: 5,
          messageMargin: 40,
          messageFontSize: 12,
          actorFontSize: 13,
          noteFontSize: 12,
        }
      });

      const { svg } = await mermaid.render(`ssd-svg-${step}`, SSD_STEPS[step].code);
      diagramRef.current.innerHTML = svg;
      
      const svgElement = diagramRef.current.querySelector('svg');
      if (svgElement) {
        svgElement.style.maxHeight = '100%';
        svgElement.style.maxWidth = '100%';
        svgElement.style.height = 'auto';
        svgElement.style.width = 'auto';
        svgElement.style.pointerEvents = 'none';
      }
    } catch (err) {
      console.error("Mermaid Render Error:", err);
      setRenderError(true);
    }
  }, [step]);

  useEffect(() => {
    renderDiagram();
  }, [renderDiagram]);

  const next = useCallback(() => {
    if (step < totalSteps - 1) setStep(s => s + 1);
    else setPlaying(false);
  }, [step, totalSteps]);

  const prev = useCallback(() => {
    if (step > 0) setStep(s => s - 1);
  }, [step]);

  const togglePlay = useCallback(() => setPlaying(p => !p), []);

  const reset = useCallback(() => {
    setStep(0);
    setPlaying(false);
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (playing) {
      interval = setInterval(next, 3500);
    }
    return () => clearInterval(interval);
  }, [playing, next]);

  // Zoom Handlers
  const zoomIn = () => setZoom(z => Math.min(z + 0.2, 3));
  const zoomOut = () => setZoom(z => {
    const newZoom = Math.max(z - 0.2, 0.1); 
    if (newZoom <= 0.1) setOffset({x:0, y:0});
    return newZoom;
  });
  const resetZoom = () => { setZoom(1); setOffset({x:0, y:0}); };

  // Pan Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setOffset({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next();
      else if (e.key === 'ArrowLeft') prev();
      else if (e.key === ' ') { e.preventDefault(); togglePlay(); }
      else if (e.key === '=' || e.key === '+') zoomIn();
      else if (e.key === '-') zoomOut();
      else if (e.key === '0') resetZoom();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [next, prev, togglePlay]);

  const s = (showAt: number) => step >= showAt - 1;
  const isNew = (showAt: number) => step === showAt - 1;
  const current = SSD_STEPS[step];
  const pct = ((step + 1) / totalSteps) * 100;

  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-12 lg:col-span-8 flex flex-col gap-4">
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-primary/5 h-[750px] relative overflow-hidden flex flex-col">
          <div className="p-4 border-b border-primary/5 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50 z-10">
            <div className="flex gap-2 items-center">
              <span className="px-3 py-1 bg-accent/10 text-accent text-xs font-bold rounded-full uppercase">
                Step {step + 1} of {totalSteps}
              </span>
              <span className="text-primary/40 text-xs font-medium uppercase tracking-widest px-1">
                System Sequence Diagram — CampusConnect
              </span>
            </div>
            <div className="flex items-center gap-1">
                <button onClick={zoomOut} className="h-8 w-8 rounded-lg flex items-center justify-center text-primary/60 hover:bg-primary/5 hover:text-primary transition-all" title="Zoom Out (-)">
                    <span className="material-symbols-outlined text-lg">zoom_out</span>
                </button>
                <button onClick={resetZoom} className="px-2 h-8 rounded-lg flex items-center justify-center text-[10px] font-bold text-primary/40 hover:bg-primary/5 hover:text-primary transition-all uppercase tracking-tighter" title="Reset Zoom (0)">
                   {Math.round(zoom * 100)}%
                </button>
                <button onClick={zoomIn} className="h-8 w-8 rounded-lg flex items-center justify-center text-primary/60 hover:bg-primary/5 hover:text-primary transition-all" title="Zoom In (+)">
                    <span className="material-symbols-outlined text-lg">zoom_in</span>
                </button>
                {current.scenario && (
                  <span className="ml-3 px-3 py-1 bg-primary/5 text-primary text-[10px] font-bold rounded-full uppercase tracking-wider">
                    {current.scenario}
                  </span>
                )}
            </div>
          </div>

          <div 
            ref={containerRef}
            className={`flex-1 p-4 relative overflow-hidden flex items-center justify-center bg-white cursor-${isDragging ? 'grabbing' : 'grab'}`}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {renderError ? (
              <div className="text-red-500 text-sm p-4 bg-red-50 rounded-xl max-w-md text-center">
                <span className="material-symbols-outlined block text-2xl mb-2">error</span>
                Diagram render error.
              </div>
            ) : (
              <div 
                ref={diagramRef} 
                className="w-full h-full flex items-center justify-center transition-transform duration-200 ease-out origin-center"
                style={{ 
                    transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`,
                }}
              />
            )}
            
            {/* Zoom/Pan Indicator overlay */}
            {(zoom !== 1 || offset.x !== 0 || offset.y !== 0) && (
                <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-primary/90 text-white text-[10px] font-bold rounded-full shadow-lg backdrop-blur-sm pointer-events-none animate-in fade-in slide-in-from-bottom-2">
                    <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-xs">pan_tool</span>
                        Drag to explore
                    </span>
                </div>
            )}
          </div>

          <div className="p-5 border-t border-primary/10 bg-white dark:bg-slate-900 z-10">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button onClick={togglePlay}
                    className="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary/90 transition-all shadow-lg">
                    <span className="material-symbols-outlined font-filled">{playing ? 'pause' : 'play_arrow'}</span>
                  </button>
                  <button onClick={reset}
                    className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary/20 transition-all">
                    <span className="material-symbols-outlined text-[18px]">replay</span>
                  </button>
                  <div className="ml-2">
                    <p className="text-xs font-bold text-primary/40 uppercase tracking-widest">Current Step</p>
                    <p className="text-primary font-bold text-sm leading-tight">{current.subtitle}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-primary/60">{String(step + 1).padStart(2, '0')} / {totalSteps}</span>
                  <button onClick={prev} disabled={step === 0}
                    className="p-2 rounded-lg text-primary hover:bg-primary/5 disabled:opacity-30 disabled:cursor-not-allowed transition-all">
                    <span className="material-symbols-outlined text-sm">arrow_back</span>
                  </button>
                  <button onClick={next} disabled={step >= totalSteps - 1}
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm">
                    Next Step
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                </div>
              </div>
              <div className="relative pt-2 pb-2">
                <div className="h-1.5 w-full bg-primary/10 rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
                </div>
                <div className="absolute top-1.5 left-0 w-full flex justify-between px-0.5" style={{ paddingLeft: '2px', paddingRight: '2px' }}>
                  {SSD_STEPS.map((_, i) => (
                    <button key={i} onClick={() => { setStep(i); setPlaying(false); }}
                      className={`h-2 w-2 rounded-full ring-2 ring-white dark:ring-slate-900 transition-all cursor-pointer ${i <= step ? 'bg-primary' : 'bg-slate-300'} ${i === step ? 'scale-125' : ''}`} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-primary/5 flex flex-col gap-4">
          <div className="flex items-center gap-2 text-primary dark:text-slate-100">
            <span className="material-symbols-outlined text-accent">lightbulb</span>
            <h3 className="font-bold text-lg">Step Explainer</h3>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-xs font-bold text-accent uppercase tracking-widest mb-1">{current.subtitle}</p>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400 font-medium">
                {current.explanation}
              </p>
            </div>
            <div className="p-4 bg-primary/5 rounded-xl border-l-4 border-primary">
              <p className="text-xs font-bold text-primary mb-1 uppercase tracking-tighter">Pro-Tip</p>
              <p className="text-xs text-primary/80 italic leading-relaxed">{current.proTip}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-primary/5 flex flex-col gap-4">
          <div className="flex items-center gap-2 text-primary dark:text-slate-100">
            <span className="material-symbols-outlined text-accent">checklist</span>
            <h3 className="font-bold text-lg">Build Progress</h3>
          </div>
          <div className="flex flex-col gap-1.5">
            {SSD_STEPS.map((item, i) => (
              <div key={i}
                className={`flex items-center gap-3 p-2 rounded-xl transition-all text-sm ${
                  isNew(i + 1)
                    ? 'bg-accent/10 border-2 border-accent ring-2 ring-accent/10 font-bold text-primary'
                    : s(i + 1)
                    ? 'bg-slate-50 dark:bg-slate-800 text-primary dark:text-slate-200'
                    : 'text-slate-400 opacity-50'
                }`}>
                <span className={`material-symbols-outlined text-[16px] ${s(i + 1) ? 'text-accent' : 'text-slate-300'}`}>
                  {s(i + 1) ? 'check_circle' : 'circle'}
                </span>
                <span className="text-[11px] font-bold truncate flex-1">{item.subtitle}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
