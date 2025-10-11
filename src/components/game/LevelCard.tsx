import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Level } from '../../types';
import { Lock } from 'lucide-react';

interface Props {
  level: Level;
  isLocked?: boolean;
}

export const LevelCard: React.FC<Props> = ({ level, isLocked = false }) => {
  const content = (
    <motion.div
      whileHover={!isLocked ? "hover" : ""}
      className={`relative w-full aspect-square rounded-2xl shadow-main overflow-hidden ${isLocked ? 'grayscale cursor-not-allowed' : 'cursor-pointer'}`}
    >
      <img src={level.islandImage} alt={`Pulau ${level.id}`} className="absolute inset-0 w-full h-full object-cover" />
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      
      <motion.div 
        variants={{ hover: { y: 0 } }}
        initial={{ y: 20 }}
        transition={{ type: 'spring', stiffness: 100 }}
        className="absolute bottom-0 left-0 p-4 text-white"
      >
        <h3 className="font-bold text-xl drop-shadow-md">{`Pulau ${level.id}`}</h3>
        <p className="text-sm opacity-90 drop-shadow-md">{level.description}</p>
      </motion.div>

      {isLocked && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <Lock size={48} className="text-white" />
        </div>
      )}
    </motion.div>
  );

  return isLocked ? <div>{content}</div> : <Link to={`/level/${level.id}`}>{content}</Link>;
};
