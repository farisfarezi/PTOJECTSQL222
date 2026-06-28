import { useState, useEffect } from 'react';
import { authService } from '../../services/authService';
import { userService } from '../../services/userService';
import InputField from '../../components/common/InputField';
import Button from '../../components/common/Button';
import { User, Loader2 } from 'lucide-react';

export default function ProfilUser() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    nama: '',
    identitas: '',
    no_hp: '',
  });

  useEffect(() => {
    const fetch = async () => {
      const sessionUser = await authService.getUser();
      if (!sessionUser) return;
      const profile = await userService.getProfile(sessionUser.id);
      setUser({ ...sessionUser, ...profile });
      setFormData({
        nama: profile.nama || '',
        identitas: profile.identitas || '',
        no_hp: profile.no_hp || '',
      });
      setLoading(false);
    };
    fetch();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await userService.updateProfile(user.id, formData);
      alert('Profil berhasil diperbarui!');
    } catch (err) {
      alert('Gagal update profil: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-12 flex justify-center"><Loader2 size={32} className="animate-spin text-primary" /></div>;
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-headline-lg font-montserrat font-bold text-primary">Profil Saya</h1>
        <p className="text-body-md text-outline mt-1">Kelola informasi pribadi dan pengaturan akun Anda.</p>
      </div>

      <div className="bg-surface rounded-card border border-border-subtle shadow-sm overflow-hidden flex flex-col md:flex-row">
        {/* Left Side */}
        <div className="bg-primary text-white p-8 md:w-1/3 flex flex-col items-center justify-center text-center">
          <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-4">
            <User size={48} />
          </div>
          <h2 className="font-montserrat font-bold text-xl">{user?.nama}</h2>
          <p className="text-sm text-opacity-80 text-white mt-1 capitalize">{user?.role}</p>
          <div className="mt-6 pt-6 border-t border-white border-opacity-20 w-full">
            <p className="text-xs text-opacity-60 text-white mb-1">Email</p>
            <p className="text-sm font-medium">{user?.email}</p>
          </div>
        </div>

        {/* Right Side */}
        <div className="p-8 md:w-2/3">
          <h3 className="text-title-lg font-bold text-text-main mb-6">Ubah Profil</h3>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <InputField
              label="Nama Lengkap"
              name="nama"
              value={formData.nama}
              onChange={handleChange}
              required
            />
            <InputField
              label="NIM / NIP / NIK"
              name="identitas"
              value={formData.identitas}
              onChange={handleChange}
              required
            />
            <InputField
              label="Nomor HP"
              name="no_hp"
              value={formData.no_hp}
              onChange={handleChange}
            />
            <div className="mt-4 pt-4 border-t border-border-subtle flex justify-end">
              <Button type="submit" loading={saving}>Simpan Perubahan</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
