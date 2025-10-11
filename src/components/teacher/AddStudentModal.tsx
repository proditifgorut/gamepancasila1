import React, { useState, Fragment } from 'react';
import { Dialog, DialogPanel, DialogTitle, Transition } from '@headlessui/react';
import { Button } from '../ui/Button';
import { X, User, Mail, KeyRound } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onAddStudent: (student: { name: string; email: string; password: string }) => void;
}

export const AddStudentModal: React.FC<Props> = ({ isOpen, onClose, onAddStudent }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      // Basic validation
      return;
    }
    onAddStudent({ name, email, password });
    setName('');
    setEmail('');
    setPassword('');
    onClose();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" aria-hidden="true" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-md space-y-6 rounded-2xl bg-white p-6 shadow-xl">
                <DialogTitle as="h3" className="text-xl font-bold text-gray-800 flex justify-between items-center">
                  Buat Akun Siswa Baru
                  <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100">
                    <X size={20} />
                  </button>
                </DialogTitle>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="text-sm font-medium text-gray-700">Nama Lengkap</label>
                    <div className="relative mt-1">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <User className="h-5 w-5 text-gray-400" />
                      </span>
                      <input 
                        type="text" 
                        id="name" 
                        placeholder="Contoh: Budi Santoso" 
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-brand-blue focus:border-brand-blue" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
                    <div className="relative mt-1">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </span>
                      <input 
                        type="email" 
                        id="email" 
                        placeholder="contoh@email.com" 
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
                  <div className="flex justify-end pt-4">
                    <Button type="submit" variant="primary">
                      Buat Akun
                    </Button>
                  </div>
                </form>
              </DialogPanel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
