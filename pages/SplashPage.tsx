
import React from 'react';
import { ChevronRight, MapPin, Clock, Calendar } from 'lucide-react';

interface SplashPageProps {
  onEnter: () => void;
}

const SplashPage: React.FC<SplashPageProps> = ({ onEnter }) => {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden">
      {/* Respectful dark overlay to maintain splash page intimacy while showing global theme */}
      <div className="absolute inset-0 bg-[#1e140a]/80" />
      
      {/* Subtle vignettes */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60" />

      <div className="relative z-10 text-center max-w-5xl px-4 animate-in fade-in zoom-in duration-1000">
        {/* Religious Cross Icon - Golden */}
        <div className="text-[#c5a059] mb-8 flex justify-center">
           <svg className="w-16 h-16 drop-shadow-[0_0_15px_rgba(197,160,89,0.3)]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11 2h2v7h7v2h-7v11h-2v-11H4v-2h7V2z" />
           </svg>
        </div>

        <h1 className="text-white text-5xl md:text-7xl font-bold mb-4 tracking-tight drop-shadow-md">ማኅበረ ቅድስት ክርስቶስ ሠምራ</h1>
        <h2 className="text-[#c5a059] text-2xl md:text-4xl font-serif mb-6 tracking-[0.15em] italic">Mahbere Kidist Kristos Semra</h2>
        
        <div className="w-64 h-px bg-gradient-to-r from-transparent via-[#c5a059] to-transparent mx-auto mb-10 flex items-center justify-center">
          <span className="bg-[#1e140a] px-3 text-[#c5a059] text-xl leading-none">✝</span>
        </div>

        {/* Monastery Details Box - Manuscript Inspired */}
        <div className="bg-white/5 backdrop-blur-md border border-[#c5a059]/40 rounded-sm p-8 md:p-12 mb-12 max-w-3xl mx-auto shadow-2xl">
          <p className="text-white font-serif text-2xl md:text-3xl mb-3 leading-relaxed">በምዕራፈ ቅዱሳን አቡነ ገብረ መንፈስ ቅዱስ እና አቡነ አረጋዊ ገዳም</p>
          <p className="text-[#c5a059] text-sm font-bold uppercase tracking-widest mb-10 border-b border-[#c5a059]/20 pb-4">St. Abune Gebre Menfes Kidus & Abune Aregawi Monastery Branch</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-slate-300 text-sm font-medium">
            <div className="space-y-3 flex flex-col items-center">
              <div className="w-10 h-10 rounded-full border border-[#c5a059]/30 flex items-center justify-center text-[#c5a059]">
                <MapPin size={18} />
              </div>
              <div className="text-center">
                <p className="text-[#c5a059] text-[10px] uppercase tracking-widest font-bold mb-1">Location</p>
                <p className="font-serif italic">ሳሪስ አቦ, አቡነ አረጋዊ ቅጥር ግቢ</p>
              </div>
            </div>
            <div className="space-y-3 flex flex-col items-center">
              <div className="w-10 h-10 rounded-full border border-[#c5a059]/30 flex items-center justify-center text-[#c5a059]">
                <Clock size={18} />
              </div>
              <div className="text-center">
                <p className="text-[#c5a059] text-[10px] uppercase tracking-widest font-bold mb-1">Time</p>
                <p className="font-serif italic">ከጠዋቱ 4:00 እስከ ቀኑ 7:00</p>
              </div>
            </div>
            <div className="space-y-3 flex flex-col items-center">
              <div className="w-10 h-10 rounded-full border border-[#c5a059]/30 flex items-center justify-center text-[#c5a059]">
                <Calendar size={18} />
              </div>
              <div className="text-center">
                <p className="text-[#c5a059] text-[10px] uppercase tracking-widest font-bold mb-1">Schedule</p>
                <p className="font-serif italic">በየወሩ ከሃያ አራት በኋላ ያለው እሁድ</p>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={onEnter}
          className="bg-[#7a0000] hover:bg-[#9a0000] text-white font-serif text-lg py-4 px-12 rounded-none transition-all duration-500 flex items-center gap-3 mx-auto shadow-2xl border border-[#c5a059]/50 hover:scale-105 active:scale-95 group"
        >
          Enter Sanctuary
          <ChevronRight className="group-hover:translate-x-1 transition-transform" />
        </button>

        <p className="mt-16 text-[#c5a059]/60 text-xs italic font-serif max-w-lg mx-auto leading-relaxed">
          "For where two or three are gathered together in my name, there am I in the midst of them."
        </p>
      </div>
    </div>
  );
};

export default SplashPage;
