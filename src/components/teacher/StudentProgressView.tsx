import React, { useState } from 'react';
import { Filter, FileDown, PlusCircle, Award } from 'lucide-react';
import { useTeacherData } from '../../store/useGameStore';
import { Button } from '../ui/Button';
import { AddStudentModal } from './AddStudentModal';
import { User } from '../../types';
import { levels } from '../../lib/mockData';

const calculateProgress = (user: User): number[] => {
  return levels.map(level => {
    const scoreRecord = user.levelScores[level.id];
    if (!scoreRecord || scoreRecord.total === 0) return 0;
    return Math.round((scoreRecord.score / scoreRecord.total) * 100);
  });
};

const ProgressTracker: React.FC<{ progress: number[] }> = ({ progress }) => (
  <div className="flex items-center gap-1.5">
    {progress.map((p, index) => (
      <div key={index} className="w-full h-2.5 bg-gray-200 rounded-full" title={`Sila ${index + 1}: ${p}%`}>
        <div 
          className="h-2.5 bg-green-500 rounded-full"
          style={{ width: `${p}%` }}
        />
      </div>
    ))}
  </div>
);

export const StudentProgressView: React.FC = () => {
  const { students, addStudent } = useTeacherData();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="bg-white rounded-2xl shadow-main p-6">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Progres Siswa</h2>
          <div className="flex items-center gap-2 flex-wrap">
            <Button variant="ghost">
              <Filter size={16} className="mr-2" />
              Filter
            </Button>
            <Button variant="ghost">
              <FileDown size={16} className="mr-2" />
              Ekspor CSV
            </Button>
            <Button variant="primary" onClick={() => setIsModalOpen(true)}>
              <PlusCircle size={16} className="mr-2" />
              Tambah Siswa
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b-2 border-gray-100">
              <tr>
                <th className="p-4 text-sm font-semibold text-gray-500">Siswa</th>
                <th className="p-4 text-sm font-semibold text-gray-500 min-w-[200px]">Progres Sila</th>
                <th className="p-4 text-sm font-semibold text-gray-500">Lencana</th>
                <th className="p-4 text-sm font-semibold text-gray-500">Total XP</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50">
                  <td className="p-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <img src={student.avatarUrl} alt={student.name} className="w-10 h-10 rounded-full" />
                      <div>
                        <span className="font-semibold text-gray-800">{student.name}</span>
                        <p className="text-sm text-gray-500">{student.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <ProgressTracker progress={calculateProgress(student)} />
                  </td>
                  <td className="p-4 whitespace-nowrap">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Award size={20} className="text-amber-500" />
                      <span className="font-semibold">{student.completedLevels.length}</span>
                    </div>
                  </td>
                  <td className="p-4 text-gray-800 font-semibold whitespace-nowrap">{student.xp.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <AddStudentModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddStudent={addStudent}
      />
    </>
  );
};
