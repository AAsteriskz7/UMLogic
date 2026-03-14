"use client";

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function Dashboard() {
  const [settingsOpen, setSettingsOpen] = useState(false);

  const handleClearStorage = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 antialiased">
      {/* SideNavBar */}
      <aside className="w-64 bg-primary text-white flex flex-col justify-between p-6 shrink-0">
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-accent flex items-center justify-center text-primary">
              <span className="material-symbols-outlined font-bold">account_tree</span>
            </div>
            <div className="flex flex-col">
              <h1 className="text-white text-lg font-bold leading-none">UMLogic</h1>
              <p className="text-white/60 text-xs font-medium">Object &amp; Design</p>
            </div>
          </div>
          <nav className="flex flex-col gap-2">
            <a className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/10 text-white" href="#">
              <span className="material-symbols-outlined">dashboard</span>
              <span className="text-sm font-medium">Dashboard</span>
            </a>
            <a className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:bg-white/5 hover:text-white transition-colors" href="#">
              <span className="material-symbols-outlined">database</span>
              <span className="text-sm font-medium">Models</span>
            </a>
            <a className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:bg-white/5 hover:text-white transition-colors" href="#">
              <span className="material-symbols-outlined">list_alt</span>
              <span className="text-sm font-medium">Requirements</span>
            </a>
            <a className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:bg-white/5 hover:text-white transition-colors" href="#">
              <span className="material-symbols-outlined">account_tree</span>
              <span className="text-sm font-medium">Architecture</span>
            </a>
            <a className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:bg-white/5 hover:text-white transition-colors" href="#">
              <span className="material-symbols-outlined">play_circle</span>
              <span className="text-sm font-medium">Execution</span>
            </a>
          </nav>
        </div>
        <div className="flex flex-col gap-4">
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <p className="text-xs text-white/50 mb-2 uppercase tracking-wider font-bold">Current Level</p>
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-accent">Lvl 4: Architect</span>
              <span className="text-xs text-white/50">84%</span>
            </div>
            <div className="w-full bg-white/10 h-1.5 rounded-full mt-2 overflow-hidden">
              <div className="bg-accent h-full w-[84%]"></div>
            </div>
          </div>
          <button className="w-full py-3 px-4 bg-accent text-primary font-bold rounded-xl text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
            <span className="material-symbols-outlined text-sm">add</span>
            New Project
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-8">
        {/* Header/Search */}
        <header className="flex justify-between items-center mb-10">
          <div className="flex items-center gap-8">
            <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100">Welcome Back!</h2>
            <div className="relative w-96">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
              <input className="w-full bg-white dark:bg-slate-800 border-none rounded-xl py-2.5 pl-11 pr-4 focus:ring-2 focus:ring-primary text-sm shadow-sm" placeholder="Search diagrams, scenarios..." type="text" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => setSettingsOpen(true)} className="p-2 rounded-xl bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 shadow-sm transition-colors hover:bg-slate-50 dark:hover:bg-slate-700">
              <span className="material-symbols-outlined">settings</span>
            </button>
            <button className="p-2 rounded-xl bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 shadow-sm transition-colors hover:bg-slate-50 dark:hover:bg-slate-700">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <div className="h-10 w-10 rounded-full border-2 border-primary overflow-hidden bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA9pG0-q9tc8LKqYZxZX-w5_aE39ZCb8UZvnGYdfy4GBdwpjqQyXg6MzqCie4-MOVrwzZpKrKjMvmUQDDNb4pddfATySXpiPQxiCUnRPCESjwoxuHHLy7PhusDDwpA_F2e-Ntoo0lbNncbaxsMB3M8Ztm0jlOENRXkw6XMIUY7sSWhu-pxm_dMxe177MHEaS0Qu4Ltqi8-_4fi8GVEZot_x5mPK-t3XgJW7ylvla7NDfTAReb3eukAQYyyxP3GqducN62y-jOJnqn5Y')" }} />
          </div>
        </header>

        {/* Hero Section */}
        <section className="bg-primary rounded-xl overflow-hidden mb-10 shadow-xl relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-transparent z-10"></div>
          <div className="h-64 relative flex items-center px-12 z-20">
            <div className="max-w-xl">
              <span className="inline-block px-3 py-1 bg-accent/20 text-accent text-xs font-bold rounded-full mb-4 uppercase tracking-widest">Featured Course</span>
              <h2 className="text-white text-4xl font-black mb-4">Mastering Objects &amp; Design</h2>
              <p className="text-white/70 text-lg mb-6">Master the art of software modeling with interactive scenarios and real-time feedback.</p>
              <button className="bg-accent text-primary px-8 py-3 rounded-xl font-extrabold text-sm hover:scale-105 transition-transform">
                Start Learning
              </button>
            </div>
          </div>
          <div className="absolute right-0 top-0 h-full w-1/2 bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBUfVkA1xL0B823-S3yuApdu-RBRqCAASuMqu1giSKeJxGJdTMpLwVnKhr_EFFb9NRibBBTo3z95yJT6qmosBCSMWKqtOiDBJPltGKR5cQ5kF5fEEFxBSgEVc99aO08qRZookwodERsV7XUnTxC89iwUs0V9Hg9CI2-NYBHlzOcehXEWxBN63O1KRy5LEzAEAljwR8J2iSptTh613icNPcWZ0r40xoTxqBnEY13lItzlCNR5HySEGvBHo8kuCq9vd1xJobE9wjruqRD')" }}></div>
        </section>

        {/* Progress Tracking Grid */}
        <section className="mb-10">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">Progress Tracking</h3>
            <a className="text-sm font-semibold text-primary dark:text-primary/70" href="#">View Syllabus</a>
          </div>
          <div className="grid grid-cols-5 gap-4">
            {/* UCD */}
            <div className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className="relative h-12 w-12 flex items-center justify-center">
                  <svg className="absolute inset-0 transform -rotate-90" viewBox="0 0 36 36">
                    <path className="text-slate-100 dark:text-slate-700" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3"></path>
                    <path className="text-green-500" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray="100, 100" strokeLinecap="round" strokeWidth="3"></path>
                  </svg>
                  <span className="text-[10px] font-bold">100%</span>
                </div>
                <span className="px-2 py-1 bg-green-100 text-green-700 text-[10px] font-bold rounded-lg">READY</span>
              </div>
              <h4 className="font-bold text-slate-900 dark:text-white">UCD</h4>
              <p className="text-xs text-slate-500">Use Case Diagram</p>
            </div>
            {/* DMD */}
            <div className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className="relative h-12 w-12 flex items-center justify-center">
                  <svg className="absolute inset-0 transform -rotate-90" viewBox="0 0 36 36">
                    <path className="text-slate-100 dark:text-slate-700" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3"></path>
                    <path className="text-primary" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray="65, 100" strokeLinecap="round" strokeWidth="3"></path>
                  </svg>
                  <span className="text-[10px] font-bold">65%</span>
                </div>
                <span className="px-2 py-1 bg-blue-100 text-blue-700 text-[10px] font-bold rounded-lg">IN PROGRESS</span>
              </div>
              <h4 className="font-bold text-slate-900 dark:text-white">DMD</h4>
              <p className="text-xs text-slate-500">Domain Model</p>
            </div>
            {/* SSD */}
            <div className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md transition-shadow opacity-60">
              <div className="flex justify-between items-start mb-4">
                <div className="relative h-12 w-12 flex items-center justify-center">
                  <svg className="absolute inset-0 transform -rotate-90" viewBox="0 0 36 36">
                    <path className="text-slate-100 dark:text-slate-700" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3"></path>
                    <path className="text-slate-300" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray="0, 100" strokeLinecap="round" strokeWidth="3"></path>
                  </svg>
                  <span className="text-[10px] font-bold">0%</span>
                </div>
                <span className="px-2 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold rounded-lg uppercase">Locked</span>
              </div>
              <h4 className="font-bold text-slate-900 dark:text-white">SSD</h4>
              <p className="text-xs text-slate-500">System Sequence</p>
            </div>
            {/* SD */}
            <div className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md transition-shadow opacity-60">
              <div className="flex justify-between items-start mb-4">
                <div className="relative h-12 w-12 flex items-center justify-center">
                  <svg className="absolute inset-0 transform -rotate-90" viewBox="0 0 36 36">
                    <path className="text-slate-100 dark:text-slate-700" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3"></path>
                  </svg>
                  <span className="text-[10px] font-bold">0%</span>
                </div>
                <span className="px-2 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold rounded-lg uppercase">Locked</span>
              </div>
              <h4 className="font-bold text-slate-900 dark:text-white">SD</h4>
              <p className="text-xs text-slate-500">Sequence Diagram</p>
            </div>
            {/* DCD */}
            <div className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md transition-shadow opacity-60">
              <div className="flex justify-between items-start mb-4">
                <div className="relative h-12 w-12 flex items-center justify-center">
                  <svg className="absolute inset-0 transform -rotate-90" viewBox="0 0 36 36">
                    <path className="text-slate-100 dark:text-slate-700" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3"></path>
                  </svg>
                  <span className="text-[10px] font-bold">0%</span>
                </div>
                <span className="px-2 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold rounded-lg uppercase">Locked</span>
              </div>
              <h4 className="font-bold text-slate-900 dark:text-white">DCD</h4>
              <p className="text-xs text-slate-500">Design Class</p>
            </div>
          </div>
        </section>

        {/* Context Card / Current Scenario */}
        <section>
          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-6">Current Scenario</h3>
          <div className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col md:flex-row">
            <div className="md:w-1/3 bg-cover bg-center min-h-[200px]" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAIwyXhHzJnLkHlrLLENQ0edVn2Kbgjkxj2v8fMmVfK2mqvpZY4VH8NztYbm3UbIKoa9dlLOLE5OdP1hzgffXOnfZTSvbc5UsSLQD3NTFKi9Ls8nOSwXaetJIUVaHfxKGhz8rRA4gstssnY2DECSYs9GcyA4MmuP1WZMfu_UAidOO_JipLojSv3tHLfGrJJeF4u_Zl7ankjGpisZv11qpF68lnZPqSFy5gC5LMrjxQbcMy6w0jvJkRoRgbHgrldfBLwgZCTSsfCPqO2')" }}></div>
            <div className="md:w-2/3 p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="text-2xl font-black text-primary dark:text-accent">CampusConnect</h4>
                  <span className="px-2 py-0.5 bg-accent/10 text-accent text-[10px] font-bold rounded border border-accent/20">CASE STUDY</span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                  Build a unified student management system for Northwood University. Handle real-time registration, course scheduling conflicts, and resource allocation across three campuses.
                </p>
              </div>
              <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-700 pt-6">
                <div className="flex -space-x-2">
                  <div className="h-8 w-8 rounded-full border-2 border-white bg-slate-200 bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBG6HaC3mDAq0GaCCtzYkfPqOOgZ18AG-uYOWM5wN8Bco_Aa56FjRQcCNrb3LTk4jkjf7FTG8I87z2WIczEoVwgazrnKJSDo63Gz6Ud_E1-LEGmE8ZQnZxXmzMl3-uaxmiPHpAvr3euMddbw2D0ffAPOhbYvO7iZ6Dm1NAT3elFJB36DdDisfImwmqdN8tQU6r2u9P0Lait-zUystxB8LxYxko2ysbQBD5KnOWDAIXFvmwn4kQjklw8E7ZGZxI1gm6fPlwmsW3YqKwm')" }}></div>
                  <div className="h-8 w-8 rounded-full border-2 border-white bg-slate-200 bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC4CQgaMHzjUq7wDkbS-TAbyrNldrt5g9jwUY2j9eQ-5Xc1AIWv5cM9uFC6pD1d87je1pfhIe-KFYmqecam-lkfA55eEQ7lzBhcBoaS3c6ceDU313K0daaCCd5TK838TfYgLnL3ayBxKv1oeOJVDlO1Pb1aFkkBB_e8UoluGplL6x7efBfnhz-RRGNc48fTBSnGOilV1lzPlD8HyC6GEIiLAIlcqApUhqJW-xubj1x9dhDA23jqt2Yb9Y57UKlA5plnOhflEeTA8WGR')" }}></div>
                  <div className="h-8 w-8 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center bg-slate-800 text-[10px] font-bold text-white">+12</div>
                </div>
                <div className="flex gap-3">
                  <button className="px-5 py-2 rounded-lg text-sm font-bold border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-50 transition-colors">Read Brief</button>
                  <button className="px-5 py-2 rounded-lg text-sm font-bold bg-primary text-white hover:opacity-90 transition-opacity">Open Dashboard</button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Settings Dialog */}
      <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
        <DialogContent className="sm:max-w-md font-display">
          <DialogHeader>
            <DialogTitle>Settings</DialogTitle>
            <DialogDescription>
              Manage your application preferences and local storage.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-4">
            <div className="flex flex-col gap-2">
              <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">Danger Zone</h4>
              <button 
                onClick={handleClearStorage}
                className="w-full py-3 px-4 bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 font-bold rounded-xl text-sm flex items-center justify-center gap-2 hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
              >
                <span className="material-symbols-outlined">delete_forever</span>
                Clear Local Storage & Reset Progress
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
