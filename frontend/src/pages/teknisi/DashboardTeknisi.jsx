import { useState } from 'react';
import { Link } from 'react-router-dom';
import { authService } from '../../services/authService';

const mockTugas = [
  { id: 1002, judul: 'Toilet Lantai 2 Gedung B Mampet', status: 'diproses', tingkat_kerusakan: 'berat', updated_at: '2026-06-27T14:00:00Z', kategori: { nama_kategori: 'Air & Sanitasi' }, lokasi: { nama_lokasi: 'Gedung B' } },
  { id: 1003, judul: 'Lampu Aula Utama Mati', status: 'diproses', tingkat_kerusakan: 'ringan', updated_at: '2026-06-26T09:30:00Z', kategori: { nama_kategori: 'Kelistrikan' }, lokasi: { nama_lokasi: 'Aula Utama' } },
  { id: 1004, judul: 'Proyektor Ruang Lab Rusak', status: 'selesai', tingkat_kerusakan: 'sedang', updated_at: '2026-06-25T11:00:00Z', kategori: { nama_kategori: 'Elektronik & IT' }, lokasi: { nama_lokasi: 'Lab Komputer' } },
];

import { Wrench, CheckCircle2, Upload, Loader2 } from 'lucide-react';

export default function DashboardTeknisi() {
  const [tugas] = useState(mockTugas);
  const [selectedTugas, setSelectedTugas] = useState(null);
  const [catatan, setCatatan] = useState('');
  const [file, setFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const aktif = tugas.filter(t => t.status === 'diproses');
  const selesai = tugas.filter(t => t.status === 'selesai');

  const handleSelesai = async (e) => {
    e.preventDefault();
    if (!selectedTugas || !catatan) return;
    setSubmitting(true);
    try {
      await new Promise(r => setTimeout(r, 1000)); // simulasi async
      alert('Tugas berhasil diselesaikan! (Mock — belum tersimpan ke database)');
      setSelectedTugas(null); setFile(null); setCatatan('');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-headline-lg font-montserrat font-bold text-primary">Dashboard Teknisi</h1>
        <p className="text-body-md text-outline mt-1">Kelola dan selesaikan tugas perbaikan fasilitas yang diberikan.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-blue-50 p-5 rounded-card border border-border-subtle border-l-4 border-l-blue-400 flex items-center gap-4">
          <Wrench size={28} className="text-secondary" />
          <div>
            <p className="text-display-sm font-montserrat font-bold text-primary">{aktif.length}</p>
            <p className="text-sm text-outline">Tugas Aktif</p>
          </div>
        </div>
        <div className="bg-green-50 p-5 rounded-card border border-border-subtle border-l-4 border-l-green-500 flex items-center gap-4">
          <CheckCircle2 size={28} className="text-green-600" />
          <div>
            <p className="text-display-sm font-montserrat font-bold text-primary">{selesai.length}</p>
            <p className="text-sm text-outline">Diselesaikan</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daftar Tugas */}
        <div className="bg-surface rounded-card border border-border-subtle shadow-sm overflow-hidden">
          <div className="p-5 border-b border-border-subtle bg-background">
            <h3 className="text-title-lg font-bold text-text-main">Tugas Masuk</h3>
          </div>
          <div className="p-4 flex flex-col gap-3">
            {aktif.length === 0 ? (
              <div className="py-8 text-center text-outline">Tidak ada tugas aktif saat ini.</div>
            ) : aktif.map(t => (
              <div key={t.id}
                onClick={() => setSelectedTugas(t)}
                className={`p-4 rounded-soft border cursor-pointer transition-all ${
                  selectedTugas?.id === t.id ? 'border-primary bg-primary bg-opacity-5' : 'border-border-subtle hover:border-primary hover:shadow-sm'
                }`}>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-bold text-text-main">{t.judul}</p>
                    <p className="text-xs text-outline mt-1">{t.kategori?.nama_kategori} · {t.lokasi?.nama_lokasi}</p>
                  </div>
                  <span className={`text-xs font-bold px-2 py-1 rounded capitalize ${
                    t.tingkat_kerusakan === 'darurat' ? 'bg-red-100 text-red-800' :
                    t.tingkat_kerusakan === 'berat' ? 'bg-orange-100 text-orange-800' : 'bg-gray-100 text-gray-700'
                  }`}>{t.tingkat_kerusakan}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Form Penyelesaian */}
        <div className="bg-surface rounded-card border border-border-subtle shadow-sm overflow-hidden">
          <div className="p-5 border-b border-border-subtle bg-background">
            <h3 className="text-title-lg font-bold text-text-main">Form Penyelesaian</h3>
          </div>
          <div className="p-5">
            {!selectedTugas ? (
              <div className="py-16 text-center flex flex-col items-center gap-3">
                <Wrench size={48} className="text-border-subtle" />
                <p className="text-outline font-medium">Pilih tugas dari daftar kiri untuk mulai mengerjakan.</p>
              </div>
            ) : (
              <form onSubmit={handleSelesai} className="flex flex-col gap-4">
                <div className="p-4 bg-background rounded-soft border border-border-subtle">
                  <p className="text-xs text-outline font-bold mb-1">MENYELESAIKAN LAPORAN</p>
                  <p className="font-bold text-text-main">{selectedTugas.judul}</p>
                  <p className="text-sm text-outline">{selectedTugas.lokasi?.nama_lokasi}</p>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-bold text-text-main">Catatan Penyelesaian <span className="text-error">*</span></label>
                  <textarea
                    className="w-full p-3 border border-outline rounded-soft focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-20 transition-all"
                    rows="3" required value={catatan} onChange={e => setCatatan(e.target.value)}
                    placeholder="Deskripsikan pekerjaan yang telah dilakukan..."
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-bold text-text-main">Foto Bukti Perbaikan</label>
                  <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-outline rounded-soft cursor-pointer hover:border-primary hover:bg-primary hover:bg-opacity-5 transition-all">
                    <Upload size={24} className="text-outline mb-2" />
                    <span className="text-sm text-outline">{file ? file.name : 'Klik untuk upload foto'}</span>
                    <input type="file" accept="image/*" className="hidden" onChange={e => setFile(e.target.files[0])} />
                  </label>
                </div>
                <button type="submit" disabled={submitting}
                  className="w-full bg-green-600 text-white py-3 rounded-soft font-bold hover:bg-green-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2">
                  {submitting ? <><Loader2 size={18} className="animate-spin" /> Mengirim...</> : <><CheckCircle2 size={18} /> Tandai Selesai & Kirim Bukti</>}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
