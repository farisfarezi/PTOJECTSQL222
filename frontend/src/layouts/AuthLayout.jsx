import { Outlet, Link } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Panel – Branding */}
      <div className="hidden lg:flex w-1/2 bg-primary flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary opacity-90"></div>
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-primary font-montserrat font-bold text-2xl shadow-lg">S</div>
          <span className="font-montserrat font-bold text-white text-2xl">SIPFAS</span>
        </div>
        <div className="relative z-10">
          <h1 className="text-display-sm font-montserrat font-bold text-white mb-4">
            Fasilitas Kampus <br/>yang Lebih Baik,<br/>Dimulai dari Laporan Anda.
          </h1>
          <p className="text-body-lg text-white text-opacity-80">
            Bergabunglah dengan ribuan sivitas akademika POLINELA yang telah menggunakan SIPFAS untuk menjaga kualitas lingkungan kampus.
          </p>
          <div className="mt-10 flex gap-6">
            {[['4,500+', 'Pengguna Aktif'], ['98%', 'Kepuasan'], ['<24 Jam', 'Penanganan']].map(([v, l]) => (
              <div key={l} className="text-white">
                <p className="text-headline-sm font-montserrat font-bold">{v}</p>
                <p className="text-sm text-opacity-75 text-white">{l}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="relative z-10 text-white text-opacity-60 text-sm">
          © {new Date().getFullYear()} SIPFAS POLINELA
        </div>
      </div>

      {/* Right Panel – Form */}
      <div className="flex-1 flex flex-col justify-center items-center p-8">
        <div className="w-full max-w-md">
          <Link to="/" className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold">S</div>
            <span className="font-montserrat font-bold text-primary">SIPFAS</span>
          </Link>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
