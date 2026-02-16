
import React from 'react';
import { Utensils, Calendar, Users, CheckCircle2, Clock, Info, ShieldCheck, AlertTriangle } from 'lucide-react';

const FoodHostingPage: React.FC = () => {
  const months = [
    { name: 'Meskerem (September)', status: 'Completed', date: 'Meskerem 27, 2018 E.C.', hosts: ['Feleku', 'Biruk'] },
    { name: 'Tikmt (October)', status: 'Completed', date: 'Tikmt 27, 2018 E.C.', hosts: ['Betelhem', 'Sible'] },
    { name: 'Hidar (November)', status: 'Completed', date: 'Hidar 25, 2018 E.C.', hosts: ['Aynealem', 'Mekdelawit'] },
    { name: 'Tahsas (December)', status: 'Completed', date: 'Tahsas 27, 2018 E.C.', hosts: ['Alemu', 'Dereje'] },
    { name: 'Tir (January)', status: 'Completed', date: 'Tir 28, 2018 E.C.', hosts: ['Estifanos', 'Mikias'] },
    { name: 'Yekatit (February)', status: 'Upcoming', date: 'Yekatit 26, 2018 E.C.', hosts: ['Tamrat', 'Dagmawit'], current: true },
    { name: 'Megabit (March)', status: 'Scheduled', date: 'Megabit 27, 2018 E.C.', hosts: ['Henok', 'Ayantu'] },
    { name: 'Miyazia (April)', status: 'Scheduled', date: 'Miyazia 28, 2018 E.C.', hosts: ['Mahlet', 'Eyob'] },
    { name: 'Ginbot (May)', status: 'Scheduled', date: 'Ginbot 28, 2018 E.C.', hosts: ['Selam', 'Tomasya'] },
    { name: 'Sene (June)', status: 'Scheduled', date: 'Sene 27, 2018 E.C.', hosts: ['Yohannes', 'Yordanos'] },
  ];

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <div className="border-b border-[#d6c7a1] pb-6">
        <h2 className="text-3xl font-bold text-[#7a0000] font-serif tracking-tight">Monthly Hosting Registry</h2>
        <p className="text-[#c5a059] font-serif italic text-lg mt-1">"For I was hungry and you gave me something to eat, I was thirsty and you gave me something to drink."</p>
      </div>

      {/* Guidelines Box - Manuscript Style */}
      <div className="bg-white border-2 border-[#d6c7a1] shadow-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 w-24 h-24 text-[#7a0000]/5 pointer-events-none p-4">
           <ShieldCheck size={64} />
        </div>
        
        <div className="p-10">
          <div className="flex items-center gap-3 mb-8 border-b border-[#d6c7a1]/30 pb-4">
            <Utensils size={24} className="text-[#7a0000]" />
            <div>
              <h3 className="font-bold text-[#7a0000] text-xl font-serif">Sanctuary Hospitality Guidelines</h3>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Etiquette and preparations for monthly gatherings</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <p className="text-[10px] font-bold text-[#c5a059] uppercase tracking-[0.2em] border-l-2 border-[#c5a059] pl-3">Offerings to Provide</p>
              <ul className="space-y-4">
                {['Ethiopian bread (Injera or Dabo)', 'Ethiopian Kolo (Roasted Grains)', 'Water for ritual washing and serving', 'Candles for the prayer circle', 'Tuaf (incense) for the sanctuary atmosphere'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-700 text-sm font-serif italic">
                    <span className="w-1.5 h-1.5 bg-[#7a0000] rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-[#fcf9f1] p-8 border border-[#d6c7a1] shadow-inner">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Host Stewardship</p>
              <ul className="space-y-4 text-xs text-slate-600 font-serif italic leading-relaxed">
                <li className="flex gap-3">
                  <span className="text-[#7a0000] font-bold">I.</span>
                  Fellowship nourishment time is strictly between 6:00 - 6:45 PM.
                </li>
                <li className="flex gap-3">
                  <span className="text-[#7a0000] font-bold">II.</span>
                  Hosts are requested to arrive by 3:30 PM to oversee setup.
                </li>
                <li className="flex gap-3">
                  <span className="text-[#7a0000] font-bold">III.</span>
                  Coordination between primary and co-hosts is vital for unity.
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Important Policy Section */}
        <div className="bg-[#7a0000]/5 border-t border-[#d6c7a1] p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Info className="text-[#c5a059]" size={20} />
            <p className="text-xs text-slate-600 font-serif italic">
              <strong>Notice:</strong> If you are unable to host during your assigned month, please notify the Administration team at least <strong>1 week (7 days)</strong> in advance.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <h3 className="text-xl font-bold text-[#7a0000] font-serif whitespace-nowrap">Annual Hosting Calendar</h3>
          <div className="h-px w-full bg-[#d6c7a1]" />
        </div>

        {/* Prominent Reminder Banner */}
        <div className="bg-[#fcf9f1] border-l-4 border-[#7a0000] p-6 shadow-sm flex items-center gap-4 animate-in slide-in-from-left duration-700">
          <div className="w-10 h-10 rounded-full bg-[#7a0000]/10 flex items-center justify-center text-[#7a0000] shrink-0">
            <AlertTriangle size={20} />
          </div>
          <div>
            <h4 className="text-[10px] font-bold text-[#7a0000] uppercase tracking-[0.2em] mb-1">Host Presence Obligation</h4>
            <p className="text-slate-700 font-serif italic text-sm">
              Stewards must announce any inability to host at least <strong>one week in advance</strong> to allow the community to adjust preparations.
            </p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {months.map((month, i) => (
          <div 
            key={i} 
            className={`bg-white border transition-all hover:shadow-lg p-8 relative overflow-hidden ${
              month.current ? 'border-[#7a0000] ring-1 ring-[#7a0000]' : 'border-[#d6c7a1]'
            }`}
          >
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 border flex items-center justify-center ${
                   month.status === 'Completed' ? 'bg-[#1e3a1e]/5 text-[#1e3a1e] border-[#1e3a1e]/30' : 
                   month.current ? 'bg-[#7a0000]/5 text-[#7a0000] border-[#7a0000]/30' : 'bg-slate-50 text-slate-400 border-slate-200'
                }`}>
                  {month.status === 'Completed' ? <CheckCircle2 size={18} /> : <Clock size={18} />}
                </div>
                <div>
                  <h4 className="font-serif font-bold text-[#7a0000] text-xl leading-tight">{month.name}</h4>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{month.date}</p>
                </div>
              </div>
              <span className={`text-[8px] font-bold px-3 py-1 uppercase tracking-widest border ${
                month.status === 'Completed' ? 'border-[#1e3a1e]/30 text-[#1e3a1e]' : 
                month.current ? 'border-[#7a0000]/30 text-[#7a0000] animate-pulse' : 'border-slate-200 text-slate-400'
              }`}>
                {month.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 border-t border-[#fcf9f1] pt-6 mt-6">
              <div className="space-y-1">
                 <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Schedule</p>
                 <p className="text-[11px] font-serif font-bold text-slate-700">First Sunday after the 24th</p>
              </div>
              <div className="space-y-2">
                <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Hosting Stewards</p>
                <div className="flex flex-wrap gap-2">
                  {month.hosts.map((host, j) => (
                    <span key={j} className="bg-[#7a0000]/5 border border-[#7a0000]/10 text-[10px] font-bold px-3 py-1 text-[#7a0000]">
                      {host}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Stats Summary - Matching Home Page */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-12 pb-20">
        {[
          { label: 'Completed', value: '5', sub: 'Months Witnessed', color: 'text-[#1e3a1e]' },
          { label: 'Current Host', value: 'Yekatit', sub: 'Tamrat & Dagmawit', color: 'text-[#7a0000]' },
          { label: 'Upcoming', value: '4', sub: 'Sacred Gatherings', color: 'text-[#c5a059]' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-8 border border-[#d6c7a1] shadow-sm flex flex-col justify-between h-40">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">{stat.label}</p>
            <div>
              <p className={`text-4xl font-serif font-bold mb-1 ${stat.color}`}>{stat.value}</p>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.1em]">{stat.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodHostingPage;
