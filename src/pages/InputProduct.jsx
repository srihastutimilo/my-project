import React, { useState } from 'react';

// Data kategori untuk dropdown
const categories = [
  'Elektronik',
  'Pakaian',
  'Makanan & Minuman',
  'Kesehatan',
  'Otomotif',
];

const ProductInputForm = () => {
  // State untuk menyimpan data form
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    stock: '',
    category: '',
  });

  // State untuk menyimpan pesan error validasi
  const [errors, setErrors] = useState({});

  // State untuk konfirmasi submit sukses
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Handle perubahan pada input field
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Menghapus error saat user mulai mengetik/memilih
    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: '',
      }));
    }
    // Mereset status submitted
    setIsSubmitted(false);
  };

  // Fungsi Validasi Form (Semua field wajib diisi)
  const validateForm = () => {
    let newErrors = {};
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = 'Nama Produk wajib diisi.';
      isValid = false;
    }
    if (!formData.price || isNaN(formData.price) || Number(formData.price) <= 0) {
      newErrors.price = 'Harga wajib diisi dan harus berupa angka positif.';
      isValid = false;
    }
    if (!formData.stock || isNaN(formData.stock) || !Number.isInteger(Number(formData.stock)) || Number(formData.stock) < 0) {
      newErrors.stock = 'Stok wajib diisi dan harus berupa bilangan bulat non-negatif.';
      isValid = false;
    }
    if (!formData.category) {
      newErrors.category = 'Kategori wajib dipilih.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handle Submit Form
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Jika validasi sukses:
      console.log('Data Produk Berhasil Disimpan:', formData);

      // Tampilkan pesan sukses
      setIsSubmitted(true);

      // Bersihkan form (Opsional, tergantung kebutuhan)
      setFormData({
        name: '',
        price: '',
        stock: '',
        category: '',
      });
      setErrors({});
      
      // Di sini Anda bisa menambahkan logika POST data ke API
    } else {
      // Jika validasi gagal
      console.log('Validasi gagal. Mohon lengkapi semua field.');
      setIsSubmitted(false);
    }
  };

  // --- Tampilan (Menggunakan Tailwind CSS) ---
  return (
    <div className="flex justify-center p-4 sm:p-8 bg-gray-100 min-h-screen">
      
      {/* Container utama, responsif */}
      <div className="w-full max-w-lg bg-white p-6 sm:p-10 rounded-xl shadow-2xl">
        <h1 className="text-2xl sm:text-3xl font-bold text-indigo-700 mb-6 border-b pb-2">
          📝 Form Input Produk
        </h1>

        {/* Pesan Sukses Submit */}
        {isSubmitted && (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4" role="alert">
            <p className="font-bold">Sukses!</p>
            <p>Data produk berhasil divalidasi dan dikirim.</p>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          
          {/* Field: Nama Produk */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Nama Produk
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Masukkan nama produk"
              // Kelas input responsif dan validasi error
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none sm:text-sm 
                ${errors.name ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'}`
              }
            />
            {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
          </div>

          {/* Field: Harga */}
          <div className="mb-4">
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
              Harga (Rp)
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Contoh: 15000000"
              min="0"
              step="any"
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none sm:text-sm 
                ${errors.price ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'}`
              }
            />
            {errors.price && <p className="mt-1 text-xs text-red-600">{errors.price}</p>}
          </div>

          {/* Field: Stok */}
          <div className="mb-4">
            <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
              Stok
            </label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              placeholder="Contoh: 10"
              min="0"
              step="1"
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none sm:text-sm 
                ${errors.stock ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'}`
              }
            />
            {errors.stock && <p className="mt-1 text-xs text-red-600">{errors.stock}</p>}
          </div>

          {/* Field: Kategori (Dropdown) */}
          <div className="mb-6">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Kategori
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`mt-1 block w-full pl-3 pr-10 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm 
                ${errors.category ? 'border-red-500' : 'border-gray-300'}`
              }
            >
              <option value="" disabled>-- Pilih Kategori --</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {errors.category && <p className="mt-1 text-xs text-red-600">{errors.category}</p>}
          </div>

          {/* Tombol Submit */}
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
          >
            Simpan Produk
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductInputForm;