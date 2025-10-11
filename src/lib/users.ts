import { User } from '../types';

// --- DEFAULT ACCOUNTS FOR TESTING ---
// Admin:   admin@sekolah.id / password123
// Teacher: guru@sekolah.id / password123
// Student: budi@example.com / password123

export const initialUsers: User[] = [
  // Admin Account
  {
    id: 'admin-1',
    name: 'Admin Utama',
    email: 'admin@sekolah.id',
    password: 'password123',
    role: 'admin',
    avatarUrl: 'https://img-wrapper.vercel.app/image?url=https://placehold.co/100x100/1F2937/FFFFFF/png?text=A',
    xp: 0,
    completedLevels: [],
    levelScores: {},
  },
  // Teacher Account
  {
    id: 'teacher-1',
    name: 'Ibu Guru',
    email: 'guru@sekolah.id',
    password: 'password123',
    role: 'teacher',
    avatarUrl: 'https://img-wrapper.vercel.app/image?url=https://placehold.co/100x100/818CF8/FFFFFF/png?text=G',
    xp: 0,
    completedLevels: [],
    levelScores: {},
  },
  // Student Accounts
  {
    id: 'student-1',
    name: 'Citra Kirana',
    email: 'citra.kirana@example.com',
    password: 'password123',
    role: 'student',
    avatarUrl: 'https://img-wrapper.vercel.app/image?url=https://placehold.co/100x100/34D399/1F2937/png?text=C',
    xp: 1660,
    completedLevels: [1, 2],
    levelScores: {
      '1': { score: 3, total: 3 },
      '2': { score: 3, total: 3 },
      '3': { score: 2, total: 3 },
    },
  },
  {
    id: 'student-2',
    name: 'Eko Prasetyo',
    email: 'eko.prasetyo@example.com',
    password: 'password123',
    role: 'student',
    avatarUrl: 'https://img-wrapper.vercel.app/image?url=https://placehold.co/100x100/F87171/1F2937/png?text=E',
    xp: 330,
    completedLevels: [1],
     levelScores: {
      '1': { score: 3, total: 3 },
      '2': { score: 1, total: 3 },
    },
  },
  {
    id: 'student-3',
    name: 'Dewi Lestari',
    email: 'dewi.lestari@example.com',
    password: 'password123',
    role: 'student',
    avatarUrl: 'https://img-wrapper.vercel.app/image?url=https://placehold.co/100x100/60A5FA/1F2937/png?text=D',
    xp: 5000,
    completedLevels: [1, 2, 3, 4, 5],
    levelScores: {
      '1': { score: 3, total: 3 },
      '2': { score: 3, total: 3 },
      '3': { score: 3, total: 3 },
      '4': { score: 3, total: 3 },
      '5': { score: 3, total: 3 },
    },
  },
  {
    id: 'student-4',
    name: 'Agus Santoso',
    email: 'agus.santoso@example.com',
    password: 'password123',
    role: 'student',
    avatarUrl: 'https://img-wrapper.vercel.app/image?url=https://placehold.co/100x100/A78BFA/1F2937/png?text=A',
    xp: 2000,
    completedLevels: [1, 2],
    levelScores: {
      '1': { score: 3, total: 3 },
      '2': { score: 3, total: 3 },
    },
  },
  {
    id: 'student-5',
    name: 'Budi (Siswa Default)',
    email: 'budi@example.com',
    password: 'password123',
    role: 'student',
    avatarUrl: 'https://img-wrapper.vercel.app/image?url=https://placehold.co/100x100/FBBF24/1F2937/png?text=B',
    xp: 1250,
    completedLevels: [],
    levelScores: {},
  },
];
