import React, { useState } from 'react';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import { useQuestionData } from '../../store/useGameStore';
import { Button } from '../ui/Button';
import { levels } from '../../lib/mockData';
import { Question } from '../../types';
import { QuestionEditorModal } from './QuestionEditorModal';

export const QuestionManagementView: React.FC = () => {
  const { questions, addQuestion, updateQuestion, deleteQuestion } = useQuestionData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [activeLevelId, setActiveLevelId] = useState<string>('1');

  const handleOpenModal = (question: Question | null = null, levelId: string) => {
    setEditingQuestion(question);
    setActiveLevelId(levelId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingQuestion(null);
  };

  const handleSaveQuestion = (data: Omit<Question, 'id' | 'type'>, levelId: string) => {
    if (editingQuestion) {
      updateQuestion(levelId, { ...editingQuestion, ...data });
    } else {
      addQuestion(levelId, data);
    }
    handleCloseModal();
  };

  const handleDelete = (levelId: string, questionId: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus soal ini?')) {
      deleteQuestion(levelId, questionId);
    }
  };

  return (
    <>
      <div className="bg-white rounded-2xl shadow-main p-6">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Manajemen Soal Kuis</h2>
          <Button variant="primary" onClick={() => handleOpenModal(null, activeLevelId)}>
            <PlusCircle size={16} className="mr-2" />
            Tambah Soal Baru
          </Button>
        </div>

        <div>
          {levels.map(level => (
            <div key={level.id} className="mb-8 last:mb-0">
              <h3 className="text-lg font-bold text-brand-blue mb-4 border-b pb-2">{`Sila ${level.id}: ${level.description}`}</h3>
              <div className="space-y-4">
                {questions[level.id] && questions[level.id].length > 0 ? (
                  questions[level.id].map((q, index) => (
                    <div key={q.id} className="bg-gray-50 p-4 rounded-lg">
                      <p className="font-semibold text-gray-800">{index + 1}. {q.question}</p>
                      <ul className="list-disc list-inside mt-2 text-gray-600 text-sm space-y-1">
                        {q.options.map((opt, i) => (
                          <li key={i} className={i === q.answer ? 'font-bold text-green-600' : ''}>
                            {opt}
                          </li>
                        ))}
                      </ul>
                      <p className="text-xs text-gray-500 mt-2 italic">Penjelasan: {q.explanation}</p>
                      <div className="flex items-center gap-2 mt-3">
                        <Button variant="ghost" className="px-3 py-1 text-sm" onClick={() => handleOpenModal(q, String(level.id))}>
                          <Edit size={14} className="mr-1" /> Edit
                        </Button>
                        <Button variant="ghost" className="px-3 py-1 text-sm text-red-600 hover:bg-red-50" onClick={() => handleDelete(String(level.id), q.id)}>
                          <Trash2 size={14} className="mr-1" /> Hapus
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">Belum ada soal untuk sila ini.</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <QuestionEditorModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveQuestion}
        initialData={editingQuestion}
        levelId={activeLevelId}
      />
    </>
  );
};
