// Fungsi validasi untuk form pengaduan
export const validateForm = (fields) => {
  const errors = {};

  if (!fields.judul || fields.judul.trim().length === 0) {
    errors.judul = 'Judul laporan wajib diisi.';
  }
  if (!fields.id_kategori) {
    errors.id_kategori = 'Kategori wajib dipilih.';
  }
  if (!fields.id_lokasi) {
    errors.id_lokasi = 'Lokasi wajib dipilih.';
  }
  if (!fields.deskripsi || fields.deskripsi.trim().length < 10) {
    errors.deskripsi = 'Deskripsi minimal 10 karakter.';
  }
  if (!fields.tingkat_kerusakan) {
    errors.tingkat_kerusakan = 'Tingkat kerusakan wajib dipilih.';
  }

  return errors;
};

export const validateFile = (file) => {
  if (!file) return null;
  const allowed = ['image/jpeg', 'image/png', 'image/jpg'];
  if (!allowed.includes(file.type)) {
    return 'File hanya boleh JPG atau PNG.';
  }
  const maxSize = 5 * 1024 * 1024; // 5MB
  if (file.size > maxSize) {
    return 'Ukuran file maksimal 5MB.';
  }
  return null;
};

export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email) ? null : 'Format email tidak valid.';
};

export const validatePassword = (password) => {
  if (!password || password.length < 8) {
    return 'Password minimal 8 karakter.';
  }
  return null;
};
