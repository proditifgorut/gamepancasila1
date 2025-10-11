import React, { useState, useEffect, Fragment } from 'react';
import { Dialog, DialogPanel, DialogTitle, Transition } from '@headlessui/react';
import { Button } from '../ui/Button';
import { X } from 'lucide-react';
import { Question } from '../../types';
import { levels } from '../../lib/mockData';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Omit<Question, 'id' | 'type'>, levelId: string) => void;
  initialData?: Question | null;
  levelId: string;
}

export const QuestionEditorModal: React.FC<Props> = ({ isOpen, onClose, onSave, initialData, levelId: initialLevelId }) => {
  const [levelId, setLevelId] = useState(initialLevelId);
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [answer, setAnswer] = useState(0);
  const [explanation, setExplanation] = useState('');

  useEffect(() => {
    setLevelId(initialLevelId);
    if (initialData) {
      setQuestion(initialData.question);
      setOptions(initialData.options);
      setAnswer(initialData.answer);
      setExplanation(initialData.explanation);
    } else {
      // Reset form for new question
      setQuestion('');
      setOptions(['', '', '', '']);
      setAnswer(0);
      setExplanation('');
    }
  }, [initialData, initialLevelId, isOpen]);

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (question && options.every(opt => opt.trim() !== '') && explanation) {
      onSave({ question, options, answer, explanation }, levelId);
    } else {
      alert('Semua field harus diisi!');
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" aria-hidden="true" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
              <DialogPanel className="w-full max-w-2xl space-y-6 rounded-2xl bg-white p-6 shadow-xl">
                <DialogTitle as="h3" className="text-xl font-bold text-gray-800 flex justify-between items-center">
                  {initialData ? 'Edit Soal' : 'Buat Soal Baru'}
                  <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100"><X size={20} /></button>
                </DialogTitle>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="level" className="text-sm font-medium text-gray-700">Sila (Level)</label>
                    <select id="level" value={levelId} onChange={e => setLevelId(e.target.value)} className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring-brand-blue focus:border-brand-blue">
                      {levels.map(l => <option key={l.id} value={l.id}>{`Sila ${l.id}: ${l.description}`}</option>)}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="question" className="text-sm font-medium text-gray-700">Teks Pertanyaan</label>
                    <textarea id="question" value={question} onChange={e => setQuestion(e.target.value)} required rows={3} className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring-brand-blue focus:border-brand-blue" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Opsi Jawaban & Jawaban Benar</label>
                    <div className="mt-1 space-y-2">
                      {options.map((opt, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <input type="radio" name="correct-answer" checked={answer === index} onChange={() => setAnswer(index)} className="h-4 w-4 text-brand-blue focus:ring-brand-blue"/>
                          <input type="text" placeholder={`Opsi ${index + 1}`} value={opt} onChange={e => handleOptionChange(index, e.target.value)} required className="w-full p-2 border border-gray-300 rounded-lg focus:ring-brand-blue focus:border-brand-blue" />
                        </div>
                      ))}
                    </div>
                  </div>
                   <div>
                    <label htmlFor="explanation" className="text-sm font-medium text-gray-700">Penjelasan Jawaban</label>
                    <textarea id="explanation" value={explanation} onChange={e => setExplanation(e.target.value)} required rows={2} className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring-brand-blue focus:border-brand-blue" />
                  </div>
                  <div className="flex justify-end pt-4 gap-2">
                     <Button type="button" variant="ghost" onClick={onClose}>Batal</Button>
                     <Button type="submit" variant="primary">Simpan Soal</Button>
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
