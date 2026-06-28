import { useState, useEffect } from 'react';
import { kategoriService } from '../../services/kategoriService';
import { Loader2, Plus, Edit2, Trash2 } from 'lucide-react';
import Button from '../../components/common/Button';

export default function DataKategori() {
  const [kategori, setKategori] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    kategoriService.getAll().then(data => {
      setKategori(data);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-headline-md font-montserrat font-bold text-primary">Data Kategori</h1>
          <p className="text-body-md text-outline mt-1">Kelola kategori fasilitas.</p>
        </div>
        <Button icon={<Plus size={18} />}>Tambah Kategori</Button>
      </div>

      <div className="bg-surface rounded-card border border-border-subtle shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 flex justify-center"><Loader2 size={32} className="animate-spin text-primary" /></div>
        ) : (
          <table className="w-full text-left whitespace-nowrap">
            <thead className="bg-background text-outline text-sm border-b border-border-subtle">
              <tr>
                <th className="px-6 py-4 font-bold">ID</th>
                <th className="px-6 py-4 font-bold w-full">Nama Kategori</th>
                <th className="px-6 py-4 font-bold text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {kategori.map((k) => (
                <tr key={k.id} className="hover:bg-background transition-colors">
                  <td className="px-6 py-4 font-bold text-primary text-sm">{k.id}</td>
                  <td className="px-6 py-4 font-bold text-text-main">{k.nama_kategori}</td>
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
