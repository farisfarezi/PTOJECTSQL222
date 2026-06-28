// IMPORT SEMENTARA DI-COMMENT AGAR TIDAK ERROR KARENA SUPABASE BELUM TERHUBUNG
// import { supabase } from '../lib/supabase';
import { userService } from './userService';

const SUPERADMIN_EMAIL = 'superadmin@polinela.ac.id';
const SUPERADMIN_PASSWORD = 'Superadmin123';

const mockSuperadminUser = {
  id: 'superadmin-0001',
  email: SUPERADMIN_EMAIL,
  nama: 'Superadmin SIPFAS',
  identitas: '198001012010011001',
  no_hp: '081234567890',
  role: 'superadmin'
};

export const authService = {
  register: async (data) => {
    console.log('Mock register', data);
    const newUser = {
      id: `user-${Date.now()}`,
      nama: data.nama,
      email: data.email,
      identitas: data.identitas,
      no_hp: data.noHp,
      role: data.role || 'mahasiswa',
      created_at: new Date().toISOString()
    };
    await userService.addUser(newUser);
    return { user: newUser };
  },

  login: async (credentials) => {
    console.log('Mock login', credentials);
    const users = await userService.getAll();
    const foundUser = users.find(u => u.email === credentials.email);

    if (credentials.email === SUPERADMIN_EMAIL && credentials.password === SUPERADMIN_PASSWORD) {
      localStorage.setItem('mock_session', mockSuperadminUser.id);
      return { user: mockSuperadminUser };
    } else if (foundUser) {
      // Allow any password for mock users other than superadmin for simplicity
      localStorage.setItem('mock_session', foundUser.id);
      return { user: foundUser };
    }

    throw new Error('Email atau password salah.');
  },

  logout: async () => {
    console.log('Mock logout');
    localStorage.removeItem('mock_session');
    window.location.href = '/login';
  },

  getUser: async () => {
    const sessionId = localStorage.getItem('mock_session');
    if (!sessionId) return null;
    
    if (sessionId === mockSuperadminUser.id) return mockSuperadminUser;
    
    const profile = await userService.getProfile(sessionId);
    return profile || null;
  },

  getSession: async () => {
    const user = await authService.getUser();
    return user ? { user } : null;
  },

  getUserProfile: async (userId) => {
    if (userId === mockSuperadminUser.id) return mockSuperadminUser;
    return await userService.getProfile(userId);
  },
};
