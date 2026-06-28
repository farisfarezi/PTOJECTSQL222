import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { laporanService } from '../../services/laporanService';
import StatusBadge from '../../components/common/StatusBadge';
import { formatDate } from '../../utils/formatDate';
import { ArrowLeft, Loader2, MapPin, Tag, Calendar, User, Info, FileImage } from 'lucide-react';

export default function DetailPengaduan() {
  const { id } = useParams();
  const [laporan, setLaporan] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await laporanService.getById(id);
        setLaporan(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  if (loading) {
    return <div className="p-12 flex justify-center"><Loader2 size={32} className="animate-spin text-primary" /></div>;
  }

  if (!laporan) {
    return <div className="p-12 text-center text-outline">Laporan tidak ditemukan.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Link to="/riwayat" className="inline-flex items-center gap-2 text-sm font-bold text-outline hover:text-primary mb-6 transition-colors">
        <ArrowLeft size={16} /> Kembali ke Riwayat
      </Link>

      <div className="bg-surface rounded-card border border-border-subtle shadow-sm overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-border-subtle bg-background">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <h1 className="text-headline-md font-montserrat font-bold text-text-main">{laporan.judul}</h1>
            <StatusBadge type="laporan" value={laporan.status} size="lg" />
          </div>
          <div className="flex flex-wrap items-center gap-6 text-sm text-outline">
            <div className="flex items-center gap-2"><Tag size={16} /> {laporan.kategori?.nama_kategori}</div>
            <div className="flex items-center gap-2"><MapPin size={16} /> {laporan.lokasi?.nama_lokasi}</div>
            <div className="flex items-center gap-2"><Calendar size={16} /> {formatDate(laporan.created_at)}</div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            <section>
              <h3 className="text-title-lg font-bold text-text-main mb-3 flex items-center gap-2"><Info size={20} className="text-primary"/> Deskripsi Kerusakan</h3>
              <p className="text-body-lg text-on-surface-variant leading-relaxed whitespace-pre-wrap">{laporan.deskripsi}</p>
            </section>
            
            <section>
              <h3 className="text-title-lg font-bold text-text-main mb-3 flex items-center gap-2"><FileImage size={20} className="text-primary"/> Foto Bukti</h3>
              {laporan.foto_kerusakan ? (
                <a href={laporan.foto_kerusakan} target="_blank" rel="noreferrer" className="block max-w-sm rounded-card overflow-hidden border border-border-subtle hover:shadow-md transition-shadow">
                  <img src={laporan.foto_kerusakan} alt="Bukti" className="w-full h-auto" />
                </a>
              ) : (
                <p className="text-outline italic">Tidak ada foto bukti.</p>
              )}
            </section>
          </div>

          <div className="space-y-6">
            <div className="bg-background p-5 rounded-soft border border-border-subtle">
              <h4 className="font-bold text-sm text-text-main mb-4 uppercase tracking-wider">Informasi Pelapor</h4>
              <div className="space-y-3 text-sm">
                <div><p className="text-outline mb-0.5">Nama</p><p className="font-medium text-text-main">{laporan.users?.nama || '-'}</p></div>
                <div><p className="text-outline mb-0.5">Tingkat Kerusakan</p><StatusBadge type="damage" value={laporan.tingkat_kerusakan} /></div>
              </div>
            </div>

            {(laporan.catatan_admin || laporan.status === 'ditolak') && (
              <div className="bg-red-50 p-5 rounded-soft border border-red-200">
                <h4 className="font-bold text-sm text-red-800 mb-2">Catatan Admin</h4>
                <p className="text-sm text-red-700">{laporan.catatan_admin || 'Laporan ditolak oleh admin tanpa catatan.'}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
