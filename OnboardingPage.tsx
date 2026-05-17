import React, { useState, useEffect } from 'react';
import { 
  RefreshCw, 
  FileCheck, 
  ArrowRight,
  ChevronLeft
} from 'lucide-react';

interface OnboardingPageProps {
  onBack: () => void;
}

const OnboardingPage: React.FC<OnboardingPageProps> = ({ onBack }) => {
  const [submitted, setSubmitted] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '', email: '', company: '', bottlenecks: '',
    companySize: '', projectBudget: '', partnershipGoal: ''
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSyncing(true);
    setError(null);

    // ✅ Replace YOUR_FORM_ID with your actual Formspree form ID
    // Sign up free at https://formspree.io → New Form → copy the ID
    const FORMSPREE_URL = 'https://formspree.io/f/mbdbrwng';

    const payload = {
      name: formData.name,
      email: formData.email,
      company: formData.company,
      companySize: formData.companySize,
      partnershipGoal: formData.partnershipGoal,
      bottlenecks: formData.bottlenecks,
      _subject: `[AUDIT REQUEST] ${formData.company} — ThusaLynk Infrastructure Audit`,
      _replyto: formData.email,
    };

    try {
      const response = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data?.error || 'Submission failed');
      }

      setSubmitted(true);
    } catch (err) {
      console.error('Form submission error:', err);
      setError('Submission failed. Please try again or email mambosims2nd@gmail.com directly.');
    } finally {
      setIsSyncing(false);
    }
  };

  if (isSyncing) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-6 bg-[var(--bg)]">
        <RefreshCw size={60} className="text-slate-500 animate-spin mb-8" />
        <h2 className="text-2xl font-black uppercase tracking-widest mb-4 font-display">Syncing...</h2>
        <div className="space-y-1 font-mono text-[9px] text-slate-400/60 uppercase tracking-[0.3em]">
          <p className="animate-pulse">Building Infrastructure Profile...</p>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen px-5 flex flex-col items-center justify-center text-center bg-[var(--bg)]">
        <div className="w-20 h-20 bg-slate-500/10 rounded-2xl flex items-center justify-center mb-8 border border-slate-500/30">
          <FileCheck size={40} className="text-slate-500" />
        </div>
        <h1 className="text-3xl md:text-7xl font-bold font-display uppercase tracking-tighter mb-4 leading-tight">
          HANDSHAKE <br/><span className="outline-text">READY.</span>
        </h1>
        <div className="max-w-md w-full glass-card p-8 rounded-3xl border border-[var(--border)] mb-10 text-left text-xs space-y-3 font-mono">
           <p className="opacity-80">&gt;&gt; From: ThusaLynk Architect</p>
           <p className="opacity-80">&gt;&gt; To: {formData.email}</p>
           <p className="opacity-80">&gt;&gt; Status: <span className="text-slate-500">PARAM_COMPILED</span></p>
           <p className="opacity-50 pt-4 leading-relaxed italic">"Your audit request has been received. We'll be in touch within 24 hours."</p>
        </div>
        <div className="flex gap-4">
          <button onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', company: '', bottlenecks: '', companySize: '', projectBudget: '', partnershipGoal: '' }); }} className="bg-slate-600 text-white px-10 py-4 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-slate-500 transition-all active:scale-95">Reset Protocol</button>
          <button onClick={onBack} className="glass-card text-current px-10 py-4 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-slate-500/10 transition-all active:scale-95">Return to Hub</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] py-20 md:py-32 px-5">
      <div className="max-w-3xl mx-auto">
        <button 
          onClick={onBack}
          className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-widest opacity-50 hover:opacity-100 transition-all mb-12"
        >
          <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Studio
        </button>
        
        <div className="mb-12 text-center">
          <div className="inline-block px-3 py-1 rounded-full border border-slate-500/20 bg-slate-500/5 text-slate-400 text-[9px] font-black uppercase tracking-[0.3em] mb-4">AUDIT INITIALIZATION</div>
          <h2 className="text-4xl md:text-7xl font-bold font-display uppercase tracking-tighter mb-4 leading-tight">CLIENT <br/><span className="outline-text">ONBOARDING.</span></h2>
          <p className="opacity-60 text-sm md:text-lg">Initialize your infrastructure audit protocol.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="glass-card p-6 md:p-12 rounded-3xl md:rounded-[3rem] border border-[var(--border)] space-y-6 shadow-2xl">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase tracking-widest opacity-40 ml-1">Full Name</label>
                <input required type="text" placeholder="John Doe" className="w-full bg-[var(--bg)]/40 border border-[var(--border)] rounded-xl py-4 px-5 text-sm font-semibold focus:border-slate-500/50 outline-none" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase tracking-widest opacity-40 ml-1">Professional Email</label>
                <input required type="email" placeholder="john@company.com" className="w-full bg-[var(--bg)]/40 border border-[var(--border)] rounded-xl py-4 px-5 text-sm font-semibold focus:border-slate-500/50 outline-none" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase tracking-widest opacity-40 ml-1">Company Entity</label>
                <input required type="text" placeholder="Acme Corp" className="w-full bg-[var(--bg)]/40 border border-[var(--border)] rounded-xl py-4 px-5 text-sm font-semibold focus:border-slate-500/50 outline-none" value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase tracking-widest opacity-40 ml-1">Operational Scale</label>
                <select required className="w-full bg-[var(--bg)]/40 border border-[var(--border)] rounded-xl py-4 px-5 text-sm font-semibold outline-none cursor-pointer" value={formData.companySize} onChange={e => setFormData({...formData, companySize: e.target.value})}>
                  <option value="" disabled>Team Size</option>
                  <option value="1-3">1-3 Experts</option>
                  <option value="4-15">4-15 Professionals</option>
                  <option value="16-50">16-50 Scale-up</option>
                  <option value="51+">Enterprise</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase tracking-widest opacity-40 ml-1">Primary Infrastructure Goal</label>
              <select required className="w-full bg-[var(--bg)]/40 border border-[var(--border)] rounded-xl py-4 px-5 text-sm font-semibold outline-none cursor-pointer" value={formData.partnershipGoal} onChange={e => setFormData({...formData, partnershipGoal: e.target.value})}>
                <option value="" disabled>Select Objective</option>
                <option value="Communication Protocols">Communication Protocols (Inbox/LinkedIn)</option>
                <option value="Workspace Hierarchy">Workspace Hierarchy (Drive/Doc Sync)</option>
                <option value="AI Automation">AI Automation Workflows (Autonomization)</option>
                <option value="Interface Design">Interface Engineering (Portal/UX)</option>
                <option value="Total Integration">Total Infrastructure Integration</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase tracking-widest opacity-40 ml-1">Operational Debt Summary</label>
              <textarea required placeholder="Briefly describe your current manual bottlenecks..." className="w-full h-32 bg-[var(--bg)]/40 border border-[var(--border)] rounded-xl py-4 px-5 text-sm font-semibold focus:border-slate-500/50 outline-none resize-none" value={formData.bottlenecks} onChange={e => setFormData({...formData, bottlenecks: e.target.value})} />
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-5 py-4 text-xs font-semibold text-red-400">
                {error}
              </div>
            )}

            <button type="submit" className="w-full bg-slate-600 text-white py-5 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-500 transition-all transform active:scale-95 shadow-2xl flex items-center justify-center gap-2">
              INITIALIZE PROTOCOL AUDIT <ArrowRight size={16} />
            </button>
          </div>
        </form>
        
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 opacity-40">
          <div className="text-center">
            <div className="text-xl font-black mb-2">01</div>
            <div className="text-[9px] font-black uppercase tracking-widest">Data Sync</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-black mb-2">02</div>
            <div className="text-[9px] font-black uppercase tracking-widest">Architect Review</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-black mb-2">03</div>
            <div className="text-[9px] font-black uppercase tracking-widest">Handshake</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;
