import { useState, useEffect, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { laporanService } from '../../services/laporanService';
import { userService } from '../../services/userService';
import StatusBadge from '../../components/common/StatusBadge';
import { formatDate } from '../../utils/formatDate';
import Button from '../../components/common/Button';
import TextareaField from '../../components/common/TextareaField';
import SelectField from '../../components/common/SelectField';
import { ArrowLeft, Loader2, MapPin, Tag, Calendar, User, Info, FileImage } from 'lucide-react';

export default function DetailLaporan() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [laporan, setLaporan] = useState(null);
  const [teknisi, setTeknisi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [catatan, setCatatan] = useState('');
  const [selectedTeknisi, setSelectedTeknisi] = useState('');

  const fetchLaporan = useCallback(async () => {
    try {
      const [lapData, tekData] = await Promise.all([
        laporanService.getById(id),
        userService.getTeknisi()
      ]);
      setLaporan(lapData);
      setTeknisi(tekData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchLaporan();
  }, [fetchLaporan]);

  const handleUpdateStatus = async (status) => {
    setActionLoading(true);
    try {
      await laporanService.updateStatus(id, status, catatan);
      await fetchLaporan();
    } catch (err) {
      alert('Gagal update status: ' + err.message);
    } finally {
      setActionLoading(false);
    }
  };

  const handleAssignTeknisi = async () => {
    if (!selectedTeknisi) return alert('Pilih teknisi terlebih dahulu.');
    setActionLoading(true);
    try {
      await laporanService.assignTeknisi(id, selectedTeknisi);
      await fetchLaporan();
    } catch (err) {
      alert('Gagal assign teknisi: ' + err.message);
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) return <div className="p-12 flex justify-center"><Loader2 size={32} className="animate-spin text-primary" /></div>;
  if (!laporan) return <div className="p-12 text-center text-outline">Laporan tidak ditemukan.</div>;

  return (
    <div className="max-w-5xl mx-auto">
      <Link to="/admin/laporan" className="inline-flex items-center gap-2 text-sm font-bold text-outline hover:text-primary mb-6 transition-colors">
        <ArrowLeft size={16} /> Kembali ke Data Laporan
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-surface rounded-card border border-border-subtle shadow-sm overflow-hidden">
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

            <div className="p-6">
              <h3 className="text-title-md font-bold text-text-main mb-2">Deskripsi Laporan</h3>
              <p className="text-body-md text-on-surface-variant leading-relaxed mb-6">{laporan.deskripsi}</p>
              
              <h3 className="text-title-md font-bold text-text-main mb-2">Foto Bukti</h3>
              {laporan.foto_kerusakan ? (
                <a href={laporan.foto_kerusakan} target="_blank" rel="noreferrer" className="block max-w-sm rounded-card overflow-hidden border border-border-subtle">
                  <img src={laporan.foto_kerusakan} alt="Bukti" className="w-full h-auto" />
                </a>
              ) : (
                <p className="text-outline italic text-sm">Tidak ada foto bukti.</p>
              )}
            </div>
          </div>
          
          {/* Action Panel for Admin */}
          <div className="bg-surface rounded-card border border-border-subtle shadow-sm p-6">
            <h3 className="text-title-lg font-bold text-text-main mb-4">Aksi Laporan</h3>
            
            {laporan.status === 'menunggu_verifikasi' && (
              <div className="space-y-4">
                <TextareaField
                  label="Catatan Admin (Opsional)"
                  name="catatan"
                  value={catatan}
                  onChange={(e) => setCatatan(e.target.value)}
                  placeholder="Tambahkan catatan jika laporan ditolak atau ada info tambahan..."
                  rows={2}
                />
                <div className="flex gap-4">
                  <Button variant="danger" loading={actionLoading} onClick={() => handleUpdateStatus('ditolak')}>Tolak Laporan</Button>
                  <Button variant="primary" loading={actionLoading} onClick={() => handleUpdateStatus('diverifikasi')}>Verifikasi Laporan</Button>
                </div>
              </div>
            )}

            {laporan.status === 'diverifikasi' && (
              <div className="space-y-4">
                <SelectField
                  label="Tugaskan ke Teknisi"
                  name="teknisi"
                  value={selectedTeknisi}
                  onChange={(e) => setSelectedTeknisi(e.target.value)}
                  options={teknisi.map(t => ({ value: t.id, label: t.nama }))}
                />
                <Button variant="primary" loading={actionLoading} onClick={handleAssignTeknisi} disabled={!selectedTeknisi}>
                  Assign & Proses
                </Button>
              </div>
            )}
            
            {['diproses', 'selesai', 'ditolak'].includes(laporan.status) && (
              <p className="text-outline text-sm">Laporan ini sudah tidak memerlukan aksi admin saat ini.</p>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-surface p-6 rounded-card border border-border-subtle shadow-sm">
            <h4 className="font-bold text-sm text-text-main mb-4 uppercase tracking-wider flex items-center gap-2"><User size={16}/> Pelapor</h4>
            <div className="space-y-4 text-sm">
              <div><p className="text-outline mb-1">Nama Pelapor</p><p className="font-bold text-text-main">{laporan.users?.nama}</p></div>
              <div><p className="text-outline mb-1">Tingkat Kerusakan</p><StatusBadge type="damage" value={laporan.tingkat_kerusakan} /></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
