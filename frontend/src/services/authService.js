import { supabase } from '../lib/supabase';

export const authService = {
  register: async (data) => {
    try {
      // Register di Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
      });

      if (authError) throw authError;

      // Insert profile ke tabel users
      const { data: userData, error: userError } = await supabase
        .from('users')
        .insert([
          {
            id: authData.user.id,
            nama: data.nama,
            email: data.email,
            identitas: data.identitas,
            no_hp: data.noHp,
            role: data.role || 'mahasiswa',
          },
        ])
        .select()
        .single();

      if (userError) throw userError;

      return { user: userData };
    } catch (error) {
      throw new Error(error.message || 'Gagal mendaftar');
    }
  },

  login: async (credentials) => {
    try {
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password,
      });

      if (authError) throw authError;

      // Get user profile dari tabel users
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('id', authData.user.id)
        .single();

      if (userError) throw userError;

      return { user: userData };
    } catch (error) {
      throw new Error(error.message || 'Email atau password salah');
    }
  },

  logout: async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      window.location.href = '/login';
    } catch (error) {
      throw new Error(error.message || 'Gagal logout');
    }
  },

  getUser: async () => {
    try {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError) throw sessionError;
      if (!session?.user) return null;

      // Get user profile
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('id', session.user.id)
        .single();

      if (userError) throw userError;

      return userData;
    } catch (error) {
      console.error('Error getting user:', error);
      return null;
    }
  },

  getSession: async () => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) throw error;
      return session;
    } catch (error) {
      console.error('Error getting session:', error);
      return null;
    }
  },

  getUserProfile: async (userId) => {
    try {
      const { data: userData, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;
      return userData;
    } catch (error) {
      throw new Error(error.message || 'Gagal mengambil profil user');
    }
  },
};
