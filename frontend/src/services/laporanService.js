import { supabase } from '../lib/supabase';

export const laporanService = {
  getAll: async () => {
    try {
      const { data, error } = await supabase
        .from('laporan')
        .select(`
          *,
          users(nama, role),
          kategori(nama_kategori),
          lokasi(nama_lokasi)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching laporan:', error);
      return [];
    }
  },

  getByUser: async (userId) => {
    try {
      const { data, error } = await supabase
        .from('laporan')
        .select(`
          *,
          users(nama, role),
          kategori(nama_kategori),
          lokasi(nama_lokasi)
        `)
        .eq('id_user', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching laporan by user:', error);
      return [];
    }
  },

  getById: async (id) => {
    try {
      const { data, error } = await supabase
        .from('laporan')
        .select(`
          *,
          users(nama, role, email),
          kategori(nama_kategori),
          lokasi(nama_lokasi)
        `)
        .eq('id', id)
        .single();

      if (error) throw error;
      if (!data) throw new Error('Laporan tidak ditemukan');
      return data;
    } catch (error) {
      throw new Error(error.message || 'Laporan tidak ditemukan');
    }
  },

  create: async (payload) => {
    try {
      const { data, error } = await supabase
        .from('laporan')
        .insert([payload])
        .select(`
          *,
          users(nama, role),
          kategori(nama_kategori),
          lokasi(nama_lokasi)
        `)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      throw new Error(error.message || 'Gagal membuat laporan');
    }
  },

  updateStatus: async (id, status, catatanAdmin = null) => {
    try {
      const updates = { status, updated_at: new Date().toISOString() };
      if (catatanAdmin) updates.catatan_admin = catatanAdmin;

      const { data, error } = await supabase
        .from('laporan')
        .update(updates)
        .eq('id', id)
        .select(`
          *,
          users(nama, role),
          kategori(nama_kategori),
          lokasi(nama_lokasi)
        `)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      throw new Error(error.message || 'Gagal mengupdate status');
    }
  },

  assignTeknisi: async (id, teknisiId) => {
    try {
      const { data, error } = await supabase
        .from('laporan')
        .update({
          assigned_to: teknisiId,
          status: 'diproses',
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select(`
          *,
          users(nama, role),
          kategori(nama_kategori),
          lokasi(nama_lokasi)
        `)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      throw new Error(error.message || 'Gagal assign teknisi');
    }
  },

  uploadFoto: async (file) => {
    try {
      const fileName = `${Date.now()}-${file.name}`;
      const { data, error } = await supabase.storage
        .from('laporan_fotos')
        .upload(fileName, file);

      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from('laporan_fotos')
        .getPublicUrl(fileName);

      return publicUrl;
    } catch (error) {
      throw new Error(error.message || 'Gagal upload foto');
    }
  },

  submitBuktiPerbaikan: async ({ idLaporan, idTeknisi, file, catatan }) => {
    try {
      let fotoUrl = null;
      if (file) {
        fotoUrl = await laporanService.uploadFoto(file);
      }

      const { data, error } = await supabase
        .from('bukti_perbaikan')
        .insert([
          {
            id_laporan: idLaporan,
            id_teknisi: idTeknisi,
            foto_selesai: fotoUrl,
            catatan_teknisi: catatan
          }
        ])
        .select()
        .single();

      if (error) throw error;

      // Update status laporan menjadi selesai
      await laporanService.updateStatus(idLaporan, 'selesai');

      return data;
    } catch (error) {
      throw new Error(error.message || 'Gagal submit bukti perbaikan');
    }
  }
};
