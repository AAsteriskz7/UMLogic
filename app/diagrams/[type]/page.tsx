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

const DIAGRAM_TITLES: Record<string, string> = {
  ucd: 'Use Case Diagram',
  dmd: 'Domain Model Diagram',
  ssd: 'System Sequence Diagram',
  sd:  'Sequence Diagram',
  dcd: 'Design Class Diagram',
};

// --- Information Component Sub-sections ---

const InfoFooter = ({ setActiveTab, diagramTitle }: { setActiveTab: (tab: 'build') => void, diagramTitle: string }) => (
  <div className="flex justify-end pt-2">
    <button
      onClick={() => setActiveTab('build')}
      className="flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all"
    >
      Step-by-Step Build
      <span className="material-symbols-outlined text-sm">construction</span>
    </button>
  </div>
);

const UCDInfo = ({ setActiveTab, diagramTitle }: { setActiveTab: (tab: 'build' | 'info' | 'quiz') => void, diagramTitle: string }) => (
  <div className="flex flex-col gap-8 max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-500">
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-primary/5 overflow-hidden">
      <div className="px-8 py-5 border-b border-primary/5 bg-slate-50/50 dark:bg-slate-800/50 flex items-center gap-3">
        <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <span className="material-symbols-outlined text-primary text-[18px]">menu_book</span>
        </div>
        <div>
          <p className="text-[10px] font-bold text-primary/40 uppercase tracking-widest">Section 01</p>
          <h2 className="text-base font-bold text-primary dark:text-slate-100">Purpose of a Use Case Diagram</h2>
        </div>
      </div>
      <div className="p-8 flex flex-col gap-6">
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          A <span className="font-bold text-primary dark:text-slate-200">Use Case Diagram (UCD)</span> helps students answer the biggest early design question:
          <span className="font-bold"> what should the system do for its users?</span> Instead of jumping straight into classes, methods, or databases, a UCD focuses on goals, people, and system behavior.
        </p>
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          For CampusConnect, the UCD gives us the high-level map of the product. It shows who interacts with the system, what they are trying to accomplish, and which behaviors are required before we ever draw an SSD, SD, DMD, or DCD.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { term: 'Start with Goals', desc: 'Use a UCD when you want to identify what the system must provide to users before worrying about implementation.' },
            { term: 'Keep It High-Level', desc: 'A UCD is about user intentions and system responsibilities, not methods, UI widgets, or database tables.' },
            { term: 'Use It Early', desc: 'This is usually one of the first diagrams built because it sets the scope for the rest of the project.' },
            { term: 'Think in Scenarios', desc: 'Scenario 1, 2, and 3 help us discover which actors and use cases belong in CampusConnect.' },
          ].map((item) => (
            <div key={item.term} className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-primary/5">
              <p className="text-xs font-bold text-primary mb-1">{item.term}</p>
              <p className="text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>

    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-primary/5 overflow-hidden">
      <div className="px-8 py-5 border-b border-primary/5 bg-slate-50/50 dark:bg-slate-800/50 flex items-center gap-3">
        <div className="h-8 w-8 rounded-lg bg-accent/10 flex items-center justify-center">
          <span className="material-symbols-outlined text-accent text-[18px]">hub</span>
        </div>
        <div>
          <p className="text-[10px] font-bold text-primary/40 uppercase tracking-widest">Section 02</p>
          <h2 className="text-base font-bold text-primary dark:text-slate-100">How to Read the Main Parts</h2>
        </div>
      </div>
      <div className="p-8 flex flex-col gap-6">
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          Before building the CampusConnect UCD, students should be comfortable reading its basic pieces. These parts are what make the diagram useful and what help us stay consistent with the official UML guidance from class.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { term: 'Actor', desc: 'An actor is something with behavior, such as a person or external system. Actors are named with nouns like Student, President, Officer, or External Authentication System.' },
            { term: 'Use Case', desc: 'A use case is a goal the actor wants the system to support. Use cases should be named with verb phrases like "Login to System" or "Submit Membership Request".' },
            { term: 'System Boundary', desc: 'The system boundary shows what is inside CampusConnect and what is outside of it. Everything inside is functionality the system provides.' },
            { term: 'Association', desc: 'A plain line between an actor and a use case shows that the actor participates in that behavior.' },
          ].map((item) => (
            <div key={item.term} className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-primary/5">
              <p className="text-xs font-bold text-primary mb-1">{item.term}</p>
              <p className="text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">{item.desc}</p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="p-5 rounded-xl border-2 border-primary/10 bg-primary/5">
            <span className="px-2 py-0.5 bg-primary text-white text-[10px] font-bold rounded uppercase font-mono">&lt;&lt;include&gt;&gt;</span>
            <p className="text-xs text-slate-600 mt-3">
              Use this when one use case <span className="font-bold">always depends on another use case</span>. The dashed arrow points <span className="font-bold">to the included child use case</span>.
            </p>
          </div>
          <div className="p-5 rounded-xl border-2 border-accent/10 bg-accent/5">
            <span className="px-2 py-0.5 bg-accent text-white text-[10px] font-bold rounded uppercase font-mono">&lt;&lt;extend&gt;&gt;</span>
            <p className="text-xs text-slate-600 mt-3">
              Use this for <span className="font-bold">optional or conditional behavior</span>. The dashed arrow points <span className="font-bold">to the base use case being extended</span>.
            </p>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-primary/5 overflow-hidden">
      <div className="px-8 py-5 border-b border-primary/5 bg-slate-50/50 dark:bg-slate-800/50 flex items-center gap-3">
        <div className="h-8 w-8 rounded-lg bg-accent/10 flex items-center justify-center">
          <span className="material-symbols-outlined text-accent text-[18px]">construction</span>
        </div>
        <div>
          <p className="text-[10px] font-bold text-primary/40 uppercase tracking-widest">Section 03</p>
          <h2 className="text-base font-bold text-primary dark:text-slate-100">How We Build the CampusConnect UCD</h2>
        </div>
      </div>
      <div className="p-8 flex flex-col gap-6">
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          For this project, the UCD is based on <span className="font-bold text-primary">Scenarios 1, 2, and 3</span>. That means we are not building a diagram for one tiny action. We are building a high-level map of the most important user goals across the CampusConnect system.
        </p>
        <div className="grid grid-cols-1 gap-3">
          {[
            { step: 'Step 1', title: 'Identify the actors', desc: 'From the scenarios, we identify Student, President, and Officer as primary actors. The university external authentication system acts as a supporting actor.' },
            { step: 'Step 2', title: 'Define the system boundary', desc: 'We draw CampusConnect as the system under discussion so we can separate internal functionality from outside participants.' },
            { step: 'Step 3', title: 'List actor goals as use cases', desc: 'Examples include Login to System, Search for Organization, Submit Membership Request, Review Membership Request, Create Event, View Profile / Upcoming Events, and RSVP to Event.' },
            { step: 'Step 4', title: 'Add associations and special relationships', desc: 'We connect actors to the use cases they participate in, then use <<include>> and <<extend>> where the scenarios clearly show always-required or optional behavior.' },
            { step: 'Step 5', title: 'Check against the scenarios', desc: 'Every major action in Scenarios 1, 2, and 3 should be accounted for, and the wording should stay focused on user goals instead of implementation details.' },
          ].map((item) => (
            <div key={item.step} className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-primary/5">
              <div className="flex items-center gap-3 mb-2">
                <span className="px-2 py-1 rounded-lg bg-primary text-white text-[10px] font-bold uppercase tracking-wider">{item.step}</span>
                <p className="text-sm font-bold text-primary dark:text-slate-100">{item.title}</p>
              </div>
              <p className="text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">{item.desc}</p>
            </div>
          ))}
        </div>
        <div className="aspect-video bg-slate-100 dark:bg-slate-800 rounded-2xl flex flex-col items-center justify-center border-2 border-dashed border-primary/10">
           <span className="material-symbols-outlined text-primary text-3xl mb-2">image</span>
           <p className="text-xs font-bold text-slate-400">UCD_CampusConnect_JoinOrg.png</p>
        </div>
      </div>
    </div>

    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-primary/5 overflow-hidden">
      <div className="px-8 py-5 border-b border-primary/5 bg-slate-50/50 dark:bg-slate-800/50 flex items-center gap-3">
        <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <span className="material-symbols-outlined text-primary text-[18px]">account_tree</span>
        </div>
        <div>
          <p className="text-[10px] font-bold text-primary/40 uppercase tracking-widest">Section 04</p>
          <h2 className="text-base font-bold text-primary dark:text-slate-100">How the UCD Connects to the Other Diagrams</h2>
        </div>
      </div>
      <div className="p-8 flex flex-col gap-6">
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          The UCD is the starting point for traceability. It tells us <span className="font-bold">which behaviors matter</span>, and the later diagrams explain those behaviors in more detail from different perspectives.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { term: 'UCD -> SSD', desc: 'A use case like viewing profile and event information can become a System Sequence Diagram that shows actor-to-system events for one scenario.' },
            { term: 'UCD -> SD', desc: 'A use case like creating an event or RSVP logic can be expanded into a Sequence Diagram that shows internal object interactions.' },
            { term: 'UCD -> DMD', desc: 'The actors and system goals help us discover important domain concepts such as Student, Organization, Event, RSVP, and MembershipRequest.' },
            { term: 'UCD -> DCD', desc: 'Once we know the key system behaviors, we can define the software classes and methods needed to support them in the Design Class Diagram.' },
          ].map((item) => (
            <div key={item.term} className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-primary/5">
              <p className="text-xs font-bold text-primary mb-1">{item.term}</p>
              <p className="text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">{item.desc}</p>
            </div>
          ))}
        </div>

        <InfoFooter setActiveTab={setActiveTab} diagramTitle={diagramTitle} />
      </div>
    </div>
  </div>
);

const DMDInfo = ({ setActiveTab, diagramTitle }: { setActiveTab: (tab: any) => void, diagramTitle: string }) => (
  <div className="flex flex-col gap-8 max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-500">
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-primary/5 overflow-hidden">
      <div className="px-8 py-5 border-b border-primary/5 bg-slate-50/50 dark:bg-slate-800/50 flex items-center gap-3">
        <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <span className="material-symbols-outlined text-primary text-[18px]">category</span>
        </div>
        <div>
          <p className="text-[10px] font-bold text-primary/40 uppercase tracking-widest">Section 01</p>
          <h2 className="text-base font-bold text-primary dark:text-slate-100">Conceptual Classes & Attributes</h2>
        </div>
      </div>
      <div className="p-8 flex flex-col gap-6">
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          A <span className="font-bold text-primary">Domain Model Diagram (DMD)</span> focuses on real-world concepts (Conceptual Classes) rather than software implementation. It does <span className="font-bold underline">not</span> show methods.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { term: 'Conceptual Class', desc: 'Real-world thing or concept. Represented by a box with two compartments (Name, Attributes).' },
            { term: 'Attribute', desc: 'Logical data value of an object (e.g., name, price).' },
            { term: 'Association', desc: 'Relationship between classes. Often has a name and direction.' },
            { term: 'Multiplicity', desc: 'Indicates how many instances can be involved (e.g., 1..*, 0..1).' },
          ].map((item) => (
            <div key={item.term} className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-primary/5">
              <p className="text-xs font-bold text-primary mb-1">{item.term}</p>
              <p className="text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>

    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-primary/5 overflow-hidden">
      <div className="px-8 py-5 border-b border-primary/5 bg-slate-50/50 dark:bg-slate-800/50 flex items-center gap-3">
        <div className="h-8 w-8 rounded-lg bg-accent/10 flex items-center justify-center">
          <span className="material-symbols-outlined text-accent text-[18px]">format_list_numbered</span>
        </div>
        <div>
          <p className="text-[10px] font-bold text-primary/40 uppercase tracking-widest">Section 02</p>
          <h2 className="text-base font-bold text-primary dark:text-slate-100">Multiplicity Rules</h2>
        </div>
      </div>
      <div className="p-8 flex flex-col gap-6">
        <table className="w-full text-xs text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800">
              <th className="p-3 border-b border-primary/5 font-bold uppercase">Notation</th>
              <th className="p-3 border-b border-primary/5 font-bold uppercase">Meaning</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className="p-3 border-b border-primary/5 font-mono font-bold">1</td><td className="p-3 border-b border-primary/5">Exactly one</td></tr>
            <tr><td className="p-3 border-b border-primary/5 font-mono font-bold">*</td><td className="p-3 border-b border-primary/5">Zero or more (Many)</td></tr>
            <tr><td className="p-3 border-b border-primary/5 font-mono font-bold">1..*</td><td className="p-3 border-b border-primary/5">One or more (At least one)</td></tr>
            <tr><td className="p-3 border-b border-primary/5 font-mono font-bold">0..1</td><td className="p-3 border-b border-primary/5">Zero or one (Optional)</td></tr>
          </tbody>
        </table>
        
        <InfoFooter setActiveTab={setActiveTab} diagramTitle={diagramTitle} />
      </div>
    </div>
  </div>
);

const SSDInfo = ({ setActiveTab, diagramTitle }: { setActiveTab: (tab: any) => void, diagramTitle: string }) => (
  <div className="flex flex-col gap-8 max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-500">
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-primary/5 overflow-hidden">
      <div className="px-8 py-5 border-b border-primary/5 bg-slate-50/50 dark:bg-slate-800/50 flex items-center gap-3">
        <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <span className="material-symbols-outlined text-primary text-[18px]">visibility_off</span>
        </div>
        <div>
          <p className="text-[10px] font-bold text-primary/40 uppercase tracking-widest">Section 01</p>
          <h2 className="text-base font-bold text-primary dark:text-slate-100">The Black Box View</h2>
        </div>
      </div>
      <div className="p-8 flex flex-col gap-6">
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          A <span className="font-bold text-primary">System Sequence Diagram (SSD)</span> treats the system as a &ldquo;Black Box&rdquo;. It shows events that cross the system boundary but <span className="font-bold underline">not</span> internal logic.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { term: 'System Lifeline', desc: 'Represents the entire application as a single unit.' },
            { term: 'System Operations', desc: 'High-level events initiated by actors (e.g., joinOrganization()).' },
            { term: 'Return Message', desc: 'Dashed line with an open arrowhead returning info to the actor.' },
            { term: 'Actor Lifeline', desc: 'The external entity interacting with the system.' },
          ].map((item) => (
            <div key={item.term} className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-primary/5">
              <p className="text-xs font-bold text-primary mb-1">{item.term}</p>
              <p className="text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">{item.desc}</p>
            </div>
          ))}
        </div>

        <InfoFooter setActiveTab={setActiveTab} diagramTitle={diagramTitle} />
      </div>
    </div>
  </div>
);

const SDInfo = ({ setActiveTab, diagramTitle }: { setActiveTab: (tab: any) => void, diagramTitle: string }) => (
  <div className="flex flex-col gap-8 max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-500">
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-primary/5 overflow-hidden">
      <div className="px-8 py-5 border-b border-primary/5 bg-slate-50/50 dark:bg-slate-800/50 flex items-center gap-3">
        <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <span className="material-symbols-outlined text-primary text-[18px]">schema</span>
        </div>
        <div>
          <p className="text-[10px] font-bold text-primary/40 uppercase tracking-widest">Section 01</p>
          <h2 className="text-base font-bold text-primary dark:text-slate-100">Interaction Logic</h2>
        </div>
      </div>
      <div className="p-8 flex flex-col gap-6">
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          <span className="font-bold text-primary">Sequence Diagrams (SD)</span> show how objects interact via messages over time. They reveal the internal flow of a use case.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { term: 'Activation Bar', desc: 'A tall, thin rectangle on a lifeline showing when an object is active.' },
            { term: 'Synchronous Message', desc: 'Procedure call (Solid line, filled arrowhead).' },
            { term: 'Asynchronous Message', desc: 'Non-blocking call (Solid line, open arrowhead).' },
            { term: 'Return Arrow', desc: 'Control returning to caller (Dashed line, open arrowhead).' },
            { term: 'Self-Message', desc: 'Object calling its own method. Drawn as a loop.' },
            { term: 'Destruction (X)', desc: 'Large X at the end of a lifeline indicating an object is destroyed.' },
          ].map((item) => (
            <div key={item.term} className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-primary/5">
              <p className="text-xs font-bold text-primary mb-1">{item.term}</p>
              <p className="text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">{item.desc}</p>
            </div>
          ))}
        </div>

        <InfoFooter setActiveTab={setActiveTab} diagramTitle={diagramTitle} />
      </div>
    </div>
  </div>
);

const DCDInfo = ({ setActiveTab, diagramTitle }: { setActiveTab: (tab: any) => void, diagramTitle: string }) => (
  <div className="flex flex-col gap-8 max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-500">
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-primary/5 overflow-hidden">
      <div className="px-8 py-5 border-b border-primary/5 bg-slate-50/50 dark:bg-slate-800/50 flex items-center gap-3">
        <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <span className="material-symbols-outlined text-primary text-[18px]">settings_suggest</span>
        </div>
        <div>
          <p className="text-[10px] font-bold text-primary/40 uppercase tracking-widest">Section 01</p>
          <h2 className="text-base font-bold text-primary dark:text-slate-100">Design Class Diagrams</h2>
        </div>
      </div>
      <div className="p-8 flex flex-col gap-6">
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          A <span className="font-bold text-primary">Design Class Diagram (DCD)</span> models software implementation details, including visibility, types, and inheritance.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { term: 'Visibility: (+)', desc: 'Public (accessible anywhere).' },
            { term: 'Visibility: (-)', desc: 'Private (accessible only within the class).' },
            { term: 'Visibility: (#)', desc: 'Protected (accessible by subclasses).' },
            { term: 'Generalization', desc: 'Inheritance relationship (Solid line, hollow triangle).' },
            { term: 'Composition', desc: 'Strong ownership (Solid line, filled diamond).' },
            { term: 'Aggregation', desc: 'Weak ownership (Solid line, hollow diamond).' },
          ].map((item) => (
            <div key={item.term} className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-primary/5">
              <p className="text-xs font-bold text-primary mb-1">{item.term}</p>
              <p className="text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">{item.desc}</p>
            </div>
          ))}
        </div>

        <InfoFooter setActiveTab={setActiveTab} diagramTitle={diagramTitle} />
      </div>
    </div>
  </div>
);

// --- Main Module Component ---

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
            <>
              {diagramType === 'ucd' && <UCDInfo setActiveTab={setActiveTab} diagramTitle={diagramTitle} />}
              {diagramType === 'dmd' && <DMDInfo setActiveTab={setActiveTab} diagramTitle={diagramTitle} />}
              {diagramType === 'ssd' && <SSDInfo setActiveTab={setActiveTab} diagramTitle={diagramTitle} />}
              {diagramType === 'sd' && <SDInfo setActiveTab={setActiveTab} diagramTitle={diagramTitle} />}
              {diagramType === 'dcd' && <DCDInfo setActiveTab={setActiveTab} diagramTitle={diagramTitle} />}
            </>
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
                    You&apos;ve successfully completed the {diagramTitle} mini quiz.
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
                      &ldquo;{currentQuestion.text}&rdquo;
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
