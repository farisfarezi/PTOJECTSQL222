import { useState, useEffect } from 'react';
import { lokasiService } from '../../services/lokasiService';
import { Loader2, Plus, Edit2, Trash2 } from 'lucide-react';
import Button from '../../components/common/Button';

export default function DataLokasi() {
  const [lokasi, setLokasi] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    lokasiService.getAll().then(data => {
      setLokasi(data);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-headline-md font-montserrat font-bold text-primary">Data Lokasi</h1>
          <p className="text-body-md text-outline mt-1">Kelola data gedung dan ruangan.</p>
        </div>
        <Button icon={<Plus size={18} />}>Tambah Lokasi</Button>
      </div>

      <div className="bg-surface rounded-card border border-border-subtle shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 flex justify-center"><Loader2 size={32} className="animate-spin text-primary" /></div>
        ) : (
          <table className="w-full text-left whitespace-nowrap">
            <thead className="bg-background text-outline text-sm border-b border-border-subtle">
              <tr>
                <th className="px-6 py-4 font-bold">Nama Gedung/Ruangan</th>
                <th className="px-6 py-4 font-bold w-full">Detail</th>
                <th className="px-6 py-4 font-bold text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {lokasi.map((l) => (
                <tr key={l.id} className="hover:bg-background transition-colors">
                  <td className="px-6 py-4 font-bold text-text-main">{l.nama_lokasi}</td>
                  <td className="px-6 py-4 text-outline text-sm">{l.detail_lokasi || '-'}</td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <button className="p-2 text-outline hover:text-primary transition-colors"><Edit2 size={16} /></button>
                      <button className="p-2 text-outline hover:text-error transition-colors"><Trash2 size={16} /></button>
                    </div>
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
