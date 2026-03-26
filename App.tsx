
import React, { useState, useRef, useEffect } from 'react';
import { 
  ShieldCheck, 
  Workflow, 
  Sparkles, 
  ArrowRight, 
  Database, 
  Layers, 
  Activity, 
  Terminal, 
  Settings, 
  Check, 
  X, 
  Mail, 
  ChevronLeft, 
  Building2, 
  Briefcase, 
  Target, 
  Award, 
  HardDrive, 
  ChevronDown, 
  Target as GoalIcon, 
  Box, 
  Menu, 
  RefreshCw, 
  FileCheck, 
  Bot, 
  UserPlus, 
  FileSignature, 
  BookOpen, 
  LayoutDashboard, 
  PhoneCall, 
  Wrench, 
  Rocket, 
  Linkedin, 
  Phone,
  Layout,
  Network,
  FolderTree,
  Shield,
  Send,
  Sun,
  Moon
} from 'lucide-react';
import { getChatResponse } from './geminiService';
import { ChatMessage } from './types';
import OnboardingPage from './OnboardingPage';

// --- SHARED COMPONENTS ---

const Logo = ({ className = "", animated = false }: { className?: string, animated?: boolean }) => (
  <div className={`flex items-center gap-2 select-none ${className}`}>
    <div className="flex flex-col items-center justify-center">
      <div className={`flex items-baseline font-black tracking-[-0.02em] text-current ${animated ? 'animate-pulse' : ''}`}>
        <span className="text-[1.1em]">THUSALYNK</span>
      </div>
      <div className={`w-full h-[0.35em] border-b-[0.15em] border-current rounded-[50%] -mt-[0.1em] opacity-90 ${animated ? 'animate-[bounce_2s_infinite]' : ''}`}></div>
    </div>
  </div>
);

const Navbar = ({ theme, toggleTheme, onNavigateToOnboarding, onNavigateToHome }: { 
  theme: 'dark' | 'light',
  toggleTheme: () => void,
  onNavigateToOnboarding: () => void,
  onNavigateToHome: () => void
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    onNavigateToHome();
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-3 py-4 md:px-8 ${scrolled ? 'pt-2' : 'pt-6'}`}>
        <div className={`max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8 py-2 md:py-4 glass-card rounded-2xl md:rounded-full shadow-2xl transition-all ${scrolled ? 'bg-[var(--bg)]/80 backdrop-blur-xl' : ''}`}>
          <div className="flex items-center gap-3">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-current opacity-70 hover:opacity-100 transition-colors p-1">
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div className="flex items-center gap-2 cursor-pointer group shrink-0" onClick={onNavigateToHome}>
              <Logo className="text-[11px] md:text-[14px]" />
            </div>
          </div>
          <div className="hidden md:flex items-center gap-8 text-[11px] font-bold opacity-50">
            <button onClick={() => scrollTo('services')} className="hover:opacity-100 transition-colors tracking-widest uppercase">Services</button>
            <button onClick={() => scrollTo('methodology')} className="hover:opacity-100 transition-colors tracking-widest uppercase">Methodology</button>
            <button onClick={() => scrollTo('blueprints')} className="hover:opacity-100 transition-colors tracking-widest uppercase">Blueprints</button>
            <button onClick={() => scrollTo('pricing')} className="hover:opacity-100 transition-colors tracking-widest uppercase">Packages</button>
            <button onClick={() => scrollTo('faq')} className="hover:opacity-100 transition-colors tracking-widest uppercase">FAQ</button>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <button 
              onClick={toggleTheme}
              className="p-2.5 rounded-full glass-card hover:bg-slate-500/10 transition-all active:scale-95 border border-[var(--border)]"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} className="text-slate-600" />}
            </button>
            <button 
              onClick={onNavigateToOnboarding}
              className="bg-slate-600 text-white px-4 md:px-6 py-2 md:py-2.5 rounded-xl md:rounded-full text-[10px] md:text-[11px] font-black uppercase tracking-tighter hover:bg-slate-500 transition-all shadow-lg active:scale-95"
            >
              Initialize
            </button>
          </div>
        </div>
      </nav>
      <div className={`fixed inset-0 z-40 bg-[var(--bg)]/98 backdrop-blur-2xl transition-all duration-500 md:hidden ${mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}`}>
        <div className="flex flex-col items-center justify-center h-full gap-8 px-6 pt-10 text-center">
          <button onClick={() => scrollTo('services')} className="text-xl font-black uppercase tracking-[0.2em] opacity-40">Services</button>
          <button onClick={() => scrollTo('methodology')} className="text-xl font-black uppercase tracking-[0.2em] opacity-40">Methodology</button>
          <button onClick={() => scrollTo('blueprints')} className="text-xl font-black uppercase tracking-[0.2em] opacity-40">Blueprints</button>
          <button onClick={() => scrollTo('pricing')} className="text-xl font-black uppercase tracking-[0.2em] opacity-40">Packages</button>
          <button onClick={() => scrollTo('faq')} className="text-xl font-black uppercase tracking-[0.2em] opacity-40">FAQ</button>
          <button onClick={toggleTheme} className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest py-4 px-8 glass-card rounded-xl border border-[var(--border)]">
            {theme === 'dark' ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} className="text-slate-600" />}
            {theme === 'dark' ? 'Switch to Light' : 'Switch to Dark'}
          </button>
          <button onClick={onNavigateToOnboarding} className="bg-slate-600 text-white px-8 py-4 rounded-xl text-sm font-black uppercase tracking-[0.15em]">Initialize Protocol</button>
        </div>
      </div>
    </>
  );
};

const Hero = ({ onOnboard }: { onOnboard: () => void }) => (
  <section className="relative pt-32 pb-16 px-5 overflow-hidden flex flex-col items-center justify-center text-center min-h-[80vh] md:min-h-[90vh]">
    <div className="reveal w-full max-w-4xl mx-auto">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--border)] bg-[var(--card-bg)] text-current opacity-70 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.25em] mb-10"><Shield size={12} className="text-slate-500" /> Digital Infrastructure Studio</div>
      <h1 className="text-[12vw] md:text-[7vw] font-extrabold font-display leading-[1.05] tracking-tighter mb-8 uppercase text-balance">
        ARCHITECTING THE <br/> <span className="outline-text">OPERATIONAL</span> <br/> BACKBONE.
      </h1>
      <p className="max-w-xl mx-auto text-sm md:text-xl opacity-60 font-medium leading-relaxed mb-12 md:mb-16 px-4">
        We design and manage the digital infrastructure of high-performance firms. Structured clarity for consultants, IT professionals, and scaling founders.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
        <button onClick={onOnboard} className="w-full sm:w-auto px-10 py-5 bg-slate-600 text-white font-black rounded-xl active:scale-95 transition-all uppercase text-[10px] flex items-center justify-center gap-2 hover:bg-slate-500 shadow-xl shadow-slate-600/20">Initialize Protocol <ArrowRight size={16} /></button>
        <button onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })} className="w-full sm:w-auto px-10 py-5 glass-card text-current font-black rounded-xl active:scale-95 transition-all uppercase text-[10px]">View Our Services</button>
      </div>
    </div>
  </section>
);

const ServicePillars = () => {
  const iconMap: Record<string, React.ReactNode> = {
    "COMMUNICATION PROTOCOLS": <Network className="text-slate-500" size={28} />,
    "WORKSPACE ARCHITECTURE": <FolderTree className="text-purple-500" size={28} />,
    "INTERFACE DESIGN": <Layout className="text-cyan-500" size={28} />,
    "AI AUTOMATION": <Bot className="text-slate-400" size={28} />,
  };

  const pillars = [
    {
      title: "COMMUNICATION PROTOCOLS",
      description: "Moving beyond disorganized inboxes. We implement advanced filtering, label hierarchies, and LinkedIn authority mapping.",
      features: ["Inbox Orchestration", "Professional Response Frameworks", "LinkedIn Strategy"]
    },
    {
      title: "WORKSPACE ARCHITECTURE",
      description: "Structured digital files and internal documentation. Creating logical, scalable folder hierarchies and permission tiers.",
      features: ["Drive/365 Hierarchy", "Internal Documentation", "Access Governance"]
    },
    {
      title: "INTERFACE DESIGN",
      description: "Bespoke digital touchpoints for your clients. High-conversion landing pages and strategic client portals.",
      features: ["Client Portals", "Landing Page Design", "Internal Dashboards"]
    },
    {
      title: "AI AUTOMATION",
      description: "Autonomizing repetitive business operations. We build custom AI agents and automated workflows that think for you.",
      features: ["Custom AI Agents", "Workflow Autonomization", "LLM Integration"]
    }
  ];

  return (
    <section id="services" className="py-20 md:py-32 px-5 border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 md:mb-24 flex flex-col items-center">
          <div className="inline-block px-3 py-1 rounded-full border border-[var(--border)] bg-[var(--card-bg)] text-current opacity-70 text-[9px] font-bold uppercase tracking-[0.3em] mb-4">THE FOUR PROTOCOLS</div>
          <h2 className="text-3xl md:text-7xl font-bold font-display tracking-tighter uppercase mb-6 leading-tight">
            CORE <span className="outline-text">INFRASTRUCTURE.</span>
          </h2>
          <p className="opacity-80 text-sm md:text-lg max-w-xl mx-auto font-medium leading-relaxed">
            We don't provide temporary assistance. We build the permanent systems that allow your firm to scale without friction.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {pillars.map((pillar, i) => (
            <div key={i} className="glass-card p-8 md:p-12 rounded-3xl md:rounded-[3rem] border border-[var(--border)] flex flex-col h-full group">
              <div className="w-14 h-14 bg-[var(--card-bg)] rounded-2xl flex items-center justify-center mb-8 border border-[var(--border)] group-hover:bg-slate-600/10 transition-all">
                {iconMap[pillar.title] || <Activity className="text-slate-500" size={28} />}
              </div>
              <h3 className="text-xl font-bold font-display uppercase tracking-tight mb-4">{pillar.title}</h3>
              <p className="opacity-60 text-sm mb-10 leading-relaxed flex-1">{pillar.description}</p>
              <ul className="space-y-3 pt-6 border-t border-[var(--border)]">
                {pillar.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-2 text-[10px] font-black opacity-50 uppercase tracking-widest">
                    <Check size={12} className="text-slate-500" /> {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const InfrastructureVSVA = () => (
  <section className="py-20 md:py-32 px-5">
    <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 md:gap-20 items-center">
      <div>
        <div className="inline-block px-3 py-1 rounded-full border border-slate-500/20 bg-slate-500/5 text-slate-400 text-[9px] font-black uppercase tracking-[0.3em] mb-6">THE DIFFERENCE</div>
        <h2 className="text-4xl md:text-6xl font-bold font-display tracking-tighter uppercase mb-8 leading-tight">
          BEYOND <span className="outline-text">ADMIN.</span>
        </h2>
        <p className="opacity-80 text-lg mb-8 leading-relaxed">
          Virtual assistants manage tasks. ThusaLynk designs the systems. We eliminate disorganized digital debt by creating architectural integrity in your workflows.
        </p>
        <div className="space-y-4">
          <div className="flex gap-4 p-5 glass-card rounded-2xl border-[var(--border)]">
            <X size={20} className="text-red-500 shrink-0" />
            <div>
              <p className="text-sm font-bold opacity-90 mb-1 uppercase tracking-tighter">Typical Admin Support</p>
              <p className="text-xs opacity-60">Reacts to fires, creates manual dependency, and offers no long-term structural value.</p>
            </div>
          </div>
          <div className="flex gap-4 p-5 glass-card rounded-2xl border-slate-500/20 bg-slate-500/5">
            <Check size={20} className="text-slate-500 shrink-0" />
            <div>
              <p className="text-sm font-bold opacity-90 mb-1 uppercase tracking-tighter">ThusaLynk Infrastructure</p>
              <p className="text-xs opacity-60">Builds protocols that run themselves, ensuring your digital firm scales with mathematical clarity.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="relative">
        <div className="aspect-square glass-card rounded-[3rem] border-[var(--border)] flex items-center justify-center p-12 overflow-hidden">
           <div className="w-full h-full border border-dashed border-[var(--border)] opacity-30 rounded-full flex items-center justify-center animate-[spin_20s_linear_infinite]">
              <div className="w-2/3 h-2/3 border border-dashed border-[var(--border)] opacity-50 rounded-full flex items-center justify-center">
                <div className="w-1/3 h-1/3 border border-dashed border-[var(--border)] opacity-70 rounded-full"></div>
              </div>
           </div>
           <Logo className="absolute scale-150" animated={true} />
        </div>
      </div>
    </div>
  </section>
);

const Pricing = ({ onOnboard }: { onOnboard: () => void }) => {
  const tiers = [
    { name: "FOUNDATION", price: "Custom", description: "Essential operational structural clarity for solo experts.", features: ["Inbox Orchestration", "Basic File Hierarchy", "AI Email Drafting"], icon: <Box size={20} /> },
    { name: "ORCHESTRATION", price: "Custom", description: "Full digital infrastructure for scaling teams (2-10).", features: ["Workspace Hierarchy Mapping", "Internal SOP Structure", "Automated Task Workflows"], featured: true, icon: <Network size={20} /> },
    { name: "INFRASTRUCTURE", price: "Contact", description: "Bespoke digital touchpoints and interface engineering.", features: ["Custom Client Portal", "AI Agent Integration", "Internal Dashboards"], icon: <Layout size={20} /> }
  ];
  return (
    <section id="pricing" className="py-20 md:py-32 px-5 border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 flex flex-col items-center">
          <div className="inline-block px-3 py-1 rounded-full border border-[var(--border)] bg-[var(--card-bg)] text-current opacity-70 text-[9px] font-bold uppercase tracking-[0.4em] mb-6">INVESTMENT TIERS</div>
          <h2 className="text-3xl md:text-7xl font-bold font-display tracking-tighter uppercase mb-4 leading-tight">SERVICE <span className="outline-text">PACKAGES.</span></h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {tiers.map((tier, i) => (
            <div key={i} className={`glass-card p-10 rounded-[3rem] border transition-all flex flex-col ${tier.featured ? 'border-slate-500/40 bg-slate-500/5 scale-105 shadow-2xl' : 'border-[var(--border)]'}`}>
              <div className="mb-6 p-4 bg-[var(--card-bg)] rounded-2xl w-fit border border-[var(--border)]">{tier.icon}</div>
              <h3 className="text-xl font-black uppercase tracking-tighter mb-2">{tier.name}</h3>
              <p className="opacity-80 text-xs mb-8 leading-relaxed">{tier.description}</p>
              <div className="text-3xl font-bold font-display text-slate-500 mb-8">{tier.price}</div>
              <ul className="space-y-4 mb-10 flex-1">
                {tier.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-3 text-[11px] font-bold opacity-80 uppercase tracking-tighter">
                    <Check size={14} className="text-slate-500 shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <button onClick={onOnboard} className={`w-full py-4 rounded-xl font-black uppercase tracking-widest text-[9px] transition-all ${tier.featured ? 'bg-slate-600 text-white hover:bg-slate-500' : 'bg-[var(--card-bg)] border border-[var(--border)] text-current hover:bg-slate-500/10'}`}>Request Audit</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Methodology = () => {
  const steps = [
    { number: "01", title: "AUDIT", desc: "We map your current operational debt and identify structural leaks in your communication and workspace." },
    { number: "02", title: "ARCHITECT", desc: "Our team designs bespoke digital protocols and folder hierarchies tailored to your firm's specific scale." },
    { number: "03", title: "DEPLOY", desc: "We implement the infrastructure, migrating data and setting up automated workflows with zero downtime." },
    { number: "04", title: "GOVERN", desc: "Ongoing management and optimization of your digital backbone to ensure long-term structural integrity." }
  ];

  return (
    <section id="methodology" className="py-20 md:py-32 px-5 bg-slate-600/5 border-y border-[var(--border)]">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-block px-3 py-1 rounded-full border border-slate-500/20 text-slate-400 text-[9px] font-black uppercase tracking-[0.3em] mb-6">THE METHODOLOGY</div>
            <h2 className="text-4xl md:text-7xl font-bold font-display tracking-tighter uppercase mb-8 leading-tight">THE <span className="outline-text">THUSALYNK</span> WAY.</h2>
            <p className="opacity-70 text-lg mb-10 leading-relaxed max-w-lg">
              We follow a rigorous architectural framework to ensure your digital infrastructure is not just functional, but mathematically sound.
            </p>
            <div className="flex items-center gap-6">
               <div className="flex -space-x-3">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-[var(--bg)] bg-slate-600 flex items-center justify-center text-[10px] font-bold">
                      <Logo className="scale-50" />
                    </div>
                  ))}
               </div>
               <p className="text-[10px] font-black uppercase tracking-widest opacity-40">Trusted by 50+ High-Performance Firms</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {steps.map((step, i) => (
              <div key={i} className="glass-card p-8 rounded-3xl border border-[var(--border)] group hover:border-slate-500/30 transition-all">
                <div className="text-4xl font-black text-slate-500/20 mb-4 group-hover:text-slate-500/40 transition-all">{step.number}</div>
                <h3 className="text-lg font-bold uppercase tracking-tight mb-2">{step.title}</h3>
                <p className="text-xs opacity-60 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const ExecutionBlueprints = () => {
  const blueprints = [
    {
      id: "BLUEPRINT_01",
      title: "COMMUNICATION STACK",
      steps: [
        { label: "AUDIT", detail: "Deep scan of current inbox volume and response latency." },
        { label: "LOGIC", detail: "Implementing Sieve-based filtering and priority routing." },
        { label: "TEMPLATES", detail: "Engineering high-conversion response frameworks." }
      ]
    },
    {
      id: "BLUEPRINT_02",
      title: "WORKSPACE HIERARCHY",
      steps: [
        { label: "MAPPING", detail: "Designing the logical tree structure for all firm data." },
        { label: "GOVERNANCE", detail: "Setting granular permission tiers and access logs." },
        { label: "SYNC", detail: "Automating cross-platform file synchronization." }
      ]
    },
    {
      id: "BLUEPRINT_03",
      title: "INTERFACE PORTAL",
      steps: [
        { label: "UX DESIGN", detail: "Wireframing the client journey and touchpoints." },
        { label: "ENGINEERING", detail: "Building the secure, high-performance web portal." },
        { label: "INTEGRATION", detail: "Connecting internal databases to the client UI." }
      ]
    },
    {
      id: "BLUEPRINT_04",
      title: "AI AUTOMATION",
      steps: [
        { label: "LOGIC FLOW", detail: "Mapping decision trees for automated operations." },
        { label: "LLM SETUP", detail: "Configuring custom models for specific firm tasks." },
        { label: "DEPLOYMENT", detail: "Launching autonomous agents into production." }
      ]
    }
  ];

  return (
    <section id="blueprints" className="py-20 md:py-32 px-5 border-b border-[var(--border)]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 md:mb-24">
          <div className="inline-block px-3 py-1 rounded-full border border-slate-500/20 text-slate-400 text-[9px] font-black uppercase tracking-[0.3em] mb-6">TECHNICAL EXECUTION</div>
          <h2 className="text-4xl md:text-7xl font-bold font-display tracking-tighter uppercase mb-8 leading-tight">EXECUTION <span className="outline-text">BLUEPRINTS.</span></h2>
          <p className="opacity-60 text-sm md:text-lg max-w-2xl font-medium leading-relaxed">
            A granular breakdown of the technical phases involved in deploying each infrastructure protocol.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {blueprints.map((bp, i) => (
            <div key={i} className="relative p-8 md:p-12 glass-card rounded-[2rem] border border-[var(--border)] overflow-hidden group">
              <div className="absolute top-0 right-0 p-6 font-mono text-[10px] opacity-20 group-hover:opacity-40 transition-opacity">
                {bp.id}
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tighter mb-10 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-slate-500"></span>
                {bp.title}
              </h3>
              
              <div className="space-y-8 relative">
                <div className="absolute left-4 top-2 bottom-2 w-px bg-slate-500/20"></div>
                
                {bp.steps.map((step, j) => (
                  <div key={j} className="relative pl-12">
                    <div className="absolute left-[13px] top-1.5 w-2 h-2 rounded-full bg-slate-500 border-4 border-[var(--bg)] z-10"></div>
                    <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{step.label}</div>
                    <p className="text-sm opacity-60 leading-relaxed">{step.detail}</p>
                  </div>
                ))}
              </div>
              <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:20px_20px]"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const faqs = [
    { q: "HOW DOES THIS DIFFER FROM A VIRTUAL ASSISTANT?", a: "VAs manage tasks; we design systems. We build the infrastructure that eliminates the need for manual task management in the first place." },
    { q: "WHAT IS 'OPERATIONAL DEBT'?", a: "Operational debt is the cumulative cost of disorganized digital habits—lost files, messy inboxes, and manual workflows that slow down scaling." },
    { q: "HOW LONG DOES A TYPICAL DEPLOYMENT TAKE?", a: "A standard infrastructure overhaul takes 2-4 weeks, depending on the complexity of your current operational debt." },
    { q: "DO YOU MANAGE THE SYSTEMS ONGOING?", a: "Yes. Our Infrastructure tier includes ongoing governance, ensuring your protocols remain optimal as you scale." }
  ];

  return (
    <section id="faq" className="py-20 md:py-32 px-5">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 rounded-full border border-[var(--border)] text-current opacity-70 text-[9px] font-bold uppercase tracking-[0.3em] mb-4">INTELLECTUAL CLEARANCE</div>
          <h2 className="text-3xl md:text-6xl font-bold font-display tracking-tighter uppercase mb-4">COMMON <span className="outline-text">QUERIES.</span></h2>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="glass-card rounded-2xl border border-[var(--border)] overflow-hidden">
              <button 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full p-6 flex items-center justify-between text-left hover:bg-slate-500/5 transition-all"
              >
                <span className="text-[11px] font-black uppercase tracking-widest">{faq.q}</span>
                <ChevronDown size={16} className={`transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`} />
              </button>
              <div className={`transition-all duration-300 ease-in-out ${openIndex === i ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                <p className="p-6 pt-0 text-xs opacity-60 leading-relaxed border-t border-[var(--border)]/50">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ChatSection = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { 
      role: 'assistant', 
      content: "Protocol Initialized. I am Zazi AI. I run your infrastructure as a high-performance communication engine. How can I architect your operational clarity today?" 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);
    const response = await getChatResponse(userMsg);
    setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    setIsLoading(false);
  };

  return (
    <section className="py-20 px-5">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-block px-3 py-1 rounded-full border border-slate-500/20 text-slate-400 text-[9px] font-black uppercase tracking-[0.3em] mb-4">ASSISTANT PROTOCOL</div>
      <h2 className="text-2xl md:text-5xl font-bold font-display uppercase tracking-tighter mb-4">Consult <span className="outline-text">Zazi AI.</span></h2>
          <p className="opacity-40 text-sm">Ask about operational debt, hierarchy design, or interface UX.</p>
        </div>
        <div className="glass-card rounded-3xl border border-[var(--border)] flex flex-col h-[450px] overflow-hidden shadow-2xl">
          <div className="flex-1 overflow-y-auto p-6 pt-10 space-y-5 text-xs">
            {messages.length === 0 && (
              <div className="text-center py-20 opacity-30"><Terminal size={32} className="mx-auto mb-4" /><p className="text-[9px] font-black uppercase tracking-widest">Awaiting Command Input...</p></div>
            )}
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-5 rounded-2xl ${m.role === 'user' ? 'bg-slate-600 text-white rounded-tr-none shadow-lg shadow-slate-600/10' : 'bg-[var(--card-bg)] border border-[var(--border)] opacity-90 rounded-tl-none'}`}>
                  {m.content}
                </div>
              </div>
            ))}
            {isLoading && <div className="text-[9px] text-slate-400 animate-pulse uppercase tracking-widest ml-1">Zazi AI thinking...</div>}
          </div>
          <div className="p-5 bg-[var(--card-bg)] border-t border-[var(--border)] flex gap-3">
            <input type="text" placeholder="Query the studio..." className="flex-1 bg-[var(--bg)]/40 border border-[var(--border)] rounded-xl py-3 px-5 text-xs font-semibold outline-none" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSend()} />
            <button onClick={handleSend} className="p-4 bg-slate-600 text-white rounded-xl active:scale-95 transition-all hover:bg-slate-500"><Send size={18} /></button>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer id="about" className="py-16 md:py-24 px-5 border-t border-[var(--border)]">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
      <div className="space-y-6 max-w-sm">
        <Logo className="text-[16px]" />
        <p className="opacity-50 text-sm font-medium leading-relaxed">
          Architecting structural clarity for high-performance firms. We bridge the gap between technical expertise and operational excellence.
        </p>
        <div className="flex gap-4">
           <a href="#" className="p-3 glass-card rounded-xl hover:bg-slate-500/10 transition-all opacity-50 hover:opacity-100"><Linkedin size={18} /></a>
           <a href="mailto:contact@thusalynk.ai" className="p-3 glass-card rounded-xl hover:bg-slate-500/10 transition-all opacity-50 hover:opacity-100"><Mail size={18} /></a>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-12 md:gap-24">
        <div>
          <h5 className="text-[10px] font-black opacity-40 uppercase tracking-[0.3em] mb-6">Protocols</h5>
          <div className="flex flex-col gap-3 text-xs font-bold opacity-60">
            <a href="#services" className="hover:opacity-100">Communication</a>
            <a href="#services" className="hover:opacity-100">Workspace</a>
            <a href="#services" className="hover:opacity-100">Interface</a>
          </div>
        </div>
        <div>
          <h5 className="text-[10px] font-black opacity-40 uppercase tracking-[0.3em] mb-6">Studio</h5>
          <div className="flex flex-col gap-3 text-xs font-bold opacity-60">
            <a href="#pricing" className="hover:opacity-100">Packages</a>
            <a href="#" className="hover:opacity-100">Privacy</a>
            <a href="#" className="hover:opacity-100">Terms</a>
          </div>
        </div>
      </div>
    </div>
    <div className="mt-16 text-center md:text-left border-t border-[var(--border)] pt-10 flex flex-col md:flex-row justify-between items-center gap-4">
      <p className="text-[9px] font-black opacity-30 uppercase tracking-[0.4em]">© THUSALYNK STUDIO 2025</p>
      <div className="flex items-center gap-2">
         <div className="w-1.5 h-1.5 rounded-full bg-slate-500 animate-pulse"></div>
         <span className="text-[9px] font-black opacity-40 uppercase tracking-widest">Global Operations: Optimal</span>
      </div>
    </div>
  </footer>
);

const App: React.FC = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [view, setView] = useState<'landing' | 'onboarding'>('landing');

  useEffect(() => {
    if (theme === 'light') {
      document.body.classList.add('light');
    } else {
      document.body.classList.remove('light');
    }
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  if (view === 'onboarding') {
    return (
      <div className="min-h-screen text-[var(--text)] selection:bg-slate-500/30 selection:text-slate-100 transition-colors duration-500">
        <div className="modern-bg" />
        <Navbar 
          theme={theme} 
          toggleTheme={toggleTheme} 
          onNavigateToOnboarding={() => setView('onboarding')}
          onNavigateToHome={() => setView('landing')}
        />
        <OnboardingPage onBack={() => setView('landing')} />
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen text-[var(--text)] selection:bg-slate-500/30 selection:text-slate-100 transition-colors duration-500">
      <div className="modern-bg" />
      <Navbar 
        theme={theme} 
        toggleTheme={toggleTheme} 
        onNavigateToOnboarding={() => setView('onboarding')}
        onNavigateToHome={() => setView('landing')}
      />
      <div className="reveal">
        <Hero onOnboard={() => setView('onboarding')} />
        <section className="py-16 md:py-32 px-5 text-center">
          <div className="max-w-4xl mx-auto">
             <div className="inline-block px-3 py-1 rounded-full border border-[var(--border)] text-current opacity-70 text-[9px] font-black uppercase tracking-[0.3em] mb-10">THE ARCHITECTURAL MISSION</div>
             <p className="text-xl md:text-5xl font-bold opacity-80 leading-[1.1] tracking-tighter font-display text-balance">
                We solve <span className="text-[var(--text)] italic">Operational Debt</span>. Replacing disorganized habits with high-integrity <span className="text-slate-500">digital protocols</span>.
             </p>
          </div>
        </section>
        <ServicePillars />
        <Methodology />
        <ExecutionBlueprints />
        <InfrastructureVSVA />
        <Pricing onOnboard={() => setView('onboarding')} />
        <FAQ />
        <ChatSection />
        <section className="py-24 md:py-48 px-5 text-center relative overflow-hidden">
           <div className="absolute inset-0 bg-slate-600/5 blur-[150px] pointer-events-none"></div>
           <h2 className="text-[12vw] md:text-[8vw] font-black uppercase leading-[0.9] tracking-tighter mb-12 relative z-10">READY TO <br/><span className="outline-text">INITIALIZE?</span></h2>
           <button onClick={() => setView('onboarding')} className="bg-slate-600 text-white px-12 py-6 rounded-xl text-xs font-black uppercase tracking-widest active:scale-95 transition-all shadow-2xl relative z-10 flex items-center gap-3 mx-auto hover:bg-slate-500">
              Secure Deployment Audit <ArrowRight size={16} />
           </button>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default App;
