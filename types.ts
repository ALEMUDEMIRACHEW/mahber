
export enum Page {
  Splash = 'splash',
  Login = 'login',
  Home = 'home',
  Announcements = 'announcements',
  FoodHosting = 'food-hosting',
  Members = 'members',
  Courses = 'courses',
  Muzmur = 'muzmur',
  Teams = 'teams',
  Financial = 'financial'
}

export interface PaymentRecord {
  id: string;
  month: string;
  year: string;
  amount: number;
  date: string;
  status: 'paid' | 'pending' | 'failed';
  reference: string;
}

export interface Member {
  id: string;
  name: string;
  role: string;
  attendance: number; 
  lastActive: string;
  involvement: 'high' | 'medium' | 'low';
  status: 'active' | 'away' | 'offline';
  email: string;
  phone: string;
  whatsapp: string;
  telegram: string;
  simeKiristina: string;
  yenisihaAbat: string;
  joinedDate: string;
  totalMeetings: number;
}

export interface AttendanceRecord {
  month: string;
  year: string;
  presents: string[]; // Array of member IDs who were present
}

export interface Team {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  icon: string;
  lead: string;
  members: string[];
  responsibilities: string[];
}

export interface Muzmur {
  id: string;
  title: string;
  originalTitle: string;
  language: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  materials: string[];
}

export interface MonthData {
  name: string;
  englishMonth: string;
  theme: string;
  muzmurs: Muzmur[];
  tags: string[];
}

export interface ReadingProgress {
  member_name: string;
  day_number: number;
  reading_start_time: number;
  completion_time: number;
  completion_status: boolean;
}

export interface ReadingDay {
  day_number: number;
  content: string;
  word_count: number;
}
