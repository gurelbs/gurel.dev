'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Terminal as TerminalIcon, 
  Cpu, 
  Globe, 
  Briefcase, 
  Award, 
  Mail, 
  ExternalLink
} from 'lucide-react';

import BottomNav from '../components/BottomNav';
import SkillsPanel from '../components/SkillsPanel';
import TerminalMode from '../components/TerminalMode';
import ContactForm from '../components/ContactForm';

export default function Home() {
  const [activeSection, setActiveSection] = React.useState('hero');

  // Interactive navigation trigger - instantly changes the current tab component
  const handleNavClick = (sectionId: string) => {
    setActiveSection(sectionId);
  };

  // Entry container variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 15, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring' as const, stiffness: 100 } }
  };

  return (
    <div className="h-screen bg-[#0f172a] text-slate-100 flex flex-col relative overflow-hidden font-sans antialiased" id="viewport-root">
      {/* Decorative Cyber Background Gradients (Humble, clean negative-space decorations) */}
      <div 
        className="absolute top-0 right-1/4 w-[450px] h-[450px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" 
        id="cyber-bg-light-1"
      />
      <div 
        className="absolute top-1/3 left-1/4 w-[350px] h-[350px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" 
        id="cyber-bg-light-2"
      />
      <div 
        className="absolute bottom-1/4 right-[10%] w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" 
        id="cyber-bg-light-3"
      />

      {/* Floating Bottom Nav */}
      <BottomNav activeSection={activeSection} onNavClick={handleNavClick} />

      {/* Top Status Bar (High Density / Refined desktop bar) */}
      <header className="flex-none bg-slate-900/80 backdrop-blur-md border-b border-slate-800/50 transition-all z-40" id="main-app-header">
        <div className="max-w-5xl mx-auto px-5 py-5 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xl sm:text-2xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 font-sans">
              Gurel Ben Shabat
            </span>
            <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest mt-0.5">
              Embedded Systems & Full-Stack Engineer
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-6 text-xs text-slate-400 font-bold font-mono">
              <button 
                onClick={() => handleNavClick('skills')} 
                className={`hover:text-cyan-400 transition cursor-pointer outline-none ${activeSection === 'skills' ? 'text-cyan-400 underline decoration-2 underline-offset-4' : ''}`}
                id="header-nav-skills"
              >
                SKILLS
              </button>
              <button 
                onClick={() => handleNavClick('experience')} 
                className={`hover:text-cyan-400 transition cursor-pointer outline-none ${activeSection === 'experience' ? 'text-cyan-400 underline decoration-2 underline-offset-4' : ''}`}
                id="header-nav-experience"
              >
                EXPERIENCE
              </button>
              <button 
                onClick={() => handleNavClick('terminal')} 
                className={`hover:text-cyan-400 transition cursor-pointer outline-none ${activeSection === 'terminal' ? 'text-cyan-400 underline decoration-2 underline-offset-4' : ''}`}
                id="header-nav-terminal"
              >
                TERMINAL
              </button>
              <span className="text-slate-800">|</span>
              <span className="text-slate-500 font-mono">TZ: UTC+3</span>
            </div>
            <div className="flex items-center gap-2.5 bg-slate-800/50 px-3.5 py-1.5 rounded-full border border-slate-700/60 shadow-sm shadow-black/20">
              <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.6)] animate-pulse" />
              <span className="text-[10px] sm:text-xs font-bold text-cyan-400 uppercase tracking-tight font-mono">System: Stable</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Workspace Frame (Restricted to 100vh height boundaries) */}
      <main className="flex-1 overflow-hidden relative z-10 w-full max-w-5xl mx-auto px-5 py-4 flex flex-col justify-between" id="main-content-frame">
        {/* Dynamic page tab rendering with integrated local custom scroll bar */}
        <div className="flex-1 overflow-y-auto pb-32 pr-1 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent custom-scroll" id="active-tab-scroll-container">
          <AnimatePresence mode="wait">
            
            {/* HERO TAB */}
            {activeSection === 'hero' && (
              <motion.div
                key="hero"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.18 }}
                className="min-h-full flex flex-col justify-center py-6 space-y-8"
                id="view-hero"
              >
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-6 max-w-3xl"
                >
                  <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-slate-900 border border-slate-800 rounded-full">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                    <span className="text-xs sm:text-sm font-semibold font-mono tracking-wider text-slate-300 uppercase">
                      Embedded Systems & High-Scale Web
                    </span>
                  </motion.div>

                  <motion.div variants={itemVariants} className="space-y-3">
                    <h1 className="text-5xl sm:text-7xl font-sans font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-500 leading-none pb-2">
                      Gurel Ben Shabat
                    </h1>
                    <h2 className="text-2.5xl sm:text-4xl font-extrabold text-cyan-400 font-mono tracking-wide leading-tight">
                      Embedded Software Engineer & Full-Stack Developer
                    </h2>
                  </motion.div>

                  <motion.p 
                    variants={itemVariants} 
                    className="text-base sm:text-xl text-slate-205 leading-relaxed max-w-3xl font-sans font-medium"
                  >
                    Bridging the gap between high-level web ecosystems and low-level real-time embedded systems. Highly trained in hardware registers, kernel memory management, custom board configurations, and robust web systems.
                  </motion.p>

                  <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4 pt-4">
                    <button
                      onClick={() => handleNavClick('terminal')}
                      className="px-7 py-4 rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs sm:text-sm tracking-wider uppercase transition-all duration-200 shadow-xl shadow-cyan-950/40 cursor-pointer select-none outline-none flex items-center gap-2"
                      id="hero-cta-view-projects"
                    >
                      <TerminalIcon className="w-4.5 h-4.5 sm:w-5.5 sm:h-5.5" />
                      <span>Launch Interactive Shell</span>
                    </button>
                    <button
                      onClick={() => handleNavClick('contact')}
                      className="px-7 py-4 rounded-full bg-slate-900 border border-slate-800 hover:border-slate-700 hover:bg-slate-850 text-slate-300 hover:text-white font-bold text-xs sm:text-sm tracking-wider uppercase transition-all duration-200 cursor-pointer select-none outline-none flex items-center gap-2"
                      id="hero-cta-get-in-touch"
                    >
                      <Mail className="w-4.5 h-4.5 sm:w-5.5 sm:h-5.5 text-slate-400" />
                      <span>Get in Touch</span>
                    </button>
                  </motion.div>
                </motion.div>
              </motion.div>
            )}

            {/* SKILLS MATRIC TAB */}
            {activeSection === 'skills' && (
              <motion.div
                key="skills"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.18 }}
                className="space-y-8 py-6"
                id="view-skills"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs sm:text-sm font-bold tracking-wider uppercase">
                    <Cpu className="w-5 h-5" />
                    <span>[01] SYSTEM ARTIFACTS</span>
                  </div>
                  <h2 className="text-3xl sm:text-4.5xl font-black font-sans text-white tracking-tight">
                    Technology Skill-Set Matrix
                  </h2>
                  <p className="text-sm sm:text-lg text-slate-300 max-w-2xl font-sans leading-relaxed">
                    Dynamically filter between Gurel&apos;s low-level embedded hardware training and core high-scale fullstack software expertise.
                  </p>
                </div>
                
                {/* Responsive dynamic technology grid dashboard */}
                <SkillsPanel />
              </motion.div>
            )}

            {/* EXP TIMELINE TAB */}
            {activeSection === 'experience' && (
              <motion.div
                key="experience"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.18 }}
                className="space-y-8 py-6"
                id="view-experience"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs sm:text-sm font-bold tracking-wider uppercase">
                    <Briefcase className="w-5 h-5" />
                    <span>[02] EMPLOYMENT TIMELINE</span>
                  </div>
                  <h2 className="text-3xl sm:text-4.5xl font-black font-sans text-white tracking-tight">
                    Professional Engineering Experience
                  </h2>
                </div>

                <div className="relative border-l-2 border-slate-800 ml-5 pl-6 sm:pl-10 space-y-12" id="experience-timeline">
                  {/* ZoomInfo Node */}
                  <div className="relative group" id="timeline-node-zoominfo">
                    {/* Floating graphic anchor icon */}
                    <div className="absolute -left-11 sm:-left-[49px] top-1 w-8 h-8 rounded-full bg-slate-950 border-2 border-slate-850 flex items-center justify-center text-cyan-400 group-hover:border-cyan-400 transition-colors duration-200">
                      <Globe className="w-4 h-4" />
                    </div>
                    
                    <div className="space-y-3 max-w-4xl">
                      <span className="inline-block text-xs font-bold font-mono tracking-widest text-slate-450 uppercase pb-1">
                        DECEMBER 2021 – JULY 2023
                      </span>
                      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1.5">
                        <h3 className="text-2xl sm:text-3xl font-extrabold font-sans text-white group-hover:text-cyan-400 transition-colors duration-250">
                          Full-Stack Software Engineer II
                        </h3>
                        <span className="text-sm sm:text-base font-bold font-mono text-cyan-400">
                          ZoomInfo Technologies Inc.
                        </span>
                      </div>

                      <ul className="list-disc list-inside text-sm sm:text-lg text-slate-250 space-y-4 pt-3 font-sans leading-relaxed">
                        <li>
                          Played a key role in developing dynamic landing page systems for ZoomInfo and its SaaS subsidiaries (<span className="text-cyan-400 font-semibold">Neverbounce, Comparably, Datanyze</span>), contributing to indexing over <strong className="text-white font-bold">10 million Google-indexed web pages</strong> in under two months.
                        </li>
                        <li>
                          Designed, developed, implemented, and maintained highly-optimized backend server features and fast frontend components, enhancing product capability and user satisfaction.
                        </li>
                        <li>
                          Collaborated closely with cross-functional partners (Design, Product Managers, Security squads, DevOps pipelines) to deploy robust integrations seamlessly.
                        </li>
                        <li>
                          Supported onboarding and mentorship loops for incoming developers, helping them ramp up to maximum productivity in reduced timelines.
                        </li>
                        <li>
                          Exemplified code formatting, detailed documentation practices, and rigorous unit testing, maintaining highly resilient architectural systems.
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* EDUCATION CERTIFICATES TAB */}
            {activeSection === 'education' && (
              <motion.div
                key="education"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.18 }}
                className="space-y-8 py-6"
                id="view-education"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs sm:text-sm font-bold tracking-wider uppercase">
                    <Award className="w-5 h-5" />
                    <span>[03] ACADEMIC & TRAINING BLUEPRINTS</span>
                  </div>
                  <h2 className="text-3xl sm:text-4.5xl font-black font-sans text-white tracking-tight">
                    Rigorous Training Programs
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8" id="education-cards-grid">
                  
                  {/* Real Time College Programs */}
                  <div className="bg-slate-800/35 border border-slate-750/70 p-6 sm:p-8 rounded-3xl flex flex-col justify-between hover:border-slate-600 transition duration-300 shadow-xl" id="edu-card-rtc">
                    <div className="space-y-5">
                      <div className="flex items-center justify-between">
                        <div className="p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-2xl text-cyan-400">
                          <Cpu className="w-6 h-6" />
                        </div>
                        <span className="text-xs sm:text-sm font-bold font-mono text-slate-400 tracking-wider">
                          DEC 2024 – FEB 2026
                        </span>
                      </div>
                      
                      <div className="space-y-3">
                        <h3 className="text-xl sm:text-2xl font-extrabold font-sans text-white leading-tight">
                          Real-Time Embedded Linux Program
                        </h3>
                        <p className="text-sm sm:text-base font-semibold font-mono text-cyan-400 uppercase tracking-wider">
                          Real Time College
                        </p>
                        <p className="text-sm sm:text-base text-slate-250 leading-relaxed font-sans pt-1">
                          Completed an intensive Year-Long engineering program exceeding <span className="text-white font-semibold">700 lecture/lab hours</span>, specializing entirely in Real-Time Embedded Linux systems.
                        </p>
                      </div>
       
                      <div className="border-t border-slate-800/60 pt-4 flex flex-wrap gap-2.5" id="rtc-skill-chips">
                        {['C/C++', 'Linux Kernel', 'Device Drivers', 'RTOS', 'ARM MCU', 'BSP', 'GDB'].map((tag) => (
                          <span key={tag} className="text-xs px-3 py-1 font-mono bg-slate-900 text-slate-200 rounded-lg border border-slate-800/80 font-bold">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
       
                  {/* Appleseeds Academy */}
                  <div className="bg-slate-800/35 border border-slate-750/70 p-6 sm:p-8 rounded-3xl flex flex-col justify-between hover:border-slate-600 transition duration-300 shadow-xl" id="edu-card-appleseeds">
                    <div className="space-y-5">
                      <div className="flex items-center justify-between">
                        <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-2xl text-blue-400">
                          <Globe className="w-6 h-6" />
                        </div>
                        <span className="text-xs sm:text-sm font-bold font-mono text-slate-400 tracking-wider">
                          DEC 2020 – AUG 2021
                        </span>
                      </div>
                      
                      <div className="space-y-3">
                        <h3 className="text-xl sm:text-2xl font-extrabold font-sans text-white leading-tight">
                          Full-Stack Developer Bootcamp
                        </h3>
                        <p className="text-sm sm:text-base font-semibold font-mono text-blue-400 uppercase tracking-wider">
                          Appleseeds Academy
                        </p>
                        <p className="text-sm sm:text-base text-slate-250 leading-relaxed font-sans pt-1">
                          An immersive 6-month (<span className="text-white font-semibold">750-hour</span>) program focusing on full-scale frontend and scalable backend web ecosystems.
                        </p>
                      </div>
       
                      <div className="border-t border-slate-800/60 pt-4 flex flex-wrap gap-2.5" id="appleseeds-skills-chips">
                        {['React.js', 'Node.js', 'JS/TS', 'MongoDB', 'Git', 'Bootstrap'].map((tag) => (
                          <span key={tag} className="text-xs px-3 py-1 font-mono bg-slate-900 text-slate-200 rounded-lg border border-slate-800/80 font-bold">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                </div>
              </motion.div>
            )}

            {/* INTERACTIVE TERM SHELL TAB */}
            {activeSection === 'terminal' && (
              <motion.div
                key="terminal"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.18 }}
                className="space-y-6 py-6"
                id="view-terminal"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs sm:text-sm font-bold tracking-wider uppercase">
                    <TerminalIcon className="w-5 h-5" />
                    <span>[04] OS DIAGNOSTIC TERMINAL</span>
                  </div>
                  <h2 className="text-3xl sm:text-4.5xl font-black font-sans text-white tracking-tight">
                    Interactive System Console_
                  </h2>
                  <p className="text-sm sm:text-lg text-slate-350 max-w-2xl font-sans leading-relaxed">
                    Explore Gurel&apos;s systems directly over Linux command prompts. Query database contact logs locally.
                  </p>
                </div>

                {/* Core Terminal Component */}
                <TerminalMode />
              </motion.div>
            )}

            {/* CONTACT CHANNEL TAB */}
            {activeSection === 'contact' && (
              <motion.div
                key="contact"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.18 }}
                className="space-y-8 py-6"
                id="view-contact"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs sm:text-sm font-bold tracking-wider uppercase">
                    <Mail className="w-5 h-5 animate-bounce" />
                    <span>[05] HARDWARE LINK</span>
                  </div>
                  <h2 className="text-3xl sm:text-4.5xl font-black font-sans text-white tracking-tight">
                    Get In Touch Securely
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8" id="contacts-form-and-details">
                  {/* Left Side Details Pane */}
                  <div className="md:col-span-12 lg:col-span-5 bg-gradient-to-br from-blue-600/15 to-cyan-600/10 border border-blue-500/20 p-6 sm:p-8 rounded-3xl flex flex-col justify-between space-y-6 shadow-lg" id="contacts-details-left-pane">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-2.5 leading-tight">Let&apos;s collaborate</h3>
                      <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-sans">
                        Looking for an engineer who speaks both High-Level JavaScript/TypeScript and Low-Level C/C++? Gurel Ben Shabat is available for professional consultancies, core embedded development initiatives, and system design integrations. Leave your messages here.
                      </p>
                    </div>

                    <div className="space-y-4" id="direct-links-details">
                      {/* Email */}
                      <div className="flex items-center gap-4 bg-slate-900/40 p-4 rounded-2xl border border-slate-800/80">
                        <div className="w-10 h-10 rounded-full bg-slate-850 flex items-center justify-center text-blue-400 font-bold font-mono text-xs shadow-inner">
                          @
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[10px] uppercase tracking-wider text-slate-450 font-bold font-mono">Primary Datalink</span>
                          <span className="text-sm font-mono text-slate-100 font-bold select-all">guri240@gmail.com</span>
                        </div>
                      </div>

                      {/* Location */}
                      <div className="flex items-center gap-4 bg-slate-900/40 p-4 rounded-2xl border border-slate-800/80">
                        <div className="w-10 h-10 rounded-full bg-slate-850 flex items-center justify-center text-cyan-400 text-base shadow-inner">
                          📍
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[10px] uppercase tracking-wider text-slate-450 font-bold font-mono">Location Segment</span>
                          <span className="text-sm text-slate-200 font-sans font-semibold">Tel Aviv, Israel</span>
                        </div>
                      </div>

                      {/* LinkedIn */}
                      <div className="flex items-center gap-4 bg-slate-900/40 p-4 rounded-2xl border border-slate-800/80">
                        <div className="w-10 h-10 rounded-full bg-slate-850 flex items-center justify-center text-indigo-400 font-black font-mono text-[10px] shadow-inner">
                          IN
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[10px] uppercase tracking-wider text-slate-450 font-bold font-mono">Professional Net</span>
                          <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-sm text-indigo-300 hover:text-cyan-400 transition inline-flex items-center gap-1 font-sans font-bold">
                            LinkedIn Profile <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="hidden lg:block lg:col-span-1" />

                  <div className="md:col-span-12 lg:col-span-6" id="contacts-form-right-pane">
                    {/* Message Submitting Module Form */}
                    <ContactForm />
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
        
        {/* Humble, sleek, professional system credits details */}
        <footer className="flex-none border-t border-slate-800/30 py-4 text-center text-slate-500 space-y-1 font-mono text-[10px] z-20" id="root-footer">
          <p className="font-bold tracking-wider text-slate-450 uppercase text-[11px]">Gurel Ben Shabat © {new Date().getFullYear()}</p>
          <p className="text-slate-600">Built using Next.js, Tailwind v4 and local SQLite datastores</p>
        </footer>
      </main>
    </div>
  );
}
