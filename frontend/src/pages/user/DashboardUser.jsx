import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { authService } from '../../services/authService';
import { laporanService } from '../../services/laporanService';
import { PlusCircle, Clock, CheckCircle2, AlertCircle, FileText } from 'lucide-react';
import StatusBadge from '../../components/common/StatusBadge';
import { formatDateShort } from '../../utils/formatDate';

export default function DashboardUser() {
  const [laporan, setLaporan] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLaporan = async () => {
      const user = await authService.getUser();
      if (!user) { setLoading(false); return; }
      try {
        const data = await laporanService.getByUser(user.id);
        setLaporan(data.slice(0, 5));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchLaporan();
  }, []);

  const counts = {
    waiting: laporan.filter(l => l.status === 'menunggu_verifikasi').length,
    active: laporan.filter(l => l.status === 'diproses').length,
    done: laporan.filter(l => l.status === 'selesai').length,
  };

  const statCards = [
    { label: 'Menunggu Verifikasi', value: counts.waiting, icon: <Clock size={24} />, color: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-l-yellow-400' },
    { label: 'Sedang Diproses', value: counts.active, icon: <AlertCircle size={24} />, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-l-blue-400' },
    { label: 'Selesai', value: counts.done, icon: <CheckCircle2 size={24} />, color: 'text-green-600', bg: 'bg-green-50', border: 'border-l-green-500' },
  ];

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-headline-lg font-montserrat font-bold text-primary">Dashboard</h1>
          <p className="text-body-md text-outline mt-1">Selamat datang! Pantau status laporan Anda di sini.</p>
        </div>
        <Link to="/pengaduan" className="bg-primary text-white px-5 py-2.5 rounded-soft font-bold hover:bg-primary-container transition-all shadow-md flex items-center gap-2 text-sm">
          <PlusCircle size={18} /> Buat Laporan
        </Link>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {statCards.map(card => (
          <div key={card.label} className={`${card.bg} p-6 rounded-card border border-border-subtle border-l-4 ${card.border} flex items-center gap-5 hover:shadow-md transition-shadow`}>
            <div className={`${card.color} flex-shrink-0`}>{card.icon}</div>
            <div>
              <p className="text-display-sm font-montserrat font-bold text-text-main">{card.value}</p>
              <p className="text-sm text-on-surface-variant">{card.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tabel Laporan Terbaru */}
      <div className="bg-surface rounded-card border border-border-subtle shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border-subtle flex justify-between items-center">
          <h3 className="text-title-lg font-bold text-text-main">Laporan Terbaru Saya</h3>
          <Link to="/riwayat" className="text-secondary text-sm font-bold hover:underline">Lihat Semua →</Link>
        </div>
        {loading ? (
          <div className="p-8 text-center text-outline animate-pulse">Memuat laporan...</div>
        ) : laporan.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center gap-3">
            <FileText size={48} className="text-border-subtle" />
            <p className="text-outline font-medium">Anda belum memiliki laporan</p>
            <Link to="/pengaduan" className="text-secondary font-bold hover:underline text-sm">Buat laporan sekarang →</Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-background text-outline text-sm border-b border-border-subtle">
                <tr>
                  <th className="px-6 py-4 font-medium">ID</th>
                  <th className="px-6 py-4 font-medium">Judul</th>
                  <th className="px-6 py-4 font-medium">Kategori</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium">Tanggal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle">
                {laporan.map(l => (
                  <tr key={l.id} className="hover:bg-background transition-colors">
                    <td className="px-6 py-4 font-bold text-primary">#{l.id}</td>
                    <td className="px-6 py-4 font-medium text-text-main max-w-xs truncate">{l.judul}</td>
                    <td className="px-6 py-4 text-outline text-sm">{l.kategori?.nama_kategori || '-'}</td>
                    <td className="px-6 py-4"><StatusBadge type="laporan" value={l.status} /></td>
                    <td className="px-6 py-4 text-sm text-outline">{formatDateShort(l.created_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
