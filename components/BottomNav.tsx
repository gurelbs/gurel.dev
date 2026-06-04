'use client';

import * as React from 'react';
import { motion } from 'motion/react';
import { Home, Briefcase, Award, Terminal, Mail, Cpu } from 'lucide-react';

interface BottomNavProps {
  activeSection: string;
  onNavClick: (sectionId: string) => void;
}

export default function BottomNav({ activeSection, onNavClick }: BottomNavProps) {
  const navItems = [
    { 
      id: 'hero', 
      label: 'Home', 
      icon: Home, 
      activeColor: 'text-emerald-400', 
      hoverColor: 'group-hover:text-emerald-400/80',
      activeBg: 'bg-emerald-500/10 border-b border-emerald-400/30' 
    },
    { 
      id: 'skills', 
      label: 'Skills', 
      icon: Cpu, 
      activeColor: 'text-cyan-400', 
      hoverColor: 'group-hover:text-cyan-400/80',
      activeBg: 'bg-cyan-500/10 border-b border-cyan-400/30' 
    },
    { 
      id: 'experience', 
      label: 'Work', 
      icon: Briefcase, 
      activeColor: 'text-amber-400', 
      hoverColor: 'group-hover:text-amber-400/80',
      activeBg: 'bg-amber-500/10 border-b border-amber-400/30' 
    },
    { 
      id: 'education', 
      label: 'Degrees', 
      icon: Award, 
      activeColor: 'text-indigo-400', 
      hoverColor: 'group-hover:text-indigo-400/80',
      activeBg: 'bg-indigo-500/10 border-b border-indigo-400/30' 
    },
    { 
      id: 'terminal', 
      label: 'Shell', 
      icon: Terminal, 
      activeColor: 'text-purple-400', 
      hoverColor: 'group-hover:text-purple-400/80',
      activeBg: 'bg-purple-500/10 border-b border-purple-400/30' 
    },
    { 
      id: 'contact', 
      label: 'Contact', 
      icon: Mail, 
      activeColor: 'text-rose-400', 
      hoverColor: 'group-hover:text-rose-400/80',
      activeBg: 'bg-rose-500/10 border-b border-rose-400/30' 
    },
  ];

  return (
    <div className="fixed bottom-6 left-0 right-0 z-50 flex justify-center px-2 md:px-0 pointer-events-none">
      <nav 
        className="bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-3xl sm:rounded-full px-2.5 sm:px-4 py-2 sm:py-2.5 flex items-center justify-around gap-1 sm:gap-2.5 shadow-[0_15px_30px_-5px_rgba(0,0,0,0.6)] w-full max-w-[95%] sm:max-w-xl pointer-events-auto"
        id="bottom-floating-navigation"
      >
        {navItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavClick(item.id)}
              className="relative px-2 sm:px-4 py-2.5 sm:py-3.5 rounded-2xl sm:rounded-full transition flex flex-col items-center gap-1 sm:gap-1.5 group outline-none select-none cursor-pointer flex-1 sm:flex-initial"
              id={`nav-item-${item.id}`}
              title={item.label}
            >
              {/* Material Style Active Pill sliding indicator - with dynamic bg */}
              {isActive && (
                <motion.span
                  layoutId="activePillIndicator"
                  className={`absolute inset-0 rounded-2xl sm:rounded-full ${item.activeBg}`}
                  transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                />
              )}

              <IconComponent 
                className={`w-5.5 h-5.5 sm:w-7 sm:h-7 transition-all duration-200 relative z-10 ${
                  isActive ? item.activeColor : `text-slate-400 ${item.hoverColor} group-hover:scale-105`
                }`} 
              />
              <span 
                className={`text-[9px] sm:text-xs font-semibold tracking-wider transition-colors duration-200 relative z-10 ${
                  isActive ? 'text-white' : 'text-slate-500 group-hover:text-slate-300'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
