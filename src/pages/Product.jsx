import React, { useState, useMemo } from 'react';

// Data produk awal sesuai ketentuan: Array/List menampung Object/Map/Dictionary
const initialProducts = [
  { id: 1, name: 'Laptop Gaming', price: 15000000, stock: 10 },
  { id: 2, name: 'Mouse Wireless', price: 250000, stock: 50 },
  { id: 3, name: 'Keyboard Mekanik', price: 1200000, stock: 15 },
  { id: 4, name: 'Monitor 24 inch', price: 3500000, stock: 8 },
  { id: 5, name: 'Webcam HD', price: 400000, stock: 30 },
];

const ProductManager = () => {
  const [products, setProducts] = useState(initialProducts);

  // --- FUNGSI UTAMA UNTUK MENGELOLA DATA PRODUK (Sesuai Tugas Praktik) ---

  // 1. Mengurutkan Daftar Produk Berdasarkan Harga (Termurah ke Tertinggi)
  // Menggunakan useMemo agar proses pengurutan hanya dilakukan jika data 'products' berubah
  const sortedProducts = useMemo(() => {
    // Membuat salinan array agar fungsi sort() tidak mengubah state asli
    return [...products].sort((a, b) => a.price - b.price);
  }, [products]);

  // 2. Menampilkan Produk dengan Harga Tertinggi dan Terendah
  // Data terendah dan tertinggi diambil dari hasil pengurutan (sortedProducts)
  const productLowestPrice = sortedProducts.length > 0 ? sortedProducts[0] : null;
  const productHighestPrice = sortedProducts.length > 0 ? sortedProducts[sortedProducts.length - 1] : null;

  // Fungsi utilitas untuk memformat harga ke mata uang Rupiah
  const formatRupiah = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  // --- Tampilan (Menggunakan Tailwind CSS) ---

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-indigo-700 mb-6 border-b-2 pb-2">
        Manajemen Data Produk (J.620100.004.02)
      </h1>

      {/* Bagian Produk Terendah dan Tertinggi */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Produk Harga Terendah */}
        <div className="bg-white p-4 shadow-lg rounded-lg border-l-4 border-green-500">
          <h2 className="text-xl font-semibold text-green-700 mb-2">
            🏷️ Produk Harga Terendah
          </h2>
          {productLowestPrice ? (
            <div>
              <p className="font-bold text-lg">{productLowestPrice.name}</p>
              <p className="text-gray-600">Harga: <span className="font-mono text-green-600">{formatRupiah(productLowestPrice.price)}</span></p>
              <p className="text-sm text-gray-500">Stok: {productLowestPrice.stock}</p>
            </div>
          ) : (
            <p className="text-gray-500">Tidak ada data produk.</p>
          )}
        </div>

        {/* Produk Harga Tertinggi */}
        <div className="bg-white p-4 shadow-lg rounded-lg border-l-4 border-red-500">
          <h2 className="text-xl font-semibold text-red-700 mb-2">
            🔥 Produk Harga Tertinggi
          </h2>
          {productHighestPrice ? (
            <div>
              <p className="font-bold text-lg">{productHighestPrice.name}</p>
              <p className="text-gray-600">Harga: <span className="font-mono text-red-600">{formatRupiah(productHighestPrice.price)}</span></p>
              <p className="text-sm text-gray-500">Stok: {productHighestPrice.stock}</p>
            </div>
          ) : (
            <p className="text-gray-500">Tidak ada data produk.</p>
          )}
        </div>
      </div>

      {/* Bagian Daftar Produk yang Diurutkan */}
      <div className="bg-white p-6 shadow-xl rounded-lg">
        <h2 className="text-2xl font-bold text-indigo-600 mb-4">
          📦 Daftar Produk (Diurutkan: Harga Termurah ke Tertinggi)
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-indigo-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Produk</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Harga</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stok</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedProducts.map((product, index) => (
                <tr key={product.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-600 font-semibold">{formatRupiah(product.price)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.stock}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {sortedProducts.length === 0 && (
          <p className="text-center py-4 text-gray-500">Tidak ada produk yang ditampilkan.</p>
        )}
      </div>
    </div>
  );
};

// Pastikan Anda mengekspor komponen ini untuk digunakan di App.js atau index.js
export default ProductManager;