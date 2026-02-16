
import React, { useState } from 'react';
import { Book, Search, Bookmark, Scroll, Sparkles, Navigation, Heart, BookOpen, ChevronRight } from 'lucide-react';

const BiblePage: React.FC = () => {
  const [ፍለጋ, ስብስብፍለጋ] = useState('');

  const መጻሕፍት = [
    { ስም: 'ኦሪት ዘፍጥረት', ኪዳን: 'ብሉይ' },
    { ስም: 'ኦሪት ዘጸአት', ኪዳን: 'ብሉይ' },
    { ስም: 'መዝሙረ ዳዊት', ኪዳን: 'ብሉይ' },
    { ስም: 'ትንቢተ ኢሳይያስ', ኪዳን: 'ብሉይ' },
    { ስም: 'የማቴዎስ ወንጌል', ኪዳን: 'አዲስ' },
    { ስም: 'የዮሐንስ ወንጌል', ኪዳን: 'አዲስ' },
    { ስም: 'የሐዋርያት ሥራ', ኪዳን: 'አዲስ' },
    { ስም: 'ወደ ሮሜ ሰዎች', ኪዳን: 'አዲስ' },
  ];

  return (
    <div className="space-y-12 animate-in fade-in duration-700 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#d6c7a1] pb-8">
        <div className="max-w-2xl">
          <h2 className="text-4xl font-bold text-[#7a0000] font-serif tracking-tight">መጽሐፍ ቅዱስ</h2>
          <p className="text-[#c5a059] font-serif italic text-lg mt-1">"ሕግህ ለእግሬ መብራት፥ ለመንገዴም ብርሃን ነው።"</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-10">
          
          {/* የዕለቱ ቃል */}
          <div className="bg-white border-2 border-[#7a0000] p-1 shadow-2xl">
            <div className="bg-[#fcf9f1] border border-white p-12 text-center space-y-8 relative overflow-hidden">
               <div className="absolute top-0 left-0 w-24 h-24 text-[#7a0000]/5 -translate-x-4 -translate-y-4 pointer-events-none">
                 <Scroll size={96} />
               </div>
               
               <p className="text-[10px] font-bold text-[#c5a059] uppercase tracking-[0.4em]">የዕለቱ ቃል</p>
               
               <div className="space-y-6">
                 <h3 className="text-3xl font-serif font-bold text-[#7a0000] leading-tight px-4">
                   "በጌታ ሁልጊዜ ደስ ይበላችሁ፤ ደግሜ እላለሁ፤ ደስ ይበላችሁ።"
                 </h3>
                 <div className="flex items-center justify-center gap-3">
                   <div className="h-px w-12 bg-[#d6c7a1]" />
                   <span className="text-sm font-bold text-[#7a0000] tracking-widest">ወደ ፊልጵስዩስ ሰዎች ፬:፬</span>
                   <div className="h-px w-12 bg-[#d6c7a1]" />
                 </div>
               </div>

               <button className="bg-[#7a0000] hover:bg-[#9a0000] text-white px-10 py-4 font-serif text-sm transition-all shadow-xl active:scale-95 flex items-center gap-3 mx-auto uppercase tracking-widest border border-[#c5a059]/40 group">
                 <BookOpen size={18} />
                 ሙሉውን መጽሐፍ ያንብቡ
               </button>
            </div>
          </div>

          {/* መጻሕፍት ዝርዝር */}
          <div className="space-y-6">
            <h3 className="text-2xl font-serif font-bold text-[#7a0000] flex items-center gap-3 border-b border-[#d6c7a1] pb-3">
               <Sparkles className="text-[#c5a059]" /> ቅዱሳት መጻሕፍት
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {መጻሕፍት.map((መጽሐፍ, index) => (
                 <div key={index} className="bg-white border border-[#d6c7a1] p-6 group hover:border-[#7a0000] transition-all flex justify-between items-center cursor-pointer">
                   <div>
                     <span className="text-[8px] font-bold px-2 py-0.5 border border-[#c5a059]/30 text-[#c5a059] uppercase tracking-widest mb-2 inline-block">{መጽሐፍ.ኪዳን} ኪዳን</span>
                     <h4 className="text-lg font-serif font-bold text-[#7a0000]">{መጽሐፍ.ስም}</h4>
                   </div>
                   <ChevronRight size={18} className="text-[#d6c7a1] group-hover:text-[#7a0000]" />
                 </div>
               ))}
            </div>
          </div>
        </div>

        <div className="space-y-10">
          <div className="bg-white border border-[#d6c7a1] p-8 shadow-sm">
            <div className="flex items-center gap-3 text-[#7a0000] mb-6 border-b border-[#fcf9f1] pb-4">
              <Search size={18} />
              <h4 className="text-[11px] font-bold uppercase tracking-[0.2em]">ቃል ይፈልጉ</h4>
            </div>
            <div className="space-y-4">
               <div className="relative">
                 <input 
                   type="text" 
                   value={ፍለጋ}
                   onChange={(e) => ስብስብፍለጋ(e.target.value)}
                   placeholder="መጽሐፍ፣ ምዕራፍ ወይም ቃል..."
                   className="w-full bg-[#fcf9f1] border border-[#d6c7a1] py-4 px-5 text-sm focus:outline-none focus:border-[#7a0000] font-serif italic"
                 />
               </div>
               {ፍለጋ && ፍለጋ.length > 0 && (
                 <p className="text-[10px] text-[#7a0000] italic font-serif leading-relaxed px-1">
                   “የተጠየቀው ክፍል በአማርኛ አልተገኘም።”
                 </p>
               )}
            </div>
          </div>

          <div className="bg-[#7a0000]/5 border border-[#7a0000]/20 p-8 space-y-6">
             <div className="flex items-center gap-3 text-[#7a0000]">
               <Bookmark size={18} className="text-[#c5a059]" />
               <h4 className="font-serif font-bold">የተመረጡ ጥቅሶች</h4>
             </div>
             <ul className="space-y-4">
               {[
                 { ቃል: 'መዝሙር ፳፫', ትርጉም: 'እግዚአብሔር እረኛዬ ነው' },
                 { ቃል: 'ዮሐንስ ፩:፩-፲፬', ትርጉም: 'ቃል ሥጋ ሆነ' },
                 { ቃል: 'ገላትያ ፭:፳፪', ትርጉም: 'የመንፈስ ፍሬ' }
               ].map((ጥቅስ, i) => (
                 <li key={i} className="group cursor-pointer">
                   <p className="text-sm font-serif font-bold text-slate-800 group-hover:text-[#7a0000] transition-colors">{ጥቅስ.ቃል}</p>
                   <p className="text-[9px] text-slate-400 uppercase tracking-widest mt-1">{ጥቅስ.ትርጉም}</p>
                 </li>
               ))}
             </ul>
          </div>

          <div className="bg-white border-2 border-[#d6c7a1] p-8 text-center space-y-4">
             <div className="w-12 h-12 rounded-full bg-slate-50 border border-[#d6c7a1] flex items-center justify-center text-[#7a0000] mx-auto">
               <Heart size={20} />
             </div>
             <p className="text-xs font-serif italic text-slate-500 leading-relaxed">
               "ሰማይና ምድር ያልፋሉ፥ ቃሌ ግን አያልፍም።"
             </p>
             <p className="text-[10px] font-bold text-[#c5a059] uppercase tracking-widest">ማቴዎስ ፳፬:፴፭</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BiblePage;
