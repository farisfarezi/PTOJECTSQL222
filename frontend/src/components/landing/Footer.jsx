import { Link } from 'react-router-dom';
import { ExternalLink, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-primary font-montserrat font-bold text-xl">S</div>
              <span className="font-montserrat font-bold text-xl tracking-tight">SIPFAS POLINELA</span>
            </div>
            <p className="text-body-md text-white text-opacity-75 leading-relaxed">
              Sistem Informasi Pengaduan Fasilitas Politeknik Negeri Lampung. Mendukung lingkungan kampus yang aman dan terpelihara.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 bg-white bg-opacity-10 rounded-full flex items-center justify-center hover:bg-white hover:bg-opacity-20 transition-all">
                <ExternalLink size={18} />
              </a>
              <a href="mailto:sipfas@polinela.ac.id" className="w-10 h-10 bg-white bg-opacity-10 rounded-full flex items-center justify-center hover:bg-white hover:bg-opacity-20 transition-all">
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Menu */}
          <div className="flex flex-col gap-4">
            <h4 className="font-montserrat font-bold text-lg">Akses Cepat</h4>
            <div className="flex flex-col gap-3">
              {[
                { label: 'Beranda', to: '/' },
                { label: 'Login', to: '/login' },
                { label: 'Daftar', to: '/register' },
                { label: 'Buat Pengaduan', to: '/pengaduan' },
              ].map(link => (
                <Link key={link.label} to={link.to} className="text-body-md text-white text-opacity-75 hover:text-opacity-100 hover:underline transition-all w-max">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-4">
            <h4 className="font-montserrat font-bold text-lg">Kontak Kami</h4>
            <div className="flex items-start gap-3 text-body-md text-white text-opacity-75">
              <MapPin size={18} className="flex-shrink-0 mt-1" />
              <span>Jl. Soekarno Hatta No.10, Bandar Lampung, Lampung 35144</span>
            </div>
            <div className="flex items-center gap-3 text-body-md text-white text-opacity-75">
              <Mail size={18} />
              <span>sipfas@polinela.ac.id</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white border-opacity-20 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white text-opacity-60">
          <p>© {new Date().getFullYear()} SIPFAS POLINELA. All rights reserved.</p>
          <p>Built with React + Supabase by Tim UPT TIK POLINELA.</p>
        </div>
      </div>
    </footer>
  );
}
