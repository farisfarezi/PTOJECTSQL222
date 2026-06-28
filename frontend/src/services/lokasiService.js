// MOCK SERVICE — aktifkan import supabase setelah database terhubung
// import { supabase } from '../lib/supabase';

const mockLokasi = [
  { id: 1, nama_lokasi: 'Gedung A', detail_lokasi: 'Gedung Perkuliahan Utama' },
  { id: 2, nama_lokasi: 'Gedung B', detail_lokasi: 'Gedung Laboratorium' },
  { id: 3, nama_lokasi: 'Gedung C', detail_lokasi: 'Gedung Administrasi' },
  { id: 4, nama_lokasi: 'Aula Utama', detail_lokasi: 'Ruang Serbaguna Kampus' },
  { id: 5, nama_lokasi: 'Lab Komputer', detail_lokasi: 'Gedung B Lantai 2' },
  { id: 6, nama_lokasi: 'Kantin', detail_lokasi: 'Area Kantin Pusat' },
  { id: 7, nama_lokasi: 'Masjid', detail_lokasi: 'Masjid Kampus Polinela' },
  { id: 8, nama_lokasi: 'Lapangan', detail_lokasi: 'Lapangan Olahraga Utama' },
];

export const lokasiService = {
  getAll: async () => mockLokasi,
  create: async ({ nama_lokasi, detail_lokasi }) => {
    const newItem = { id: Date.now(), nama_lokasi, detail_lokasi };
    mockLokasi.push(newItem);
    return newItem;
  },
  update: async (id, { nama_lokasi, detail_lokasi }) => {
    const item = mockLokasi.find(l => l.id === id);
    if (item) { item.nama_lokasi = nama_lokasi; item.detail_lokasi = detail_lokasi; }
    return item;
  },
  delete: async (id) => {
    const idx = mockLokasi.findIndex(l => l.id === id);
    if (idx !== -1) mockLokasi.splice(idx, 1);
  },
};
