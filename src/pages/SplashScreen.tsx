import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';
import { useAuth } from '../store/useGameStore';

export const SplashScreen: React.FC = () => {
  const { finishInitialCheck } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => {
      finishInitialCheck();
    }, 2500); // 2.5 seconds

    return () => clearTimeout(timer);
  }, [finishInitialCheck]);

  return (    <div className="flex flex-col items-center justify-center min-h-screen bg-brand-blue">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
        className="flex flex-col items-center text-white"
      >
        <ShieldCheck size={80} />
        <h1 className="text-4xl font-bold mt-4 drop-shadow-md">Petualangan</h1>
        <h2 className="text-3xl font-semibold drop-shadow-md">Nilai Pancasila</h2>
      </motion.div>
    </div>
  );
};
