"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import mermaid from 'mermaid';

interface DMDStep {
  code: string;
  explanation: string;
  proTip: string;
  subtitle: string;
  scenario: string;
}

const DMD_STEPS: DMDStep[] = [
  {
    subtitle: "Core Entities",
    scenario: "Foundation",
    explanation: "We start with the two primary actors from our use cases: Student and Organization. In a domain model, we focus on attributes (data) rather than methods.",
    proTip: "Identify core nouns in your problem description to find your first classes.",
    code: `classDiagram
direction LR
    class Student {
        name
        gtId
        email
        major
    }

    class Organization {
        organizationId
        name
        description
    }`
  },
  {
    subtitle: "Activity Context",
    scenario: "Event Management",
    explanation: "An 'Event' is a central entity in our system. It captures where and when interactions happen.",
    proTip: "Conceptual classes like 'Event' often bridge the gap between people and organizations.",
    code: `classDiagram
direction LR
    class Student {
        name
        gtId
        email
        major
    }

    class Organization {
        organizationId
        name
        description
    }

    class Event {
        title
        description
        date
        location
        maxCapacity
    }`
  },
  {
    subtitle: "Interaction Classes",
    scenario: "Tracking State",
    explanation: "MembershipRequest and RSVP are 'Interaction Classes'. They track the state of a relationship (like status or timestamp) between other entities.",
    proTip: "Use classes to represent things that have their own lifecycle or state, like a 'Request'.",
    code: `classDiagram
direction LR
    class Student {
        name
        gtId
        email
        major
    }

    class Organization {
        organizationId
        name
        description
    }

    class Event {
        title
        description
        date
        location
        maxCapacity
    }

    class MembershipRequest {
        status
        submittedAt
    }

    class RSVP {
        status
        timestamp
    }`
  },
  {
    subtitle: "Connecting Members",
    scenario: "Relationships",
    explanation: "We establish how students connect to organizations. They can have direct membership or go through a registration process via MembershipRequest.",
    proTip: "Lines represent associations. Labels like 'membership' or 'submits' clarify the nature of the link.",
    code: `classDiagram
direction LR
    class Student {
        name
        gtId
        email
        major
    }

    class Organization {
        organizationId
        name
        description
    }

    class MembershipRequest {
        status
        submittedAt
    }

    Student -- Organization : membership
    Student -- MembershipRequest : submits
    Organization -- MembershipRequest : receives`
  },
  {
    subtitle: "Connecting Events",
    scenario: "Engagement",
    explanation: "Organizations host Events, and Students make RSVPs to those Events. This creates a full web of interactions across the whole system.",
    proTip: "Complex systems often have 'loops' of associations (Student -> RSVP -> Event -> Org -> Student).",
    code: `classDiagram
direction LR
    class Student {
        name
        gtId
        email
        major
    }

    class Organization {
        organizationId
        name
        description
    }

    class Event {
        title
        description
        date
        location
        maxCapacity
    }

    class MembershipRequest {
        status
        submittedAt
    }

    class RSVP {
        status
        timestamp
    }

    Student -- Organization : membership
    Student -- MembershipRequest : submits
    Organization -- MembershipRequest : receives
    Organization -- Event : hosts
    Student -- RSVP : makes
    Event -- RSVP : has`
  },
  {
    subtitle: "Business Rules (Notes)",
    scenario: "Constraints",
    explanation: "Notes are used in domain models to capture business logic that can't be expressed easily through lines and boxes, like officer limits or approval rules.",
    proTip: "Notes help communicate complex requirements to the development team.",
    code: `classDiagram
direction LR
    class Student {
        name
        gtId
        email
        major
    }

    class Organization {
        organizationId
        name
        description
    }

    class Event {
        title
        description
        date
        location
        maxCapacity
    }

    class MembershipRequest {
        status
        submittedAt
    }

    class RSVP {
        status
        timestamp
    }

    note for Organization "Each organization has exactly 1 president, \nmay have multiple officers, \nand a student may be president of \nat most 1 organization at a time."
    note for MembershipRequest "Each membership request is associated with 1 student and 1 organization. \nIf approved, the student becomes a member. If rejected, the request is archived but still recorded."

    Student -- Organization : membership
    Student -- MembershipRequest : submits
    Organization -- MembershipRequest : receives
    Organization -- Event : hosts
    Student -- RSVP : makes
    Event -- RSVP : has`
  },
  {
    subtitle: "Defining Multiplicity",
    scenario: "Cardinality",
    explanation: "Multiplicity (e.g., '1' or '0..*') defines how many instances of one class can be associated with an instance of another. This is critical for database design.",
    proTip: "Always read multiplicities from both ends (e.g., 1 Student can have 0..* Memberships).",
    code: `classDiagram
direction LR
    class Student {
        name
        gtId
        email
        major
    }

    class Organization {
        organizationId
        name
        description
    }

    class Event {
        title
        description
        date
        location
        maxCapacity
    }

    class MembershipRequest {
        status
        submittedAt
    }

    class RSVP {
        status
        timestamp
    }

    note for Organization "Each organization has exactly 1 president, \nmay have multiple officers, \nand a student may be president of \nat most 1 organization at a time."
    note for MembershipRequest "Each membership request is associated with 1 student and 1 organization. \nIf approved, the student becomes a member. If rejected, the request is archived but still recorded."

    Student "1" -- "0..*" Organization : membership
    Student "1" -- "0..*" MembershipRequest : submits
    Organization "1" -- "0..*" MembershipRequest : receives
    Organization "1" -- "0..*" Event : hosts
    Student "1" -- "0..*" RSVP : makes
    Event "1" -- "0..*" RSVP : has`
  },
  {
    subtitle: "Final Domain Model",
    scenario: "Complete View",
    explanation: "The completed Domain Model serves as the 'Source of Truth' for the system's structure. It informs our database schema and class hierarchy.",
    proTip: "Review your DMD against Use Cases to ensure you haven't missed any required data fields.",
    code: `---
config:
  layout: elk
---
classDiagram
direction LR
    class Student {
        name
        gtId
        email
        major
    }

    class Organization {
        organizationId
        name
        description
    }

    class Event {
        title
        description
        date
        location
        maxCapacity
    }

    class MembershipRequest {
        status
        submittedAt
    }

    class RSVP {
        status
        timestamp
    }

    note for Organization "Each organization has exactly 1 president, \nmay have multiple officers, \nand a student may be president of \nat most 1 organization at a time."
    note for MembershipRequest "Each membership request is associated with 1 student and 1 organization. \nIf approved, the student becomes a member. If rejected, the request is archived but still recorded."

    Student "1" -- "0..*" Organization : membership
    Student "1" -- "0..*" MembershipRequest : submits
    Organization "1" -- "0..*" MembershipRequest : receives
    Organization "1" -- "0..*" Event : hosts
    Student "1" -- "0..*" RSVP : makes
    Event "1" -- "0..*" RSVP : has`
  }
];

export function DMDInteractiveBuild() {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [renderError, setRenderError] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  
  const diagramRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const totalSteps = DMD_STEPS.length;

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
        layout: 'elk',
        themeVariables: {
          // Class diagram node colors
          primaryColor: '#eef2ff',        // light indigo background for class boxes
          primaryTextColor: '#1e1b4b',    // dark text so it's readable
          primaryBorderColor: '#6366f1',  // indigo border
          lineColor: '#6366f1',
          secondaryColor: '#f8fafc',
          tertiaryColor: '#f1f5f9',
          // General
          background: '#ffffff',
          mainBkg: '#eef2ff',
          nodeBorder: '#6366f1',
          clusterBkg: '#f0f9ff',
          titleColor: '#1e1b4b',
          edgeLabelBackground: '#ffffff',
          attributeBackgroundColorEven: '#f8fafc',
          attributeBackgroundColorOdd: '#eef2ff',
        },
        class: {
          useMaxWidth: false,
          htmlLabels: true
        }
      });

      // Strip any frontmatter from the code (elk layout is set via initialize)
      const cleanCode = DMD_STEPS[step].code.replace(/^---[\s\S]*?---\n?/, '').trim();
      const { svg } = await mermaid.render(`dmd-svg-${step}`, cleanCode);

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
  const current = DMD_STEPS[step];
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
                Domain Model Diagram — CampusConnect
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
                  {DMD_STEPS.map((_, i) => (
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
            {DMD_STEPS.map((item, i) => (
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
