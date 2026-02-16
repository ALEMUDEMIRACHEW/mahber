
import React, { useState } from 'react';
import { MOCK_TEAMS } from '../constants';
import { Team } from '../types';
import { GraduationCap, Music, Heart, Users, Plane, ClipboardList, Info, X, ShieldCheck, UserCheck, ChevronRight, UserPlus, Star } from 'lucide-react';

const TeamsPage: React.FC = () => {
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);

  const getIcon = (iconName: string, size: number = 24) => {
    switch(iconName) {
      case 'GraduationCap': return <GraduationCap size={size} />;
      case 'Music': return <Music size={size} />;
      case 'Heart': return <Heart size={size} />;
      case 'UserCheck': return <UserCheck size={size} />;
      case 'Plane': return <Plane size={size} />;
      default: return <Users size={size} />;
    }
  };

  const workingGroups = [
    ...MOCK_TEAMS,
    { id: 'admin', name: 'Member Administration', description: 'Monitoring attendance, involvement levels, and member engagement in all activities.', memberCount: 4, icon: 'UserCheck', lead: 'Estifanos Tefera', members: ['Estifanos Tefera', 'Mikias Wolde', 'Betelhem Alemayehu', 'Sible Tadesse'], responsibilities: ['Track member attendance', 'Monitor involvement levels', 'Update member information', 'Generate activity reports'] },
    { id: 'events', name: 'Events & Logistics', description: 'Planning and coordinating pilgrimages, retreats, and spiritual journeys for the group.', memberCount: 4, icon: 'Plane', lead: 'Alemu Worku', members: ['Alemu Worku', 'Dereje Tadesse', 'Henok Abebe', 'Ayantu Bekele'], responsibilities: ['Plan spiritual trips and retreats', 'Coordinate travel logistics', 'Organize pilgrimage schedules', 'Manage trip budgets'] }
  ];

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#d6c7a1] pb-8">
        <div>
          <h2 className="text-4xl font-bold text-[#7a0000] font-serif tracking-tight">Community Working Groups</h2>
          <p className="text-[#c5a059] font-serif italic text-lg mt-1">Dedicated teams serving the community in sacred stewardship.</p>
        </div>
        <div className="flex gap-4">
          <button className="bg-white hover:bg-slate-50 text-[#7a0000] font-serif px-8 py-4 border border-[#d6c7a1] transition-all shadow-sm active:scale-95 flex items-center gap-3 uppercase tracking-widest text-xs">
            <ClipboardList size={18} />
            View Duties
          </button>
        </div>
      </div>

      {/* Grid of Teams - Seal Style */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {workingGroups.map((team) => (
          <div 
            key={team.id}
            onClick={() => setSelectedTeam(team)}
            className="bg-white border-2 border-[#d6c7a1] p-10 shadow-sm flex flex-col items-center text-center space-y-8 cursor-pointer hover:shadow-2xl hover:border-[#7a0000] transition-all group relative overflow-hidden"
          >
            {/* Background Seal Mask */}
            <div className="absolute inset-0 bg-[#7a0000]/5 scale-0 group-hover:scale-100 transition-transform duration-700 pointer-events-none rounded-full" />
            
            <div className="relative">
              <div className="w-24 h-24 rounded-full border-4 border-[#fcf9f1] bg-white flex items-center justify-center text-[#7a0000] shadow-xl group-hover:bg-[#7a0000] group-hover:text-white transition-all duration-500 relative z-10">
                {getIcon(team.icon, 40)}
              </div>
              <div className="absolute -bottom-2 -right-2 bg-[#c5a059] text-white p-2 rounded-full border-2 border-white shadow-lg">
                <Star size={12} fill="currentColor" />
              </div>
            </div>

            <div className="space-y-3 relative z-10">
              <h3 className="text-2xl font-serif font-bold text-[#7a0000] leading-tight">{team.name}</h3>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">{team.memberCount} Faithful Stewards</p>
              <div className="w-16 h-px bg-[#d6c7a1] mx-auto mt-4" />
            </div>

            <div className="pt-2 relative z-10">
              <p className="text-sm font-serif italic text-slate-500 line-clamp-2 px-4 leading-relaxed">
                {team.description}
              </p>
            </div>

            <button className="text-[#c5a059] text-[9px] font-bold uppercase tracking-[0.3em] flex items-center gap-2 group-hover:text-[#7a0000] transition-all mt-auto pt-6">
              Details <ChevronRight size={14} />
            </button>
          </div>
        ))}
      </div>

      {/* Stewardship Guidelines */}
      <div className="bg-[#fcf9f1] border-2 border-[#d6c7a1] p-16 shadow-inner relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
          <ShieldCheck size={160} className="text-[#7a0000]" />
        </div>
        
        <div className="relative z-10 grid md:grid-cols-2 gap-16">
          <div className="space-y-8">
            <h4 className="text-3xl font-serif font-bold text-[#7a0000] border-b border-[#d6c7a1] pb-4">Unity in Service</h4>
            <p className="text-lg font-serif italic text-slate-600 leading-relaxed">
              Every member of our community contributes their unique gifts to the glory of God. Our teams represent the varied ways we serve one another.
            </p>
            <div className="flex gap-4">
               <button className="bg-[#7a0000] hover:bg-[#9a0000] text-white font-serif px-10 py-4 shadow-xl border border-[#c5a059]/40 transition-all active:scale-[0.98] uppercase tracking-widest text-[10px]">
                  Request Team Transfer
               </button>
            </div>
          </div>
          
          <div className="space-y-6">
            <p className="text-[10px] font-bold text-[#c5a059] uppercase tracking-[0.4em] mb-4">Core Commitments</p>
            <div className="space-y-6">
              {[
                { title: 'Diligence', desc: 'Perform all duties with a humble and focused heart.' },
                { title: 'Unity', desc: 'Collaborate with other teams in a spirit of brotherhood.' },
                { title: 'Excellence', desc: 'Offer the best of our abilities in every sacred task.' }
              ].map((com, i) => (
                <div key={i} className="flex gap-6 items-start group">
                  <div className="w-10 h-10 shrink-0 border border-[#d6c7a1] flex items-center justify-center text-[#7a0000] font-serif font-bold text-lg bg-white group-hover:bg-[#7a0000] group-hover:text-white transition-all">
                    {i + 1}
                  </div>
                  <div>
                    <h5 className="font-bold text-[#7a0000] font-serif text-xl">{com.title}</h5>
                    <p className="text-sm text-slate-500 font-serif italic mt-1">{com.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Team Detail Modal - Restored High Z-Index */}
      {selectedTeam && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-[#1e140a]/85 backdrop-blur-md" onClick={() => setSelectedTeam(null)} />
          <div className="relative bg-[#fcf9f1] w-full max-w-2xl border-2 border-[#c5a059] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]">
            <div className="p-10 border-b border-[#d6c7a1] bg-white sticky top-0 z-10 flex justify-between items-start">
              <div className="flex items-center gap-6">
                <div className={`w-20 h-20 bg-[#fcf9f1] border-2 border-[#d6c7a1] flex items-center justify-center text-[#7a0000] shadow-md`}>
                  {getIcon(selectedTeam.icon, 40)}
                </div>
                <div>
                  <h3 className="text-3xl font-serif font-bold text-[#7a0000] tracking-tight">{selectedTeam.name}</h3>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Steward Lead: {selectedTeam.lead}</p>
                </div>
              </div>
              <button onClick={() => setSelectedTeam(null)} className="p-2 text-[#c5a059] hover:text-[#7a0000] transition-colors">
                <X size={28} />
              </button>
            </div>

            <div className="p-10 space-y-12 overflow-y-auto bg-white/40">
              <section className="space-y-4">
                 <p className="text-[10px] font-bold text-[#c5a059] uppercase tracking-widest border-b border-[#c5a059]/10 pb-1">Group Mission</p>
                 <p className="font-serif italic text-lg text-slate-600 leading-relaxed text-center py-6 bg-white/50 border border-[#d6c7a1]/20 shadow-inner px-8">
                   "{selectedTeam.description}"
                 </p>
              </section>

              <div className="grid md:grid-cols-2 gap-12">
                <section className="space-y-6">
                  <div className="flex items-center gap-3 text-slate-800 font-bold border-b border-[#d6c7a1]/40 pb-3">
                    <Users size={18} className="text-[#c5a059]" />
                    <span className="text-[11px] uppercase tracking-[0.2em]">Active Stewards</span>
                  </div>
                  <div className="space-y-4">
                    {selectedTeam.members.map((name, i) => (
                      <div key={i} className="flex items-center gap-4 group">
                        <div className="w-10 h-10 border border-[#d6c7a1] text-[#7a0000] flex items-center justify-center text-[11px] font-bold font-serif bg-white shadow-sm transition-all group-hover:bg-[#7a0000] group-hover:text-white">
                          {name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-800 font-serif leading-tight">{name}</p>
                          <p className="text-[8px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">
                            {i === 0 ? 'Group Lead' : 'Faithful Steward'}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="space-y-6">
                  <div className="flex items-center gap-3 text-slate-800 font-bold border-b border-[#d6c7a1]/40 pb-3">
                    <ClipboardList size={18} className="text-[#c5a059]" />
                    <span className="text-[11px] uppercase tracking-[0.2em]">Team Stewardship</span>
                  </div>
                  <ul className="space-y-5">
                    {selectedTeam.responsibilities.map((task, i) => (
                      <li key={i} className="flex items-start gap-4 text-sm text-slate-600 font-serif italic leading-relaxed">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#7a0000] mt-1.5 shrink-0" />
                        {task}
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
            </div>

            <div className="p-10 border-t border-[#d6c7a1] bg-[#fcf9f1] flex justify-between items-center sticky bottom-0 z-10">
               <div className="flex items-center gap-2 text-slate-400 font-bold text-[10px] uppercase tracking-widest">
                 <ShieldCheck size={14} className="text-[#c5a059]" />
                 Member of {selectedTeam.name}
               </div>
               <button className="bg-[#7a0000] hover:bg-[#9a0000] text-white font-serif px-12 py-4 border border-[#c5a059]/40 transition-all shadow-xl active:scale-[0.98] uppercase tracking-widest text-[11px] flex items-center gap-3">
                  <UserPlus size={16} />
                  Join Group
               </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamsPage;
