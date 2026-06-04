'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cpu, Globe, Database, Terminal, Settings, Server } from 'lucide-react';

interface TechItem {
  name: string;
  category: 'low-level' | 'high-level' | 'infrastructure';
  level: 'Core' | 'Proficient' | 'Familiar';
}

export default function SkillsPanel() {
  const [filter, setFilter] = React.useState<'all' | 'embedded' | 'web' | 'infrastructure'>('all');

  const skills: TechItem[] = [
    // Low Level
    { name: 'C', category: 'low-level', level: 'Core' },
    { name: 'C++', category: 'low-level', level: 'Core' },
    { name: 'Linux Kernel Development', category: 'low-level', level: 'Core' },
    { name: 'Device Drivers (Kernel Modules)', category: 'low-level', level: 'Core' },
    { name: 'Real-Time Operating Systems (RTOS)', category: 'low-level', level: 'Core' },
    { name: 'ARM Architecture (Cortex-M/A)', category: 'low-level', level: 'Proficient' },
    { name: 'Board Support Packages (BSP)', category: 'low-level', level: 'Proficient' },
    { name: 'Multi-threading & Synchronization', category: 'low-level', level: 'Core' },
    
    // High Level / Web
    { name: 'TypeScript', category: 'high-level', level: 'Core' },
    { name: 'JavaScript', category: 'high-level', level: 'Core' },
    { name: 'Python', category: 'high-level', level: 'Proficient' },
    { name: 'Node.js', category: 'high-level', level: 'Core' },
    { name: 'NestJS', category: 'high-level', level: 'Core' },
    { name: 'React (Next.js)', category: 'high-level', level: 'Core' },
    { name: 'Angular', category: 'high-level', level: 'Proficient' },
    { name: 'Bash Scripting', category: 'high-level', level: 'Core' },
    { name: 'HTML5 & CSS3', category: 'high-level', level: 'Core' },

    // Infrastructure / DB
    { name: 'MongoDB', category: 'infrastructure', level: 'Core' },
    { name: 'PostgreSQL', category: 'infrastructure', level: 'Core' },
    { name: 'SQLite', category: 'infrastructure', level: 'Core' },
    { name: 'Git & Version Control', category: 'infrastructure', level: 'Core' },
    { name: 'Jira', category: 'infrastructure', level: 'Proficient' },
    { name: 'Jenkins CI/CD', category: 'infrastructure', level: 'Proficient' },
    { name: 'GCP (Google Cloud)', category: 'infrastructure', level: 'Familiar' },
    { name: 'Ubuntu / Kubuntu Environments', category: 'infrastructure', level: 'Core' },
  ];

  const filteredSkills = skills.filter((skill) => {
    if (filter === 'all') return true;
    if (filter === 'embedded') return skill.category === 'low-level';
    if (filter === 'web') return skill.category === 'high-level';
    if (filter === 'infrastructure') return skill.category === 'infrastructure';
    return true;
  });

  const getCategorizedIcon = (category: string) => {
    switch (category) {
      case 'low-level':
        return <Cpu className="w-4 h-4 text-cyan-400" />;
      case 'high-level':
        return <Globe className="w-4 h-4 text-blue-400" />;
      case 'infrastructure':
        return <Database className="w-4 h-4 text-slate-400" />;
      default:
        return <Settings className="w-4 h-4 text-slate-400" />;
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Core':
        return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20';
      case 'Proficient':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'Familiar':
      default:
        return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
  };

  return (
    <div className="space-y-6" id="skills-matrix-module">
      {/* Category filter selectors */}
      <div className="flex flex-wrap justify-center gap-2" id="filter-pill-selectors">
        {[
          { id: 'all', label: 'All Technologies', icon: Settings },
          { id: 'embedded', label: 'Low-Level & Embedded', icon: Cpu },
          { id: 'web', label: 'High-Level & Web', icon: Globe },
          { id: 'infrastructure', label: 'Database & DevOps', icon: Database },
        ].map((btn) => {
          const BtnIcon = btn.icon;
          const isActive = filter === btn.id;
          return (
            <button
              key={btn.id}
              onClick={() => setFilter(btn.id as any)}
              className={`flex items-center gap-2.5 px-5 py-3 rounded-full text-xs sm:text-sm font-bold border transition cursor-pointer select-none outline-none ${
                isActive
                  ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md shadow-cyan-500/10'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
              }`}
              id={`filter-btn-${btn.id}`}
            >
              <BtnIcon className="w-4 h-4" />
              <span>{btn.label}</span>
            </button>
          );
        })}
      </div>

      {/* Grid displays */}
      <motion.div 
        layout
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 bg-slate-800/30 p-4 sm:p-6 rounded-3xl border border-slate-700/40"
        id="skills-chips-grid"
      >
        <AnimatePresence mode="popLayout">
          {filteredSkills.map((skill) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              key={skill.name}
              className="bg-slate-900/50 p-3.5 rounded-2xl border border-slate-800/80 hover:border-slate-700/50 flex flex-col justify-between gap-3 group hover:shadow-xl transition-all duration-300"
              id={`skill-card-${skill.name.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <div className="flex items-start justify-between">
                <span className="text-sm sm:text-base font-bold text-slate-100 group-hover:text-cyan-400 transition-colors leading-tight">
                  {skill.name}
                </span>
                <span className="p-2 bg-slate-800/50 rounded-xl border border-slate-700/20 flex-shrink-0">
                  {getCategorizedIcon(skill.category)}
                </span>
              </div>
              <div className="flex items-center justify-between gap-1">
                <span className={`text-[10px] sm:text-xs px-2.5 py-0.5 rounded-full font-mono font-bold border uppercase tracking-wider ${getLevelColor(skill.level)}`}>
                  {skill.level}
                </span>
                <span className="text-[11px] text-slate-400 font-mono font-medium capitalize truncate">
                  {skill.category.replace('-', ' ')}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
