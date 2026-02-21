export interface UserStat {
  subject: string;
  percentage: number;
  color: string;
}

export interface HistoryItem {
  id: number;
  title: string;
  date: string;
  score: string;
  hasCertificate: boolean;
  status: 'completed' | 'missed';
}

export interface UserProfile {
  id: number;
  name: string;
  level: string;
  phone: string;
  coins: number;
  stats: UserStat[];
  history: HistoryItem[];
}

export const mockUser: UserProfile = {
  id: 998901234567,
  name: "Azizbek Tursunov",
  level: "B", // This will be overwritten by actual session data if it exists
  phone: "+998 90 123 45 67",
  coins: 1500,
  stats: [
    { subject: "Mathematics", percentage: 85, color: "bg-blue-500" },
    { subject: "English", percentage: 60, color: "bg-yellow-500" }
  ],
  history: [
    { 
      id: 101, 
      title: "Winter Math Olympiad", 
      date: "2025-01-20", 
      score: "18/20", 
      hasCertificate: true,
      status: 'completed'
    },
    { 
      id: 102, 
      title: "Spring English Grammar", 
      date: "2025-02-10", 
      score: "0/20", 
      hasCertificate: false,
      status: 'missed'
    }
  ]
};
