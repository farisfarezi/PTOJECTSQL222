import { supabase } from '../lib/supabase';

export const userService = {
  getAll: async () => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
  },

  getTeknisi: async () => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('role', 'teknisi')
        .order('nama');

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching teknisi:', error);
      return [];
    }
  },

  updateRole: async (id, role) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .update({ role })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      throw new Error(error.message || 'Gagal mengupdate role');
    }
  },

  getProfile: async (id) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching profile:', error);
      return null;
    }
  },

  updateProfile: async (id, updates) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      throw new Error(error.message || 'Gagal mengupdate profil');
    }
  },

  addUser: async (user) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .insert([user])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      throw new Error(error.message || 'Gagal menambah user');
    }
  }
};
