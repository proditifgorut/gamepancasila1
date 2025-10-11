import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './store/useGameStore';
import { HomePage } from './pages/HomePage';
import { LevelPage } from './pages/LevelPage';
import { ProfilePage } from './pages/ProfilePage';
import { QuizModal } from './components/game/QuizModal';
import { GameCompletionPage } from './pages/GameCompletionPage';
import { TeacherDashboardPage } from './pages/TeacherDashboardPage';

export function MainApp() {
  const { currentUser } = useAuth();

  if (!currentUser) {
    // This can happen briefly on logout before App.tsx redirects.
    // Or if the auth state is somehow inconsistent.
    // Redirecting to login is a safe fallback.
    return (
      <Router>
        <Routes>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    );
  }

  return (
    <Router>
      {currentUser.role === 'teacher' || currentUser.role === 'admin' ? (
        // --- TEACHER & ADMIN ROUTES ---
        <Routes>
          <Route path="/teacher-dashboard" element={<TeacherDashboardPage />} />
          <Route path="*" element={<Navigate to="/teacher-dashboard" replace />} />
        </Routes>
      ) : (
        // --- STUDENT ROUTES ---
        <>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/level/:levelId" element={<LevelPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/completion" element={<GameCompletionPage />} />
            {/* Prevent students from accessing teacher dashboard directly */}
            <Route path="/teacher-dashboard" element={<Navigate to="/" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <QuizModal />
        </>
      )}
    </Router>
  );
}
