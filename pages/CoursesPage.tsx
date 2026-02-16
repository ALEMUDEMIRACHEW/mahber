
import React from 'react';
import { BookOpen, PlusCircle, Bookmark, Scroll, PenTool, Sparkles, Compass, Lock } from 'lucide-react';

interface CoursesPageProps {
  isAuthorized: boolean;
}

const CoursesPage: React.FC<CoursesPageProps> = ({ isAuthorized }) => {
  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#d6c7a1] pb-8">
        <div>
          <h2 className="text-4xl font-bold text-[#7a0000] font-serif tracking-tight">Study & Spiritual Growth</h2>
          <p className="text-[#c5a059] font-serif italic text-lg mt-1">Deepen your understanding of the sacred scriptures and traditions.</p>
        </div>
        {isAuthorized ? (
          <button className="bg-[#7a0000] hover:bg-[#9a0000] text-white font-serif px-8 py-4 border border-[#c5a059]/40 transition-all shadow-lg active:scale-95 flex items-center gap-3 uppercase tracking-widest text-xs">
             <PlusCircle size={18} />
             Initialize New Study
          </button>
        ) : (
          <div className="flex items-center gap-2 px-6 py-3 bg-slate-50 border border-[#d6c7a1] text-slate-400">
            <Lock size={14} />
            <span className="text-[10px] font-bold uppercase tracking-widest">Reader Access Only</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { label: 'Active Studies', value: '0', sub: 'Current Curriculum', icon: Scroll, color: 'text-[#7a0000]' },
          { label: 'Completed Paths', value: '0', sub: 'Spiritual Milestones', icon: Bookmark, color: 'text-[#c5a059]' },
          { label: 'Lifelong Scholars', value: '20', sub: 'Faithful Registered', icon: BookOpen, color: 'text-[#1e3a1e]' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-8 border border-[#d6c7a1] shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity">
              <stat.icon size={48} />
            </div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-8">{stat.label}</p>
            <div className="space-y-1">
              <p className={`text-5xl font-serif font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{stat.sub}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="relative py-12">
        <div className="max-w-4xl mx-auto bg-white border-2 border-[#d6c7a1] p-1 shadow-2xl rotate-1 group hover:rotate-0 transition-transform duration-700">
          <div className="bg-[#fcf9f1] border border-white/50 p-20 text-center relative overflow-hidden">
            <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-[#7a0000]/20" />
            <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-[#7a0000]/20" />
            
            <div className="relative z-10 space-y-10">
              <div className="w-24 h-24 bg-white border border-[#d6c7a1] flex items-center justify-center text-[#7a0000] mx-auto shadow-md transform -rotate-12 group-hover:rotate-0 transition-transform duration-1000">
                <Compass size={48} className="animate-pulse" />
              </div>
              
              <div className="space-y-4">
                <h3 className="text-3xl font-bold text-[#7a0000] font-serif">No Studies Initialized</h3>
                <p className="text-slate-500 font-serif italic text-xl leading-relaxed max-w-lg mx-auto">
                  "Thy word is a lamp unto my feet, and a light unto my path."
                </p>
                <div className="w-32 h-px bg-gradient-to-r from-transparent via-[#c5a059] to-transparent mx-auto mt-6" />
              </div>

              <div className="space-y-6">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] max-w-md mx-auto leading-loose">
                  Our digital library is awaiting the first liturgical study guide or biblical reflection.
                </p>
                {isAuthorized && (
                  <button className="bg-[#7a0000] hover:bg-[#9a0000] text-white font-serif px-12 py-5 border border-[#c5a059]/40 transition-all shadow-xl active:scale-95 flex items-center gap-4 mx-auto uppercase tracking-widest text-[11px]">
                    <PenTool size={18} />
                    Draft First Course Material
                  </button>
                )}
              </div>
            </div>

            <div className="absolute -bottom-20 -left-20 w-80 h-80 opacity-[0.03] pointer-events-none">
              <Scroll size={320} className="text-[#7a0000]" />
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16 max-w-4xl mx-auto">
          {[
            { title: 'Liturgical Chants', desc: 'Understanding the structure of Ge\'ez poetry and chants.' },
            { title: 'The Lives of Saints', desc: 'Reflections on the spiritual journeys of the Holy Fathers.' }
          ].map((sug, i) => (
            <div key={i} className="bg-white/50 backdrop-blur-sm border border-[#d6c7a1] p-8 flex items-start gap-4">
              <Sparkles className="text-[#c5a059] shrink-0" size={20} />
              <div>
                <h4 className="font-serif font-bold text-[#7a0000] text-lg">{sug.title}</h4>
                <p className="text-sm text-slate-500 font-serif italic mt-1">{sug.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;
