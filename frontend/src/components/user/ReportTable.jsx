import { Link } from 'react-router-dom';
import StatusBadge from '../common/StatusBadge';
import { formatDateShort } from '../../utils/formatDate';
import { FileText } from 'lucide-react';

export default function ReportTable({ laporan = [], loading = false }) {
  if (loading) {
    return <div className="p-8 text-center text-outline">Memuat laporan...</div>;
  }

  if (laporan.length === 0) {
    return (
      <div className="p-12 text-center flex flex-col items-center gap-3">
        <FileText size={48} className="text-border-subtle" />
        <p className="text-outline font-medium">Anda belum memiliki laporan</p>
        <Link to="/pengaduan" className="text-secondary font-bold hover:underline text-sm">Buat laporan sekarang →</Link>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead className="bg-background text-outline text-sm border-b border-border-subtle">
          <tr>
            <th className="px-6 py-4 font-medium">ID Laporan</th>
            <th className="px-6 py-4 font-medium">Tanggal</th>
            <th className="px-6 py-4 font-medium">Judul Laporan</th>
            <th className="px-6 py-4 font-medium">Kategori</th>
            <th className="px-6 py-4 font-medium">Status</th>
            <th className="px-6 py-4 font-medium text-right">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border-subtle">
          {laporan.map((item) => (
            <tr key={item.id} className="hover:bg-background transition-colors group">
              <td className="px-6 py-4 font-bold text-primary text-sm">#{item.id}</td>
              <td className="px-6 py-4 text-sm text-outline">{formatDateShort(item.created_at)}</td>
              <td className="px-6 py-4 font-medium text-text-main max-w-xs truncate">{item.judul}</td>
              <td className="px-6 py-4 text-outline text-sm">{item.kategori?.nama_kategori}</td>
              <td className="px-6 py-4">
                <StatusBadge type="laporan" value={item.status} />
              </td>
              <td className="px-6 py-4 text-right">
                <Link to={`/pengaduan/${item.id}`} className="text-secondary text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity hover:underline">
                  Detail →
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
