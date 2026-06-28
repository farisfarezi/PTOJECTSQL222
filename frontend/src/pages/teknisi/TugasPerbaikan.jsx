import { useState } from 'react';
import { Link } from 'react-router-dom';
import StatusBadge from '../../components/common/StatusBadge';
import { formatDateShort } from '../../utils/formatDate';
import { Wrench } from 'lucide-react';

const mockTugas = [
  { id: 1002, judul: 'Toilet Lantai 2 Gedung B Mampet', status: 'diproses', updated_at: '2026-06-27T14:00:00Z', lokasi: { nama_lokasi: 'Gedung B' } },
  { id: 1003, judul: 'Lampu Aula Utama Mati', status: 'diproses', updated_at: '2026-06-26T09:30:00Z', lokasi: { nama_lokasi: 'Aula Utama' } },
  { id: 1004, judul: 'Proyektor Ruang Lab Rusak', status: 'selesai', updated_at: '2026-06-25T11:00:00Z', lokasi: { nama_lokasi: 'Lab Komputer' } },
];

export default function TugasPerbaikan() {
  const [tugas] = useState(mockTugas);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-headline-md font-montserrat font-bold text-primary">Tugas Perbaikan</h1>
        <p className="text-body-md text-outline mt-1">Daftar laporan kerusakan yang ditugaskan kepada Anda.</p>
      </div>

      <div className="bg-surface rounded-card border border-border-subtle shadow-sm overflow-hidden">
        {tugas.length === 0 ? (
          <div className="p-12 text-center text-outline flex flex-col items-center">
            <Wrench size={48} className="mb-4 text-border-subtle" />
            <p>Belum ada tugas perbaikan yang diberikan.</p>
          </div>
        ) : (
          <table className="w-full text-left whitespace-nowrap">
            <thead className="bg-background text-outline text-sm border-b border-border-subtle">
              <tr>
                <th className="px-6 py-4 font-bold">Judul Laporan</th>
                <th className="px-6 py-4 font-bold">Lokasi</th>
                <th className="px-6 py-4 font-bold">Status</th>
                <th className="px-6 py-4 font-bold">Tgl Ditugaskan</th>
                <th className="px-6 py-4 font-bold text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {tugas.map(t => (
                <tr key={t.id} className="hover:bg-background transition-colors group">
                  <td className="px-6 py-4 font-bold text-text-main max-w-[200px] truncate">{t.judul}</td>
                  <td className="px-6 py-4 text-sm text-outline">{t.lokasi?.nama_lokasi}</td>
                  <td className="px-6 py-4"><StatusBadge type="laporan" value={t.status} /></td>
                  <td className="px-6 py-4 text-sm text-outline">{formatDateShort(t.updated_at)}</td>
                  <td className="px-6 py-4 text-right">
                    <Link to={`/teknisi/tugas/${t.id}`} className="text-secondary font-bold text-sm hover:underline opacity-0 group-hover:opacity-100 transition-opacity">
                      Proses →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
