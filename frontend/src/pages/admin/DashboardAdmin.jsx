import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, XCircle, Clock, ClipboardList, Wrench, TrendingUp, ArrowRight } from 'lucide-react';
import StatusBadge from '../../components/common/StatusBadge';
import { formatDateTime } from '../../utils/formatDate';

// === MOCK DATA — akan diganti dengan laporanService.getAll() saat Supabase sudah terkoneksi ===
const mockLaporan = [
  { id: 1001, judul: 'AC Ruang Kelas A1 Tidak Dingin', status: 'menunggu_verifikasi', tingkat_kerusakan: 'sedang', created_at: '2026-06-28T08:00:00Z', users: { nama: 'Budi Santoso' }, kategori: { nama_kategori: 'Elektronik & IT' }, lokasi: { nama_lokasi: 'Gedung A' } },
  { id: 1002, judul: 'Toilet Lantai 2 Gedung B Mampet', status: 'diverifikasi', tingkat_kerusakan: 'berat', created_at: '2026-06-27T14:00:00Z', users: { nama: 'Siti Rahayu' }, kategori: { nama_kategori: 'Air & Sanitasi' }, lokasi: { nama_lokasi: 'Gedung B' } },
  { id: 1003, judul: 'Lampu Aula Utama Mati', status: 'diproses', tingkat_kerusakan: 'ringan', created_at: '2026-06-26T09:30:00Z', users: { nama: 'Ahmad Fauzi' }, kategori: { nama_kategori: 'Kelistrikan' }, lokasi: { nama_lokasi: 'Aula Utama' } },
  { id: 1004, judul: 'Proyektor Ruang Lab Rusak', status: 'selesai', tingkat_kerusakan: 'sedang', created_at: '2026-06-25T11:00:00Z', users: { nama: 'Dewi Lestari' }, kategori: { nama_kategori: 'Elektronik & IT' }, lokasi: { nama_lokasi: 'Lab Komputer' } },
  { id: 1005, judul: 'Pintu Kelas C3 Rusak Engsel', status: 'ditolak', tingkat_kerusakan: 'ringan', created_at: '2026-06-24T16:00:00Z', users: { nama: 'Rizal Pratama' }, kategori: { nama_kategori: 'Infrastruktur' }, lokasi: { nama_lokasi: 'Gedung C' } },
  { id: 1006, judul: 'Saluran Air Kantin Tersumbat', status: 'menunggu_verifikasi', tingkat_kerusakan: 'darurat', created_at: '2026-06-28T07:00:00Z', users: { nama: 'Rini Wahyuni' }, kategori: { nama_kategori: 'Air & Sanitasi' }, lokasi: { nama_lokasi: 'Kantin' } },
];

export default function DashboardAdmin() {
  const [laporan, setLaporan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    // Simulasi delay fetch
    setTimeout(() => {
      setLaporan(mockLaporan);
      setLoading(false);
    }, 600);
  }, []);

  const handleUpdateStatus = (id, status) => {
    setLaporan(prev => prev.map(l => l.id === id ? { ...l, status } : l));
  };

  const filtered = filterStatus === 'all' ? laporan : laporan.filter(l => l.status === filterStatus);

  const statCards = [
    { label: 'Total Laporan', value: laporan.length, icon: <ClipboardList size={20} />, color: 'text-primary', border: 'border-l-primary' },
    { label: 'Menunggu Verifikasi', value: laporan.filter(l => l.status === 'menunggu_verifikasi').length, icon: <Clock size={20} />, color: 'text-yellow-600', border: 'border-l-yellow-400' },
    { label: 'Sedang Diproses', value: laporan.filter(l => l.status === 'diproses').length, icon: <Wrench size={20} />, color: 'text-purple-600', border: 'border-l-purple-500' },
    { label: 'Selesai Ditangani', value: laporan.filter(l => l.status === 'selesai').length, icon: <CheckCircle2 size={20} />, color: 'text-green-600', border: 'border-l-green-500' },
  ];

  const filterLabels = {
    all: 'Semua',
    menunggu_verifikasi: 'Menunggu',
    diverifikasi: 'Diverifikasi',
    diproses: 'Diproses',
    selesai: 'Selesai',
    ditolak: 'Ditolak',
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-headline-lg font-montserrat font-bold text-primary">Dashboard Admin</h1>
          <p className="text-body-md text-outline mt-1">Kelola dan verifikasi semua laporan fasilitas kampus.</p>
        </div>
        <Link
          to="/admin/laporan"
          className="inline-flex items-center gap-2 bg-secondary text-white px-5 py-2.5 rounded-soft font-bold hover:bg-opacity-90 transition-all shadow-md text-sm"
        >
          Kelola Semua Laporan <ArrowRight size={16} />
        </Link>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {statCards.map(s => (
          <div key={s.label} className={`bg-surface p-5 rounded-card border border-border-subtle shadow-sm border-l-4 ${s.border} hover:shadow-md transition-shadow`}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-display-sm font-montserrat font-bold text-text-main">{loading ? '—' : s.value}</p>
                <p className="text-xs font-medium text-outline mt-1">{s.label}</p>
              </div>
              <span className={`${s.color} bg-background p-2 rounded-soft border border-border-subtle`}>
                {s.icon}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Progress Overview */}
      <div className="bg-surface rounded-card border border-border-subtle shadow-sm p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-text-main flex items-center gap-2"><TrendingUp size={18} className="text-primary" /> Distribusi Status Laporan</h3>
        </div>
        <div className="space-y-3">
          {[
            { label: 'Selesai', count: laporan.filter(l => l.status === 'selesai').length, color: 'bg-green-500' },
            { label: 'Diproses', count: laporan.filter(l => l.status === 'diproses').length, color: 'bg-purple-500' },
            { label: 'Menunggu', count: laporan.filter(l => l.status === 'menunggu_verifikasi').length, color: 'bg-yellow-400' },
            { label: 'Ditolak', count: laporan.filter(l => l.status === 'ditolak').length, color: 'bg-red-500' },
          ].map(item => (
            <div key={item.label} className="flex items-center gap-4">
              <p className="text-sm font-medium text-outline w-24 flex-shrink-0">{item.label}</p>
              <div className="flex-1 bg-background rounded-full h-2.5 border border-border-subtle">
                <div
                  className={`${item.color} h-2.5 rounded-full transition-all duration-700`}
                  style={{ width: laporan.length > 0 ? `${(item.count / laporan.length) * 100}%` : '0%' }}
                />
              </div>
              <p className="text-sm font-bold text-text-main w-8 text-right">{item.count}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-surface rounded-card border border-border-subtle shadow-sm overflow-hidden">
        {/* Filter Bar */}
        <div className="p-4 border-b border-border-subtle bg-background flex items-center gap-2 flex-wrap">
          <span className="text-xs font-bold text-outline uppercase tracking-wider mr-2">Filter:</span>
          {Object.entries(filterLabels).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setFilterStatus(key)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                filterStatus === key
                  ? 'bg-primary text-white shadow-sm'
                  : 'bg-surface border border-outline text-outline hover:border-primary hover:text-primary'
              }`}
            >
              {label}
              {key !== 'all' && (
                <span className="ml-1.5 bg-white bg-opacity-20 rounded px-1">
                  {laporan.filter(l => l.status === key).length}
                </span>
              )}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="p-16 text-center text-outline animate-pulse">Memuat data laporan...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-background text-outline text-xs border-b border-border-subtle uppercase tracking-wider">
                <tr>
                  <th className="px-5 py-3 font-bold">ID</th>
                  <th className="px-5 py-3 font-bold">Pelapor</th>
                  <th className="px-5 py-3 font-bold">Laporan</th>
                  <th className="px-5 py-3 font-bold">Tingkat</th>
                  <th className="px-5 py-3 font-bold">Status</th>
                  <th className="px-5 py-3 font-bold">Masuk</th>
                  <th className="px-5 py-3 font-bold text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-12 text-center text-outline">
                      Tidak ada laporan dengan status ini.
                    </td>
                  </tr>
                ) : filtered.map(l => (
                  <tr key={l.id} className="hover:bg-background transition-colors group">
                    <td className="px-5 py-4 font-bold text-primary text-sm">#{l.id}</td>
                    <td className="px-5 py-4 text-sm font-medium text-text-main">{l.users?.nama || '-'}</td>
                    <td className="px-5 py-4">
                      <p className="font-bold text-sm text-text-main max-w-[180px] truncate">{l.judul}</p>
                      <p className="text-xs text-outline mt-0.5">{l.lokasi?.nama_lokasi} • {l.kategori?.nama_kategori}</p>
                    </td>
                    <td className="px-5 py-4">
                      <StatusBadge type="damage" value={l.tingkat_kerusakan} />
                    </td>
                    <td className="px-5 py-4">
                      <StatusBadge type="laporan" value={l.status} />
                    </td>
                    <td className="px-5 py-4 text-xs text-outline whitespace-nowrap">{formatDateTime(l.created_at)}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-1.5">
                        {l.status === 'menunggu_verifikasi' && (
                          <>
                            <button
                              onClick={() => handleUpdateStatus(l.id, 'diverifikasi')}
                              className="p-1.5 rounded bg-blue-50 border border-blue-200 text-blue-700 hover:bg-blue-600 hover:text-white transition-all"
                              title="Verifikasi"
                            >
                              <CheckCircle2 size={15} />
                            </button>
                            <button
                              onClick={() => handleUpdateStatus(l.id, 'ditolak')}
                              className="p-1.5 rounded bg-red-50 border border-red-200 text-red-700 hover:bg-red-600 hover:text-white transition-all"
                              title="Tolak"
                            >
                              <XCircle size={15} />
                            </button>
                          </>
                        )}
                        <Link
                          to={`/admin/laporan/${l.id}`}
                          className="text-xs text-secondary font-bold opacity-0 group-hover:opacity-100 transition-opacity hover:underline ml-1"
                        >
                          Detail →
                        </Link>
                      </div>
                    </td>
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
