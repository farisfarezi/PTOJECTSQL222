import { useState, useEffect } from 'react';
import InputField from '../common/InputField';
import SelectField from '../common/SelectField';
import TextareaField from '../common/TextareaField';
import UploadBox from '../common/UploadBox';
import Button from '../common/Button';
import DamageLevelOption from './DamageLevelOption';
import { validateForm, validateFile } from '../../utils/validation';
import { kategoriService } from '../../services/kategoriService';
import { lokasiService } from '../../services/lokasiService';

export default function FormPengaduan({ onSubmit, loading }) {
  const [formData, setFormData] = useState({
    judul: '',
    id_kategori: '',
    id_lokasi: '',
    deskripsi: '',
    tingkat_kerusakan: '',
  });
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [options, setOptions] = useState({ kategori: [], lokasi: [] });

  useEffect(() => {
    Promise.all([kategoriService.getAll(), lokasiService.getAll()]).then(([kat, lok]) => {
      setOptions({
        kategori: kat.map(k => ({ value: k.id, label: k.nama_kategori })),
        lokasi: lok.map(l => ({ value: l.id, label: l.nama_lokasi })),
      });
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  };

  const handleFileChange = (f) => {
    setFile(f);
    if (errors.file) setErrors(prev => ({ ...prev, file: null }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    const fileError = validateFile(file);
    if (fileError) validationErrors.file = fileError;

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    onSubmit(formData, file);
  };

  const damageLevels = [
    { level: 'ringan', label: 'Ringan', desc: 'Tidak mengganggu aktivitas utama.', color: 'gray-500' },
    { level: 'sedang', label: 'Sedang', desc: 'Mengganggu sebagian aktivitas.', color: 'yellow-600' },
    { level: 'berat', label: 'Berat', desc: 'Fasilitas tidak dapat digunakan.', color: 'orange-600' },
    { level: 'darurat', label: 'Darurat', desc: 'Berbahaya jika tidak segera ditangani.', color: 'error' },
  ];

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <InputField
        label="Judul Laporan"
        name="judul"
        placeholder="Contoh: AC Ruang Kelas A1 Bocor"
        value={formData.judul}
        onChange={handleChange}
        error={errors.judul}
        required
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SelectField
          label="Kategori Fasilitas"
          name="id_kategori"
          options={options.kategori}
          value={formData.id_kategori}
          onChange={handleChange}
          error={errors.id_kategori}
          required
        />
        <SelectField
          label="Lokasi / Gedung"
          name="id_lokasi"
          options={options.lokasi}
          value={formData.id_lokasi}
          onChange={handleChange}
          error={errors.id_lokasi}
          required
        />
      </div>

      <TextareaField
        label="Deskripsi Kerusakan"
        name="deskripsi"
        placeholder="Jelaskan detail kerusakan secara lengkap..."
        value={formData.deskripsi}
        onChange={handleChange}
        error={errors.deskripsi}
        required
      />

      <div>
        <label className="font-bold text-sm text-text-main block mb-2">Tingkat Kerusakan <span className="text-error">*</span></label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {damageLevels.map(dl => (
            <DamageLevelOption
              key={dl.level}
              {...dl}
              selected={formData.tingkat_kerusakan === dl.level}
              onChange={(level) => {
                setFormData(prev => ({ ...prev, tingkat_kerusakan: level }));
                if (errors.tingkat_kerusakan) setErrors(prev => ({ ...prev, tingkat_kerusakan: null }));
              }}
              colorClass={dl.color}
            />
          ))}
        </div>
        {errors.tingkat_kerusakan && <p className="text-error text-xs font-medium mt-1">{errors.tingkat_kerusakan}</p>}
      </div>

      <UploadBox
        label="Foto Bukti Kerusakan"
        onChange={handleFileChange}
        error={errors.file}
        required
      />

      <div className="flex justify-end gap-4 mt-4 pt-6 border-t border-border-subtle">
        <Button variant="outline" type="button" onClick={() => window.history.back()}>Batal</Button>
        <Button variant="primary" type="submit" loading={loading}>Kirim Laporan</Button>
      </div>
    </form>
  );
}
