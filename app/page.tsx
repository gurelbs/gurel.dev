'use client';

import * as React from 'react';
import { motion } from 'motion/react';
import { 
  Terminal as TerminalIcon, 
  Cpu, 
  Globe, 
  Briefcase, 
  Award, 
  Mail, 
  ArrowDown, 
  ChevronRight, 
  Code2, 
  Layers, 
  ExternalLink,
  ChevronDown
} from 'lucide-react';

import BottomNav from '../components/BottomNav';
import SkillsPanel from '../components/SkillsPanel';
import TerminalMode from '../components/TerminalMode';
import ContactForm from '../components/ContactForm';

export default function Home() {
  const [activeSection, setActiveSection] = React.useState('hero');

  // Interactive smooth scroll trigger
  const handleNavClick = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      // Offset scroll slightly for beautiful positioning
      const offset = 40;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Viewport scroll sync utilizing Intersection Observer
  React.useEffect(() => {
    const sections = ['hero', 'skills', 'experience', 'education', 'terminal', 'contact'];
    
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -40% 0px', // Trigger when section occupies screen center
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  // Standard animation containers
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 25, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring' as const, stiffness: 100 } }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-100 flex flex-col relative overflow-x-hidden pb-32">
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

      {/* Top Status Bar (High Density style) */}
      <header className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-md border-b border-slate-800/50 transition-all" id="main-app-header">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-base sm:text-lg font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 font-sans">
              Gurel Ben Shabat
            </span>
            <span className="text-[9px] sm:text-[10px] font-medium text-slate-400 uppercase tracking-widest mt-0.5">
              Embedded Systems & Full-Stack
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-5 text-[11px] text-slate-400 font-semibold font-mono">
              <a href="#skills" onClick={(e) => { e.preventDefault(); handleNavClick('skills'); }} className="hover:text-cyan-400 transition">SKILLS</a>
              <a href="#experience" onClick={(e) => { e.preventDefault(); handleNavClick('experience'); }} className="hover:text-cyan-400 transition">EXPERIENCE</a>
              <a href="#terminal" onClick={(e) => { e.preventDefault(); handleNavClick('terminal'); }} className="hover:text-cyan-400 transition">TERMINAL</a>
              <span className="text-slate-700">|</span>
              <span className="text-slate-500">TZ: UTC+3</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-800/50 px-3 py-1.5 rounded-full border border-slate-700/60">
              <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.6)] animate-pulse" />
              <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-tighter font-mono">System: Stable</span>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow max-w-5xl mx-auto px-4 py-8 sm:py-16 space-y-24 sm:space-y-36 relative z-10 w-full">
        
        {/* SECTION 1: HERO */}
        <section id="hero" className="min-h-[70vh] flex flex-col justify-center py-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6 max-w-3xl"
            id="hero-motion-content"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-900 border border-slate-800 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span className="text-[10px] sm:text-xs font-semibold font-mono tracking-wider text-slate-300 uppercase">
                EMBEDDED SYSTEMS & FULL-STACK
              </span>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-2.5">
              <h1 className="text-4xl sm:text-6xl font-extrabold font-sans tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-500 leading-none pb-1">
                Gurel Ben Shabat
              </h1>
              <h2 className="text-xl sm:text-2xl font-semibold text-cyan-400 font-mono tracking-wide">
                Embedded Software Engineer & Full-Stack Developer
              </h2>
            </motion.div>

            <motion.p 
              variants={itemVariants} 
              className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl font-sans"
            >
              Bridging the gap between high-level web ecosystems and low-level real-time embedded systems. Highly trained in hardware registers, kernel memory management, custom board configurations, and robust web systems.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3 pt-3">
              <button
                onClick={() => handleNavClick('terminal')}
                className="px-6 py-3 rounded-full bg-cyan-500 text-slate-950 font-semibold text-xs tracking-wider uppercase transition hover:bg-cyan-400 hover:shadow-lg hover:shadow-cyan-500/10 cursor-pointer select-none outline-none flex items-center gap-2"
                id="hero-cta-view-projects"
              >
                <TerminalIcon className="w-3.5 h-3.5" />
                <span>Launch Interactive Shell</span>
              </button>
              <button
                onClick={() => handleNavClick('contact')}
                className="px-6 py-3 rounded-full bg-slate-900 border border-slate-800 text-slate-350 hover:text-white font-semibold text-xs tracking-wider uppercase transition hover:border-slate-750 cursor-pointer select-none outline-none flex items-center gap-2"
                id="hero-cta-get-in-touch"
              >
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span>Get in Touch</span>
              </button>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="flex justify-center pt-16 sm:pt-24 self-center animate-bounce text-slate-600"
          >
            <button 
              onClick={() => handleNavClick('skills')}
              className="flex flex-col items-center gap-1.5 focus:outline-none text-xs font-mono font-bold hover:text-cyan-400 transition"
              id="scroll-indicators-btn"
            >
              <span>scroll parameters</span>
              <ChevronDown className="w-4 h-4 text-cyan-400" />
            </button>
          </motion.div>
        </section>

        {/* SECTION 2: SKILLS MATRIX & TECH STACK */}
        <section id="skills" className="space-y-8 scroll-mt-12">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-semibold tracking-wider uppercase">
              <Cpu className="w-4 h-4" />
              <span>[01] SYSTEM ARTIFACTS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-sans text-white tracking-tight">
              Technology Skill-Set Matrix
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl font-sans leading-relaxed">
              Dynamically filter between Gurel&apos;s low-level embedded hardware training and core high-scale fullstack software expertise.
            </p>
          </div>
          
          {/* Dynamic skills multi-filter dashboard */}
          <SkillsPanel />
        </section>

        {/* SECTION 3: WORK TIMELINE */}
        <section id="experience" className="space-y-8 scroll-mt-12">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-semibold tracking-wider uppercase">
              <Briefcase className="w-4 h-4" />
              <span>[02] EMPLOYMENT TIMELINE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-sans text-white tracking-tight">
              Professional Engineering Experience
            </h2>
          </div>

          <div className="relative border-l border-slate-900 ml-4 pl-6 sm:pl-8 space-y-12" id="experience-timeline">
            {/* ZoomInfo Item */}
            <div className="relative group" id="timeline-node-zoominfo">
              {/* Timeline dot anchor */}
              <div className="absolute -left-10 sm:-left-[42px] top-1 w-6 h-6 rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center text-cyan-400 group-hover:border-cyan-400 transition-colors">
                <Globe className="w-3" />
              </div>
              
              <div className="space-y-2 max-w-4xl">
                <span className="inline-block text-[10px] font-bold font-mono tracking-widest text-slate-500 uppercase">
                  DECEMBER 2021 – JULY 2023
                </span>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                  <h3 className="text-lg sm:text-xl font-bold font-sans text-white group-hover:text-cyan-400 transition-colors">
                    Full-Stack Software Engineer II
                  </h3>
                  <span className="text-xs font-medium font-mono text-slate-400">
                    ZoomInfo Technologies Inc.
                  </span>
                </div>

                <ul className="list-disc list-inside text-xs sm:text-sm text-slate-300 space-y-3 pt-2 font-sans leading-relaxed">
                  <li>
                    Played a key role in developing dynamic landing page systems for ZoomInfo and its SaaS subsidiaries (<span className="text-cyan-400 font-medium">Neverbounce, Comparably, Datanyze</span>), contributing to indexing over <strong className="text-white">10 million Google-indexed web pages</strong> in under two months.
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
        </section>

        {/* SECTION 4: EDUCATIONAL BLUEPRINT */}
        <section id="education" className="space-y-8 scroll-mt-12">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-semibold tracking-wider uppercase">
              <Award className="w-4 h-4" />
              <span>[03] ACADEMIC & TRAINING BLUEPRINTS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-sans text-white tracking-tight">
              Rigorous Training Programs
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="education-cards-grid">
            
            {/* Real Time College */}
            <div className="bg-slate-800/30 border border-slate-700/40 p-6 rounded-3xl flex flex-col justify-between hover:border-slate-600/40 transition duration-300" id="edu-card-rtc">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-2 sm:p-2.5 bg-cyan-500/10 border border-cyan-500/20 rounded-2xl text-cyan-400">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold font-mono text-slate-500 tracking-wider">
                    DEC 2024 – FEB 2026
                  </span>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-base sm:text-lg font-bold font-sans text-white">
                    Real-Time Embedded Linux Course
                  </h3>
                  <p className="text-xs sm:text-sm font-semibold font-mono text-cyan-400 uppercase tracking-wider">
                    Real Time College
                  </p>
                  <p className="text-xs sm:text-sm text-slate-350 leading-relaxed font-sans pt-1">
                    Completed an intensive Year-Long engineering program exceeding <span className="text-white font-medium">700 lecture/lab hours</span>, specializing entirely in Real-Time Embedded Linux systems.
                  </p>
                </div>
 
                <div className="border-t border-slate-800/60 pt-3 flex flex-wrap gap-1.5" id="rtc-skill-chips">
                  {['C/C++', 'Linux Kernel', 'Device Drivers', 'RTOS', 'ARM MCU', 'BSP', 'GDB'].map((tag) => (
                    <span key={tag} className="text-[9px] px-2.5 py-0.5 font-mono bg-slate-900 text-slate-300 rounded-full border border-slate-800/80">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
 
            {/* Appleseeds Academy */}
            <div className="bg-slate-800/30 border border-slate-700/40 p-6 rounded-3xl flex flex-col justify-between hover:border-slate-600/40 transition duration-300" id="edu-card-appleseeds">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-2 sm:p-2.5 bg-blue-500/10 border border-blue-500/20 rounded-xl text-blue-400">
                    <Globe className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold font-mono text-slate-500 tracking-wider">
                    DEC 2020 – AUG 2021
                  </span>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-base sm:text-lg font-bold font-sans text-white">
                    Full-Stack Developer Bootcamp
                  </h3>
                  <p className="text-xs sm:text-sm font-semibold font-mono text-blue-400 uppercase tracking-wider">
                    Appleseeds Academy
                  </p>
                  <p className="text-xs sm:text-sm text-slate-350 leading-relaxed font-sans pt-1">
                    An immersive 6-month (<span className="text-white font-medium">750-hour</span>) program focusing on full-scale frontend and scalable backend web ecosystems.
                  </p>
                </div>
 
                <div className="border-t border-slate-800/60 pt-3 flex flex-wrap gap-1.5" id="appleseeds-skills-chips">
                  {['React.js', 'Node.js', 'JS/TS', 'MongoDB', 'Git Workflow', 'Microsoft Web Lab'].map((tag) => (
                    <span key={tag} className="text-[9px] px-2.5 py-0.5 font-mono bg-slate-900 text-slate-300 rounded-full border border-slate-800/80">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* SECTION 5: INTERACTIVE SHELL SIMULATOR */}
        <section id="terminal" className="space-y-8 scroll-mt-12">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-semibold tracking-wider uppercase">
              <TerminalIcon className="w-1.5" />
              <span>[04] OS DIAGNOSTIC TERMINAL</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-sans text-white tracking-tight">
              Interactive System Console
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl font-sans leading-relaxed">
              Explore Gurel&apos;s systems directly over Linux command prompts. Query database contact logs locally.
            </p>
          </div>

          {/* Interactive Core Terminal Emulator */}
          <TerminalMode />
        </section>

        {/* SECTION 6: CONTACT PORT & SECURE DATALINK */}
        <section id="contact" className="space-y-8 scroll-mt-12">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-semibold tracking-wider uppercase">
              <Mail className="w-4 h-4" />
              <span>[05] HARDWARE LINK</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-sans text-white tracking-tight">
              Get In Touch Securely
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8" id="contacts-form-and-details">
            <div className="md:col-span-12 lg:col-span-5 bg-gradient-to-br from-blue-600/20 to-cyan-600/10 border border-blue-500/20 p-6 rounded-3xl flex flex-col justify-between space-y-6" id="contacts-details-left-pane">
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Let&apos;s collaborate</h3>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  Looking for an engineer who speaks both High-Level JavaScript/TypeScript and Low-Level C/C++? Gurel Ben Shabat is available for professional consultancies, core embedded development initiatives, and system design integrations. Leave your messages here.
                </p>
              </div>

              <div className="space-y-3" id="direct-links-details">
                <div className="flex items-center gap-3 bg-slate-900/40 p-3 rounded-2xl border border-slate-800/80">
                  <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-blue-400 font-bold font-mono text-xs">
                    @
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] uppercase tracking-wider text-slate-500 font-bold">Primary Datalink</span>
                    <span className="text-xs font-mono text-slate-200">guri240@gmail.com</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-slate-900/40 p-3 rounded-2xl border border-slate-800/80">
                  <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-cyan-400 font-bold font-mono text-xs">
                    📍
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] uppercase tracking-wider text-slate-500 font-bold">Location Segment</span>
                    <span className="text-xs text-slate-300 font-sans">Tel Aviv, Israel</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-slate-900/40 p-3 rounded-2xl border border-slate-800/80">
                  <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-indigo-455 font-bold font-mono text-[10px]">
                    IN
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] uppercase tracking-wider text-slate-500 font-bold">Professional Net</span>
                    <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-xs text-indigo-300 hover:text-cyan-400 transition inline-flex items-center gap-1 font-sans font-medium">
                      LinkedIn Profile <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="hidden lg:block lg:col-span-1" />

            <div className="md:col-span-12 lg:col-span-6" id="contacts-form-right-pane">
              {/* Actual form handling communications */}
              <ContactForm />
            </div>
          </div>
        </section>

      </main>

      {/* Humble, sleek, professional system credits details */}
      <footer className="border-t border-slate-900/60 mt-12 py-10 text-center text-slate-600 space-y-2 font-mono text-[10px]" id="root-footer">
        <p className="font-semibold tracking-wider text-slate-500 uppercase">Gurel Ben Shabat © {new Date().getFullYear()}</p>
        <p className="text-slate-600">Built using Next.js, Tailwind v4 and local SQLite datastores</p>
      </footer>
    </div>
  );
}
