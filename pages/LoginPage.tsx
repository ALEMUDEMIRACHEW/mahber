
import React, { useState, useRef } from 'react';
import { LogIn, User, Lock, AlertCircle } from 'lucide-react';

interface LoginPageProps {
  onLogin: (username: string) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  
  // Ref for the password input to allow focus jumping
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!username || !password) {
      setError("Please provide your name and the sacred key.");
      return;
    }

    // Portal logic: In a real app we'd check a backend. 
    // Here we just ensure the password is correct for the portal.
    if (password === 'Portal@2024') {
      onLogin(username);
    } else {
      setError("The Sacred Key provided is incorrect.");
    }
  };

  const handleUsernameKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent form submission
      passwordRef.current?.focus(); // Jump to password field
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[#1e140a]/40 backdrop-blur-sm" />
      
      <div className="relative z-10 w-full max-w-lg mx-4">
        <div className="bg-[#fcf9f1]/95 backdrop-blur-md border-2 border-[#c5a059]/40 p-12 shadow-2xl relative overflow-hidden rounded-sm">
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#7a0000]/20" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#7a0000]/20" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#7a0000]/20" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#7a0000]/20" />

          <div className="flex flex-col items-center mb-10">
            <div className="text-[#7a0000] mb-6">
              <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11 2h2v7h7v2h-7v11h-2v-11H4v-2h7V2z" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-[#7a0000] font-serif tracking-tight">Portal Entry</h1>
            <p className="text-[#c5a059] font-serif italic text-lg mt-2">ማኅበረ ቅድስት ክርስቶስ ሠምራ</p>
            <div className="w-16 h-px bg-[#d6c7a1] mt-6" />
          </div>

          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 p-4 flex items-center gap-3 text-red-700 animate-in fade-in slide-in-from-top-2">
              <AlertCircle size={18} />
              <p className="text-xs font-bold uppercase tracking-widest">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-3">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] flex items-center gap-2">
                <User size={14} className="text-[#c5a059]" /> Identified As
              </label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={handleUsernameKeyDown}
                placeholder="Your Name (e.g. Dereje)"
                className="w-full bg-white border border-[#d6c7a1] py-4 px-6 focus:outline-none focus:border-[#7a0000] transition-all text-slate-800 placeholder:text-slate-300 font-serif"
                autoFocus
              />
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] flex items-center gap-2">
                <Lock size={14} className="text-[#c5a059]" /> Sacred Key
              </label>
              <input 
                ref={passwordRef}
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Access Password"
                className="w-full bg-white border border-[#d6c7a1] py-4 px-6 focus:outline-none focus:border-[#7a0000] transition-all text-slate-800 placeholder:text-slate-300 font-serif"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#7a0000] hover:bg-[#9a0000] text-white font-serif text-lg py-4 transition-all duration-300 shadow-xl border border-[#c5a059]/30 flex items-center justify-center gap-4 group mt-10 active:scale-95"
            >
              <LogIn size={20} />
              Open Portal
            </button>
          </form>

          <div className="mt-12 text-center">
            <p className="text-[10px] font-bold text-slate-300 leading-relaxed uppercase tracking-[0.2em] mb-4">
              Peace be with you
            </p>
            <p className="text-xs italic text-[#c5a059] font-serif font-medium">
              "Glory to the Father, and to the Son, and to the Holy Spirit."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
