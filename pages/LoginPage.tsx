import React, { useState, useRef } from 'react';
import { LogIn, User, Lock, AlertCircle } from 'lucide-react';
// Import the supabase client you created in src/supabaseClient.ts
import { supabase } from '../supabaseClient'; 

interface LoginPageProps {
  onLogin: (username: string) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!username || !password) {
      setError("Please provide your name and the sacred key.");
      setLoading(false);
      return;
    }

    try {
      // This converts "Abebe" to "abebe@portal.com" to match our SQL members
      const emailIdentity = `${username.toLowerCase().trim()}@portal.com`;

      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: emailIdentity,
        password: password,
      });

      if (authError) {
        // Friendly error for the members
        setError("Identity or Sacred Key is incorrect. Please try again.");
      } else if (data.user) {
        // Success! Pass the original username to the app
        onLogin(username);
      }
    } catch (err) {
      setError("The Portal is currently unreachable. Check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleUsernameKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      passwordRef.current?.focus();
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[#1e140a]/40 backdrop-blur-sm" />
      
      <div className="relative z-10 w-full max-w-lg mx-4">
        <div className="bg-[#fcf9f1]/95 backdrop-blur-md border-2 border-[#c5a059]/40 p-12 shadow-2xl relative overflow-hidden rounded-sm">
          {/* Decorative Corners */}
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
                placeholder="Your Name (e.g. Abebe)"
                className="w-full bg-white border border-[#d6c7a1] py-4 px-6 focus:outline-none focus:border-[#7a0000] transition-all text-slate-800 placeholder:text-slate-300 font-serif"
                disabled={loading}
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
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full ${loading ? 'bg-slate-400' : 'bg-[#7a0000] hover:bg-[#9a0000]'} text-white font-serif text-lg py-4 transition-all duration-300 shadow-xl border border-[#c5a059]/30 flex items-center justify-center gap-4 group mt-10 active:scale-95 cursor-pointer`}
            >
              <LogIn size={20} />
              {loading ? 'Verifying...' : 'Open Portal'}
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