
import React from 'react';
import { Page } from '../types';
import { Calendar, MapPin, Clock, Users, ArrowRight } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: Page) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const stats = [
    { label: 'Congregation', value: '20', color: 'text-[#7a0000]', icon: Users },
    { label: 'Bible Studies', value: '5', color: 'text-[#1e3a1e]', icon: Calendar },
    { label: 'Muzmurs', value: '12', color: 'text-[#c5a059]', icon: Clock },
    { label: 'Days to Next Gathering', value: '5', subValue: 'Days', color: 'text-[#7a0000]', icon: Calendar },
  ];

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-700">
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <h2 className="text-4xl font-bold text-[#7a0000] font-serif tracking-tight">Welcome, Faithful Community</h2>
        <p className="text-slate-600 font-serif italic text-lg leading-relaxed border-t border-b border-[#d6c7a1]/40 py-4">
          In the Name of the Father, and of the Son, and of the Holy Spirit, One God. Amen.
        </p>
      </div>

      {/* Stats Cards - Refined Manuscript Style */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-8 border border-[#d6c7a1] shadow-sm relative group overflow-hidden transition-all hover:shadow-md">
            <div className="absolute top-0 right-0 w-8 h-8 bg-[#fcf9f1] border-b border-l border-[#d6c7a1] flex items-center justify-center">
              <stat.icon size={12} className="text-[#c5a059]" />
            </div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-8">{stat.label}</p>
            <div className="flex items-baseline gap-2">
              <span className={`text-5xl font-serif font-bold ${stat.color}`}>{stat.value}</span>
              {stat.subValue && <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.subValue}</span>}
            </div>
          </div>
        ))}
      </div>

      {/* Main Feature: Gathering Notice */}
      <div className="bg-white border-2 border-[#7a0000]/10 p-1 bg-[url('https://www.transparenttextures.com/patterns/old-mathematics.png')]">
        <div className="bg-[#fcf9f1] border border-[#d6c7a1] p-10 shadow-sm relative">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#7a0000] text-white px-6 py-1 font-serif text-sm tracking-widest uppercase">
            Upcoming Gathering
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-start gap-12">
            <div className="flex-1 space-y-6">
              <div>
                <h3 className="text-3xl font-bold text-[#7a0000] font-serif">Next Monthly Gathering</h3>
                <p className="text-slate-500 font-serif italic text-lg mt-2">Join us for fellowship, prayer and sacred worship</p>
              </div>

              <div className="grid sm:grid-cols-2 gap-8">
                <div className="flex gap-4">
                  <div className="w-10 h-10 border border-[#d6c7a1] flex items-center justify-center text-[#c5a059] shrink-0">
                    <Calendar size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Date & Schedule</p>
                    <p className="font-bold text-slate-800 font-serif">በየወሩ ከሃያ አራት በኋላ ያለው እሁድ</p>
                    <p className="text-xs text-slate-500 font-medium mt-1">First Sunday after the 24th</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-10 h-10 border border-[#d6c7a1] flex items-center justify-center text-[#c5a059] shrink-0">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Location</p>
                    <p className="font-bold text-slate-800 font-serif">ሳሪስ አቦ, አቡነ አረጋዊ ቅጥር ግቢ</p>
                    <p className="text-xs text-slate-500 font-medium mt-1">Abune Aregawi Monastery Compound</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full md:w-80 bg-white p-8 border border-[#d6c7a1] shadow-sm">
              <h4 className="text-[#7a0000] font-serif font-bold border-b border-[#d6c7a1] pb-3 mb-6 flex items-center gap-2">
                <Clock size={16} /> 
                Time Frame
              </h4>
              <div className="space-y-4">
                <div className="text-center py-2 bg-[#fcf9f1] border border-[#d6c7a1]/40">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Standard Duration</p>
                  <p className="text-[#7a0000] font-serif font-bold text-lg">4:00 - 7:00</p>
                  <p className="text-[10px] text-[#c5a059] font-bold uppercase">Morning to Evening</p>
                </div>
                {[
                  { label: 'Opening Prayer', time: '4:00' },
                  { label: 'Bible Study', time: '4:15' },
                  { label: 'Muzmur Practice', time: '5:15' },
                  { label: 'Fellowship', time: '6:00' },
                  { label: 'Closing Prayer', time: '6:45' },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center text-sm">
                    <span className="font-serif font-medium text-slate-600">{item.label}</span>
                    <span className="text-[#c5a059] font-bold text-[10px] uppercase tracking-tighter">{item.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Announcements & Hosts - Classic Columns */}
      <div className="grid md:grid-cols-2 gap-10">
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-[#d6c7a1] pb-3">
            <h3 className="text-xl font-bold font-serif text-[#7a0000]">Recent Announcements</h3>
            <button onClick={() => onNavigate(Page.Announcements)} className="text-[#c5a059] text-xs font-bold uppercase tracking-widest flex items-center gap-1 hover:text-[#7a0000] transition-colors">
              View All <ArrowRight size={14} />
            </button>
          </div>
          <div className="space-y-4">
            {[
              { title: 'New Bible Study Course', date: 'Sept 15', category: 'Study', color: 'bg-[#1e3a1e]' },
              { title: 'Monthly Gathering Update', date: 'Sept 12', category: 'Event', color: 'bg-[#7a0000]' },
              { title: 'Community Service', date: 'Sept 10', category: 'Service', color: 'bg-[#c5a059]' },
            ].map((news, i) => (
              <div key={i} className="bg-white p-6 border border-[#d6c7a1] flex justify-between items-center group cursor-pointer hover:border-[#c5a059] transition-all">
                <div className="flex gap-4 items-center">
                  <div className={`w-1 h-8 ${news.color} rounded-full`} />
                  <div>
                    <p className="font-serif font-bold text-slate-800">{news.title}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">{news.category} — {news.date}</p>
                  </div>
                </div>
                <ArrowRight size={14} className="text-[#d6c7a1] group-hover:text-[#c5a059] group-hover:translate-x-1 transition-all" />
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-[#d6c7a1] pb-3">
            <h3 className="text-xl font-bold font-serif text-[#7a0000]">Host for the Month</h3>
            <span className="text-[#1e3a1e] text-[10px] font-bold uppercase tracking-widest bg-[#1e3a1e]/5 px-2 py-0.5 border border-[#1e3a1e]/20">Yekatit</span>
          </div>
          <div className="bg-white p-10 border border-[#d6c7a1] relative">
            <div className="absolute top-2 right-2 opacity-10">
               <Utensils size={48} className="text-[#7a0000]" />
            </div>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-[#fcf9f1] border border-[#d6c7a1] flex items-center justify-center text-[#7a0000] text-2xl font-serif font-bold">
                  T&D
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Primary Hosts</p>
                  <p className="text-xl font-bold font-serif text-slate-800">Tamrat & Dagmawit</p>
                </div>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed italic font-serif">
                "We thank you for your service and dedication to the community."
              </p>
              <button 
                onClick={() => onNavigate(Page.FoodHosting)}
                className="w-full bg-[#7a0000]/5 hover:bg-[#7a0000] text-[#7a0000] hover:text-white border border-[#7a0000] py-3 text-xs font-bold uppercase tracking-[0.2em] transition-all"
              >
                Hosting Calendar
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

const Utensils = ({ size, className }: { size: number, className: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
    <path d="M7 2v20" />
    <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
  </svg>
);

export default HomePage;
