import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Mail, KeyRound, AlertCircle, UserCog, User, Shield } from 'lucide-react';
import { useAuth } from '../store/useGameStore';
import { Button } from '../components/ui/Button';

export const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login({ email, password });
    if (!success) {
      setError('Email atau password salah. Silakan coba lagi.');
    } else {
      setError('');
    }
  };

  const handleQuickLogin = (email: string) => {
    login({ email });
  };

  return (
    <div className="min-h-screen bg-brand-light-blue flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm bg-white rounded-2xl shadow-main p-8"
      >
        <div className="text-center mb-8">
          <ShieldCheck className="mx-auto text-brand-blue" size={48} />
          <h1 className="text-2xl font-bold text-brand-black mt-2">Selamat Datang!</h1>
          <p className="text-gray-500">Masuk untuk memulai petualanganmu.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
            <div className="relative mt-1">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <Mail className="h-5 w-5 text-gray-400" />
              </span>
              <input 
                type="email" 
                id="email" 
                placeholder="kamu@email.com" 
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-brand-blue focus:border-brand-blue"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="password"  className="text-sm font-medium text-gray-700">Password</label>
            <div className="relative mt-1">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <KeyRound className="h-5 w-5 text-gray-400" />
              </span>
              <input 
                type="password" 
                id="password" 
                placeholder="••••••••" 
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-brand-blue focus:border-brand-blue"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          
          {error && (
            <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 p-3 rounded-lg">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          <Button type="submit" variant="primary" className="w-full">
            Masuk
          </Button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Atau coba masuk sebagai</span>
          </div>
        </div>

        <div className="space-y-2">
            <Button variant="ghost" className="w-full flex items-center justify-center gap-2" onClick={() => handleQuickLogin('admin@sekolah.id')}>
                <Shield size={16} />
                Admin
            </Button>
            <Button variant="ghost" className="w-full flex items-center justify-center gap-2" onClick={() => handleQuickLogin('guru@sekolah.id')}>
                <UserCog size={16} />
                Guru
            </Button>
            <Button variant="ghost" className="w-full flex items-center justify-center gap-2" onClick={() => handleQuickLogin('budi@example.com')}>
                <User size={16} />
                Siswa
            </Button>
        </div>
      </motion.div>
    </div>
  );
};
