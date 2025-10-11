import React, { useState, Fragment, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogPanel, DialogTitle, Transition } from '@headlessui/react';
import { useQuiz, useStudentData } from '../../store/useGameStore';
import { Button } from '../ui/Button';
import { X, CheckCircle, XCircle, Award } from 'lucide-react';

type QuizState = 'answering' | 'showing_result' | 'completed';

export const QuizModal: React.FC = () => {
  const { isQuizOpen, closeQuiz, activeLevelId, questions: allQuestions } = useQuiz();
  const { addXp, completeLevel, setLevelScore, currentUser } = useStudentData();
  const navigate = useNavigate();

  const [quizState, setQuizState] = useState<QuizState>('answering');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [newLevelUnlocked, setNewLevelUnlocked] = useState(false);

  const questions = activeLevelId ? allQuestions[activeLevelId] : [];
  const currentQuestion = questions?.[currentQuestionIndex];

  useEffect(() => {
    // Reset state when modal is opened for a new quiz
    if (isQuizOpen) {
      setQuizState('answering');
      setCurrentQuestionIndex(0);
      setSelectedAnswer(null);
      setIsCorrect(null);
      setScore(0);
      setNewLevelUnlocked(false);
    }
  }, [isQuizOpen, activeLevelId]);

  const handleClose = () => {
    closeQuiz();
  };

  const handleAnswerSubmit = () => {
    if (selectedAnswer === null) return;

    const correct = selectedAnswer === currentQuestion.answer;
    setIsCorrect(correct);
    if (correct) {
      setScore(prev => prev + 1);
    }
    setQuizState('showing_result');
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setQuizState('answering');
      setSelectedAnswer(null);
      setIsCorrect(null);
    } else {
      // Quiz finished
      if (activeLevelId && currentUser) {
        setLevelScore(activeLevelId, score, questions.length);
        addXp(score * 100);

        const levelIdNum = parseInt(activeLevelId, 10);
        const passed = score > questions.length / 2;
        const notYetCompleted = !currentUser.completedLevels.includes(levelIdNum);

        if (passed && notYetCompleted) {
            completeLevel(levelIdNum);
            if (levelIdNum < 5) { // Don't show for the last level in the modal
                setNewLevelUnlocked(true);
            }
        }
        
        // If this is the final level and it was passed, navigate to completion page
        if (levelIdNum === 5 && passed) {
            handleClose(); // Close the modal first
            navigate('/completion'); // Then navigate
            return; // Stop further execution in this modal
        }
      }
      setQuizState('completed');
    }
  };

  const getOptionClasses = (index: number) => {
    if (quizState === 'showing_result') {
      if (index === currentQuestion.answer) {
        return 'border-green-500 bg-green-50 text-green-800';
      }
      if (index === selectedAnswer && !isCorrect) {
        return 'border-red-500 bg-red-50 text-red-800';
      }
      return 'border-gray-200 bg-gray-50 text-gray-500';
    }
    return selectedAnswer === index
      ? 'border-brand-blue bg-blue-50'
      : 'border-gray-200 hover:border-blue-300';
  };

  if (!isQuizOpen || !currentQuestion) return null;

  return (
    <Transition appear show={isQuizOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={handleClose}>
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
              <DialogPanel className="w-full max-w-lg space-y-4 rounded-2xl bg-white p-6 shadow-xl">
                {quizState !== 'completed' ? (
                  <>
                    <DialogTitle as="h3" className="text-xl font-bold text-gray-800 flex justify-between items-center">
                      Kuis Sila {activeLevelId}
                      <button onClick={handleClose} className="p-1 rounded-full hover:bg-gray-100">
                        <X size={20} />
                      </button>
                    </DialogTitle>
                    
                    <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-2 bg-brand-blue rounded-full transition-all duration-500" style={{width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`}}></div>
                    </div>

                    <p className="text-gray-700 text-lg pt-2">{currentQuestion.question}</p>

                    <div className="space-y-3">
                      {currentQuestion.options.map((option, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedAnswer(index)}
                          disabled={quizState === 'showing_result'}
                          className={`w-full text-left p-4 rounded-lg border-2 transition-all flex items-center justify-between ${getOptionClasses(index)}`}
                        >
                          <span className="font-medium">{option}</span>
                          {quizState === 'showing_result' && index === currentQuestion.answer && <CheckCircle className="text-green-600" />}
                          {quizState === 'showing_result' && index === selectedAnswer && !isCorrect && <XCircle className="text-red-600" />}
                        </button>
                      ))}
                    </div>

                    {quizState === 'showing_result' && (
                        <div className={`p-4 rounded-lg ${isCorrect ? 'bg-green-50' : 'bg-red-50'}`}>
                            <h4 className={`font-bold ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>{isCorrect ? 'Jawaban Benar!' : 'Jawaban Salah'}</h4>
                            <p className="text-sm text-gray-600 mt-1">{currentQuestion.explanation}</p>
                        </div>
                    )}

                    <div className="flex justify-end pt-4">
                      {quizState === 'answering' && (
                        <Button variant="primary" disabled={selectedAnswer === null} onClick={handleAnswerSubmit}>
                          Jawab
                        </Button>
                      )}
                      {quizState === 'showing_result' && (
                        <Button variant="secondary" onClick={handleNext}>
                          {currentQuestionIndex < questions.length - 1 ? 'Lanjutkan' : 'Lihat Hasil'}
                        </Button>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8">
                      <Award size={64} className="mx-auto text-amber-500" />
                      <h3 className="text-2xl font-bold text-gray-800 mt-4">Kuis Selesai!</h3>
                      <p className="text-gray-600 mt-2">Kamu berhasil menyelesaikan kuis untuk Sila {activeLevelId}.</p>
                      <div className="mt-6 bg-blue-50 p-4 rounded-lg">
                        <p className="text-lg">Skor Akhir:</p>
                        <p className="text-4xl font-bold text-brand-blue">{score} / {questions.length}</p>
                        <p className="font-semibold text-green-600 mt-2">+ {score * 100} XP</p>
                      </div>
                      {newLevelUnlocked && (
                        <div className="mt-6 text-lg font-semibold text-amber-600 animate-pulse">
                            <p>🎉 Pulau Baru Terbuka! 🎉</p>
                        </div>
                      )}
                      <Button variant="primary" onClick={handleClose} className="mt-8">
                        Tutup
                      </Button>
                  </div>
                )}
              </DialogPanel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
