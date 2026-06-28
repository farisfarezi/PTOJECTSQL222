import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { laporanService } from '../../services/laporanService';
import { authService } from '../../services/authService';
import StatusBadge from '../../components/common/StatusBadge';
import Button from '../../components/common/Button';
import TextareaField from '../../components/common/TextareaField';
import UploadBox from '../../components/common/UploadBox';
import { ArrowLeft, Loader2, MapPin, Tag, Calendar, Wrench } from 'lucide-react';
import { formatDate } from '../../utils/formatDate';

export default function DetailTugas() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tugas, setTugas] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [catatan, setCatatan] = useState('');
  const [file, setFile] = useState(null);

  useEffect(() => {
    laporanService.getById(id).then(data => {
      setTugas(data);
      setLoading(false);
    });
  }, [id]);

  const handleSubmitSelesai = async (e) => {
    e.preventDefault();
    if (!catatan) return alert('Catatan perbaikan wajib diisi');
    
    setSubmitting(true);
    try {
      const user = await authService.getUser();
      await laporanService.submitBuktiPerbaikan({
        idLaporan: id,
        idTeknisi: user.id,
        file,
        catatan,
      });
      alert('Tugas perbaikan berhasil diselesaikan!');
      navigate('/teknisi/tugas');
    } catch (err) {
      alert('Gagal menyelesaikan tugas: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="p-12 flex justify-center"><Loader2 size={32} className="animate-spin text-primary" /></div>;
  if (!tugas) return <div className="p-12 text-center text-outline">Tugas tidak ditemukan.</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <Link to="/teknisi/tugas" className="inline-flex items-center gap-2 text-sm font-bold text-outline hover:text-primary mb-6 transition-colors">
        <ArrowLeft size={16} /> Kembali ke Daftar Tugas
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-surface rounded-card border border-border-subtle shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-title-lg font-bold text-text-main">{tugas.judul}</h2>
            <StatusBadge type="laporan" value={tugas.status} />
          </div>
          <div className="space-y-2 text-sm text-outline mb-6">
            <p className="flex items-center gap-2"><Tag size={16}/> {tugas.kategori?.nama_kategori}</p>
            <p className="flex items-center gap-2"><MapPin size={16}/> {tugas.lokasi?.nama_lokasi}</p>
            <p className="flex items-center gap-2"><Calendar size={16}/> {formatDate(tugas.created_at)}</p>
          </div>
          <div>
            <p className="font-bold text-sm text-text-main mb-1">Deskripsi Kerusakan:</p>
            <p className="text-body-sm bg-background p-3 rounded border border-border-subtle">{tugas.deskripsi}</p>
          </div>
        </div>

        <div className="bg-surface rounded-card border border-border-subtle shadow-sm p-6">
          <h3 className="text-title-md font-bold text-text-main mb-4 flex items-center gap-2"><Wrench size={18}/> Penyelesaian Tugas</h3>
          {tugas.status === 'diproses' ? (
            <form onSubmit={handleSubmitSelesai} className="space-y-4">
              <TextareaField
                label="Catatan Hasil Perbaikan"
                name="catatan"
                value={catatan}
                onChange={e => setCatatan(e.target.value)}
                placeholder="Jelaskan apa saja yang telah diperbaiki..."
                required
              />
              <UploadBox
                label="Foto Bukti Perbaikan (Opsional)"
                onChange={setFile}
              />
              <Button type="submit" fullWidth loading={submitting}>Tandai Selesai</Button>
            </form>
          ) : (
            <div className="bg-green-50 p-4 rounded border border-green-200 text-center">
              <p className="font-bold text-green-700">Tugas ini sudah selesai.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
