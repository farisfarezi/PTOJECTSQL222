import { Link } from 'react-router-dom';
import { authService } from '../services/authService';
import { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { user } = await authService.login({ email, password });
      if (user.role === 'admin' || user.role === 'superadmin') {
        window.location.href = '/admin';
      } else if (user.role === 'teknisi') {
        window.location.href = '/teknisi';
      } else {
        window.location.href = '/dashboard';
      }
    } catch (err) {
      const msg = typeof err.message === 'string' && err.message && err.message !== '{}'
        ? err.message
        : 'Email atau password salah. Silakan coba lagi.';
      setError(msg);
    }
    setLoading(false);
  };

  return (
    <>
      <h2 className="font-montserrat font-bold text-2xl text-primary mb-1">Masuk ke Akun</h2>
      <p className="text-body-md text-outline mb-6">Masukkan kredensial Anda untuk melanjutkan.</p>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-soft mb-4 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label className="font-bold text-sm text-text-main">Email Institusi</label>
          <input
            type="email"
            placeholder="nama@polinela.ac.id"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-outline rounded-soft focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-20 transition-all bg-background"
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-bold text-sm text-text-main">Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-outline rounded-soft focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-20 transition-all bg-background"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-white py-3 rounded-soft font-bold hover:bg-primary-container transition-all shadow-md disabled:opacity-50 mt-2"
        >
          {loading ? 'Memproses...' : 'Masuk'}
        </button>
      </form>

      <p className="text-center text-sm text-outline mt-6">
        Belum punya akun?{' '}
        <Link to="/register" className="text-secondary font-bold hover:underline">Daftar sekarang</Link>
      </p>
    </>
  );
}
