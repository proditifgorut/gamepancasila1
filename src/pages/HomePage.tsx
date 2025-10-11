import React from 'react';
import { motion } from 'framer-motion';
import { Header } from '../components/layout/Header';
import { LevelCard } from '../components/game/LevelCard';
import { levels } from '../lib/mockData';
import { useStudentData } from '../store/useGameStore';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

export const HomePage: React.FC = () => {
  const { currentUser } = useStudentData();

  if (!currentUser) return null;

  return (
    <div className="min-h-screen bg-brand-light-blue bg-cover bg-center" style={{ backgroundImage: "url('/assets/images/bg-pattern.svg')"}}>
      <Header />
      <main className="p-4 md:p-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-brand-black">Petualangan Pancasila</h1>
          <p className="text-gray-600 mt-2">Pilih sebuah pulau untuk memulai petualanganmu!</p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 max-w-4xl mx-auto"
        >
          {levels.map((level) => {
            const isLocked = level.id > 1 && !currentUser.completedLevels.includes(level.id - 1);
            return (
              <motion.div key={level.id} variants={itemVariants}>
                <LevelCard level={level} isLocked={isLocked} />
              </motion.div>
            );
          })}
        </motion.div>
      </main>
    </div>
  );
};
