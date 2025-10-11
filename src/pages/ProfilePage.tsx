import React from 'react';
import { useStudentData } from '../store/useGameStore';
import { Link } from 'react-router-dom';
import { ArrowLeft, Star } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { levels } from '../lib/mockData';

const Badge: React.FC<{ levelId: number; symbol: string; isUnlocked: boolean }> = ({ levelId, symbol, isUnlocked }) => {
  return (
    <div className={`flex flex-col items-center gap-1 transition-opacity ${isUnlocked ? 'opacity-100' : 'opacity-30'}`}>
      <div className={`w-16 h-16 rounded-full flex items-center justify-center ${isUnlocked ? 'bg-amber-100' : 'bg-gray-200'}`}>
        <span className="text-3xl">{symbol}</span>
      </div>
      <p className="text-xs text-center font-semibold text-gray-600">{`Sila ${levelId}`}</p>
    </div>
  );
};


export const ProfilePage: React.FC = () => {
  const { currentUser } = useStudentData();

  if (!currentUser) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-2xl font-bold">Profil tidak ditemukan</h2>
        <Link to="/">
          <Button className="mt-4">Kembali</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <header className="flex items-center">
        <Link to="/" className="flex items-center gap-2 text-gray-700 hover:text-brand-blue">
          <ArrowLeft size={20} />
          <span className="font-semibold">Kembali</span>
        </Link>
      </header>
      <main className="max-w-md mx-auto mt-8">
        <div className="bg-white rounded-2xl shadow-main p-8 flex flex-col items-center">
          <img src={currentUser.avatarUrl} alt={currentUser.name} className="w-24 h-24 rounded-full border-4 border-amber-300 -mt-20" />
          <h1 className="text-2xl font-bold mt-4">{currentUser.name}</h1>
          <div className="flex items-center gap-2 mt-2 bg-amber-100 text-amber-700 px-4 py-1 rounded-full">
            <Star size={16} className="fill-current" />
            <span className="font-semibold">{currentUser.xp.toLocaleString()} XP</span>
          </div>

          <div className="w-full mt-8">
            <h2 className="font-bold text-lg text-gray-700">Lencana Penghargaan</h2>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-4 mt-4">
              {levels.map(level => (
                <Badge 
                  key={level.id}
                  levelId={level.id}
                  symbol={level.symbol}
                  isUnlocked={currentUser.completedLevels.includes(level.id)}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
