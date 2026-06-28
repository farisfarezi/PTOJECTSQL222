import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';
import { laporanService } from '../../services/laporanService';
import FormPengaduan from '../../components/pengaduan/FormPengaduan';

export default function BuatPengaduan() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (formData, file) => {
    setLoading(true);
    try {
      const user = await authService.getUser();
      if (!user) throw new Error('Silakan login terlebih dahulu.');

      let fotoUrl = null;
      if (file) {
        fotoUrl = await laporanService.uploadFoto(user.id, file);
      }

      await laporanService.create({
        ...formData,
        id_user: user.id,
        foto_kerusakan: fotoUrl,
        status: 'menunggu_verifikasi',
      });

      alert('Laporan berhasil dikirim!');
      navigate('/riwayat');
    } catch (err) {
      alert('Gagal mengirim laporan: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-headline-lg font-montserrat font-bold text-primary">Buat Pengaduan</h1>
        <p className="text-body-md text-outline mt-1">Sampaikan laporan kerusakan fasilitas dengan detail dan akurat.</p>
      </div>

      <div className="bg-surface rounded-card border border-border-subtle shadow-sm p-6 md:p-8">
        <FormPengaduan onSubmit={handleSubmit} loading={loading} />
      </div>
    </div>
  );
}
