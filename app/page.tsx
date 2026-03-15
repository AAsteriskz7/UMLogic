"use client";

import Link from 'next/link';
import { motion, useInView, Variants } from 'framer-motion';
import { useRef } from 'react';

// ─── Reusable scroll-reveal wrapper ──────────────────────────────
function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 40, filter: 'blur(6px)' }}
      animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

// ─── Stagger container ───────────────────────────────────────────
function StaggerContainer({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
    >
      {children}
    </motion.div>
  );
}

const staggerChild: Variants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(4px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

// ═════════════════════════════════════════════════════════════════
export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-[#F8FAFC] text-slate-700 font-display selection:bg-[#B3A369] selection:text-white">

      {/* Background Decorations */}
      <div className="absolute inset-0 grid-pattern pointer-events-none"></div>
      <motion.div
        className="absolute top-0 left-1/4 w-96 h-96 bg-[#B3A369]/10 rounded-full blur-[120px] pointer-events-none"
        animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[150px] pointer-events-none"
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      {/* ── Top Navigation ──────────────────────────────────── */}
      <motion.header
        className="sticky top-0 z-50 backdrop-blur-md border-b border-slate-200 bg-white/70 px-6 py-4 lg:px-20"
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <nav className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.div
            className="flex items-center gap-3"
            whileHover={{ scale: 1.03 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
          >
            <div className="h-10 w-10 bg-primary flex items-center justify-center rounded-lg border border-[#B3A369]/30">
              <span className="material-symbols-outlined text-[#B3A369]">schema</span>
            </div>
            <span className="text-xl font-black tracking-tighter uppercase text-primary">UMLogic</span>
          </motion.div>
          <div className="hidden md:flex items-center gap-10 text-sm font-medium text-slate-600">
            {['Active Learning', 'Sandbox', 'Testimonials'].map((item) => (
              <motion.a
                key={item}
                className="hover:text-[#B3A369] transition-colors"
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                whileHover={{ y: -2 }}
                transition={{ type: 'spring', stiffness: 500, damping: 20 }}
              >
                {item}
              </motion.a>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <motion.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.96 }}>
              <Link
                href="/dashboard"
                className="bg-[#B3A369] text-primary px-6 py-2.5 rounded-full font-bold text-sm shadow-[0_0_20px_rgba(179,163,105,0.3)] inline-block"
              >
                Get Started
              </Link>
            </motion.div>
          </div>
        </nav>
      </motion.header>

      {/* ── Hero Section ────────────────────────────────────── */}
      <section className="relative pt-20 pb-32 px-6 lg:px-20 max-w-7xl mx-auto overflow-visible">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative z-10">
            {/* Animated Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B3A369]/10 border border-[#B3A369]/20 text-[#B3A369] text-xs font-bold uppercase tracking-widest mb-6"
              initial={{ opacity: 0, scale: 0.85, x: -20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#B3A369] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#B3A369]" />
              </span>
              Next-Gen Modeling
            </motion.div>

            {/* Headline — each word block staggered */}
            <motion.h1
              className="text-6xl lg:text-8xl font-black leading-[0.9] tracking-tight mb-8 text-primary"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              The Future of <span className="text-gradient">Object-Oriented</span> Design
            </motion.h1>

            <motion.p
              className="text-lg text-slate-400 max-w-lg mb-10 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              Experience a new era of architecture with high-fidelity UML modeling, real-time code generation, and interactive learning nodes.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/sandbox"
                  className="bg-primary border border-[#B3A369]/30 text-white px-8 py-4 rounded-xl font-bold flex items-center gap-3 group"
                >
                  Try Sandbox
                  <motion.span
                    className="material-symbols-outlined text-[18px]"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', repeatDelay: 2 }}
                  >
                    arrow_forward
                  </motion.span>
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/dashboard"
                  className="bg-slate-100 text-slate-700 px-8 py-4 rounded-xl font-bold border border-slate-200 hover:border-slate-300 hover:bg-slate-200 transition-all inline-block"
                >
                  Open Dashboard
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* Hero Visual — floating UML cards */}
          <motion.div
            className="relative h-[500px] w-full"
            style={{ perspective: '1000px' }}
            initial={{ opacity: 0, scale: 0.92, rotateY: -8 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/40 to-transparent rounded-3xl border border-[#B3A369]/20 rotate-3 translate-x-4 translate-y-4" />
            <div className="relative h-full w-full bg-white rounded-3xl border border-slate-200 p-8 overflow-hidden shadow-2xl">
              {/* Floating class box 1 */}
              <motion.div
                className="absolute top-10 left-10 w-48 bg-white border border-slate-200 rounded-lg p-4 shadow-xl"
                initial={{ rotate: -6, y: 40, opacity: 0 }}
                animate={{ rotate: -2, y: 0, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.7, ease: 'easeOut' }}
                whileHover={{ scale: 1.06, rotate: 0, boxShadow: '0 20px 40px rgba(0,48,87,0.15)' }}
              >
                <div className="text-[10px] font-bold text-[#B3A369] mb-2 border-b border-[#B3A369]/20 pb-1">CLASS: OrderManager</div>
                <div className="space-y-1">
                  <motion.div className="h-1 bg-slate-700 rounded" initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 0.6, delay: 1.0 }} />
                  <motion.div className="h-1 bg-slate-700 rounded" initial={{ width: 0 }} animate={{ width: '75%' }} transition={{ duration: 0.5, delay: 1.15 }} />
                </div>
              </motion.div>

              {/* Floating class box 2 */}
              <motion.div
                className="absolute bottom-20 right-10 w-56 bg-slate-50 border border-slate-200 rounded-lg p-4 shadow-xl"
                initial={{ rotate: 6, y: 50, opacity: 0 }}
                animate={{ rotate: 1, y: 0, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.9, ease: 'easeOut' }}
                whileHover={{ scale: 1.06, rotate: 0, boxShadow: '0 20px 40px rgba(0,48,87,0.15)' }}
              >
                <div className="text-[10px] font-bold text-[#B3A369] mb-2 border-b border-[#B3A369]/20 pb-1">INTERFACE: IRepository</div>
                <div className="space-y-1">
                  <motion.div className="h-1 bg-slate-600 rounded" initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 0.5, delay: 1.2 }} />
                  <motion.div className="h-1 bg-slate-600 rounded" initial={{ width: 0 }} animate={{ width: '50%' }} transition={{ duration: 0.4, delay: 1.35 }} />
                </div>
              </motion.div>

              {/* Connection line — draws in */}
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-40 border-2 border-dashed border-[#B3A369]/30 rounded-2xl flex items-center justify-center"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.1, ease: 'easeOut' }}
              >
                <motion.span
                  className="material-symbols-outlined text-[#B3A369] text-5xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.4 }}
                  transition={{ duration: 0.4, delay: 1.4 }}
                >
                  polyline
                </motion.span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Active Learning Section ─────────────────────────── */}
      <section className="py-32 px-6 lg:px-20 max-w-7xl mx-auto border-t border-[#B3A369]/10" id="active-learning">
        <div className="flex flex-col lg:flex-row gap-20 items-end mb-20">
          <Reveal className="flex-1">
            <h2 className="text-5xl lg:text-7xl font-black mb-6 text-primary">
              Active <span className="text-[#B3A369]">Learning</span>
            </h2>
            <p className="text-xl text-slate-400 max-w-xl">
              Master the complexities of UML logic through our adaptive challenge system. It&apos;s not just a course — it&apos;s a structural evolution.
            </p>
          </Reveal>
          <Reveal className="text-right" delay={0.15}>
            <div className="text-[#B3A369] font-bold text-4xl mb-1">98%</div>
            <div className="text-slate-500 text-sm uppercase tracking-widest font-bold">Retention Rate</div>
          </Reveal>
        </div>

        <StaggerContainer className="grid md:grid-cols-3 gap-8">
          {/* Card: Mini Quiz */}
          <motion.div
            variants={staggerChild}
            className="group bg-white border border-slate-200 rounded-2xl p-8 shadow-sm cursor-default"
            whileHover={{ y: -8, boxShadow: '0 20px 50px rgba(0,48,87,0.12)', borderColor: 'rgba(179,163,105,0.4)' }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <motion.div
              className="h-14 w-14 bg-[#B3A369]/10 rounded-xl flex items-center justify-center mb-6"
              whileHover={{ scale: 1.15, rotate: 5 }}
            >
              <span className="material-symbols-outlined text-[#B3A369]">quiz</span>
            </motion.div>
            <h3 className="text-2xl font-bold mb-4 text-primary">Mini Quiz</h3>
            <p className="text-slate-400 mb-6">Interactive challenges based on real-world architecture patterns. Validate your intuition instantly.</p>
            <div className="h-40 bg-slate-50 rounded-xl border border-slate-100 overflow-hidden relative p-4">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
              <div className="w-full h-2 bg-slate-200 rounded-full mb-4 overflow-hidden">
                <motion.div
                  className="h-full bg-[#B3A369] rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: '66%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
                />
              </div>
              <div className="space-y-2">
                <div className="h-4 w-full bg-slate-200 rounded" />
                <div className="h-4 w-5/6 bg-slate-200 rounded" />
              </div>
            </div>
          </motion.div>

          {/* Card: Real-time Feedback */}
          <motion.div
            variants={staggerChild}
            className="group bg-white border border-slate-200 rounded-2xl p-8 shadow-sm cursor-default"
            whileHover={{ y: -8, boxShadow: '0 20px 50px rgba(0,48,87,0.12)', borderColor: 'rgba(179,163,105,0.4)' }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <motion.div
              className="h-14 w-14 bg-[#B3A369]/10 rounded-xl flex items-center justify-center mb-6"
              whileHover={{ scale: 1.15, rotate: -5 }}
            >
              <span className="material-symbols-outlined text-[#B3A369]">feedback</span>
            </motion.div>
            <h3 className="text-2xl font-bold mb-4 text-primary">Real-time Feedback</h3>
            <p className="text-slate-400 mb-6">Our engine analyzes your UML connections as you draw them, highlighting structural flaws in milliseconds.</p>
            <div className="h-40 bg-slate-50 rounded-xl border border-slate-100 overflow-hidden relative flex items-center justify-center">
              <motion.span
                className="material-symbols-outlined text-[#B3A369] text-5xl"
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.4 }}
              >
                check_circle
              </motion.span>
            </div>
          </motion.div>

          {/* Card: Progress Tracking */}
          <motion.div
            variants={staggerChild}
            className="group bg-white border border-slate-200 rounded-2xl p-8 shadow-sm cursor-default"
            whileHover={{ y: -8, boxShadow: '0 20px 50px rgba(0,48,87,0.12)', borderColor: 'rgba(179,163,105,0.4)' }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <motion.div
              className="h-14 w-14 bg-[#B3A369]/10 rounded-xl flex items-center justify-center mb-6"
              whileHover={{ scale: 1.15, rotate: 5 }}
            >
              <span className="material-symbols-outlined text-[#B3A369]">analytics</span>
            </motion.div>
            <h3 className="text-2xl font-bold mb-4 text-primary">Progress Tracking</h3>
            <p className="text-slate-400 mb-6">Visualize your growth with analytics that map your mastery across all 5 UML diagram types.</p>
            <div className="h-40 bg-slate-50 rounded-xl border border-slate-100 overflow-hidden relative p-4 flex items-end gap-2">
              {[50, 66, 75, 50, 100].map((h, i) => (
                <motion.div
                  key={i}
                  className={`flex-1 rounded-t ${i === 2 || i === 4 ? 'bg-[#B3A369] shadow-[0_0_15px_rgba(179,163,105,0.4)]' : 'bg-slate-300'}`}
                  initial={{ height: 0 }}
                  whileInView={{ height: `${h}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.1, ease: 'easeOut' }}
                />
              ))}
            </div>
          </motion.div>
        </StaggerContainer>
      </section>

      {/* ── Sandbox Section ─────────────────────────────────── */}
      <section className="py-32 px-6 lg:px-20 bg-slate-50/50 relative overflow-hidden" id="sandbox">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            {/* IDE Visual */}
            <Reveal className="order-2 lg:order-1 relative">
              <div className="absolute -inset-4 bg-[#B3A369]/20 blur-3xl rounded-full opacity-30" />
              <motion.div
                className="relative bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xl"
                whileHover={{ y: -4, boxShadow: '0 24px 60px rgba(0,48,87,0.18)' }}
                transition={{ type: 'spring', stiffness: 250, damping: 20 }}
              >
                {/* Window chrome */}
                <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 border-b border-slate-200">
                  <div className="h-3 w-3 rounded-full bg-red-400/70" />
                  <div className="h-3 w-3 rounded-full bg-yellow-400/70" />
                  <div className="h-3 w-3 rounded-full bg-green-400/70" />
                  <div className="ml-4 text-[10px] text-slate-500 font-mono">sequence_diagram.mmd</div>
                </div>
                <div className="grid grid-cols-12 h-[420px]">
                  <div className="col-span-1 border-r border-slate-200 flex flex-col items-center py-4 gap-6 text-slate-500">
                    <span className="material-symbols-outlined text-sm">folder</span>
                    <span className="material-symbols-outlined text-sm">search</span>
                    <span className="material-symbols-outlined text-sm text-[#B3A369]">description</span>
                    <span className="material-symbols-outlined text-sm">settings</span>
                  </div>
                  <div className="col-span-11 p-6 font-mono text-xs leading-relaxed text-slate-600 bg-slate-50/30 relative">
                    {[
                      { num: '01', code: <><span className="text-primary font-semibold">sequenceDiagram</span></> },
                      { num: '02', code: <span className="ml-4">participant <span className="text-[#B3A369] font-semibold">UC</span> as UI Controller</span> },
                      { num: '03', code: <span className="ml-4">participant <span className="text-[#B3A369] font-semibold">EM</span> as EventManager</span> },
                      { num: '04', code: <span className="ml-4">participant <span className="text-[#B3A369] font-semibold">DB</span> as Database</span> },
                      { num: '05', code: <span></span> },
                      { num: '06', code: <><span className="text-[#B3A369]">UC</span>-&gt;&gt;<span className="text-[#B3A369]">EM</span>: checkCapacity(eventID)</> },
                      { num: '07', code: <><span className="text-[#B3A369]">EM</span>-&gt;&gt;<span className="text-[#B3A369]">DB</span>: queryEvent(id)</> },
                      { num: '08', code: <><span className="text-[#B3A369]">DB</span>--&gt;&gt;<span className="text-[#B3A369]">EM</span>: eventData</> },
                      { num: '09', code: <><span className="text-[#B3A369]">EM</span>--&gt;&gt;<span className="text-[#B3A369]">UC</span>: status: Available</> },
                    ].map((line, i) => (
                      <motion.div
                        key={i}
                        className="flex gap-4 mb-1"
                        initial={{ opacity: 0, x: -12 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: i * 0.07 }}
                      >
                        <span className="text-slate-400 w-5">{line.num}</span>
                        <p>{line.code}</p>
                      </motion.div>
                    ))}
                    {/* Floating tooltip */}
                    <motion.div
                      className="absolute top-1/2 right-6 bg-[#B3A369] text-primary p-3 rounded-lg shadow-xl text-[10px] font-black z-10"
                      initial={{ opacity: 0, scale: 0.6, rotate: -10 }}
                      whileInView={{ opacity: 1, scale: 1, rotate: 2 }}
                      viewport={{ once: true }}
                      transition={{ type: 'spring', stiffness: 250, damping: 15, delay: 0.8 }}
                    >
                      ✓ VALID SEQUENCE
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </Reveal>

            {/* Sandbox Features */}
            <div className="order-1 lg:order-2">
              <Reveal>
                <h2 className="text-5xl lg:text-7xl font-black mb-8 leading-tight text-primary">
                  The <span className="text-[#B3A369]">Sandbox</span>
                </h2>
              </Reveal>
              <StaggerContainer className="space-y-10">
                {[
                  { icon: 'code', title: 'Professional IDE', desc: 'A feature-rich Mermaid editor with live preview, integrated linting, and OOD best-practice hints.' },
                  { icon: 'bolt', title: '2340 Templates', desc: 'Load pre-built CS 2340 diagram templates — Factory, Singleton, Observer, and more — with one click.' },
                  { icon: 'bug_report', title: 'Visual Debugging', desc: 'Step through sequence diagrams frame by frame and watch the traceability list update in real-time.' },
                ].map((item) => (
                  <motion.div key={item.title} variants={staggerChild} className="flex gap-6">
                    <motion.div
                      className="shrink-0 h-12 w-12 bg-primary rounded-lg flex items-center justify-center"
                      whileHover={{ rotate: 8, scale: 1.1 }}
                      transition={{ type: 'spring', stiffness: 400 }}
                    >
                      <span className="material-symbols-outlined text-[#B3A369]">{item.icon}</span>
                    </motion.div>
                    <div>
                      <h4 className="text-xl font-bold mb-2 text-primary">{item.title}</h4>
                      <p className="text-slate-400">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </StaggerContainer>
              <Reveal delay={0.4}>
                <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }} className="inline-block mt-12">
                  <Link
                    href="/sandbox"
                    className="inline-flex items-center gap-3 bg-primary text-white px-8 py-4 rounded-xl font-bold group"
                  >
                    Open Sandbox
                    <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                  </Link>
                </motion.div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ────────────────────────────────────── */}
      <section className="py-32 px-6 lg:px-20 max-w-7xl mx-auto" id="testimonials">
        <Reveal>
          <h2 className="text-4xl font-black mb-16 text-center text-primary">
            Trusted by <span className="text-[#B3A369] italic tracking-tighter uppercase">GT Engineers</span>
          </h2>
        </Reveal>
        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              quote: "The Sandbox changed how I approach my senior design project. Seeing the UML and code side-by-side is just... chef's kiss.",
              name: 'Alex Chen', role: 'CS Student @ GT',
              img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBVTF_xWOLIPT0-ExwRcvU2fdYzcddPHPw1j2nDBxoaw64E2b8wb-939wmfH-1hsxxXevT0jn6hsWJd79f9hfVRy1E9qMI__w9fp7jM9F_1SJjmID5QIS8yDsPa0JJEojc90lpyLojruddfZ_3gbZi5VCX7TUvGbmtDsYq5j3Z6G0vT5Eus00HIHvn5rS2e6jcWtVmbDHA_mQvOyL6qAvV6f8V71eLCcYB6BcDm8jTOJpevIB988dPz50Vc02EOlt7NL_zUmONMeKge',
            },
            {
              quote: "Finally, a logic platform that doesn't look like it was built in 1998. The interactive quizzes are actually fun and the GT gold accents are slick.",
              name: 'Maya Rodriguez', role: 'Software Engineering',
              img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD2KSPH4JP4M2jXRIlowaCRQ0iOjXqqXOuf3VYlFPVG8Wsy_r8hYLZbZFrlBXu6qiZYdDW62y1uN3m8NUYnLlaOKAu3aYa4Lms8jzujzXzgWerqe-i3UXHqQG9XtRItkrZeJCsGor3tz9ZqP-3wUdBX1Un3bPyDAwg-kB62HPNhBdMccEyCY1p0Tc091b1eN_2McHHIv3JjA3Yu22ugZgvlsWfah08K2VzdgEhwVAXQC59MWpcL00R2pChBvkwkucgd0p5IzJJmmhgS',
            },
            {
              quote: "The feedback loop is insanely fast. I've halved my modeling time since switching to UMLogic. It's the future.",
              name: 'Jordan Lee', role: 'Senior Architect',
              img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDwPJ9zmMgWjV-fDjxids3-leyD6bSmoJKjeGMw0eig4_U1UaBFtWBOJIwxYZHyd_AfzBrOXwr5K0z0CBm5CIRhN_k2z5D4NMsqGtNcKY1ILwWuowGrfc9Sakr8RzrE18BFpna5XB9jtTEHK7H48F4Ecb2Bi8In8dv9myGsrfTwW21VsNa2VPGT8e6FEO3bxWt64U-zWDHSDoxAWcRuncS0ztRzHd3Sq0WhlZEqfMFApMGiNwXsotGm658hFrP3kv7FKbMCYsyra4c2',
            },
          ].map((t) => (
            <motion.div
              key={t.name}
              variants={staggerChild}
              className="p-8 bg-white rounded-3xl border border-slate-200 flex flex-col gap-6 relative group overflow-hidden shadow-sm"
              whileHover={{ y: -6, boxShadow: '0 20px 50px rgba(0,48,87,0.1)' }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-15 transition-opacity">
                <span className="material-symbols-outlined text-9xl text-primary">format_quote</span>
              </div>
              <p className="text-base text-slate-500 relative z-10 leading-relaxed italic">&ldquo;{t.quote}&rdquo;</p>
              <div className="flex items-center gap-4 mt-auto">
                <div
                  className="h-12 w-12 rounded-full overflow-hidden bg-slate-200 bg-cover bg-center shrink-0"
                  style={{ backgroundImage: `url('${t.img}')` }}
                />
                <div>
                  <div className="font-bold text-primary">{t.name}</div>
                  <div className="text-xs text-[#B3A369] font-bold uppercase tracking-wider">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </StaggerContainer>
      </section>

      {/* ── CTA Section ─────────────────────────────────────── */}
      <section className="py-20 px-6 lg:px-20">
        <Reveal>
          <motion.div
            className="max-w-5xl mx-auto bg-gradient-to-br from-primary to-primary/80 rounded-[3rem] p-12 lg:p-20 text-center relative overflow-hidden shadow-2xl"
            whileHover={{ scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          >
            <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-[#B3A369]/20 rounded-full blur-[100px]" />
            <div className="absolute top-0 left-0 w-full h-full grid-pattern opacity-5" />
            <h2 className="text-4xl lg:text-6xl font-black mb-8 text-white relative z-10">
              Ready to evolve your <span className="text-[#B3A369]">Architecture?</span>
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto mb-12 text-lg relative z-10">
              Join CS 2340 students mastering the next generation of software design patterns with UMLogic. Free access for all current GT students.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
              <motion.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.97 }}>
                <Link href="/sandbox" className="bg-[#B3A369] text-primary px-10 py-5 rounded-2xl font-black text-lg shadow-xl inline-block">
                  Launch Sandbox Free
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.97 }}>
                <Link href="/dashboard" className="bg-white/10 backdrop-blur text-white px-10 py-5 rounded-2xl font-black text-lg border border-white/20 inline-block">
                  Go to Dashboard
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </Reveal>
      </section>

      {/* ── Footer ──────────────────────────────────────────── */}
      <Reveal>
        <footer className="py-12 px-6 lg:px-20 border-t border-slate-200 bg-white">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#B3A369]">schema</span>
              <span className="text-xl font-black tracking-tighter uppercase text-primary">UMLogic</span>
            </div>
            <div className="flex gap-8 text-slate-500 text-sm font-bold uppercase tracking-widest">
              <a className="hover:text-[#B3A369] transition-colors" href="#">Privacy</a>
              <a className="hover:text-[#B3A369] transition-colors" href="#">Terms</a>
              <a className="hover:text-[#B3A369] transition-colors" href="#">GitHub</a>
            </div>
            <p className="text-slate-500 text-sm">© 2025 UMLogic. Built for the high-performers.</p>
          </div>
        </footer>
      </Reveal>
    </div>
  );
}
