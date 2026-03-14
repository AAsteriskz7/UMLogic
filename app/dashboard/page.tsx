"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import AppSidebar from '@/components/app-sidebar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// ─── Animation Variants ───────────────────────────────────────────
const fadeUp = {
  initial: { opacity: 0, y: 28, filter: 'blur(4px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.08 } },
};

// ─── Count-up hook ────────────────────────────────────────────────
function useCountUp(target: number, duration = 1.2) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const steps = 60;
    const increment = target / steps;
    const interval = (duration * 1000) / steps;
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.round(start));
    }, interval);
    return () => clearInterval(timer);
  }, [inView, target, duration]);

  return { count, ref };
}

// ─── Progress Card ────────────────────────────────────────────────
interface ProgressCardProps {
  label: string; subtitle: string; pct: number;
  status: 'ready' | 'in-progress'; delay: number;
}

const statusConfig = {
  ready:       { badge: 'COMPLETED',   bg: 'bg-emerald-100', text: 'text-emerald-700', stroke: '#10b981', ring: '#10b981' },
  'in-progress': { badge: 'IN PROGRESS', bg: 'bg-blue-100',   text: 'text-blue-700',   stroke: '#003057', ring: '#003057' },
};

function ProgressCard({ label, subtitle, pct, status, delay }: ProgressCardProps) {
  const cfg = statusConfig[status];
  const circum = 2 * Math.PI * 15.9155;
  const dashArr = `${(pct / 100) * circum} ${circum}`;
  const { count, ref } = useCountUp(pct);

  return (
    <motion.div
      variants={fadeUp}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -6, scale: 1.03, boxShadow: '0 20px 40px rgba(0,48,87,0.15)' }}
      className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 cursor-default select-none transition-colors hover:border-primary/30"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="relative h-12 w-12 flex items-center justify-center">
          <svg className="absolute inset-0 transform -rotate-90" viewBox="0 0 36 36">
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none" stroke="#e2e8f0" strokeWidth="3"
            />
            <motion.path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none" stroke={cfg.ring} strokeLinecap="round" strokeWidth="3"
              initial={{ strokeDasharray: '0 ' + circum }}
              animate={{ strokeDasharray: dashArr }}
              transition={{ duration: 1.2, delay: delay + 0.2, ease: 'easeOut' }}
            />
          </svg>
          <div ref={ref} className="text-[10px] font-bold">{count}%</div>
        </div>
        <span className={`px-2 py-1 ${cfg.bg} ${cfg.text} text-[10px] font-bold rounded-lg uppercase tracking-tight`}>
          {pct === 0 ? 'START' : cfg.badge}
        </span>
      </div>
      <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">{label}</h4>
      <p className="text-xs text-slate-500">{subtitle}</p>
    </motion.div>
  );
}

// ─── Main Dashboard ───────────────────────────────────────────────
export default function Dashboard() {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [briefOpen, setBriefOpen] = useState(false);
  const [progress, setProgress] = useState<Record<string, any>>({});

  useEffect(() => {
    const saved = localStorage.getItem('umlogic_progress');
    if (saved) {
      setProgress(JSON.parse(saved));
    } else {
      // Default initial state
      const initial = {
        ucd: { purpose: true, builder: true, quiz: 100 },
        dmd: { purpose: true, builder: false, quiz: 0 },
        ssd: { purpose: false, builder: false, quiz: 0 },
        sd:  { purpose: false, builder: false, quiz: 0 },
        dcd: { purpose: false, builder: false, quiz: 0 },
      };
      localStorage.setItem('umlogic_progress', JSON.stringify(initial));
      setProgress(initial);
    }
  }, []);

  const calculatePct = (key: string) => {
    const p = progress[key];
    if (!p) return 0;
    let score = 0;
    if (p.purpose) score += 33;
    if (p.builder) score += 33;
    if (p.quiz > 0) score += Math.round((p.quiz / 100) * 34);
    return Math.min(100, score);
  };

  const modulesData = [
    { id: 'ucd', label: "UCD", subtitle: "Use Case Diagram" },
    { id: 'dmd', label: "DMD", subtitle: "Domain Model" },
    { id: 'ssd', label: "SSD", subtitle: "System Sequence" },
    { id: 'sd',  label: "SD",  subtitle: "Sequence Diagram" },
    { id: 'dcd', label: "DCD", subtitle: "Design Class" },
  ];

  const modules = modulesData.map(m => {
    const pct = calculatePct(m.id);
    return {
      ...m,
      pct,
      status: (pct === 100 ? 'ready' : 'in-progress') as 'ready' | 'in-progress'
    };
  });

  const currentModule = modules.find(m => m.pct < 100) || modules[0];
  const moduleIndex = modules.indexOf(currentModule) + 1;

  const handleClearStorage = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 antialiased">
      <AppSidebar onSettings={() => setSettingsOpen(true)} />

      <main className="flex-1 overflow-y-auto p-8">

        {/* ── Header ───────────────────────────────────────────── */}
        <motion.header
          className="flex justify-between items-center mb-10"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <motion.h2
              className="text-2xl font-black text-slate-800 dark:text-slate-100"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Welcome Back! 👋
            </motion.h2>
            <motion.p
              className="text-sm text-slate-400 mt-0.5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.25 }}
            >
              Keep the momentum — you&apos;re {currentModule.pct}% through Module {moduleIndex} ({currentModule.label})
            </motion.p>
          </div>
          <motion.div
            className="relative w-80"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">search</span>
            <input
              className="w-full bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl py-2.5 pl-10 pr-4 focus:ring-2 focus:ring-primary text-sm shadow-sm outline-none transition-all"
              placeholder="Search diagrams, scenarios..."
              type="text"
            />
          </motion.div>
        </motion.header>

        {/* ── Hero Banner ───────────────────────────────────────── */}
        <motion.section
          className="bg-primary rounded-2xl overflow-hidden mb-8 shadow-xl relative group cursor-default"
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
        >
          {/* animated shimmer on hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 z-30 pointer-events-none"
            initial={{ x: '-100%' }}
            whileHover={{ x: '100%' }}
            transition={{ duration: 0.8 }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/85 to-transparent z-10" />
          <div className="h-64 relative flex items-center px-12 z-20">
            <div className="max-w-xl">
              <motion.span
                className="inline-block px-3 py-1 bg-accent/20 text-accent text-xs font-bold rounded-full mb-4 uppercase tracking-widest"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                {currentModule.pct === 0 ? "Start Learning" : "Continue Learning"}
              </motion.span>
              <motion.h2
                className="text-white text-4xl font-black mb-3"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.45 }}
              >
                Module {moduleIndex}: {currentModule.subtitle}
              </motion.h2>
              <motion.p
                className="text-white/70 text-base mb-6"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.55 }}
              >
                {currentModule.id === 'ucd' ? "Master actors and system boundaries." : 
                 currentModule.id === 'dmd' ? "Map conceptual classes for Daniel's Robotics Club." :
                 "Deep dive into the internal logic and consistency of CampusConnect."}
              </motion.p>
              <div className="flex gap-4">
                <motion.button
                  className="bg-accent text-primary px-7 py-3 rounded-xl font-extrabold text-sm flex items-center gap-2 group/btn"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.65 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {currentModule.pct === 0 ? "Start Module" : "Resume Module"}
                  <motion.span
                    className="material-symbols-outlined text-[16px]"
                    initial={{ x: 0 }}
                    whileHover={{ x: 4 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    play_arrow
                  </motion.span>
                </motion.button>
                <motion.button
                  className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-3 rounded-xl font-bold text-sm transition-colors"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.75 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Exam Simulation
                </motion.button>
              </div>
            </div>
          </div>
          <div
            className="absolute right-0 top-0 h-full w-1/2 bg-cover bg-center"
            style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBUfVkA1xL0B823-S3yuApdu-RBRqCAASuMqu1giSKeJxGJdTMpLwVnKhr_EFFb9NRibBBTo3z95yJT6qmosBCSMWKqtOiDBJPltGKR5cQ5kF5fEEFxBSgEVc99aO08qRZookwodERsV7XUnTxC89iwUs0V9Hg9CI2-NYBHlzOcehXEWxBN63O1KRy5LEzAEAljwR8J2iSptTh613icNPcWZ0r40xqBnEY13lItzlCNR5HySEGvBHo8kuCq9vd1xJobE9wjruqRD')" }}
          />
        </motion.section>

        {/* ── Progress Tracking ─────────────────────────────────── */}
        <motion.section
          className="mb-8"
          variants={stagger}
          initial="initial"
          animate="animate"
        >
          <motion.div
            className="flex justify-between items-center mb-5"
            variants={fadeUp}
            transition={{ duration: 0.4 }}
          >
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">Progress Tracking</h3>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {modules.map((m, idx) => (
              <ProgressCard key={m.id} label={m.label} subtitle={m.subtitle} pct={m.pct} status={m.status} delay={0.1 + (idx * 0.08)} />
            ))}
          </div>
        </motion.section>

        {/* ── Current Scenario ──────────────────────────────────── */}
        <motion.section
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.5 }}
        >
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-5">Current Scenario</h3>
          <motion.div
            className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col md:flex-row"
            whileHover={{ boxShadow: '0 16px 48px rgba(0,48,87,0.12)', y: -2 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <div
              className="md:w-1/3 bg-cover bg-center min-h-[200px]"
              style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAIwyXhHzJnLkHlrLLENQ0edVn2Kbgjkxj2v8fMmVfK2mqvpZY4VH8NztYbm3UbIKoa9dlLOLE5OdP1hzgffXOnfZTSvbc5UsSLQD3NTFKi9Ls8nOSwXaetJIUVaHfxKGhz8rRA4gstssnY2DECSYs9GcyA4MmuP1WZMfu_UAidOO_JipLojSv3tHLfGrJJeF4u_Zl7ankjGpisZv11qpF68lnZPqSFy5gC5LMrjxQbcMy6w0jvJkRoRgbHgrldfBLwgZCTSsfCPqO2')" }}
            />
            <div className="md:w-2/3 p-8 flex flex-col justify-between">
              <div>
                <motion.div
                  className="flex items-center gap-2 mb-2"
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.7 }}
                >
                  <h4 className="text-2xl font-black text-primary dark:text-accent">CampusConnect</h4>
                  <span className="px-2 py-0.5 bg-accent/10 text-accent text-[10px] font-bold rounded border border-accent/20">CASE STUDY</span>
                </motion.div>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                  Manage student organizations, memberships, and events across Georgia Tech. Handle organization requests, event RSVPs, and capacity management for a vibrant campus life.
                </p>
              </div>
              <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-700 pt-6">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    <div className="h-8 w-8 rounded-full border-2 border-white bg-slate-200 bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBG6HaC3mDAq0GaCCtzYkfPqOOgZ18AG-uYOWM5wN8Bco_Aa56FjRQcCNrb3LTk4jkjf7FTG8I87z2WIczEoVwgazrnKJSDo63Gz6Ud_E1-LEGmE8ZQnZxXmzMl3-uaxmiPHpAvr3euMddbw2D0ffAPOhbYvO7iZ6Dm1NAT3elFJB36DdDisfImwmqdN8tQU6r2u9P0Lait-zUystxB8LxYxko2ysbQBD5KnOWDAIXFvmwn4kQjklw8E7ZGZxI1gm6fPlwmsW3YqKwm')" }} />
                    <div className="h-8 w-8 rounded-full border-2 border-white bg-slate-200 bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC4CQgaMHzjUq7wDkbS-TAbyrNldrt5g9jwUY2j9eQ-5Xc1AIWv5cM9uFC6pD1d87je1pfhIe-KFYmqecam-lkfA55eEQ7lzBhcBoaS3c6ceDU313K0daaCCd5TK838TfYgLnL3ayBxKv1oeOJVDlO1Pb1aFkkBB_e8UoluGplL6x7efBfnhz-RRGNc48fTBSnGOilV1lzPlD8HyC6GEIiLAIlcqApUhqJW-xubj1x9dhDA23jqt2Yb9Y57UKlA5plnOhflEeTA8WGR')" }} />
                    <div className="h-8 w-8 rounded-full border-2 border-white bg-slate-800 flex items-center justify-center text-[10px] font-bold text-white">+5</div>
                  </div>
                  <span className="text-xs font-bold text-slate-400">Diagram Modules</span>
                </div>
                <div className="flex gap-3">
                  <motion.button
                    onClick={() => setBriefOpen(true)}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    className="px-5 py-2 rounded-lg text-sm font-bold bg-primary text-white hover:opacity-90 transition-opacity"
                  >
                    Read Brief
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.section>

      </main>

      {/* Settings Dialog */}
      <AnimatePresence>
        {settingsOpen && (
          <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
            <DialogContent className="sm:max-w-md font-display">
              <DialogHeader>
                <DialogTitle>Settings</DialogTitle>
                <DialogDescription>Manage your application preferences and local storage.</DialogDescription>
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
                    Clear Local Storage &amp; Reset Progress
                  </motion.button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>

      {/* Brief Dialog */}
      <AnimatePresence>
        {briefOpen && (
          <Dialog open={briefOpen} onOpenChange={setBriefOpen}>
            <DialogContent className="sm:max-w-2xl font-display max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl font-black text-primary">CampusConnect Brief</DialogTitle>
                <DialogDescription className="text-slate-500">
                  Georgia Tech&apos;s centralized student organization management system.
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col gap-6 py-4">
                <section>
                  <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-2 border-b pb-1">The Goal</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    CampusConnect is designed to streamline how student organizations, memberships, and events are managed across campus. The system supports multiple organizations, each with a unique ID, description, one president, and multiple officers.
                  </p>
                </section>
                <section>
                  <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-2 border-b pb-1">Key Scenarios</h4>
                  <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-400 space-y-2">
                    <li><strong>Scenario 1:</strong> Jordan joining the AI Club via university authentication. Maya (President) approves the request.</li>
                    <li><strong>Scenario 2:</strong> Daniel (Officer) creating a Robotics workshop. Handling RSVPs and capacity limits.</li>
                    <li><strong>Scenario 3:</strong> Priya viewing her memberships and upcoming events for the week.</li>
                  </ul>
                </section>
                <section>
                  <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-2 border-b pb-1">Technical Focus</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    This interactive tool focuses on teaching UML diagramming (UCD, DMD, SSD, SD, DCD) by visualizing the internal logic and connections between these scenarios.
                  </p>
                </section>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </div>
  );
}
