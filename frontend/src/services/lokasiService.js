import { supabase } from '../lib/supabase';

export const lokasiService = {
  getAll: async () => {
    try {
      const { data, error } = await supabase
        .from('lokasi')
        .select('*')
        .order('nama_lokasi');

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching lokasi:', error);
      return [];
    }
  },

  create: async ({ nama_lokasi, detail_lokasi }) => {
    try {
      const { data, error } = await supabase
        .from('lokasi')
        .insert([{ nama_lokasi, detail_lokasi }])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      throw new Error(error.message || 'Gagal membuat lokasi');
    }
  },

  update: async (id, { nama_lokasi, detail_lokasi }) => {
    try {
      const { data, error } = await supabase
        .from('lokasi')
        .update({ nama_lokasi, detail_lokasi })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      throw new Error(error.message || 'Gagal mengupdate lokasi');
    }
  },

  delete: async (id) => {
    try {
      const { error } = await supabase
        .from('lokasi')
        .delete()
        .eq('id', id);

      if (error) throw error;
    } catch (error) {
      throw new Error(error.message || 'Gagal menghapus lokasi');
    }
  },
};
