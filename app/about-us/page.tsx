"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function AboutUsPage() {
  const teamMembers = [
    { name: 'Adarsh Setty', role: 'Creator', linkedin: '#' },
    { name: 'Abram Sumilat', role: 'Creator', linkedin: '#' },
    { name: 'Ria Gupta', role: 'Creator', linkedin: '#' },
    { name: 'Tony Huynh', role: 'Creator', linkedin: '#' },
    { name: 'Alisa Roberts', role: 'Creator', linkedin: '#' },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-700 font-display p-6 lg:p-20">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-primary font-bold mb-8 hover:opacity-80 transition-opacity">
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          Back to Home
        </Link>
        <motion.h1
          className="text-4xl lg:text-6xl font-black text-primary mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          About the <span className="text-[#B3A369]">Creators</span>
        </motion.h1>
        <motion.p
          className="text-lg text-slate-500 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          We are the team behind UMLogic, passionate about making software design education accessible and interactive.
        </motion.p>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {teamMembers.map((member, i) => (
            <motion.div
              key={member.name}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              whileHover={{ y: -4, boxShadow: '0 10px 30px rgba(0,48,87,0.08)' }}
            >
              <div className="h-24 w-24 mx-auto bg-primary/10 rounded-full mb-4 flex items-center justify-center">
                 <span className="material-symbols-outlined text-4xl text-primary">person</span>
              </div>
              <h3 className="text-xl font-bold text-primary mb-1">{member.name}</h3>
              <p className="text-sm text-slate-500 font-medium mb-4">{member.role}</p>
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[#B3A369] text-sm font-bold hover:opacity-80 transition-opacity"
              >
                LinkedIn
                <span className="material-symbols-outlined text-[14px]">open_in_new</span>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
