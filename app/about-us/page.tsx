"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Github, Linkedin, Globe } from 'lucide-react';
import Image from 'next/image';

export default function AboutUsPage() {
  const topMembers = [
    {
      name: 'Adarsh Setty',
      role: 'Lead Developer & Architect',
      linkedin: 'https://www.linkedin.com/in/adarshsetty/',
      github: 'https://github.com/AAsteriskz7',
      website: 'https://adarshsetty.is-a.dev/',
      image: '/adarsh.jpg'
    },
    {
      name: 'Abram Sumilat',
      role: 'UX/UI Designer & Diagrams',
      linkedin: 'https://www.linkedin.com/in/abram-sumilat-798696341',
      github: 'http://github.com/asumi1',
      image: '/abram.jpeg'
    },
    {
      name: 'Ria Gupta',
      role: 'Documentation & Testing',
      linkedin: 'https://www.linkedin.com/in/riagupta27/',
      github: 'https://github.com/riannaga23',
      image: '/ria.jpg'
    }
  ];

  const bottomMembers = [
    {
      name: 'Alisa Roberts',
      role: 'Requirements & SD Designer',
      linkedin: 'https://www.linkedin.com/in/alisa-roberts-91a8bb241/',
      github: 'https://github.com/Alicake',
      image: '/alisa.jpg'
    },
    {
      name: 'Tony Huynh',
      role: 'DCD/DMD Architecture',
      linkedin: 'https://www.linkedin.com/in/tony-huynh-b08793348/',
      github: 'https://github.com/twist314',
      image: '/tony.jpeg'
    }
  ];

  interface Member {
    name: string;
    role: string;
    linkedin: string;
    github?: string;
    website?: string;
    image?: string;
  }

  const renderMember = (member: Member, i: number) => (
    <motion.div
      key={member.name}
      className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm text-center flex flex-col h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 + i * 0.1 }}
      whileHover={{ y: -4, boxShadow: '0 10px 30px rgba(0,48,87,0.08)' }}
    >
      <div className="h-24 w-24 mx-auto bg-primary/10 rounded-full mb-4 flex items-center justify-center overflow-hidden relative">
        {member.image ? (
          <Image
            src={member.image}
            alt={member.name}
            fill
            className="object-cover"
          />
        ) : (
          <span className="material-symbols-outlined text-4xl text-primary">person</span>
        )}
      </div>
      <h3 className="text-xl font-bold text-primary mb-1">{member.name}</h3>
      <p className="text-sm text-slate-500 font-medium mb-6 flex-grow">{member.role}</p>

      <div className="flex justify-center gap-4 mt-auto">
        <a
          href={member.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#B3A369] hover:opacity-80 transition-opacity"
          aria-label={`${member.name}'s LinkedIn`}
        >
          <Linkedin className="w-5 h-5" />
        </a>
        {member.github && (
          <a
            href={member.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#B3A369] hover:opacity-80 transition-opacity"
            aria-label={`${member.name}'s GitHub`}
          >
            <Github className="w-5 h-5" />
          </a>
        )}
        {member.website && (
          <a
            href={member.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#B3A369] hover:opacity-80 transition-opacity"
            aria-label={`${member.name}'s Website`}
          >
            <Globe className="w-5 h-5" />
          </a>
        )}
      </div>
    </motion.div>
  );

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

        <div className="flex flex-col gap-6">
          {/* Top row - 3 members */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {topMembers.map((member, i) => renderMember(member, i))}
          </div>

          {/* Bottom row - 2 members centered */}
          <div className="grid sm:grid-cols-2 gap-6 md:w-2/3 mx-auto">
            {bottomMembers.map((member, i) => renderMember(member, i + 3))}
          </div>
        </div>
      </div>
    </div>
  );
}
