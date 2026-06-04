'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal as TerminalIcon, Cpu, RefreshCw, CornerDownLeft, Circle } from 'lucide-react';
import { getStoredContacts, clearStoredContacts } from '../app/actions';
import { type ContactMessage } from '../lib/contacts';

interface HistoryItem {
  command: string;
  output: React.ReactNode;
  timestamp: string;
}

export default function TerminalMode() {
  const [inputVal, setInputVal] = React.useState('');
  const [history, setHistory] = React.useState<HistoryItem[]>([]);
  const [cmdHistory, setCmdHistory] = React.useState<string[]>([]);
  const [cmdHistoryIdx, setCmdHistoryIdx] = React.useState(-1);
  const [booting, setBooting] = React.useState(false);
  const [bootLogs, setBootLogs] = React.useState<string[]>([]);
  
  const bottomRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  // Focus utility
  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  function initWelcome() {
    setHistory([
      {
        command: 'systemctl boot --portfolio',
        output: (
          <div className="space-y-2 text-slate-300">
            <p className="text-cyan-400 font-semibold text-sm">GurelOS v1.12.0-embedded (ARMv8/Cortex-A72)</p>
            <p className="text-xs text-slate-400">System load: 0.14 | Temp: 42°C | Architecture: Hybrid System/Web</p>
            <p className="text-slate-400">---------------------------------------------------------</p>
            <p className="text-slate-300">
              Welcome to the interactive system console of <span className="text-cyan-400 font-medium">Gurel Ben Shabat</span>.
              This interactive cli emulates an embedded terminal environment.
            </p>
            <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800 text-xs text-slate-400 mt-2 space-y-1">
              <span className="text-cyan-400">Usage Suggestions:</span>
              <p>• Type <span className="text-white font-mono bg-slate-800 px-1 py-0.5 rounded">help</span> for a list of active system commands</p>
              <p>• Type <span className="text-white font-mono bg-slate-800 px-1 py-0.5 rounded">about</span> to read Gurel&apos;s professional profile</p>
              <p>• Type <span className="text-white font-mono bg-slate-800 px-1 py-0.5 rounded">skills</span> to view embedded/web master skill set</p>
              <p>• Type <span className="text-white font-mono bg-slate-800 px-1 py-0.5 rounded">contacts</span> to query real contact entries live from SQLite</p>
            </div>
          </div>
        ),
        timestamp: new Date().toLocaleTimeString(),
      }
    ]);
  }

  // Scroll to bottom
  React.useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history, bootLogs, booting]);

  // Initial welcome message
  React.useEffect(() => {
    const timer = setTimeout(() => {
      initWelcome();
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const handleReboot = async () => {
    setBooting(true);
    setBootLogs([]);
    const logs = [
      '⚡ [SYS] Received SIGTERM signal. Stopping active subsystems...',
      '🔌 [SYS] Unmounting local data records...',
      '📦 [SYS] Clearing cache buffers...',
      '🔄 [SYS] Initializing system reboot sequence...',
      '🛠️ [HW] Testing CPU cores / ARM Cortex register checks... OK',
      '📦 [HW] RAM integrity verify: 2048MB ECC SRAM... OK',
      '💾 [DRV] Device Driver: net_link initialized at offset 0xF020',
      '🦾 [DRV] Device Driver: gpio_gpio_rtos controller mapped',
      '🐧 [KRN] Loading Linux kernel v6.12.3-embedded-rtas...',
      '📂 [KRN] Mounting secure database volume: /dev/sqlite0... SUCCESS',
      '📶 [NET] Socket service binding on loopback: port 3000',
      '🚀 [SYS] Portfolio modules loaded. GurelOS GUI launcher active.',
    ];

    for (let i = 0; i < logs.length; i++) {
      await new Promise((res) => setTimeout(res, 200 + Math.random() * 250));
      setBootLogs((prev) => [...prev, logs[i]]);
    }
    
    await new Promise((res) => setTimeout(res, 400));
    setBooting(false);
    initWelcome();
  };

  const processCommand = async (fullCommand: string) => {
    const trimmed = fullCommand.trim();
    if (!trimmed) return;

    // Add to history list
    setCmdHistory((prev) => [...prev, trimmed]);
    setCmdHistoryIdx(-1);

    const parts = trimmed.split(' ');
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    let output: React.ReactNode = null;

    switch (cmd) {
      case 'help':
        output = (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-300 py-1">
            <div>
              <p><span className="text-cyan-400 font-mono">about</span> - Gurel&apos;s hybrid background profile</p>
              <p><span className="text-cyan-400 font-mono">skills</span> - Grouped technology skills matrix</p>
              <p><span className="text-cyan-400 font-mono">projects</span> - Showcase of low-level & web projects</p>
              <p><span className="text-cyan-400 font-mono">experience</span> - Full employment timeline overview</p>
            </div>
            <div>
              <p><span className="text-cyan-400 font-mono font-semibold">contacts</span> - Query submissions saved in database</p>
              <p><span className="text-cyan-400 font-mono">contacts clear</span> - Empty message records database</p>
              <p><span className="text-cyan-400 font-mono">reboot</span> - Simulate embedded system soft boot</p>
              <p><span className="text-cyan-400 font-mono">clear</span> - Flush terminal lines</p>
            </div>
          </div>
        );
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      case 'about':
        output = (
          <div className="space-y-2 text-xs text-slate-300">
            <p className="text-white text-sm font-semibold">About Gurel Ben Shabat</p>
            <p>
              &quot;I bridge the gap between high-level web ecosystems and low-level real-time embedded systems.&quot;
            </p>
            <p>
              Transitioning from a <span className="text-white font-medium">Full-stack Software Engineer II at ZoomInfo</span> to
              the specialized frontier of <span className="text-cyan-400 font-medium">Embedded Software Engineering</span>. 
              My dual competence allows me to engineer complete end-to-end architectures – from custom RTOS/Linux kernel custom modules mapping 
              registers up to high-fps user interfaces and robust distributed APIs on Cloud.
            </p>
          </div>
        );
        break;

      case 'skills':
        output = (
          <div className="space-y-3 text-xs text-slate-300">
            <div>
              <span className="text-cyan-400 font-semibold uppercase tracking-wider text-[10px]">⚙️ Low-Level & Embedded:</span>
              <p className="text-white mt-1">C, C++, Linux Kernel, Device Drivers, RTOS, ARM Architecture, BSP, Multi-threading, System Calls, GDB, GCC</p>
            </div>
            <div>
              <span className="text-blue-400 font-semibold uppercase tracking-wider text-[10px]">🌐 High-Level & Web:</span>
              <p className="text-white mt-1">TypeScript, JavaScript, Python, Node.js, NestJS, React, Next.js, Angular, Bash, HTML, CSS</p>
            </div>
            <div>
              <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">💾 Database & Infrastructure:</span>
              <p className="text-white mt-1">MongoDB, PostgreSQL, SQLite, Git, Jira, Jenkins, GCP, Ubuntu, Kubuntu</p>
            </div>
          </div>
        );
        break;

      case 'experience':
        output = (
          <div className="space-y-2 text-xs text-slate-300">
            <div className="border-l-2 border-cyan-500 pl-3">
              <p className="font-semibold text-white">Full-stack Software Engineer II — ZoomInfo Technologies Inc.</p>
              <p className="text-slate-400">Dec 2021 – Jul 2023 | SaaS Core Engineering Group</p>
              <ul className="list-disc list-inside mt-1 text-slate-300 space-y-1">
                <li>Engineered high-scale dynamic landing page renderer generating <span className="text-cyan-400">10M+ search-indexed, search-engine-optimized pages</span> in 60 days.</li>
                <li>Designed, deployed and maintained critical business functionalities across subsidiaries (Neverbounce, Comparably, Datanyze).</li>
                <li>Mentored junior engineers and automated code health validation frameworks.</li>
              </ul>
            </div>
          </div>
        );
        break;

      case 'education':
        output = (
          <div className="space-y-3 text-xs text-slate-300">
            <div className="border-l border-slate-700 pl-3">
              <p className="font-semibold text-white">Real-Time Embedded Linux Course — Real Time College</p>
              <p className="text-slate-400">Dec 2024 – Feb 2026 | Over 700 Intensive Class Hours</p>
              <p className="mt-1 text-slate-300">
                In-depth specialization: Linux Kernel modules, hardware driver writing, multi-threading synchronization constructs,
                ARM Assembly & peripherals, RTOS thread schedulers, and Board Support Packages (BSP) mapping.
              </p>
            </div>
            <div className="border-l border-slate-700 pl-3">
              <p className="font-semibold text-white">Full-Stack Developer Bootcamp — Appleseeds Academy</p>
              <p className="text-slate-400">6 Months | 750 Hours Immersive Training (2020-2021)</p>
            </div>
            <div className="border-l border-slate-700 pl-3">
              <p className="font-semibold text-white">Front-End Developer certification — Appleseeds & Microsoft</p>
              <p className="text-slate-400">3 Months | 300 Hours Front-End Lab Training (2020)</p>
            </div>
          </div>
        );
        break;

      case 'projects':
        output = (
          <div className="space-y-4 text-xs text-slate-300">
            <p className="text-white font-semibold">Gurel&apos;s Core Embedded & Web Lab Projects:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="bg-slate-900 border border-slate-800 p-2.5 rounded">
                <span className="text-cyan-400 font-bold font-mono">1. RTOS-KERNEL-DRV</span>
                <p className="text-[11px] text-slate-300 mt-1">
                  Custom hardware sensor scheduler on FreeRTOS using semaphores, mutex priority-inheritance, and task ring-buffers.
                </p>
                <div className="text-[10px] text-slate-500 font-mono mt-1.5">Stack: C, FreeRTOS, ARM Cortex-M4</div>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-2.5 rounded">
                <span className="text-cyan-400 font-bold font-mono">2. embedded-linux-bsp</span>
                <p className="text-[11px] text-slate-300 mt-1">
                  Yocto distribution tailoring for ARMv8. Added customized systemd startup controllers, Kernel DTB overlays.
                </p>
                <div className="text-[10px] text-slate-500 font-mono mt-1.5">Stack: Bash, C++, Yocto Project, Poky</div>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-2.5 rounded">
                <span className="text-cyan-400 font-bold font-mono">3. seo-highscale-pages</span>
                <p className="text-[11px] text-slate-300 mt-1">
                  Server-side static rendering framework supporting high index performance. Deployed globally with load balancing.
                </p>
                <div className="text-[10px] text-slate-500 font-mono mt-1.5">Stack: React, Next.js, Node.js, GCP</div>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-2.5 rounded">
                <span className="text-cyan-400 font-bold font-mono">4. smart-controller-edge</span>
                <p className="text-[11px] text-slate-300 mt-1">
                  Embedded socket gateway sending real-time sensor streams via cellular telemetry, linked to dynamic tracking web panels.
                </p>
                <div className="text-[10px] text-slate-500 font-mono mt-1.5">Stack: Python, Angular, PostgreSQL, Linux</div>
              </div>
            </div>
          </div>
        );
        break;

      case 'contacts':
        if (args[0] === 'clear') {
          const msg = await clearStoredContacts();
          output = <p className="text-amber-400 font-mono">{msg}</p>;
        } else {
          const list = await getStoredContacts();
          if (list.length === 0) {
            output = <p className="text-slate-400 italic">No submissions found. Contacts datastore is empty.</p>;
          } else {
            output = (
              <div className="space-y-3">
                <p className="text-cyan-400 font-mono font-semibold text-xs"> Live SQLite Contacts log Query Result ({list.length} records):</p>
                <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1 terminal-scroll">
                  {list.map((item) => (
                    <div key={item.id} className="bg-slate-900/80 p-2 rounded border border-slate-850 text-[11px] space-y-1">
                      <div className="flex justify-between font-mono text-slate-400">
                        <span className="text-white font-medium font-sans">{item.name} ({item.email})</span>
                        <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                      </div>
                      <p className="text-cyan-300/90 font-semibold">Sub: {item.subject}</p>
                      <p className="text-slate-300 leading-relaxed font-sans">{item.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            );
          }
        }
        break;

      case 'reboot':
        handleReboot();
        setInputVal('');
        return;

      default:
        output = (
          <p className="text-red-400 font-mono">
            Command not found: &apos;{cmd}&apos;. Type <span className="text-white underline">help</span> for a listing of available commands.
          </p>
        );
    }

    setHistory((prev) => [
      ...prev,
      {
        command: trimmed,
        output,
        timestamp: new Date().toLocaleTimeString(),
      },
    ]);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      processCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length > 0) {
        const nextIdx = cmdHistoryIdx === -1 ? cmdHistory.length - 1 : Math.max(0, cmdHistoryIdx - 1);
        setCmdHistoryIdx(nextIdx);
        setInputVal(cmdHistory[nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (cmdHistoryIdx !== -1) {
        if (cmdHistoryIdx === cmdHistory.length - 1) {
          setCmdHistoryIdx(-1);
          setInputVal('');
        } else {
          const nextIdx = cmdHistoryIdx + 1;
          setCmdHistoryIdx(nextIdx);
          setInputVal(cmdHistory[nextIdx]);
        }
      }
    }
  };

  return (
    <div 
      className="bg-slate-900/90 rounded-2xl overflow-hidden shadow-2xl border border-slate-800 font-mono flex flex-col h-[520px] transition-all transform duration-300 text-slate-100"
      id="portfolio-terminal-card"
      onClick={focusInput}
    >
      {/* Console Top Bar */}
      <div className="bg-slate-950/40 px-4 py-2.5 flex items-center justify-between border-b border-slate-800/80">
        <div className="flex items-center space-x-2">
          <TerminalIcon className="w-4 h-4 text-cyan-400" id="terminal-action-icon" />
          <span className="text-xs font-semibold tracking-wider text-slate-300">system_interactive_shell_v1.1</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <button 
            onClick={handleReboot}
            disabled={booting}
            className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-cyan-400 transition"
            title="Reboot Console"
            id="terminal-reboot-btn"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${booting ? 'animate-spin text-cyan-400' : ''}`} />
          </button>
          <div className="flex space-x-1 pl-2">
            <Circle className="w-2.5 h-2.5 fill-red-500/80 stroke-none" />
            <Circle className="w-2.5 h-2.5 fill-amber-500/80 stroke-none" />
            <Circle className="w-2.5 h-2.5 fill-green-500/80 stroke-none" />
          </div>
        </div>
      </div>

      {/* Rebooting Cover */}
      <AnimatePresence mode="wait">
        {booting ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 p-6 overflow-y-auto text-xs bg-black text-emerald-400 font-mono space-y-1 terminal-scroll"
            key="terminal-booting"
          >
            {bootLogs.map((log, index) => (
              <p key={index}>{log}</p>
            ))}
            <div className="w-2 h-4 bg-emerald-400 inline-block terminal-cursor" />
          </motion.div>
        ) : (
          /* Normal Terminal History Window */
          <div className="flex-1 p-4 overflow-y-auto flex flex-col space-y-4 text-xs terminal-scroll" id="terminal-screen-lines">
            {history.map((item, index) => (
              <div key={index} className="space-y-1.5">
                <div className="flex items-center text-slate-400 select-none">
                  <span className="text-green-400">gurel@embedded-vps</span>
                  <span className="mx-1">:</span>
                  <span className="text-blue-400">~</span>
                  <span className="text-slate-300">$</span>
                  <span className="ml-1.5 text-white font-semibold font-mono text-[13px]">{item.command}</span>
                  <span className="ml-auto text-[10px] text-slate-600 font-light">{item.timestamp}</span>
                </div>
                <div className="pl-3 border-l border-slate-900 pb-1 text-slate-300">
                  {item.output}
                </div>
              </div>
            ))}
            
            {/* Input Line */}
            <div className="flex items-center text-slate-400 mt-auto pt-2 border-t border-slate-900/60 font-mono">
              <span className="text-green-400 font-semibold">gurel@embedded-vps</span>
              <span className="mx-1 font-semibold">:</span>
              <span className="text-blue-400 font-semibold">~</span>
              <span className="text-slate-300 font-semibold">$</span>
              <div className="flex-1 ml-1.5 relative flex items-center">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full bg-transparent text-white font-mono text-sm focus:outline-none select-text border-none p-0 h-5"
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck="false"
                  id="terminal-interactive-input"
                  placeholder="type command..."
                />
                {!inputVal && (
                  <span className="absolute left-28 text-[11px] text-slate-600 select-none font-sans font-normal pointer-events-none">
                    (Press Enter)
                  </span>
                )}
              </div>
              <CornerDownLeft className="w-3.5 h-3.5 text-slate-600 float-right mr-1 stroke-[1.5]" />
            </div>
            
            <div ref={bottomRef} />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
