
import React, { useState, useMemo } from 'react';
import { MOCK_MEMBERS } from '../constants';
import { Member, AttendanceRecord } from '../types';
import { 
  Search, 
  Filter, 
  Users, 
  Activity, 
  TrendingUp, 
  X, 
  Phone, 
  Mail, 
  Send, 
  Calendar,
  User,
  MessageSquare,
  ClipboardList,
  Check,
  ChevronDown,
  Info,
  ExternalLink,
  ChevronRight,
  AlertCircle,
  Lock,
  Clock,
  MapPin,
  Shield,
  Heart
} from 'lucide-react';

const ETHIOPIAN_MONTHS = [
  'Meskerem', 'Tikmt', 'Hidar', 'Tahsas', 'Tir', 'Yekatit', 
  'Megabit', 'Miyazia', 'Ginbot', 'Sene', 'Hamle', 'Nehase', 'Pagumen'
];

interface MembersPageProps {
  isAuthorized: boolean;
}

const MembersPage: React.FC<MembersPageProps> = ({ isAuthorized }) => {
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [attendanceHistory, setAttendanceHistory] = useState<AttendanceRecord[]>([]);
  const [isRecordingAttendance, setIsRecordingAttendance] = useState(false);
  const [newRecordMonth, setNewRecordMonth] = useState(ETHIOPIAN_MONTHS[0]);
  const [newRecordYear, setNewRecordYear] = useState('2018');
  const [presentMembers, setPresentMembers] = useState<Set<string>>(new Set());

  const membersWithCalculatedAttendance = useMemo(() => {
    const totalGatherings = attendanceHistory.length;
    return MOCK_MEMBERS.map(member => {
      if (totalGatherings === 0) return { ...member, calculatedAttendance: null as number | null };
      const attendedCount = attendanceHistory.filter(record => record.presents.includes(member.id)).length;
      return { ...member, calculatedAttendance: Math.round((attendedCount / totalGatherings) * 100) };
    });
  }, [attendanceHistory]);

  const filteredMembers = membersWithCalculatedAttendance.filter(m => m.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleSaveAttendance = () => {
    if (attendanceHistory.some(r => r.month === newRecordMonth && r.year === newRecordYear)) {
      alert(`Attendance for ${newRecordMonth} ${newRecordYear} is already recorded.`);
      return;
    }
    const newRecord: AttendanceRecord = { month: newRecordMonth, year: newRecordYear, presents: Array.from(presentMembers) };
    setAttendanceHistory([...attendanceHistory, newRecord]);
    setIsRecordingAttendance(false);
    setPresentMembers(new Set());
  };

  const toggleMemberPresence = (id: string) => {
    const next = new Set(presentMembers);
    if (next.has(id)) next.delete(id); else next.add(id);
    setPresentMembers(next);
  };

  const currentMonthHasData = attendanceHistory.some(r => r.month === newRecordMonth && r.year === newRecordYear);

  return (
    <div className="space-y-8 animate-in fade-in duration-500 relative">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-[#7a0000] font-serif tracking-tight">Community Members</h2>
          <p className="text-[#c5a059] font-serif italic">In the Name of the Father, and of the Son, and of the Holy Spirit.</p>
        </div>
        <div className="flex gap-3">
          {isAuthorized ? (
            <button 
              onClick={() => setIsRecordingAttendance(true)}
              className="bg-[#7a0000] hover:bg-[#9a0000] text-white px-6 py-3 border border-[#c5a059]/40 font-serif flex items-center gap-2 transition-all shadow-md active:scale-95"
            >
              <ClipboardList size={18} />
              Record Attendance
            </button>
          ) : (
            <div className="flex items-center gap-2 px-6 py-3 bg-slate-50 border border-[#d6c7a1] text-slate-400">
              <Lock size={14} />
              <span className="text-[10px] font-bold uppercase tracking-widest">Read Only Access</span>
            </div>
          )}
        </div>
      </div>

      {attendanceHistory.length === 0 && (
        <div className="bg-[#fcf9f1] border border-[#d6c7a1] p-6 shadow-sm flex items-start gap-4 animate-in slide-in-from-top duration-700">
          <div className="w-10 h-10 rounded-full border border-[#c5a059]/30 flex items-center justify-center text-[#c5a059] shrink-0">
            <Info size={20} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#7a0000] font-serif uppercase tracking-widest mb-1">Attendance Records Required</h4>
            <p className="text-slate-600 font-serif italic text-base">
              {isAuthorized ? 'Please enter the monthly gathering attendance to begin statistics calculation.' : 'Attendance statistics will be visible once a steward records gathering data.'}
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Members', value: MOCK_MEMBERS.length.toString(), icon: Users, color: 'text-[#7a0000]', bg: 'bg-[#7a0000]/5' },
          { label: 'Gatherings Recorded', value: attendanceHistory.length.toString(), icon: Calendar, color: 'text-[#c5a059]', bg: 'bg-[#c5a059]/5' },
          { label: 'Last Meeting', value: attendanceHistory.length > 0 ? attendanceHistory[attendanceHistory.length-1].month : 'None', icon: Activity, color: 'text-[#1e3a1e]', bg: 'bg-[#1e3a1e]/5' },
          { label: 'Group Average', value: attendanceHistory.length > 0 ? `${Math.round(membersWithCalculatedAttendance.reduce((acc, m) => acc + (m.calculatedAttendance || 0), 0) / MOCK_MEMBERS.length)}%` : '--', icon: TrendingUp, color: 'text-[#7a0000]', bg: 'bg-[#7a0000]/5' },
        ].map((stat, i) => (
          <div key={i} className="bg-white/80 backdrop-blur-sm p-6 border border-[#d6c7a1] flex justify-between items-start shadow-sm transition-hover hover:shadow-md">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">{stat.label}</p>
              <p className={`text-3xl font-serif font-bold ${stat.color}`}>{stat.value}</p>
            </div>
            <div className={`p-2.5 border border-[#d6c7a1]/30 ${stat.bg} ${stat.color}`}>
              <stat.icon size={20} />
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white/40 backdrop-blur-sm p-2 border border-[#d6c7a1] flex flex-wrap gap-3 items-center shadow-sm">
        <div className="relative flex-1 min-w-[300px]">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#c5a059]" size={18} />
          <input 
            type="text" 
            placeholder="Search faithful by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-[#d6c7a1] py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-[#7a0000] transition-all font-serif italic"
          />
        </div>
        <div className="flex items-center gap-2 text-slate-400 px-2 border-l border-[#d6c7a1] ml-2">
          <Filter size={18} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pb-12">
        {filteredMembers.map((member) => (
          <div 
            key={member.id} 
            className={`bg-white border transition-all group relative overflow-hidden p-6 shadow-sm hover:shadow-xl cursor-pointer ${selectedMember?.id === member.id ? 'border-[#7a0000] ring-1 ring-[#7a0000]' : 'border-[#d6c7a1]'}`}
            onClick={() => setSelectedMember(member)}
          >
            <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-100 transition-opacity">
               <Info size={16} className="text-[#7a0000]" />
            </div>

            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-12 h-12 bg-[#fcf9f1] border border-[#d6c7a1] flex items-center justify-center text-[#7a0000] shadow-sm">
                    <User size={24} />
                  </div>
                  <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                    member.status === 'active' ? 'bg-[#1e3a1e]' : 
                    member.status === 'away' ? 'bg-[#c5a059]' : 'bg-slate-300'
                  }`} />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-[#7a0000] text-[16px] leading-tight">{member.name}</h4>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{member.role}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-bold items-center uppercase tracking-widest">
                  <span className="text-slate-400">Attendance</span>
                  <span className={`font-serif ${member.calculatedAttendance === null ? 'text-slate-300 italic normal-case' : 'text-[#7a0000]'}`}>
                    {member.calculatedAttendance === null ? 'Pending' : `${member.calculatedAttendance}%`}
                  </span>
                </div>
                <div className="w-full h-1 bg-[#fcf9f1] border border-[#d6c7a1]/20 overflow-hidden">
                  <div className="h-full bg-[#7a0000] transition-all duration-1000" style={{ width: `${member.calculatedAttendance || 0}%` }} />
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <span className="text-[#c5a059] text-[9px] font-bold uppercase tracking-widest flex items-center gap-1 group-hover:text-[#7a0000] transition-colors">
                View Details <ChevronRight size={12} />
              </span>
            </div>
          </div>
        ))}
      </div>

      {isRecordingAttendance && isAuthorized && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 md:p-12 overflow-y-auto">
          <div className="fixed inset-0 bg-[#1e140a]/80 backdrop-blur-md" onClick={() => setIsRecordingAttendance(false)} />
          <div className="relative bg-[#fcf9f1] w-full max-w-4xl border-2 border-[#c5a059] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col max-h-[85vh] my-auto">
            <div className="p-8 border-b border-[#d6c7a1] flex justify-between items-center bg-white/50 sticky top-0 z-10">
              <div className="flex items-center gap-3">
                <ClipboardList className="text-[#7a0000]" />
                <div>
                  <h3 className="text-2xl font-serif font-bold text-[#7a0000]">Record Monthly Attendance</h3>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Mark faithful present for the monthly gathering</p>
                </div>
              </div>
              <button onClick={() => setIsRecordingAttendance(false)} className="text-[#c5a059] hover:text-[#7a0000] p-2">
                <X size={28} />
              </button>
            </div>

            <div className="p-8 space-y-8 overflow-y-auto bg-white/30">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Ethiopian Month</label>
                  <div className="relative">
                    <select 
                      value={newRecordMonth}
                      onChange={(e) => setNewRecordMonth(e.target.value)}
                      className="w-full bg-white border border-[#d6c7a1] py-3 px-4 appearance-none outline-none focus:border-[#7a0000] font-serif shadow-sm"
                    >
                      {ETHIOPIAN_MONTHS.map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                    <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#c5a059] pointer-events-none" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Year (E.C.)</label>
                  <input 
                    type="text" 
                    value={newRecordYear}
                    onChange={(e) => setNewRecordYear(e.target.value)}
                    className="w-full bg-white border border-[#d6c7a1] py-3 px-4 outline-none focus:border-[#7a0000] font-serif shadow-sm"
                    placeholder="2018"
                  />
                </div>
              </div>

              {!currentMonthHasData ? (
                <div className="bg-[#7a0000]/5 border border-[#7a0000]/20 p-6 flex items-center gap-4">
                  <AlertCircle size={24} className="text-[#7a0000] shrink-0" />
                  <p className="text-sm font-serif italic text-[#7a0000]">
                    Please select the members present for the {newRecordMonth} {newRecordYear} gathering.
                  </p>
                </div>
              ) : (
                <div className="bg-amber-50 border border-amber-200 p-6 flex items-center gap-4 text-amber-700">
                  <Info size={24} />
                  <p className="text-sm font-serif italic">This month already has a record. New entry will overwrite existing.</p>
                </div>
              )}

              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-[#d6c7a1] pb-3">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Member Registry ({presentMembers.size} selected)</p>
                  <button 
                    onClick={() => {
                      if (presentMembers.size === MOCK_MEMBERS.length) setPresentMembers(new Set());
                      else setPresentMembers(new Set(MOCK_MEMBERS.map(m => m.id)));
                    }}
                    className="text-[10px] font-bold text-[#7a0000] uppercase tracking-[0.2em] hover:underline"
                  >
                    {presentMembers.size === MOCK_MEMBERS.length ? 'Deselect All' : 'Select All'}
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {MOCK_MEMBERS.map(member => (
                    <button 
                      key={member.id}
                      onClick={() => toggleMemberPresence(member.id)}
                      className={`flex items-center justify-between p-4 border transition-all text-left shadow-sm group ${
                        presentMembers.has(member.id) 
                          ? 'bg-[#7a0000] border-[#7a0000] text-white' 
                          : 'bg-white border-[#d6c7a1] text-slate-700 hover:border-[#7a0000]'
                      }`}
                    >
                      <div>
                        <span className="font-serif font-bold text-sm block">{member.name}</span>
                        <span className={`text-[8px] uppercase tracking-widest ${presentMembers.has(member.id) ? 'text-white/60' : 'text-slate-400'}`}>Member</span>
                      </div>
                      {presentMembers.has(member.id) ? <Check size={16} /> : <div className="w-5 h-5 border border-[#d6c7a1] bg-slate-50" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-8 border-t border-[#d6c7a1] bg-white flex justify-between items-center sticky bottom-0 z-10">
               <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-full border border-[#7a0000] flex items-center justify-center text-[#7a0000] font-serif font-bold">
                   {presentMembers.size}
                 </div>
                 <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em]">Faithful Present</span>
               </div>
               <div className="flex gap-4">
                 <button 
                   onClick={() => setIsRecordingAttendance(false)} 
                   className="px-6 py-3 text-slate-500 font-serif hover:text-[#7a0000] font-bold uppercase tracking-widest text-xs transition-colors"
                 >
                   Cancel
                 </button>
                 <button 
                  onClick={handleSaveAttendance}
                  className="bg-[#7a0000] hover:bg-[#9a0000] text-white font-serif px-10 py-4 shadow-xl border border-[#c5a059]/40 transition-all active:scale-[0.98] uppercase tracking-widest text-sm"
                >
                  Save Record
                </button>
               </div>
            </div>
          </div>
        </div>
      )}

      {/* Redesigned Member Detail Modal */}
      {selectedMember && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-[#1e140a]/85 backdrop-blur-md" onClick={() => setSelectedMember(null)} />
          <div className="relative bg-white w-full max-w-4xl border-[3px] border-[#d6c7a1] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col max-h-[92vh]">
            
            {/* Split Header Background */}
            <div className="relative h-48 bg-[#7a0000] overflow-hidden shrink-0">
               <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] opacity-20" />
               <div className="absolute top-4 right-4 text-white/20 p-4 border border-white/10 rounded-full">
                 <Shield size={48} />
               </div>
               
               <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                 <div className="w-28 h-28 bg-[#fcf9f1] border-4 border-white rounded-full flex items-center justify-center text-[#7a0000] shadow-2xl mb-4 relative">
                   <User size={60} />
                   <div className={`absolute bottom-1 right-1 w-6 h-6 rounded-full border-4 border-white ${selectedMember.status === 'active' ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                 </div>
                 <h3 className="text-4xl font-serif font-bold text-white tracking-tight">{selectedMember.name}</h3>
                 <p className="text-[10px] font-bold text-[#c5a059] uppercase tracking-[0.4em] mt-1">{selectedMember.role}</p>
               </div>
               
               <button onClick={() => setSelectedMember(null)} className="absolute top-6 right-6 p-2 text-white/50 hover:text-white transition-colors bg-black/10 rounded-full">
                 <X size={24} />
               </button>
            </div>

            <div className="flex-1 overflow-y-auto bg-[#fcf9f1] p-1 shadow-inner">
               <div className="grid grid-cols-1 md:grid-cols-12 gap-1 p-1">
                 
                 {/* Left Column: Spiritual Identity */}
                 <div className="md:col-span-5 space-y-1">
                    <div className="bg-white border border-[#d6c7a1] p-8 space-y-8 h-full">
                       <div className="flex items-center gap-3 border-b border-[#fcf9f1] pb-4">
                         <Activity size={18} className="text-[#7a0000]" />
                         <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em]">Sacred Identity</h4>
                       </div>
                       
                       <div className="space-y-6">
                         <div className="group">
                           <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 transition-colors group-hover:text-[#c5a059]">Christian Name</p>
                           <p className="font-serif text-[#7a0000] text-2xl font-bold leading-tight">{selectedMember.simeKiristina}</p>
                           <div className="w-8 h-0.5 bg-[#c5a059]/20 mt-1" />
                         </div>
                         
                         <div className="group">
                           <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 transition-colors group-hover:text-[#c5a059]">Confession Father</p>
                           <p className="font-serif text-[#7a0000] text-2xl font-bold leading-tight">{selectedMember.yenisihaAbat}</p>
                           <div className="w-8 h-0.5 bg-[#c5a059]/20 mt-1" />
                         </div>
                         
                         <div className="bg-[#7a0000]/5 p-6 border-l-4 border-[#7a0000]">
                            <p className="text-[9px] font-bold text-[#7a0000] uppercase tracking-widest mb-3">Presence Statistics</p>
                            <div className="flex items-center gap-4">
                               <div className="text-4xl font-serif font-bold text-[#7a0000]">{selectedMember.attendance}%</div>
                               <div className="flex-1 h-2 bg-white rounded-full overflow-hidden border border-[#7a0000]/10">
                                  <div className="h-full bg-[#7a0000]" style={{ width: `${selectedMember.attendance}%` }} />
                               </div>
                            </div>
                            <p className="text-[10px] text-slate-500 font-serif italic mt-3 leading-relaxed">Regular participation in our monthly gatherings builds communal strength.</p>
                         </div>
                       </div>
                    </div>
                 </div>

                 {/* Right Column: Contact & Activity */}
                 <div className="md:col-span-7 space-y-1">
                    <div className="bg-white border border-[#d6c7a1] p-8 space-y-10">
                       <div className="flex items-center gap-3 border-b border-[#fcf9f1] pb-4">
                         <Phone size={18} className="text-[#c5a059]" />
                         <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em]">Communication Paths</h4>
                       </div>
                       
                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          {[
                            { label: 'Primary Phone', value: selectedMember.phone, icon: Phone, color: 'text-emerald-600' },
                            { label: 'Telegram Access', value: selectedMember.telegram, icon: Send, color: 'text-sky-600' },
                            { label: 'Email Address', value: selectedMember.email, icon: Mail, color: 'text-rose-600' },
                            { label: 'Active Since', value: selectedMember.joinedDate, icon: Calendar, color: 'text-[#c5a059]' }
                          ].map((contact, idx) => (
                            <div key={idx} className="space-y-1.5 p-4 border border-[#fcf9f1] hover:bg-slate-50 transition-colors group">
                               <div className="flex items-center gap-2 mb-2">
                                 <contact.icon size={14} className={contact.color} />
                                 <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">{contact.label}</p>
                               </div>
                               <p className="text-sm font-serif font-bold text-slate-800 truncate">{contact.value}</p>
                            </div>
                          ))}
                       </div>

                       <div className="space-y-6 pt-4">
                          <div className="flex items-center gap-3 border-b border-[#fcf9f1] pb-4">
                            <Activity size={18} className="text-[#1e3a1e]" />
                            <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em]">Sanctuary Activity</h4>
                          </div>
                          
                          <div className="flex justify-between items-center py-4 px-6 bg-[#fcf9f1] border border-[#d6c7a1]/30">
                             <div>
                                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Involvement Level</p>
                                <div className="flex items-center gap-2">
                                  <Heart size={14} className="text-[#7a0000]" />
                                  <span className="text-xl font-serif font-bold text-slate-800 capitalize italic">{selectedMember.involvement}</span>
                                </div>
                             </div>
                             <div className="text-right">
                                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Last Seen At Portal</p>
                                <div className="flex items-center justify-end gap-2">
                                  <Clock size={14} className="text-slate-400" />
                                  <span className="text-sm font-bold text-slate-600 italic">{selectedMember.lastActive}</span>
                                </div>
                             </div>
                          </div>
                       </div>
                    </div>
                 </div>

               </div>
            </div>

            {/* Footer Actions */}
            <div className="p-8 bg-white border-t border-[#d6c7a1] flex flex-col sm:flex-row justify-between items-center gap-6 shrink-0">
               <div className="flex items-center gap-3 text-slate-400 italic text-xs font-serif">
                 <Info size={14} />
                 Member of the registry since {selectedMember.joinedDate}
               </div>
               <div className="flex gap-4 w-full sm:w-auto">
                 <button className="flex-1 sm:flex-none px-10 py-4 bg-white hover:bg-slate-50 text-[#7a0000] border-2 border-[#7a0000] text-[10px] font-bold uppercase tracking-[0.2em] transition-all active:scale-95">
                   Message Faithful
                 </button>
                 {isAuthorized && (
                   <button className="flex-1 sm:flex-none px-10 py-4 bg-[#7a0000] hover:bg-[#9a0000] text-white border-2 border-[#7a0000] text-[10px] font-bold uppercase tracking-[0.2em] transition-all shadow-xl active:scale-95">
                     Update Registry
                   </button>
                 )}
               </div>
            </div>
            
          </div>
        </div>
      )}
    </div>
  );
};

export default MembersPage;
