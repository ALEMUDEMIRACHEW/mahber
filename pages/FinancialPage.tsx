
import React, { useState, useMemo, useRef } from 'react';
import { PaymentRecord, Page } from '../types';
import { MOCK_MEMBERS } from '../constants';
import { 
  Check, 
  X,
  Search,
  Smartphone,
  ExternalLink,
  ShieldAlert,
  Loader2,
  CheckCircle,
  FileSpreadsheet,
  Download,
  FileUp,
  UserCheck,
  TrendingUp,
  AlertCircle,
  History,
  Sparkles
} from 'lucide-react';

const ETHIOPIAN_MONTHS = [
  'MESKEREM', 'TIKMT', 'HIDAR', 'TAHSAS', 'TIR', 'YEKATIT', 
  'MEGABIT', 'MIYAZIA', 'GINBOT', 'SENE', 'HAMLE', 'NEHASE'
];

interface FinancialPageProps {
  isAuthorized: boolean;
  onNavigate: (page: Page) => void;
  currentUser: string | null;
}

// Registry maps member ID to an array of months they have paid for
type MemberPaymentRegistry = Record<string, string[]>;

const FinancialPage: React.FC<FinancialPageProps> = ({ isAuthorized, onNavigate, currentUser }) => {
  const [payments, setPayments] = useState<PaymentRecord[]>([]);
  const [registry, setRegistry] = useState<MemberPaymentRegistry>({});
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [paymentStep, setPaymentStep] = useState<'idle' | 'redirecting' | 'verifying' | 'success'>('idle');
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [activeTxRef, setActiveTxRef] = useState<string | null>(null);
  const [stewardSearch, setStewardSearch] = useState('');
  const [historySearch, setHistorySearch] = useState('');

  const currentYear = '2018';
  const currentMonth = 'YEKATIT'; 
  const monthlyFee = 100;

  const isMahlet = currentUser?.toLowerCase() === 'mahlet';
  const paidMonths = useMemo(() => new Set(payments.map(p => p.month)), [payments]);

  const memberFinancialData = useMemo(() => {
    return MOCK_MEMBERS.map(member => {
      const memberPaidMonths = registry[member.id] || [];
      const hasPaidCurrent = memberPaidMonths.includes(currentMonth);
      const currentMonthIndex = ETHIOPIAN_MONTHS.indexOf(currentMonth);
      const totalMonthsSoFar = currentMonthIndex + 1;
      const unpaidMonthCount = Math.max(0, totalMonthsSoFar - memberPaidMonths.length);
      const balanceOwed = unpaidMonthCount * monthlyFee;
      
      return {
        ...member,
        currentStatus: hasPaidCurrent ? 'Paid' : 'Unpaid',
        paymentDate: hasPaidCurrent ? 'System Record' : '-',
        balanceOwed: balanceOwed,
        totalPaidMonths: memberPaidMonths.length
      };
    });
  }, [registry, currentMonth]);

  const contributionStats = useMemo(() => {
    const paidCount = memberFinancialData.filter(m => m.currentStatus === 'Paid').length;
    const totalReceived = paidCount * monthlyFee;
    const totalOutstanding = memberFinancialData.reduce((acc, m) => acc + m.balanceOwed, 0);
    const unpaidCount = memberFinancialData.length - paidCount;
    return { paidCount, unpaidCount, totalReceived, totalOutstanding };
  }, [memberFinancialData]);

  const filteredMembers = useMemo(() => {
    return memberFinancialData.filter(m => 
      m.name.toLowerCase().includes(stewardSearch.toLowerCase())
    );
  }, [memberFinancialData, stewardSearch]);

  const filteredHistory = useMemo(() => {
    if (!historySearch.trim()) return [];
    return ETHIOPIAN_MONTHS.filter(m => 
      m !== currentMonth && m.toLowerCase().includes(historySearch.toLowerCase())
    );
  }, [historySearch, currentMonth]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    setTimeout(() => {
      const newRegistry: MemberPaymentRegistry = {};
      MOCK_MEMBERS.forEach(m => {
        const monthsPaid = Math.floor(Math.random() * 6);
        newRegistry[m.id] = ETHIOPIAN_MONTHS.slice(0, monthsPaid);
      });
      setRegistry(newRegistry);
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }, 1500);
  };

  const downloadMemberContributionReport = () => {
    const filename = `Contribution_Audit_Report_${currentMonth}_${currentYear}.csv`;
    const headers = ['Member Name', 'Monthly Fee (ETB)', 'Current Status', 'Last Payment Date', 'Total Balance Owed'];
    const rows = memberFinancialData.map(m => [m.name, monthlyFee, m.currentStatus, m.paymentDate, m.balanceOwed]);
    rows.push(['']);
    rows.push(['FINANCIAL AUDIT SUMMARY']);
    rows.push(['Total Contributions Received', contributionStats.totalReceived]);
    const csvContent = "data:text/csv;charset=utf-8," + headers.join(",") + "\n" + rows.map(e => e.join(",")).join("\n");
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", filename);
    link.click();
  };

  const handlePaymentInitiation = (month: string) => {
    setSelectedMonth(month);
    setPaymentStep('redirecting');
    const ref = `${currentYear}_${month}_${currentUser?.toUpperCase() || 'GUEST'}_${Math.floor(Math.random() * 10000)}`;
    setActiveTxRef(ref);

    setTimeout(() => {
      setPaymentStep('verifying');
      setTimeout(() => {
        const newPayment: PaymentRecord = {
          id: Math.random().toString(36).substr(2, 9),
          month,
          year: currentYear,
          amount: 100,
          date: new Date().toLocaleDateString(),
          status: 'paid',
          reference: ref
        };
        setPayments(prev => [...prev, newPayment]);
        const currentMemberId = MOCK_MEMBERS.find(m => m.name.toLowerCase() === currentUser?.toLowerCase())?.id;
        if (currentMemberId) {
          setRegistry(prev => ({
            ...prev,
            [currentMemberId]: Array.from(new Set([...(prev[currentMemberId] || []), month]))
          }));
        }
        setPaymentStep('success');
        setTimeout(() => {
          setSelectedMonth(null);
          setPaymentStep('idle');
        }, 3000);
      }, 2500);
    }, 2000);
  };

  const renderMonthCard = (month: string, size: 'large' | 'small' = 'small') => {
    const isPaid = paidMonths.has(month);
    const isCurrent = month === currentMonth;

    return (
      <div 
        key={month}
        className={`relative flex flex-col items-center justify-between border transition-all duration-300 rounded-sm ${
          size === 'large' ? 'p-12 scale-100 shadow-2xl bg-white border-[#7a0000]/20' : 'p-6 bg-white border-slate-100 shadow-sm'
        } ${isPaid ? 'bg-[#efeee7]' : isCurrent ? 'ring-2 ring-[#7a0000]/10' : ''}`}
      >
        <div className="absolute top-2 right-2 opacity-5 pointer-events-none">
          <Sparkles size={size === 'large' ? 64 : 32} className="text-[#c5a059]" />
        </div>

        <h4 className={`text-[10px] font-bold tracking-[0.3em] mb-4 uppercase ${isPaid ? 'text-slate-500' : 'text-[#c5a059]'}`}>
          {month} {size === 'large' && 'Offering'}
        </h4>
        
        <div className="flex items-baseline gap-1 mb-8">
          <span className={`${size === 'large' ? 'text-6xl' : 'text-3xl'} font-bold font-serif ${isPaid ? 'text-slate-700' : 'text-[#7a0000]'}`}>100</span>
          <span className={`text-[10px] font-bold ${isPaid ? 'text-slate-400' : 'text-[#c5a059]'}`}>ETB</span>
        </div>

        {isPaid ? (
          <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-700 uppercase tracking-widest bg-emerald-50 px-6 py-2 border border-emerald-100 rounded-full">
            <Check size={14} /> FULFILLED
          </div>
        ) : (
          <button 
            onClick={() => handlePaymentInitiation(month)}
            className={`w-full bg-[#7a0000] hover:bg-[#5a0000] text-white py-4 text-[10px] font-bold tracking-[0.25em] transition-all shadow-md active:scale-95 flex items-center justify-center gap-2`}
          >
            <Smartphone size={14} /> SETTLE OFFERING
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in duration-700 pb-20">
      
      {/* Mahlet's Control Board */}
      {isMahlet && (
        <div className="space-y-6">
          <div className="bg-[#7a0000] p-8 text-white shadow-xl relative overflow-hidden border border-[#c5a059]/30 rounded-sm">
            <div className="absolute top-0 right-0 p-4 opacity-10"><FileSpreadsheet size={120} /></div>
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div>
                <p className="text-[10px] font-bold text-[#c5a059] uppercase tracking-[0.3em] mb-2">Finance Officer Control</p>
                <h2 className="text-3xl font-serif font-bold">Contribution Audit & Import</h2>
              </div>
              <div className="flex flex-wrap gap-4">
                <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept=".csv,.xlsx" />
                <button onClick={() => fileInputRef.current?.click()} className="bg-white text-[#7a0000] hover:bg-slate-50 px-8 py-3.5 text-[11px] font-bold uppercase tracking-widest shadow-lg flex items-center gap-3 transition-all active:scale-95"><FileUp size={16} /> Import Previous Data</button>
                <button onClick={downloadMemberContributionReport} className="bg-[#c5a059] hover:bg-[#b59049] text-white px-8 py-3.5 text-[11px] font-bold uppercase tracking-widest shadow-lg flex items-center gap-3 transition-all active:scale-95"><Download size={16} /> Export Detailed Audit</button>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-[#d6c7a1] p-6 shadow-sm">
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-4">Monthly Collection</p>
              <p className="text-3xl font-serif font-bold text-emerald-600">{contributionStats.totalReceived} ETB</p>
            </div>
            <div className="bg-white border border-[#d6c7a1] p-6 shadow-sm">
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-4">Outstanding Arrears</p>
              <p className="text-3xl font-serif font-bold text-rose-600">{contributionStats.totalOutstanding} ETB</p>
            </div>
            <div className="bg-[#fcf9f1] border border-[#d6c7a1] p-6 shadow-sm flex flex-col justify-center">
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-4">Registry Participation</p>
              <div className="flex items-center gap-3">
                 <div className="text-3xl font-serif font-bold text-[#7a0000]">{Math.round((contributionStats.paidCount / MOCK_MEMBERS.length) * 100)}%</div>
                 <div className="flex-1 h-1 bg-[#d6c7a1]/30 rounded-full overflow-hidden"><div className="h-full bg-[#7a0000]" style={{width: `${(contributionStats.paidCount / MOCK_MEMBERS.length) * 100}%`}} /></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Personal Offering Portal */}
      <div className="space-y-10">
        <div className="flex items-center justify-between border-b border-[#d6c7a1] pb-6">
          <div>
            <h2 className="text-4xl font-bold text-[#7a0000] font-serif tracking-tight">Offering Sanctuary</h2>
            <p className="text-[#c5a059] font-serif italic text-lg mt-1">Settle your monthly communal contributions securely.</p>
          </div>
          <div className="hidden md:flex items-center gap-3 px-4 py-2 bg-[#fcf9f1] border border-[#d6c7a1] rounded-full">
            <History size={14} className="text-[#c5a059]" />
            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Financial Year 2018 E.C.</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-10">
          {/* Main Action: Current Month */}
          <div className="lg:col-span-7 space-y-6">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-[#7a0000] rounded-full" /> Immediate Action Required
            </p>
            {renderMonthCard(currentMonth, 'large')}
            <div className="bg-[#7a0000]/5 border border-[#7a0000]/10 p-6 flex items-center gap-4">
              <AlertCircle size={20} className="text-[#7a0000]" />
              <p className="text-xs font-serif italic text-slate-600 leading-relaxed">
                Offerings support the upkeep of the monastery branch and communal food hosting. Thank you for your continued stewardship.
              </p>
            </div>
          </div>

          {/* Secondary Action: Search History */}
          <div className="lg:col-span-5 space-y-6">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] flex items-center gap-2">
              <History size={14} className="text-[#c5a059]" /> Search Monthly History
            </p>
            
            <div className="bg-white border border-[#d6c7a1] p-1 shadow-sm">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                <input 
                  type="text"
                  placeholder="Type month name (e.g. TIR, HAMLE)..."
                  value={historySearch}
                  onChange={(e) => setHistorySearch(e.target.value)}
                  className="w-full bg-[#fcf9f1] border-none py-5 pl-14 pr-4 text-sm font-serif focus:outline-none focus:ring-1 focus:ring-[#7a0000]"
                />
              </div>
            </div>

            <div className="space-y-4">
               {historySearch.trim() === '' ? (
                 <div className="h-48 border border-dashed border-[#d6c7a1] rounded-sm flex flex-col items-center justify-center text-slate-300 gap-3">
                   <Search size={32} strokeWidth={1} />
                   <p className="text-[10px] font-bold uppercase tracking-widest">Search previous months</p>
                 </div>
               ) : filteredHistory.length > 0 ? (
                 <div className="grid grid-cols-1 gap-4 animate-in slide-in-from-right duration-500">
                   {filteredHistory.map(m => renderMonthCard(m, 'small'))}
                 </div>
               ) : (
                 <div className="p-10 text-center bg-white border border-[#d6c7a1]/50 italic text-slate-400 font-serif text-sm">
                   No historical record found for "{historySearch}".
                 </div>
               )}
            </div>
          </div>
        </div>
      </div>

      {/* Collective Audit Registry Section */}
      {isAuthorized && (
        <div className="pt-10 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#d6c7a1] pb-4">
            <h3 className="text-xl font-serif font-bold text-[#7a0000] flex items-center gap-3">
              <UserCheck size={20} className="text-[#c5a059]" /> Collective Audit Registry
            </h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={14} />
              <input type="text" placeholder="Search by name..." value={stewardSearch} onChange={(e) => setStewardSearch(e.target.value)} className="w-full md:w-64 bg-transparent border-b border-[#d6c7a1] py-2 pl-9 text-xs focus:outline-none focus:border-[#7a0000] placeholder:text-slate-300 font-serif italic" />
            </div>
          </div>
          <div className="bg-white border border-[#d6c7a1] shadow-sm overflow-hidden">
             <div className="max-h-96 overflow-y-auto">
              <table className="w-full text-left font-serif text-sm">
                <thead className="bg-[#fcf9f1] border-b border-[#d6c7a1] text-[10px] font-bold text-slate-400 uppercase tracking-widest sticky top-0 z-10">
                   <tr><th className="p-4">Faithful Member</th><th className="p-4">{currentMonth} Status</th><th className="p-4">Paid Months</th><th className="p-4 text-right">Outstanding (ETB)</th></tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                   {filteredMembers.map(m => (
                      <tr key={m.id} className="hover:bg-slate-50 transition-colors group">
                         <td className="p-4"><p className="font-bold text-slate-800">{m.name}</p><p className="text-[9px] text-slate-400 uppercase tracking-tighter">{m.role}</p></td>
                         <td className="p-4"><span className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest border ${m.currentStatus === 'Paid' ? 'text-emerald-600 border-emerald-100 bg-emerald-50' : 'text-rose-600 border-rose-200 bg-rose-50'}`}>{m.currentStatus}</span></td>
                         <td className="p-4 text-slate-400 italic text-xs">{m.totalPaidMonths} Months</td>
                         <td className="p-4 text-right">{m.balanceOwed > 0 ? <span className="font-bold text-rose-600 tabular-nums">{m.balanceOwed} ETB</span> : <span className="text-emerald-600 font-bold"><Check size={14} className="inline mr-1" /> SETTLED</span>}</td>
                      </tr>
                   ))}
                </tbody>
              </table>
             </div>
          </div>
        </div>
      )}

      {/* Payment Processing Modal */}
      {selectedMonth && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-[#1e140a]/90 backdrop-blur-md" />
          <div className="relative bg-[#fcf9f1] w-full max-w-sm border-2 border-[#c5a059] shadow-2xl overflow-hidden animate-in zoom-in-95 rounded-sm">
            {paymentStep === 'idle' && (
              <>
                <div className="p-8 border-b border-[#d6c7a1] bg-white flex justify-between items-center">
                  <div className="flex items-center gap-3 text-[#7a0000]"><Smartphone size={20} /><h3 className="text-xl font-serif font-bold tracking-tight">Direct Checkout</h3></div>
                  <button onClick={() => setSelectedMonth(null)} className="text-[#c5a059] hover:text-[#7a0000] p-1"><X size={24} /></button>
                </div>
                <div className="p-10 space-y-8 text-center">
                  <div className="space-y-1"><p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Prepare Offering for</p><p className="text-4xl font-serif font-bold text-[#7a0000]">{selectedMonth}</p></div>
                  <div className="bg-white border border-[#d6c7a1] p-8 shadow-inner space-y-2"><p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Amount Due</p><p className="text-3xl font-bold font-serif text-[#7a0000]">100 ETB</p></div>
                  <button onClick={() => handlePaymentInitiation(selectedMonth)} className="w-full bg-[#7a0000] hover:bg-[#5a0000] text-white py-5 text-[11px] font-bold tracking-[0.25em] shadow-xl active:scale-95 transition-all flex items-center justify-center gap-3">OPEN PAYMENT LINK <ExternalLink size={16} /></button>
                </div>
              </>
            )}
            {paymentStep === 'redirecting' && (<div className="p-16 text-center space-y-6"><Loader2 className="w-16 h-16 text-[#7a0000] animate-spin mx-auto" /><div className="space-y-2"><h4 className="text-xl font-serif font-bold text-[#7a0000]">Redirecting...</h4></div></div>)}
            {paymentStep === 'verifying' && (<div className="p-16 text-center space-y-6"><Loader2 className="w-16 h-16 text-[#c5a059] animate-spin mx-auto" /><div className="space-y-2"><h4 className="text-xl font-serif font-bold text-[#7a0000]">Confirming...</h4></div></div>)}
            {paymentStep === 'success' && (<div className="p-16 text-center space-y-6 animate-in zoom-in-50 duration-500"><div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600 border-4 border-emerald-50"><CheckCircle size={48} /></div><div className="space-y-2"><h4 className="text-2xl font-serif font-bold text-[#1e3a1e]">Offering Received</h4></div></div>)}
            <div className="p-4 bg-white border-t border-[#d6c7a1] text-center text-[8px] font-bold text-[#c5a059] uppercase tracking-widest">Authenticated via Mahbere Treasury System</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FinancialPage;
