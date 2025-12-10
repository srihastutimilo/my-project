import React from 'react';
// Import komponen Chart yang dibutuhkan dari react-chartjs-2
import { Bar } from 'react-chartjs-2';
// Import register chart.js dan elemen yang dibutuhkan
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Daftarkan komponen ChartJS yang dibutuhkan
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// --- Data Penjualan Sederhana (Januari - Juni) ---
const salesData = [
  { month: 'Januari', amount: 4500000 },
  { month: 'Februari', amount: 5200000 },
  { month: 'Maret', amount: 3800000 },
  { month: 'April', amount: 6100000 },
  { month: 'Mei', amount: 7500000 },
  { month: 'Juni', amount: 5900000 },
];

// --- Struktur Data Chart.js ---
const chartData = {
  labels: salesData.map(data => data.month), // Label Sumbu X (Bulan)
  datasets: [
    {
      label: 'Penjualan (IDR)',
      data: salesData.map(data => data.amount), // Data Sumbu Y (Jumlah Penjualan)
      backgroundColor: 'rgba(59, 130, 246, 0.7)', // Warna Biru Tailwind (blue-500)
      borderColor: 'rgba(29, 78, 216, 1)',
      borderWidth: 1,
      borderRadius: 4,
    },
  ],
};

// --- Opsi Konfigurasi Chart.js ---
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false, // Penting agar grafik mengisi container
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Grafik Penjualan Bulanan (Januari - Juni)',
      font: {
        size: 18,
      },
    },
    tooltip: {
        callbacks: {
            label: function(context) {
                let label = context.dataset.label || '';
                if (label) {
                    label += ': ';
                }
                // Format angka ke Rupiah
                label += new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(context.raw);
                return label;
            }
        }
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: 'Total Penjualan (IDR)'
      },
      // Format label sumbu Y ke Rupiah
      ticks: {
          callback: function(value, index, ticks) {
              return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumSignificantDigits: 3 }).format(value);
          }
      }
    }
  }
};


// --- Komponen React Utama ---
const MonthlySalesChart = () => {
  return (
    <div className="flex justify-center p-4 sm:p-8 bg-gray-100 min-h-screen">
      <div className="w-full max-w-4xl bg-white p-6 sm:p-8 rounded-xl shadow-2xl">
        <h1 className="text-2xl sm:text-3xl font-bold text-blue-700 mb-6 border-b pb-2">
          📊 Laporan Penjualan Bulanan
        </h1>
        
        {/* Container untuk Grafik, dengan tinggi tetap agar grafik tampil */}
        <div className="h-96 md:h-[500px]">
            {/* Tampilkan Grafik Batang */}
            <Bar data={chartData} options={chartOptions} /> 
        </div>

        <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-700 mb-3">
                Detail Data Penjualan
            </h2>
             {/* Tampilkan Data dalam Tabel (Format Rapi) */}
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
                    <thead className="bg-blue-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bulan</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Penjualan (IDR)</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {salesData.map((data, index) => (
                            <tr key={data.month} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{data.month}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                                    {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(data.amount)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
      </div>
    </div>
  );
};

export default MonthlySalesChart;