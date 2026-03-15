"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const diagramLinks = [
  { label: 'UCD', href: '/diagrams/ucd', icon: 'person', title: 'Use Case Diagram' },
  { label: 'DMD', href: '/diagrams/dmd', icon: 'hub', title: 'Domain Model Diagram' },
  { label: 'SSD', href: '/diagrams/ssd', icon: 'settings_input_composite', title: 'System Sequence Diagram' },
  { label: 'SD',  href: '/diagrams/sd',  icon: 'swap_horiz', title: 'Sequence Diagram' },
  { label: 'DCD', href: '/diagrams/dcd', icon: 'account_tree', title: 'Design Class Diagram' },
];

export default function AppSidebar({ onSettings }: { onSettings?: () => void }) {
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  return (
    <aside className="w-64 bg-primary text-white flex flex-col justify-between p-5 shrink-0">
      <div className="flex flex-col gap-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 px-1 transition-opacity hover:opacity-80">
          <div className="h-10 w-10 rounded-xl bg-accent flex items-center justify-center text-primary shrink-0">
            <span className="material-symbols-outlined font-bold">schema</span>
          </div>
          <div className="flex flex-col">
            <h1 className="text-white text-lg font-bold leading-none">UMLogic</h1>
            <p className="text-white/60 text-xs font-medium">Object &amp; Design</p>
          </div>
        </Link>

        {/* Main Nav */}
        <nav className="flex flex-col gap-1">
          <Link
            href="/dashboard"
            className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-colors ${isActive('/') ? 'bg-white/15 text-white font-semibold' : 'text-white/70 hover:bg-white/5 hover:text-white'}`}
          >
            <span className="material-symbols-outlined text-[20px]">dashboard</span>
            <span className="text-sm font-medium">Dashboard</span>
          </Link>

          {/* Diagrams section */}
          <p className="text-white/30 text-[10px] font-bold uppercase tracking-widest px-4 pt-4 pb-1">Diagrams</p>
          {diagramLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              title={link.title}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-colors ${isActive(link.href) ? 'bg-white/15 text-white font-semibold' : 'text-white/70 hover:bg-white/5 hover:text-white'}`}
            >
              <span className="material-symbols-outlined text-[20px]">{link.icon}</span>
              <span className="text-sm font-medium">{link.title}</span>
            </Link>
          ))}

          {/* Tools section */}
          <p className="text-white/30 text-[10px] font-bold uppercase tracking-widest px-4 pt-4 pb-1">Tools</p>
          <Link
            href="/cumulative-quiz"
            className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-colors ${isActive('/cumulative-quiz') ? 'bg-white/15 text-white font-semibold' : 'text-white/70 hover:bg-white/5 hover:text-white'}`}
          >
            <span className="material-symbols-outlined text-[20px]">school</span>
            <span className="text-sm font-medium">Final Exam</span>
          </Link>
          <Link
            href="/sandbox"
            className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-colors ${isActive('/sandbox') ? 'bg-white/15 text-white font-semibold' : 'text-white/70 hover:bg-white/5 hover:text-white'}`}
          >
            <span className="material-symbols-outlined text-[20px]">code</span>
            <span className="text-sm font-medium">Sandbox</span>
          </Link>
        </nav>
      </div>

      {/* Bottom: Settings */}
      <div className="flex flex-col gap-1">
        <button
          onClick={onSettings}
          className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-white/70 hover:bg-white/5 hover:text-white transition-colors w-full text-left"
        >
          <span className="material-symbols-outlined text-[20px]">settings</span>
          <span className="text-sm font-medium">Settings</span>
        </button>
      </div>
    </aside>
  );
}
