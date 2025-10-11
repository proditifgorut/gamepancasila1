import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { User, Question } from '../types';
import { initialUsers } from '../lib/users';
import { questions as initialQuestions } from '../lib/mockData';

interface GameState {
  users: User[];
  questions: { [key: string]: Question[] };
  currentUser: User | null;
  authStatus: 'checking' | 'authenticated' | 'unauthenticated';
  isQuizOpen: boolean;
  activeLevelId: string | null;
  login: (credentials: { email: string; password?: string }) => boolean;
  logout: () => void;
  finishInitialCheck: () => void;
  addStudent: (studentData: { name: string; email: string; password: string }) => void;
  addXp: (amount: number) => void;
  openQuiz: (levelId: string) => void;
  closeQuiz: () => void;
  completeLevel: (levelId: number) => void;
  setLevelScore: (levelId: string, score: number, total: number) => void;
  addQuestion: (levelId: string, questionData: Omit<Question, 'id' | 'type'>) => void;
  updateQuestion: (levelId: string, updatedQuestion: Question) => void;
  deleteQuestion: (levelId: string, questionId: string) => void;
}

const useGameStore = create<GameState>((set, get) => ({
  users: initialUsers,
  questions: initialQuestions,
  currentUser: null,
  authStatus: 'checking',
  isQuizOpen: false,
  activeLevelId: null,

  login: ({ email, password }) => {
    const user = password 
        ? get().users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password)
        : get().users.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (user) {
      set({ currentUser: user, authStatus: 'authenticated' });
      return true;
    }
    return false;
  },

  logout: () => set({ currentUser: null, authStatus: 'unauthenticated' }),
  
  finishInitialCheck: () => set({ authStatus: 'unauthenticated' }),

  addStudent: (studentData) => {
    const newUser: User = {
      id: uuidv4(),
      ...studentData,
      role: 'student',
      avatarUrl: `https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/100x100/CBD5E1/1F2937/png?text=${studentData.name.charAt(0).toUpperCase()}`,
      xp: 0,
      completedLevels: [],
      levelScores: {},
    };
    set(state => ({ users: [...state.users, newUser] }));
  },

  addXp: (amount) => {
    set(state => {
      if (!state.currentUser) return {};
      const updatedUser = { ...state.currentUser, xp: state.currentUser.xp + amount };
      const updatedUsers = state.users.map(u => u.id === updatedUser.id ? updatedUser : u);
      return { currentUser: updatedUser, users: updatedUsers };
    });
  },

  openQuiz: (levelId) => set({ isQuizOpen: true, activeLevelId: levelId }),
  
  closeQuiz: () => set({ isQuizOpen: false, activeLevelId: null }),

  completeLevel: (levelId) => {
    set(state => {
      if (!state.currentUser) return {};
      const alreadyCompleted = state.currentUser.completedLevels.includes(levelId);
      if (alreadyCompleted) return {};

      const updatedCompletedLevels = [...state.currentUser.completedLevels, levelId].sort((a, b) => a - b);
      const updatedUser = { ...state.currentUser, completedLevels: updatedCompletedLevels };
      const updatedUsers = state.users.map(u => u.id === updatedUser.id ? updatedUser : u);

      return { currentUser: updatedUser, users: updatedUsers };
    });
  },

  setLevelScore: (levelId, score, total) => {
    set(state => {
      if (!state.currentUser) return {};
      const updatedLevelScores = {
        ...state.currentUser.levelScores,
        [levelId]: { score, total },
      };
      const updatedUser = { ...state.currentUser, levelScores: updatedLevelScores };
      const updatedUsers = state.users.map(u => u.id === updatedUser.id ? updatedUser : u);
      return { currentUser: updatedUser, users: updatedUsers };
    });
  },
  
  addQuestion: (levelId, questionData) => {
    set(state => {
      const newQuestion: Question = {
        id: uuidv4(),
        type: 'mcq',
        ...questionData,
      };
      const levelQuestions = state.questions[levelId] ? [...state.questions[levelId], newQuestion] : [newQuestion];
      return {
        questions: {
          ...state.questions,
          [levelId]: levelQuestions,
        },
      };
    });
  },

  updateQuestion: (levelId, updatedQuestion) => {
    set(state => {
      const levelQuestions = state.questions[levelId]?.map(q => 
        q.id === updatedQuestion.id ? updatedQuestion : q
      );
      return {
        questions: {
          ...state.questions,
          [levelId]: levelQuestions,
        },
      };
    });
  },

  deleteQuestion: (levelId, questionId) => {
    set(state => {
      const levelQuestions = state.questions[levelId]?.filter(q => q.id !== questionId);
      return {
        questions: {
          ...state.questions,
          [levelId]: levelQuestions,
        },
      };
    });
  },
}));

export const useAuth = () => useGameStore(state => ({
  authStatus: state.authStatus,
  currentUser: state.currentUser,
  login: state.login,
  logout: state.logout,
  finishInitialCheck: state.finishInitialCheck,
}));

export const useStudentData = () => useGameStore(state => ({
  currentUser: state.currentUser,
  addXp: state.addXp,
  completeLevel: state.completeLevel,
  setLevelScore: state.setLevelScore,
}));

export const useQuiz = () => useGameStore(state => ({
  isQuizOpen: state.isQuizOpen,
  activeLevelId: state.activeLevelId,
  openQuiz: state.openQuiz,
  closeQuiz: state.closeQuiz,
  questions: state.questions,
}));

export const useTeacherData = () => useGameStore(state => ({
  students: state.users.filter(u => u.role === 'student'),
  addStudent: state.addStudent,
}));

export const useQuestionData = () => useGameStore(state => ({
    questions: state.questions,
    addQuestion: state.addQuestion,
    updateQuestion: state.updateQuestion,
    deleteQuestion: state.deleteQuestion,
}));

export { useGameStore };
