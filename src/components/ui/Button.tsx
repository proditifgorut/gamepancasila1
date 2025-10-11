import React from 'react';
import { motion } from 'framer-motion';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost';
  children: React.ReactNode;
};

export const Button: React.FC<Props> = ({ variant = 'primary', children, className, ...rest }) => {
  const baseClasses = "px-6 py-3 rounded-xl font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 ease-in-out shadow-sm disabled:opacity-50 disabled:cursor-not-allowed text-base";

  const variantClasses = {
    primary: 'bg-brand-blue text-white hover:bg-blue-700 focus:ring-brand-blue',
    secondary: 'bg-amber-400 text-gray-800 hover:bg-amber-500 focus:ring-amber-400',
    ghost: 'bg-transparent border border-gray-300 text-gray-800 hover:bg-gray-100',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...rest}
    >
      {children}
    </motion.button>
  );
};
