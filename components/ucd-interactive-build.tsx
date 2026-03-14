"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';

// ─── Step data ──────────────────────────────────────────────────────
interface BuildStep {
  id: number;
  title: string;
  subtitle: string;
  explanation: string;
  proTip: string;
  scenario: string | null;
}

const UCD_STEPS: BuildStep[] = [
  {
    id: 1,
    title: "Define the System Boundary",
    subtitle: "CampusConnect System",
    explanation: "Every Use Case Diagram begins with defining the System Boundary — a rectangle that represents the scope of your System under Discussion (SuD). Here, CampusConnect is our system. Everything inside this box is functionality the system provides; everything outside represents external entities that interact with it.",
    proTip: "The system boundary defines WHAT the system does — not HOW. Use cases represent goals, not implementation steps.",
    scenario: null,
  },
  {
    id: 2,
    title: "Identify Primary Actors",
    subtitle: "Student, President, Officer",
    explanation: "Primary Actors have user goals fulfilled through using services of the system. From our scenarios: Student (Jordan, Priya) wants to join clubs and view events; President (Maya) reviews membership requests; Officer (Daniel) creates events. Primary actors are placed on the left side of the diagram.",
    proTip: "Name actors with nouns. Ask: 'Who has goals to accomplish using this system?'",
    scenario: "Scenarios 1, 2 & 3",
  },
  {
    id: 3,
    title: "Identify Supporting Actor",
    subtitle: "External Authentication System",
    explanation: "The External Authentication System is a Supporting Actor — it provides a service (credential verification) to CampusConnect but doesn't initiate use cases. From Scenario 1: Jordan 'logs into CampusConnect using the university's external authentication system.' Supporting actors are placed on the right side.",
    proTip: "Supporting actors provide services to the system. They don't initiate interactions — they respond to them.",
    scenario: "Scenario 1",
  },
  {
    id: 4,
    title: "Add Use Case: Login to System",
    subtitle: "UC1 — Core functionality",
    explanation: "Login to System is a fundamental use case used by all three primary actors. This comes directly from all three scenarios — Jordan, Daniel, and Priya all 'log into CampusConnect' as their very first step before performing any other actions.",
    proTip: "Use cases should be named with verb phrases that describe a goal: 'Login to System', not just 'Login'.",
    scenario: "All Scenarios",
  },
  {
    id: 5,
    title: "Connect Actors to Login",
    subtitle: "Association lines",
    explanation: "Association lines (solid) connect actors to the use cases they participate in. All three primary actors need Login, so we draw three association lines to UC1. We also connect UC1 to the External Auth System since the login process relies on external credential verification.",
    proTip: "A solid line (association) means the actor participates in the use case. It does NOT imply direction — it's bidirectional.",
    scenario: "All Scenarios",
  },
  {
    id: 6,
    title: "Add: Search for Organization",
    subtitle: "UC2 — Scenario 1",
    explanation: "From Scenario 1: after logging in, Jordan 'searches for the club and submits a membership request.' Search for Organization allows students to find organizations on the platform. We also draw an association from Student to this use case.",
    proTip: "Each use case should pass the Elementary Business Process (EBP) test: it provides measurable value to an actor.",
    scenario: "Scenario 1",
  },
  {
    id: 7,
    title: "Add: Submit Membership Request",
    subtitle: "UC3 — with «include» relationship",
    explanation: "From Scenario 1: Jordan 'submits a membership request.' Notice the «include» relationship: submitting a membership request always requires searching for the organization first. The dashed arrow points FROM the base use case (Submit Membership Request) TO the included use case (Search for Organization).",
    proTip: "«include» = ALWAYS happens. The arrow points FROM the base use case TO the included sub-use case.",
    scenario: "Scenario 1",
  },
  {
    id: 8,
    title: "Add: Review Membership Request",
    subtitle: "UC4 — President only",
    explanation: "From Scenario 1: Maya, the president, 'reviews pending membership requests and approves Jordan's request.' This use case is connected only to the President actor — only they have the authority to approve or reject memberships.",
    proTip: "Consider who has the authority to perform each action. Only Presidents can review memberships — Officers and Students cannot.",
    scenario: "Scenario 1",
  },
  {
    id: 9,
    title: "Add: Create Event",
    subtitle: "UC5 — Officer only",
    explanation: "From Scenario 2: Daniel, an officer, 'creates a new event by entering the title, description, date, location, and maximum capacity.' This use case captures the event creation workflow and is connected only to the Officer actor.",
    proTip: "Officers and Presidents have different responsibilities. Daniel (Officer) creates events; Maya (President) reviews memberships.",
    scenario: "Scenario 2",
  },
  {
    id: 10,
    title: "Add: View Profile / Upcoming Events",
    subtitle: "UC7 — with «include» of Login",
    explanation: "From Scenario 3: Priya 'views her profile page, which displays all organizations she belongs to along with upcoming events.' The «include» relationship with Login means viewing your profile always requires being authenticated. The arrow points from UC7 to UC1.",
    proTip: "The «include» relationship with Login avoids drawing redundant login connections to other use cases.",
    scenario: "Scenario 3",
  },
  {
    id: 11,
    title: "Add: RSVP to Event",
    subtitle: "UC6 — with «extend» relationship",
    explanation: "From Scenarios 2 & 3: Students may RSVP to events they discover. The «extend» relationship means RSVP is an optional extension of viewing events — not everyone who views events will RSVP. The dashed arrow points FROM the extending use case (UC6) TO the base use case (UC7).",
    proTip: "«extend» = OPTIONAL behavior. RSVP doesn't always happen when viewing events. Think of extend as conditional.",
    scenario: "Scenarios 2 & 3",
  },
  {
    id: 12,
    title: "Complete Diagram Review",
    subtitle: "Internal consistency check",
    explanation: "The complete Use Case Diagram shows all actors, use cases, associations, «include» and «extend» relationships for CampusConnect. Verify internal consistency: the operations shown here should trace forward to your SSD, SD, and DCD. Every actor has clear goals, every use case passes the EBP test.",
    proTip: "Verify that SSD operations, SD messages, and DCD methods all align with these use cases for full traceability.",
    scenario: "All Scenarios",
  },
];

// ─── Mermaid code generator ─────────────────────────────────────────
const SF = `<img src='data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 64 80%22><circle cx=%2232%22 cy=%2212%22 r=%2210%22 stroke=%22black%22 stroke-width=%223%22 fill=%22none%22/><line x1=%2232%22 y1=%2222%22 x2=%2232%22 y2=%2252%22 stroke=%22black%22 stroke-width=%223%22/><line x1=%2216%22 y1=%2232%22 x2=%2248%22 y2=%2232%22 stroke=%22black%22 stroke-width=%223%22/><line x1=%2232%22 y1=%2252%22 x2=%2218%22 y2=%2276%22 stroke=%22black%22 stroke-width=%223%22/><line x1=%2232%22 y1=%2252%22 x2=%2246%22 y2=%2276%22 stroke=%22black%22 stroke-width=%223%22/></svg>' width='30'>`;

function buildMermaidCode(step: number): string {
  const showActorsLeft    = step >= 1; 
  const showAuth          = step >= 2; 
  const showUC1           = step >= 3; 
  const showUC1Conns      = step >= 4; 
  const showUC2           = step >= 5; 
  const showUC3           = step >= 6; 
  const showUC4           = step >= 7; 
  const showUC5           = step >= 8; 
  const showUC7           = step >= 9; 
  const showUC6           = step >= 10;

  const lines: string[] = [];

  lines.push(`---`);
  lines.push(`config:`);
  lines.push(`  layout: dagre`);
  lines.push(`  securityLevel: loose`);
  lines.push(`---`);
  lines.push(`flowchart LR`);
  lines.push(``);

  if (showActorsLeft) {
    lines.push(`    subgraph Actors_Left[" "]`);
    lines.push(`        direction TB`);
    lines.push(`        Student@{ label: "${SF}<br>Student" }`);
    lines.push(`        President@{ label: "${SF}<br>President" }`);
    lines.push(`        Officer@{ label: "${SF}<br>Officer" }`);
    lines.push(`    end`);
    lines.push(``);
  }

  lines.push(`    subgraph CampusConnect_System["<b style='font-size: 1.25em;'>System</b>"]`);
  lines.push(`        direction TB`);
  if (showUC2) lines.push(`        UC2(["Search for Organization"])`);
  if (showUC3) lines.push(`        UC3(["Submit Membership Request"])`);
  if (showUC7) lines.push(`        UC7(["View Profile / Upcoming Events"])`);
  if (showUC6) lines.push(`        UC6(["RSVP to Event"])`);
  if (showUC4) lines.push(`        UC4(["Review Membership Request"])`);
  if (showUC5) lines.push(`        UC5(["Create Event"])`);
  if (showUC1) lines.push(`        UC1(["Login to System"])`);
  if (!showUC1 && !showUC2 && !showUC3 && !showUC4 && !showUC5 && !showUC6 && !showUC7) {
    lines.push(`        _sys[" "]`);
    lines.push(`        style _sys fill:#BBDEFB,stroke:none,color:#BBDEFB`);
  }
  lines.push(`    end`);
  lines.push(``);

  if (showAuth) {
    lines.push(`    subgraph Actors_Right[" "]`);
    lines.push(`        direction TB`);
    lines.push(`        Auth@{ label: "${SF}<br>External Auth<br>System" }`);
    lines.push(`    end`);
    lines.push(``);
  }

  if (showUC1Conns) {
    if (showActorsLeft) {
      lines.push(`    Student --- UC1`);
      lines.push(`    President --- UC1`);
      lines.push(`    Officer --- UC1`);
    }
    if (showAuth) lines.push(`    UC1 --- Auth`);
  }

  if (showUC2 && showActorsLeft) lines.push(`    Student --- UC2`);

  if (showUC3 && showActorsLeft) {
    lines.push(`    Student --- UC3`);
    lines.push(`    UC3 -. "«include»" .-> UC2`);
  }

  if (showUC4 && showActorsLeft) lines.push(`    President --- UC4`);
  if (showUC5 && showActorsLeft) lines.push(`    Officer --- UC5`);

  if (showUC7 && showActorsLeft) {
    lines.push(`    Student --- UC7`);
    lines.push(`    UC7 -. "«include»" .-> UC1`);
  }

  if (showUC6 && showActorsLeft) {
    lines.push(`    Student --- UC6`);
    lines.push(`    UC6 -. "«extend»" .-> UC7`);
  }

  lines.push(``);

  if (showActorsLeft) {
    lines.push(`    Student@{ shape: rect}`);
    lines.push(`    President@{ shape: rect}`);
    lines.push(`    Officer@{ shape: rect}`);
    lines.push(`    style Student fill:none,stroke:none`);
    lines.push(`    style President fill:none,stroke:none`);
    lines.push(`    style Officer fill:none,stroke:none`);
    lines.push(`    style Actors_Left fill:none,stroke:none`);
  }
  if (showAuth) {
    lines.push(`    Auth@{ shape: rect}`);
    lines.push(`    style Auth fill:none,stroke:none`);
    lines.push(`    style Actors_Right fill:none,stroke:none`);
  }

  if (showUC1) lines.push(`    style UC1 fill:#fff,stroke:#333,stroke-width:2px`);
  if (showUC2) lines.push(`    style UC2 fill:#fff,stroke:#333,stroke-width:2px`);
  if (showUC3) lines.push(`    style UC3 fill:#fff,stroke:#333,stroke-width:2px`);
  if (showUC4) lines.push(`    style UC4 fill:#fff,stroke:#333,stroke-width:2px`);
  if (showUC5) lines.push(`    style UC5 fill:#fff,stroke:#333,stroke-width:2px`);
  if (showUC6) lines.push(`    style UC6 fill:#fff,stroke:#333,stroke-width:2px`);
  if (showUC7) lines.push(`    style UC7 fill:#fff,stroke:#333,stroke-width:2px`);

  lines.push(`    style CampusConnect_System fill:#BBDEFB`);

  return lines.join('\n');
}

// ─── Main Component ─────────────────────────────────────────────────
export default function UCDInteractiveBuild() {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [renderError, setRenderError] = useState<string | null>(null);
  const diagramRef = useRef<HTMLDivElement>(null);
  const renderIdRef = useRef(0);
  const totalSteps = UCD_STEPS.length;

  // Zoom & Pan State
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentRenderId = ++renderIdRef.current;
    setRenderError(null);

    const render = async () => {
      try {
        const mermaidMod = await import('mermaid');
        const mermaid = mermaidMod.default;
        mermaid.initialize({
          startOnLoad: false,
          securityLevel: 'loose',
          theme: 'default',
          flowchart: { useMaxWidth: true, htmlLabels: true },
        });

        const code = buildMermaidCode(step);
        const id = `ucd-mermaid-${currentRenderId}`;
        const { svg } = await mermaid.render(id, code);

        if (renderIdRef.current === currentRenderId && diagramRef.current) {
          diagramRef.current.innerHTML = svg;
          const svgEl = diagramRef.current.querySelector('svg');
          if (svgEl) {
            svgEl.style.width = '100%';
            svgEl.style.height = 'auto';
            svgEl.style.minHeight = '500px';
          }
        }
      } catch (e) {
        if (renderIdRef.current === currentRenderId) {
          console.error('Mermaid render error:', e);
          setRenderError(String(e));
        }
      }
    };

    render();
  }, [step]);

  useEffect(() => {
    if (!playing) return;
    if (step >= totalSteps - 1) { setPlaying(false); return; }
    const timer = setTimeout(() => setStep(s => s + 1), 2400);
    return () => clearTimeout(timer);
  }, [playing, step, totalSteps]);

  const next = useCallback(() => { if (step < totalSteps - 1) setStep(s => s + 1); }, [step, totalSteps]);
  const prev = useCallback(() => { if (step > 0) setStep(s => s - 1); }, [step]);
  const reset = useCallback(() => { setStep(0); setPlaying(false); setZoom(1); setOffset({x:0, y:0}); }, []);
  const togglePlay = useCallback(() => {
    if (step >= totalSteps - 1) { setStep(0); setPlaying(true); }
    else setPlaying(p => !p);
  }, [step, totalSteps]);

  // Zoom Handlers
  const zoomIn = () => setZoom(z => Math.min(z + 0.2, 3));
  const zoomOut = () => setZoom(z => {
    const newZoom = Math.max(z - 0.2, 0.5);
    if (newZoom <= 1) setOffset({x:0, y:0});
    return newZoom;
  });
  const resetZoom = () => { setZoom(1); setOffset({x:0, y:0}); };

  // Pan Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom <= 1) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || zoom <= 1) return;
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
  const current = UCD_STEPS[step];
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
                Use Case Diagram — CampusConnect
              </span>
            </div>
            <div className="flex items-center gap-1">
                <button onClick={zoomOut} className="h-8 w-8 rounded-lg flex items-center justify-center text-primary/60 hover:bg-primary/5 hover:text-primary transition-all">
                    <span className="material-symbols-outlined text-lg">zoom_out</span>
                </button>
                <button onClick={resetZoom} className="px-2 h-8 rounded-lg flex items-center justify-center text-[10px] font-bold text-primary/40 hover:bg-primary/5 hover:text-primary transition-all uppercase tracking-tighter">
                   {Math.round(zoom * 100)}%
                </button>
                <button onClick={zoomIn} className="h-8 w-8 rounded-lg flex items-center justify-center text-primary/60 hover:bg-primary/5 hover:text-primary transition-all">
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
            className={`flex-1 p-4 relative overflow-hidden flex items-center justify-center bg-white cursor-${zoom > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default'}`}
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
            
            {zoom > 1 && (
                <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-primary/90 text-white text-[10px] font-bold rounded-full shadow-lg backdrop-blur-sm pointer-events-none animate-in fade-in slide-in-from-bottom-2">
                    <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-xs">pan_tool</span>
                        Click and drag to pan
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
                    <p className="text-primary font-bold text-sm leading-tight">{current.title}</p>
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
                <div className="absolute top-1.5 left-0 w-full flex justify-between px-0.5">
                  {UCD_STEPS.map((_, i) => (
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
            {[
              { label: 'System Boundary', showAt: 1, icon: 'crop_square' },
              { label: 'Primary Actors (3)', showAt: 2, icon: 'person' },
              { label: 'Supporting Actor', showAt: 3, icon: 'support_agent' },
              { label: 'Login to System', showAt: 4, icon: 'login' },
              { label: 'Actor Associations', showAt: 5, icon: 'link' },
              { label: 'Search for Organization', showAt: 6, icon: 'search' },
              { label: 'Submit Membership + «include»', showAt: 7, icon: 'person_add' },
              { label: 'Review Membership', showAt: 8, icon: 'rate_review' },
              { label: 'Create Event', showAt: 9, icon: 'event' },
              { label: 'View Profile + «include»', showAt: 10, icon: 'visibility' },
              { label: 'RSVP to Event + «extend»', showAt: 11, icon: 'how_to_reg' },
              { label: 'Final Review', showAt: 12, icon: 'verified' },
            ].map((item) => (
              <div key={item.showAt}
                className={`flex items-center gap-3 p-2 rounded-xl transition-all text-sm ${
                  isNew(item.showAt)
                    ? 'bg-accent/10 border-2 border-accent ring-2 ring-accent/10 font-bold text-primary'
                    : s(item.showAt)
                    ? 'bg-slate-50 dark:bg-slate-800 text-primary dark:text-slate-200'
                    : 'text-slate-400 opacity-50'
                }`}>
                <span className={`material-symbols-outlined text-[16px] ${s(item.showAt) ? 'text-accent' : 'text-slate-300'}`}>
                  {s(item.showAt) ? 'check_circle' : 'circle'}
                </span>
                <span className="text-[11px] font-bold truncate flex-1">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
