export interface User {
  id: string;
  name: string;
  email: string;
  password?: string; // It's here for mock purposes; in a real app, never store plaintext passwords.
  role: 'student' | 'teacher' | 'admin';
  avatarUrl: string;
  xp: number;
  completedLevels: number[];
  levelScores: Record<string, { score: number; total: number }>;
}

export interface Level {
  id: number;
  title: string;
  symbol: string;
  description: string;
  bgColor: string;
  islandImage: string;
}

export interface Question {
  id:string;
  type: 'mcq';
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

// This type can be considered a "view model" for the teacher dashboard.
// It can be derived from the main User type.
export interface StudentProgress {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  progress: number[]; // Array of completion percentages for each of the 5 levels
  badges: number;
  lastActive: string;
}
