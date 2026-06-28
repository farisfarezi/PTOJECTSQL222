import { Link } from 'react-router-dom';
import { authService } from '../services/authService';
import { useState } from 'react';

export default function Register() {
  const [nama, setNama] = useState('');
  const [identitas, setIdentitas] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [noHp, setNoHp] = useState('');
  const [role, setRole] = useState('mahasiswa');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await authService.register({ email, password, nama, identitas, noHp, role });
      setSuccess(true);
    } catch (err) {
      setError(err.message || 'Registrasi gagal. Coba lagi.');
    }
    setLoading(false);
  };

  if (success) {
    return (
      <div className="text-center flex flex-col gap-4 items-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-3xl">✓</div>
        <h2 className="font-montserrat font-bold text-xl text-primary">Registrasi Berhasil!</h2>
        <p className="text-body-md text-outline">Akun Anda berhasil dibuat. Silakan login untuk melanjutkan.</p>
        <Link to="/login" className="bg-primary text-white px-6 py-3 rounded-soft font-bold hover:bg-primary-container transition-all">
          Ke Halaman Login
        </Link>
      </div>
    );
  }

  return (
    <>
      <h2 className="font-montserrat font-bold text-2xl text-primary mb-1">Buat Akun Baru</h2>
      <p className="text-body-md text-outline mb-6">Daftar untuk mulai melaporkan kerusakan fasilitas.</p>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-soft mb-4 text-sm">{error}</div>
      )}

      <form onSubmit={handleRegister} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label className="font-bold text-sm text-text-main">Nama Lengkap</label>
          <input type="text" placeholder="Nama sesuai identitas" value={nama} onChange={e => setNama(e.target.value)}
            className="w-full px-4 py-3 border border-outline rounded-soft focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-20 transition-all bg-background" required />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-bold text-sm text-text-main">NIM / NIP / NIK</label>
          <input type="text" placeholder="Nomor Identitas" value={identitas} onChange={e => setIdentitas(e.target.value)}
            className="w-full px-4 py-3 border border-outline rounded-soft focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-20 transition-all bg-background" required />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-bold text-sm text-text-main">No. HP / WhatsApp</label>
          <input type="tel" placeholder="08xxxxxxxxxx" value={noHp} onChange={e => setNoHp(e.target.value)}
            className="w-full px-4 py-3 border border-outline rounded-soft focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-20 transition-all bg-background" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-bold text-sm text-text-main">Peran</label>
          <select value={role} onChange={e => setRole(e.target.value)}
            className="w-full px-4 py-3 border border-outline rounded-soft focus:outline-none focus:border-primary bg-background">
            <option value="mahasiswa">Mahasiswa</option>
            <option value="dosen">Dosen</option>
            <option value="staff">Staff</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-bold text-sm text-text-main">Email Institusi</label>
          <input type="email" placeholder="nama@polinela.ac.id" value={email} onChange={e => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-outline rounded-soft focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-20 transition-all bg-background" required />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-bold text-sm text-text-main">Password</label>
          <input type="password" placeholder="Min. 8 karakter" value={password} onChange={e => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-outline rounded-soft focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-20 transition-all bg-background" required minLength={8} />
        </div>

        <button type="submit" disabled={loading}
          className="w-full bg-primary text-white py-3 rounded-soft font-bold hover:bg-primary-container transition-all shadow-md disabled:opacity-50 mt-2">
          {loading ? 'Memproses...' : 'Daftar Akun'}
        </button>
      </form>

      <p className="text-center text-sm text-outline mt-6">
        Sudah punya akun?{' '}
        <Link to="/login" className="text-secondary font-bold hover:underline">Masuk di sini</Link>
      </p>
    </>
  );
}
