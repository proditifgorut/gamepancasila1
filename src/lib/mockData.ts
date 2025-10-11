import { Level, Question } from '../types';

export const levels: Level[] = [
  { id: 1, title: 'Sila 1', symbol: '⭐️', description: 'Ketuhanan Yang Maha Esa', bgColor: 'bg-yellow-100', islandImage: 'https://img-wrapper.vercel.app/image?url=https://placehold.co/400x400/FBBF24/1F2937?text=Sila+1' },
  { id: 2, title: 'Sila 2', symbol: '🔗', description: 'Kemanusiaan yang Adil dan Beradab', bgColor: 'bg-red-100', islandImage: 'https://img-wrapper.vercel.app/image?url=https://placehold.co/400x400/F87171/1F2937?text=Sila+2' },
  { id: 3, title: 'Sila 3', symbol: '🌳', description: 'Persatuan Indonesia', bgColor: 'bg-green-100', islandImage: 'https://img-wrapper.vercel.app/image?url=https://placehold.co/400x400/34D399/1F2937?text=Sila+3' },
  { id: 4, title: 'Sila 4', symbol: '🐃', description: 'Kerakyatan yang Dipimpin oleh Hikmat', bgColor: 'bg-blue-100', islandImage: 'https://img-wrapper.vercel.app/image?url=https://placehold.co/400x400/60A5FA/1F2937?text=Sila+4' },
  { id: 5, title: 'Sila 5', symbol: '🌾', description: 'Keadilan Sosial bagi Seluruh Rakyat Indonesia', bgColor: 'bg-purple-100', islandImage: 'https://img-wrapper.vercel.app/image?url=https://placehold.co/400x400/A78BFA/1F2937?text=Sila+5' },
];

export const questions: { [key: string]: Question[] } = {
  '1': [
    {
      id: 'q1-1',
      type: 'mcq',
      question: 'Menghormati teman yang berbeda agama adalah contoh pengamalan Sila ke...?',
      options: ['Satu', 'Dua', 'Tiga', 'Empat'],
      answer: 0,
      explanation: 'Sila pertama, Ketuhanan Yang Maha Esa, mengajarkan kita untuk toleran dan menghormati antar umat beragama.'
    },
    {
      id: 'q1-2',
      type: 'mcq',
      question: 'Apa simbol dari Sila Pertama Pancasila?',
      options: ['Bintang', 'Rantai', 'Pohon Beringin', 'Padi dan Kapas'],
      answer: 0,
      explanation: 'Simbol Sila Pertama adalah Bintang emas yang melambangkan cahaya kerohanian dari Tuhan kepada setiap manusia.'
    },
    {
      id: 'q1-3',
      type: 'mcq',
      question: 'Berikut ini yang BUKAN merupakan contoh pengamalan Sila Pertama adalah...',
      options: ['Beribadah sesuai keyakinan', 'Tidak mengganggu teman beribadah', 'Memaksakan agama kepada orang lain', 'Bekerja sama antar umat beragama'],
      answer: 2,
      explanation: 'Memaksakan agama kepada orang lain bertentangan dengan nilai toleransi yang diajarkan dalam Sila Pertama.'
    }
  ],
  '2': [
    {
      id: 'q2-1',
      type: 'mcq',
      question: 'Membantu teman yang sedang kesusahan adalah cerminan dari Sila ke...?',
      options: ['Satu', 'Dua', 'Tiga', 'Lima'],
      answer: 1,
      explanation: 'Sila Kedua, Kemanusiaan yang Adil dan Beradab, mengajarkan kita untuk saling tolong-menolong dan peduli terhadap sesama.'
    },
    {
      id: 'q2-2',
      type: 'mcq',
      question: 'Simbol rantai emas pada Garuda Pancasila melambangkan Sila ke...?',
      options: ['Satu', 'Dua', 'Tiga', 'Empat'],
      answer: 1,
      explanation: 'Rantai emas adalah simbol Sila Kedua, yang mata rantainya saling berkaitan melambangkan hubungan manusia yang tidak terputus.'
    },
    {
      id: 'q2-3',
      type: 'mcq',
      question: 'Sikap yang sesuai dengan Sila Kedua Pancasila adalah...',
      options: ['Hanya mau berteman dengan yang seagama', 'Menjenguk teman yang sakit', 'Mengikuti upacara bendera dengan khidmat', 'Memaksakan pendapat saat musyawarah'],
      answer: 1,
      explanation: 'Menjenguk teman yang sakit menunjukkan rasa kemanusiaan dan kepedulian, yang merupakan inti dari Sila Kedua.'
    }
  ],
  '3': [
    {
      id: 'q3-1',
      type: 'mcq',
      question: 'Mengikuti upacara bendera dengan tertib menunjukkan rasa cinta terhadap...?',
      options: ['Diri sendiri', 'Tanah air', 'Sekolah', 'Keluarga'],
      answer: 1,
      explanation: 'Mengikuti upacara bendera adalah salah satu wujud cinta tanah air dan persatuan, sesuai dengan Sila Ketiga, Persatuan Indonesia.'
    },
    {
      id: 'q3-2',
      type: 'mcq',
      question: 'Simbol dari Sila Ketiga Pancasila adalah...',
      options: ['Rantai', 'Bintang', 'Pohon Beringin', 'Kepala Banteng'],
      answer: 2,
      explanation: 'Pohon Beringin adalah simbol Sila Ketiga, yang melambangkan tempat berteduh bagi seluruh rakyat Indonesia di bawah naungan negara.'
    },
    {
      id: 'q3-3',
      type: 'mcq',
      question: 'Manakah sikap yang mencerminkan Persatuan Indonesia?',
      options: ['Berteman dengan semua orang tanpa membedakan suku', 'Mengejek budaya daerah lain', 'Hanya menggunakan produk luar negeri', 'Tidak mau bekerja kelompok'],
      answer: 0,
      explanation: 'Berteman tanpa membedakan suku, ras, dan agama adalah contoh nyata dari pengamalan Sila Ketiga untuk menjaga persatuan.'
    }
  ],
  '4': [
    {
      id: 'q4-1',
      type: 'mcq',
      question: 'Memilih ketua kelas dengan cara pemungutan suara (voting) adalah contoh penerapan Sila ke...?',
      options: ['Dua', 'Tiga', 'Empat', 'Lima'],
      answer: 2,
      explanation: 'Pemilihan melalui musyawarah atau voting adalah inti dari Sila Keempat, yaitu Kerakyatan yang dipimpin oleh hikmat kebijaksanaan dalam permusyawaratan/perwakilan.'
    },
    {
      id: 'q4-2',
      type: 'mcq',
      question: 'Apa simbol untuk Sila Keempat Pancasila?',
      options: ['Padi dan Kapas', 'Kepala Banteng', 'Pohon Beringin', 'Rantai'],
      answer: 1,
      explanation: 'Kepala Banteng adalah simbol Sila Keempat, melambangkan hewan sosial yang suka berkumpul, seperti halnya musyawarah dimana orang berdiskusi.'
    },
    {
      id: 'q4-3',
      type: 'mcq',
      question: 'Ketika pendapatmu tidak diterima dalam diskusi kelompok, sikap yang baik adalah...',
      options: ['Marah dan tidak mau melanjutkan diskusi', 'Menerima keputusan bersama dengan lapang dada', 'Memaksa teman untuk menerima pendapatmu', 'Pulang dan tidak mengerjakan tugas'],
      answer: 1,
      explanation: 'Menghargai dan melaksanakan hasil musyawarah dengan ikhlas adalah ciri dari demokrasi yang diajarkan Sila Keempat.'
    }
  ],
  '5': [
    {
      id: 'q5-1',
      type: 'mcq',
      question: 'Sikap suka menabung dan tidak boros adalah contoh pengamalan Sila ke...?',
      options: ['Dua', 'Tiga', 'Empat', 'Lima'],
      answer: 3,
      explanation: 'Sila Kelima, Keadilan Sosial, mengajarkan kita untuk hidup hemat, tidak bergaya hidup mewah, dan menghargai hasil kerja keras.'
    },
    {
      id: 'q5-2',
      type: 'mcq',
      question: 'Apa simbol dari Sila Kelima Pancasila?',
      options: ['Kepala Banteng', 'Pohon Beringin', 'Padi dan Kapas', 'Bintang'],
      answer: 2,
      explanation: 'Padi dan Kapas adalah simbol Sila Kelima, yang melambangkan kebutuhan dasar semua manusia, yaitu pangan (padi) dan sandang (kapas) sebagai syarat tercapainya keadilan sosial.'
    },
    {
      id: 'q5-3',
      type: 'mcq',
      question: 'Menghargai hasil karya orang lain adalah perbuatan yang sesuai dengan Sila...?',
      options: ['Pertama', 'Kedua', 'Kelima', 'Ketiga'],
      answer: 2,
      explanation: 'Menghargai karya orang lain adalah bagian dari mewujudkan kemajuan yang merata dan berkeadilan sosial, sesuai dengan Sila Kelima.'
    }
  ],
};
