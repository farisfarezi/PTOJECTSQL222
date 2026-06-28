import { useState, useEffect } from 'react';
import { laporanService } from '../../services/laporanService';
import { authService } from '../../services/authService';
import ReportTable from '../../components/user/ReportTable';
import { FileText, Filter } from 'lucide-react';

export default function RiwayatPengaduan() {
  const [laporan, setLaporan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetch = async () => {
      const user = await authService.getUser();
      if (!user) return;
      const data = await laporanService.getByUser(user.id);
      setLaporan(data);
      setLoading(false);
    };
    fetch();
  }, []);

  const filtered = filter === 'all' ? laporan : laporan.filter(l => l.status === filter);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-headline-lg font-montserrat font-bold text-primary">Riwayat Pengaduan</h1>
          <p className="text-body-md text-outline mt-1">Daftar seluruh laporan kerusakan yang pernah Anda buat.</p>
        </div>
        <div className="flex items-center gap-2 bg-surface p-1 rounded-soft border border-border-subtle">
          <Filter size={18} className="text-outline ml-2" />
          <select value={filter} onChange={e => setFilter(e.target.value)} className="bg-transparent border-none text-sm font-bold text-text-main focus:outline-none p-2 cursor-pointer">
            <option value="all">Semua Status</option>
            <option value="menunggu_verifikasi">Menunggu Verifikasi</option>
            <option value="diverifikasi">Diverifikasi</option>
            <option value="diproses">Diproses</option>
            <option value="selesai">Selesai</option>
            <option value="ditolak">Ditolak</option>
          </select>
        </div>
      </div>

      <div className="bg-surface rounded-card border border-border-subtle shadow-sm overflow-hidden">
        <ReportTable laporan={filtered} loading={loading} />
      </div>
    </div>
  );
}
