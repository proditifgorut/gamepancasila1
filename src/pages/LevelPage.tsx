import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuiz } from '../store/useGameStore';
import { levels } from '../lib/mockData';
import { Button } from '../components/ui/Button';
import { ArrowLeft } from 'lucide-react';

export const LevelPage: React.FC = () => {
  const { levelId } = useParams<{ levelId: string }>();
  const { openQuiz } = useQuiz();
  
  const level = levels.find(l => l.id.toString() === levelId);

  if (!level) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-2xl font-bold">Pulau Tidak Ditemukan</h2>
        <Link to="/">
          <Button className="mt-4">Kembali ke Peta</Button>
        </Link>
      </div>
    );
  }

  const handleStartQuiz = () => {
    if (levelId) {
      openQuiz(levelId);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white p-4">
      <header className="flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-gray-700 hover:text-brand-blue">
          <ArrowLeft size={20} />
          <span className="font-semibold">Kembali</span>
        </Link>
      </header>

      <main className="mt-8 text-center">
        <h1 className="text-4xl font-bold text-brand-black">{`Pulau ${level.id}: ${level.description}`}</h1>
        
        <div className="relative w-full max-w-2xl h-[50vh] bg-white rounded-xl shadow-md overflow-hidden mx-auto mt-8">
          <div className="absolute inset-0 flex items-center justify-center text-gray-300 text-2xl">
            Game Scene Placeholder
          </div>
        </div>

        <div className="mt-8">
          <Button variant="secondary" onClick={handleStartQuiz}>
            Mulai Kuis Sila {level.id}
          </Button>
        </div>
      </main>
    </div>
  );
};
