import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient'; // Ensure you have your client initialized here
import { Page } from '../types';
import { Calendar, MapPin, Clock, Users, ArrowRight, Utensils } from 'lucide-react';

const HomePage: React.FC<{ onNavigate: (page: Page) => void }> = ({ onNavigate }) => {
  const [stats, setStats] = useState<any[]>([]);
  const [gathering, setGathering] = useState<any>(null);
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [host, setHost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch everything in parallel
      const [s, g, a, h] = await Promise.all([
        supabase.from('site_stats').select('*').order('display_order'),
        supabase.from('gatherings').select('*').eq('is_next_gathering', true).single(),
        supabase.from('announcements').select('*').eq('is_active', true).limit(3),
        supabase.from('monthly_hosts').select('*').eq('is_current_month', true).single()
      ]);

      if (s.data) setStats(s.data);
      if (g.data) setGathering(g.data);
      if (a.data) setAnnouncements(a.data);
      if (h.data) setHost(h.data);
      setLoading(false);
    };

    fetchData();
  }, []);

  // Icon mapping helper
  const getIcon = (name: string) => {
    switch (name) {
      case 'Users': return Users;
      case 'Clock': return Clock;
      default: return Calendar;
    }
  };

  if (loading) return <div className="p-20 text-center font-serif text-[#7a0000]">Loading Sacred Content...</div>;

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-700">
      {/* Welcome Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <h2 className="text-4xl font-bold text-[#7a0000] font-serif tracking-tight">Welcome, Faithful Community</h2>
        <p className="text-slate-600 font-serif italic text-lg leading-relaxed border-t border-b border-[#d6c7a1]/40 py-4">
          In the Name of the Father, and of the Son, and of the Holy Spirit, One God. Amen.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => {
          const Icon = getIcon(stat.icon_name);
          return (
            <div key={i} className="bg-white p-8 border border-[#d6c7a1] shadow-sm relative group overflow-hidden transition-all hover:shadow-md">
              <div className="absolute top-0 right-0 w-8 h-8 bg-[#fcf9f1] border-b border-l border-[#d6c7a1] flex items-center justify-center">
                <Icon size={12} className="text-[#c5a059]" />
              </div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-8">{stat.label}</p>
              <div className="flex items-baseline gap-2">
                <span className={`text-5xl font-serif font-bold text-[#7a0000]`}>{stat.value}</span>
                {stat.sub_value && <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.sub_value}</span>}
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Gathering Notice */}
      {gathering && (
        <div className="bg-white border-2 border-[#7a0000]/10 p-1 bg-[url('https://www.transparenttextures.com/patterns/old-mathematics.png')]">
          <div className="bg-[#fcf9f1] border border-[#d6c7a1] p-10 shadow-sm relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#7a0000] text-white px-6 py-1 font-serif text-sm tracking-widest uppercase">
              Upcoming Gathering
            </div>
            <div className="flex flex-col md:flex-row justify-between items-start gap-12">
              <div className="flex-1 space-y-6">
                <div>
                  <h3 className="text-3xl font-bold text-[#7a0000] font-serif">{gathering.title}</h3>
                  <p className="text-slate-500 font-serif italic text-lg mt-2">{gathering.description}</p>
                </div>
                <div className="grid sm:grid-cols-2 gap-8">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 border border-[#d6c7a1] flex items-center justify-center text-[#c5a059] shrink-0"><Calendar size={18} /></div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Date & Schedule</p>
                      <p className="font-bold text-slate-800 font-serif">{gathering.date_description_amharic}</p>
                      <p className="text-xs text-slate-500 font-medium mt-1">{gathering.date_description_english}</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 border border-[#d6c7a1] flex items-center justify-center text-[#c5a059] shrink-0"><MapPin size={18} /></div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Location</p>
                      <p className="font-bold text-slate-800 font-serif">{gathering.location_amharic}</p>
                      <p className="text-xs text-slate-500 font-medium mt-1">{gathering.location_english}</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Time Frame Column (Static in this example, or can be DB driven) */}
              <div className="w-full md:w-80 bg-white p-8 border border-[#d6c7a1] shadow-sm">
                <h4 className="text-[#7a0000] font-serif font-bold border-b border-[#d6c7a1] pb-3 mb-6 flex items-center gap-2"><Clock size={16} /> Time Frame</h4>
                <div className="space-y-4">
                   <p className="text-xs text-center text-slate-400 font-bold uppercase tracking-widest">4:00 - 7:00</p>
                   {/* Map schedule items here if needed */}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Announcements & Hosts */}
      <div className="grid md:grid-cols-2 gap-10">
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-[#d6c7a1] pb-3">
            <h3 className="text-xl font-bold font-serif text-[#7a0000]">Recent Announcements</h3>
            <button onClick={() => onNavigate(Page.Announcements)} className="text-[#c5a059] text-xs font-bold uppercase tracking-widest flex items-center gap-1">
              View All <ArrowRight size={14} />
            </button>
          </div>
          <div className="space-y-4">
            {announcements.map((news, i) => (
              <div key={i} className="bg-white p-6 border border-[#d6c7a1] flex justify-between items-center group cursor-pointer hover:border-[#c5a059] transition-all">
                <div className="flex gap-4 items-center">
                  <div className="w-1 h-8 bg-[#7a0000] rounded-full" />
                  <div>
                    <p className="font-serif font-bold text-slate-800">{news.title}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">{news.category} — {new Date(news.publish_date).toLocaleDateString()}</p>
                  </div>
                </div>
                <ArrowRight size={14} className="text-[#d6c7a1] group-hover:text-[#c5a059] transition-all" />
              </div>
            ))}
          </div>
        </section>

        {host && (
          <section className="space-y-6">
            <div className="flex items-center justify-between border-b border-[#d6c7a1] pb-3">
              <h3 className="text-xl font-bold font-serif text-[#7a0000]">Host for the Month</h3>
              <span className="text-[#1e3a1e] text-[10px] font-bold uppercase tracking-widest bg-[#1e3a1e]/5 px-2 py-0.5 border border-[#1e3a1e]/20">{host.month_name}</span>
            </div>
            <div className="bg-white p-10 border border-[#d6c7a1] relative">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-[#fcf9f1] border border-[#d6c7a1] flex items-center justify-center text-[#7a0000] text-2xl font-serif font-bold">{host.initials}</div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Primary Hosts</p>
                    <p className="text-xl font-bold font-serif text-slate-800">{host.host_names}</p>
                  </div>
                </div>
                <button onClick={() => onNavigate(Page.FoodHosting)} className="w-full bg-[#7a0000]/5 hover:bg-[#7a0000] text-[#7a0000] hover:text-white border border-[#7a0000] py-3 text-xs font-bold uppercase tracking-[0.2em] transition-all">
                  Hosting Calendar
                </button>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default HomePage;
