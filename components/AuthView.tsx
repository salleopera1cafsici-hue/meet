
import React, { useState } from 'react';
import { COLORS } from '../constants';
import { Mail, Lock, Sparkles, ChevronRight, UserCircle2 } from 'lucide-react';

interface AuthViewProps {
  onLogin: (email: string, pass: string) => void;
}

const AuthView: React.FC<AuthViewProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [step, setStep] = useState<'login' | 'onboarding'>('login');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    onLogin(email, pass);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative Blobs */}
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-pink-500/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-violet-500/20 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="w-full max-w-md space-y-8 z-10">
        <div className="text-center space-y-2">
          <div className="w-20 h-20 rounded-[2.5rem] bg-gradient-to-tr from-pink-500 to-violet-500 mx-auto flex items-center justify-center text-white shadow-2xl shadow-pink-500/20 mb-6 transform hover:rotate-12 transition-transform">
            <Sparkles size={40} fill="currentColor" />
          </div>
          <h1 className="text-4xl font-black tracking-tight text-white uppercase italic">MEETME</h1>
          <p className="text-slate-400 font-medium">Real-Life First Discovery</p>
        </div>

        {step === 'login' ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-4">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com" 
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all text-white"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-4">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input 
                  type="password" 
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  placeholder="••••••••" 
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all text-white"
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-pink-500 to-violet-500 text-white font-bold rounded-2xl shadow-lg shadow-pink-500/20 transform active:scale-95 transition-all flex items-center justify-center gap-2 group"
            >
              <span>Se connecter</span>
              <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="flex items-center justify-between text-xs text-slate-500 font-bold uppercase px-2 mt-4">
              <button type="button" className="hover:text-pink-500">Mot de passe oublié ?</button>
              <button type="button" onClick={() => setStep('onboarding')} className="text-pink-500 hover:text-pink-400">Créer un compte</button>
            </div>
          </form>
        ) : (
          <div className="bg-slate-800/50 border border-slate-700 rounded-[2rem] p-8 space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-xl font-bold">Bienvenue sur MEETME !</h2>
              <p className="text-slate-400 text-sm">Personnalisons votre expérience pour de meilleures rencontres.</p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4 bg-slate-900 p-4 rounded-2xl border border-slate-700 group hover:border-pink-500 cursor-pointer transition-colors">
                <div className="p-3 bg-pink-500/10 rounded-xl text-pink-500"><UserCircle2 /></div>
                <div>
                  <p className="font-bold text-sm">Onboarding Rapide</p>
                  <p className="text-xs text-slate-500 italic">Prenez une photo en direct avec filtres SDK.</p>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-slate-900 p-4 rounded-2xl border border-slate-700 group hover:border-pink-500 cursor-pointer transition-colors">
                <div className="p-3 bg-blue-500/10 rounded-xl text-blue-500"><Sparkles /></div>
                <div>
                  <p className="font-bold text-sm">Préférences de Style</p>
                  <p className="text-xs text-slate-500 italic">Choisissez votre thème et vos filtres physiques.</p>
                </div>
              </div>
            </div>

            <button 
              onClick={() => setStep('login')}
              className="w-full py-4 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-2xl transition-all"
            >
              Commencer l'aventure
            </button>
          </div>
        )}

        <p className="text-center text-[10px] text-slate-600 uppercase font-bold tracking-widest mt-12">
          MEETME © 2024 • Secured by Guardian System
        </p>
      </div>
    </div>
  );
};

export default AuthView;
