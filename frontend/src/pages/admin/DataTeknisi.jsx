import { useState, useEffect } from 'react';
import { userService } from '../../services/userService';
import { Loader2 } from 'lucide-react';

export default function DataTeknisi() {
  const [teknisi, setTeknisi] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await userService.getTeknisi();
        setTeknisi(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-headline-md font-montserrat font-bold text-primary">Data Teknisi</h1>
        <p className="text-body-md text-outline mt-1">Daftar teknisi yang tersedia untuk perbaikan fasilitas.</p>
      </div>

      <div className="bg-surface rounded-card border border-border-subtle shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 flex justify-center"><Loader2 size={32} className="animate-spin text-primary" /></div>
        ) : (
          <table className="w-full text-left whitespace-nowrap">
            <thead className="bg-background text-outline text-sm border-b border-border-subtle">
              <tr>
                <th className="px-6 py-4 font-bold">Nama Teknisi</th>
                <th className="px-6 py-4 font-bold">Email</th>
                <th className="px-6 py-4 font-bold">No. HP</th>
                <th className="px-6 py-4 font-bold text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {teknisi.map((t) => (
                <tr key={t.id} className="hover:bg-background transition-colors">
                  <td className="px-6 py-4 font-bold text-text-main">{t.nama}</td>
                  <td className="px-6 py-4 text-outline">{t.email}</td>
                  <td className="px-6 py-4 text-outline">{t.no_hp || '-'}</td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800">
                      Aktif
                    </span>
                  </td>
                </tr>
              ))}
              {teknisi.length === 0 && (
                <tr><td colSpan="4" className="p-8 text-center text-outline">Belum ada data teknisi.</td></tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
