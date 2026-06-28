import { supabase } from '../lib/supabase';

export const kategoriService = {
  getAll: async () => {
    try {
      const { data, error } = await supabase
        .from('kategori')
        .select('*')
        .order('nama_kategori');

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching kategori:', error);
      return [];
    }
  },

  create: async (nama_kategori) => {
    try {
      const { data, error } = await supabase
        .from('kategori')
        .insert([{ nama_kategori }])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      throw new Error(error.message || 'Gagal membuat kategori');
    }
  },

  update: async (id, nama_kategori) => {
    try {
      const { data, error } = await supabase
        .from('kategori')
        .update({ nama_kategori })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      throw new Error(error.message || 'Gagal mengupdate kategori');
    }
  },

  delete: async (id) => {
    try {
      const { error } = await supabase
        .from('kategori')
        .delete()
        .eq('id', id);

      if (error) throw error;
    } catch (error) {
      throw new Error(error.message || 'Gagal menghapus kategori');
    }
  },
};
