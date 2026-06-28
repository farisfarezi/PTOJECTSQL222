// MOCK SERVICE — aktifkan import supabase setelah database terhubung
// import { supabase } from '../lib/supabase';

const defaultLaporanData = [
  { id: 1001, id_user: 'user-001', judul: 'AC Ruang Kelas A1 Tidak Dingin', deskripsi: 'AC di ruang A1 lantai 1 meneteskan air dan tidak dingin.', status: 'menunggu_verifikasi', tingkat_kerusakan: 'sedang', created_at: '2026-06-28T08:00:00Z', updated_at: '2026-06-28T08:00:00Z', users: { nama: 'Budi Santoso', role: 'mahasiswa' }, kategori: { nama_kategori: 'Elektronik & IT' }, lokasi: { nama_lokasi: 'Gedung A' } },
  { id: 1002, id_user: 'user-002', judul: 'Toilet Lantai 2 Gedung B Mampet', deskripsi: 'Toilet pria tidak bisa disiram.', status: 'diverifikasi', tingkat_kerusakan: 'berat', created_at: '2026-06-27T14:00:00Z', updated_at: '2026-06-27T15:00:00Z', users: { nama: 'Siti Rahayu', role: 'dosen' }, kategori: { nama_kategori: 'Air & Sanitasi' }, lokasi: { nama_lokasi: 'Gedung B' } },
  { id: 1003, id_user: 'user-003', judul: 'Lampu Aula Utama Mati', deskripsi: 'Beberapa lampu di tengah aula mati.', status: 'diproses', tingkat_kerusakan: 'ringan', created_at: '2026-06-26T09:30:00Z', updated_at: '2026-06-26T10:00:00Z', assigned_to: 'teknisi-0001', users: { nama: 'Ahmad Fauzi', role: 'mahasiswa' }, kategori: { nama_kategori: 'Kelistrikan' }, lokasi: { nama_lokasi: 'Aula Utama' } },
  { id: 1004, id_user: 'user-004', judul: 'Proyektor Ruang Lab Rusak', deskripsi: 'Warna proyektor kekuningan.', status: 'selesai', tingkat_kerusakan: 'sedang', created_at: '2026-06-25T11:00:00Z', updated_at: '2026-06-26T14:00:00Z', assigned_to: 'teknisi-0002', users: { nama: 'Dewi Lestari', role: 'mahasiswa' }, kategori: { nama_kategori: 'Elektronik & IT' }, lokasi: { nama_lokasi: 'Lab Komputer' } },
];

let mockLaporanData = JSON.parse(localStorage.getItem('mockLaporanData')) || defaultLaporanData;

const saveLaporan = () => localStorage.setItem('mockLaporanData', JSON.stringify(mockLaporanData));

export const laporanService = {
  getAll: async () => [...mockLaporanData],

  getByUser: async (_userId) => mockLaporanData,

  getById: async (id) => {
    const item = mockLaporanData.find(l => l.id === parseInt(id) || l.id === id);
    if (!item) throw new Error('Laporan tidak ditemukan');
    return item;
  },

  create: async (payload) => {
    const newLaporan = {
      id: Date.now(),
      ...payload,
      status: 'menunggu_verifikasi',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      users: { nama: 'Pelapor (Mock)', role: 'mahasiswa' },
      kategori: { nama_kategori: 'Kategori Mock' },
      lokasi: { nama_lokasi: 'Lokasi Mock' }
    };
    mockLaporanData.unshift(newLaporan);
    saveLaporan();
    return newLaporan;
  },

  updateStatus: async (id, status, catatanAdmin = null) => {
    const item = mockLaporanData.find(l => l.id === parseInt(id) || l.id === id);
    if (item) {
      item.status = status;
      item.updated_at = new Date().toISOString();
      if (catatanAdmin) item.catatan_admin = catatanAdmin;
      saveLaporan();
    }
    return item;
  },

  assignTeknisi: async (id, teknisiId) => {
    const item = mockLaporanData.find(l => l.id === parseInt(id) || l.id === id);
    if (item) {
      item.status = 'diproses';
      item.assigned_to = teknisiId;
      item.updated_at = new Date().toISOString();
      saveLaporan();
    }
    return item;
  },

  uploadFoto: async (_userId, file) => {
    return URL.createObjectURL(file); // Mock upload return local object URL
  },

  submitBuktiPerbaikan: async ({ idLaporan, idTeknisi: _idTeknisi, file: _file, catatan: _catatan }) => {
    const item = mockLaporanData.find(l => l.id === parseInt(idLaporan) || l.id === idLaporan);
    if (item) {
      item.status = 'selesai';
      item.updated_at = new Date().toISOString();
      saveLaporan();
    }
  },
};
