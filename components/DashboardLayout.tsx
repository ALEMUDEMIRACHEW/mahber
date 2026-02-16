
import React from 'react';
import { Page } from '../types';
import { 
  Home, 
  Bell, 
  Utensils, 
  Users, 
  BookOpen, 
  Music,
  Shield,
  ShieldCheck,
  Coins
} from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
  activePage: Page;
  onNavigate: (page: Page) => void;
  currentUser: string | null;
  isAuthorized: boolean;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, activePage, onNavigate, currentUser, isAuthorized }) => {
  const navItems = [
    { id: Page.Home, label: 'HOME', icon: Home },
    { id: Page.Announcements, label: 'EVENTS', icon: Bell },
    { id: Page.FoodHosting, label: 'HOSTING', icon: Utensils },
    { id: Page.Members, label: 'MEMBERS', icon: Users },
    { id: Page.Financial, label: 'FINANCE', icon: Coins },
    { id: Page.Courses, label: 'STUDY', icon: BookOpen },
    { id: Page.Muzmur, label: 'MUZMUR', icon: Music },
    { id: Page.Teams, label: 'TEAMS', icon: Shield },
  ];

  return (
    <div className="min-h-screen flex flex-col relative bg-transparent">
      <header className="bg-white/95 backdrop-blur-md border-b border-[#d6c7a1]/30 pt-6 text-center sticky top-0 z-[100] shadow-sm">
        <div className="flex flex-col items-center mb-6 px-4">
           {isAuthorized && (
             <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1 bg-[#7a0000]/5 border border-[#7a0000]/20 rounded-full">
               <ShieldCheck size={12} className="text-[#7a0000]" />
               <span className="text-[8px] font-bold text-[#7a0000] uppercase tracking-widest">Steward Access</span>
             </div>
           )}
           
           <div className="text-[#7a0000] mb-2">
             <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11 2h2v7h7v2h-7v11h-2v-11H4v-2h7V2z" />
             </svg>
           </div>
           
           <h1 className="text-3xl font-bold text-[#7a0000] tracking-tight mb-1">ማኅበረ ቅድስት ክርስቶስ ሠምራ</h1>
           <h2 className="text-[#c5a059] font-serif text-lg tracking-wide mb-1 font-semibold">Mahbere Kidist Kristos Semra</h2>
           <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em]">Ethiopian Orthodox Tewahedo Community</p>
        </div>

        <div className="px-4 max-w-6xl mx-auto overflow-x-auto scrollbar-hide">
          <nav className="flex flex-nowrap md:flex-wrap justify-start md:justify-center items-end gap-1 md:gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`flex items-center gap-2 px-4 md:px-6 py-3 transition-all duration-200 relative shrink-0 ${
                    isActive 
                      ? 'bg-white text-[#7a0000] font-bold border-b-2 border-[#7a0000] rounded-t-lg shadow-[0_-4px_10px_-4px_rgba(0,0,0,0.05)]' 
                      : 'text-slate-500 hover:text-[#7a0000] font-semibold'
                  }`}
                >
                  <Icon size={16} className={isActive ? 'text-[#7a0000]' : 'text-slate-400 opacity-70'} />
                  <span className="text-[10px] md:text-[11px] font-serif uppercase tracking-[0.15em]">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-10 relative">
        <div className="absolute top-0 left-0 w-32 h-32 border-l border-t border-[#d6c7a1]/20 -translate-x-4 -translate-y-4 pointer-events-none" />
        <div className="absolute top-0 right-0 w-32 h-32 border-r border-t border-[#d6c7a1]/20 translate-x-4 -translate-y-4 pointer-events-none" />
        
        <div className="relative">
          {children}
        </div>
      </main>

      <footer className="py-8 border-t border-[#d6c7a1]/30 text-center bg-white/30 backdrop-blur-sm">
        <p className="text-[#7a0000] font-serif italic text-sm">"Peace be unto this house and all who dwell in it."</p>
        <p className="text-slate-400 text-[10px] mt-2 font-bold uppercase tracking-widest">© 2024 Mahbere Kidist Kristos Semra • {currentUser}</p>
      </footer>
    </div>
  );
};

export default DashboardLayout;
