import { Link } from 'react-router-dom';
import StatusBadge from '../common/StatusBadge';
import { formatDateTime } from '../../utils/formatDate';
import { Eye, CheckCircle2, UserCheck, XCircle } from 'lucide-react';

export default function AdminReportTable({ laporan = [], loading = false, onUpdateStatus }) {
  if (loading) {
    return <div className="p-12 text-center text-outline">Memuat data laporan...</div>;
  }

  if (laporan.length === 0) {
    return <div className="p-12 text-center text-outline">Tidak ada laporan yang sesuai dengan kriteria.</div>;
  }

  return (
    <div className="overflow-x-auto min-h-[400px]">
      <table className="w-full text-left whitespace-nowrap">
        <thead className="bg-background text-outline text-sm border-b border-border-subtle sticky top-0 z-10">
          <tr>
            <th className="px-5 py-4 font-bold">ID</th>
            <th className="px-5 py-4 font-bold">Pelapor</th>
            <th className="px-5 py-4 font-bold">Fasilitas & Lokasi</th>
            <th className="px-5 py-4 font-bold">Status</th>
            <th className="px-5 py-4 font-bold text-center">Waktu Masuk</th>
            <th className="px-5 py-4 font-bold text-right">Aksi Cepat</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border-subtle">
          {laporan.map((item) => (
            <tr key={item.id} className="hover:bg-background transition-colors group">
              <td className="px-5 py-4 font-bold text-primary text-sm">#{item.id}</td>
              <td className="px-5 py-4">
                <p className="font-medium text-text-main text-sm">{item.users?.nama || 'Unknown'}</p>
                <p className="text-xs text-outline capitalize">{item.users?.role}</p>
              </td>
              <td className="px-5 py-4">
                <p className="font-bold text-text-main text-sm max-w-[200px] truncate" title={item.judul}>{item.judul}</p>
                <p className="text-xs text-outline">{item.kategori?.nama_kategori} • {item.lokasi?.nama_lokasi}</p>
              </td>
              <td className="px-5 py-4">
                <div className="flex flex-col items-start gap-1">
                  <StatusBadge type="laporan" value={item.status} />
                  {item.tingkat_kerusakan === 'darurat' && <StatusBadge type="damage" value={item.tingkat_kerusakan} />}
                </div>
              </td>
              <td className="px-5 py-4 text-center text-sm text-outline">
                {formatDateTime(item.created_at)}
              </td>
              <td className="px-5 py-4">
                <div className="flex items-center justify-end gap-2">
                  <Link
                    to={`/admin/laporan/${item.id}`}
                    className="p-1.5 rounded bg-surface border border-outline text-text-main hover:border-primary hover:text-primary transition-all"
                    title="Lihat Detail"
                  >
                    <Eye size={16} />
                  </Link>
                  {item.status === 'menunggu_verifikasi' && (
                    <>
                      <button
                        onClick={() => onUpdateStatus(item.id, 'diverifikasi')}
                        className="p-1.5 rounded bg-blue-50 border border-blue-200 text-blue-700 hover:bg-blue-600 hover:text-white transition-all"
                        title="Verifikasi"
                      >
                        <CheckCircle2 size={16} />
                      </button>
                      <button
                        onClick={() => onUpdateStatus(item.id, 'ditolak')}
                        className="p-1.5 rounded bg-red-50 border border-red-200 text-red-700 hover:bg-red-600 hover:text-white transition-all"
                        title="Tolak"
                      >
                        <XCircle size={16} />
                      </button>
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
