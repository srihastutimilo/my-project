import React, { useState, useMemo } from 'react';

// Fungsi utama untuk format mata uang Rupiah
const formatRupiah = (amount) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);
};

// --- Komponen Utama ---
const ShoppingCart = () => {
  // State untuk menyimpan daftar item belanja
  const [items, setItems] = useState([]);
  
  // State untuk input item baru
  const [newItem, setNewItem] = useState({ name: '', qty: 1, price: '' });
  const [inputError, setInputError] = useState('');

  // ------------------------------------------------------------------
  // A. LOGIKA PERHITUNGAN TOTAL BELANJA DAN DISKON (Sesuai Tugas Praktik)
  // ------------------------------------------------------------------

  // Menggunakan useMemo untuk menghitung subtotal, diskon, dan total hanya saat daftar item berubah
  const { subtotal, discount, finalTotal } = useMemo(() => {
    // 1. Hitung Subtotal
    const calculatedSubtotal = items.reduce((total, item) => {
      // Pastikan qty dan price adalah angka
      const qty = Number(item.qty);
      const price = Number(item.price);
      return total + (qty * price);
    }, 0);

    let calculatedDiscount = 0;
    const discountThreshold = 500000;
    const discountRate = 0.10; // 10%

    // 2. Terapkan Diskon 10% jika total > 500.000
    if (calculatedSubtotal > discountThreshold) {
      calculatedDiscount = calculatedSubtotal * discountRate;
    }

    // 3. Hitung Total Akhir
    const calculatedFinalTotal = calculatedSubtotal - calculatedDiscount;

    return {
      subtotal: calculatedSubtotal,
      discount: calculatedDiscount,
      finalTotal: calculatedFinalTotal,
    };
  }, [items]); // Dependensi: hanya hitung ulang jika 'items' berubah

  // ------------------------------------------------------------------
  // B. LOGIKA PENGELOLAAN FORM INPUT
  // ------------------------------------------------------------------

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem({
      ...newItem,
      [name]: name === 'qty' || name === 'price' ? (value < 0 ? 0 : value) : value,
    });
    setInputError('');
  };

  const handleAddItem = (e) => {
    e.preventDefault();

    // Validasi form
    if (!newItem.name.trim() || !newItem.qty || !newItem.price) {
      setInputError('Semua field wajib diisi.');
      return;
    }
    if (Number(newItem.qty) <= 0 || Number(newItem.price) <= 0) {
       setInputError('Kuantitas dan Harga harus lebih dari nol.');
       return;
    }

    // Tambahkan item baru ke daftar belanja
    setItems((prevItems) => [
      ...prevItems,
      {
        id: Date.now(), // ID unik sederhana
        name: newItem.name.trim(),
        qty: Number(newItem.qty),
        price: Number(newItem.price),
      },
    ]);

    // Reset form
    setNewItem({ name: '', qty: 1, price: '' });
    setInputError('');
  };

  const handleRemoveItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  // ------------------------------------------------------------------
  // C. TAMPILAN (Tailwind CSS)
  // ------------------------------------------------------------------

  return (
    <div className="p-4 sm:p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-teal-700 mb-6 border-b-2 pb-2">
        💰 Kalkulator Total Belanja & Diskon
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Kolom 1: Form Input Item */}
        <div className="lg:col-span-1 bg-white p-6 shadow-xl rounded-lg h-fit">
          <h2 className="text-xl font-semibold text-teal-600 mb-4">
            ➕ Tambah Item Baru
          </h2>
          <form onSubmit={handleAddItem} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nama Item</label>
              <input type="text" name="name" id="name" value={newItem.name} onChange={handleInputChange} 
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" placeholder="Contoh: Sepatu Lari"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="qty" className="block text-sm font-medium text-gray-700">Kuantitas (Qty)</label>
                <input type="number" name="qty" id="qty" value={newItem.qty} onChange={handleInputChange} 
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" min="1"
                />
              </div>
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">Harga Satuan</label>
                <input type="number" name="price" id="price" value={newItem.price} onChange={handleInputChange} 
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" placeholder="Contoh: 350000" min="0"
                />
              </div>
            </div>
            
            {inputError && <p className="text-red-500 text-sm mt-2">{inputError}</p>}

            <button type="submit" className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition">
              Masukkan ke Keranjang
            </button>
          </form>
        </div>

        {/* Kolom 2: Daftar Item Belanja */}
        <div className="lg:col-span-2 bg-white p-6 shadow-xl rounded-lg">
          <h2 className="text-xl font-semibold text-teal-600 mb-4 border-b pb-2">
            🛍️ Daftar Item ({items.length} Item)
          </h2>
          {items.length === 0 ? (
            <p className="text-gray-500 italic py-4 text-center">Keranjang belanja kosong. Silakan tambah item di samping.</p>
          ) : (
            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between items-center p-3 border rounded-lg hover:bg-teal-50">
                  <div>
                    <p className="font-medium text-gray-800">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      {item.qty} x {formatRupiah(item.price)}
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <p className="font-bold text-gray-900 w-32 text-right">
                      {formatRupiah(item.qty * item.price)}
                    </p>
                    <button onClick={() => handleRemoveItem(item.id)} className="text-red-500 hover:text-red-700 text-lg" title="Hapus Item">
                      &times;
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <hr className="my-6 border-gray-200" />

          {/* Kolom 3: Output Perhitungan (Format Rapi) */}
          <div className="space-y-3">
            <h2 className="text-xl font-bold text-teal-700 mb-4">
                📝 Ringkasan Belanja
            </h2>
            
            {/* Subtotal */}
            <div className="flex justify-between text-gray-700">
              <span>Subtotal:</span>
              <span className="font-semibold">{formatRupiah(subtotal)}</span>
            </div>

            {/* Diskon */}
            <div className={`flex justify-between font-bold ${discount > 0 ? 'text-red-600' : 'text-gray-500'}`}>
              <span>Diskon (10% untuk total {`>`} {formatRupiah(500000)}):</span>
              <span>
                {discount > 0 ? `- ${formatRupiah(discount)}` : formatRupiah(0)}
              </span>
            </div>

            <hr className="border-2 border-dashed border-teal-200 my-3" />
            
            {/* Total Akhir */}
            <div className="flex justify-between text-2xl font-extrabold text-teal-800">
              <span>TOTAL BAYAR:</span>
              <span>{formatRupiah(finalTotal)}</span>
            </div>
            
            {/* Pesan Kualifikasi Diskon */}
            {subtotal > 500000 && discount > 0 ? (
                <div className="bg-green-100 border-l-4 border-green-500 p-3 mt-4 text-green-700 text-sm">
                    Selamat! Anda mendapatkan diskon 10%.
                </div>
            ) : (
                <div className="bg-yellow-100 border-l-4 border-yellow-500 p-3 mt-4 text-yellow-700 text-sm">
                    Total belanja perlu mencapai lebih dari {formatRupiah(500000)} untuk mendapatkan diskon 10%.
                </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;