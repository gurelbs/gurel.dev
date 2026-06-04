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
    { id: 'hero', label: 'Home', icon: Home },
    { id: 'skills', label: 'Skills', icon: Cpu },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'education', label: 'Education', icon: Award },
    { id: 'terminal', label: 'Shell', icon: Terminal },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  return (
    <div className="fixed bottom-6 left-0 right-0 z-50 flex justify-center px-4 md:px-0 pointer-events-none">
      <nav 
        className="bg-slate-900/80 backdrop-blur-lg border border-slate-800/80 rounded-full px-3 py-1.5 flex items-center gap-1.5 shadow-2xl max-w-lg pointer-events-auto"
        id="bottom-floating-navigation"
      >
        {navItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavClick(item.id)}
              className="relative px-3 py-2 rounded-full transition flex flex-col items-center gap-0.5 group outline-none select-none cursor-pointer"
              id={`nav-item-${item.id}`}
              title={item.label}
            >
              {/* Material Style Active Pill sliding indicator */}
              {isActive && (
                <motion.span
                  layoutId="activePillIndicator"
                  className="absolute inset-0 bg-cyan-500/15 border-b border-cyan-400/40 rounded-full"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}

              <IconComponent 
                className={`w-4 h-4 md:w-4.5 md:h-4.5 transition-colors relative z-10 ${
                  isActive ? 'text-cyan-400' : 'text-slate-400 group-hover:text-slate-200'
                }`} 
              />
              <span 
                className={`text-[9px] md:text-[10px] font-medium transition-colors relative z-10 ${
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
