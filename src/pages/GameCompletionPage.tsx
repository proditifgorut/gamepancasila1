import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useStudentData } from '../store/useGameStore';
import { Button } from '../components/ui/Button';
import { PartyPopper } from 'lucide-react';
import { levels } from '../lib/mockData';

const getAnalysis = (percentage: number) => {
  if (percentage >= 80) {
    return {
      title: "Luar Biasa!",
      message: "Pemahamanmu tentang nilai-nilai Pancasila sangat baik! Teruslah menjadi teladan bagi teman-temanmu dalam kehidupan sehari-hari.",
      color: "text-green-600",
    };
  }
  if (percentage >= 50) {
    return {
      title: "Kerja Bagus!",
      message: "Kamu sudah memahami dasar-dasar nilai Pancasila. Teruslah belajar dan berlatih untuk memperdalam pemahamanmu.",
      color: "text-blue-600",
    };
  }
  return {
    title: "Terus Semangat!",
    message: "Terima kasih sudah berpartisipasi! Setiap petualangan adalah kesempatan belajar. Jangan berkecil hati, coba lagi untuk lebih memahami nilai-nilai luhur kita.",
    color: "text-amber-600",
  };
};

export const GameCompletionPage: React.FC = () => {
  const { currentUser } = useStudentData();

  if (!currentUser) return null;

  const totalScore = Object.values(currentUser.levelScores).reduce((sum, record) => sum + record.score, 0);
  const totalQuestions = Object.values(currentUser.levelScores).reduce((sum, record) => sum + record.total, 0);
  const percentage = totalQuestions > 0 ? (totalScore / totalQuestions) * 100 : 0;
  
  const analysis = getAnalysis(percentage);

  return (
    <div className="min-h-screen bg-brand-light-blue flex flex-col items-center justify-center p-4 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2, type: 'spring' }}
        className="w-full max-w-2xl bg-white rounded-2xl shadow-main p-8 md:p-12"
      >
        <PartyPopper size={64} className="mx-auto text-amber-500" />
        <h1 className="text-3xl md:text-4xl font-bold text-brand-black mt-4">
          Selamat, {currentUser?.name}!
        </h1>
        <p className="text-gray-600 mt-2 text-lg">
          Kamu telah menyelesaikan seluruh Petualangan Pancasila!
        </p>

        <div className="mt-8 bg-gray-50 p-6 rounded-xl">
          <h2 className="font-bold text-xl">Analisis Pemahamanmu</h2>
          <div className="mt-4">
            <p className={`text-2xl font-bold ${analysis.color}`}>{analysis.title}</p>
            <p className="text-gray-700 mt-2">{analysis.message}</p>
          </div>
          <div className="mt-6">
            <p className="text-sm text-gray-500">Skor Total</p>
            <p className="text-3xl font-bold text-brand-blue">
              {totalScore} <span className="text-xl text-gray-400">/ {totalQuestions}</span>
            </p>
          </div>
        </div>
        
        <div className="mt-8">
            <h3 className="font-bold text-lg">Rangkuman Skor per Sila:</h3>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-4 mt-4">
                {levels.map(level => {
                    const record = currentUser.levelScores[level.id];
                    return (
                        <div key={level.id} className="flex flex-col items-center p-2 bg-blue-50 rounded-lg">
                            <span className="text-2xl">{level.symbol}</span>
                            <span className="font-semibold text-sm mt-1">{`Sila ${level.id}`}</span>
                            <span className="text-xs text-gray-500">{record ? `${record.score}/${record.total}` : 'N/A'}</span>
                        </div>
                    )
                })}
            </div>
        </div>

        <Link to="/" className="mt-10 inline-block">
          <Button variant="primary">
            Kembali ke Peta
          </Button>
        </Link>
      </motion.div>
    </div>
  );
};
