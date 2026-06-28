import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Zap } from 'lucide-react';

export default function HeroSection() {
  return (
    <section id="beranda" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-background">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-primary-container opacity-5 rounded-bl-full -z-10 transform translate-x-1/3 -translate-y-1/4"></div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col gap-6">
          <div className="inline-flex items-center gap-2 bg-surface border border-border-subtle px-4 py-2 rounded-full w-max shadow-sm">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-status-verified opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-secondary"></span>
            </span>
            <span className="text-sm font-bold text-text-main">Sistem Terpadu POLINELA v2.0</span>
          </div>
          
          <h1 className="text-display-md lg:text-display-lg font-montserrat font-extrabold text-primary leading-tight">
            Pelaporan Kerusakan <br className="hidden md:block"/> Fasilitas Lebih <span className="text-secondary">Cepat & Tepat</span>
          </h1>
          
          <p className="text-body-lg text-on-surface-variant max-w-lg leading-relaxed">
            Sistem Informasi Pengaduan Fasilitas (SIPFAS) membantu mahasiswa dan dosen melaporkan kerusakan lingkungan kampus secara real-time untuk penanganan yang responsif.
          </p>
          
          <div className="flex flex-wrap gap-4 mt-4">
            <Link to="/pengaduan" className="bg-primary text-white px-8 py-4 rounded-soft font-bold shadow-md hover:shadow-lg hover:bg-primary-container transition-all flex items-center gap-2 group">
              Buat Pengaduan
              <ArrowRight size={20} className="transform group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/riwayat" className="bg-surface text-primary border border-outline px-8 py-4 rounded-soft font-bold hover:bg-surface-container transition-colors">
              Cek Status Laporan
            </Link>
          </div>
          
          <div className="flex items-center gap-6 mt-8 pt-6 border-t border-border-subtle">
            <div className="flex items-center gap-2 text-sm font-medium text-text-main">
              <ShieldCheck className="text-status-verified" size={20}/> Terverifikasi Admin
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-text-main">
              <Zap className="text-status-progress" size={20}/> Penanganan Cepat
            </div>
          </div>
        </div>
        
        <div className="relative hidden lg:block">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary to-secondary rounded-card transform rotate-3 scale-105 opacity-10 blur-xl"></div>
          <img 
            src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
            alt="Kampus Polinela" 
            className="relative rounded-card shadow-2xl object-cover h-[500px] w-full border border-surface"
          />
          {/* Floating Card */}
          <div className="absolute -bottom-6 -left-6 bg-surface p-4 rounded-card shadow-xl border border-border-subtle flex items-center gap-4 hover:-translate-y-2 transition-transform duration-300">
            <div className="bg-status-verified bg-opacity-20 p-3 rounded-full">
              <ShieldCheck className="text-status-verified" size={24}/>
            </div>
            <div>
              <p className="font-bold text-text-main">100+ Laporan</p>
              <p className="text-xs text-outline">Berhasil ditangani bulan ini</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
