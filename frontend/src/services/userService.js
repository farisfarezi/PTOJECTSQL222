// MOCK SERVICE — aktifkan import supabase setelah database terhubung
// import { supabase } from '../lib/supabase';

const defaultUsers = [
  { id: 'superadmin-0001', nama: 'Superadmin SIPFAS', email: 'superadmin@polinela.ac.id', identitas: '198001012010011001', no_hp: '081234567890', role: 'superadmin', created_at: '2026-01-01T00:00:00Z' },
  { id: 'teknisi-0001', nama: 'Budi Santoso', email: 'budi@polinela.ac.id', identitas: '197502011999031001', no_hp: '082345678901', role: 'teknisi', created_at: '2026-01-02T00:00:00Z' },
  { id: 'teknisi-0002', nama: 'Andi Wijaya', email: 'andi@polinela.ac.id', identitas: '198803152012011002', no_hp: '083456789012', role: 'teknisi', created_at: '2026-01-03T00:00:00Z' },
  { id: 'user-0001', nama: 'Dewi Lestari', email: 'dewi@mhs.polinela.ac.id', identitas: '21754001', no_hp: '085678901234', role: 'mahasiswa', created_at: '2026-01-10T00:00:00Z' },
  { id: 'user-0002', nama: 'Ahmad Fauzi', email: 'ahmad@mhs.polinela.ac.id', identitas: '21754002', no_hp: '086789012345', role: 'mahasiswa', created_at: '2026-01-11T00:00:00Z' },
  { id: 'user-0003', nama: 'Dr. Rizki Pratama', email: 'rizki@polinela.ac.id', identitas: '197804022005011003', no_hp: '087890123456', role: 'dosen', created_at: '2026-01-12T00:00:00Z' },
];

let mockUsers = JSON.parse(localStorage.getItem('mockUsers')) || defaultUsers;

const saveUsers = () => localStorage.setItem('mockUsers', JSON.stringify(mockUsers));

export const userService = {
  getAll: async () => [...mockUsers],
  getTeknisi: async () => mockUsers.filter(u => u.role === 'teknisi'),
  updateRole: async (id, role) => {
    const u = mockUsers.find(u => u.id === id);
    if (u) {
      u.role = role;
      saveUsers();
    }
    return u;
  },
  getProfile: async (id) => {
    return mockUsers.find(u => u.id === id) || mockUsers[0];
  },
  updateProfile: async (id, updates) => {
    const u = mockUsers.find(u => u.id === id);
    if (u) {
      Object.assign(u, updates);
      saveUsers();
    }
    return u;
  },
  addUser: async (user) => {
    mockUsers.push(user);
    saveUsers();
  }
};
