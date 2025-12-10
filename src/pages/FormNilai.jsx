import React, { useState, useMemo } from 'react';

// Batas Nilai untuk Predikat
const GRADE_THRESHOLDS = {
  A: 90,
  B: 80,
  C: 70,
  D: 60,
  // Nilai < 60 adalah E (Tidak Lulus)
};

// --- Fungsi Utama untuk Menentukan Predikat (Logika Terstruktur) ---
const determineGrade = (average) => {
  if (average >= GRADE_THRESHOLDS.A) {
    return 'A';
  } else if (average >= GRADE_THRESHOLDS.B) {
    return 'B';
  } else if (average >= GRADE_THRESHOLDS.C) {
    return 'C';
  } else if (average >= GRADE_THRESHOLDS.D) {
    return 'D';
  } else {
    return 'E';
  }
};

// --- Komponen Utama ---
const ExamScoreCalculator = () => {
  // State untuk input nilai
  const [scores, setScores] = useState({
    score1: '',
    score2: '',
    score3: '',
  });
  const [error, setError] = useState('');

  // Handle perubahan input
  const handleScoreChange = (e) => {
    const { name, value } = e.target;
    // Memastikan input adalah angka antara 0 hingga 100
    const numericValue = Number(value);
    
    if (value === '' || (numericValue >= 0 && numericValue <= 100)) {
        setScores({
            ...scores,
            [name]: value,
        });
        setError('');
    } else if (numericValue > 100) {
        setError('Nilai maksimum adalah 100.');
    } else if (numericValue < 0) {
        setError('Nilai minimum adalah 0.');
    }
  };

  // ------------------------------------------------------------------
  // A. LOGIKA PERHITUNGAN RATA-RATA DAN PENENTUAN PREDIKAT
  // ------------------------------------------------------------------

  // Menggunakan useMemo untuk menghitung hasil hanya jika nilai input berubah
  const calculationResult = useMemo(() => {
    const numScores = [
      Number(scores.score1),
      Number(scores.score2),
      Number(scores.score3),
    ];
    
    // Cek apakah semua nilai sudah diisi dan valid (angka)
    const allValid = numScores.every(score => !isNaN(score) && score !== '');
    
    if (!allValid || numScores.includes(0) && (scores.score1 === '' || scores.score2 === '' || scores.score3 === '')) {
        // Jika belum lengkap, kembalikan nilai default
        return { average: null, grade: null, isValid: false };
    }

    const total = numScores.reduce((sum, current) => sum + current, 0);
    const average = total / numScores.length;
    const grade = determineGrade(average);

    return { 
        average: average.toFixed(2), // Tampilkan 2 angka di belakang koma
        grade, 
        isValid: true 
    };
  }, [scores]); // Dependensi: hitung ulang jika 'scores' berubah

  const { average, grade, isValid } = calculationResult;

  // ------------------------------------------------------------------
  // B. TAMPILAN (Tailwind CSS)
  // ------------------------------------------------------------------

  return (
    <div className="flex justify-center p-4 sm:p-8 bg-blue-50 min-h-screen">
      <div className="w-full max-w-2xl bg-white p-6 sm:p-10 rounded-xl shadow-2xl">
        <h1 className="text-2xl sm:text-3xl font-bold text-blue-700 mb-6 border-b pb-2">
          🔢 Perhitungan Nilai Ujian
        </h1>

        {/* Input Form */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-blue-600 mb-4">Input 3 Nilai Ujian (0 - 100)</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {['score1', 'score2', 'score3'].map((key, index) => (
              <div key={key}>
                <label htmlFor={key} className="block text-sm font-medium text-gray-700">
                  Nilai Ujian {index + 1}
                </label>
                <input
                  type="number"
                  id={key}
                  name={key}
                  value={scores[key]}
                  onChange={handleScoreChange}
                  min="0"
                  max="100"
                  placeholder="Masukkan nilai"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            ))}
          </div>
          {error && <p className="mt-2 text-red-600 text-sm italic">{error}</p>}
        </div>

        {/* Hasil Perhitungan */}
        <div className="bg-blue-100 p-6 rounded-lg border-l-4 border-blue-500">
          <h2 className="text-xl font-bold text-blue-700 mb-4">
            ✅ Hasil dan Predikat
          </h2>
          
          {isValid ? (
            <div className="space-y-3">
              {/* Output Rata-rata */}
              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-lg font-medium text-gray-700">Rata-rata Nilai:</span>
                <span className="text-2xl font-extrabold text-blue-800">{average}</span>
              </div>

              {/* Output Predikat */}
              <div className="flex justify-between items-center pt-2">
                <span className="text-lg font-medium text-gray-700">Predikat:</span>
                <span className={`text-3xl font-extrabold p-2 rounded-md 
                    ${grade === 'A' ? 'bg-green-600 text-white' : 
                      grade === 'B' ? 'bg-lime-500 text-white' :
                      grade === 'C' ? 'bg-yellow-500 text-gray-800' :
                      grade === 'D' ? 'bg-orange-500 text-white' :
                      'bg-red-600 text-white'
                    }`}
                >
                  {grade}
                </span>
              </div>
            </div>
          ) : (
            <p className="text-gray-600 italic">
              Mohon masukkan 3 nilai ujian (0-100) untuk melihat hasilnya.
            </p>
          )}
        </div>

        {/* Tabel Kriteria Predikat (Format Rapi) */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">
            Tabel Kriteria Penilaian
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
              <thead className="bg-blue-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Predikat</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rentang Nilai (Rata-rata)</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr className="bg-green-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-700">A</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{`>= ${GRADE_THRESHOLDS.A}`}</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">B</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{`>= ${GRADE_THRESHOLDS.B} dan < ${GRADE_THRESHOLDS.A}`}</td>
                </tr>
                <tr className="bg-yellow-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-yellow-700">C</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{`>= ${GRADE_THRESHOLDS.C} dan < ${GRADE_THRESHOLDS.B}`}</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">D</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{`>= ${GRADE_THRESHOLDS.D} dan < ${GRADE_THRESHOLDS.C}`}</td>
                </tr>
                <tr className="bg-red-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-red-700">E</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{`< ${GRADE_THRESHOLDS.D}`}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ExamScoreCalculator;