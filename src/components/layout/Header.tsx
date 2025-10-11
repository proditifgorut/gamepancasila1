import React from 'react';
import { useAuth } from '../../store/useGameStore';
import { Star, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export const Header: React.FC = () => {
  const { currentUser, logout } = useAuth();

  if (!currentUser) return null;

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="w-full max-w-4xl mx-auto p-4 flex items-center justify-between"
    >
      <Link to="/profile" className="flex items-center gap-3 group">
        <img src={currentUser.avatarUrl} alt={currentUser.name} className="w-12 h-12 rounded-full border-2 border-white shadow-md group-hover:scale-110 transition-transform" />
        <div>
          <p className="font-semibold text-gray-700">{currentUser.name}</p>
          <div className="flex items-center gap-1 text-amber-500">
            <Star size={16} className="fill-current" />
            <span className="font-bold">{currentUser.xp.toLocaleString()}</span>
          </div>
        </div>
      </Link>
      <button onClick={logout} className="p-3 rounded-full bg-white/50 backdrop-blur-sm hover:bg-white transition-colors shadow-sm" title="Keluar">
        <LogOut size={24} className="text-red-500" />
      </button>
    </motion.header>
  );
};
