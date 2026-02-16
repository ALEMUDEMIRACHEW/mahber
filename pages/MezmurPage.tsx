
import React, { useState, useMemo } from 'react';
import { MOCK_MUZMUR_CALENDAR } from '../constants';
import { 
  Music, 
  ChevronRight, 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  ChevronLeft,
  Calendar, 
  Sparkles, 
  Music2, 
  Volume2
} from 'lucide-react';
import { Muzmur, MonthData } from '../types';

const AMHARIC_MONTHS = [
  'መስከረም', 'ጥቅምት', 'ሕዳር', 'ታኅሣሥ', 'ጥር', 'የካቲት', 'መጋቢት', 'ሚያዝያ', 'ግንቦት', 'ሰኔ', 'ሐምሌ', 'ነሐሴ', 'ጳጉሜን'
];

const GREGORIAN_MONTHS = [
  'September', 'October', 'November', 'December', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September'
];

const AMHARIC_YEAR = '፳፻፲፰';

interface MuzmurPageProps {
  isAuthorized: boolean;
}

const MuzmurPage: React.FC<MuzmurPageProps> = ({ isAuthorized }) => {
  const [currentMonthIdx, setCurrentMonthIdx] = useState(0);
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [activeMuzmur, setActiveMuzmur] = useState<Muzmur | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const selectedMonth = MOCK_MUZMUR_CALENDAR[currentMonthIdx];

  const prevIdx = (currentMonthIdx - 1 + 13) % 13;
  const nextIdx = (currentMonthIdx + 1) % 13;

  // Logic: Meskerem (0) to Tahsas (3) are 2025. Tir (4) onwards are 2026.
  const displayGregorianYear = currentMonthIdx <= 3 ? '2025' : '2026';

  const eventsForMonth = useMemo(() => {
    if (!selectedMonth) return [];
    return selectedMonth.tags || ["Regular Worship"];
  }, [selectedMonth]);

  const filteredMuzmurs = useMemo(() => {
    if (!selectedMonth || !selectedEvent) return [];
    return selectedMonth.muzmurs.filter(m => 
      selectedEvent === "Regular Worship" || 
      m.title.toLowerCase().includes(selectedEvent.toLowerCase().split(' ')[0]) ||
      m.originalTitle.includes(selectedEvent.substring(0, 2))
    );
  }, [selectedMonth, selectedEvent]);

  const handleMonthChange = (idx: number) => {
    setCurrentMonthIdx(idx);
    setSelectedEvent(null);
  };

  const togglePlay = (m: Muzmur) => {
    if (activeMuzmur?.id === m.id) {
      setIsPlaying(!isPlaying);
    } else {
      setActiveMuzmur(m);
      setIsPlaying(true);
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-32">
      {/* Header Section with Navigation Format */}
      <div className="flex flex-col items-center space-y-8 py-4">
        {/* The Requested Month Selector Bar */}
        <div className="flex items-center justify-center gap-4 sm:gap-10 py-6 px-4 bg-transparent w-full">
          <button 
            onClick={() => handleMonthChange(prevIdx)}
            className="flex items-center gap-2 text-[#0088cc] hover:text-[#005580] transition-colors group"
          >
            <ChevronLeft size={20} strokeWidth={3} />
            <span className="hidden sm:inline font-serif text-lg">{AMHARIC_MONTHS[prevIdx]}</span>
          </button>

          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#444444] tracking-wide">
              {AMHARIC_MONTHS[currentMonthIdx]} <span className="text-2xl sm:text-3xl ml-1">{AMHARIC_YEAR}</span>
            </h2>
            <div className="hidden sm:block w-px h-8 bg-slate-200" />
            <h3 className="text-xl sm:text-2xl font-serif text-slate-400">
              {GREGORIAN_MONTHS[currentMonthIdx]} {displayGregorianYear}
            </h3>
          </div>

          <button 
            onClick={() => handleMonthChange(nextIdx)}
            className="flex items-center gap-2 text-[#0088cc] hover:text-[#005580] transition-colors group"
          >
            <span className="hidden sm:inline font-serif text-lg">{AMHARIC_MONTHS[nextIdx]}</span>
            <ChevronRight size={20} strokeWidth={3} />
          </button>
        </div>

        <div className="w-full max-w-4xl text-center border-t border-[#d6c7a1]/30 pt-4">
           <p className="text-[#c5a059] font-serif italic text-lg">
            Explore liturgical songs and sacred feasts for the month of {selectedMonth.name}.
           </p>
        </div>
      </div>

      {/* VIEW 2: Major Events Selection (Appears once month is focused) */}
      {!selectedEvent && (
        <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {eventsForMonth.map((event) => (
              <button
                key={event}
                onClick={() => setSelectedEvent(event)}
                className="bg-white border border-[#d6c7a1] p-10 flex items-center justify-between group hover:border-[#7a0000] hover:shadow-xl transition-all text-left relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-[#c5a059]/10 group-hover:bg-[#7a0000] transition-colors" />
                <div className="space-y-2">
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Major Event / Feast</p>
                  <h5 className="text-2xl font-serif font-bold text-[#7a0000]">{event}</h5>
                </div>
                <div className="w-12 h-12 rounded-full border border-[#d6c7a1] flex items-center justify-center text-[#c5a059] group-hover:bg-[#7a0000] group-hover:text-white group-hover:border-[#7a0000] transition-all">
                  <ChevronRight size={20} />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 3: Muzmur List with Player */}
      {selectedEvent && (
        <div className="space-y-8 animate-in slide-in-from-right-4 duration-500 max-w-5xl mx-auto">
          <div className="flex items-center justify-between border-b border-[#d6c7a1] pb-4">
             <div className="flex items-center gap-4 text-slate-400">
              <Calendar size={16} />
              <span className="text-[10px] font-bold uppercase tracking-widest">{selectedMonth.name} Sanctuary</span>
              <div className="w-1 h-1 bg-slate-300 rounded-full" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#7a0000]">{selectedEvent}</span>
            </div>
            <button 
              onClick={() => setSelectedEvent(null)}
              className="text-[10px] font-bold text-[#c5a059] uppercase tracking-widest hover:text-[#7a0000] transition-colors"
            >
              Back to Events
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {filteredMuzmurs.length > 0 ? (
              filteredMuzmurs.map((m) => (
                <div 
                  key={m.id}
                  className={`bg-white border p-6 flex items-center justify-between transition-all group ${
                    activeMuzmur?.id === m.id ? 'border-[#7a0000] shadow-md ring-1 ring-[#7a0000]/10' : 'border-[#d6c7a1]'
                  }`}
                >
                  <div className="flex items-center gap-6">
                    <button 
                      onClick={() => togglePlay(m)}
                      className={`w-14 h-14 flex items-center justify-center transition-all ${
                        activeMuzmur?.id === m.id && isPlaying 
                          ? 'bg-[#7a0000] text-white' 
                          : 'bg-[#fcf9f1] border border-[#d6c7a1] text-[#7a0000] hover:bg-[#7a0000] hover:text-white'
                      }`}
                    >
                      {activeMuzmur?.id === m.id && isPlaying ? <Pause size={24} /> : <Play size={24} fill="currentColor" />}
                    </button>
                    <div>
                      <h6 className="text-xl font-serif font-bold text-[#7a0000] leading-tight group-hover:underline underline-offset-4 decoration-[#c5a059]/30">
                        {m.title}
                      </h6>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-[9px] font-bold text-[#c5a059] uppercase tracking-widest">{m.originalTitle}</span>
                        <div className="w-1 h-1 bg-slate-200 rounded-full" />
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{m.language} • {m.duration}</span>
                      </div>
                    </div>
                  </div>

                  <div className="hidden md:flex items-center gap-8">
                    <div className="text-right">
                       <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mb-1">Level</p>
                       <span className={`text-[9px] font-bold px-2 py-0.5 border ${
                         m.level === 'Beginner' ? 'text-emerald-600 border-emerald-100 bg-emerald-50' :
                         m.level === 'Intermediate' ? 'text-amber-600 border-amber-100 bg-amber-50' : 'text-rose-600 border-rose-100 bg-rose-50'
                       }`}>
                         {m.level}
                       </span>
                    </div>
                    <div className="w-px h-10 bg-[#d6c7a1]/30" />
                    <button className="p-2 text-[#c5a059] hover:text-[#7a0000] transition-colors">
                      <SkipForward size={18} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-20 text-center bg-white border border-dashed border-[#d6c7a1] rounded-sm">
                <Music size={48} className="text-[#d6c7a1] mx-auto mb-4" />
                <p className="text-slate-400 font-serif italic">No specific muzmurs recorded for this event in our digital hymnal yet.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Global Audio Player Bar (Static Mock) */}
      {activeMuzmur && (
        <div className="fixed bottom-0 left-0 right-0 z-[200] bg-white/95 backdrop-blur-md border-t-2 border-[#7a0000] shadow-[0_-10px_40px_-10px_rgba(0,0,0,0.1)] animate-in slide-in-from-bottom-full duration-500">
           <div className="max-w-7xl mx-auto p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4 w-full md:w-1/3">
                 <div className="w-12 h-12 bg-[#7a0000] flex items-center justify-center text-white shadow-lg">
                    <Music2 size={24} className={isPlaying ? 'animate-pulse' : ''} />
                 </div>
                 <div className="overflow-hidden">
                    <h5 className="font-serif font-bold text-[#7a0000] truncate">{activeMuzmur.title}</h5>
                    <p className="text-[9px] font-bold text-[#c5a059] uppercase tracking-widest truncate">{activeMuzmur.originalTitle}</p>
                 </div>
              </div>

              <div className="flex flex-col items-center gap-2 w-full md:w-1/3">
                 <div className="flex items-center gap-6">
                    <button className="text-slate-400 hover:text-[#7a0000] transition-colors"><SkipBack size={20} /></button>
                    <button 
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="w-12 h-12 rounded-full bg-[#7a0000] text-white flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all"
                    >
                      {isPlaying ? <Pause size={24} /> : <Play size={24} fill="currentColor" className="ml-1" />}
                    </button>
                    <button className="text-slate-400 hover:text-[#7a0000] transition-colors"><SkipForward size={20} /></button>
                 </div>
                 <div className="w-full flex items-center gap-3">
                    <span className="text-[8px] font-bold text-slate-400 font-mono">1:24</span>
                    <div className="flex-1 h-1 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                       <div className="h-full bg-[#7a0000]" style={{ width: isPlaying ? '45%' : '40%' }} />
                    </div>
                    <span className="text-[8px] font-bold text-slate-400 font-mono">{activeMuzmur.duration}</span>
                 </div>
              </div>

              <div className="hidden md:flex items-center justify-end gap-6 w-1/3">
                 <div className="flex items-center gap-3">
                    <Volume2 size={16} className="text-[#c5a059]" />
                    <div className="w-24 h-1 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                       <div className="h-full bg-[#c5a059]" style={{ width: '70%' }} />
                    </div>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default MuzmurPage;
