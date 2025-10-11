import React, { useState } from 'react';
import { LogOut, Users, BookCopy } from 'lucide-react';
import { useAuth } from '../store/useGameStore';
import { StudentProgressView } from '../components/teacher/StudentProgressView';
import { QuestionManagementView } from '../components/teacher/QuestionManagementView';

type Tab = 'students' | 'questions';

const TabButton: React.FC<{
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}> = ({ active, onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 text-sm sm:text-base font-semibold rounded-lg transition-colors ${
        active
          ? 'bg-brand-blue text-white shadow-sm'
          : 'text-gray-600 hover:bg-gray-100'
      }`}
    >
      {children}
    </button>
  );
};

export const TeacherDashboardPage: React.FC = () => {
  const { logout, currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>('students');

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-brand-black">Dasbor {currentUser?.role === 'admin' ? 'Admin' : 'Guru'}</h1>
          <p className="text-gray-500">Selamat datang, {currentUser?.name}!</p>
        </div>
        <button onClick={logout} className="p-3 rounded-full bg-white hover:bg-gray-100 transition-colors shadow-sm" title="Keluar">
          <LogOut size={24} className="text-red-500" />
        </button>
      </header>

      <main className="max-w-7xl mx-auto">
        <div className="mb-6">
          <div className="flex items-center gap-2 p-1.5 bg-gray-100 rounded-xl max-w-fit">
            <TabButton active={activeTab === 'students'} onClick={() => setActiveTab('students')}>
              <Users size={18} />
              Progres Siswa
            </TabButton>
            <TabButton active={activeTab === 'questions'} onClick={() => setActiveTab('questions')}>
              <BookCopy size={18} />
              Manajemen Soal
            </TabButton>
          </div>
        </div>

        {activeTab === 'students' && <StudentProgressView />}
        {activeTab === 'questions' && <QuestionManagementView />}
      </main>
    </div>
  );
};
