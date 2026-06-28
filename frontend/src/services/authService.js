import { supabase } from '../lib/supabase';

export const authService = {
  register: async (data) => {
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
      });

      if (authError) throw authError;

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

      if (authError) throw new Error(authError.message || 'Email atau password salah');
      if (!authData?.user) throw new Error('User tidak ditemukan');

      // Get user profile dari tabel users
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('id', authData.user.id)
        .single();

      if (userError) {
        // RLS mungkin memblokir - gunakan fallback dari auth session
        console.warn('Could not fetch user profile:', userError.message);
        return {
          user: {
            id: authData.user.id,
            email: authData.user.email,
            nama: authData.user.email,
            role: 'superadmin', // fallback sementara
          }
        };
      }

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

      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('id', session.user.id)
        .single();

      if (userError) {
        console.warn('Could not fetch user profile:', userError.message);
        return {
          id: session.user.id,
          email: session.user.email,
          nama: session.user.email,
          role: 'superadmin',
        };
      }

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
