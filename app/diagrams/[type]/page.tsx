"use client";

import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
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
        <DiagramPreview src="/diagram-images/UCD.png" alt="Use Case Diagram for CampusConnect" />
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

        <div className="mt-4 p-5 bg-primary/5 rounded-xl border border-primary/10 flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-primary">Interactive Traceability</p>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">See how the "Browse Clubs" action becomes a System Sequence Diagram.</p>
          </div>
          <Link href="/diagrams/ssd" className="px-5 py-2.5 bg-white dark:bg-slate-800 text-primary font-bold text-sm rounded-lg shadow-sm border border-primary/20 hover:bg-primary hover:text-white transition-all">
            Go to SSD
          </Link>
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
          <h2 className="text-base font-bold text-primary dark:text-slate-100">Purpose of a Domain Model Diagram</h2>
        </div>
      </div>
      <div className="p-8 flex flex-col gap-6">
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          A <span className="font-bold text-primary">Domain Model Diagram (DMD)</span> helps students answer a different question than a use case diagram:
          <span className="font-bold"> what are the important things in the problem domain, and how are they related?</span>
        </p>
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          In CampusConnect, the DMD focuses on conceptual classes like Student, Organization, Event, RSVP, and MembershipRequest. It stays at the real-world level and does <span className="font-bold underline">not</span> include software methods or implementation details.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { term: 'Model the Real World', desc: 'A DMD is for understanding the domain itself, not how you will code it.' },
            { term: 'Focus on Nouns', desc: 'Students often discover DMD classes by underlining nouns in the requirements and scenarios.' },
            { term: 'No Methods Yet', desc: 'If you are writing operations like createEvent() or cancelRSVP(), you have probably moved into DCD territory.' },
            { term: 'Build Shared Understanding', desc: 'A good DMD creates a common picture of the system before the team starts implementation.' },
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
          A DMD becomes much easier to read once you know its main pieces. These are the building blocks students should look for before trying to make sense of the whole diagram.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { term: 'Conceptual Class', desc: 'A real-world thing or concept represented by a box, usually with a name and attributes.' },
            { term: 'Attribute', desc: 'A piece of data that belongs to a conceptual class, such as name, GT ID, or maxCapacity.' },
            { term: 'Association', desc: 'A relationship between classes that shows how domain concepts are connected.' },
            { term: 'Association Name / Direction', desc: 'Text and arrow direction can clarify the meaning of a relationship, such as who hosts, submits, or receives.' },
          ].map((item) => (
            <div key={item.term} className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-primary/5">
              <p className="text-xs font-bold text-primary mb-1">{item.term}</p>
              <p className="text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">{item.desc}</p>
            </div>
          ))}
        </div>
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
      </div>
    </div>

    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-primary/5 overflow-hidden">
      <div className="px-8 py-5 border-b border-primary/5 bg-slate-50/50 dark:bg-slate-800/50 flex items-center gap-3">
        <div className="h-8 w-8 rounded-lg bg-accent/10 flex items-center justify-center">
          <span className="material-symbols-outlined text-accent text-[18px]">construction</span>
        </div>
        <div>
          <p className="text-[10px] font-bold text-primary/40 uppercase tracking-widest">Section 03</p>
          <h2 className="text-base font-bold text-primary dark:text-slate-100">How We Build the CampusConnect DMD</h2>
        </div>
      </div>
      <div className="p-8 flex flex-col gap-6">
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          The DMD is based on the overall CampusConnect context, not just one scenario. That means we build it by scanning the requirements for the major domain concepts and the relationships that must exist between them.
        </p>
        <div className="grid grid-cols-1 gap-3">
          {[
            { step: 'Step 1', title: 'Underline key nouns', desc: 'Look for core concepts like Student, Organization, Event, RSVP, and MembershipRequest in the requirements text.' },
            { step: 'Step 2', title: 'Add useful attributes', desc: 'Give each conceptual class the data values the context says it has, such as GT ID, email, title, date, location, or status.' },
            { step: 'Step 3', title: 'Draw associations', desc: 'Connect classes that interact in the domain, such as organizations hosting events or students making RSVPs.' },
            { step: 'Step 4', title: 'Label multiplicity and direction', desc: 'Use multiplicity to show how many instances can be related and add direction/name if it makes the relationship clearer.' },
            { step: 'Step 5', title: 'Stay conceptual', desc: 'Do not add methods or implementation details yet. The goal is to capture the problem space correctly.' },
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
        <DiagramPreview src="/diagram-images/DMD.png" alt="Domain Model Diagram for CampusConnect" />
      </div>
    </div>

    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-primary/5 overflow-hidden">
      <div className="px-8 py-5 border-b border-primary/5 bg-slate-50/50 dark:bg-slate-800/50 flex items-center gap-3">
        <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <span className="material-symbols-outlined text-primary text-[18px]">account_tree</span>
        </div>
        <div>
          <p className="text-[10px] font-bold text-primary/40 uppercase tracking-widest">Section 04</p>
          <h2 className="text-base font-bold text-primary dark:text-slate-100">How the DMD Connects to the Other Diagrams</h2>
        </div>
      </div>
      <div className="p-8 flex flex-col gap-6">
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          The DMD gives structure to the rest of the project. It identifies the major domain concepts that later diagrams either interact with or implement in code.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { term: 'DMD -> UCD', desc: 'Use cases tell us what the system must do, and the DMD helps show what domain concepts those behaviors act on.' },
            { term: 'DMD -> SSD / SD', desc: 'Sequence-based diagrams often pass messages about domain concepts like events, requests, rosters, and RSVPs.' },
            { term: 'DMD -> DCD', desc: 'The DCD often begins by translating conceptual classes in the DMD into software classes with attributes and methods.' },
            { term: 'Consistency Check', desc: 'If a major concept appears in one diagram but is missing from the DMD, that is often a sign the model is incomplete.' },
          ].map((item) => (
            <div key={item.term} className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-primary/5">
              <p className="text-xs font-bold text-primary mb-1">{item.term}</p>
              <p className="text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">{item.desc}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-4 p-5 bg-primary/5 rounded-xl border border-primary/10 flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-primary">Interactive Traceability</p>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">See how the "Student" and "Event" concepts turn into actual code classes.</p>
          </div>
          <Link href="/diagrams/ucd" className="px-5 py-2.5 bg-white dark:bg-slate-800 text-primary font-bold text-sm rounded-lg shadow-sm border border-primary/20 hover:bg-primary hover:text-white transition-all">
            Go to UCD
          </Link>
        </div>
        
        <InfoFooter setActiveTab={setActiveTab} diagramTitle={diagramTitle} />
      </div>
    </div>
  </div>
);

const DiagramPreview = ({ src, alt }: { src: string; alt: string }) => (
  <div className="aspect-video bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center border-2 border-dashed border-primary/10 overflow-hidden p-4">
    <div className="relative w-full h-full">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-contain"
        sizes="(max-width: 1024px) 100vw, 896px"
      />
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
          <h2 className="text-base font-bold text-primary dark:text-slate-100">Purpose of a System Sequence Diagram</h2>
        </div>
      </div>
      <div className="p-8 flex flex-col gap-6">
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          A <span className="font-bold text-primary">System Sequence Diagram (SSD)</span> shows how an external actor interacts with the system as a <span className="font-bold">black box</span>. It focuses on events that cross the system boundary, not on internal classes or method calls.
        </p>
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          In this project, the SSD is tied to <span className="font-bold text-primary">Scenario 3</span>, where Priya logs in, views her profile page, checks upcoming events, and selects an event to see more details.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { term: 'One Scenario, One Flow', desc: 'An SSD usually captures one scenario of one use case rather than the whole system at once.' },
            { term: 'Black Box Thinking', desc: 'The system is shown as one lifeline because we care about what it does externally, not how it does it internally.' },
            { term: 'Intent-Based Messages', desc: 'Message names should describe intentions like logIn() or viewProfilePage(), not UI clicks or implementation details.' },
            { term: 'Great Bridge Diagram', desc: 'An SSD connects high-level use cases to more detailed sequence and class design.' },
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { term: 'Actor Lifeline', desc: 'The external person or system interacting with CampusConnect, such as Priya.' },
            { term: 'System Lifeline', desc: 'A single lifeline representing the entire CampusConnect system.' },
            { term: 'System Operations', desc: 'Messages sent from the actor to the system that describe meaningful user intentions.' },
            { term: 'Return Message', desc: 'A dashed arrow from the system back to the actor showing returned information or confirmation.' },
          ].map((item) => (
            <div key={item.term} className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-primary/5">
              <p className="text-xs font-bold text-primary mb-1">{item.term}</p>
              <p className="text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">{item.desc}</p>
            </div>
          ))}
        </div>
        <div className="p-5 rounded-xl border-2 border-primary/10 bg-primary/5">
          <p className="text-xs font-bold text-primary mb-2 uppercase tracking-wider">Fragments Matter Too</p>
          <p className="text-xs text-slate-600">
            SSDs can also use fragments like <span className="font-bold">loop</span>, <span className="font-bold">alt</span>, <span className="font-bold">opt</span>, and <span className="font-bold">ref</span> when the interaction becomes more complex.
          </p>
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
          <h2 className="text-base font-bold text-primary dark:text-slate-100">How We Build the CampusConnect SSD</h2>
        </div>
      </div>
      <div className="p-8 flex flex-col gap-6">
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          Our SSD is built from Scenario 3, so the focus is Priya interacting with CampusConnect to check organizations and events. The goal is to show the external behavior of the system in time order.
        </p>
        <div className="grid grid-cols-1 gap-3">
          {[
            { step: 'Step 1', title: 'Choose one scenario', desc: 'We use Priya’s profile and event-viewing flow instead of trying to mix in every scenario.' },
            { step: 'Step 2', title: 'Add the actor and system', desc: 'Priya is the actor, and CampusConnect appears as one system lifeline.' },
            { step: 'Step 3', title: 'List events in order', desc: 'Messages such as logIn(), viewProfilePage(), and selectEvent(eventId) are placed from top to bottom in time order.' },
            { step: 'Step 4', title: 'Add return messages', desc: 'The system responds with confirmations and data such as profile details or event details.' },
            { step: 'Step 5', title: 'Avoid internal detail', desc: 'We do not show controllers, services, or databases here. Those belong in the Sequence Diagram.' },
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
        <DiagramPreview src="/diagram-images/SSD.png" alt="System Sequence Diagram for CampusConnect" />
      </div>
    </div>

    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-primary/5 overflow-hidden">
      <div className="px-8 py-5 border-b border-primary/5 bg-slate-50/50 dark:bg-slate-800/50 flex items-center gap-3">
        <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <span className="material-symbols-outlined text-primary text-[18px]">account_tree</span>
        </div>
        <div>
          <p className="text-[10px] font-bold text-primary/40 uppercase tracking-widest">Section 04</p>
          <h2 className="text-base font-bold text-primary dark:text-slate-100">How the SSD Connects to the Other Diagrams</h2>
        </div>
      </div>
      <div className="p-8 flex flex-col gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { term: 'SSD -> UCD', desc: 'The SSD takes a use case from the UCD and shows one concrete scenario of that behavior in time order.' },
            { term: 'SSD -> SD', desc: 'The SSD can be expanded into an SD by opening the black box and showing the internal objects that handle each event.' },
            { term: 'SSD -> DCD', desc: 'System operations in the SSD often suggest methods that must exist in the Design Class Diagram.' },
            { term: 'Consistency Check', desc: 'If the SSD shows an operation that cannot be supported by the SD or DCD, the project is probably not internally consistent.' },
          ].map((item) => (
            <div key={item.term} className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-primary/5">
              <p className="text-xs font-bold text-primary mb-1">{item.term}</p>
              <p className="text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 p-5 bg-primary/5 rounded-xl border border-primary/10 flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-primary">Interactive Traceability</p>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">See how "System" is opened up in the Sequence Diagram.</p>
          </div>
          <Link href="/diagrams/sd" className="px-5 py-2.5 bg-white dark:bg-slate-800 text-primary font-bold text-sm rounded-lg shadow-sm border border-primary/20 hover:bg-primary hover:text-white transition-all">
            Go to SD
          </Link>
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
          <h2 className="text-base font-bold text-primary dark:text-slate-100">Purpose of a Sequence Diagram</h2>
        </div>
      </div>
      <div className="p-8 flex flex-col gap-6">
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          A <span className="font-bold text-primary">Sequence Diagram (SD)</span> shows how internal objects interact through messages over time. Unlike an SSD, the system is no longer a black box.
        </p>
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          In this project, the SD is tied to <span className="font-bold text-primary">Scenario 2</span>, where Daniel creates an event and students RSVP until the workshop reaches capacity.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { term: 'Open the Black Box', desc: 'Use an SD when you need to show which internal objects or classes are responsible for making a scenario work.' },
            { term: 'Follow the Flow of Control', desc: 'Messages are ordered from top to bottom, so the SD helps students reason through the execution path.' },
            { term: 'Great for Logic Checks', desc: 'Alternative paths like event full vs. event available are easier to explain in an SD than in a UCD or DMD.' },
            { term: 'Closer to Implementation', desc: 'An SD is more implementation-facing than an SSD because it shows internal participants.' },
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { term: 'Lifeline', desc: 'The dashed vertical line for an object or participant, showing that it exists over time.' },
            { term: 'Activation Bar', desc: 'A narrow rectangle on the lifeline that shows when an object is active during an interaction.' },
            { term: 'Synchronous Message', desc: 'A solid line with a filled arrowhead, used when the sender waits for a result.' },
            { term: 'Asynchronous Message', desc: 'A solid line with an open arrowhead, used when the sender does not wait in the same way.' },
            { term: 'Return Message', desc: 'A dashed arrow that shows control or data returning to the caller.' },
            { term: 'Fragment', desc: 'Boxes such as alt, loop, opt, or ref that help model conditional or repeated logic.' },
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
          <span className="material-symbols-outlined text-accent text-[18px]">construction</span>
        </div>
        <div>
          <p className="text-[10px] font-bold text-primary/40 uppercase tracking-widest">Section 03</p>
          <h2 className="text-base font-bold text-primary dark:text-slate-100">How We Build the CampusConnect SD</h2>
        </div>
      </div>
      <div className="p-8 flex flex-col gap-6">
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          The SD in this project follows Scenario 2 and opens the system up so we can see how UI, services, and persistence objects work together during event creation and RSVP handling.
        </p>
        <div className="grid grid-cols-1 gap-3">
          {[
            { step: 'Step 1', title: 'Choose internal participants', desc: 'We identify the actor and the important internal objects involved in the scenario, such as UI, service logic, and the database.' },
            { step: 'Step 2', title: 'Place messages in time order', desc: 'We show createEvent, RSVP, capacity checks, and cancellation behavior from top to bottom.' },
            { step: 'Step 3', title: 'Add return paths', desc: 'The SD should show not just requests, but the responses that flow back after work is completed.' },
            { step: 'Step 4', title: 'Model conditional behavior', desc: 'Fragments like alt help us capture branches such as spot available versus event full.' },
            { step: 'Step 5', title: 'Check internal consistency', desc: 'Every major interaction should make sense with the SSD, DCD methods, and CampusConnect rules around event capacity.' },
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
        <DiagramPreview src="/diagram-images/SD.png" alt="Sequence Diagram for CampusConnect" />
      </div>
    </div>

    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-primary/5 overflow-hidden">
      <div className="px-8 py-5 border-b border-primary/5 bg-slate-50/50 dark:bg-slate-800/50 flex items-center gap-3">
        <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <span className="material-symbols-outlined text-primary text-[18px]">account_tree</span>
        </div>
        <div>
          <p className="text-[10px] font-bold text-primary/40 uppercase tracking-widest">Section 04</p>
          <h2 className="text-base font-bold text-primary dark:text-slate-100">How the SD Connects to the Other Diagrams</h2>
        </div>
      </div>
      <div className="p-8 flex flex-col gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { term: 'SD -> SSD', desc: 'The SD expands the SSD by revealing the internal objects hidden inside the black-box system.' },
            { term: 'SD -> UCD', desc: 'The SD gives implementation-facing detail to a use case that first appeared at a higher level in the UCD.' },
            { term: 'SD -> DCD', desc: 'Messages in the SD often correspond to methods that should exist on classes in the Design Class Diagram.' },
            { term: 'Consistency Check', desc: 'If the SD uses objects or messages that the DCD cannot support, something in the design needs to be fixed.' },
          ].map((item) => (
            <div key={item.term} className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-primary/5">
              <p className="text-xs font-bold text-primary mb-1">{item.term}</p>
              <p className="text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 p-5 bg-primary/5 rounded-xl border border-primary/10 flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-primary">Interactive Traceability</p>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Check the Design Class Diagram to see if `createEvent()` and `RSVP()` exist.</p>
          </div>
          <Link href="/diagrams/dcd" className="px-5 py-2.5 bg-white dark:bg-slate-800 text-primary font-bold text-sm rounded-lg shadow-sm border border-primary/20 hover:bg-primary hover:text-white transition-all">
            Go to DCD
          </Link>
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
          <h2 className="text-base font-bold text-primary dark:text-slate-100">Purpose of a Design Class Diagram</h2>
        </div>
      </div>
      <div className="p-8 flex flex-col gap-6">
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          A <span className="font-bold text-primary">Design Class Diagram (DCD)</span> shows the software-side structure of the system. It models classes, attributes, methods, visibility, and relationships that help developers implement the design.
        </p>
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          In this project, the DCD is based on the CampusConnect context with special attention to <span className="font-bold text-primary">Scenario 2</span>, where event creation and RSVP logic need to be supported by actual software classes.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { term: 'From Conceptual to Software', desc: 'A DCD usually comes after the DMD because it turns domain concepts into actual software classes.' },
            { term: 'Show Responsibilities', desc: 'Methods help explain what each class is responsible for doing in the system.' },
            { term: 'Implementation-Oriented', desc: 'Unlike a DMD, the DCD includes types, visibility, and other coding-facing detail.' },
            { term: 'Useful for Coding', desc: 'A strong DCD becomes a blueprint that makes implementation much more straightforward.' },
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { term: 'Attributes', desc: 'Fields stored by the class, often written with visibility and type information.' },
            { term: 'Operations / Methods', desc: 'Behaviors the class supports, often shown with parameters and return types.' },
            { term: 'Visibility', desc: 'Use + for public, - for private, and # for protected.' },
            { term: 'Generalization', desc: 'Inheritance relationship, shown with a solid line and hollow triangle arrow.' },
            { term: 'Composition / Aggregation', desc: 'Strong vs. weak ownership relationships between classes.' },
            { term: 'Dependency', desc: 'A weaker uses relationship, often shown as a dashed line.' },
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
          <span className="material-symbols-outlined text-accent text-[18px]">construction</span>
        </div>
        <div>
          <p className="text-[10px] font-bold text-primary/40 uppercase tracking-widest">Section 03</p>
          <h2 className="text-base font-bold text-primary dark:text-slate-100">How We Build the CampusConnect DCD</h2>
        </div>
      </div>
      <div className="p-8 flex flex-col gap-6">
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          We build the DCD by translating the important conceptual classes and behaviors of CampusConnect into software classes that could realistically be implemented.
        </p>
        <div className="grid grid-cols-1 gap-3">
          {[
            { step: 'Step 1', title: 'Start from domain concepts', desc: 'Take important conceptual classes like Student, Organization, Event, and RSVP from the DMD.' },
            { step: 'Step 2', title: 'Add software detail', desc: 'Attributes gain visibility and types, and classes receive methods that support system behavior.' },
            { step: 'Step 3', title: 'Assign responsibilities', desc: 'Methods like createEvent(), addRSVP(), or cancelRSVP() should live on classes that logically own those behaviors.' },
            { step: 'Step 4', title: 'Add relationships', desc: 'Use multiplicity and relationship types to show how classes depend on, own, or inherit from one another.' },
            { step: 'Step 5', title: 'Check scenario support', desc: 'Make sure Scenario 2’s event creation and RSVP flow can actually be supported by the classes and methods you modeled.' },
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
        <DiagramPreview src="/diagram-images/DCD.png" alt="Design Class Diagram for CampusConnect" />
      </div>
    </div>

    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-primary/5 overflow-hidden">
      <div className="px-8 py-5 border-b border-primary/5 bg-slate-50/50 dark:bg-slate-800/50 flex items-center gap-3">
        <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <span className="material-symbols-outlined text-primary text-[18px]">account_tree</span>
        </div>
        <div>
          <p className="text-[10px] font-bold text-primary/40 uppercase tracking-widest">Section 04</p>
          <h2 className="text-base font-bold text-primary dark:text-slate-100">How the DCD Connects to the Other Diagrams</h2>
        </div>
      </div>
      <div className="p-8 flex flex-col gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { term: 'DCD -> DMD', desc: 'The DCD often grows out of the conceptual classes first identified in the Domain Model Diagram.' },
            { term: 'DCD -> SD', desc: 'Methods in the DCD should support the messages and responsibilities shown in the Sequence Diagram.' },
            { term: 'DCD -> SSD', desc: 'System operations shown in the SSD should be realizable through classes and methods in the DCD.' },
            { term: 'Consistency Check', desc: 'If the DCD cannot support the required scenarios, then the design is not ready for implementation.' },
          ].map((item) => (
            <div key={item.term} className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-primary/5">
              <p className="text-xs font-bold text-primary mb-1">{item.term}</p>
              <p className="text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 p-5 bg-primary/5 rounded-xl border border-primary/10 flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-primary">Interactive Traceability</p>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Trace these methods back to the messages in the Domain Model Diagram.</p>
          </div>
          <Link href="/diagrams/dmd" className="px-5 py-2.5 bg-white dark:bg-slate-800 text-primary font-bold text-sm rounded-lg shadow-sm border border-primary/20 hover:bg-primary hover:text-white transition-all">
            Go to DMD
          </Link>
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

  // Persist progress to localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const saved = localStorage.getItem('umlogic_progress');
      let progress = saved ? JSON.parse(saved) : null;
      if (!progress) {
        progress = {
          ucd: { purpose: false, builder: false, quiz: 0 },
          dmd: { purpose: false, builder: false, quiz: 0 },
          ssd: { purpose: false, builder: false, quiz: 0 },
          sd:  { purpose: false, builder: false, quiz: 0 },
          dcd: { purpose: false, builder: false, quiz: 0 },
        };
      }

      let updated = false;
      if (!progress[diagramType]) {
        progress[diagramType] = { purpose: false, builder: false, quiz: 0 };
      }

      if (activeTab === 'info' && !progress[diagramType].purpose) {
        progress[diagramType].purpose = true;
        updated = true;
      }
      
      if (activeTab === 'build' && !progress[diagramType].builder) {
        progress[diagramType].builder = true;
        updated = true;
      }

      if (quizComplete) {
        const scorePercentage = questions.length > 0 ? Math.round((score / questions.length) * 100) : 0;
        if ((progress[diagramType].quiz || 0) < scorePercentage) {
          progress[diagramType].quiz = scorePercentage;
          updated = true;
        }
      }

      if (updated) {
        localStorage.setItem('umlogic_progress', JSON.stringify(progress));
        window.dispatchEvent(new Event('umlogic_progress_updated'));
      }
    } catch (e) {
      console.error("Failed to save progress", e);
    }
  }, [activeTab, quizComplete, score, diagramType, questions.length]);


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
                         onClick={() => {
                           if (currentQuestionIdx > 0) {
                             setCurrentQuestionIdx(prev => prev - 1);
                             setSelectedAnswer(null);
                             setIsAnswerSubmitted(false);
                           }
                         }}
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
