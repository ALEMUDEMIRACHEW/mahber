
import { Member, Team, MonthData } from './types';

export const MOCK_MEMBERS: Member[] = [
  { id: '1', name: 'Feleku', role: 'Member', attendance: 95, lastActive: '2 hours ago', involvement: 'high', status: 'active', email: 'feleku@example.com', phone: '+251 91 234 5671', whatsapp: '+251912345671', telegram: '@feleku', simeKiristina: 'Gebre Kristos', yenisihaAbat: 'Abune Petros', joinedDate: 'January 2024', totalMeetings: 49 },
  { id: '2', name: 'Biruk', role: 'Member', attendance: 88, lastActive: '1 day ago', involvement: 'high', status: 'active', email: 'biruk@example.com', phone: '+251 91 234 5672', whatsapp: '+251912345672', telegram: '@biruk', simeKiristina: 'Kidane Mehret', yenisihaAbat: 'Abune Tekle Haymanot', joinedDate: 'February 2024', totalMeetings: 42 },
  { id: '3', name: 'Betelhem', role: 'Member', attendance: 92, lastActive: '3 hours ago', involvement: 'high', status: 'active', email: 'betelhem@example.com', phone: '+251 91 234 5673', whatsapp: '+251912345673', telegram: '@betelhem', simeKiristina: 'Wolete Mariam', yenisihaAbat: 'Abune Samuel', joinedDate: 'January 2024', totalMeetings: 47 },
  { id: '4', name: 'Sible', role: 'Member', attendance: 85, lastActive: '2 days ago', involvement: 'medium', status: 'active', email: 'sible@example.com', phone: '+251 91 234 5674', whatsapp: '+251912345674', telegram: '@sible', simeKiristina: 'Wolete Selassie', yenisihaAbat: 'Abune Gabriel', joinedDate: 'March 2024', totalMeetings: 38 },
  { id: '5', name: 'Aynealem', role: 'Member', attendance: 90, lastActive: '5 hours ago', involvement: 'high', status: 'active', email: 'aynealem@example.com', phone: '+251 91 234 5675', whatsapp: '+251912345675', telegram: '@aynealem', simeKiristina: 'Wolete Gabriel', yenisihaAbat: 'Abune Petros', joinedDate: 'December 2023', totalMeetings: 52 },
  { id: '6', name: 'Mekdelawit', role: 'Member', attendance: 87, lastActive: '1 day ago', involvement: 'medium', status: 'active', email: 'mekdelawit@example.com', phone: '+251 91 234 5676', whatsapp: '+251912345676', telegram: '@mekdelawit', simeKiristina: 'Wolete Kristos', yenisihaAbat: 'Abune Tekle Haymanot', joinedDate: 'May 2024', totalMeetings: 30 },
  { id: '7', name: 'Alemu', role: 'Member', attendance: 78, lastActive: '4 days ago', involvement: 'medium', status: 'active', email: 'alemu@example.com', phone: '+251 91 234 5677', whatsapp: '+251912345677', telegram: '@alemu', simeKiristina: 'Gebre Mikael', yenisihaAbat: 'Abune Tekle Haymanot', joinedDate: 'April 2024', totalMeetings: 35 },
  { id: '8', name: 'Dereje', role: 'Member', attendance: 93, lastActive: '4 hours ago', involvement: 'high', status: 'active', email: 'dereje@example.com', phone: '+251 91 234 5678', whatsapp: '+251912345678', telegram: '@dereje', simeKiristina: 'Gebre Egziabher', yenisihaAbat: 'Abune Petros', joinedDate: 'January 2024', totalMeetings: 50 },
  { id: '9', name: 'Estifanos', role: 'Member', attendance: 82, lastActive: '3 days ago', involvement: 'medium', status: 'active', email: 'estifanos@example.com', phone: '+251 91 234 5679', whatsapp: '+251912345679', telegram: '@estifanos', simeKiristina: 'Gebre Mariam', yenisihaAbat: 'Abune Samuel', joinedDate: 'June 2024', totalMeetings: 24 },
  { id: '10', name: 'Mikias', role: 'Member', attendance: 96, lastActive: '1 hour ago', involvement: 'high', status: 'active', email: 'mikias@example.com', phone: '+251 91 234 5680', whatsapp: '+251912345680', telegram: '@mikias', simeKiristina: 'Habte Mariam', yenisihaAbat: 'Abune Tekle Haymanot', joinedDate: 'January 2024', totalMeetings: 55 },
  { id: '11', name: 'Tamrat', role: 'Member', attendance: 89, lastActive: '2 hours ago', involvement: 'high', status: 'active', email: 'tamrat@example.com', phone: '+251 91 234 5681', whatsapp: '+251912345681', telegram: '@tamrat', simeKiristina: 'Gebre Giorgis', yenisihaAbat: 'Abune Petros', joinedDate: 'February 2024', totalMeetings: 45 },
  { id: '12', name: 'Dagmawit', role: 'Member', attendance: 84, lastActive: '2 days ago', involvement: 'medium', status: 'active', email: 'dagmawit@example.com', phone: '+251 91 234 5682', whatsapp: '+251912345682', telegram: '@dagmawit', simeKiristina: 'Kidist Selassie', yenisihaAbat: 'Abune Samuel', joinedDate: 'March 2024', totalMeetings: 40 },
  { id: '13', name: 'Henok', role: 'Member', attendance: 91, lastActive: '6 hours ago', involvement: 'high', status: 'active', email: 'henok@example.com', phone: '+251 91 234 5683', whatsapp: '+251912345683', telegram: '@henok', simeKiristina: 'Gebre Selassie', yenisihaAbat: 'Abune Petros', joinedDate: 'January 2024', totalMeetings: 48 },
  { id: '14', name: 'Ayantu', role: 'Member', attendance: 80, lastActive: '1 week ago', involvement: 'medium', status: 'away', email: 'ayantu@example.com', phone: '+251 91 234 5684', whatsapp: '+251912345684', telegram: '@ayantu', simeKiristina: 'Wolete Selassie', yenisihaAbat: 'Abune Gabriel', joinedDate: 'July 2024', totalMeetings: 18 },
  { id: '15', name: 'Mahlet', role: 'Member', attendance: 94, lastActive: '3 hours ago', involvement: 'high', status: 'active', email: 'mahlet@example.com', phone: '+251 91 234 5685', whatsapp: '+251912345685', telegram: '@mahlet', simeKiristina: 'Wolete Mariam', yenisihaAbat: 'Abune Samuel', joinedDate: 'January 2024', totalMeetings: 51 },
  { id: '16', name: 'Eyob', role: 'Member', attendance: 86, lastActive: '4 days ago', involvement: 'medium', status: 'active', email: 'eyob@example.com', phone: '+251 91 234 5686', whatsapp: '+251912345686', telegram: '@eyob', simeKiristina: 'Gebre Kristos', yenisihaAbat: 'Abune Tekle Haymanot', joinedDate: 'May 2024', totalMeetings: 32 },
  { id: '17', name: 'Selam', role: 'Member', attendance: 88, lastActive: '1 day ago', involvement: 'high', status: 'active', email: 'selam@example.com', phone: '+251 91 234 5687', whatsapp: '+251912345687', telegram: '@selam', simeKiristina: 'Wolete Mariam', yenisihaAbat: 'Abune Petros', joinedDate: 'February 2024', totalMeetings: 44 },
  { id: '18', name: 'Tomasya', role: 'Member', attendance: 75, lastActive: '5 days ago', involvement: 'medium', status: 'away', email: 'tomasya@example.com', phone: '+251 91 234 5688', whatsapp: '+251912345688', telegram: '@tomasya', simeKiristina: 'Wolete Gabriel', yenisihaAbat: 'Abune Samuel', joinedDate: 'August 2024', totalMeetings: 12 },
  { id: '19', name: 'Yohannes', role: 'Member', attendance: 92, lastActive: '2 hours ago', involvement: 'high', status: 'active', email: 'yohannes@example.com', phone: '+251 91 234 5689', whatsapp: '+251912345689', telegram: '@yohannes', simeKiristina: 'Gebre Mikael', yenisihaAbat: 'Abune Petros', joinedDate: 'January 2024', totalMeetings: 49 },
  { id: '20', name: 'Yordanos', role: 'Member', attendance: 90, lastActive: '1 day ago', involvement: 'high', status: 'active', email: 'yordanos@example.com', phone: '+251 91 234 5690', whatsapp: '+251912345690', telegram: '@yordanos', simeKiristina: 'Wolete Selassie', yenisihaAbat: 'Abune Gabriel', joinedDate: 'January 2024', totalMeetings: 46 },
];

export const MOCK_TEAMS: Team[] = [
  {
    id: 'edu',
    name: 'Team Education',
    description: 'Organizing and conducting educational programs, Bible studies, and spiritual growth activities.',
    memberCount: 4,
    icon: 'GraduationCap',
    lead: 'Daniel Mekonnen',
    members: ['Daniel Mekonnen', 'Abeba Tesfaye', 'Dawit Kebede', 'Kidist Asefa'],
    responsibilities: ['Organize Bible study sessions', 'Develop educational materials', 'Coordinate with instructors', 'Track participant progress']
  },
  {
    id: 'muz',
    name: 'Team Muzmur',
    description: 'Managing worship muzmur, choir practices, and liturgical chants for all church services.',
    memberCount: 4,
    icon: 'Music',
    lead: 'Mikias Wolde',
    members: ['Mikias Wolde', 'Abeba Tesfaye', 'Kidist Asefa', 'Mahlet Getachew'],
    responsibilities: ['Lead choir practice sessions', 'Organize muzmur for seasons', 'Train new choir members', 'Coordinate worship activities']
  },
  {
    id: 'rel',
    name: 'Member Relations',
    description: 'Building community connections, member support, and fostering fellowship among members.',
    memberCount: 4,
    icon: 'Heart',
    lead: 'Kidist Asefa',
    members: ['Kidist Asefa', 'Tamrat Bekele', 'Dagmawit Girma', 'Yordanos Hailu'],
    responsibilities: ['Organize fellowship events', 'Support members in need', 'Coordinate community outreach', 'Build relationships within group']
  },
];

export const MOCK_MUZMUR_CALENDAR: MonthData[] = [
  {
    name: 'Meskerem',
    englishMonth: 'September - Ethiopian New Year',
    theme: 'New Year celebrations, Feast of Meskel (Finding of True Cross)',
    tags: ['Enkutatash (New Year)', 'Meskel (Finding of True Cross)', 'St. John the Baptist'],
    muzmurs: [
      { id: 'm1', title: 'Enkutatash - New Year Song (Addis Amet)', originalTitle: 'እንቁጣጣሽ', language: 'Ge\'ez/Amharic', level: 'Beginner', duration: '4:00', materials: ['Lyrics sheet', 'Audio recording', 'Practice guide'] },
      { id: 'm2', title: 'Meskel Glory (Meskel Sebhat)', originalTitle: 'መስቀል', language: 'Ge\'ez', level: 'Intermediate', duration: '5:30', materials: ['Ge\'ez text', 'Translation', 'Audio recording', 'Melody notation'] },
    ]
  },
  {
    name: 'Tikmt',
    englishMonth: 'October',
    theme: 'Season of regular worship and devotion',
    tags: ['St. Mary feasts', 'Archangel Michael'],
    muzmurs: [
      { id: 'm3', title: 'St. Mary Hymn (Kidist Mariam)', originalTitle: 'ቅድስት ማርያም', language: 'Ge\'ez', level: 'Intermediate', duration: '5:00', materials: ['Ge\'ez text', 'Translation', 'Audio recording'] },
      { id: 'm4', title: 'Archangel Michael (Mikael Muzmur)', originalTitle: 'ቅዱስ ሚካኤል', language: 'Amharic', level: 'Beginner', duration: '3:45', materials: ['Lyrics sheet', 'Audio recording'] },
    ]
  },
  {
    name: 'Hidar',
    englishMonth: 'November - Hidar Tsion',
    theme: 'Feast of Hidar Tsion (Zion) and St. Mary celebrations',
    tags: ['Hidar Tsion', 'St. Mary of Zion', 'Covenant of Mercy'],
    muzmurs: [
      { id: 'm5', title: 'Hidar Tsion Celebration (Hidar Tsion Sebhat)', originalTitle: 'ሕዳር ጽዮን', language: 'Ge\'ez', level: 'Advanced', duration: '6:30', materials: ['Ge\'ez text', 'Translation', 'Audio recording', 'Melody notation'] },
      { id: 'm6', title: 'Mary Mother of God (Mariam Weldita Amlak)', originalTitle: 'ማርያም ወላዲተ አምላክ', language: 'Ge\'ez/Amharic', level: 'Intermediate', duration: '4:45', materials: ['Lyrics sheet', 'Audio recording', 'Muzmur notation'] },
    ]
  },
  {
    name: 'Tahsas',
    englishMonth: 'December - Christmas/Genna',
    theme: 'Christmas Season - Birth of Christ (Lidet/Genna)',
    tags: ['Christmas (Lidet/Genna)', 'Nativity of Christ'],
    muzmurs: [
      { id: 'm7', title: 'Christ is Born (Kristos Teweledal)', originalTitle: 'ክርስቶስ ተወለደ', language: 'Ge\'ez', level: 'Intermediate', duration: '5:00', materials: ['Ge\'ez text', 'Translation', 'Audio recording', 'Melody notation'] },
      { id: 'm8', title: 'Glory to God in the Highest (Sebhat LeEgziabher)', originalTitle: 'ስብሐት ለእግዚአብሔር', language: 'Ge\'ez/Amharic', level: 'Beginner', duration: '3:30', materials: ['Lyrics sheet', 'Simple notation', 'Practice track'] },
      { id: 'm9', title: 'Genna Celebration (Ye Lidet Beal)', originalTitle: 'የልደት በዓል', language: 'Amharic', level: 'Beginner', duration: '4:15', materials: ['Lyrics sheet', 'Audio recording'] },
    ]
  },
  {
    name: 'Tir',
    englishMonth: 'January - Timket/Epiphany',
    theme: 'Baptism of Christ - Timket (Epiphany)',
    tags: ['Timket (Baptism of Jesus)', 'Feast of Epiphany'],
    muzmurs: [
      { id: 'm10', title: 'Jordan River (Yordanos Wenz)', originalTitle: 'ዮርዳኖስ ወንዝ', language: 'Ge\'ez', level: 'Advanced', duration: '6:15', materials: ['Ge\'ez text', 'Translation', 'Audio recording', 'Melody notation'] },
      { id: 'm11', title: 'Holy Water Blessing (Tsebel Mai)', originalTitle: 'ጸበል ማይ', language: 'Amharic', level: 'Intermediate', duration: '4:00', materials: ['Chord chart', 'Lyrics', 'Lead sheet', 'Backing track'] },
      { id: 'm12', title: 'Baptism of Our Lord (Timket Egziabher)', originalTitle: 'ጥምቀት እግዚአብሔር', language: 'Ge\'ez/Amharic', level: 'Intermediate', duration: '5:20', materials: ['Lyrics sheet', 'Audio recording', 'Muzmur notation'] },
    ]
  },
  {
    name: 'Yekatit',
    englishMonth: 'February',
    theme: 'Preparation for Lent, regular worship',
    tags: ['St. Tekle Haymanot', 'Archangel Gabriel'],
    muzmurs: [
      { id: 'm13', title: 'St. Tekle Haymanot (Abune Tekle Haymanot)', originalTitle: 'አቡነ ተክለ ሃይማኖት', language: 'Ge\'ez', level: 'Intermediate', duration: '5:00', materials: ['Ge\'ez text', 'Translation', 'Audio recording'] },
      { id: 'm14', title: 'Gabriel the Archangel (Gebriel Muzmur)', originalTitle: 'ገብርኤል መዝሙር', language: 'Amharic', level: 'Beginner', duration: '3:30', materials: ['Lyrics sheet', 'Audio recording'] },
    ]
  },
  {
    name: 'Megabit',
    englishMonth: 'March - Great Fast/Lent',
    theme: 'Great Fast (Hudade/Abiy Tsom), songs of repentance',
    tags: ['Beginning of Lent', 'Fasting Period', 'St. Kidan'],
    muzmurs: [
      { id: 'm15', title: 'Have Mercy on Us (Kibretn Amlaken)', originalTitle: 'ክብረትን አምላከን', language: 'Ge\'ez', level: 'Intermediate', duration: '5:30', materials: ['Liturgical text', 'Melody notation', 'Audio guide'] },
      { id: 'm16', title: 'Lord Forgive (Egziabher Yikirta)', originalTitle: 'እግዚአብሔር ይቅርታ', language: 'Amharic', level: 'Beginner', duration: '3:15', materials: ['Lyrics sheet', 'Audio recording', 'Practice guide'] },
      { id: 'm17', title: 'Fasting Prayer (Ye Tsom Selot)', originalTitle: 'የጾም ጸሎት', language: 'Ge\'ez/Amharic', level: 'Intermediate', duration: '4:45', materials: ['Liturgical text', 'Audio recording'] },
    ]
  },
  {
    name: 'Miyazia',
    englishMonth: 'April - Holy Week & Easter',
    theme: 'Passion Week (Himamat), Easter (Tinsae), St. George',
    tags: ['Palm Sunday', 'Good Friday', 'Easter (Tinsae)', 'St. George'],
    muzmurs: [
      { id: 'm18', title: 'By Your Cross (Be Meskeleh)', originalTitle: 'በመስቀልህ', language: 'Ge\'ez', level: 'Advanced', duration: '7:00', materials: ['Ge\'ez text', 'Translation', 'Audio recording', 'Melody notation'] },
      { id: 'm19', title: 'Friday of Salvation (Arb Siqlet)', originalTitle: 'ዓርብ ስቅለት', language: 'Ge\'ez/Amharic', level: 'Intermediate', duration: '5:45', materials: ['Liturgical text', 'Melody notation', 'Audio guide'] },
      { id: 'm20', title: 'Christ is Risen (Kristos Tenesa)', originalTitle: 'ክርስቶስ ተነሣ', language: 'Ge\'ez/Amharic', level: 'Beginner', duration: '4:15', materials: ['Lyrics sheet', 'Simple notation', 'Practice track'] },
      { id: 'm21', title: 'St. George the Martyr (Kidus Giorgis)', originalTitle: 'ቅዱስ ጊዮርጊስ', language: 'Amharic', level: 'Intermediate', duration: '4:30', materials: ['Lyrics sheet', 'Audio recording'] },
    ]
  },
  {
    name: 'Ginbot',
    englishMonth: 'May - Easter Season',
    theme: 'Resurrection celebration continues, Ascension',
    tags: ['Ascension', 'St. Mary feasts'],
    muzmurs: [
      { id: 'm22', title: 'Risen from the Dead (Kem Mot Tenesa)', originalTitle: 'ከሞት ተነሣ', language: 'Amharic', level: 'Intermediate', duration: '4:30', materials: ['Chord progression', 'Lyrics sheet', 'Audio sample'] },
      { id: 'm23', title: 'Ascension Glory (Irgat Sebhat)', originalTitle: 'ዕርገት ስብሐት', language: 'Ge\'ez', level: 'Advanced', duration: '5:45', materials: ['Ge\'ez text', 'Translation', 'Audio recording'] },
    ]
  },
  {
    name: 'Sene',
    englishMonth: 'June - Pentecost',
    theme: 'Pentecost - Coming of the Holy Spirit (Peraklitos)',
    tags: ['Pentecost (Peraklitos)', 'Holy Trinity'],
    muzmurs: [
      { id: 'm24', title: 'Come Holy Spirit (Na Menfes Kidus)', originalTitle: 'ና መንፈስ ቅዱስ', language: 'Ge\'ez', level: 'Intermediate', duration: '5:15', materials: ['Ge\'ez text', 'Translation', 'Audio recording', 'Melody notation'] },
      { id: 'm25', title: 'Spirit of God (Menfes Amlak)', originalTitle: 'መንፈስ አምላክ', language: 'Amharic', level: 'Beginner', duration: '3:50', materials: ['Lyrics sheet', 'Audio recording', 'Practice guide'] },
      { id: 'm26', title: 'Holy Trinity (Selassie)', originalTitle: 'ሥላሴ', language: 'Ge\'ez/Amharic', level: 'Intermediate', duration: '5:00', materials: ['Liturgical text', 'Audio recording'] },
    ]
  },
  {
    name: 'Hamle',
    englishMonth: 'July - Apostles Fast',
    theme: 'Fast of the Apostles, Feast of St. Peter and Paul',
    tags: ['Apostles Fast', 'St. Peter & Paul', 'St. Mary feasts'],
    muzmurs: [
      { id: 'm27', title: 'The Apostles (Hawaryat)', originalTitle: 'ሐዋርያት', language: 'Ge\'ez', level: 'Intermediate', duration: '5:30', materials: ['Ge\'ez text', 'Translation', 'Audio recording'] },
      { id: 'm28', title: 'St. Peter and Paul (Petros ena Pawlos)', originalTitle: 'ጴጥሮስ እና ጳውሎስ', language: 'Amharic', level: 'Beginner', duration: '4:00', materials: ['Lyrics sheet', 'Audio recording'] },
    ]
  },
  {
    name: 'Nehase',
    englishMonth: 'August - Assumption & Transfiguration',
    theme: 'Assumption of Mary (Filseta), Transfiguration',
    tags: ['Assumption of Mary (Filseta)', 'Transfiguration', 'St. Mary feasts'],
    muzmurs: [
      { id: 'm29', title: 'Assumption of Mary (Filseta)', originalTitle: 'ፍልሰታ ለማርያም', language: 'Ge\'ez', level: 'Advanced', duration: '6:45', materials: ['Ge\'ez text', 'Translation', 'Audio recording', 'Melody notation'] },
      { id: 'm30', title: 'Virgin Mary Glory (Dingel Mariam)', originalTitle: 'ድንግል ማርያም', language: 'Ge\'ez', level: 'Advanced', duration: '6:15', materials: ['Ge\'ez text', 'Translation', 'Audio recording', 'Melody notation'] },
      { id: 'm31', title: 'Transfiguration (Buhe)', originalTitle: 'ቡሄ', language: 'Amharic', level: 'Intermediate', duration: '4:30', materials: ['Lyrics sheet', 'Audio recording'] },
    ]
  },
  {
    name: 'Pagumen',
    englishMonth: '13th Month - 5-6 Days',
    theme: 'Short month before New Year, preparation and reflection',
    tags: ['Feast of Angels', 'Preparation for New Year'],
    muzmurs: [
      { id: 'm32', title: 'Angels Praise (Melekat Muzmur)', originalTitle: 'መላእክት መዝሙር', language: 'Ge\'ez/Amharic', level: 'Beginner', duration: '3:30', materials: ['Lyrics sheet', 'Audio recording'] },
      { id: 'm33', title: 'Year End Thanksgiving (Ye Amet Meles Gize)', originalTitle: 'የዓመት መለስ ጊዜ', language: 'Amharic', level: 'Beginner', duration: '4:00', materials: ['Lyrics sheet', 'Audio recording', 'Practice guide'] },
    ]
  },
];
