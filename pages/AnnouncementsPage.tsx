
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { 
  Bell, Plus, X, MoreVertical, ChevronRight, Info, BookOpen, 
  ArrowLeft, ArrowRight, Search, Clock, CheckCircle2, Check, ExternalLink,
  Scroll, Book, Sparkles, CalendarDays, Navigation, Star
} from 'lucide-react';
import { ReadingProgress, ReadingDay } from '../types';

interface Announcement {
  id: string;
  title: string;
  date: string;
  category: 'Liturgy' | 'Meeting' | 'Special' | 'Urgent';
  content: string;
  hasAttachment?: boolean;
  priority: 'normal' | 'high';
  author: string;
}

interface Holiday {
  title: string;
  amharicDate: string;
  englishDate?: string;
}

// Liturgical Reading Data from CSV (Day 1-30)
const LITURGICAL_CALENDAR: Record<number, { misbak: string; gospel: string; liturgy: string }> = {
  1: { misbak: "መዝ 131:8", gospel: "ሉቃ 1:39-45", liturgy: "ዘእግዝእትነ" },
  2: { misbak: "መዝ 131:13", gospel: "ሉቃ 1:46-50", liturgy: "ዘእግዝእትነ" },
  3: { misbak: "መዝ 131:15", gospel: "ሉቃ 1:51-56", liturgy: "ዘእግዝእትነ" },
  4: { misbak: "መዝ 86:1", gospel: "ሉቃ 11:27-28", liturgy: "ዘእግዝእትነ" },
  5: { misbak: "መዝ 86:5", gospel: "ማቴ 12:46-50", liturgy: "ዘእግዝእትነ" },
  6: { misbak: "መዝ 44:10", gospel: "ማር 3:31-35", liturgy: "ዘእግዝእትነ" },
  7: { misbak: "መዝ 44:11", gospel: "ሉቃ 8:19-21", liturgy: "ዘእግዝእትነ" },
  8: { misbak: "መዝ 44:13", gospel: "ዮሐ 19:25-27", liturgy: "ዘእግዝእትነ" },
  9: { misbak: "መዝ 44:15", gospel: "ሉቃ 1:26-38", liturgy: "ዘእግዝእትነ" },
  10: { misbak: "መዝ 44:17", gospel: "ማቴ 1:18-25", liturgy: "ዘእግዝእትነ" },
  11: { misbak: "መዝ 67:19", gospel: "ሉቃ 2:1-20", liturgy: "ዘእግዝእትነ" },
  12: { misbak: "መዝ 102:20", gospel: "ማቴ 13:41-52", liturgy: "ዘቅዱስ ዮሐንስ አፈወርቅ" },
  13: { misbak: "መዝ 84:11", gospel: "ሉቃ 2:21-40", liturgy: "ዘእግዝእትነ" },
  14: { misbak: "መዝ 84:12", gospel: "ሉቃ 2:41-52", liturgy: "ዘእግዝእትነ" },
  15: { misbak: "መዝ 44:10", gospel: "ዮሐ 2:1-11", liturgy: "ዘእግዝእትነ" },
  16: { misbak: "መዝ 44:14", gospel: "ዮሐ 11:1-45", liturgy: "ዘእግዝእትነ" },
  17: { misbak: "መዝ 133:1", gospel: "ማቴ 16:1-12", liturgy: "ዘሠለስቱ ምዕት" },
  18: { misbak: "መዝ 134:1", gospel: "ማር 14:1-11", liturgy: "ዘቅዱስ ኤጲፋንዮስ" },
  19: { misbak: "መዝ 135:1", gospel: "ሉቃ 17:1-10", liturgy: "ዘቅዱስ ቄርሎስ" },
  20: { misbak: "መዝ 136:1", gospel: "ዮሐ 14:1-14", liturgy: "ዘቅዱስ ጎርጎርዮስ" },
  21: { misbak: "መዝ 131:8", gospel: "ሉቃ 1:39-56", liturgy: "ዘእግዝእትነ" },
  22: { misbak: "መዝ 138:1", gospel: "ማቴ 17:1-13", liturgy: "ዘቅዱስ ባሲልዮስ" },
  23: { misbak: "መዝ 139:1", gospel: "ማር 15:1-15", liturgy: "ዘቅዱስ ሕርያቆስ" },
  24: { misbak: "መዝ 140:1", gospel: "ሉቃ 18:1-14", liturgy: "ዘቅዱስ ዲዮስቆሮስ" },
  25: { misbak: "መዝ 141:1", gospel: "ዮሐ 15:1-11", liturgy: "ዘቅዱስ አትናቴዎስ" },
  26: { misbak: "መዝ 142:1", gospel: "ማቴ 18:1-11", liturgy: "ዘቅዱስ ዮሐንስ አፈወርቅ" },
  27: { misbak: "መዝ 143:1", gospel: "ማር 1:1-11", liturgy: "ዘሠለስቱ ምዕት" },
  28: { misbak: "መዝ 144:1", gospel: "ሉቃ 3:1-18", liturgy: "ዘቅዱስ ኤጲፋንዮስ" },
  29: { misbak: "መዝ 145:1", gospel: "ዮሐ 1:1-18", liturgy: "ዘቅዱስ ቄርሎስ" },
  30: { misbak: "መዝ 146:1", gospel: "ማቴ 4:1-11", liturgy: "ዘቅዱስ ጎርጎርዮስ" },
};

// 2018 E.C. Holidays Data
const HOLIDAYS_2018: Holiday[] = [
  { title: 'እንቁጣጣሽ', amharicDate: 'መስከረም ፩፣ ፳፻፲፰', englishDate: 'September 11, 2025' },
  { title: 'ጾመ ነቢያት', amharicDate: 'ሕዳር ፲፭፣ ፳፻፲፰', englishDate: 'November 24, 2025' },
  { title: 'ልደት', amharicDate: 'ታኅሣሥ ፳፱፣ ፳፻፲፰', englishDate: 'January 7, 2026' },
  { title: 'ጾመ ነነዌ', amharicDate: 'ጥር ፳፮፣ ፳፻፲፰', englishDate: 'February 3, 2026' },
  { title: 'ዓቢይ ጾም', amharicDate: 'የካቲት ፱፣ ፳፻፲፰', englishDate: 'February 16, 2026' },
  { title: 'ትንሣኤ', amharicDate: 'ሚያዝያ ፲፩፣ ፳፻፲፰', englishDate: 'April 19, 2026' },
  { title: 'ዕርገት', amharicDate: 'ግንቦት ፳፣ ፳፻፲፰', englishDate: 'May 28, 2026' },
  { title: 'ጰራቅሊጦስ', amharicDate: 'ግንቦት ፴፣ ፳፻፲፰', englishDate: 'June 7, 2026' },
  { title: 'ጾመ ሐዋርያት', amharicDate: 'ሰኔ ፪፣ ፳፻፲፰', englishDate: 'June 9, 2026' },
  { title: 'ጾመ ፍልሰታ', amharicDate: 'ነሐሴ ፩፣ ፳፻፲፰', englishDate: 'August 7, 2026' },
];

const getLiturgicalReading = (day: number) => {
  const normalizedDay = ((day - 1) % 30) + 1;
  return LITURGICAL_CALENDAR[normalizedDay];
};

const AMHARIC_LITURGY = {
  MEDITATION_INTRO: "ቃሉ ለነፍሳችን ምግብ ነው፤ ለመንገዳችንም ብርሃን ነው። ዛሬ የምናነበው ይህ ክፍል በሕይወታችን ውስጥ መንፈሳዊ ፍሬ እንዲያፈራ እንጸልያለን።",
  PRAYER_OUTRO: "እግዚአብሔር ሆይ፥ አንተ አምላካችን ነህና እናመሰግንሃለን። በቅዱስ ቃልህም በረከትን እንድታድለን እንለምንሃለን። ይህን ቃል የምናነብ ሁሉ ለሕይወታችን ብርሃን ይሁንልን።"
};

const BOOK_TRANSLATIONS: Record<string, string> = {
  "Genesis": "ኦሪት ዘፍጥረት", "Gen": "ኦሪት ዘፍጥረት",
  "Exodus": "ኦሪት ዘጸአት", "Exo": "ኦሪት ዘጸአት",
  "Leviticus": "ኦሪት ዘሌዋውያን", "Lev": "ኦሪት ዘሌዋውያን",
  "Numbers": "ኦሪት ዘኍል፲", "Num": "ኦሪት ዘኍል፲",
  "Deuteronomy": "ኦሪት ዘዳግም", "Deut": "ኦሪት ዘዳግም",
  "Joshua": "መጽሐፈ ኢያሱ", "Judges": "መጽሐፈ መሣፍንት", "Ruth": "መጽሐፈ ሩት",
  "1 Samuel": "፩ኛ ሳሙኤል", "1 Sam": "፩ኛ ሳሙኤል", "2 Samuel": "፪ኛ ሳሙኤል", "2 Sam": "፪ኛ ሳሙኤል",
  "1 Kings": "፩ኛ ነገሥት", "1 Kin": "፩ኛ ነገሥት", "2 Kings": "፪ኛ ነገሥት",
  "1 Chronicles": "፩ኛ ዜና መዋዕል", "1 Chr": "፩ኛ ዜና መዋዕል", "2 Chronicles": "፪ኛ ዜና መዋዕል", "2 Chr": "፪ኛ ዜና መዋዕል",
  "Ezra": "መጽሐፈ ዕዝራ", "Nehemiah": "መጽሐፈ ነህምያ", "Neh": "መጽሐፈ ነህምያ", "Esther": "መጽሐፈ አስቴር",
  "Job": "መጽሐፈ ኢዮብ", "Psalms": "መዝሙረ ዳዊት", "Psalm": "መዝሙረ ዳዊት", "Ps": "መዝሙረ ዳዊት",
  "Proverbs": "መጽሐፈ ምሳሌ", "Prov": "መጽሐፈ ምሳሌ", "Ecclesiastes": "መጽሐፈ መክብብ", "Eccl": "መጽሐፈ መክብብ",
  "Song of Sol": "መኃልየ መኃልይ", "Isaiah": "ትንቢተ ኢሳይያስ", "Isa": "ትንቢተ ኢሳይያስ",
  "Jeremiah": "ትንቢተ ኤርምያስ", "Jer": "ትንቢተ ኤርምያስ", "Lamentations": "ሰቆቃው ኤርምያስ",
  "Ezekiel": "ትንቢተ ሕዝቅኤል", "Ezek": "ትንቢተ ሕዝቅኤል", "Daniel": "ትንቢተ ዳንኤል",
  "Hosea": "ትንቢተ ሆሴዕ", "Joel": "ትንቢተ ኢዩኤል", "Amos": "ትንቢተ አሞጽ", "Obadiah": "ትንቢተ አብድዩ",
  "Jonah": "ትንቢተ ዮናስ", "Micah": "ትንቢተ ሚክያስ", "Nahum": "ትንቢተ ናሆም",
  "Habakkuk": "ትንቢተ ዕንባቆም", "Zephaniah": "ትንቢተ ሶፎንያስ", "Haggai": "ትንቢተ ሐጌ",
  "Zechariah": "ትንቢተ ዘካርያስ", "Malachi": "ትንቢተ ሚልክያስ", "Matthew": "የማቴዎስ ወንጌል",
  "Matt": "የማቴዎስ ወንጌል", "Mark": "የማርቆስ ወንጌል", "Luke": "የሉቃስ ወንጌል", "John": "የዮሐንስ ወንጌል",
  "Acts": "የሐዋርያት ሥራ", "Romans": "ወደ ሮሜ ሰዎች", "1 Corinthians": "፩ኛ ወደ ቆሮንቶስ ሰዎች",
  "1 Cor": "፩ኛ ወደ ቆሮንቶስ ሰዎች", "2 Corinthians": "፪ኛ ወደ ቆሮንቶስ ሰዎች", "2 Cor": "፪ኛ ወደ ቆሮንቶስ ሰዎች",
  "Galatians": "ወደ ገላትያ ሰዎች", "Gal": "ወደ ገላትያ ሰዎች", "Ephesians": "ወደ ኤፌሶን ሰዎች",
  "Eph": "ወደ ኤፌሶን ሰዎች", "Philippians": "ወደ ፊልጵስዩስ ሰዎች", "Phil": "ወደ ፊልጵስዩስ ሰዎች",
  "Colossians": "ወደ ቆላስይስ ሰዎች", "Col": "ወደ ቆላስይስ ሰዎች", "1 Thessalonians": "፩ኛ ወደ ተሰሎንቄ ሰዎች",
  "1 Thess": "፩ኛ ወደ ተሰሎንቄ ሰዎች", "2 Thessalonians": "፪ኛ ወደ ተሰሎንቄ ሰዎች", "2 Thess": "፪ኛ ወደ ተሰሎንቄ ሰዎች",
  "1 Timothy": "፩ኛ ወደ ጢሞቴዎስ", "1 Tim": "፩ኛ ወደ ጢሞቴዎስ", "2 Timothy": "፪ኛ ወደ ጢሞቴዎስ",
  "2 Tim": "፪ኛ ወደ ጢሞቴዎስ", "Titus": "ወደ ቲቶ", "Philemon": "ወደ ፊልሞና",
  "Hebrews": "ወደ ዕብራውያን", "Heb": "ወደ ዕብራውያን", "James": "የያዕቆብ መልእክት", "1 Peter": "፩ኛ የጴጥሮስ መልእክት",
  "1 Pe": "፩ኛ የጴጥሮስ መልእክት", "2 Peter": "፪ኛ የጴጥሮስ መልእክት", "2 Pe": "፪ኛ የጴጥሮስ መልእክት",
  "1 John": "፩ኛ የዮሐንስ መልእክት", "1 Jn": "፩ኛ የዮሐንስ መልእክት", "2 John": "፪ኛ የዮሐንስ መልእክት",
  "2 Jn": "፪ኛ የዮሐንስ መልእክት", "3 John": "፫ኛ የዮሐንስ መልእክት", "3 Jn": "፫ኛ የዮሐንስ መልእክት",
  "Jude": "የይሁዳ መልእክት", "Revelation": "የዮሐንስ ራእይ", "Rev": "የዮሐንስ ራእይ"
};

const BIBLE_PLAN_RAW: Record<number, string> = {
  1: "Genesis 1-2; Psalm 19; Mark 1", 2: "Gen 3-5; Mark 2", 3: "Gen 6-8; Psalm 104; Mark 3",
  4: "Gen 9-11; Mark 4", 5: "Gen 12-15; Psalm 148; Mark 5", 6: "Genesis 16-18; Mark 6",
  7: "Gen 19-20; Psalm 1; Mark 7", 8: "Gen 21-23; Psalm 107; Mark 8", 9: "Gen 24-25; Psalm 4; Mark 9",
  10: "Gen 26-27; Mark 10", 34: "Leviticus 1-3; Psalm 27; Heb 2", 35: "Lev 4-7; Heb 3",
  36: "Leviticus 8-11; Ps 110; Hebrews 4", 37: "Lev 12-14; Psalm 111; Heb 5", 38: "Lev 15-18; Psalm 31; Heb 6",
  39: "Lev 19-20; Heb 7", 40: "Lev 21-23; Heb 8", 41: "Leviticus 24-25; Psalm 81; Hebrews 9",
  42: "Lev 26-27; Psalm 112; Heb 10", 151: "Jonah; Matthew 11", 152: "2 Kings 13-14; 2 Chr 25; Ps 53; Matt 12",
  153: "Amos 1-3; Matt 13", 154: "Amos 4-6; Psalm 55; Matt 14", 155: "Amos 7-9; Matt 15"
};

const getReadingsForDay = (day: number) => {
  const rawString = BIBLE_PLAN_RAW[day] || "Psalms; John 1";
  const parts = rawString.split(';').map(p => p.trim());
  return parts.map(part => {
    const match = part.match(/^([1-3]?\s?[A-Za-z\s]+)\s?(.*)$/);
    if (match) {
      const bookKey = match[1].trim();
      const reference = match[2].trim();
      const amharicBook = BOOK_TRANSLATIONS[bookKey] || bookKey;
      return { label: `${amharicBook} ${reference}`, english: part };
    }
    return { label: part, english: part };
  });
};

interface AnnouncementsPageProps {
  isAuthorized: boolean;
  memberName: string;
}

const AnnouncementsPage: React.FC<AnnouncementsPageProps> = ({ isAuthorized, memberName }) => {
  const [activeTab, setActiveTab] = useState<'events' | 'bible' | 'holidays'>('events');
  const [readingDayIndex, setReadingDayIndex] = useState(1); 
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);
  const [searchDay, setSearchDay] = useState('');
  const timerRef = useRef<number | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const currentReadings = useMemo(() => getReadingsForDay(readingDayIndex), [readingDayIndex]);
  const currentLiturgical = useMemo(() => getLiturgicalReading(readingDayIndex), [readingDayIndex]);

  const [progress, setProgress] = useState<ReadingProgress[]>(() => {
    const saved = localStorage.getItem(`reading_progress_${memberName}`);
    return saved ? JSON.parse(saved) : [];
  });

  const isCompleted = useMemo(() => progress.some(p => p.day_number === readingDayIndex), [progress, readingDayIndex]);

  useEffect(() => {
    if (activeTab === 'bible' && !isCompleted) {
      timerRef.current = window.setInterval(() => setElapsedSeconds(p => p + 1), 1000);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); timerRef.current = null; };
  }, [activeTab, isCompleted, readingDayIndex]);

  useEffect(() => {
    if (activeTab === 'bible') {
      setElapsedSeconds(0);
      setHasScrolledToBottom(false);
      if (scrollContainerRef.current) scrollContainerRef.current.scrollTop = 0;
    }
  }, [readingDayIndex, activeTab]);

  const minRequiredTime = 30;
  const canMarkAsRead = elapsedSeconds >= minRequiredTime && hasScrolledToBottom && !isCompleted;

  const handleMarkAsRead = () => {
    const updated = [...progress, { member_name: memberName, day_number: readingDayIndex, reading_start_time: Date.now(), completion_time: Date.now(), completion_status: true }];
    setProgress(updated);
    localStorage.setItem(`reading_progress_${memberName}`, JSON.stringify(updated));
  };

  const handleJumpToDay = () => {
    const val = parseInt(searchDay);
    if (!isNaN(val) && val >= 1 && val <= 365) {
      setReadingDayIndex(val);
      setSearchDay('');
    } else {
      alert("እባክዎን ከ1 እስከ 365 ያለውን ቀን ያስገቡ (Please enter a day between 1 and 365).");
    }
  };

  const [announcements] = useState<Announcement[]>([
    { id: '1', title: 'የየካቲት ወርሃዊ ጉባኤ ማሳሰቢያ', date: 'የካቲት 20፣ 2018 ዓ.ም', category: 'Meeting', content: 'የተወደዳችሁ አባላት፤ በመጪው እሁድ የሚኖረንን ወርሃዊ ጉባኤ እንድትገኙ እናሳስባለን።', priority: 'high', author: 'Steward Office' },
    { id: '2', title: 'የአቢይ ጾም ዝግጅት', date: 'የካቲት 15፣ 2018 ዓ.ም', category: 'Special', content: 'ለመጪው አቢይ ጾም የሚረዱ የጥናት ጽሁፎች በስፋት ተዘጋጅተዋል።', priority: 'normal', author: 'Education Team' }
  ]);

  return (
    <div className="space-y-12 animate-in fade-in duration-700 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#d6c7a1] pb-8">
        <div>
          <h2 className="text-4xl font-bold text-[#7a0000] font-serif tracking-tight">Gatherings & Word</h2>
          <p className="text-[#c5a059] font-serif italic text-lg mt-1">Nourishing the soul through community and scripture.</p>
        </div>
        <div className="flex bg-white/50 border border-[#d6c7a1] p-1 rounded-sm shadow-sm overflow-hidden">
          <button 
            onClick={() => setActiveTab('events')} 
            className={`px-6 py-2.5 text-[10px] font-bold uppercase tracking-widest transition-all ${activeTab === 'events' ? 'bg-[#7a0000] text-white shadow-md' : 'text-slate-500 hover:text-[#7a0000]'}`}
          >
            Announcements
          </button>
          <button 
            onClick={() => setActiveTab('bible')} 
            className={`px-6 py-2.5 text-[10px] font-bold uppercase tracking-widest transition-all ${activeTab === 'bible' ? 'bg-[#7a0000] text-white shadow-md' : 'text-slate-500 hover:text-[#7a0000]'}`}
          >
            Bible Reading Daily
          </button>
          <button 
            onClick={() => setActiveTab('holidays')} 
            className={`px-6 py-2.5 text-[10px] font-bold uppercase tracking-widest transition-all ${activeTab === 'holidays' ? 'bg-[#7a0000] text-white shadow-md' : 'text-slate-500 hover:text-[#7a0000]'}`}
          >
            Holidays of the Year
          </button>
        </div>
      </div>

      {activeTab === 'events' && (
        <div className="space-y-8 max-w-4xl mx-auto animate-in slide-in-from-bottom-2">
          {/* Daily Liturgical Reading Bar - Tiny Bar */}
          <div className="bg-[#fcf9f1] border border-[#d6c7a1] p-4 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden rounded-sm group relative">
            <div className="absolute top-0 left-0 w-1 h-full bg-[#7a0000]" />
            <div className="flex items-center gap-3 shrink-0">
               <div className="bg-[#7a0000] text-white w-8 h-8 flex items-center justify-center rounded-full text-[10px] font-bold shadow-md">
                 {readingDayIndex}
               </div>
               <span className="text-[10px] font-bold text-[#c5a059] uppercase tracking-widest border-r border-[#d6c7a1] pr-4">የዕለቱ ምስባክና ወንጌል</span>
            </div>
            
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-8 w-full">
              <div className="flex items-center gap-3">
                <Scroll size={14} className="text-[#7a0000]" />
                <div className="flex flex-col">
                  <span className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter">ምስባክ (Misbak)</span>
                  <span className="text-sm font-serif font-bold text-[#7a0000]">{currentLiturgical.misbak}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Book size={14} className="text-[#7a0000]" />
                <div className="flex flex-col">
                  <span className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter">የዕለቱ ወንጌል (Daily Gospel)</span>
                  <span className="text-sm font-serif font-bold text-[#7a0000]">{currentLiturgical.gospel}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Sparkles size={14} className="text-[#7a0000]" />
                <div className="flex flex-col">
                  <span className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter">የሚቀደሰው መልእክታት (Liturgy)</span>
                  <span className="text-sm font-serif font-bold text-[#7a0000] truncate max-w-[150px]">{currentLiturgical.liturgy}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 border-l border-[#d6c7a1] pl-4 shrink-0">
               <button onClick={() => setReadingDayIndex(p => Math.max(1, p - 1))} className="p-1.5 text-[#c5a059] hover:text-[#7a0000]"><ArrowLeft size={16} /></button>
               <button onClick={() => setReadingDayIndex(p => Math.min(365, p + 1))} className="p-1.5 text-[#c5a059] hover:text-[#7a0000]"><ArrowRight size={16} /></button>
            </div>
          </div>

          {announcements.map((item) => (
            <div key={item.id} className="bg-white border-l-4 border-[#7a0000] p-10 shadow-sm relative group hover:shadow-md transition-all">
              <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">{item.category} • {item.date}</span>
              <h4 className="text-3xl font-serif font-bold text-[#7a0000] mt-2 group-hover:text-[#9a0000] transition-colors">{item.title}</h4>
              <p className="text-slate-600 font-serif italic text-lg mt-4 leading-relaxed">{item.content}</p>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'bible' && (
        <div className="space-y-10 max-w-5xl mx-auto pb-20 animate-in slide-in-from-bottom-2">
          <div className="flex items-center justify-between bg-white border border-[#d6c7a1] p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <button onClick={() => setReadingDayIndex(p => Math.max(1, p - 1))} className="p-3 border border-[#d6c7a1] text-[#7a0000] hover:bg-[#7a0000] hover:text-white transition-all shadow-sm"><ArrowLeft size={20} /></button>
              <div className="text-center min-w-[140px]">
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Reading Plan</p>
                <h4 className="text-2xl font-serif font-bold text-[#7a0000]">Day {readingDayIndex}</h4>
              </div>
              <button onClick={() => setReadingDayIndex(p => Math.min(365, p + 1))} className="p-3 border border-[#d6c7a1] text-[#7a0000] hover:bg-[#7a0000] hover:text-white transition-all shadow-sm"><ArrowRight size={20} /></button>
            </div>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={14} />
              <input type="number" min="1" max="365" value={searchDay} onChange={(e) => setSearchDay(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleJumpToDay()} placeholder="Jump to Day (1-365)..." className="w-full bg-[#fcf9f1] border border-[#d6c7a1] py-3 pl-10 text-xs font-serif focus:outline-none focus:border-[#7a0000]" />
            </div>
          </div>

          <div className="bg-white border-2 border-[#d6c7a1] p-1 shadow-2xl min-h-[600px] flex flex-col rounded-sm overflow-hidden">
            <div className="bg-[#fcf9f1] flex flex-col flex-1 overflow-hidden">
               <div ref={scrollContainerRef} onScroll={(e) => { const t = e.currentTarget; if (t.scrollHeight - t.scrollTop <= t.clientHeight + 50) setHasScrolledToBottom(true); }} className="flex-1 overflow-y-auto p-16 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] scroll-smooth">
                  <div className="max-w-2xl mx-auto text-center space-y-16">
                     <div className="flex justify-center items-center gap-4"><div className="w-12 h-px bg-[#c5a059]" /><span className="text-[#c5a059] text-xl">✝</span><div className="w-12 h-px bg-[#c5a059]" /></div>
                     <div className="space-y-12">
                       <p className="text-2xl font-serif font-medium text-slate-800 leading-[2] whitespace-pre-wrap select-none tracking-wide">{AMHARIC_LITURGY.MEDITATION_INTRO}</p>
                       <div className="space-y-10 pt-6">
                         <div className="flex flex-col items-center gap-2">
                            <BookOpen className="text-[#7a0000]/20" size={40} />
                            <p className="text-[11px] font-bold text-[#7a0000] uppercase tracking-[0.5em] mb-4">የዕለቱ ምንባባት (Today's Readings)</p>
                         </div>
                         <div className="space-y-4 max-w-md mx-auto">
                           {currentReadings.map((verse, idx) => (
                             <a key={`${readingDayIndex}-${idx}`} href={`https://www.ethiopicbible.com/?utm_source=chatgpt.com`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-7 bg-white border border-[#d6c7a1] hover:border-[#7a0000] hover:shadow-xl transition-all group rounded-sm shadow-sm">
                               <div className="flex items-center gap-5">
                                 <div className="w-10 h-10 rounded-full bg-[#7a0000] text-white flex items-center justify-center text-sm font-bold font-serif shadow-inner">{idx + 1}</div>
                                 <span className="text-2xl font-serif font-bold text-[#7a0000] group-hover:underline underline-offset-8 decoration-1 decoration-[#c5a059]/50">{verse.label}</span>
                               </div>
                               <ExternalLink size={20} className="text-[#c5a059] group-hover:text-[#7a0000] transition-colors" />
                             </a>
                           ))}
                         </div>
                       </div>
                       <div className="pt-10">
                         <p className="text-2xl font-serif font-medium text-slate-800 leading-[2.2] select-none italic bg-white/50 p-10 border border-[#d6c7a1]/30 rounded-sm shadow-inner">{AMHARIC_LITURGY.PRAYER_OUTRO}</p>
                       </div>
                     </div>
                     <div className="w-32 h-px bg-[#d6c7a1] mx-auto mt-12" />
                  </div>
               </div>
               <div className="p-10 border-t border-[#d6c7a1] bg-white flex flex-col md:flex-row items-center justify-between gap-8">
                  {!isCompleted ? (
                    <>
                      <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-6">
                          <div className={`flex items-center gap-2.5 text-[10px] font-bold uppercase tracking-widest ${elapsedSeconds >= minRequiredTime ? 'text-emerald-600' : 'text-slate-400'}`}>
                            <Clock size={16} className={elapsedSeconds >= minRequiredTime ? '' : 'animate-pulse text-[#c5a059]'} /> 
                            {elapsedSeconds >= minRequiredTime ? 'Verified' : `Meditation Time: ${Math.max(0, minRequiredTime - elapsedSeconds)}s`}
                          </div>
                          <div className="w-40 h-1.5 bg-slate-100 rounded-full border border-slate-50"><div className="h-full bg-emerald-500 transition-all duration-1000" style={{ width: `${Math.min(100, (elapsedSeconds / minRequiredTime) * 100)}%` }} /></div>
                        </div>
                        <div className={`flex items-center gap-2.5 text-[10px] font-bold uppercase tracking-widest ${hasScrolledToBottom ? 'text-emerald-600' : 'text-slate-400'}`}>
                          {hasScrolledToBottom ? <Check size={16} /> : <div className="w-4 h-4 border border-slate-300 rounded-sm" />} Verified Completion
                        </div>
                      </div>
                      <button onClick={handleMarkAsRead} disabled={!canMarkAsRead} className={`px-12 py-5 font-serif text-sm font-bold uppercase tracking-widest transition-all ${canMarkAsRead ? 'bg-[#7a0000] text-white shadow-xl hover:bg-[#9a0000] active:scale-95' : 'bg-slate-50 text-slate-300 border border-slate-100'}`}>Mark as Read</button>
                    </>
                  ) : (
                    <div className="w-full flex justify-between items-center bg-emerald-50 p-6 border border-emerald-100 text-emerald-700 font-serif italic shadow-inner">
                      <div className="flex items-center gap-4"><CheckCircle2 className="text-emerald-500" /> Day {readingDayIndex} meditation recorded. Glory to God.</div>
                      <button onClick={() => setReadingDayIndex(p => Math.min(365, p + 1))} className="text-[#7a0000] font-bold uppercase text-[10px] flex items-center gap-2 border-b border-[#7a0000]/30 hover:border-[#7a0000] transition-all">Next Day <ArrowRight size={14} /></button>
                    </div>
                  )}
               </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'holidays' && (
        <div className="space-y-10 max-w-4xl mx-auto pb-20 animate-in slide-in-from-bottom-2">
          <div className="text-center space-y-4">
             <div className="flex items-center justify-center gap-3">
               <CalendarDays className="text-[#7a0000]" size={28} />
               <h3 className="text-3xl font-serif font-bold text-[#7a0000]">የ፳፻፲፰ የዓመቱ በዓላት</h3>
             </div>
             <p className="text-slate-400 text-sm font-serif italic">Ethiopic Holidays of the Year 2018 E.C.</p>
             <div className="w-24 h-px bg-[#d6c7a1] mx-auto" />
          </div>

          <div className="grid gap-4">
            {HOLIDAYS_2018.map((holiday, idx) => (
              <div 
                key={idx} 
                className="bg-white border border-[#d6c7a1] p-8 shadow-sm hover:shadow-md transition-all group flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-1.5 h-full bg-[#c5a059]/10 group-hover:bg-[#7a0000] transition-colors" />
                <div className="space-y-1">
                  <h4 className="text-2xl font-serif font-bold text-[#0088cc] group-hover:text-[#7a0000] transition-colors">
                    {holiday.title}
                  </h4>
                  <div className="flex items-center gap-2 text-slate-500 font-serif">
                    <span>{holiday.amharicDate}</span>
                    <span className="text-[10px] opacity-30">•</span>
                    <span className="text-xs italic opacity-60">{holiday.englishDate}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="text-[9px] font-bold uppercase tracking-widest text-[#c5a059] border-b border-transparent hover:border-[#c5a059]">Details</button>
                  <Navigation size={18} className="text-[#c5a059]" />
                </div>
              </div>
            ))}
          </div>

          <div className="bg-[#7a0000]/5 border border-[#7a0000]/10 p-10 text-center space-y-4">
            <Star size={32} className="text-[#c5a059] mx-auto opacity-40" />
            <p className="font-serif italic text-slate-600 leading-relaxed max-w-lg mx-auto">
              "እግዚአብሔር የሠራው ቀን ይህ ነው፤ በእርሱም ደስ ይበለን ሐሴትም እናድርግ።"
            </p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">መዝሙረ ዳዊት ፻፲፰:፳፬</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnnouncementsPage;
