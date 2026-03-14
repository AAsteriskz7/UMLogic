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

const SD_STEPS: BuildStep[] = [
  {
    id: 1,
    title: "Define Participants",
    subtitle: "Identify Lifelines",
    explanation: "Sequence Diagrams describe how processes operate with one another and in what order. We start by defining 'Participants' (Lifelines). From Daniel's and Priya's scenarios, we identify: Daniel (Officer), Student, the CampusConnect UI, the Event Service (EventHandler), and the Database.",
    proTip: "Lifelines should be ordered by their 'closeness' to the user: User -> UI -> Controller/Service -> Persistence.",
    scenario: null,
  },
  {
    id: 2,
    title: "Scenario Start: Create Event",
    subtitle: "User to UI Interaction",
    explanation: "From Scenario 2: Daniel 'creates a new event'. This starts with a message from the Officer actor to the UI object. The message 'createEvent' includes all necessary parameters like title, date, and capacity.",
    proTip: "In a real Sequence Diagram (unlike an SSD), messages represent actual method calls in the code.",
    scenario: "Scenario 2",
  },
  {
    id: 3,
    title: "Internal System Flow",
    subtitle: "UI to Service",
    explanation: "The UI doesn't process data itself — it delegates responsibility. It sends a 'Submit event' message to the Event Service (System). This represents the handoff from the presentation layer to the business logic layer.",
    proTip: "Keep your UI thin! Delegation to service objects makes the system more maintainable.",
    scenario: "Scenario 2",
  },
  {
    id: 4,
    title: "Data Persistence",
    subtitle: "Service to Database",
    explanation: "The Event Service needs to persist the new event. It sends a 'Save event' message to the Database lifeline. This is the final step in the downward flow of the 'Create Event' operation.",
    proTip: "The Database lifeline represents your persistence layer. It's often the 'end of the line' for data-driven messages.",
    scenario: "Scenario 2",
  },
  {
    id: 5,
    title: "Returning Confirmation",
    subtitle: "The Return Path",
    explanation: "Once the DB confirms storage, success messages propagate back up the stack. Notice the dashed arrows: these represent 'Return Messages'. Daniel receives the final 'Event creation confirmed' visual in the UI.",
    proTip: "Dashed arrows indicate control returning to the caller. They often carry return values or success/error status.",
    scenario: "Scenario 2",
  },
  {
    id: 6,
    title: "Student RSVP Initiation",
    subtitle: "Concurrent User Scenario",
    explanation: "Now, Scenario 3: Priya (Student) wants to RSVP. She interacts with the UI ('reserveSpot'). The system must now validate if a spot is actually available before confirming.",
    proTip: "Sequence diagrams excel at showing complex logic flows that involve multiple objects.",
    scenario: "Scenario 3",
  },
  {
    id: 7,
    title: "Business Logic: Capacity Check",
    subtitle: "Validation Step",
    explanation: "The System asks the Database to 'Check capacity'. This is a critical business rule validation. The outcome of this check will determine which logical path the system takes next.",
    proTip: "Always perform critical validations on the server-side (Service/DB), never just the client-side (UI).",
    scenario: "Scenario 3",
  },
  {
    id: 8,
    title: "Conditional Logic: Path A",
    subtitle: "The 'alt' Block (Success)",
    explanation: "We use an 'alt' (alternative) block for conditional logic. In the first case ('Spot available'), the DB returns 'Available', the RSVP is saved, and the Student receives a confirmation.",
    proTip: "'alt' blocks are like if/else statements in code. Use them to show how the system handles different outcomes.",
    scenario: "Scenario 3",
  },
  {
    id: 9,
    title: "Conditional Logic: Path B",
    subtitle: "The 'else' Block (Failure)",
    explanation: "What if the event is full? The 'else' part of the block handles this. The DB returns 'Full', the system 'Denies RSVP', and the UI informs the student: 'Event full'.",
    proTip: "Always design for the 'Unlucky Path'. How does your system handle errors or full capacity?",
    scenario: "Scenario 3",
  },
  {
    id: 10,
    title: "Scenario 4: Cancellation",
    subtitle: "Object State Change",
    explanation: "Later, Scenario 4: A Student cancels their reservation. This initiates a new chain: 'cancelReservation' -> 'Submit cancellation'. The system must now update the data to reflect this change.",
    proTip: "Sequence diagrams should show the full lifecycle of an interaction, including removals or updates.",
    scenario: "Scenario 4",
  },
  {
    id: 11,
    title: "Updating Data State",
    subtitle: "Removal Logic",
    explanation: "The Event Service tells the Database to 'Remove RSVP'. Upon confirmation ('RSVP removed'), the success message travels back to the Student lifeline.",
    proTip: "Even simple deletions usually involve a multi-step confirmation flow to ensure data integrity.",
    scenario: "Scenario 4",
  },
  {
    id: 12,
    title: "Dynamic Capacity Recovery",
    subtitle: "Architecture Note",
    explanation: "The diagram ends with a 'Note'. This emphasizes the consequence of the cancellation: capacity increases, allowing another student to RSVP. The diagram is now consistent and represents the full RSVP workflow.",
    proTip: "Use 'Notes' to highlight important side-effects or business rules that aren't strictly messages but are vital for understanding.",
    scenario: "All Scenarios",
  },
];

// ─── Mermaid code generator ─────────────────────────────────────────
function buildMermaidCode(step: number): string {
  // step is 0-indexed
  const showDaniel        = step >= 0; 
  const showDanielCreate  = step >= 1; // Step 2
  const showSystemSubmit  = step >= 2; // Step 3
  const showDBSave        = step >= 3; // Step 4
  const showCreateConfirm = step >= 4; // Step 5
  const showStudentRSVP   = step >= 5; // Step 6
  const showCapacityCheck = step >= 6; // Step 7
  const showAltAvailable  = step >= 7; // Step 8
  const showAltFull       = step >= 8; // Step 9
  const showCancelStart   = step >= 9; // Step 10
  const showCancelFinish  = step >= 10; // Step 11
  const showFinalNote     = step >= 11; // Step 12

  const lines: string[] = [];
  lines.push(`sequenceDiagram`);
  lines.push(`    participant Officer as Daniel (Officer)`);
  lines.push(`    participant Student as Student`);
  lines.push(`    participant UI as CampusConnect UI : UI`);
  lines.push(`    participant System as Event Service : EventHandler`);
  lines.push(`    participant DB as Database : Database`);
  lines.push(``);

  // Scenario 2: Create Event
  if (showDanielCreate) {
    lines.push(`    Officer->>UI: createEvent(title, description, date, location, maxCapacity)`);
  }
  if (showSystemSubmit) {
    lines.push(`    UI->>System: Submit event`);
  }
  if (showDBSave) {
    lines.push(`    System->>DB: Save event`);
  }
  if (showCreateConfirm) {
    lines.push(`    DB-->>System: Event created`);
    lines.push(`    System-->>UI: Success`);
    lines.push(`    UI-->>Officer: Event creation confirmed`);
  }
  lines.push(``);

  // Scenario 3: RSVP
  if (showStudentRSVP) {
    lines.push(`    Student->>UI: reserveSpot(eventId)`);
  }
  if (showCapacityCheck) {
    lines.push(`    UI->>System: Submit RSVP`);
    lines.push(`    System->>DB: Check capacity`);
  }
  lines.push(``);

  if (showAltAvailable) {
    lines.push(`    alt Spot available`);
    lines.push(`        DB-->>System: Available`);
    lines.push(`        System->>DB: Save RSVP`);
    lines.push(`        DB-->>System: RSVP saved`);
    lines.push(`        System-->>UI: Confirm RSVP`);
    lines.push(`        UI-->>Student: Reservation confirmed`);
    if (showAltFull) {
        lines.push(`    else Event full`);
        lines.push(`        DB-->>System: Full`);
        lines.push(`        System-->>UI: Deny RSVP`);
        lines.push(`        UI-->>Student: Event full`);
        lines.push(`    end`);
    } else {
        // Just show the start of alt if we haven't reached else yet
        // Mermaid needs the block to be closed to render, so we close it
        lines.push(`    end`);
    }
  }
  lines.push(``);

  // Cancellations
  if (showCancelStart) {
    lines.push(`    Student->>UI: cancelReservation(eventId)`);
    lines.push(`    UI->>System: Submit cancellation`);
  }
  if (showCancelFinish) {
    lines.push(`    System->>DB: Remove RSVP`);
    lines.push(`    DB-->>System: RSVP removed`);
    lines.push(`    System-->>UI: Confirm cancellation`);
    lines.push(`    UI-->>Student: Reservation cancelled`);
  }
  
  if (showFinalNote) {
    lines.push(`    Note over Student,DB: Capacity increases, allowing another RSVP`);
  }

  return lines.join('\n');
}

// ─── Main Component ─────────────────────────────────────────────────
export default function SDInteractiveBuild() {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [renderError, setRenderError] = useState<string | null>(null);
  const diagramRef = useRef<HTMLDivElement>(null);
  const renderIdRef = useRef(0);
  const totalSteps = SD_STEPS.length;

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
          sequence: {
            useMaxWidth: true,
            showSequenceNumbers: false,
            messageFontSize: 12,
            actorFontSize: 13,
            noteFontSize: 12,
          }
        });

        const code = buildMermaidCode(step);
        const id = `sd-mermaid-${currentRenderId}`;
        const { svg } = await mermaid.render(id, code);

        if (renderIdRef.current === currentRenderId && diagramRef.current) {
          diagramRef.current.innerHTML = svg;
          const svgEl = diagramRef.current.querySelector('svg');
          if (svgEl) {
            svgEl.style.width = '100%';
            svgEl.style.height = '100%';
            svgEl.style.minHeight = '500px';
            svgEl.style.maxHeight = '650px';
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
    const timer = setTimeout(() => setStep(s => s + 1), 2500);
    return () => clearTimeout(timer);
  }, [playing, step, totalSteps]);

  const next = useCallback(() => { if (step < totalSteps - 1) setStep(s => s + 1); }, [step, totalSteps]);
  const prev = useCallback(() => { if (step > 0) setStep(s => s - 1); }, [step]);
  const reset = useCallback(() => { setStep(0); setPlaying(false); }, []);
  const togglePlay = useCallback(() => {
    if (step >= totalSteps - 1) { setStep(0); setPlaying(true); }
    else setPlaying(p => !p);
  }, [step, totalSteps]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next();
      else if (e.key === 'ArrowLeft') prev();
      else if (e.key === ' ') { e.preventDefault(); togglePlay(); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [next, prev, togglePlay]);

  const s = (showAt: number) => step >= showAt - 1;
  const isNew = (showAt: number) => step === showAt - 1;
  const current = SD_STEPS[step];
  const pct = ((step + 1) / totalSteps) * 100;

  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-12 lg:col-span-8 flex flex-col gap-4">
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-primary/5 flex-1 min-h-[700px] relative overflow-hidden flex flex-col">
          <div className="p-4 border-b border-primary/5 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
            <div className="flex gap-2 items-center">
              <span className="px-3 py-1 bg-accent/10 text-accent text-xs font-bold rounded-full uppercase">
                Step {step + 1} of {totalSteps}
              </span>
              <span className="text-primary/40 text-xs font-medium uppercase tracking-widest px-1">
                Sequence Diagram — CampusConnect
              </span>
            </div>
            {current.scenario && (
              <span className="px-3 py-1 bg-primary/5 text-primary text-[10px] font-bold rounded-full uppercase tracking-wider">
                {current.scenario}
              </span>
            )}
          </div>

          <div className="flex-1 p-4 relative overflow-auto flex items-center justify-center bg-white">
            {renderError ? (
              <div className="text-red-500 text-sm p-4 bg-red-50 rounded-xl max-w-md text-center">
                <span className="material-symbols-outlined block text-2xl mb-2">error</span>
                Diagram render error.
              </div>
            ) : (
              <div ref={diagramRef} className="w-full flex items-center justify-center" />
            )}
          </div>

          <div className="p-5 border-t border-primary/10 bg-white dark:bg-slate-900">
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
                  {SD_STEPS.map((_, i) => (
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
            <h3 className="font-bold text-lg">Sequence Build</h3>
          </div>
          <div className="flex flex-col gap-1.5">
            {[
              { label: 'Participants & Lifelines', showAt: 1, icon: 'view_column' },
              { label: 'Daniel: createEvent()', showAt: 2, icon: 'edit_calendar' },
              { label: 'Internal Persistence', showAt: 4, icon: 'save' },
              { label: 'Success Confirmation', showAt: 5, icon: 'done_all' },
              { label: 'Student: reserveSpot()', showAt: 6, icon: 'how_to_reg' },
              { label: 'Capacity Validation', showAt: 7, icon: 'rule' },
              { label: 'Conditional: Success Path', showAt: 8, icon: 'call_split' },
              { label: 'Conditional: Failure Path', showAt: 9, icon: 'error_outline' },
              { label: 'Scenario: Cancellation', showAt: 11, icon: 'event_busy' },
              { label: 'Capacity Recovery Note', showAt: 12, icon: 'note_add' },
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
