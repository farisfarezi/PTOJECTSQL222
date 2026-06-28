// MOCK SERVICE — aktifkan import supabase setelah database terhubung
// import { supabase } from '../lib/supabase';

const mockKategori = [
  { id: 1, nama_kategori: 'Elektronik & IT' },
  { id: 2, nama_kategori: 'Kelistrikan' },
  { id: 3, nama_kategori: 'Infrastruktur' },
  { id: 4, nama_kategori: 'Air & Sanitasi' },
  { id: 5, nama_kategori: 'Kebersihan' },
  { id: 6, nama_kategori: 'Keamanan' },
];

export const kategoriService = {
  getAll: async () => mockKategori,
  create: async (nama_kategori) => {
    const newItem = { id: Date.now(), nama_kategori };
    mockKategori.push(newItem);
    return newItem;
  },
  update: async (id, nama_kategori) => {
    const item = mockKategori.find(k => k.id === id);
    if (item) item.nama_kategori = nama_kategori;
    return item;
  },
  delete: async (id) => {
    const idx = mockKategori.findIndex(k => k.id === id);
    if (idx !== -1) mockKategori.splice(idx, 1);
  },
};
