import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#F8FAFC] text-slate-700 font-display selection:bg-[#B3A369] selection:text-white">

      {/* Background Decorations */}
      <div className="absolute inset-0 grid-pattern pointer-events-none"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#B3A369]/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[150px] pointer-events-none"></div>

      {/* Top Navigation */}
      <header className="sticky top-0 z-50 backdrop-blur-md border-b border-slate-200 bg-white/70 px-6 py-4 lg:px-20">
        <nav className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-primary flex items-center justify-center rounded-lg border border-[#B3A369]/30">
              <span className="material-symbols-outlined text-[#B3A369]">schema</span>
            </div>
            <span className="text-xl font-black tracking-tighter uppercase text-primary">UMLogic</span>
          </div>
          <div className="hidden md:flex items-center gap-10 text-sm font-medium text-slate-600">
            <a className="hover:text-[#B3A369] transition-colors" href="#active-learning">Active Learning</a>
            <a className="hover:text-[#B3A369] transition-colors" href="#sandbox">Sandbox</a>
            <a className="hover:text-[#B3A369] transition-colors" href="#testimonials">Testimonials</a>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="hidden sm:block text-sm font-bold text-[#B3A369] hover:text-primary transition-colors">
              Log In
            </Link>
            <Link
              href="/dashboard"
              className="bg-[#B3A369] text-primary px-6 py-2.5 rounded-full font-bold text-sm hover:scale-105 transition-transform active:scale-95 shadow-[0_0_20px_rgba(179,163,105,0.3)]"
            >
              Get Started
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-6 lg:px-20 max-w-7xl mx-auto overflow-visible">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative z-10">
            {/* Animated Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B3A369]/10 border border-[#B3A369]/20 text-[#B3A369] text-xs font-bold uppercase tracking-widest mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#B3A369] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#B3A369]"></span>
              </span>
              Next-Gen Modeling
            </div>
            <h1 className="text-6xl lg:text-8xl font-black leading-[0.9] tracking-tight mb-8 text-primary">
              The Future of <span className="text-gradient">Object-Oriented</span> Design
            </h1>
            <p className="text-lg text-slate-400 max-w-lg mb-10 leading-relaxed">
              Experience a new era of architecture with high-fidelity UML modeling, real-time code generation, and interactive learning nodes.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/sandbox"
                className="bg-primary border border-[#B3A369]/30 text-white px-8 py-4 rounded-xl font-bold flex items-center gap-3 hover:bg-primary/80 transition-all group"
              >
                Try Sandbox
                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </Link>
              <Link
                href="/dashboard"
                className="bg-slate-100 text-slate-700 px-8 py-4 rounded-xl font-bold border border-slate-200 hover:border-slate-300 hover:bg-slate-200 transition-all"
              >
                Open Dashboard
              </Link>
            </div>
          </div>

          {/* Hero Visual — interactive UML fragment */}
          <div className="relative h-[500px] w-full" style={{ perspective: '1000px' }}>
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/40 to-transparent rounded-3xl border border-[#B3A369]/20 rotate-3 translate-x-4 translate-y-4"></div>
            <div className="relative h-full w-full bg-white rounded-3xl border border-slate-200 p-8 overflow-hidden shadow-2xl">
              {/* Floating class box 1 */}
              <div className="absolute top-10 left-10 w-48 bg-white border border-slate-200 rounded-lg p-4 shadow-xl rotate-[-2deg]">
                <div className="text-[10px] font-bold text-[#B3A369] mb-2 border-b border-[#B3A369]/20 pb-1">CLASS: OrderManager</div>
                <div className="space-y-1">
                  <div className="h-1 w-full bg-slate-700 rounded"></div>
                  <div className="h-1 w-3/4 bg-slate-700 rounded"></div>
                </div>
              </div>
              {/* Floating class box 2 */}
              <div className="absolute bottom-20 right-10 w-56 bg-slate-50 border border-slate-200 rounded-lg p-4 shadow-xl rotate-[1deg]">
                <div className="text-[10px] font-bold text-[#B3A369] mb-2 border-b border-[#B3A369]/20 pb-1">INTERFACE: IRepository</div>
                <div className="space-y-1">
                  <div className="h-1 w-full bg-slate-600 rounded"></div>
                  <div className="h-1 w-1/2 bg-slate-600 rounded"></div>
                </div>
              </div>
              {/* Center connector placeholder */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-40 border-2 border-dashed border-[#B3A369]/30 rounded-2xl flex items-center justify-center">
                <span className="material-symbols-outlined text-[#B3A369] text-5xl opacity-40">polyline</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Active Learning Section */}
      <section className="py-32 px-6 lg:px-20 max-w-7xl mx-auto border-t border-[#B3A369]/10" id="active-learning">
        <div className="flex flex-col lg:flex-row gap-20 items-end mb-20">
          <div className="flex-1">
            <h2 className="text-5xl lg:text-7xl font-black mb-6 text-primary">
              Active <span className="text-[#B3A369]">Learning</span>
            </h2>
            <p className="text-xl text-slate-400 max-w-xl">
              Master the complexities of UML logic through our adaptive challenge system. It&apos;s not just a course — it&apos;s a structural evolution.
            </p>
          </div>
          <div className="text-right">
            <div className="text-[#B3A369] font-bold text-4xl mb-1">98%</div>
            <div className="text-slate-500 text-sm uppercase tracking-widest font-bold">Retention Rate</div>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {/* Card: Logic Quiz */}
          <div className="group bg-white border border-slate-200 rounded-2xl p-8 hover:border-[#B3A369]/40 transition-all hover:-translate-y-2 shadow-sm hover:shadow-xl">
            <div className="h-14 w-14 bg-[#B3A369]/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-[#B3A369]">quiz</span>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-primary">Logic Quiz</h3>
            <p className="text-slate-400 mb-6">Interactive challenges based on real-world architecture patterns. Validate your intuition instantly.</p>
            <div className="h-40 bg-slate-50 rounded-xl border border-slate-100 overflow-hidden relative p-4">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent"></div>
              <div className="w-full h-2 bg-slate-200 rounded-full mb-4">
                <div className="w-2/3 h-full bg-[#B3A369] rounded-full"></div>
              </div>
              <div className="space-y-2">
                <div className="h-4 w-full bg-slate-200 rounded"></div>
                <div className="h-4 w-5/6 bg-slate-200 rounded"></div>
              </div>
            </div>
          </div>

          {/* Card: Real-time Feedback */}
          <div className="group bg-white border border-slate-200 rounded-2xl p-8 hover:border-[#B3A369]/40 transition-all hover:-translate-y-2 shadow-sm hover:shadow-xl">
            <div className="h-14 w-14 bg-[#B3A369]/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-[#B3A369]">feedback</span>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-primary">Real-time Feedback</h3>
            <p className="text-slate-400 mb-6">Our engine analyzes your UML connections as you draw them, highlighting structural flaws in milliseconds.</p>
            <div className="h-40 bg-slate-50 rounded-xl border border-slate-100 overflow-hidden relative flex items-center justify-center">
              <span className="material-symbols-outlined text-[#B3A369] text-5xl animate-pulse">check_circle</span>
            </div>
          </div>

          {/* Card: Progress Tracking */}
          <div className="group bg-white border border-slate-200 rounded-2xl p-8 hover:border-[#B3A369]/40 transition-all hover:-translate-y-2 shadow-sm hover:shadow-xl">
            <div className="h-14 w-14 bg-[#B3A369]/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-[#B3A369]">analytics</span>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-primary">Progress Tracking</h3>
            <p className="text-slate-400 mb-6">Visualize your growth with analytics that map your mastery of specific UML domains across all 5 diagram types.</p>
            <div className="h-40 bg-slate-50 rounded-xl border border-slate-100 overflow-hidden relative p-4 flex items-end gap-2">
              <div className="flex-1 bg-slate-300 h-1/2 rounded-t"></div>
              <div className="flex-1 bg-slate-300 h-2/3 rounded-t"></div>
              <div className="flex-1 bg-[#B3A369] h-3/4 rounded-t shadow-[0_0_15px_rgba(179,163,105,0.4)]"></div>
              <div className="flex-1 bg-slate-300 h-1/2 rounded-t"></div>
              <div className="flex-1 bg-[#B3A369] h-full rounded-t shadow-[0_0_15px_rgba(179,163,105,0.4)]"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Sandbox Section */}
      <section className="py-32 px-6 lg:px-20 bg-slate-50/50 relative overflow-hidden" id="sandbox">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            {/* IDE Visual */}
            <div className="order-2 lg:order-1 relative">
              <div className="absolute -inset-4 bg-[#B3A369]/20 blur-3xl rounded-full opacity-30"></div>
              <div className="relative bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xl">
                {/* Window chrome */}
                <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 border-b border-slate-200">
                  <div className="h-3 w-3 rounded-full bg-red-400/70"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-400/70"></div>
                  <div className="h-3 w-3 rounded-full bg-green-400/70"></div>
                  <div className="ml-4 text-[10px] text-slate-500 font-mono">sequence_diagram.mmd</div>
                </div>
                <div className="grid grid-cols-12 h-[420px]">
                  <div className="col-span-1 border-r border-slate-200 flex flex-col items-center py-4 gap-6 text-slate-500">
                    <span className="material-symbols-outlined text-sm">folder</span>
                    <span className="material-symbols-outlined text-sm">search</span>
                    <span className="material-symbols-outlined text-sm text-[#B3A369]">description</span>
                    <span className="material-symbols-outlined text-sm">settings</span>
                  </div>
                  <div className="col-span-11 p-6 font-mono text-xs leading-relaxed text-slate-600 bg-slate-50/30">
                    <div className="flex gap-4 mb-1"><span className="text-slate-400 w-5">01</span><p><span className="text-primary font-semibold">sequenceDiagram</span></p></div>
                    <div className="flex gap-4 mb-1"><span className="text-slate-400 w-5">02</span><p className="ml-4">participant <span className="text-[#B3A369] font-semibold">UC</span> as UI Controller</p></div>
                    <div className="flex gap-4 mb-1"><span className="text-slate-400 w-5">03</span><p className="ml-4">participant <span className="text-[#B3A369] font-semibold">EM</span> as EventManager</p></div>
                    <div className="flex gap-4 mb-1"><span className="text-slate-400 w-5">04</span><p className="ml-4">participant <span className="text-[#B3A369] font-semibold">DB</span> as Database</p></div>
                    <div className="flex gap-4 mb-1"><span className="text-slate-400 w-5">05</span><p></p></div>
                    <div className="flex gap-4 mb-1"><span className="text-slate-400 w-5">06</span><p><span className="text-[#B3A369]">UC</span>-&gt;&gt;<span className="text-[#B3A369]">EM</span>: checkCapacity(eventID)</p></div>
                    <div className="flex gap-4 mb-1"><span className="text-slate-400 w-5">07</span><p><span className="text-[#B3A369]">EM</span>-&gt;&gt;<span className="text-[#B3A369]">DB</span>: queryEvent(id)</p></div>
                    <div className="flex gap-4 mb-1"><span className="text-slate-400 w-5">08</span><p><span className="text-[#B3A369]">DB</span>--&gt;&gt;<span className="text-[#B3A369]">EM</span>: eventData</p></div>
                    <div className="flex gap-4 mb-1"><span className="text-slate-400 w-5">09</span><p><span className="text-[#B3A369]">EM</span>--&gt;&gt;<span className="text-[#B3A369]">UC</span>: status: Available</p></div>
                    {/* Floating tooltip */}
                    <div className="absolute top-1/2 right-6 bg-[#B3A369] text-primary p-3 rounded-lg shadow-xl text-[10px] font-black rotate-2 z-10">
                      ✓ VALID SEQUENCE
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sandbox Feature List */}
            <div className="order-1 lg:order-2">
              <h2 className="text-5xl lg:text-7xl font-black mb-8 leading-tight text-primary">
                The <span className="text-[#B3A369]">Sandbox</span>
              </h2>
              <div className="space-y-10">
                <div className="flex gap-6">
                  <div className="shrink-0 h-12 w-12 bg-primary rounded-lg flex items-center justify-center">
                    <span className="material-symbols-outlined text-[#B3A369]">code</span>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2 text-primary">Professional IDE</h4>
                    <p className="text-slate-400">A feature-rich Mermaid editor with live preview, integrated linting, and OOD best-practice hints.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="shrink-0 h-12 w-12 bg-primary rounded-lg flex items-center justify-center">
                    <span className="material-symbols-outlined text-[#B3A369]">bolt</span>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2 text-primary">2340 Templates</h4>
                    <p className="text-slate-400">Load pre-built CS 2340 diagram templates — Factory, Singleton, Observer, and more — with one click.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="shrink-0 h-12 w-12 bg-primary rounded-lg flex items-center justify-center">
                    <span className="material-symbols-outlined text-[#B3A369]">bug_report</span>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2 text-primary">Visual Debugging</h4>
                    <p className="text-slate-400">Step through sequence diagrams frame by frame and watch the traceability list update in real-time.</p>
                  </div>
                </div>
              </div>
              <Link
                href="/sandbox"
                className="inline-flex items-center gap-3 mt-12 bg-primary text-white px-8 py-4 rounded-xl font-bold hover:bg-primary/80 transition-all group"
              >
                Open Sandbox
                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 px-6 lg:px-20 max-w-7xl mx-auto" id="testimonials">
        <h2 className="text-4xl font-black mb-16 text-center text-primary">
          Trusted by <span className="text-[#B3A369] italic tracking-tighter uppercase">GT Engineers</span>
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              quote: "The Sandbox changed how I approach my senior design project. Seeing the UML and code side-by-side is just... chef's kiss.",
              name: 'Alex Chen',
              role: 'CS Student @ GT',
              img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBVTF_xWOLIPT0-ExwRcvU2fdYzcddPHPw1j2nDBxoaw64E2b8wb-939wmfH-1hsxxXevT0jn6hsWJd79f9hfVRy1E9qMI__w9fp7jM9F_1SJjmID5QIS8yDsPa0JJEojc90lpyLojruddfZ_3gbZi5VCX7TUvGbmtDsYq5j3Z6G0vT5Eus00HIHvn5rS2e6jcWtVmbDHA_mQvOyL6qAvV6f8V71eLCcYB6BcDm8jTOJpevIB988dPz50Vc02EOlt7NL_zUmONMeKge',
            },
            {
              quote: "Finally, a logic platform that doesn't look like it was built in 1998. The interactive quizzes are actually fun and the GT gold accents are slick.",
              name: 'Maya Rodriguez',
              role: 'Software Engineering',
              img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD2KSPH4JP4M2jXRIlowaCRQ0iOjXqqXOuf3VYlFPVG8Wsy_r8hYLZbZFrlBXu6qiZYdDW62y1uN3m8NUYnLlaOKAu3aYa4Lms8jzujzXzgWerqe-i3UXHqQG9XtRItkrZeJCsGor3tz9ZqP-3wUdBX1Un3bPyDAwg-kB62HPNhBdMccEyCY1p0Tc091b1eN_2McHHIv3JjA3Yu22ugZgvlsWfah08K2VzdgEhwVAXQC59MWpcL00R2pChBvkwkucgd0p5IzJJmmhgS',
            },
            {
              quote: "The feedback loop is insanely fast. I've halved my modeling time since switching to UMLogic. It's the future.",
              name: 'Jordan Lee',
              role: 'Senior Architect',
              img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDwPJ9zmMgWjV-fDjxids3-leyD6bSmoJKjeGMw0eig4_U1UaBFtWBOJIwxYZHyd_AfzBrOXwr5K0z0CBm5CIRhN_k2z5D4NMsqGtNcKY1ILwWuowGrfc9Sakr8RzrE18BFpna5XB9jtTEHK7H48F4Ecb2Bi8In8dv9myGsrfTwW21VsNa2VPGT8e6FEO3bxWt64U-zWDHSDoxAWcRuncS0ztRzHd3Sq0WhlZEqfMFApMGiNwXsotGm658hFrP3kv7FKbMCYsyra4c2',
            },
          ].map((t) => (
            <div key={t.name} className="p-8 bg-white rounded-3xl border border-slate-200 flex flex-col gap-6 relative group overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <span className="material-symbols-outlined text-9xl text-primary">format_quote</span>
              </div>
              <p className="text-base text-slate-500 relative z-10 leading-relaxed italic">&ldquo;{t.quote}&rdquo;</p>
              <div className="flex items-center gap-4 mt-auto">
                <div
                  className="h-12 w-12 rounded-full overflow-hidden bg-slate-200 bg-cover bg-center shrink-0"
                  style={{ backgroundImage: `url('${t.img}')` }}
                ></div>
                <div>
                  <div className="font-bold text-primary">{t.name}</div>
                  <div className="text-xs text-[#B3A369] font-bold uppercase tracking-wider">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 lg:px-20">
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-primary to-primary/80 rounded-[3rem] p-12 lg:p-20 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-[#B3A369]/20 rounded-full blur-[100px]"></div>
          <div className="absolute top-0 left-0 w-full h-full grid-pattern opacity-5"></div>
          <h2 className="text-4xl lg:text-6xl font-black mb-8 text-white relative z-10">
            Ready to evolve your <span className="text-[#B3A369]">Architecture?</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto mb-12 text-lg relative z-10">
            Join CS 2340 students mastering the next generation of software design patterns with UMLogic. Free access for all current GT students.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
            <Link
              href="/sandbox"
              className="bg-[#B3A369] text-primary px-10 py-5 rounded-2xl font-black text-lg hover:scale-105 transition-all shadow-xl"
            >
              Launch Sandbox Free
            </Link>
            <Link
              href="/dashboard"
              className="bg-white/10 backdrop-blur text-white px-10 py-5 rounded-2xl font-black text-lg border border-white/20 hover:bg-white/20 transition-all"
            >
              Go to Dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
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
    </div>
  );
}
